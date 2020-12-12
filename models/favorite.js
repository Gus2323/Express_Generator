const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);

const favoritesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    campsites: {
      type: Schema.Types.ObjectId,
    }
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", favoritesSchema);

module.exports = Favorite;
