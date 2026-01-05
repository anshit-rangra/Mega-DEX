import mongoose from 'mongoose'
import bcrypt from 'bcrypt'



const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true 
    },
    password: {
        type: String,
        required: true ,
        select: false
    },
    money: {
        type: Number,
        default: 1000
    },
    tokens: {
        type: Map,
        of: Number
    }
})

userSchema.pre("save", async function () {
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword;
})

const userModel = mongoose.model("users", userSchema)

export default userModel;