const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./db/users.db",
  autoload: true,
});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = {

async removeTag(userID,tag){
  console.log("hej",tag)
  let user = await users.findOne({ userID,tag });
  if(user = null)return;
  let data = await users.findOne({_id:userID})
  console.log(data)
  if(Array.isArray(data.tag)){
    
     let filtredtag = data.tag.filter((t) => t !== tag)
     console.log("finns i filtred tag", filtredtag)
     const newTags = await users.update({_id:userID},{$set: {tag:filtredtag}})
     console.log("detta retunerar jag",newTags)
     return newTags
  }
},

async findTag(userID){
  if(user = null) return;
  let data = await users.findOne({_id:userID})
    if(Array.isArray(data.tag)){
      console.log(data.tag)
      return data.tag
    }
},

async insertTag(body, userID){
    let user = await users.findOne({ userID });
    let {input} = body
    console.log(body ,input)
    if(user = null) return;
      let tagData = await users.findOne({_id:userID})
      let data = [];
      if(Array.isArray(tagData.tag)){
        tagData.tag.push(input)
        data = tagData.tag
      }else{
        data.push(input) 
      }
      return await users.update({_id:userID},{$set: {tag:data}})
  },
 

 
  async register(credentials) {
    const { email, password, repeatPassword,tag } = credentials;
    if (email == "" || password == "" || repeatPassword == "") return;
    const user = await users.findOne({ email });
    if (user) return;
    const newUser = await users.insert({
      email,
      tag,
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
    chats.persistence.compactDatafile()
    return deleteUser < 0
}


}


