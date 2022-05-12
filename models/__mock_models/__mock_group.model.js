const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    leader: {
      type: String,
      required: true
    },
    eaters: {
      type: [String], 
      required: true
    },
    restaurant: {
      type: String,
      required: true
    }, 
  },
  {
    timestamps: true,
  }
);


module.exports = model("__mock_Group", groupSchema);
