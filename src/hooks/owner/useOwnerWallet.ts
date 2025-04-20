import { useQuery } from "@tanstack/react-query"
import api from "../../api/api"
import { useAccessToken } from "../auth/useUserInfo"
import { baseURL } from "../../api/constant"

export const useOwnerWallet = () => {
    const accessToken = useAccessToken()
    return useQuery({
        queryKey: ["owner-wallet"],
        queryFn: () => {
            return api.get(`${baseURL}/owner/wallet`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
    })
}

