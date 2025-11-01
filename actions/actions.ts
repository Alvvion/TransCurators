"use server";

import { redirect } from "next/navigation";
import { login, register } from "./auth";

export async function loginAction(formData: FormData) {
  const result = await login(formData);
  console.log(result);
  redirect("/");
}

export async function registerAction(formData: FormData) {
  const result = await register(formData);
  console.log(result);
  redirect("/");
}
