import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useViewerQuery() {
  const data = useQuery(api.users.viewer);
  return data;
}
