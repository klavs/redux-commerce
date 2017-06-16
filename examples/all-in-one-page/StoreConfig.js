import * as cart from "redux-commerce/lib/cart"
import * as account from "redux-commerce/lib/account"
import fetch from "redux-commerce/lib/fetch"
import {reducer as formReducer} from "redux-form"

export const reducers = {
    cart: cart.default,
    form: formReducer,
    account: account.default
}

export const operationResolver = ({operation, params}) => {
    switch (operation) {
        case cart.FETCH_CART:
            return fetch(`/api/items?user=${params.userId || "anonymous"}`).then(items => ({items}))
        case cart.UPDATE_ITEM_QUNATITY:
            return fetch(`/api/items/${params.itemId}`, "PATCH", {quantity: params.quantity})
        case cart.REMOVE_ITEM:
            return fetch(`/api/items/${params.itemId}`, "DELETE")
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
        case account.LOGOUT:
            return fetch("/api/active-user", "POST", {})
        case account.FETCH_USER:
            return fetch("/api/active-user")
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
        default:
            return Promise.reject(`No operation found for ${operation}`) 
    }
}