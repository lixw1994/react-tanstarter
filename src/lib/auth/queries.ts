import { queryOptions } from "@tanstack/react-query";
import { $getAuthInfo } from "./functions";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["authInfo"],
    queryFn: ({ signal }) => $getAuthInfo({ signal }),
  });

export type AuthInfo = Awaited<ReturnType<typeof $getAuthInfo>>;
