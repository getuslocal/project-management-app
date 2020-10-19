import React, { useState, Fragment } from 'react'
import Draggable from 'react-draggable'; // The default
import PropTypes from 'prop-types'

const EpicLists = () => {
  const [dragProperties, setDragProperties] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    lastPosition: 0
  })

  // console.log(dragProperties)

  const handleDrag = (e, ui) => {
    const { x, y } = dragProperties.deltaPosition;
    setDragProperties({
      ...dragProperties,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  const onStart = () => {
    setDragProperties({ ...dragProperties, activeDrags: ++dragProperties.activeDrags });
  };

  const onStop = (e, ui) => {
    // console.log('POs before dnd : ' + dragProperties.lastPosition)
    // 1: Lastposition - [currentPosition] /25 = how many days moved.
    // 2. Update the date of the epic on state and db. 
    setDragProperties({ ...dragProperties, activeDrags: --dragProperties.activeDrags, lastPosition: ui.lastX });
    // console.log(e)
  };

  return (
    <div className="row" style={{ width: '10000px' }} >
      <div style={{ minHeight: '80px', width: '270px', position: 'absolute', background: 'blue', left: 0, top: 'auto' }}></div>

      <div className="taskBlock" style={{ background: '#ddd', position: 'relative' }}>
        <Draggable
          axis="x"
          handle=".epic"
          bounds="parent"
          // defaultPosition={{x: 25, y: 0}}
          grid={[50, 50]}
          onStart={onStart}
          onStop={onStop}
          onDrag={handleDrag}
        >
          <div className="handle" style={{ minHeight: '50px', width: '500px' }}>
            <div className="epic" style={{ background: 'red', marginBottom: '10px', padding: '10px', borderRadius: '20px' }}>{dragProperties.deltaPosition.x}</div>
            <div className="child-issue" style={{ background: 'purple', margin: '0 5px', padding: '5px' }} >child issue !</div>
          </div>
        </Draggable>
      </div>

    </div>
  )
}

EpicLists.propTypes = {

}

export default EpicLists
