import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";
import { useAccessToken } from "../auth/useUserInfo";

export const useWithdraw = () => {
    const accessToken = useAccessToken()
    return useMutation({
        mutationFn: (amount: number) => api.post(`${baseURL}/owner/withdraw`, { amount }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    })
}