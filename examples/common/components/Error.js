import React from 'react'

const Error = ({
    message,
    onClear
}) => (
    <span>{message} <button type="button" onClick={onClear}>x</button></span>
)

export default Error