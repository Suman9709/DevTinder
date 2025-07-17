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
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "description",
    "gender",
    "imageUrl",
    "skills",
  ];

  const body = req.body;

  // 1. All keys must be allowed
  const isEditAllowed = Object.keys(body).every((field) =>
    allowedEditFields.includes(field)
  );

  if (!isEditAllowed) return false;

  // 2. If emailId is being updated, validate it
  if (body.emailId && !validator.isEmail(body.emailId)) {
    return false;
  }

  // 3. If age is present, make sure it's a number string and >= 18
  if (body.age && (!/^\d+$/.test(body.age) || parseInt(body.age) < 18)) {
    return false;
  }

  // 4. If gender is present, validate its value
  if (
    body.gender &&
    !["Male", "Female", "Others"].includes(body.gender)
  ) {
    return false;
  }

  // 5. If firstName or lastName exists, check length
  if (body.firstName && body.firstName.length < 2) {
    return false;
  }

  if (body.lastName && body.lastName.length < 2) {
    return false;
  }

  return true;
};




module.exports = {
    validateSignupData,
    validateEditProfileData,
}