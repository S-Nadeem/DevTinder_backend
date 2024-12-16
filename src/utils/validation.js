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

const userEditValidation = (req)=>{
  const allowedEditFields = ["firstName", "lastName", "emailId","gender","skills","about","age","photoUrl"]
  const isEditAllowed = Object.keys(req.body).every((field)=> allowedEditFields.includes(field))
  return isEditAllowed
}

const userPasswordValidation = (req)=>{
  if (!validator.isStrongPassword(req.body)) {
    throw new Error("Password choose a strong password");
  }
}
module.exports={
    userSignupValidation,
    userEditValidation
}