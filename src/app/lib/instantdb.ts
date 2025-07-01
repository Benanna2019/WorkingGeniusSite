import { init } from "@instantdb/react";
import schema from "./instant.schema";

// Initialize InstantDB with the schema
const APP_ID = "6e257695-165f-4ad4-b326-a0e91b7b1ac5";

export const db = init({
  appId: APP_ID,
  schema,
});

// Export commonly used hooks
export const { useQuery, useAuth } = db;

// For mutations, use: db.transact([db.users.update(id, changes)])
// For queries, use: useQuery({ users: {} })

// Example usage:
// const { isLoading, error, data } = useQuery({ pets: {} })
