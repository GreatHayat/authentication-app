import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./components/Navbar";
import Register from "./pages/Register";
import authActions from "./redux/auth/actions";
import Joi from "joi-browser";

const { getUsers } = authActions;
class App extends Component {
  state = {
    data: { username: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(8).required().label("Username"),
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) {
      errors[e.target.name] = errorMessage;
    } else {
      delete errors[e.target.name];
    }
    data[e.target.name] = e.target.value;

    this.setState({ data, errors });
  };

  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Register />
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    users: state.Auth.users,
  }),
  {
    getUsers,
  }
)(App);
