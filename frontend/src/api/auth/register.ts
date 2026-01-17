import { json_instance } from "../instance";

interface Data {
    username: string,
    profile?: string,
    password: string 
}


export async function registerUser(data: Data) {
    try {
        const response = await json_instance.post("/api/auth/register", data)
              localStorage.setItem("auth-token", response.data.token)  
              return response;
    } catch (error: any) {
        const {response} = error
        return response
    }
}