import * as account from "redux-commerce/lib/account"
import fetch from "redux-commerce/lib/fetch"
import {reducer as formReducer} from "redux-form"
import getHref, {CUSTOMER_INFO_PAGE, LOGIN_PAGE} from "../pages"

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
                    console.log(res)
                    if (res.id) redirectTo(CUSTOMER_INFO_PAGE)
                })
        case account.REGISTER:
            const {
                fullName,
                address,
                postalCode,
                city,
                email,
                password
            } = params
            const data = {
                id: email,
                fullName,
                address,
                postalCode,
                city,
                email,
                password
            }
            return fetch("/api/users", "POST", data)
                .then(() => redirectTo(LOGIN_PAGE))
        default:
            return Promise.reject(`No operation found for ${operation}`) 
    }
}

export const onInit = store => () => {
    store.dispatch(account.fetchUser())
}