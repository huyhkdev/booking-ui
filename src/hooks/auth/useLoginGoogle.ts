import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export interface UserLoginGoogle {
    email: string;
    fullName: string;
    accessToken: string;
}

export function useLoginGoogle() {
    return useMutation({
        mutationFn: ({ email, fullName, accessToken }: UserLoginGoogle) => {
            return api.post(
                `${baseURL}/user/login-google`,
                { email, fullName }, // body
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        }
    });
}
