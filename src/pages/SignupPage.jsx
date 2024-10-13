export default function SignupPage() {
   return (
      <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-zinc-900">
         <div className="p-10 rounded-xl border border-zinc-700 flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-5">
               <h1 className="font-medium text-3xl text-white">Sign Up</h1>
               <p className="font-medium text-slate-300">
                  Create an account to get started.
               </p>
            </div>
         </div>
      </div>
   );
}
