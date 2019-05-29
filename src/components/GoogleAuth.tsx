import React, { Component } from "react";

interface Props {}
interface State {
  isSignedIn: null | boolean;
}
class GoogleAuth extends Component<Props, State> {
  auth: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      isSignedIn: null
    };
  }
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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
        .catch(() => {});
    });
  }
  onAuthChange = ():void =>{
    this.setState({isSignedIn:this.auth.isSignedIn.get()})
  }
  renderAuthButton(): string {
    if (this.state.isSignedIn === null) {
      return "I am not sure I am signed in or not";
    } else if (this.state.isSignedIn) {
      return "I am Signed in";
    } else {
      return "I am not signed in";
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
