import * as React from 'react';

type IComposer = (Component: React.ReactType) => React.ReactType;

export default function compose(...composers: IComposer[]) {
  return function (Component: React.ReactType) {
    composers.reduce((ComposedComponent, composer) => 
      composer(ComposedComponent)
    , Component);
  }
}