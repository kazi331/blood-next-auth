import mongoose from "mongoose";

// mongoose connection
const connectDB = async () => {
  const options = { dbName: 'next-auth', useNewUrlParser: true, useUnifiedTopology: true }
 await mongoose.connect(process.env.MONGODB_URI, options)
    .then(() => console.log('db connected'))
    .catch(err => console.log(err))
}
export default connectDB;
