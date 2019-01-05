import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    //call the server
    console.log("logando...");
  };

  handleChange = ({ currentTarget: input }) => {
    //clona o account existente
    const account = { ...this.state.account };
    //pega o valor o input no momento
    account[input.name] = input.value;
    //atribui ao state
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
