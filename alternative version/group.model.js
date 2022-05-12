const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    leader: {
      type: String,
      required: true
    },
    eaters: [{
      type: Schema.Types.ObjectId, ref: 'Eater', 
      required: true
    }],
    restaurant: {
      type: Schema.Types.ObjectId, ref: 'Restaurant' ,
      required: true
    }, 
  },
  {
    timestamps: true,
  }
);


module.exports = model("Group", groupSchema);
