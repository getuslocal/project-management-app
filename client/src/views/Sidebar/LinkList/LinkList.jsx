import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { selectProjects } from '../../../redux/projects/projects.selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Icon from '../../../shared/components/Icon/Icon';
import { SidebarList, SidebarSubList } from './LinkList.style';

const LinkList = ({
  id,
  linkUrl,
  icon,
  title,
  dropDownMenu,
  match,
  projects,
  closeModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { board } = match.params;
  const hasDropDownMenu = dropDownMenu.length > 0;
  const isProjectLink = id === 'projects';

  if (isProjectLink && Object.keys(projects).length === 0) {
    return (
      <SidebarList key={id}>
        <span className={board === linkUrl ? 'active' : ''}>
          <Icon type={icon} size={16} isSolid={true} />
          Projects
        </span>
      </SidebarList>
    );
  }

  return (
    <SidebarList
      key={id}
      isOpen={isOpen}
      onClick={() => {
        if (hasDropDownMenu) {
          setIsOpen(!isOpen);
        } else {
          closeModal();
        }
      }}
    >
      {hasDropDownMenu ? (
        <span className={board === linkUrl ? 'active' : ''}>
          <Icon type={icon} size={16} isSolid={true} />
          {title}
          <Icon
            className="sort-down"
            type="sort-down"
            size={14}
            isSolid={true}
            top={-2}
          />
        </span>
      ) : (
        <Link
          to={`/app/${linkUrl}`}
          className={board === linkUrl ? 'active' : ''}
        >
          <Icon type={icon} size={16} isSolid={true} />
          {title}
        </Link>
      )}
      {hasDropDownMenu && (
        <SidebarSubList className={isOpen ? 'is-open' : ''}>
          {dropDownMenu.map((menu, index) => (
            <li key={index}>
              <Link to={`/app/${linkUrl}${menu.linkUrl}`} onClick={closeModal}>
                {isProjectLink && (
                  <Icon
                    type="project-icon"
                    className="project-icon"
                    imageUrl={
                      projects[menu.projectId] &&
                      projects[menu.projectId].projectIconUrl
                    }
                    size={25}
                    top={2}
                  />
                )}
                {menu.label}
              </Link>
            </li>
          ))}
        </SidebarSubList>
      )}
    </SidebarList>
  );
};

LinkList.propTypes = {
  id: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dropDownMenu: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
});

export default compose(withRouter, connect(mapStateToProps, null))(LinkList);
