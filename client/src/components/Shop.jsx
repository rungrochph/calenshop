import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import Authen from "./Authen";

function Shop() {
  const [calendars, setCalendars] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState("");
  const [calendarsType, setCalendarsType] = useState([]);
  const [selectedType, setSelectedType] = useState("Choose a type");
  const filteredCalendars = calendars.filter((calendar) => {
    const titleMatch = calendar.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatch =
      searchTerm === "" || calendar.type_id.toString() === searchTerm;

    return titleMatch && typeMatch;
  });
  useEffect(() => {
    getData();
    getCalendarsType();
    // console.log(searchTerm);
  }, [searchTerm]);



  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/getData/calendars", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const calendarsData = await response.json();
      setCalendars(calendarsData.calendars);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function getCalendarsType() {
    try {
      const response = await fetch(
        "http://localhost:3000/getData/calendars/type",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const calendarsTypeData = await response.json();
      setCalendarsType(calendarsTypeData.calendarsType);
      console.log("calendarsTypeData", calendarsTypeData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getData(); // Fetch data when the search button is clicked
  };

  const handleTypeChange = async (selectedTypeId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/getData/calendars/type/${selectedTypeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const calendarsData = await response.json();
      setCalendars(calendarsData.calendars);
      setSelectedType(selectedTypeId); // Update the selectedType state
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="bg-gray-50 pb-20">
      <Authen/>
      <div>
        <Navbar />
      </div>
      <div className="lg:p-16 sm:p-0 sm:m-0 bg-gray-50">
        <div className="p-8">
          <form onSubmit={handleSearchSubmit}>
            {/* <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label> */}
            <div className="relative">
              {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div> */}
              {/* <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search items"
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /> */}
              {/* <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button> */}
            </div>
          </form>
          <label
            htmlFor="calentype"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
          >
            Select a type
          </label>
          <select
            id="calentype"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleTypeChange(e.target.value)}
            value={selectedType}
          >
            <option value={""} key={999}>
              Choose a type
            </option>
            {calendarsType.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div></div>
      <div className="w-auto mx-auto">
        <div className="grid-cols-4 gap-1">
          <div className="col-span-4 grid lg:grid-cols-4 gap-4 lg:pl-12 sm:grid-cols-1 gap-4 sm:p-0">
            {filteredCalendars.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
