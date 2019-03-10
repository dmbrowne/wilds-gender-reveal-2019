import * as React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider as ThemeProvider } from './contexts/theme';
import { Provider as AppUserProvider } from './contexts/app-user';

import TeamSelect from './pages/team-select';


export default function App() {
  return (
    <BrowserRouter>
      <AppUserProvider>
        <ThemeProvider>
          <Route path="/" component={TeamSelect} />
        </ThemeProvider>
      </AppUserProvider>
    </BrowserRouter>
  );
};
