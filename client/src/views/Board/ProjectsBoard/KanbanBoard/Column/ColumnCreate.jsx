import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Content,
  Title,
  TitleInput,
  Options,
  Option,
} from './Column.style'
import useOutsideClick from '../../../../../shared/hooks/useOutsideClick';
import Icon from '../../../../../shared/components/Icon/Icon';
import { updateProject } from '../../../../../redux/projects/projects.actions';
import store from '../../../../../redux/store';

const ColumnCreate = ({
  closeColumn,
  project: { _id: projectId, columns, columnOrder },
}) => {
  const [title, setTitle] = useState('');
  const containerRef = useRef();

  useOutsideClick(containerRef, () => {
    // Close create column field.
    closeColumn()
  });
  
  const createNewColumn = () => {
    const trimmedTitle = title.trim();

    // Close create column field.
    closeColumn();
    
    if (trimmedTitle.length === 0) return;

    const newColumnId = `column-${Object.keys(columns).length + 1}`;
    const formValue = {
      columns: {
        ...columns,
        [newColumnId]: {
          id: newColumnId,
          title: trimmedTitle,
          taskIds: []
        }
      },
      columnOrder: [...columnOrder, newColumnId]
    };
    store.dispatch(updateProject(projectId, formValue));
  }

  return (
    <Container ref={containerRef}>
      <Title>
        <TitleInput
          type="text"
          autoFocus
          maxLength="30"
          placeholder="Column name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Options>
          <Option onClick={createNewColumn}><Icon type="check" size={12} isSolid={true} /></Option>
          <Option onClick={closeColumn}><Icon type="close" size={12} isSolid={true} /></Option>
        </Options>
      </Title>
      <Content>
      </Content>
    </Container>
  )
}

ColumnCreate.propTypes = {
  project: PropTypes.object.isRequired,
  closeColumn: PropTypes.func.isRequired,
}

export default ColumnCreate
