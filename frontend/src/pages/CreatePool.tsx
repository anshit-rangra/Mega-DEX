import { useState } from "react"
import { createPool } from "../api/tokens/pool"
import { toast } from "react-toastify";
import Loader from "../components/Loader";

interface Form {
  token: string;
  tokenAmount: string;
  tokenPrice: string;
  image: File | undefined;
}


const CreatePool = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [form, setForm] = useState<Form>({
      token: "",
      tokenAmount: "",
      tokenPrice: "",
      image: undefined
    })

    function handleChange(e: React.FormEvent) {
      const target = e.target as HTMLInputElement
      setForm({
        ...form,
        [target.id]: target.value
      })
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
      if(e.target.files){
      setForm({
        ...form,
        image: e.target.files[0]
      })
      }
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      setIsLoading(true)
      const response = await createPool(form)
      setIsLoading(false)
      if(response.status !== 201) return toast.error(response.data.message || "Error occur")
      toast.success(response.data.message)
      
    }


    if (isLoading) return <Loader />

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="token">Token Name</label>
      <input type="text" id="token" value={form.token} onChange={handleChange} />

      <label htmlFor="tokenAmount">Number of Token</label>
      <input type="text" id="tokenAmount" value={form.tokenAmount} onChange={handleChange} />

      <label htmlFor="tokenPrice">One Token price</label>
      <input type="text" id="tokenPrice" value={form.tokenPrice} onChange={handleChange} />

      <label htmlFor="image">Token Image</label>
      <input type="file" id="image" onChange={handleFileChange} />

      <input type="submit"  />

    </form>
    </>
  )
}

export default CreatePool