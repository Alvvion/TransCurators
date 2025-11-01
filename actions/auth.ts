"use server";

import User from "@/models/UserSchema";
import { dbConnect } from "@/utils/db";
import { createSession } from "./session";

export async function register(formData: FormData) {
  const user = {
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  try {
    if (!user.email || !user.password || !user.name) {
      throw new Error("All fields are required.");
    }
    await dbConnect();
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const newUser = new User(user);
    await newUser.save();
    const payload = {
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
      },
    };

    const token = await createSession(payload);

    return {
      status: true,
      message: "Registered Successfully",
      token,
      user: payload.user,
    };
  } catch (error) {
    return {
      status: false,
      error: error instanceof Error ? error.message : "Registration failed",
    };
  }
}

export async function login(formData: FormData) {
  const user = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  try {
    if (!user.email || !user.password) {
      throw new Error("Email and password are required.");
    }
    await dbConnect();
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      throw new Error("Invalid email or password.");
    }

    const isMatch = await existingUser.matchPassword(user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    const payload = {
      user: {
        id: existingUser._id.toString(),
        email: existingUser.email,
        name: existingUser.name,
      },
    };

    const token = await createSession(payload);

    return {
      status: true,
      message: "Registered Successfully",
      token,
      user: payload.user,
    };
  } catch (error) {
    return {
      status: false,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}
