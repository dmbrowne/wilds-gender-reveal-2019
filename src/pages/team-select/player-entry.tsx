import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import SocialSignIn from '../../components/social-sign-in';
import AuthEntry from '../../components/auth-entry';

interface IPlayerEntryProps {
  onBackClick: () => any
  onSuccess: () => any
}

const PlayerEntry: React.FC<IPlayerEntryProps> = ({ onBackClick, onSuccess }) => (
  <>
    <Button size="small" onClick={() => onBackClick()} style={{ color: '#fff' }}>
      <ArrowBack /> Cancel
    </Button>
    <AuthEntry onSuccess={() => onSuccess()} />
    <SocialSignIn title="Or sign in using one of these social providers" />
  </>
);

export default PlayerEntry;