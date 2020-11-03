import React from 'react'
import PropTypes from 'prop-types'
import Table from '../../../../../shared/components/Table/Table'
import Button from '../../../../../shared/components/Button/Button';
import moment from 'moment'

const OrganizationTable = ({ organization, memberCount, projectCount }) => {
  return (
    <Table>
      <Table.Head>
        <tr>
          <th width="">Name</th>
          <th width="">Created at</th>
          <th width="">Plan</th>
          <th width="">Users</th>
          <th width="">Projects</th>
          <th width="210px"></th>
        </tr>
      </Table.Head>
      <Table.Body>
        <tr >
          <td>
            {organization.name}
          </td>
          <td>
            {moment(organization.createdAt).format('MMMM Do, YYYY')}
          </td>
          <td>Free</td>
          <td>{memberCount}</td>
          <td>{projectCount} / 4</td>
          <td>
            <Button text="Delete organization" variant="danger"/>
          </td>
        </tr>
      </Table.Body>
    </Table>
  )
}

OrganizationTable.propTypes = {

}

export default OrganizationTable
