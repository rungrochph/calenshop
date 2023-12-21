// import "../index.css";
import logo from "../assets/images/logo2.png";
import Navbar from "./Navbar";


const onSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  console.log("data", data);

  const regisdata = {
    email: data.get("email"),
    password:data.get("password"),
    username: data.get("username"),
  };
  console.log("regis",regisdata);
  register(regisdata)
};
async function register(JasonData) {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JasonData),
    });

    const result = await response.json();
    if (result.status === "ok") {
      // localStorage.setItem("token", result.token);
      // console.log("token login", result.token);
      alert("Register Sucess");
      window.location = "./login";
    } else {
      alert("Register failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const Register = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div
        className="flex flex-col items-center min-h-screen sm:justify-center sm:pt-0 bg-gray-50"
        style={{ paddingBottom: "15rem" }}
      >
        <div>
          <img src={logo} style={{width:"324px", height:"auto"}} />
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={onSubmit}>
            {/* <div>
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                ชื่อ
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div> */}
            {/* <div className="mt-4">
              <label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                นามสกุล
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="text"
                  name="lname"
                  id="lname"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div> */}
            {/* <div className="mt-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                ตำแหน่ง
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="text"
                  name="position"
                  id="position"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div> */}
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                UserName
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="/login"
              >
                Already registered?
              </a>
              <button
                type="submit"
                style={{ backgroundColor: "rgb(136, 146, 227)" }}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-gray-900 false "
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
