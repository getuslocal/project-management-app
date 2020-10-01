import React from 'react'
import PropTypes from 'prop-types'
import {
  Button
} from './Complete.style';

const Complete = ({ isEpicDone, updateTicketField }) => (
  <div>
    <Button
      isEpicDone={isEpicDone}
      className="icon-check"
      type="button"
      onClick={() => updateTicketField({ isEpicDone: !isEpicDone })}
    >
      {isEpicDone ? 'Completed' : 'Mark Complete'}
    </Button>
  </div>
);

Complete.propTypes = {
  isEpicDone: PropTypes.bool.isRequired,
  updateTicketField: PropTypes.func.isRequired,
}

export default Complete

