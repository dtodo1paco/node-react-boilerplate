import styled from 'styled-components';

const Select = styled.select`
  line-height: 1em;
  height: 2em;
  color: 'red';
  option:not(:checked) {
    background-color: 'red';
    color: 'red';
  }
  option:checked {
    background-color: 'red';
    color: 'red';
  }
  option:hover {
    background-color: 'red';
    color: 'red';
  }
`;

export default Select;
