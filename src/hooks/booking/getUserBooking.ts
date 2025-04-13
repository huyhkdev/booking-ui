import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export function useUserBooking(token: string) {
    return useQuery({
        queryKey: ["userBooking", token],
        queryFn: () =>
            api.get(`${baseURL}/booking/user-bookings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    });
}
