const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workfolderSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 50,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    workbucketId: {
      type: Schema.Types.ObjectId,
      ref: "Workbucket",
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const workfolderModel = mongoose.model("Workfolder", workfolderSchema);
module.exports = workfolderModel;
