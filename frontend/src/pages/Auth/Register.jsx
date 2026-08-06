import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully registered");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] pl-[90px]">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Form side */}
        <div className="flex-1 flex items-center justify-center px-8 py-16">
          <div className="w-full max-w-md">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8A8378] mb-3">
              Join us
            </p>
            <h1 className="font-serif text-4xl text-[#1F2A24] mb-2">
              Register
            </h1>
            <p className="text-[#5F5A54] mb-10">
              Create your Kingsman account.
            </p>

            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#1F2A24] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  className="w-full p-3 rounded-sm border border-[#DDD6C7] bg-white text-[#1F2A24] placeholder:text-[#A9A296] focus:outline-none focus:border-[#2D4A3E] transition-colors"
                  placeholder="Enter name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1F2A24] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="w-full p-3 rounded-sm border border-[#DDD6C7] bg-white text-[#1F2A24] placeholder:text-[#A9A296] focus:outline-none focus:border-[#2D4A3E] transition-colors"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#1F2A24] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    className="w-full p-3 pr-11 rounded-sm border border-[#DDD6C7] bg-white text-[#1F2A24] placeholder:text-[#A9A296] focus:outline-none focus:border-[#2D4A3E] transition-colors"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8378] hover:text-[#2D4A3E]"
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#1F2A24] mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  className="w-full p-3 rounded-sm border border-[#DDD6C7] bg-white text-[#1F2A24] placeholder:text-[#A9A296] focus:outline-none focus:border-[#2D4A3E] transition-colors"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-[#2D4A3E] text-white py-3 rounded-sm font-medium tracking-wide hover:bg-[#233B31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>

              {isLoading && <Loader />}
            </form>

            <p className="mt-8 text-[#5F5A54]">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-[#2D4A3E] font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Image side */}
        <div className="hidden lg:block lg:flex-1 relative min-h-screen">
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80"
            alt="Kingsman heritage tailoring"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Register;