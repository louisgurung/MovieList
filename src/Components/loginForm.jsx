import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  // username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    // const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {/* <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          /> */}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
