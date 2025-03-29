import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { provinceURL } from "../../api/constant";
import { ApiResponse } from "../../api/type";
export interface Province {
    name: string;
    codename: string;
}
const useProvince = ()=>{
    return useQuery<ApiResponse<Province[]>>({
        queryKey: ["PROVINCE"],
        queryFn: async () => {
            return await axios.get(provinceURL);
        },
    });
}
export default useProvince;