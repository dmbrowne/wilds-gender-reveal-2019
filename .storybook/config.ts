import { withKnobs } from '@storybook/addon-knobs';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { configureViewport } from '@storybook/addon-viewport';

setOptions({
  hierarchyRootSeparator: /\|/,
  /**
     * where to show the addon panel
     * @type {String}
     */
  addonPanelInRight: true,
});
// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withKnobs);
configure(loadStories, module);
configureViewport({ defaultViewport: 'iphone6' });