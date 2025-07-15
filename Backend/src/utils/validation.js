const validator = require('validator')

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body

    if (!firstName || !lastName) {
        throw new Error("Enter the First Name and Last Name")

    }

    else if (!validator.isEmail(emailId)) {
        throw new Error("Emai id is not valid")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password")
    }

}


const validateEditProfileData = (req) => {

    const allowedEditFileds = ["firstName", "lastName", "emailId", "age", "descriptio", "gender"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFileds.includes(field))
    return isEditAllowed;
}



module.exports = {
    validateSignupData,
    validateEditProfileData,
}