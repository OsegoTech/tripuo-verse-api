import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    price: { type: Number, required: true },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Add virtual property to populate the name of the provider
// serviceSchema.virtual("providerName", {
//   ref: "User",
//   localField: "provider",
//   foreignField: "_id",
//   justOne: true,
// });

const Service = mongoose.model("Service", serviceSchema);

export default Service;
