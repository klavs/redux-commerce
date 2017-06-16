import React from "react"
import {Provider} from "react-redux"
import {createStore, applyMiddleware, combineReducers} from "redux"
import {render} from "react-dom"

export default class Store {
    constructor(reducers = {}, operationResolver){
        const operationMiddleware = store => next => action => {
            if (!action.meta || !action.meta.operation) return next(action)
            store.dispatch({
                type: `${action.type}_INITIATED`,
                params: action.meta.params
            })
            operationResolver(action.meta, store)
                .then(
                    response => {
                        store.dispatch({
                            type: `${action.type}_COMPLETED`,
                            params: action.meta.params,
                            payload: response
                        })
                    },
                    error => {
                        store.dispatch({
                            type: `${action.type}_FAILED`,
                            params: action.meta.params,
                            payload: error
                        })
                    }
                )
        }

        this.store = createStore(
            combineReducers(reducers),
            applyMiddleware(
                operationMiddleware,
                actionLogger,
            )
        )
    }
    render(element, container){
        render(
            <Provider store={this.store}>
                {element}
            </Provider>,
            container
        )
    }
}

const actionLogger = store => next => action => {
    console.log(action)
    next(action)
}

