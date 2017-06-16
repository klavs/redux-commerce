import React, {Component} from "react"
import Account from "../../common/containers/Account"
import {fetchUser} from "redux-commerce/lib/account"

class LoginPage extends Component {
    componentDidMount(){
        this.props.onInit() 
    }
    render(){
        return (
            <Account/>
        )
    }
}

export const createInstance = onInit => (
    <LoginPage onInit={onInit}/>
) 