import mongoose from 'mongoose'
import bcrypt from 'bcrypt'



const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true 
    },
    profile: {
        type: String,
        default: "https://imgs.search.brave.com/81QxeWbLGrhEHgsIajq4DoDXB44Y_p3qxQQ7wfBWknY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Qcm9m/aWxlLVBORy1JbWFn/ZS5wbmc"
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