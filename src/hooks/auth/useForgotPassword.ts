
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export interface ForgotPasswordI {
    email: string;
}
export function useForgotPassword() {
    return useMutation({
        mutationFn: (body: ForgotPasswordI) => {
            return api.post(`${baseURL}/user/forgot-password`, body);
        }
    });
}
