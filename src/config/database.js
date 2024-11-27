const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nadeemshaik227:w9bAI92EVbEDpc0E@nodejspractice.iu0cq.mongodb.net/devTinder"
  );
};

module.exports = connectDB


