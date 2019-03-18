import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import TeamSelect from './team-select';

const Story = () => {
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const teams = [
    {
      id: 'f90u34wefjo',
      theme: 'mr' as 'mr',
    },
    {
      id: 'fuj3wehaoundc',
      theme: 'mrs' as 'mrs',
    },
  ];
  return (
    <div style={{ height: '100vh' }}>
      <TeamSelect
        selectedTeamId={selectedTeamId}
        onSelectTeam={({ id }) => setSelectedTeamId(id)}
        minHeight="60vh"
        teams={teams}
        showConfirm={select('showConfirm', ['mr', 'mrs', false as any], false)}
      />
    </div>
  )
}

storiesOf('Components|Team Select', module)
.addDecorator(withKnobs)
.add('default', () => <Story />);