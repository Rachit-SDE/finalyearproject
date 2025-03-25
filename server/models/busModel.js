import mongoose from 'mongoose';

const stoppageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    arivaltime: { type: String, required: true}

})

const  busSchema = new mongoose.Schema({
    busnumber: { type: String, required: true, unique: true },
    busname: { type: String, required: true},
    bustype: { type: String, required: true},
    totalseats: { type: String, required: true},
    availableseats: { type: String, required: true},
    price: { type: String, required: true},
    source: { type: String, required: true},
    sourcepoint: {type: Array, default: []},
    destination: { type: String, required: true},
    destinationpoint: {type: Array, default: []},
    arivaltime: { type: String, required: true},
    status: { type: String, enum: ['inactive', 'active'], default: 'inactive' },
    departuretime: { type: String, required: true},
    date:{type: Date, required: true},
    location: [0.0,0.0],
    stops: [stoppageSchema],
    seatsBooked:{type: Array, default: []},
},{minimize: false})

const Bus = mongoose.models.bus || mongoose.model("bus", busSchema);

export default Bus;
