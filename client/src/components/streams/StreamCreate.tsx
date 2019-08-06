import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

class StreamCreate extends React.Component<InjectedFormProps> {
  renderInput = ({input} : any) => <input {...input}/>
  render() {
    return (
      <form>
        <Field name="title" type = "text" component={this.renderInput}/>
        <Field name="description" type = "text" component={this.renderInput} />
      </form>
    );
  }
}

export default reduxForm<{}>({
  form: "streamCreate"
})(StreamCreate);
