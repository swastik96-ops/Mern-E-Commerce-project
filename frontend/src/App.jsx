import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex min-h-screen">
      <ToastContainer />
      <Navigation />

     <main className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-black">
  {/* Background glow */}
      <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-pink-500/20 blur-[150px]" />

      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-purple-500/20 blur-[150px]" />

      <div className="relative p-6">
        <Outlet />
      </div>
    </main>
    </div>
    
  );
};

export default App;