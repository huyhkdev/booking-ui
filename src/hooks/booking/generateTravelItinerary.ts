import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export function useGenerateTravelItinerary(token: string) {
    return useMutation({
        mutationFn: ({ bookingId }: { bookingId: string }) => {
            return api.post(`${baseURL}/ai/travel-itinerary/${bookingId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
        }
    });
}


