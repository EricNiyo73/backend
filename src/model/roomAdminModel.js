import mongoose from 'mongoose';

const roomAdminSchema = new mongoose.Schema({
    maxPeaples: {
        type: Number,
    },
    roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
})
export default mongoose.model("RoomAdmin", roomAdminSchema);