const mongoose = require('mongoose')

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected")
    }catch(err){
        console.log("databasse connection failed")
        console.error(err)
        process.exit(1)
    }
}
module.exports = connectdb
