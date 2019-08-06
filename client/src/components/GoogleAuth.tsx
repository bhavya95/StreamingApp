import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { StoreState } from "../types";

interface Props {
  signIn: Function;
  signOut: Function;
  isSignedIn: null | boolean;
}
class GoogleAuth extends Component<Props, {}> {
  auth: any;
  componentDidMount() {
    const myWindow = window as any;
    myWindow.gapi.load("client:auth2", () => {
      myWindow.gapi.client
        .init({
          clientId:
            "706891232372-la0fuhrkka8d229hp3qhfqm3aefoipn1.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = myWindow.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        })
        .catch(() => {});
    });
  }
  onAuthChange = (isSignedIn: boolean): void => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = (): void => {
    this.auth.signIn();
  };
  onSignOutClick = (): void => {
    this.auth.signOut();
  };
  renderAuthButton(): JSX.Element | null {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon">Sign Out</i>
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon">Sign In with Google</i>
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth: { isSignedIn } }: StoreState) => ({
  isSignedIn
});

const mapDispatchToProps = {
  signIn,
  signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAuth);
