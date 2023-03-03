import mongoose from 'mongoose';
const bookUserSchema = new mongoose.Schema(
    {
      firstname: {
        type: String,
        required: true,
      },
     lastname: {
        type: String,
        required: true,
      },
      facilities: [{
        facility: {
          type: String,
          required: true,
        },
        subFacility: {
          type: String
        },
      }],

      maxPeople: {
        type: Number,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      availability: [{
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          enum: ["Morning", "Afternoon","Fullday"],
          required: true,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
      }],
      status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
      },
    },
    { timestamps: true }

    // bookNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
 
);

export default mongoose.model("bookUser", bookUserSchema);