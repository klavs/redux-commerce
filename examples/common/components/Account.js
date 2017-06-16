import React from "react"
import Error from "./Error"
import LoginForm from "../forms/LoginForm"
import RegistrationForm from "../forms/RegistrationForm"
import AccountDetails from "../components/AccountDetails"

const Account = ({
    onFetchUser,
    onLogin,
    onRegister,
    onLogout,

    user,
    hasFetched,
    isFetching,
    error
}) => (
    <div>
        {
            !(user && user.id) ? (
                <button onClick={onFetchUser}>Fetch user</button>
            ) : undefined
        }
        {
            (user && !user.id)? (
                <div>
                    <LoginForm onSubmit={onLogin}/>
                    <RegistrationForm onSubmit={onRegister}/>
                </div>
            ) : undefined
        }
        {
            user && user.id ? (
                <div>
                    <button onClick={onLogout}>Logout</button>
                    <AccountDetails {...user}/>
                </div>
            ) : undefined
        }
    </div>
)

export default Account