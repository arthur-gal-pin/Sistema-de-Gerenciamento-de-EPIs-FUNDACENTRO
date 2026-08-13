import axios from "axios";

export const api_jsonfake = axios.create(
    {
        baseURL: "https://jsonplaceholder.typeicode.com",
        timeout: 5000
    }
)