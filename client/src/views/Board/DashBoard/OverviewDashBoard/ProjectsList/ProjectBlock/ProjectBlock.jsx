import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import ProgressProvider from "../../../../../../shared/components/ProgressProvider/ProgressProvider";
import Icon from '../../../../../../shared/components/Icon/Icon'
import {
  Container,
  Top,
  Center,
  Bottom,
  TopLeft,
  NameText,
  CategoryText,
  TopRight,
  DescriptionText,
  BottomLeftText,
  MemberList,
  ImageWithProgressBar,
  ProgressBarInner,
  Link
} from './ProjectBlock.style';

const ProjectBlock = ({ project, members }) => {
  console.log(members)
  return (
    <Container>
      <Top>
        <TopLeft>
          <NameText>{project.name}</NameText>
          <CategoryText>{project.category}</CategoryText>
        </TopLeft>
        <TopRight>
          <ImageWithProgressBar>
            <ProgressProvider valueStart={0} valueEnd={66}>
              {value => (
                <CircularProgressbarWithChildren
                  value={value}
                  strokeWidth={8}
                  styles={buildStyles({
                    textColor: '#fff',
                    trailColor: "#dfe1e6",
                    strokeLinecap: 'butt',
                    pathTransitionDuration: .8,
                    pathColor: "#00cc88",
                  })}
                >
                  <ProgressBarInner imageUrl={project.projectIconUrl} >
                  </ProgressBarInner>
                </CircularProgressbarWithChildren>
              )}
            </ProgressProvider>
          </ImageWithProgressBar>
        </TopRight>
      </Top>
      <Center>
        <DescriptionText>{project.description}</DescriptionText>
      </Center>
      <Bottom>
        <BottomLeftText>Team: </BottomLeftText>
        <MemberList>
          {
            members.map(member => {
              return (
                <li key={member._id}>
                  <Icon type="user-icon" imageUrl={member.pictureUrl} size={27} top={1} />
                </li>
              )
            })
          }
        </MemberList>
        <Link>
          <Icon type="link" isSolid={true} size={14} />
        </Link>
      </Bottom>
    </Container>
  )
}

ProjectBlock.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectBlock;
