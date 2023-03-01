import mongoose from 'mongoose';

const bookAdminSchema = new mongoose.Schema({
    facilityTitle: {
        type: String,
        required: true,
    },
    subFacility: {
        type: String
    },
    capacity: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        rewuired: true
    },
    image: {
        type: String,
        rewuired: true
    }
    // bookNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
})
export default mongoose.model("bookAdmin", bookAdminSchema);