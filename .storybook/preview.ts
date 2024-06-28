import type { Preview } from "@storybook/react";
import '../src/app/globals.css'; // replace with the name of your tailwind css file
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Components' , '*'],
      },
    },

    backgrounds : {
      values : [
        {name : 'light' , value : '#fff'},
        {name : 'dark' , value : '#333'},
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
    themes: {
        // nameOfTheme: 'classNameForTheme',
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    })
  ]
};

export default preview;
