import { InterfaceNewUser } from "@/types";
import {
  appwriteAccount,
  appwriteAvatars,
  appwriteConfig,
  appwriteDatabase,
} from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: InterfaceNewUser) {
  try {
    const newAccount = await appwriteAccount.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Account not created");

    const avatarUrl = await appwriteAvatars.getInitials(user.name);

    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
      username: user.username,
    });
    console.log(newAccount);
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function saveUserToDatabase(user: {
  accountId: string;
  name: string;
  email: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await appwriteDatabase.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.error(error);
    return error;
  }
}
