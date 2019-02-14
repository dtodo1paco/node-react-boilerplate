/*
 * UserSettings Messages
 *
 * This contains all the text for the UserSettings container.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  save: {
    id: 'app.containers.UserSettings.save',
    defaultMessage: 'Save',
  },
  header: {
    id: 'app.containers.UserSettings.header',
    defaultMessage: 'Settings',
  },
  language_id: {
    id: 'app.containers.UserSettings.language.id',
    defaultMessage: 'Language',
  },
  language_description: {
    id: 'app.containers.UserSettings.language.description',
    defaultMessage: 'Select the language of your choice',
  },
  theme_id: {
    id: 'app.containers.UserSettings.theme.id',
    defaultMessage: 'Theme',
  },
  theme_description: {
    id: 'app.containers.UserSettings.theme.description',
    defaultMessage: 'You can configure the appearance of the entire page',
  },
});
