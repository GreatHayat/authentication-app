import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./components/Navbar";
import Register from "./pages/Register";
import authActions from "./redux/auth/actions";

const { getUsers } = authActions;
class App extends Component {
  state = {};

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
