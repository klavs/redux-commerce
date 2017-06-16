import {connect} from "react-redux"
import * as account from "redux-commerce/lib/account"
import Account from "../components/Account"

const mapStateToProps = state => ({
    user: state.account.user,
    hasFethced: state.account.hasFethced,
    isFetching: state.account.isFetching,
    error: state.account.error
})

const mapDispatchToProps = dispatch => ({
    onLogin: values => dispatch(account.login(values)),
    onRegister: values => dispatch(account.register(values)),
    onLogout: () => dispatch(account.logout()),
    onFetchUser: () => dispatch(account.fetchUser()),
})

const AccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default AccountContainer