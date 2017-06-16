import React from "react"
import Item from "./Item"
import Error from "./Error"

const Cart = ({
    items,
    onFetch,
    onClearFetchingError,
    onChangeItemQuantity,
    onRemoveItem,
    onClearItemUpdatingError,
    onClearItemRemovalError,
    isFetching,
    error,
}) => (
    <div>
        <button type="button" onClick={onFetch}>Fetch</button>
        {isFetching ? "Fetching..." : ""}
        {error ? <Error message={error} onClear={onClearFetchingError}/> : null}
        {
            items.map(item => (
                <Item
                    key={item.id}
                    {...item}
                    onRemove={onRemoveItem.bind(this, item.id)}
                    onChangeQuantity={onChangeItemQuantity.bind(this, item.id)}
                    onClearUpdatingError={onClearItemUpdatingError.bind(this, item.id)}
                    onClearRemovalError={onClearItemRemovalError.bind(this, item.id)}
                    />
            ))
        }
    </div>
)

export default Cart