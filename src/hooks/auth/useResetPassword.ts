
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export interface ResetPasswordI {
    newPassword: string;
    resetToken: string;
}
export function useResetPassword() {
    return useMutation({
        mutationFn: (body: ResetPasswordI) => {
            return api.post(`${baseURL}/user/reset-password`, body);
        }
    });
}
