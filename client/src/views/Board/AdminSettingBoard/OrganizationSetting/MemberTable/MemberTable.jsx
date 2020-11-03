import React from 'react'
import PropTypes from 'prop-types'
import Table from '../../../../../shared/components/Table/Table'
import Icon from '../../../../../shared/components/Icon/Icon'
import Button from '../../../../../shared/components/Button/Button';
import {
  FlexContainer,
  FlexLeft,
  FlexRight,
  Email,
} from './MemberTable.style'

const MemberTable = ({ memberList }) => {
  return (
    <Table>
      <Table.Head>
        <tr>
          <th width="">Member</th>
          <th width="">Role</th>
          <th width="">Position</th>
          <th width="130px"></th>
          <th width="220px"></th>
        </tr>
      </Table.Head>
      <Table.Body>
        {
          memberList.map(member => {
            return (
              <tr key={member._id}>
                <td>
                  <FlexContainer>
                    <FlexLeft>
                      <Icon type="user-icon" imageUrl={member.pictureUrl} size={34} top={2} />
                    </FlexLeft>
                    <FlexRight>
                      {member.name}
                      <Email>{member.email}</Email>
                    </FlexRight>
                  </FlexContainer>
                </td>
                <td>
                  {member.role}
                </td>
                <td>
                  {member.position}
                </td>
                <td>
                  <Button text="Edit role" variant="secondary"/>
                </td>
                <td>
                  <Button text="Revoke site access" variant="secondary"/>
                </td>
              </tr>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

MemberTable.propTypes = {

}

export default MemberTable
