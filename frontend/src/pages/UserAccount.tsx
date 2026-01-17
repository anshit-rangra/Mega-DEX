import { useState } from "react"
import { getUser } from "../api/auth/myAccount"
import Loader from "../components/Loader"
import { toast } from "react-toastify"


interface Account {
    _id: string;
    username: string;
    money: number;
    profile: string;
    tokens?: { [key: string]: number };
}


const UserAccount = () => {
    const [userAccount, setUserAccount] = useState<null | Account>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<string>("")



    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setUser(e.target.value)
    }

    async function handleSearch() {
            setIsLoading(true)
            const response = await getUser(user);
            setIsLoading(false)
            if(response.status !== 200){
                return toast.error(response.data.message)
            }
            setUserAccount(response.data.user)
            toast.success(response.data.message)
    }

    if(isLoading) return <Loader />

  return (
    <>
    <div>
        <input type="text" value={user} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
    </div>


   { userAccount &&
    <div>
        <h1>My Account</h1>
        <div>
            <img src={userAccount?.profile} alt="" />
        </div>
        <h1>username: {userAccount?.username}</h1>
        <h1>money: {userAccount?.money}</h1>
        <h1>Tokens :</h1>
        {
           userAccount?.tokens && Object.keys(userAccount.tokens).map((key) => {
                    return (
                        <div key={key}>
                            <h1>{key} ---&gt; {userAccount.tokens![key]}</h1>
                        </div>
                    )
            })
        }

        </div>
        }
    </>
  )
}

export default UserAccount