/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";
import config from "../../config/config";

// export const IDEAS_DATABASE_ID = config.appwriteDatabaseId; // Replace with your database ID
// export const IDEAS_COLLECTION_ID = config.appwriteCollectionId; // Replace with your collection ID

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);

  //   async function add(idea) {
  //     const response = await databases.createDocument(
  //       config.appwriteDatabaseId,
  //       config.appwriteCollectionId,
  //       ID.unique(),
  //       idea
  //     );
  //     setIdeas((ideas) => [response.$id, ...ideas].slice(0, 10));
  //   }
  async function add(idea) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        idea
      );
      console.log(response);
      setIdeas((ideas) => [response.$id, ...ideas].slice(0, 10));
    } catch (error) {
      console.error("Error creating document:", error);
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
      );
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init(); // Refetch ideas to ensure we have 10 items
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [(Query.orderDesc("$createdAt"), Query.limit(10))]
        //   [Query.equal("title", "Ankit")]
      );
      setIdeas(response.documents);
      // console.log(ideas);
    } catch (error) {
      console.error("Error Listing document:", error);
    }
  }

  useEffect(() => {
    init();
    console.log(ideas);
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
