import Siri from './siri';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Advanced/Siri',
  render: (args:any) => {
    const control = new Siri()
    return control
  },
  argTypes: {

  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic = {
};
