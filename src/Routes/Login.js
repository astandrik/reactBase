import React, { Component } from 'react';
import './App.css';
import FlatButton from 'material-ui/FlatButton';
import {validateLoginData} from "../redux/actions/userActions";

import { connect } from 'react-redux';




const LoginPanel = (props) => {
  return (
      <div className="login-panel">
        <input className="login-panel-input" value={props.context.login} onChange={props.context.handleLoginChange.bind(props.context)} placeholder="Логин"/>
        <input className="login-panel-input" value={props.context.password} onChange={props.context.handlePasswordChange.bind(props.context)} placeholder="Пароль" type="password"/>
        <FlatButton backgroundColor="yellow" onClick={props.context.validateLoginData.bind(props.context)} label="войти" />
      </div>
  )

}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    }
  }
  handleLoginChange(event) {
    this.setState({login: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  validateLoginData() {
    this.props.validateLoginData({
      login: this.state.login,
      password: this.state.password
    })
  }
  render() {
    const name = "Автоматизированная информационная Система Планирования и Контроля Исполнения государственного задания ФГБУ \"НИИ ЦПК имени Ю.А.Гагарина\"";
    const enter=() => {};
    const self = this;
    return (
      <div className="login-view">
        <div className="login-block">
        <h1>{name}</h1>
        <LoginPanel context={self} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    validateLoginData: (obj) => {
        dispatch(validateLoginData(obj));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default Visible;
