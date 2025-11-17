// exercice: 
//Handling users registration:
//Creating and authenticating users from a MongoDB database
// Hash the passwords
// The authenticated users can access the books section of the app


const mongoose = require("mongoose");

 async function main() {
    // connect to MongoDB server , UsersDB database
 await mongoose.connect("mongodb://127.0.0.1:27017/users");
 console.log("Connected to DB");
 }

main().catch((err) => console.log(err));
// create a schema for UsersDB
 const UsersDB = new mongoose.Schema({
 username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
 password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
 email: {   
    type: mongoose.SchemaTypes.String,
    required: true,
  }
});

// export the model
 module.exports = mongoose.model("Users", UsersDB);