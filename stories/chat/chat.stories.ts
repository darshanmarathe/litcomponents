import VoiceChat from './chat';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Advanced/Chat',
  render: (args:any) => new VoiceChat(),
  argTypes: {
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic = {
  
};
