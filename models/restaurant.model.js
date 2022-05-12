const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    adress: {
      type: String, 
      required: true
    } 
  },
  {
    timestamps: true,
  }
);


module.exports = model("Restaurant", restaurantSchema);
