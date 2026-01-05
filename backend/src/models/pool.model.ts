import mongoose from 'mongoose';

const liquidityPool = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    tokenAmount: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true 
    },
    constant: {
        type: Number,
        default: 0
    }
    
})

const poolModel = mongoose.model("pools", liquidityPool)

export default poolModel;