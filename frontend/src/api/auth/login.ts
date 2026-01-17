import { json_instance } from "../instance";

interface Data {
    username: string,
    password: string,
}

export async function loginUser(data: Data) {
    try {
      const response = await json_instance.post("/api/auth/login", data)
      localStorage.setItem("auth-token", `Bearer ${response.data.token}`)  
      return response;
    } catch (error: any) {
        const { response } = error;
        return response;
    }
}