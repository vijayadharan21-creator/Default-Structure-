import { useNavigate } from "react-router-dom";
import { setToken } from "../services/token.js";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl p-8 text-center shadow-xl backdrop-blur-sm">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back!</h1>
        <p className="text-slate-400 text-sm mb-6">
          You have successfully authenticated into the store.
        </p>

        <button
          onClick={handleLogout}
          className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white rounded-xl text-sm font-medium transition cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}