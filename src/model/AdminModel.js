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
        required: true
    },
    image: {
        type: String,
        required: true
    }
    // bookNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
})
export default mongoose.model("bookAdmin", bookAdminSchema);