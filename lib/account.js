// operations
export const FETCH_USER = "redux-commerce/account/FETCH_USER"
export const LOGIN = "redux-commerce/account/LOGIN"
export const LOGOUT = "redux-commerce/account/LOGOUT"
export const REGISTER = "redux-commerce/account/REGISTER"

//actions
const FETCH_USER_INITIATED = "redux-commerce/account/FETCH_USER_INITIATED"
const FETCH_USER_COMPLETED = "redux-commerce/account/FETCH_USER_COMPLETED"
const FETCH_USER_FAILED = "redux-commerce/account/FETCH_USER_FAILED"

const LOGIN_INITIATED = "redux-commerce/account/LOGIN_INITIATED"
const LOGIN_COMPLETED = "redux-commerce/account/LOGIN_COMPLETED"
const LOGIN_FAILED = "redux-commerce/account/LOGIN_FAILED"

const LOGOUT_INITIATED = "redux-commerce/account/LOGOUT_INITIATED"
const LOGOUT_COMPLETED = "redux-commerce/account/LOGOUT_COMPLETED"
const LOGOUT_FAILED = "redux-commerce/account/LOGOUT_FAILED"

const REGISTER_INITIATED = "redux-commerce/account/REGISTER_INITIATED"
const REGISTER_COMPLETED = "redux-commerce/account/REGISTER_COMPLETED"
const REGISTER_FAILED = "redux-commerce/account/REGISTER_FAILED"

export default function reducer(
    state = {
        hasFethced: false,
        isFetching: false,
        fetchingError: null,
        isLoggingOut: false,
        logoutError: null,
        isLoggingIn: false,
        loginError: null,
        isRegistering: false,
        registrationError: null,
        user: null
    },
    action = {}
){
    switch (action.type){
        case FETCH_USER_INITIATED:
            return Object.assign({}, state, {isFetching: true})
        case FETCH_USER_FAILED:
            return Object.assign({}, state, {isFetching: false, hasFethced: true, fetchingError: action.payload})
        case FETCH_USER_COMPLETED:
            return Object.assign({}, state, {isFetching: false, hasFethced: true, user: action.payload})
        case LOGOUT_INITIATED:
            return Object.assign({}, state, {isLoggingOut: true})
        case LOGOUT_FAILED:
            return Object.assign({}, state, {isLoggingOut: false, logoutError: action.payload})
        case LOGOUT_COMPLETED:
            return Object.assign({}, state, {isLoggingOut: false, user: {}})
        case LOGIN_INITIATED:
            return Object.assign({}, state, {isLoggingIn: true})
        case LOGIN_FAILED:
            return Object.assign({}, state, {isLoggingIn: false, loginError: action.payload})
        case LOGIN_COMPLETED:
            return Object.assign({}, state, {isLoggingIn: false, user: action.payload})
        case REGISTER_INITIATED:
            return Object.assign({}, state, {isRegistering: true})
        case REGISTER_FAILED:
            return Object.assign({}, state, {isRegistering: false, registrationError: action.payload})
        case REGISTER_COMPLETED:
            return Object.assign({}, state, {isRegistering: false, user: action.payload})
        default:
            return state
    }
}

// action creators
export const fetchUser = () => ({
    type: FETCH_USER,
    meta: {
        operation: FETCH_USER,
    }
})
export const login = (values) => ({
    type: LOGIN,
    meta: {
        operation: LOGIN,
        params: values
    }
})
export const logout = () => ({
    type: LOGOUT,
    meta: {
        operation: LOGOUT,
    }
})
export const register = (values) => ({
    type: REGISTER,
    meta: {
        operation: REGISTER,
        params: values
    }
})