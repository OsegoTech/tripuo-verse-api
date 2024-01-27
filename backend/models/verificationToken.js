import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const verificationTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A verification token must belong to a user"],
  },
  token: {
    type: String,
    required: [true, "A verification token must have a token"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

verificationTokenSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("token")) return next();

  // Hash the password with cost of 12
  this.token = await bcrypt.hash(this.token, 12);

  next();
});

verificationTokenSchema.methods.correctToken = async function (
  candidateToken,
  userToken
) {
  return await bcrypt.compare(candidateToken, userToken);
};

const Token = mongoose.model("VerificationToken", verificationTokenSchema);
export default Token;
