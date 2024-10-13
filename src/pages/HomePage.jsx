// react
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// firebase
import { app } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

export default function HomePage() {
   const navigate = useNavigate();

   const unsubscribe = () => {
      onAuthStateChanged(auth, async (user) => {
         if (user) {
            navigate("/dashboard");
         }
      });
   };

   useEffect(() => {
      unsubscribe();
   }, []);

   return (
      <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-zinc-900">
         <div className="p-10 rounded-xl border border-zinc-700 flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-5">
               <h1 className="font-medium text-3xl text-white">
                  Events Management App
               </h1>
               <p className="font-medium text-slate-300">
                  Log in or sign up to get started.
               </p>
            </div>
            <div className="flex gap-x-5 justify-start">
               <Link to="/login">
                  <button className="px-5 py-3 rounded-xl bg-white font-medium hover:bg-slate-200 transition-colors">
                     Log in
                  </button>
               </Link>
               <Link to="/signup">
                  <button className="px-5 py-3 rounded-xl bg-white font-medium hover:bg-slate-200 transition-colors">
                     Sign up
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
}
