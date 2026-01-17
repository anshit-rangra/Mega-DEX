import { json_instance } from "../instance";


export async function getPool(id: string) {
    try {
        const response = await json_instance.get(`/api/token/get/price/${id}`, {
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


export async function buyToken(id: string, qty: number = 1) {
    try {
        const response = await json_instance.post(`/api/token/buy?id=${id}&qty=${qty}`,{}, {
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

export async function sellToken(id: string, qty: number = 1) {
    try {
        const response = await json_instance.post(`/api/token/sell?id=${id}&qty=${qty}`, {}, {
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


export async function getDrop() {
    try {
        const response = await json_instance.get("/api/token/drop", {
            headers: {
                "Authorization" : localStorage.getItem("auth-token")
            }
        })
        return response;

    } catch (error: any) {
        const { response } = error;
        return response;
    }
}