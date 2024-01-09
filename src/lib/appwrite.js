import { Client, Databases, Account, ID } from "appwrite";
import config from "../config/config";

const client = new Client();

client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };
