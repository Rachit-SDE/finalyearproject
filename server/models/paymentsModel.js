import mongoose  from "mongoose";


const paymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    txnId: { type: String, required: true},
    status: { type: String, enum: ['Faild', 'Pending', 'Other', 'prefer not to say'], required: true, },
    method: { type: String, enum: ['male', 'female', 'other', 'prefer not to say'], required: true },
    amount: {type: String, required:true},
},{minimize: false})

const Payment = mongoose.models.payment || mongoose.model("payment", paymentSchema);

export default Payment;