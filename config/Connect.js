const mongoose =  require('mongoose');
require('dotenv').config();

const mongo_uri = process.env.MONGO_URI;
const dbConnect =  async() => {
    await mongoose.connect(mongo_uri)
        .then(() => console.log('Database Connected'))
        .catch((err) => console.error(err));
}
module.exports = dbConnect;

