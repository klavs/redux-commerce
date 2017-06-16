import React, {Component} from "react"
import RegistrationForm from "../../common/forms/RegistrationForm"
import {connect} from "react-redux"
import * as account from "redux-commerce/lib/account"

class RegistrationPage extends Component {
    componentDidMount(){
        this.props.onInit() 
    }
    render(){
        return (
            <RegistrationForm onSubmit={this.props.onRegister}/>
        )
    }
}

const RegistrationPageContainer = connect(
    state => account.mapState(state.account),
    account.mapDispatch
)(RegistrationPage)


export const createInstance = onInit => (
    <RegistrationPageContainer onInit={onInit}/>
) 