import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
      trim: true,
    },
    products: [
      {
        Id: {
          type: String,
          required: true,
          trim: true,
        },
        title: {
          type: String,
          required: true,
          trim: true,
        },
        image: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
