import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
/* eslint-disable */
injectGlobal`
  body {
    background-color: ${props => props.theme.palette.backgroundColor};
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  body.fontLoaded {
    background-color: ${props => props.theme.palette.typography.body1.fontFamily};
  }

  a {
    text-decoration: none;
  }

  #app {
    flex: 1;
    min-height: 100vh;
  }
  .appRoot {
    height: 100%;
    min-height: 100vh;
    margin-left: 0.5em;
    margin-right: 0.5em;
    margin-top: 0.5em;
  }
  #content {
    flex: 1 0 auto;
  }
  .float-right {
    float: right;
  }
  .float-left {
    float: left;
  }
  .flex {
    display: flex;
    }
  form {
    display: grid;
  }
  option {
    padding: 0.8rem;
  }

  .moveUp: {
    transform: translate3d(0, -46px, 0);
    transition-duration: 225;
  }
  .moveDown: {
    transform: translate3d(0, 0, 0);
    transition-duration: 195;
  }

  .progress{
    margin: 24px auto;
    display: table;
  }
  .center {
    text-align: 'center'
  }
`;
