const mongoose = require("mongoose");
const {MONGOURI} = require('../keys/keys');

const connect = () => {
    mongoose.connect(MONGOURI);
    
    mongoose.connection.on("connected", async () => {
        console.log("connected to mongo ");
    });
    mongoose.connection.on("error", async (err) => {
        console.log("error connecting", err);
    });
}

module.exports = connect;