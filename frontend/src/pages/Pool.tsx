import React, { useEffect, useState } from "react";
import { buyToken, getPool, sellToken } from "../api/tokens/pool";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

interface PoolInterface {
  _id: string;
  name: string;
  buy_price: number;
  sell_price: number;
}

const Pool = () => {
  const { id } = useParams();
  const [pool, setPool] = useState<null | PoolInterface>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [render, setRender] = useState<boolean>(true)

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const response = await getPool(id as string);
      setIsLoading(false);
      if (response.status === 200) {
        setPool(response?.data);
      } else {
        setError(true);
      }
    })();
  }, [render]);

  function handleQuantityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setQuantity(Number(e.target.value));
  }

  async function tokenOperation(e: React.MouseEvent<HTMLButtonElement>) {
    
    if (e.currentTarget.name === "buy" && pool) {
        setIsLoading(true)
      const response = await buyToken(pool._id, quantity);
      setIsLoading(false)
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else if (e.currentTarget.name === "sell" && pool) {
        setIsLoading(true)
      const response = await sellToken(pool._id, quantity);
      setIsLoading(false)
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("Error occured");
    }
    setRender(!render)
  }

  if (isLoading) return <Loader />;
  if (error) return <h1>Error occur.....</h1>;

  return (
    <>
      <h1>{pool?.name}</h1>

      <select value={quantity} onChange={handleQuantityChange} id="quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <h1>Buy price = {pool?.buy_price}</h1>

      <button name="buy" onClick={tokenOperation}>
        Buy Token
      </button>

      <h1>Selling price = {pool?.sell_price}</h1>
      <button name="sell" onClick={tokenOperation}>
        Sell Token
      </button>
    </>
  );
};

export default Pool;
