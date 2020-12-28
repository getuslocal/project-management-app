import { NextFunction, Request, Response } from 'express';
import Organization from '../models/organization';

const getOrganizationById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Organization.findById(req.params.id)
    .then((organization) => {
      return res.json(organization);
    })
    .catch((err) => {
      return res.status(400).json('Error: ' + err);
    });
};

const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    //Create a new organization
    const newOrganization = new Organization({
      name: name,
      projects: [],
    });

    const savedOrg = await newOrganization.save();
    res.json(savedOrg);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default { getOrganizationById, createOrganization };
