import * as React from 'react';
import { Avatar, CircularProgress } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';

import { ReactComponent as Tux } from './icons/tux.svg';
import { ReactComponent as Dress } from './icons/dress.svg';

export default function TeamAvatar({ theme, progress = 100 }: { theme: 'mr' | 'mrs', progress?: number }) {
  const Icon = theme === 'mr' ? Tux : Dress;
  const themecolor = theme === 'mr' ? green : purple;
  return (
    <div style={{ position: 'relative' }}>
      <Avatar style={{ width: 24, height: 24, padding: 8, background: themecolor[100], border: `3px solid transparent` }}>
        <Icon />
      </Avatar>
      <CircularProgress
        size={46}
        variant="static"
        value={progress}
        style={{
          position: 'absolute',
          color: themecolor[500],
          top: 0,
          left: 0,
        }}
      />
    </div>
  )
}