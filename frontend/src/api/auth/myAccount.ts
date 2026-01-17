import { json_instance } from "../instance";


export async function myAccount() {
    try {
        const response = await json_instance.get("api/auth/me", {
            headers: {
                "Authorization": localStorage.getItem("auth-token")
            }
        })
        return response;
    } catch (error: any) {
        const { response } = error;
        return response;
    }
}

export async function getUser(id: string) {
    try {
        const response = await json_instance.get(`api/auth/user/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("auth-token")
            }
        })
        return response;
    } catch (error: any) {
        const { response } = error;
        return response;
    }
}