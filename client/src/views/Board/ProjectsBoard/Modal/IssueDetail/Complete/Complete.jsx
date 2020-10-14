import React from 'react'
import PropTypes from 'prop-types'
import {
  Button
} from './Complete.style';

const Complete = ({ isEpicDone, updateTicketField, updateTicketHistory }) => (
  <div>
    <Button
      isEpicDone={isEpicDone}
      className="icon-check"
      type="button"
      onClick={() => {
        updateTicketField({ field: 'isEpicDone', value: !isEpicDone })
        if (!isEpicDone) {
          updateTicketHistory(null, null, null, 'Complete')
        }
      }}
    >
      {isEpicDone ? 'Completed' : 'Mark Complete'}
    </Button>
  </div>
);

Complete.propTypes = {
  isEpicDone: PropTypes.bool,
  updateTicketField: PropTypes.func.isRequired,
}

export default Complete

