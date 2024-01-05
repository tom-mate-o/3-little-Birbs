const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.login = async (req, res) => {
     // destructuring der Daten aus dem Request Body
  const { username, password } = req.body;
  // überprüfen, ob username und password im request.body vorhanden sind
  if (!username || !password){
   return res.status(400).send({message: "Required field is missing!"});
  }

  //Error Handling
  // check if user exists in DB
  const existingUser = await User.findOne({username}); // Model ansprechen über filter username
  if (!existingUser){
    console.log("User does not exist!");
    return res.status(404).send({message: "User does not exist!"});
  }

  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.hashedPassword //vergleich des eingegeben passwords mit dem entschlüsselten password aus der DB
  );
  if (!isPasswordCorrect){
    console.log("Password is incorrect!");
    return res.status(401).send({message: "Password is incorrect!"});
  }
  if (isPasswordCorrect || existingUser){
    console.log("Login successful!");

    // If PW is correct + User exists, create JWT Token
    //dient dazu einen gehashten Wert in den local Storage zu speichern und nicht das userPW!
    const token = jwt.sign({id: existingUser.id}, process.env.JWT_SECRET_KEY);
    console.log("token: " + token);

    return res.status(200).send({message: "Login successful!", token});
  }
};