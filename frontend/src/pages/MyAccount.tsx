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
    <div className="account-container">
        <h1>My Account</h1>
        <div className="profile-section">
            <img src={myAccountDetails?.profile} alt="Profile" />
            <h2>{myAccountDetails?.username}</h2>
        </div>
        
        <div className="account-info">
          <div className="info-card">
            <span>Username</span>
            <h3>{myAccountDetails?.username}</h3>
          </div>
          <div className="info-card">
            <span>Balance</span>
            <h3>{myAccountDetails?.money}</h3>
          </div>
        </div>

        <div className="tokens-section">
          <h2>My Tokens</h2>
          {
            myAccountDetails?.tokens && Object.keys(myAccountDetails.tokens).length > 0 ? 
            Object.keys(myAccountDetails.tokens).map((key) => {
                    return (
                        <div className="token-item" key={key}>
                            <span>{key}</span>
                            <strong>{myAccountDetails.tokens![key]}</strong>
                        </div>
                    )
            }) : <p className="no-tokens">No tokens yet</p>
          }
        </div>

        <div className="drop-section">
          <h2>Daily Airdrop</h2>
          <p>Get free tokens every day!</p>
          <button onClick={handleDrop}>Claim Airdrop</button>
        </div>
    </div>
  )
}

export default MyAccount