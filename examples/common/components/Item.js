import React from "react"
import Error from "./Error"

const Item = ({
    isUpdating,
    isRemoving,
    updatingError,
    removingError,
    name,
    quantity,
    onChangeQuantity,
    onRemove,
    onClearUpdatingError,
    onClearRemovalError
}) => (
    <div>
        {name}
        <button type="button" onClick={() => onChangeQuantity(quantity-1)}>-</button>
        {quantity}
        <button type="button" onClick={() => onChangeQuantity(quantity+1)}>+</button>
        <button type="button" onClick={onRemove}>x</button>
        {isUpdating ? "updating..." : ""}
        {isRemoving ? "removing..." : ""}
        {updatingError ? <Error message={updatingError} onClear={onClearUpdatingError}/> : null}
        {removingError ? <Error message={removingError} onClear={onClearRemovalError}/> : null}
    </div>
)

export default Item