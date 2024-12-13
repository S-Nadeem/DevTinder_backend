const validator = require("validator");

const userSignupValidation = (req) => {
  const { firstName, lastName, emailId, password } = req;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password choose a strong password");
  }
};
module.exports={
    userSignupValidation
}