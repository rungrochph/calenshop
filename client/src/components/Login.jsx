import Navbar from "./Navbar";
import logo from "../assets/images/logo2.png";
const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const loginData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  login(loginData);
  console.log("logindata",loginData)
};

async function login(JasonData) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JasonData),
    });

    const result = await response.json();
    if (result.status === "ok") {
      localStorage.setItem("token", result.token);
      console.log("login",result)
      localStorage.setItem("user_id", result.id);
      // localStorage.setItem("lname", result.results[0].lname);

      console.log("token login", result.token);
      alert("Login Sucess");
      window.location = "./shop";
      console.log("results", result);
      // setUserLoginFname(result.results[0].fname)
      // setUserLoginLname(result.results[0].lname)
      // console.log(
      //   "Name UserLogin :",
      //   result.results[0].fname,
      //   " ",
      //   result.results[0].lname
      // );
    } else {
      alert("Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className=" bg-gray-50">
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div
            className="w-full p-8 m-auto bg-white rounded-md shadow-md lg:max-w-xl"
            style={{ marginBottom: "50rem", marginTop: "7rem" }}
          >
            <div className="items-center">
              <img  src={logo} style={{ width: "324px", height: "auto" }} />
            </div>
            <form className="mt-2" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  // for="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  // for="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  required
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {/* <a href="#" className="text-xs text-purple-600 hover:underline">
                Forget Password?
              </a> */}
              <div className="mt-6">
                <button
                  style={{ backgroundColor: "rgb(136, 146, 227)" }}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Dont have an account?{" "}
              <a
                href="/Register"
                className="font-medium text-purple-600 hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
