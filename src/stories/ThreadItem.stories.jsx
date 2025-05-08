import React from 'react';
import ThreadItem from '../components/ThreadItem';

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
};

function Template(args) {
  return <ThreadItem {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  id: 'thread-1',
  title: 'Apa itu React Hooks?',
  body: '<p>React Hooks adalah fitur baru di React 16.8...</p>',
  category: 'react',
  createdAt: new Date().toISOString(),
  owner: {
    id: 'user-1',
    name: 'Jane Doe',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
  },
  upVotesBy: ['user-2'],
  downVotesBy: [],
  totalComments: 5,
  authUser: 'user-2',
  upVote: (id, isVoted) => alert(`UpVote on ${id}. Already voted? ${isVoted}`),
  downVote: (id, isVoted) => alert(`DownVote on ${id}. Already voted? ${isVoted}`),
};
