const Datastore = require("nedb-promise");
const butik = new Datastore({
  filename: "./db/butik.db",
  autoload: true,
});
const Cryptr = require('cryptr');
const cryptr = new Cryptr("myTotalySecretKey");


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

    async createdlogs(){
        const stores = await butik.find({})
        const newStores = stores.map( store => {
            const storeObejc = {

                content: cryptr.decrypt(store.content),
                tag: store.tag,
                date:  store.date
            }
            return storeObejc
        })
        console.log("Detta får jag från newStore", newStores)
        return newStores
    }

    //post tag ska ligga här
}