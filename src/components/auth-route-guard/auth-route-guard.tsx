import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { withUser, IWithUserContext } from "../../providers/user/user-consumer";
import { CircularProgress } from "@material-ui/core";
import { getFirebaseAuth } from "../../firebase";
import PageSpinner from "../page-spinner";

interface IProps extends IWithUserContext, RouteComponentProps {
  redirectUrl: string;
}

class AuthenticatedRouteGuard extends React.Component<IProps, { fetchingUser: boolean }> {
  state = {
    fetchingUser: false
  };

  componentDidMount() {
    const { userContext, redirectUrl, history } = this.props;
    if (!getFirebaseAuth().currentUser) {
      this.setState({ fetchingUser: true });

      setTimeout(() => {
        userContext.getCurrentUser().then(user => {
          if (!user && !getFirebaseAuth().currentUser) {
            history.push(redirectUrl);
          }
          this.setState({ fetchingUser: false });
        });
      }, 2000);
    }
  }

  render() {
    const { fetchingUser } = this.state;

    if (fetchingUser) {
      return <PageSpinner children="Finding your account" />;
    }

    if (getFirebaseAuth().currentUser) {
      return <>{this.props.children}</>;
    }

    return null;
  }
}

const AuthRouteGuard = withRouter(withUser(AuthenticatedRouteGuard));
export default AuthRouteGuard;
