import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../../../shared/components/Modal/Modal'
import {
  Container,
  Title,
  Description,
  Options,
  CustomButton,
  StyledText
} from './ColumnDeleteModal.style'
import Button from '../../../../../../shared/components/Button/Button'
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu'
import Icon from '../../../../../../shared/components/Icon/Icon'
import { updateProject } from '../../../../../../redux/projects/projects.actions'
import store from '../../../../../../redux/store'

const ColumnDeleteModal = ({
  projectId,
  targetColumnId,
  columns,
  columnOrder,
  closeModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const targetColumnIndex = columnOrder.indexOf(targetColumnId);
  const [inheritColumn, setInheritColumn] = useState(columnOrder[targetColumnIndex - 1]);

  const deleteColumn = () => {
    // Remove target column property from columns immutably.
    const { [targetColumnId]: removedColumn, ...restColumns } = columns;
    // Add issues of the deleted column onto the inherit column.
    const formValue = {
      columns: {
        ...restColumns,
        [inheritColumn]: {
          ...restColumns[inheritColumn],
          taskIds: [...restColumns[inheritColumn].taskIds, ...removedColumn.taskIds]
        }
      },
      columnOrder: columnOrder.filter(columnId => columnId !== targetColumnId)
    };
    // console.log(formValue);
    store.dispatch(updateProject(projectId, formValue));
  }

  return (
    <Modal>
      <Container>
        <Title><Icon type="warning" size={16} isSolid={true} top={-1} />{`Before you delete "${columns[targetColumnId].title}"`}</Title>
        <Description>Where would you like to move the issues in this column?</Description>
        <CustomButton
          isFirstColumn={(inheritColumn === columnOrder[0])}
          isLastColumn={(inheritColumn === columnOrder[columnOrder.length - 1])}
          type="button"
          className="icon-angle-down"
          onClick={() => setIsMenuOpen(true)}
        >
          {columns[inheritColumn].title}
        </CustomButton>
        <SelectMenu
          isActive={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          width={350}
          onChange={({ value }) => { setInheritColumn(value.id) }}
          options={Object.values(columns).filter(column => column.id !== targetColumnId && column.id !== inheritColumn).map(column => ({
            value: column,
            key: column.id,
          }))}
          renderValue={({ value: column }) => (
            <StyledText
              isFirstColumn={(column.id === columnOrder[0])}
              isLastColumn={(column.id === columnOrder[columnOrder.length - 1])}
            >
              {column.title}
            </StyledText>
          )}
        />
        <Options>
          <Button text="Delete" variant="danger" onClick={deleteColumn} />
          <Button text="Cancel" variant="text" onClick={closeModal} />
        </Options>
      </Container>
    </Modal>
  )
}

ColumnDeleteModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  targetColumnId: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired,
  columnOrder: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ColumnDeleteModal
