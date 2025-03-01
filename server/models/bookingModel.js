import mongoose from 'mongoose';


const  bookingSchema = new mongoose.Schema({
  bus: { type: String, require: true, },
  user: { type: String, require: true, },
  passengername: {type: String, },
  passengerage:{type: String, },
  passengergender: {type: String, enum: ['male', 'female', 'other', 'prefer not to say'],},
  passengerphone: {type: String, },
  source: {type: String, },
  destination: {type: String, },
  seats: { type: String,},
  price: { type: Number, },
  date: { type: Date, },
  ticketStatus: { type: String, default: 'Conformed' },
  transactionId: { type: String, },
},{
    timestamps: true,
});

const Bookings = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default Bookings;