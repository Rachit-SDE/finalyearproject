import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
    name: { type: String,  },
    age: { type: Number,  },
    phone: { type: Number,  },
    adhar: { type: Number,  unique: true },
    gender: {type: String, enum: ['male', 'female', 'other', 'prefer not to say'],},
})

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true},
    email: { type: String, required: true, },
    password: { type: String, required: true },
    phone: {type: Number, required:true},
    gender: {type: String, enum: ['male', 'female', 'other', 'prefer not to say'],},
    adharcard: {type: String, unique: true},
    isAdmin:{type: Boolean, default: false},
    FamilyData:[memberSchema],
    TicketData:{type:Object,default:{}},
},{minimize: false})

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;