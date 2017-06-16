import React from "react"
import Cart from "../common/containers/Cart"
import Account from "../common/containers/Account"

import {connect} from "react-redux"

const App = ({
    user
}) => (
    <div>
        <Cart userId={user && user.id}/>
        <hr/>
        <Account/>
    </div>
)

const mapStateToProps = state => ({
    user: state.account.user,
})

const AppContainer = connect(
  mapStateToProps,
)(App)

export default AppContainer
export const createInstance = () => (
    <AppContainer/>
) 