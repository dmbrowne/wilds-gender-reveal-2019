import * as React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import { Provider as ThemeProvider } from './providers/theme';
import { Provider as UserProvider } from './providers/user';
import { Provider as TeamProvider } from './providers/team';
import { Provider as SessionProvider } from './providers/session';

import TeamSelect from './pages/team-select';
import Dashboard from './pages/home';
import AuthRouteGuard from './components/auth-route-guard';
import TeamRouteGuard from './components/team-route-guard';
import AutoSession from './components/auto-session/auto-session';
import GameplaySessionProvider from './providers/gameplay-session/provider';


export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <TeamProvider>
          <SessionProvider>
            <GameplaySessionProvider>
              <ThemeProvider>
                <Route exact path="/join" component={TeamSelect} />
                <AuthRouteGuard redirectUrl="/join">
                  <TeamRouteGuard redirectUrl="/join">
                    <AutoSession>
                      <Route exact path="/" component={Dashboard} />
                    </AutoSession>
                  </TeamRouteGuard>
                </AuthRouteGuard>
              </ThemeProvider>
            </GameplaySessionProvider>
          </SessionProvider>
        </TeamProvider>
      </UserProvider>
    </BrowserRouter>
  );
};
