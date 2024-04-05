import React from 'react';
import UserProfile from '../components/UserProfile';

export default {
  title: 'Components/UserProfile',
  component: UserProfile,
};

const Template = (args) => <UserProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Kari Nordmann',
  bio: 'An enthusiastic React developer from Norway.',
};

export const HoverState = Template.bind({});
HoverState.args = {
  ...Default.args,
};
HoverState.decorators = [
  (Story) => <div style={{ background: '#f0f0f0' }}>{Story()}</div>,
];

export const LoadingState = Template.bind({});
LoadingState.args = {
  isLoading: true,
};
