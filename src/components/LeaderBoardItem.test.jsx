import React from 'react';
import {
  describe, it, expect, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import LeaderBoardItem from './LeaderBoardItem';

/**
 * Skenario testing:
 *
 * - LeaderBoardItem component
 *   - harus menampilkan nama user dan skor dengan benar
 *   - harus menampilkan avatar dengan atribut src dan alt yang sesuai
 *   - harus menampilkan label "(Anda)" jika user adalah auth user
 *   - harus menampilkan fallback "Tidak diketahui" jika nama user tidak tersedia
 *   - harus menampilkan skor default 0 jika skor tidak tersedia
 */

expect.extend(matchers);

describe('LeaderBoardItem component', () => {
  afterEach(cleanup);

  it('harus menampilkan nama user dan skor dengan benar', () => {
    const user = {
      name: 'Jane Doe',
      avatar: 'https://example.com/avatar.jpg',
      isAuthUser: false,
    };

    render(<LeaderBoardItem user={user} score={100} />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('harus menampilkan avatar dengan src dan alt yang sesuai', () => {
    const user = {
      name: 'Jane Doe',
      avatar: 'https://example.com/avatar.jpg',
      isAuthUser: false,
    };

    render(<LeaderBoardItem user={user} score={100} />);

    const avatar = screen.getByAltText('Jane Doe');
    expect(avatar).toHaveAttribute('src', user.avatar);
  });

  it('harus menampilkan label "(Anda)" jika user adalah auth user', () => {
    const user = {
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
      isAuthUser: true,
    };

    const { container } = render(<LeaderBoardItem user={user} score={50} />);

    const username = container.querySelector('.username');

    expect(username).toHaveTextContent('John Doe (Anda)');
  });

  it('harus menampilkan fallback "Tidak diketahui" jika nama user tidak tersedia', () => {
    const user = {
      name: '',
      avatar: 'https://example.com/avatar.jpg',
      isAuthUser: false,
    };

    render(<LeaderBoardItem user={user} score={20} />);

    expect(screen.getByText('Tidak diketahui')).toBeInTheDocument();
  });

  it('harus menampilkan skor default 0 jika skor tidak tersedia', () => {
    const user = {
      name: 'Jane Doe',
      avatar: 'https://example.com/avatar.jpg',
      isAuthUser: false,
    };

    render(<LeaderBoardItem user={user} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
