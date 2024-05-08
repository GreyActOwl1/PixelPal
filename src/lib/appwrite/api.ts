import { InterfaceNewUser } from "@/types";
import { appwriteAccount } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: InterfaceNewUser) {
  try {
    const newAccount = await appwriteAccount.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    return newAccount;
  } catch (error) {
    console.error(error);
    return error;
  }
}
