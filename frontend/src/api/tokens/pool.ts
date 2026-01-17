import { form_data_instance, json_instance } from "../instance";


interface Form {
  token: string;
  tokenAmount: string;
  tokenPrice: string;
  image?:   File;
}


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

export async function createPool(form: Form) {
    const formData = new FormData();
    formData.append("token", form.token);
    formData.append("tokenPic", form?.image || "");
    formData.append("tokenAmount", form.tokenAmount)
    formData.append("tokenPrice", form.tokenPrice)

    try {
        const response = await form_data_instance.post("/api/token/create/pool", formData, {
            headers: {
                "Authorization": localStorage.getItem("auth-token")
            }
        })
        return response;
    } catch (error: any) {
        const { response } = error;
        console.log(error)
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