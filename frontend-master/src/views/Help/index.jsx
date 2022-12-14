import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';

// // Externals
// import PropTypes from 'prop-types';
// import compose from 'recompose/compose';
// import validate from 'validate.js';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
// import {
//   Grid,
//   Button,
//   IconButton,
//   CircularProgress,
//   TextField,
//   Typography
// } from '@material-ui/core';

import { Helmet } from 'react-helmet';
import ButtonAppBar from 'components/Navbar';

// Component styles
import styles from './styles';

class Help extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>Webboard | Help</title>
          <meta
            name="description"
            content="Webboard is a whiteboard for the web. Online writing tool that runs in your browser"
          />
        </Helmet>
        <ButtonAppBar />

        <p>Hello</p>
      </div>
    );
  }
}

export default withStyles(styles)(Help);
