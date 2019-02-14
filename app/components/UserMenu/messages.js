/*
 * Form Messages
 */
import { defineMessages } from 'react-intl';

import routeMessages from 'routes/messages';

const localMessages = defineMessages({
  account: {
    id: 'app.components.UserMenu.account',
    defaultMessage: 'Account',
  },
});

const messages = {
  ...localMessages,
  ...routeMessages,
};

export default messages;
