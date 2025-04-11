import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { baseURL } from "../../api/constant";

export function useUpdateHotel(token: string, hotelId: string) {
  return useMutation({
    mutationFn: (body: any) => {
      const isFormData = body instanceof FormData;

      return api.put(`${baseURL}/hotels/${hotelId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }),
        },
      });
    },
  });
}
