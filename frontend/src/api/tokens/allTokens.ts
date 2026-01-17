import { json_instance } from "../instance";


export async function getAllTokens() {
    try {
        const response = await json_instance.get("api/token/fetch/pools", {
            headers: {
                "Authorization": `${localStorage.getItem("auth-token") || ""}`
            }
        })
        return response;
    } catch (error: any) {
        const { response } = error
        return response;
    }
}