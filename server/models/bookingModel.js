import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
  passengername: {type: String, },
  passengerage:{type: String, },
  passengergender: {type: String, enum: ['male', 'female', 'other', 'prefer not to say'],},
  passengerphone: {type: String, },
  seats: { type: String, },
  price: { type: Number, }, 
});


const  bookingSchema = new mongoose.Schema({
  busid: { type: String, require: true, },
  busnumber: { type: String, require: true, },
  userid: { type: String, require: true, },
  passengers: [passengerSchema],
  source: {type: String, },
  startpoint: {type: Array},
  endpoint: {type: Array},
  destination: {type: String, },
  totalprice: { type: Number, },
  transactionId: { type: String, },
  date: { type: Date, },
  ticketStatus: { type: String, default: 'Confirmed' },
},{
    timestamps: true,
});

const Bookings = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default Bookings;
