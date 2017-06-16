import Store from "redux-commerce"
import {reducers, operationResolver, onInit} from "./StoreConfig"
import {createInstance} from "./App"

const store = new Store(reducers, operationResolver)
store.render(
    createInstance(
        onInit(store.store)
    ),
    document.getElementById("react-root")
)