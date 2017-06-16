// operations
export const FETCH_CART = "redux-commerce/cart/FETCH_CART"
export const UPDATE_ITEM_QUNATITY = "redux-commerce/cart/UPDATE_ITEM_QUNATITY"
export const REMOVE_ITEM = "redux-commerce/cart/REMOVE_ITEM"

//actions
const UPDATE_ITEM_QUNATITY_INITIATED = "redux-commerce/cart/UPDATE_ITEM_QUNATITY_INITIATED"
const UPDATE_ITEM_QUNATITY_COMPLETED = "redux-commerce/cart/UPDATE_ITEM_QUNATITY_COMPLETED"
const UPDATE_ITEM_QUNATITY_FAILED = "redux-commerce/cart/UPDATE_ITEM_QUNATITY_FAILED"

const FETCH_CART_INITIATED = "redux-commerce/cart/FETCH_CART_INITIATED"
const FETCH_CART_COMPLETED = "redux-commerce/cart/FETCH_CART_COMPLETED"
const FETCH_CART_FAILED = "redux-commerce/cart/FETCH_CART_FAILED"

const REMOVE_ITEM_INITIATED = "redux-commerce/cart/REMOVE_ITEM_INITIATED"
const REMOVE_ITEM_COMPLETED = "redux-commerce/cart/REMOVE_ITEM_COMPLETED"
const REMOVE_ITEM_FAILED = "redux-commerce/cart/REMOVE_ITEM_FAILED"

const CLEAR_CART_FETCHING_ERROR = "redux-commerce/cart/CLEAR_CART_FETCHING_ERROR"
const CLEAR_ITEM_REMOVAL_ERROR = "redux-commerce/cart/CLEAR_ITEM_REMOVAL_ERROR"
const CLEAR_ITEM_UPDATE_ERROR = "redux-commerce/cart/CLEAR_ITEM_UPDATE_ERROR"

export default function reducer(
    state = {
        isFetching: false,
        error: null,
        items: []
    },
    action = {}
){
    switch (action.type){
        case FETCH_CART_INITIATED:
            return Object.assign({}, state, {isFetching: true})
        case FETCH_CART_FAILED:
            return Object.assign({}, state, {isFetching: false, error: action.payload})
        case FETCH_CART_COMPLETED:
            return Object.assign({}, state, {isFetching: false, items: action.payload.items.map(item => itemReducer(item, action))})
        case REMOVE_ITEM_COMPLETED:
            return Object.assign({}, state, {items: state.items.filter(item => item.id !== action.params.itemId)})
        case UPDATE_ITEM_QUNATITY_INITIATED:
        case UPDATE_ITEM_QUNATITY_FAILED:
        case UPDATE_ITEM_QUNATITY_COMPLETED:
        case REMOVE_ITEM_INITIATED:
        case REMOVE_ITEM_FAILED:
        case CLEAR_ITEM_REMOVAL_ERROR:
        case CLEAR_ITEM_UPDATE_ERROR:
            return Object.assign(
                {},
                state,
                {
                    items: state.items.map(
                        item => item.id === action.params.itemId ?
                        itemReducer(item, action) : item
                        )
                }
            )
        case CLEAR_CART_FETCHING_ERROR:
            return Object.assign({}, state, {error: null})
        default:
            return state
    }
}

const ITEM_DEFAULTS = {
    isUpdating: false,
    isRemoving: false,
    updatingError: null,
    removingError: null
}
function itemReducer(state, action){
    switch (action.type){
        case FETCH_CART_COMPLETED:
            return Object.assign({}, ITEM_DEFAULTS, state)
        case UPDATE_ITEM_QUNATITY_INITIATED:
            return Object.assign({}, state, {isUpdating: true})
        case UPDATE_ITEM_QUNATITY_FAILED:
            return Object.assign({}, state, {isUpdating: false, updatingError: action.payload})
        case UPDATE_ITEM_QUNATITY_COMPLETED:
            return Object.assign({}, state, {isUpdating: false, quantity: action.payload.quantity})
        case REMOVE_ITEM_INITIATED:
            return Object.assign({}, state, {isRemoving: true})
        case REMOVE_ITEM_FAILED:
            return Object.assign({}, state, {isRemoving: false, removingError: action.payload})
        case CLEAR_ITEM_REMOVAL_ERROR:
            return Object.assign({}, state, {removingError: null})
        case CLEAR_ITEM_UPDATE_ERROR:
            return Object.assign({}, state, {updatingError: null})
        default:
            return state
    }
}

// action creators
export const fetchCart = (userId) => ({
    type: FETCH_CART,
    meta: {
        operation: FETCH_CART,
        params: {
            userId
        }
    }
})

export const removeItem = itemId => ({
    type: REMOVE_ITEM,
    meta: {
        operation: REMOVE_ITEM,
        params: {
            itemId
        }
    }
})

export const updateItemQuantity = (itemId, quantity) => ({
    type: UPDATE_ITEM_QUNATITY,
    meta: {
        operation: UPDATE_ITEM_QUNATITY,
        params: {
            itemId,
            quantity
        }
    }  
})

export const clearCartFetchingError = () => ({
    type: CLEAR_CART_FETCHING_ERROR
})

export const clearItemRemovalError = itemId => ({
    type: CLEAR_ITEM_REMOVAL_ERROR,
    params: {
        itemId
    }
})

export const clearItemUpdateError = itemId => ({
    type: CLEAR_ITEM_UPDATE_ERROR,
    params: {
        itemId
    }
})