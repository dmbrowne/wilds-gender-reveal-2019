import React from 'react'
import TeamLogo from './team-logo';

export default function MrsLogo<P>(props: P) {
  return (
    <TeamLogo theme="mrs" {...props} />
  )
}
