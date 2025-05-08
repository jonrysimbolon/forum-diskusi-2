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

function Template({ type, isVoted, ...rest }) {
  let icon;

  if (type === 'upVote') {
    icon = isVoted ? <FaThumbsUp /> : <FaRegThumbsUp />;
  } else {
    icon = isVoted ? <FaThumbsDown /> : <FaRegThumbsDown />;
  }

  return <VoteItem type={type} isVoted={isVoted} icon={icon} {...rest} />;
}

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
