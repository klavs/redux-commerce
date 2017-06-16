import * as account from "redux-commerce/lib/account"
import fetch from "redux-commerce/lib/fetch"
import {reducer as formReducer} from "redux-form"
import getHref, {CUSTOMER_INFO_PAGE} from "../pages"

const redirectTo = page => window.location = getHref(page)

export const reducers = {
    form: formReducer,
    account: account.default
}

export const operationResolver = ({operation, params}) => {
    switch (operation) {
        case account.FETCH_USER:
            return fetch("/api/active-user")
                .then(res => {
                    if (!!res) redirectTo(CUSTOMER_INFO_PAGE)
                })
        case account.LOGIN:
            return fetch(`/api/users/${params.email}`)
                .then(user => {
                    if (user.password == params.password) {
                        const u = Object.assign({}, user)
                        delete u.password
                        return Promise.resolve(u)
                    } else {
                        return Promise.reject("Invalid password")
                    }
                })
                .then(user => fetch("/api/active-user", "POST", user))
                .then(() => redirectTo(CUSTOMER_INFO_PAGE))
        default:
            return Promise.reject(`No operation found for ${operation}`) 
    }
}

export const onInit = store => () => {
    store.dispatch(account.fetchUser())
}