const mongoose=require('mongoose');

function connectDB() {
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to MongoDB');
    });
}

module.exports=connectDB;
