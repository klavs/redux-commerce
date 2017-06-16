import * as cart from "redux-commerce/lib/cart"
import * as account from "redux-commerce/lib/account"
import configureStore from "redux-commerce/lib/redux-commerce"
import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import App from "./pages/App"
import fetch from "redux-commerce/lib/fetch"
import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"

const LOGIN_PAGE = "login"
const CUSTOMER_INFO_PAGE = "customer-info"
const CART_PAGE = "cart"
const DELIVERY_PAGE = "delivery"
const BILLING_PAGE = "billing"

const pages = {
    LOGIN_PAGE: {
        component: Cart,
        props: {userId: null},
        next: CUSTOMER_INFO_PAGE
    },
    CUSTOMER_INFO_PAGE: {
        component: null,
        props: {},
        next: CART_PAGE
    },
    CART_PAGE: {
        component: null,
        props: {},
        next: DELIVERY_PAGE
    },
    DELIVERY_PAGE: {
        component: null,
        props: {},
        next: BILLING_PAGE
    },
    BILLING_PAGE: {
        component: null,
        props: {}
    }
}

const store = configureStore(
    combineReducers({
        cart: cart.default,
        form: formReducer,
        account: account.default
    }),
    ({operation, params}) => {
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
)

store.subscribe(() => console.log(store.getState()))

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("react-root")
)