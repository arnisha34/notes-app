import { useState } from "react";

export const UpdatePassword = () => {

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const passwordError = password && password.length < 8;
  const newPasswordError = newPassword&&newPassword.length <8;
  const confirmPasswordError = newPassword !== confirmPassword
  const isDisabled = !password || passwordError || !newPassword || newPasswordError || !confirmPassword || confirmPasswordError;

  return(
    <section className="p-5">
      <h3 className="font-bold text-lg">Change Password</h3>
      <span className="text-sm">Enter your current password and choose a new one</span>
      <div className="flex flex-col gap-5 w-lg py-5">
      <form className="login-form flex flex-col gap-5 p-8 rounded-lg group">
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold dark:text-white">Current Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Current Password" 
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)} 
              className={`border-1 p-2 focus:outline-none placeholder:text-gray-700 rounded-lg dark:border-slate-400 dark:placeholder:text-slate-400 ${passwordError?"border-pink-500 text-pink-600": ""}`}/>
            {passwordError&&<span className="group-invalid:block hidden text-sm text-pink-600 mt-1 px-2">Password is incorrect</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold dark:text-white">New Password</label>
            <input 
              type="password" 
              name="new password" 
              placeholder="Enter a new" 
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)} 
              className={`border-1 p-2 focus:outline-none placeholder:text-gray-700 rounded-lg dark:border-slate-400 dark:placeholder:text-slate-400 ${newPasswordError?"border-pink-500 text-pink-600": ""}`}/>
            {newPasswordError&&<span className="group-invalid:block hidden text-sm text-pink-600 mt-1 px-2">password must be a minimum length of 8 characters</span>}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-bold dark:text-white">Confirm Password</label>
            <input 
              type="password" 
              name="confirm password" 
              placeholder="password" 
              minLength="8"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`border-1 p-2 focus:outline-none placeholder:text-gray-700 rounded-lg dark:border-slate-400 dark:placeholder:text-slate-400 ${confirmPasswordError?"border-pink-500 text-pink-600": ""}`}/>
            {confirmPasswordError&&<span className="group-invalid:block hidden text-sm text-pink-600 mt-1 px-2">Password does not match.</span>}
          </div>
          <button 
            type="submit" 
            className={`${isDisabled?"cursor-not-allowed bg-blue-300":"bg-blue-500 cursor-pointer"} font-bold mt-3 p-2 rounded-lg text-lg text-white transition-all`} 
            disabled={isDisabled}>
              Change Password
          </button>
        </form>
      </div>
    </section>
  )
}