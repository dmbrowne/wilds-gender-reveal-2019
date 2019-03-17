import * as React from 'react';

type IComposer = (Component: React.ComponentType<any>) => React.ComponentType<any>;

export default function compose(...composers: IComposer[]) {
  return function(Component: React.ComponentType<any>) {
    return composers.reduce((ComposedComponent, composer) =>
      composer(ComposedComponent)
      , Component);
  }
}