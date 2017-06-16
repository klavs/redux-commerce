import Store from "redux-commerce"
import {reducers, operationResolver} from "./StoreConfig"
import {createInstance} from "./App"

const store = new Store(reducers, operationResolver)
store.render(createInstance(), document.getElementById("react-root"))