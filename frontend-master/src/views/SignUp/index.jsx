import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core';
import {signup,signupClear} from 'actions/signupAction';
import {connect} from 'react-redux'

// Material components
import {
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Shared utilities
import validators from 'common/validators';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

validate.validators.checked = validators.checked;

// Service methods
// const signUp = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(true);
//     }, 1500);
//   });
// };

class SignUp extends Component {
  state = {
    values: {
      username: '',
      fullname: '',
      email: '',
      password: '',
      policy: false
    },
    touched: {
      username: false,
      fullname: false,
      email: false,
      password: false,
      policy: null
    },
    errors: {
      username: null,
      fullname: null,
      email: null,
      password: null,
      policy: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 1500);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  componentWillUnmount(){
    this.props.signupClear();
  }

  handleSignUp = () => {
    const { values } = this.state;
    this.props.signup(values.username,values.fullname,values.email,values.password);
  }

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showusernameError =
      touched.username && errors.username ? errors.username[0] : false;
    const showfullnameError =
      touched.fullname && errors.fullname ? errors.fullname[0] : false;
    const showEmailError =
      touched.email && errors.email ? errors.email[0] : false;
    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;
    const showPolicyError =
      touched.policy && errors.policy ? errors.policy[0] : false;

    if(this.props.status == 200 || localStorage.getItem("isAuthenticated") == "true"){
        localStorage.setItem('isAuthenticated', true);
        this.props.history.push('/dashboard');
    }

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                    Takamaru Ayako
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                    Manager at inVision
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    Use your work email to create new account... it's free.
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Username"
                      name="username"
                      onChange={event =>
                        this.handleFieldChange('username', event.target.value)
                      }
                      value={values.username}
                      variant="outlined"
                    />
                    {showusernameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.username[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Full name"
                      onChange={event =>
                        this.handleFieldChange('fullname', event.target.value)
                      }
                      value={values.fullname}
                      variant="outlined"
                    />
                    {showfullnameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.fullname[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
                      value={values.email}
                      variant="outlined"
                    />
                    {showEmailError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.email[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Password"
                      onChange={event =>
                        this.handleFieldChange('password', event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                    <div className={classes.policy}>
                      <Checkbox
                        checked={values.policy}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={() =>
                          this.handleFieldChange('policy', !values.policy)
                        }
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1"
                      >
                        I have read the &nbsp;
                        <Link
                          className={classes.policyUrl}
                          to="#"
                        >
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                    </div>
                    {showPolicyError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.policy[0]}
                      </Typography>
                    )}
                  </div>
                  {this.props.hasErrored && (
                    <Typography
                      className={classes.submitError}
                      variant="body2"
                    >
                     {this.props.errorMsg}
                    </Typography>
                  )}
                  {this.props.isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    // just added
                    // <Link to='/' className={classes.link}> 
                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignUp}
                      size="large"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                    // </Link>
                  )}
                  <Typography
                    className={classes.signIn}
                    variant="body1"
                  >
                    Have an account?{' '}
                    <Link
                      className={classes.signInUrl}
                      to="/sign-in"
                    >
                      Sign In
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
      signup : (username,fullname,email,password) => dispatch(signup(username,fullname,email,password)),
      signupClear : () => dispatch(signupClear()),
  }
}

const mapStateToProps = (state) => {
  return {
    //  info: state.dashboard.info,
     isLoading : state.signup.isLoading,
     hasErrored : state.signup.hasErrored,
     status: state.signup.status,
     errorMsg: state.signup.errorMsg
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps,mapDispatchToProps)
)(SignUp);
