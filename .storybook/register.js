// register.js
import { addons } from '@storybook/addons';

import * as FullStory from '@fullstory/browser';

addons.register('storybook/fullstory', () => {
  FullStory.init({
    orgId: 'P6XKD',
    devMode: window.location.hostname !== 'ux.palmetto.com',
  });
});