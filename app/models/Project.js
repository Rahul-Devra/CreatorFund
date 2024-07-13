import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  projectName: { type: String, required: true },
  fundingAmount: { type: Number, required: true },
  fundingGoal: { type: String, required: true },
  projectUpdate: { type: String, required: true },
  projectDescription: { type: String, required: true },
  isEditable: {type:Boolean , default:false}
  
});

const Project = mongoose.models.Project || model("Project", ProjectSchema);

export default Project;

