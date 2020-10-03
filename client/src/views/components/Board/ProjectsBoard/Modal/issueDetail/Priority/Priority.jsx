import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { IssuePriorities } from '../../../../../../../shared/constants/issues';
import SelectMenu from '../../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  IconCont
} from '../IssueDetail.style';

function Priority({ value, updateTicketField }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <SectionContainer>
      <SectionTitle>Priority</SectionTitle>
      <SectionContent className="icon-angle-down" onClick={() => setIsMenuOpen(true)}>
        <IconCont>
          <Icon type={`priority-${value.toLowerCase()}`} isSolid={true} size={12} />
        </IconCont>
        {value}
      </SectionContent>
      <SelectMenu
        name="issuePriority"
        value={value}
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => updateTicketField({ issuePriority: option.value })}
        options={Object.values(IssuePriorities).filter(option => option !== value).map(option => ({
          key: option,
          value: option,
        }))}
        renderValue={({ value: type }) => (
          <Fragment>
            <IconCont>
              <Icon type={`priority-${type.toLowerCase()}`} isSolid={true} size={12} />
            </IconCont>
            {type}
          </Fragment>
        )}
      />
    </SectionContainer>
  )
}

Priority.propTypes = {

}

export default Priority

