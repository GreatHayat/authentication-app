import React, { Component } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Joi from "joi-browser";
import userActions from "../redux/user/actions";

const { setRegisterFormData } = userActions;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Register extends Component {
  state = {
    user: {},
    errors: {},
  };

  schema = {
    username: Joi.string().min(8).max(16).required().label("Username"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(
      this.props.register_form_data,
      this.schema,
      options
    );
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    const user = { ...this.props.register_form_data };
    const errors = { ...this.props.register_form_errors };

    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) {
      errors[e.target.name] = errorMessage;
    } else {
      delete errors[e.target.name];
    }

    user[e.target.name] = e.target.value;
    this.props.setRegisterFormData({ form: user, errors: errors });
  };

  render() {
    const {
      register_form_data: user,
      register_form_errors: errors,
    } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar style={{ margin: "10px" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form noValidate style={{ marginTop: "15px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  value={user.username}
                  onChange={(e) => this.handleChange(e)}
                  error={errors && errors["username"]}
                  helperText={errors && errors["username"]}
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  value={user.email}
                  onChange={(e) => this.handleChange(e)}
                  error={errors && errors["email"]}
                  helperText={errors && errors["email"]}
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  value={user.password}
                  onChange={(e) => this.handleChange(e)}
                  error={errors && errors["password"]}
                  helperText={errors && errors["password"]}
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", marginBottom: "10px" }}
              disabled={this.validate()}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    register_form_data: state.User.get("register_form_data"),
    register_form_errors: state.User.get("register_form_errors"),
  }),
  {
    setRegisterFormData,
  }
)(Register);
