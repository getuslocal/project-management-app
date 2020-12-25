import React from 'react';
import { Title, OrderedLists, NestedLists } from './RolesExplanation.style';

const RolesExplanation = () => (
  <div>
    <Title>What each role can do ?</Title>
    <OrderedLists>
      <li>
        Admin
        <NestedLists>
          <li>
            Access to <em>Admin Settings</em> (Edit organization and alter
            members role, etc.)
          </li>
          <li>
            Access to <em>Project Management</em> (Add/edit/delete a project and
            alter project members)
          </li>
          <li>
            Access to <em>Dashboard</em>
          </li>
          <li>
            Access to <em>Projects</em>
          </li>
        </NestedLists>
      </li>
      <li>
        Project Manager
        <NestedLists>
          <li>
            Access to <em>Project Management</em> (Add/edit/delete a project and
            alter project members)
          </li>
          <li>
            Access to <em>Dashboard</em>
          </li>
          <li>
            Access to <em>Projects</em>
          </li>
        </NestedLists>
      </li>
      <li>
        Member
        <NestedLists>
          <li>
            Access to <em>Dashboard</em>
          </li>
          <li>
            Access to <em>Projects</em>
          </li>
        </NestedLists>
      </li>
    </OrderedLists>
  </div>
);

export default RolesExplanation;
