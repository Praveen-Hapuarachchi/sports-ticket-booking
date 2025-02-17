import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  const nameParts = name.trim().split(' ');
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0].toUpperCase()}${nameParts[1][0].toUpperCase()}`
      : `${nameParts[0][0].toUpperCase()}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 56, // Increased width
      height: 56, // Increased height
      fontSize: '1.5rem', // Increased text size inside Avatar
    },
    children: initials,
  };
}

export default function BackgroundLetterAvatars() {
  const firstName = localStorage.getItem('firstName') || 'User';
  const lastName = localStorage.getItem('lastName') || '';

  const fullName = `${firstName} ${lastName}`.trim(); // Ensure no extra spaces

  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(fullName)} />
    </Stack>
  );
}
