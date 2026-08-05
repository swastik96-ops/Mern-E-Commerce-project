import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex min-h-screen">
      <ToastContainer />
      <Navigation />

     <main className="relative w-full min-h-screen overflow-hidden pl-[90px]" style={{ backgroundColor: '#F7F5F0' }}>
      <div className="relative p-6">
        <Outlet />
      </div>
    </main>
    </div>
    
  );
};

export default App;