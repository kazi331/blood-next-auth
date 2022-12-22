import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  blood: {
    type: String,
    required: [true, 'blood is required'],
  },
  isAvailable: Boolean,

})

// hash password before saving to database
userShema.pre('save', async function(next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.models.User || mongoose.model('User', userShema)

export default User;