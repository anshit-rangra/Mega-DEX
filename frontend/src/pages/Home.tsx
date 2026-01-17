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
    <div>
        Home Page

        {
          state.tokens.map((tokenPool: any) => {
            
            return <div onClick={() => navigatePool(tokenPool._id)} style={{border: "2px solid red"}} key={tokenPool._id}>
              <img src={tokenPool.tokenImg} alt="token image" />
            <h1>{tokenPool.token}</h1>
            <h1>{tokenPool.amount / tokenPool.tokenAmount}</h1>
            </div>
          })
        }
    </div>
  )
}

export default Home