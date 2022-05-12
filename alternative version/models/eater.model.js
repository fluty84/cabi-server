const { Schema, model } = require("mongoose");

const eaterSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String, 
      required: true
    } 
  },
  {
    timestamps: true,
  }
);


module.exports = model("Eater", eaterSchema);
