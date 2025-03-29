import axios, {  type AxiosInstance } from 'axios';
import { baseURL } from './constant';



export class Api {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
const api = new Api().instance;
export default api;
