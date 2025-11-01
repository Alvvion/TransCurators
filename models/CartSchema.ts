import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
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
        quantity: {
          type: Number,
          default: 1,
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
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
