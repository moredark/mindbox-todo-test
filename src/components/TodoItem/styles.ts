import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { slideIn, slideOut } from '../../styles/animations';
import { ANIMATION_DURATION } from '../../constants/animations';

export const AnimatedTodoBox = styled(Box)`
  animation: ${slideIn} ${ANIMATION_DURATION.SHORT}ms ease-out;
  &.removing {
    animation: ${slideOut} ${ANIMATION_DURATION.SHORT}ms ease-out forwards;
  }
`;

export const TodoText = styled(Text)<{ completed: boolean }>`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.7 : 1};
  flex: 1;
  transition: all ${ANIMATION_DURATION.SHORT}ms ease;
`;
