import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options); //schema used and initialized errors: {} and gave stringt to errors.username if no input is given
    //to connect joi object with error obj following steps were taken
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
    // console.log(result);
    // const errors = {};
    // const { data } = this.state;
    // if (data.username.trim() === "")
    //   errors.username = "Username is required";
    // if (data.password.trim() === "")
    //   errors.password = "Password is required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  //after u begin typing if u erase everything this shows
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] }; //[] is computed
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;

    // if (name === "username") {
    //   if (value.trim() === "") return "Username isss required";
    //   //...
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    //   //...
    // }
  };
  handleSubmit = e => {
    e.preventDefault();
    // in vanilla js =>>> const username = document.getElementById('username').value;
    // const username = this.username.current.value;
    //!!!always set errors to an object not null
    const errors = this.validate(); //
    this.setState({ errors: errors || {} }); //set state of errors to the errors if it has some value or an empty object
    if (errors) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    //makes a copy of the error, validates the input, if there is an errorMessage, sets error[] to that message
    //otherwise deletes the error[] ; makes a copy of data and sets data[] to the input value and sets state
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      ></Select>
    );
  }
}

export default Form;
