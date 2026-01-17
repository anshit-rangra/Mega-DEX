import { useEffect, useState } from "react"
import { myAccount } from "../api/auth/myAccount"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import { getDrop } from "../api/tokens/pool";


interface Account {
    _id: string;
    username: string;
    money: number;
    profile: string;
    tokens?: { [key: string]: number };
}


const MyAccount = () => {
    const [myAccountDetails, setMyAccountDetails] = useState<null | Account>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            const response = await myAccount();
            setIsLoading(false)
            if(response.status !== 200){
                return toast.error(response.data.message)
            }
            setMyAccountDetails(response.data.user)
        })()

    }, [])

    async function handleDrop() {
        setIsLoading(true)
        const response = await getDrop();
        setIsLoading(false)
        if(response.status !== 200) {
            return toast.error(response.data.message || "Error occur")
        }
        toast.success(response.data.message)
    }

    if(isLoading) return <Loader />

  return (
    <>
        <h1>My Account</h1>
        <div>
            <img src={myAccountDetails?.profile} alt="" />
        </div>
        <h1>username: {myAccountDetails?.username}</h1>
        <h1>money: {myAccountDetails?.money}</h1>
        <h1>Tokens :</h1>
        {
           myAccountDetails?.tokens && Object.keys(myAccountDetails.tokens).map((key) => {
                    return (
                        <div key={key}>
                            <h1>{key} ---&gt; {myAccountDetails.tokens![key]}</h1>
                        </div>
                    )
            })
        }

        <h1>Get Drop</h1>
        <button onClick={handleDrop}>Get Drop</button>

    </>
  )
}

export default MyAccount