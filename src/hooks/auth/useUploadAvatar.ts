import { useMutation } from "@tanstack/react-query";
import { baseURL } from "../../api/constant";
import api from "../../api/api";

export const useUploadAvatar = (token: string) =>{
    return useMutation({
      mutationFn: (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
  
        return api.post(`${baseURL}/user/change-avatar`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      },
    });
  }