
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export interface ChangePasswordI {
    oldPassword: string;
    newPassword: string;
}
export function useChangePassword(token: string) {
    return useMutation({
        mutationFn: (body: ChangePasswordI) => {
            return api.post(`${baseURL}/user/change-password`, body, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        }
    });
}
