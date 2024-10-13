// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export default function LoginPage() {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      if (email && password) {
         try {
            signInWithEmailAndPassword(auth, email, password)
               .then(async (userCredential) => {
                  navigate("/dashboard");
                  console.log(userCredential);
               })
               .catch((err) => {
                  console.error(err.message);
                  setError("Invalid credentials");
               });
         } catch (err) {
            console.error(err.message);
            setError("Something went wrong");
         }
      }
   };

   return (
      <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-zinc-900">
         <div className="w-[500px] p-10 rounded-xl border border-zinc-700 flex flex-col gap-y-10 bg-zinc-800">
            <div className="flex flex-col gap-y-5">
               <h1 className="font-medium text-3xl text-white">Log In</h1>
               <p className="font-medium text-slate-300">
                  Log into your account to continue.
               </p>
            </div>
            <form className="flex flex-col gap-y-5">
               {/* email */}
               <div className="w-full flex flex-col gap-y-3">
                  <label
                     htmlFor="email"
                     className="font-medium text-sm text-slate-300"
                  >
                     Email
                  </label>
                  <input
                     onChange={(e) => setEmail(e.target.value)}
                     type="email"
                     required
                     id="email"
                     className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
                     placeholder="johndoe@mail.com"
                  />
               </div>
               {/* password */}
               <div className="w-full flex flex-col gap-y-3">
                  <label
                     htmlFor="password"
                     className="font-medium text-sm text-slate-300"
                  >
                     Password
                  </label>
                  <input
                     onChange={(e) => setPassword(e.target.value)}
                     type="password"
                     required
                     id="password"
                     className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 font-medium text-white outline-none focus:ring-[1px] ring-white transition-all placeholder:text-zinc-700"
                  />
               </div>
               {/* error */}
               {error && (
                  <span className="font-medium text-red-300 text-sm mt-5">
                     {error}
                  </span>
               )}
               {/* submit button */}
               <button
                  disabled={!email || !password}
                  onClick={handleSubmit}
                  className="w-full rounded-xl bg-white px-5 py-3 font-medium hover:bg-slate-200 transition-colors disabled:hover:bg-white disabled:opacity-50 mt-5"
               >
                  Log In
               </button>
            </form>
         </div>
      </div>
   );
}
