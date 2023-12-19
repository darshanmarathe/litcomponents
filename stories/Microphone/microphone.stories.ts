import Microphone from './microphone';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Advanced/Microphone',
  render: (args:any) => new Microphone(),
  argTypes: {
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic = {
  
};
