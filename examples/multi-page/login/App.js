import React, {Component} from "react"
import LoginForm from "../../common/forms/LoginForm"
import {connect} from "react-redux"
import * as account from "redux-commerce/lib/account"

class LoginPage extends Component {
    componentDidMount(){
        this.props.onInit() 
    }
    render(){
        return (
            <LoginForm onSubmit={this.props.onLogin}/>
        )
    }
}


const LoginPageContainer = connect(
    state => account.mapState(state.account),
    account.mapDispatch
)(LoginPage)


export const createInstance = onInit => (
    <LoginPageContainer onInit={onInit}/>
) 