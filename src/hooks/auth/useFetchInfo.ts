import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export function useGetUserProfile(token: string) {
  return useQuery({
    queryKey: ["userProfile", token],
    queryFn: () =>
      api.get(`${baseURL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });
}
