import  { useEffect } from "react";
import {  useSelector } from "react-redux"
import { fetchAllTokens } from "../store/slices/tokenSlice";
import Loader from "../components/Loader";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state.token)
  
  useEffect(() => {
    if(!state.fetched){
      dispatch(fetchAllTokens())
    }

  }, [dispatch, state.fetched])


  async function navigatePool(id: string) {
    navigate(`/pool/${id}`)
  }

  if(state.loading) return <Loader />

  return (
    <div className="home-container">
        <h1>Token Pools</h1>

        <div className="token-grid">
        {
          state.tokens.map((tokenPool: any) => {
            
            return <div className="token-card" onClick={() => navigatePool(tokenPool._id)} key={tokenPool._id}>
              <img src={tokenPool.tokenImg} alt="token image" />
            <h2>{tokenPool.token}</h2>
            <p className="token-price">{Math.ceil(tokenPool.amount / tokenPool.tokenAmount)} <span>per token</span></p>
            </div>
          })
        }
        </div>
    </div>
  )
}

export default Home