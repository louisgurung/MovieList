import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    console.log("Submitted");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}></form>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}

        {this.renderButton("Register")}
      </React.Fragment>
    );
  }
}

export default RegisterForm;
