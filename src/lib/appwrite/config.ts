import { Client, Account, Databases, Storage, Avatars } from 'appwrite';
//TODO: move .env.local to doppler
export const appwriteConfig = {
    projectId: import.meta.env.APPWRITE_PROJECT_ID,
    endpoint: import.meta.env.APPWRITE_ENDPOINT
};

export const appwriteClient = new Client();

appwriteClient.setProject(appwriteConfig.projectId);
appwriteClient.setEndpoint(appwriteConfig.endpoint);

export const appwriteAccount = new Account(appwriteClient);
export const appwriteDatabase = new Databases(appwriteClient);
export const appwriteStorage = new Storage(appwriteClient);
export const appwriteAvatars = new Avatars(appwriteClient);