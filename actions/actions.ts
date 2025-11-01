"use server";

import { redirect } from "next/navigation";
import { addToCart, getProductCount } from "./products";
import { deleteSession, getSession } from "./session";
import toast from "react-hot-toast";

export async function addToCartAction(formData: FormData) {
  const result = await addToCart(formData);
  console.log(result);
  if (result.status) {
    toast.success(result.message || "");
  } else {
    toast.error(`Error occured ${result.error}`);
  }
}

export async function getProductCountAction(formData: FormData) {
  const session = await getSession();
  const id = session?.user?.id;
  formData.append("userId", id || "");
  const result = await getProductCount(formData);
  if (result.status) {
    return result.counter;
  } else {
    toast.error(`Error occured ${result.error}`);
    return null;
  }
}

export async function getUserAction() {
  try {
    const session = await getSession();
    const id = session?.user?.id;
    if (id) {
      return {
        status: true,
        user: session.user,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error,
    };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
