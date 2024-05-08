import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

//TODO: move .env.local to doppler
export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,    
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,

};

export const appwriteClient = new Client();

appwriteClient.setProject(appwriteConfig.projectId);
appwriteClient.setEndpoint(appwriteConfig.endpoint);

export const appwriteAccount = new Account(appwriteClient);
export const appwriteDatabase = new Databases(appwriteClient);
export const appwriteStorage = new Storage(appwriteClient);
export const appwriteAvatars = new Avatars(appwriteClient);