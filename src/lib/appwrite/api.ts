import { InterfaceNewUser } from "@/types";
import {
  appwriteAccount,
  appwriteAvatars,
  appwriteConfig,
  appwriteDatabase,
} from "./config";
import { ID, Query } from "appwrite";

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

export async function signInAccount(user: {
  email: string;
  password: string;
}) {
  try {
    const session = await appwriteAccount.createEmailPasswordSession(
      user.email,
      user.password

    );

    return session;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount= await appwriteAccount.get();

  if (!currentAccount) throw new Error("No user found");

    const currentUser = await appwriteDatabase.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
    [Query.equal("$id", currentAccount.$id)]);
    
  if (!currentUser) throw new Error("No user data found");

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
    return error;
  }
}