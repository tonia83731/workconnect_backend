const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    workfolderId: {
      type: Schema.Types.ObjectId,
      ref: "Workfolder",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed"],
      default: "pending",
    },
    note: {
      type: String,
    },
    deadline: {
      type: Number,
    },
    checklists: [
      {
        isChecked: { type: Boolean, default: false },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    assignments: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const todoModel = mongoose.model("Todo", todoSchema);
module.exports = todoModel;
