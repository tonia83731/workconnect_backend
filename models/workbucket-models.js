const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workbucketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const workbucketModel = mongoose.model("Workbucket", workbucketSchema);
module.exports = workbucketModel;
