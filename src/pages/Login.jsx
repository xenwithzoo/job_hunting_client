import { useAuth } from "../provider/authProvider";
import { useNavigate,Link } from "react-router-dom";
// import { loginn } from "../services/authService";
import { login } from "../api/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();
  const [headError, setHeadError] = useState("asdfasdfasdf");
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });

  useEffect(() => {
    setHeadError("");
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (event) => {
    // post request to register
    // if success, redirect to login page
    // if error, show error message
    event.preventDefault();

    // const response = await login(formData);
    const response = await login(formData);
    //not connected to the server
    if (response === undefined) {
      toast.error(`Server is not available, please try again later`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (response.status === 200) {
      console.log(response);
      setAccessToken(response.data.userId);
      // setRefreshToken(response.data.data.token.refreshToken);
      // set user data to local storage
      localStorage.setItem("user", JSON.stringify(response.data.userId));
      navigate("/", { replace: true });
      // toast.success(`${"Login success"}`, {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    } else {
      setHeadError("Invalid Username or Password");
      toast.error(`${response?.response?.data?.detail}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const [user, setUser] = useState([]);
  return (
    <div className={"w-full flex "}>
      {/*  */}
      <div
        className={
          "w-1/2 h-full flex justify-center items-center relative select-none "
        }
      >
        <div className={"absolute z-1 w-full p-14 text-white"}>
          {/* title */}
          <div className={"px-3"}>
            <h1 className={"flex text-5xl font-black"}>
              Catalyst for Your Career{" "}
            </h1>
            <h1 className={"flex text-5xl flex-row-reverse font-black"}>
              Empowering Your Potential.{" "}
            </h1>
          </div>
          {/* chat template */}
          <div className={"p-5"}>
            <img src={"/img/Frame 1437252712.svg"} />
          </div>
        </div>
        {/* background */}
        <div className={"relative"}>
          <div className="w-full h-full backdrop-blur-xl bg-white/30 backdrop-brightness-95 absolute "></div>
          <img
            src="/img/Rectangle 91908.png"
            alt="logo"
            className="h-lvh w-lvw"
          />
        </div>
      </div>

      {/* login */}
      <div className={"w-1/2 flex flex-col items-center justify-center "}>
        <div className={"max-w-96"}>
          <div className={"flex flex-col items-center justify-center mb-4"}>
            <h2>Sign in</h2>
            <p className={"font-medium text-xs text-center"}>
              Empower your experience, sign up for a free account today
            </p>
            <div className={`relative`}>
              <p
                className={`w-full font-medium text-xs text-center text-red-500`}
              >
                {headError}
              </p>
            </div>
          </div>
          <form className="flex flex-col items-center justify-center text-xs font-medium">
            <div className={"w-full mb-1"}>
              <Input
                className={"mb-3"}
                title="Username"
                placeholder={"ex. chinchin"}
                value={formData.account}
                onChange={handleChange}
                type="text"
                name="account"
                required={true}
              />
              <Input
                className={"mb-3"}
                title="Password"
                placeholder={"Enter password"}
                value={formData.password}
                onChange={handleChange}
                type="password"
                name="password"
                required={true}
              />
            </div>

            {/* <p className={"mb-4 text-violet-700"}>
              <Link to="/terms" className={"text-violet-700"}>
                Terms of Service
              </Link>{" "}
              |{" "}
              <Link to="/privacy" className={"text-violet-700"}>
                Privacy Policy.
              </Link>
            </p> */}

            <Button onClick={handleRegister} className={"mb-4 text-white"}>
              Sign in
            </Button>

            {/* <div>
              Don't have an account?
              <Link to="/register" className={"text-violet-700"}>
                {" "}
                Sign up
              </Link>
            </div> */}
          </form>
          {/* <div className={"text-xs"}>
            <div className="flex items-center">
              <hr className="flex-grow h-0.5 bg-slate-400" />
              <span className="mx-4 font-bold text-slate-400">
                Or better yet...{" "}
              </span>
              <hr className="flex-grow h-0.5 bg-slate-400" />
            </div>
          </div> */}

          {/* other login method */}
          {/* <div className={"text-xs"}>
            <Button
              onClick={() => login()}
              className={"mb-3 bg-white !text-violet-500"}
            >
              <div className={"flex items-center font-bold"}>
                <FcGoogle className="text-xl mx-1" />
                <span>Sign in with Google</span>
              </div>
            </Button>
            <Button
              onClick={() => login()}
              className={"mb-4 bg-white !text-violet-500"}
            >
              <div className={"flex items-center font-bold"}>
                <FaApple className="text-2xl mx-1 text-black" />
                <span>Sign in with Apple</span>
              </div>
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
