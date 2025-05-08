import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import VoteItem from './VoteItem';

/**
 * Skenario testing
 *
 * - VoteItem component
 *   - should render the vote button with correct count
 *   - should call the event function when button is clicked
 *   - should add 'voted' class when isVoted is true
 */

expect.extend(matchers);

afterEach(cleanup);

describe('VoteItem', () => {
  it('should render the vote button with correct count', () => {
    render(<VoteItem type="upVote" count={10} event={vi.fn()} isVoted={false} icon={<span>↑</span>} />);

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should call the event function when the vote button is clicked', async () => {
    const mockEvent = vi.fn();
    render(<VoteItem type="upVote" count={10} event={mockEvent} isVoted={false} icon={<span>↑</span>} />);

    await userEvent.click(screen.getByRole('button', { name: 'Vote up' }));

    expect(mockEvent).toHaveBeenCalled();
  });

  it('should add "voted" class when isVoted is true', () => {
    render(<VoteItem type="upVote" count={10} event={vi.fn()} isVoted icon={<span>↑</span>} />);

    expect(screen.getByRole('button', { name: 'Vote up' })).toHaveClass('voted');
  });
});
