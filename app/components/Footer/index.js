import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withTheme from '@material-ui/core/styles/withTheme';
import Typography from '@material-ui/core/Typography';

import A from 'components/A';
import Wrapper from './Wrapper';
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <Wrapper>
        <section id="license">
          <Typography variant="display4" color="secondary" component="h3">
            <FormattedMessage {...messages.licenseMessage} />
          </Typography>
        </section>
        <section id="credits">
          <Typography variant="display4" color="secondary" component="h3">
            <FormattedMessage
              {...messages.authorMessage}
              values={{
                author: (
                  <A theme={theme} href="https://dtodo1paco.github.io/">
                    @dtodo1paco
                  </A>
                ),
              }}
            />
          </Typography>
        </section>
      </Wrapper>
    );
  }
}

Footer.propTypes = {
  theme: PropTypes.object,
};

export default withTheme()(Footer);
