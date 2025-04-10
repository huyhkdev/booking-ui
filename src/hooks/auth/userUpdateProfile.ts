
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export function userUpdateProfile(token: string) {
    return useMutation({
      mutationFn: (body: any) => {
        return api.post(`${baseURL}/user/profile`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      },
    });
  }
  