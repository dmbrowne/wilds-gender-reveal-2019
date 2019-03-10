import * as React from 'react';
import AppUserContext from './context';
import { User, firestore } from 'firebase';


interface IAppUserProps {
  user: User | null
  player: firestore.DocumentData | null
}

export interface IWithAppUserProps {
  appUser: IAppUserProps;
}

export default function appUserConsumer(Component: React.ReactType) {
  return function withAppUser<Props>(props: Props) {
    return (
      <AppUserContext.Consumer>
        {(appuserprops: IAppUserProps) => <Component {...props} appUser={appuserprops} />}
      </AppUserContext.Consumer>
    )
  }
}
