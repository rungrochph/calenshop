import { useState, useEffect } from "react";
import DataTable, { Media } from "react-data-table-component";
import Navbar from "./Navbar";
import logo from "../assets/images/logo2.png";
import Authen from "./Authen";
function ProductManage() {
  const [product, setProduct] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarsType, setCalendarsType] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImageLink, setProductImageLink] = useState("");
  const [productList, setProductList] = useState({
    title: null,
    type_id: null,
    price: null,
    description: null,
    quantity: null,
    image: null,
    id: null,
  });

  const onclickDelete = () => {
    DeleteProduct(productList);
    console.log(productList);
  };
  const DeleteProduct = async (JasonData) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteProduct/Id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData), // Fixed orderStatus to orderId.order_status
      });
      const result = await response.json();
      if (result.status === "ok") {
        alert("Delete Event Success");
        window.location.reload();
      } else {
        alert("Delete  Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onClickAdd = () => {
    insertProduct(productList);
    console.log("kkkkk", productList);
  };

  const insertProduct = async (JasonData) => {
    try {
      const response = await fetch(`http://localhost:3000/insertProduct/Id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData), // Fixed orderStatus to orderId.order_status
      });
      const result = await response.json();
      if (result.status === "ok") {
        alert("Insert Event Success");
        window.location.reload();
      } else {
        alert("Insert  Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const updateProduct = async (JasonData) => {
    try {
      const response = await fetch(`http://localhost:3000/updateProduct/Id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JasonData), // Fixed orderStatus to orderId.order_status
      });
      const result = await response.json();
      if (result.status === "ok") {
        alert("Update Event Success");
        window.location.reload();
      } else {
        alert("Update Event failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = () => {
    updateProduct(productList);
    console.log("productList", productList);
  };
  useEffect(() => {
    setProductList({
      title: productName,
      type_id: productType,
      price: productPrice,
      description: productDescription,
      quantity: productQuantity,
      image: productImageLink,
      id: productId,
    });
  }, [
    productName,
    productType,
    productPrice,
    productDescription,
    productQuantity,
    productImageLink,
    productId,
  ]);

  async function getDataById(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/getData/calendars/${id}`,
        {
          method: "GET", // Use "GET" method to fetch data
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const calendarsData = await response.json();
      const calendar = calendarsData.calendars[0];
      console.log("calendar", calendar);
      // Set state with the retrieved data
      setProductName(calendar.title);
      setProductDescription(calendar.description);
      setProductType(calendar.type_id);
      setProductPrice(calendar.price);
      setProductQuantity(calendar.quantity);
      setProductImageLink(calendar.image);

      // Optionally, set the entire calendar array to state
      // setCalendars(calendarsData);
      // Now you can use the fetched data as needed
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductQuantityChange = (e) => {
    setProductQuantity(e.target.value);
  };

  const handleProductImageLinkChange = (e) => {
    setProductImageLink(e.target.value);
  };

  useEffect(() => {
    getData();
    // console.log(searchTerm);
  }, []);

  useEffect(() => {
    getData();
    getCalendarsType();
    // console.log(searchTerm);
  }, []);

  const openModal = (clickInfo, id) => {
    // setModalContent({ title, description, price });
    setIsModalOpen(true);
    // setOrderId({ id: id, order_status: 2 });
    console.log("Id", id);
    getDataById(id);
    setProductId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/getData/calendars", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const calendarsData = await response.json();
      setProduct(calendarsData.calendars);
      console.log("tttt", product);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const columes = [
    {
      name: "ID",
      selector: (row) => row.id,
      hide: Media.SM,
    },
    {
      name: "ชื่อสิ้นค้า",
      selector: (row) => row.title,
    },
    {
      name: "รายละเอียด",
      selector: (row) => row.description,
    },
    {
      name: "ประเภท",
      selector: (row) => row.name,
    },
    {
      name: "ราคา (บาท)",
      selector: (row) => row.price,
    },
    {
      name: "จำนวน",
      selector: (row) => row.quantity,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div className="flex flex-col space-x-4 p-1">
          {row.status_name !== "รอรับเข้าระบบ" && (
            <button
              className="w-20 h-5  ml-4 mb-1 inline-block rounded bg-yellow-100 px-2 pb-0 pt-0 py-4 font-small uppercase leading-normal"
              type="button"
              onClick={(e) => openModal(e, row.id)}
            >
              <p className="text-yellow-500">จัดการ</p>
            </button>
          )}
        </div>
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        // paddingLeft: "100px", // Adjust as needed
        paddingRight: "-100px", // Adjust as needed
        color: "green",
        marginRight: "100px",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        // paddingLeft: "1px", // Adjust as needed
        paddingRight: "1px", // Adjust as needed
        marginRight: "100px",
        fontSize: "14px",
      },
    },
  };

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

  return (
    <div className="bg-gray-50 pb-20">
      <Authen/>
      <div>
        <Navbar />
      </div>
      <div className="relative flex flex-col items-center justify-center pt-8 ">
        <div className="items-center ">
          <img src={logo} style={{ width: "324px", height: "auto" }} />
        </div>
      </div>
      <div className="pb-96 p-8 pt-16">
        <div className="p-3 rounded-xl shadow-2xl bg-inherit ">
          <div className="p-4">
            <label className="text-2xl" style={{ color: "rgb(136, 146, 227)" }}>
              จัดการสินค้า
            </label>
            <button
              onClick={openModal}
              className="btn bg-sky-400 ml-4 lg:ml-48"
            >
              เพิ่มสินค้า
            </button>
          </div>
          <div>
            <DataTable
              columns={columes}
              data={product}
              initialPageLength={4}
              persistTableHead
              customStyles={customStyles}
              pagination
            ></DataTable>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <dialog className="modal " open>
          <div className="modal-box">
            <h3 className="font-bold text-lg ">วิธีการชำระเงิน</h3>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4 ">
              ชื่อสินค้า
            </label>
            <input
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // onChange={(e) => handleTypeChange(e.target.value)}
              // value={selectedType}
            ></input>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              รายละเอียด
            </label>
            <input
              id="productDescription"
              value={productDescription}
              onChange={handleProductDescriptionChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // onChange={(e) => handleTypeChange(e.target.value)}
              // value={selectedType}
            ></input>

            <label
              htmlFor="calentype"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
            >
              ประเภท
            </label>
            <select
              id="productType"
              value={productType}
              onChange={handleProductTypeChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // onChange={(e) => handleTypeChange(e.target.value)}
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

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              ราคา (บาท)
            </label>
            <input
              id="productPrice"
              value={productPrice}
              onChange={handleProductPriceChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // onChange={(e) => handleTypeChange(e.target.value)}
              // value={selectedType}
            ></input>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              จำนวนคงเหลือ (ชิ้น)
            </label>
            <input
              id="productQuantity"
              value={productQuantity}
              onChange={handleProductQuantityChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // onChange={(e) => handleTypeChange(e.target.value)}
              // value={selectedType}
            ></input>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              ลิงก์รูปภาพ
            </label>
            <input
              id="productImageLink"
              value={productImageLink}
              onChange={handleProductImageLinkChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // onChange={(e) => handleTypeChange(e.target.value)}
              // value={selectedType}
            ></input>

            <div className="modal-action">
              <button className="btn  bg-red-400 mr-30" onClick={onclickDelete}>
                Delete
              </button>
              <button onClick={handleClick} className="btn bg-yellow-400 mr-4">
                Update
              </button>
              <button className="btn  bg-sky-400 mr-30" onClick={onClickAdd}>
                ADD
              </button>
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default ProductManage;
