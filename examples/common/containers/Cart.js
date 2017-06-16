import {connect} from "react-redux"
import * as cart from "redux-commerce/lib/cart"
import Cart from "../components/Cart"

const mapStateToProps = state => ({
    items: state.cart.items,
    isFetching: state.cart.isFetching,
    error: state.cart.error
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onFetch: () => dispatch(cart.fetchCart(ownProps.userId)),
    onChangeItemQuantity: (id, quantity) => dispatch(cart.updateItemQuantity(id, quantity)),
    onRemoveItem: id => dispatch(cart.removeItem(id)),
    onClearFetchingError: () => dispatch(cart.clearCartFetchingError()),
    onClearItemUpdatingError: id => dispatch(cart.clearItemUpdateError(id)),
    onClearItemRemovalError: id => dispatch(cart.clearItemRemovalError(id))
})

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

export default CartContainer