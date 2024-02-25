import { Client, Account, ID, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, ID, storage };
