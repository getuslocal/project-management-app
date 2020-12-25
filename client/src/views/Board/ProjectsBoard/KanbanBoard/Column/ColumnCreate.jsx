import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import short from 'short-uuid';
import {
  Container,
  Content,
  Top,
  TopContent,
  TitleInput,
  Options,
  Option,
} from './Column.style';
import useOutsideClick from '../../../../../shared/hooks/useOutsideClick';
import Icon from '../../../../../shared/components/Icon/Icon';
import { updateProject } from '../../../../../redux/projects/projects.actions';
import store from '../../../../../redux/store';
import { setAlert } from '../../../../../redux/alert/alert.actions';

const ColumnCreate = ({
  closeColumn,
  project: { _id: projectId, columns, columnOrder },
}) => {
  const [title, setTitle] = useState('');
  const containerRef = useRef();

  useOutsideClick(containerRef, () => {
    // Close create column field.
    closeColumn();
  });

  useEffect(() => {
    containerRef.current.scrollIntoView();
  }, []);

  const createNewColumn = () => {
    const trimmedTitle = title.trim();

    // Close create column field.
    closeColumn();

    if (trimmedTitle.length === 0) return;
    // Generate a short uuid for a new column id.
    const newColumnId = short.generate();
    const formValue = {
      columns: {
        ...columns,
        [newColumnId]: {
          id: newColumnId,
          title: trimmedTitle,
          isDoneColumn: false,
          taskIds: [],
        },
      },
      columnOrder: [...columnOrder, newColumnId],
    };
    store.dispatch(updateProject(projectId, formValue));
    store.dispatch(setAlert('A new column is created !', 'success'));
  };

  return (
    <OuterContainer>
      <Container ref={containerRef}>
        <Top>
          <TopContent>
            <TitleInput
              type="text"
              autoFocus
              maxLength="30"
              placeholder="Column name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Options>
              <Option onClick={createNewColumn}>
                <Icon type="check" size={12} isSolid={true} />
              </Option>
              <Option onClick={closeColumn}>
                <Icon type="close" size={12} isSolid={true} />
              </Option>
            </Options>
          </TopContent>
        </Top>
        <Content></Content>
      </Container>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  display: flex;
  padding-right: 5px;
`;

ColumnCreate.propTypes = {
  project: PropTypes.object.isRequired,
  closeColumn: PropTypes.func.isRequired,
};

export default ColumnCreate;
