const Datastore = require("nedb-promise");
const butik = new Datastore({
  filename: "./db/butik.db",
  autoload: true,
});
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


require("dotenv/config");

module.exports = {
    async create(logs){
        const { content, tag, date } = logs;
        const newStore = await butik.insert({
            content: await cryptr.encrypt(content),
            tag,
            date
        });
        return newStore
    },

    async createdlogs(logs){
        const {content,tag,date} = logs;
        console.log(logs)
        const newStore = await butik.find({ 
            tag
        })
        console.log("Detta får jag från newStore", newStore)
        return newStore
    }

    //post tag ska ligga här
}