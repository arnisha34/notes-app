"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function Auth() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const emailError = email && !/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(email);
  const passwordError = password && password.length < 8;
  const isDisabled = !email || emailError || !password || passwordError;

    const handleSubmit = (e) => {
    e.preventDefault()
    router.push('/');
  }

  return(
     <div id="login-wrapper" className="bg-blue-800 flex justify-center items-center relative w-screen h-screen">
      <Image src="/paper-texture.jpg" alt="paper texture" fill className="absolute z-1 opacity-20"/>
      <section className="bg-[url(/paper-texture.jpg)] bg-center bg-cover p-8 rounded-lg shadow-xl/30 max-w-[550px] w-full z-2">
        <Image src="/note-logo.svg" alt="Notes" width={225} height={100} className="mx-auto"/>
        <h2 className="text-2xl font-bold pt-8 text-center dark:text-black">Welcome to Notes!</h2>
        <p className="pt-2 text-center dark:text-black">Please log in to continue</p>
        <form className="login-form flex flex-col gap-3 p-8 rounded-lg group" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold dark:text-black">Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="email@example.com" 
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)} 
              className={`border-1 p-2 focus:outline-none placeholder:text-gray-700 rounded-lg dark:border-black ${emailError?"border-pink-500 text-pink-600": ""}`}/>
            {emailError&&<span className="group-invalid:block hidden text-sm text-pink-600 mt-1 px-2">Please use a valid email address</span>}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-bold dark:text-black">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="password" 
              minLength="8"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className={`border-1 p-2 focus:outline-none placeholder:text-gray-700 rounded-lg dark:border-black ${passwordError?"border-pink-500 text-pink-600": ""}`}/>
            {passwordError&&<span className="group-invalid:block hidden text-sm text-pink-600 mt-1 px-2">password must be a minimum length of 8 characters</span>}
          </div>
          <button 
            type="submit" 
            className={`${isDisabled?"cursor-not-allowed bg-blue-300":"bg-blue-500 cursor-pointer"} font-bold mt-3 p-2 rounded-lg text-lg text-white transition-all`} 
            disabled={isDisabled}>
              Login
          </button>
        </form>
      </section>
     </div>
  )
}