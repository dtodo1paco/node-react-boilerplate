/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';

// eslint-disable-next-line
const A = styled.a`
  color: ${props => props.theme.palette.primary.main};
  &:hover {
    color: ${props => props.theme.palette.primary.light};
  }
  ,
  &:visited {
    color: ${props => props.theme.palette.primary.dark};
  }
`;

export default A;
