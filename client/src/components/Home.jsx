import Navbar from "./Homenav";
// import icon1 from "../assets/images/new1.png";
// import Authen from "./Authen";
function Home() {
  const backgroundImageUrl =
    "https://img.freepik.com/premium-photo/gradient-banner-background-image-jpg-gradient-background-header_873925-111516.jpg";
  return (
    <div>
      {/* <Authen/> */}
      <Navbar></Navbar>

      <div className="w-screen h-[calc(100vh-5rem)]">
        <div
          className="bg-cover bg-center bg-no-repeat h-full w-full"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
          }}
        >
          <div className="container mx-auto flex flex-col my-auto align-middle h-full">
            <div className="my-auto mx-auto lg:mx-0 w-10/12 lg:w-2/5">
              <h1 className="text-7xl mb-4">
                <span className="text-violet-500">Discover and Buy</span>{" "}
                stunning calendars!
              </h1>
              <p className="text-2xl mb-8">
                Explore a variety of beautifully crafted calendars and find the
                perfect one for your space.
              </p>
              <div className="flex items-center">
                <a href="/shop">
                  <button className="rounded px-10 py-3 text-white bg-violet-500 hover:bg-violet-600">
                    Browse Calendars
                  </button>
                </a>
                {/* Assuming `icon1` is the import for your image */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
