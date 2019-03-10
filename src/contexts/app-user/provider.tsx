import React, { Component } from 'react'
import AppUserContext from './context';

export default class AppUserProvider extends Component {
  state = {
    user: null,
    player: null,
  }

  render() {
    return (
      <AppUserContext.Provider
        value={{
          user: this.state.user,
          player: this.state.player,
        }}
        children={this.props.children}
      />
    )
  }
}
