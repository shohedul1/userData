import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please write your fullname"],
  },
  age: {
    type: String,
    required: [true, "please provide your age"],
    
  },
  address: {
    type: String,
    required: [true, "please provide your address"],
  },
  work: {
    type: String,
    required: [true, "please provide your work"],
  },
});

const userdata = mongoose.models.userData || mongoose.model("userData", userSchema)

export default userdata;
