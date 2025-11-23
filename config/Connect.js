const mongoose =  require('mongoose');

const dbConnect =  async() => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Database Connected'))
        .catch((err) => console.error(err));
}
module.exports = dbConnect;

