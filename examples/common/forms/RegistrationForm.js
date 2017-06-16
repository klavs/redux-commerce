import React from "react"
import {Field, reduxForm} from "redux-form"

let RegistrationForm = ({
    handleSubmit
}) => {
    return (
        <form onSubmit={event => {
            event.preventDefault()
            handleSubmit()
        }}>
            <div>
                <label htmlFor="fullName">Full name</label>
                <Field name="fullName" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <Field name="address" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="postalCode">Postal code</label>
                <Field name="postalCode" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <Field name="city" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="email" />
            </div>
            <div>
                <label htmlFor="confirmEmail">Confirm email</label>
                <Field name="confirmEmail" component="input" type="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component="input" type="password" />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field name="confirm-password" component="input" type="password" />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

RegistrationForm = reduxForm({
    form: 'registration'
})(RegistrationForm)

export default RegistrationForm