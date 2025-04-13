
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export interface Review {
    bookingId: string,
    reviewContent: string,
    reviewRating: number,
}
export function useReview(token: string) {
    return useMutation({
        mutationFn: (body: Review) => {
            return api.post(`${baseURL}/review/createReview/${body.bookingId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
        }
    });
}
