import * as React from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";

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
import SessionSelect from './pages/session-select/session-select';
import SessionGuard from './components/session-guard/session-guard';
import Gameplay from './pages/gameplay';
import CurrentScores from './pages/current-scores';
import GenderPrediction from './pages/gender-prediction';
import AddScavengerHuntQuestions from './add-scavenger-hunt-questions';


export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <TeamProvider>
          <SessionProvider>
            <GameplaySessionProvider>
              <ThemeProvider>
                <Route exact path="/join" component={TeamSelect} />
                {/* <Route exact path="/add-questions" component={AddScavengerHuntQuestions} /> */}
                <AuthRouteGuard redirectUrl="/join">
                  <TeamRouteGuard redirectUrl="/join">
                      <Route exact path="/" component={SessionSelect} />
                      <Route
                        path="/:sessionId/:gameplaySessionId"
                        render={props => (
                          <SessionGuard {...props} redirectUrl="/" Component={GameRoutes} />
                        )}
                      />
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

const GameRoutes = ({ match }: RouteComponentProps) => (
  <div>
    <Route exact path={`${match.url}`} component={Dashboard} />
    <Route path={`${match.url}/games/:gameId`} component={Gameplay} />
    <Route exact path={`${match.url}/scores`} component={CurrentScores} />
    <Route exact path={`${match.url}/genderprediction`} component={GenderPrediction} />
  </div>
)