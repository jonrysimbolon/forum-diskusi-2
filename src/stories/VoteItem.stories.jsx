import React from 'react';
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
} from 'react-icons/fa';
import VoteItem from '../components/VoteItem';

export default {
  title: 'Components/VoteItem',
  component: VoteItem,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['upVote', 'downVote'],
    },
    count: { control: 'number' },
    isVoted: { control: 'boolean' },
  },
};

// Template dengan logika dinamis untuk icon
const Template = (args) => {
  const icon =
    args.type === 'upVote'
      ? args.isVoted ? <FaThumbsUp /> : <FaRegThumbsUp />
      : args.isVoted ? <FaThumbsDown /> : <FaRegThumbsDown />;

  return <VoteItem {...args} icon={icon} />;
};

export const UpVote = Template.bind({});
UpVote.args = {
  type: 'upVote',
  count: 10,
  event: () => alert('Upvoted!'),
  isVoted: false,
};

export const DownVote = Template.bind({});
DownVote.args = {
  type: 'downVote',
  count: 3,
  event: () => alert('Downvoted!'),
  isVoted: true,
};
