import * as account from "redux-commerce/lib/account"
import fetch from "redux-commerce/lib/fetch"
import {reducer as formReducer} from "redux-form"
import getHref, {LOGIN_PAGE, REGISTRATION_PAGE} from "../pages"

const redirectTo = page => window.location = getHref(page)

export const reducers = {
    form: formReducer,
    account: account.default
}

export const operationResolver = ({operation, params}) => {
    switch (operation) {
        case account.FETCH_USER:
            return fetch("/api/active-user")
        case account.LOGOUT:
            return fetch("/api/active-user", "POST", {})
        case account.LOGIN:
            return redirectTo(LOGIN_PAGE)
        case account.REGISTER:
            return redirectTo(REGISTRATION_PAGE)
        default:
            return Promise.reject(`No operation found for ${operation}`) 
    }
}

export const onInit = store => () => {
    store.dispatch(account.fetchUser())
}