const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./db/users.db",
  autoload: true,
});
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {v4 : uuidv4} = require('uuid');

const userId = uuidv4()
require("dotenv").config();

module.exports = {
  //REGISTER NEW USER
  async register(body) {
    if (body.password === body.repeatPassword) {
      const user = await users.findOne({ email: body.email });
      if (user) {
        return false;
      } else {
        const passwordHash = await bcrypt.hash(body.password, 10);
        const newUser = {
          email: body.email,
          password: passwordHash,
          role: "user",
          name: body.name,
         _id:userId
        };
        console.log("user.js register ", newUser);
        return await users.insert(newUser);
      }
    } else {
      return false;
    }
  },
  //AUTHORIZED USERS
  async login(body) {
    const user = await users.findOne({ email: body.email });
    if (!user) {
      return false;
    } else {
      const passwordMatch = await bcrypt.compare(body.password, user.password);
      if (passwordMatch) {
        const secret = process.env.SECRET;
        const payload = {
          userID: user._id,
          role: user.role,
        };
        const token = jwt.sign(payload, secret);
        return {
          token: token,
          user: {
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      } else {
        return false;
      }
    }
  },

  async delete(id){
    console.log("du deletade", id)
    const deleteUser = await users.remove({_id:id})
    console.log(deleteUser)
    chats.persistence.compactDatafile()
    return deleteUser < 0
  }
};
