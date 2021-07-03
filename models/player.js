const { connectDB, db } = require('./model.js');

const PlayerStore = {
    createMany: async (data) => {        
        try {
            await connectDB();
            const collection = db().collection(process.env.MONGO_COLLECTION);
            await collection.insertMany(data);
            console.log("inserted many");
        } catch(err) {
            console.log(err);
        }
        return data;
    },
    readAll: async () => {
        let col = [];

        try {
            await connectDB();
            const collection = db().collection(process.env.MONGO_COLLECTION);
            col = await collection.find().toArray();
            return col;
        } catch(err) {
            console.log(err);
        }

        return col;
    }
}

module.exports = {
    PlayerStore: PlayerStore
}