
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export interface UserLogin {
    email: string;
    password: string;
}
export function useLogin() {
    return useMutation({
        mutationFn: (body: UserLogin) => {
            return api.post(`${baseURL}/user/login`, body);
        }
    });
}
