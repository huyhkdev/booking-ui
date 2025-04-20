import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { useAccessToken } from "../auth/useUserInfo";
import { baseURL } from "../../api/constant";

export const useWithdrawHistory = () => {
    const accessToken = useAccessToken()
    return useQuery({
        queryKey: ["owner-withdraw-history"],
        queryFn: () => api.get(`${baseURL}/owner/withdraw-history`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    })
}