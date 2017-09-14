import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Button } from 'react-bootstrap'
import _ from 'lodash'
import Main from './components/Main.jsx'
import TwitterInfluencerPopover from './components/TwitterInfluencerPopover.jsx'

const template = (<div>
  <Navbar className="inverse navbar-top">
    <Navbar.Header className="pull-left">
      <Navbar.Brand>
        <a href="/#!/">Headminer</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Header className="pull-right">
      <Button className="navbar-btn" href="/#!/jobs">Jobs</Button>
    </Navbar.Header>
  </Navbar>
  <TwitterInfluencerPopover />
  <Main />
</div>);

ReactDOM.render(
  template,
  document.getElementById('app')
)
