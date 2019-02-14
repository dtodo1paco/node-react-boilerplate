/**
 * An internal link to a certain page, an anchor tag
 */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const link = styled(Link)`
  color: ${props => props.theme.palette.primary.main};
  text-transform: uppercase;
  &:hover {
    color: ${props => props.theme.palette.primary.light};
  }
`;

link.displayName = 'Link';
export default link;

// ${props => props.theme.palette.primary.main};
