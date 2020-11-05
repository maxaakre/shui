const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./db/users.db",
  autoload: true,
});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv/config");

module.exports = {
  async register(credentials) {
    const { email, password, repeatPassword } = credentials;
    if (email == "" || password == "" || repeatPassword == "") return;
    const user = await users.findOne({ email });
    if (user) return;
    const newUser = await users.insert({
      email,
      password: await bcrypt.hash(password, 10),
    });
    const token = jwt.sign(
      {
        email: newUser.email,
        userID: newUser._id,
        username: newUser.username,
        role: "user"
      },
      process.env.SECRET
    );
    return {
      email: newUser.email,
      token,
    };
  },

  async login(credentials) {
    const { email, password } = credentials;
    if (email == "" || password == "") return;
    const user = await users.findOne({ email });
    if (!user) return;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return;
    const token = jwt.sign(
      {
        userID: user._id,
        email: user.email,
      },
      process.env.SECRET
    );
    return {
      email: user.email,
      token,
    };
  },
  async delete(id){
    console.log("du deletade", id)
    const deleteUser = await users.remove({_id:id})
    console.log(deleteUser)
    // chats.persistence.compactDatafile()
    return deleteUser < 0
}


}


