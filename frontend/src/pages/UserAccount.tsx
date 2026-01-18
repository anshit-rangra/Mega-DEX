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
    <div className="search-container">
      <h2>Find User</h2>
      <div className="search-wrapper">
          <input type="text" placeholder="Enter username" value={user} onChange={handleChange} />
          <button onClick={handleSearch}>Search</button>
      </div>


   { userAccount &&
    <div className="account-container">
        <h2>User Profile</h2>
        <div className="profile-section">
            <img src={userAccount?.profile} alt="Profile" />
            <h2>{userAccount?.username}</h2>
        </div>
        
        <div className="account-info">
          <div className="info-card">
            <span>Username</span>
            <h3>{userAccount?.username}</h3>
          </div>
          <div className="info-card">
            <span>Balance</span>
            <h3>{userAccount?.money}</h3>
          </div>
        </div>

        <div className="tokens-section">
          <h2>Tokens</h2>
          {
            userAccount?.tokens && Object.keys(userAccount.tokens).length > 0 ?
            Object.keys(userAccount.tokens).map((key) => {
                    return (
                        <div className="token-item" key={key}>
                            <span>{key}</span>
                            <strong>{userAccount.tokens![key]}</strong>
                        </div>
                    )
            }) : <p className="no-tokens">No tokens</p>
          }
        </div>
      </div>
    }
    </div>
  )
}

export default UserAccount