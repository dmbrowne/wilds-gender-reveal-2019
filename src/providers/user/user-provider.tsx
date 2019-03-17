import React, { Component } from 'react'
import UserContext from './user-context.old.';
import { User } from 'firebase/app';
import { getFirebaseAuth } from '../../firebase';

interface IState {
  user: User | null
}

export interface IContext {
  user: IState['user'];
  isAuthenticated: () => boolean;
  getCurrentUser(): Promise<User | null>;
}

export default class UserProvider extends Component<{}, IState> {
  state = {
    user: null,
  }

  componentDidMount() {
    getFirebaseAuth().onAuthStateChanged((user) => {
      this.updateUser(user)
    })
  }

  updateUser = (user: User | null) => {
    this.setState({ user })
  }

  isAuthenticated = (): boolean => !!getFirebaseAuth().currentUser;

  getCurrentUser = () => {
    return new Promise<User | null>((resolve, reject) => {
      const unsubscribe = getFirebaseAuth().onAuthStateChanged(user => {
        this.setState({ user });
        unsubscribe();
        resolve(user);
      });
    });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          isAuthenticated: this.isAuthenticated,
          getCurrentUser: this.getCurrentUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
