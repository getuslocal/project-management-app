import { NextFunction, Request, Response } from 'express';
import Organization from '../models/organization';
import Project from '../models/project';
import User from '../models/user';
import Ticket from '../models/ticket';
import IUser from '../interfaces/user';
import { IComment, ITicket } from '../interfaces/ticket';
import { IHistory } from '../interfaces/project';

const takayaHoldingsId = '5f795460d484e84a716e6dda';
const systemAdminId = '5f30dc2beca63d3ceae1599b';
// Demo project ids.
const demoProjects = [
  '5fcea8aa10c96363ea4a89db', // Demo project
  '5fe2e4b67f3e5b274e20417f', // Simplanner Software
];

const generateDemoData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, orgId } = req.body;

    const demoMembers = await User.find({ orgId: takayaHoldingsId }).lean();

    const orgData = await Organization.findById(orgId).lean();
    let prevAndNewMemberIdsMap: Array<IUser['_id']> = [];

    // Create demo members.
    for (const member of demoMembers) {
      const { _id: removedId, ...restMemberData } = member;
      const formattedName = restMemberData.name
        .toLowerCase()
        .split(' ')
        .join('');
      const formattedOrgName =
        orgData && orgData.name.toLowerCase().split(' ').join('');

      // Create a new ticket with the same data.
      const newUser = new User({
        ...restMemberData,
        email: `${formattedName}@${formattedOrgName}.com`,
        orgId: orgId,
      });

      const savedUser = await newUser.save();

      prevAndNewMemberIdsMap = [
        {
          prevId: String(removedId),
          newId: String(savedUser._id),
        },
        ...prevAndNewMemberIdsMap,
      ];
    }

    // Create demo projects and tickets.
    for (const projectId of demoProjects) {
      const project = await Project.findById(projectId).lean();
      let updatedMembers = [];

      // Prepare updated members field.
      for (const memberId of project.members) {
        const newMember = prevAndNewMemberIdsMap.find(
          (data) => data.prevId === memberId
        );
        updatedMembers.push(String(newMember.newId));
      }

      const projectValues = {
        key: project.key,
        name: project.name,
        description: project.description,
        category: project.category,
        projectIconUrl: project.projectIconUrl,
        columns: project.columns,
        columnOrder: project.columnOrder,
        seq: project.seq,
        history: project.history,
        orgId: orgId,
        members: [...updatedMembers, userId],
      };

      // Create a new project with the same data.
      const newProject = new Project(projectValues);

      // Save a new project.
      const savedProject = await newProject.save();

      // Create demo tickets.
      const demoTickets = await Ticket.find({ projectId: projectId }).lean();
      let prevAndNewTicketIdsMap: Array<ITicket['_id']> = [];
      for (const ticket of demoTickets) {
        const { _id: removedId, ...restTicketData } = ticket;
        const comments = restTicketData.comments;

        // Update comments with new ticket ids.
        comments.forEach((comment: IComment, index: number) => {
          const newMember = prevAndNewMemberIdsMap.find(
            (data) => data.prevId == comment.user
          );
          comments[index].user = newMember.newId;
        });

        const prevReporter = prevAndNewMemberIdsMap.find(
          (data) => data.prevId === restTicketData.reporterId
        );
        const newReporter = prevReporter ? prevReporter.newId : '';
        const prevAssignee = prevAndNewMemberIdsMap.find(
          (data) => data.prevId === restTicketData.assigneeId
        );
        const newAssignee = prevAssignee ? prevAssignee.newId : '';

        // Create a new ticket with the same data.
        const newTicket = new Ticket({
          ...restTicketData,
          reporterId: newReporter,
          assigneeId:
            restTicketData.assigneeId == systemAdminId ? userId : newAssignee,
          comments: comments,
          projectId: savedProject._id,
        });

        const savedTicket = await newTicket.save();

        prevAndNewTicketIdsMap = [
          {
            prevId: removedId,
            newId: savedTicket._id,
          },
          ...prevAndNewTicketIdsMap,
        ];
      }

      // Update child issues of epic.
      const newTickets = await Ticket.find({
        projectId: savedProject._id,
      }).lean();
      for (const ticketData of newTickets) {
        if (ticketData.linkedEpic && ticketData.issueType !== 'Epic') {
          const newLinkedEpic = prevAndNewTicketIdsMap.find(
            (data) => data.prevId == String(ticketData.linkedEpic)
          );
          if (newLinkedEpic) {
            await Ticket.findOneAndUpdate(
              { _id: ticketData._id },
              { $set: { linkedEpic: newLinkedEpic.newId } },
              { runValidators: true }
            );
          }
        }
      }

      // Update columns taskids.
      const projectColumns = savedProject.columns;
      for (const columnKey of Object.keys(projectColumns)) {
        let newTaskids = [];
        for (const ticketId of projectColumns[columnKey].taskIds) {
          const newTicket = prevAndNewTicketIdsMap.find(
            (data) => data.prevId == ticketId
          );
          // Update taskIds with a new ticket id.
          newTaskids.push(newTicket.newId);
        }
        projectColumns[columnKey].taskIds = newTaskids;
      }

      // Update histories.
      const projectHistories = savedProject.history;
      projectHistories.forEach((history: IHistory, index) => {
        const newTicket = prevAndNewTicketIdsMap.find(
          (data) => data.prevId == history.ticket.id
        );

        if (newTicket) {
          projectHistories[index].ticket.id = newTicket.newId;
        }

        const newMember = prevAndNewMemberIdsMap.find(
          (data) => data.prevId == projectHistories[index].editor
        );

        if (newMember) {
          projectHistories[index].editor = newMember.newId;
        }
      });

      // Update the project with the updated columns.
      await Project.findOneAndUpdate(
        { _id: savedProject._id },
        { $set: { columns: projectColumns, history: projectHistories } },
        { runValidators: true }
      );
    }

    res.json('Demo data has been generated.');
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const updateDemoDataDates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    for (const projectId of demoProjects) {
      // Get the demo tickets data
      const demoTickets = await Ticket.find({ projectId: projectId }).lean();

      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      let monthIndex = currentMonth;

      // Loop through the tickets and update the dates on them
      for (const ticket of demoTickets) {
        const {
          createdAt,
          updatedAt,
          completedAt,
          comments,
          ...restTicketData
        } = ticket;

        const provCreatedAt = new Date(createdAt);
        const provUpdatedAt = new Date(updatedAt);

        provCreatedAt.setFullYear(currentYear);
        provUpdatedAt.setFullYear(currentYear);

        if (monthIndex < currentMonth - 5) {
          monthIndex = currentMonth;
        }

        provCreatedAt.setMonth(monthIndex);
        provUpdatedAt.setMonth(monthIndex);

        
        let provCompletedAt = undefined;
        
        if (completedAt) {
          provCompletedAt = new Date(completedAt);
          provCompletedAt.setFullYear(currentYear);
          provCompletedAt.setMonth(monthIndex);
        }

        const updateDataSet = {
          createdAt: provCreatedAt,
          updatedAt: provUpdatedAt,
        };

        // Update with the new dates
        await Ticket.findOneAndUpdate(
          { _id: restTicketData._id },
          { $set: { ...updateDataSet, completedAt: provCompletedAt } },
          { runValidators: true, timestamps: false }
        );

        monthIndex--;
      }
    }

    res.json('Demo data has been updated.');
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export default { generateDemoData, updateDemoDataDates };
