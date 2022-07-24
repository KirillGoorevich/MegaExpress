import { Component } from 'react'
import { withIdleTimer } from 'react-idle-timer'
import { logout } from "../services/userService";

class IdleTimerComponent extends Component {

  onIdle () {
    logout();
  }

  // not used features

  onPrompt () {
    // Fire a Modal Prompt
  }

  onActive (event) {
    // Close Modal Prompt
    // Do some active action
  }

  onAction (event) {
    // Do something when a user triggers a watched event
  }

  componentDidMount () {
    // The IIdleTimer interface is supplied via props to your component
    this.props.start()
  }

  render () {
    return <div></div>
  }
}

export const IdleTimer = withIdleTimer(IdleTimerComponent)