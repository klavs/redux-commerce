import React, {Component} from "react"
import AccountDetails from "../../common/components/AccountDetails"
import {connect} from "react-redux"
import * as account from "redux-commerce/lib/account"

class CustomerInfoPage extends Component {
    componentDidMount(){
        this.props.onInit() 
    }
    render(){
        const {
            hasFethced,
            isFetching,
            fetchingError,
            isLoggingOut,
            logoutError,
            isLoggingIn,
            loginError,
            isRegistering,
            registrationError,
            user,

            onLogin,
            onRegister,
            onLogout,
            onFetchUser
        } = this.props
        const isLoggedIn = user !== null && user.id
        return (
            <div>
                {
                    isLoggedIn ? (
                        <AccountDetails {...user}/>
                    ) : (
                        <p>You are not logged in!</p>
                    )
                }
                {
                    isLoggedIn ? (
                        <button onClick={onLogout}>Change user</button>
                    ) : (
                        undefined
                    )
                }
                {
                    isLoggedIn ? (
                        undefined
                    ) : (
                        <button onClick={onLogin}>Log in</button>
                    )
                }
                {
                    isLoggedIn ? (
                        undefined
                    ) : (
                        <button onClick={onRegister}>Register</button>
                    )
                }
            </div>
        )
    }
}

const CustomerInfoPageContainer = connect(
    state => account.mapState(state.account),
    account.mapDispatch
)(CustomerInfoPage)


export const createInstance = onInit => (
    <CustomerInfoPageContainer onInit={onInit}/>
) 