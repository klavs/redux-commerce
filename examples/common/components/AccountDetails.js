import React from "react"

const AccountDetails = ({
    fullName,
    address,
    postalCode,
    city,
    email
}) => (
    <div>
        {fullName} <br/>
        {address} <br/>
        {postalCode} {city} <br/>
        {email} <br/>
    </div>
)

export default AccountDetails