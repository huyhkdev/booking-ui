
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export interface User {
    fullName: string;
    email: string;
    password: string;
}
export function useRegister() {
    return useMutation({
        mutationFn: (body: User) => {
            return api.post(`${baseURL}/user/register`, body);
        }
    });
}
