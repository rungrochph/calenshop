import { useState, useEffect } from "react";
import DataTable, { Media } from "react-data-table-component";
import Navbar from "./Navbar";
import logo from "../assets/images/logo2.png";
import Authen from "./Authen";
function OrdarManage() {
  const [order, setOrder] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [orderData, setOrderData] = useState({
    id: null,
    name: null,
    price: null,
    order_status: null,
  });
  const [orderId, setOrderId] = useState({
    id: null,
    order_status: null,
  })

  useEffect(() => {
    getOrder();
    // console.log(searchTerm);
  }, []);

  const updateStatusto = () => {
    // console.log("Row Id update", id);
    
    closeModal();
    updateStatus(orderId)
  };
  // const updateStatusto5 = () => {
  //   // console.log("Row Id update", id);
    
  //   closeModal();
  //   updateStatus(orderId)
  // };


  const updateStatus = async (JasonData) => {
    try {
      const response = await fetch(`http://localhost:3000/updateStatus/Id`, {
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
  
  

  const openModal = (clickInfo, id) => {
    // setModalContent({ title, description, price });
    setIsModalOpen(true);
    setOrderId({ id: id, order_status: 3 });
    console.log("Id",id)
  };
  const openModal2 = (clickInfo, id) => {
    // setModalContent({ title, description, price });
    setIsModalOpen2(true);
    setOrderId({ id: id, order_status: 4 });
    console.log("Id",id)
  };
  const openModal3 = (clickInfo, id) => {
    // setModalContent({ title, description, price });
    setIsModalOpen3(true);
    setOrderId({ id: id, order_status: 6 });
    console.log("Id",id)
  };
  const openModal4 = (clickInfo, id, name, price, status) => {
    setIsModalOpen4(true);
    setOrderData({ id: id, name: name, price: price, order_status: status });
    console.log("name", name);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
    setIsModalOpen4(false);
  };

  async function getOrder() {
    try {
      const response = await fetch("http://localhost:3000/getOrders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const orderlist = await response.json();
      setOrder(orderlist.orderlist);
      console.log("orderlist", orderlist);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const columes = [
    {
      name: "ID",
      selector: (row) => row.order_id,
      hide: Media.SM,
    },
    {
      name: "วันที่",

      selector: (row) => row.order_createdat,
    },
    {
      name: "ชื่อสิ้นค้า",
      selector: (row) => row.order_name,
    },
    {
      name: "ราคา (บาท)",
      selector: (row) => row.order_price,
    },
    {
      name: "สถานะ",
      selector: (row) => row.order_status,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div className="flex flex-col space-x-4 p-1">
          {row.order_status === "กำลังตรวจสอบ" && (
            <button
              className="w-20 h-5  ml-4 mb-1 inline-block rounded bg-green-100 px-2 pb-0 pt-0 py-4 font-small uppercase leading-normal"
              type="button"
              onClick={(e) => openModal(e, row.order_id)}
            >
              <p className="text-green-500">จ่ายแล้ว</p>
            </button>
          )}
      
          {row.order_status=== "จ่ายเงินเรียบร้อย" && (
            <button
              className="w-20 h-5  ml-4 mb-1 inline-block rounded bg-purple-100 px-2 pb-0 pt-0 py-4 font-small uppercase leading-normal"
              type="button"
                onClick={(e) => openModal2(e, row.order_id)}
            >
              <p className="text-purple-500">จัดส่ง</p>
            </button>
          )}
          {row.order_status=== "รับของเรียบร้อย" && (
            <button
              className="w-20 h-5  ml-4 mb-1 inline-block rounded bg-purple-100 px-2 pb-0 pt-0 py-4 font-small uppercase leading-normal"
              type="button"
                onClick={(e) => openModal3(e, row.order_id)}
            >
              <p className="text-purple-500">เสร็จสิ้น</p>
            </button>
          )}
          {
            <button
              className="w-20 h-5  ml-4 mb-1 inline-block rounded bg-red-100 px-2 pb-0 pt-0 py-4 font-small uppercase leading-normal"
              type="button"
              onClick={(e) =>
                openModal4(
                  e,
                  row.order_id,
                  row.order_name,
                  row.order_price,
                  row.order_status
                )
              }
            >
              <p className="text-yellow-500">ดู</p>
            </button>
          }
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

  return (
    <div className="bg-gray-50 pb-20">
      <Authen/>
      <div>
        <Navbar />
      </div>
      <div className="relative flex flex-col items-center justify-center pt-8 ">
      <div className="items-center ">
          <img src={logo} style={{width:"324px", height:"auto"}} />
        </div>
      </div>
      
      <div className="pb-96 p-8 pt-16"
      >
        <div className="p-3 rounded-xl shadow-2xl bg-inherit ">
          <div className="p-4">
            <label className="text-2xl" style={{ color: "rgb(136, 146, 227)" }}>
              จัดการรายการคำสั่งซื้อ
            </label>
          </div>
          <div>
            <DataTable
              columns={columes}
              data={order}
              initialPageLength={4}
              persistTableHead
              customStyles={customStyles}
              pagination
            ></DataTable>
          </div>
        </div>
      </div>


      {/* Modal */}
      {isModalOpen && (
        <dialog className="modal " open>
          <div className="modal-box">
            <h3 className="font-bold text-lg ">ยืนยันการเปลี่ยสถานะ</h3>
            <p className="font-bold text-lg ">ID = {orderId.id}</p>
            <div className="modal-action">
              <button className="btn btn-success mr-4" onClick={updateStatusto}>
                ยืนยัน
              </button>
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
      {isModalOpen3 && (
        <dialog className="modal " open>
          <div className="modal-box">
            <h3 className="font-bold text-lg ">ยืนยันการเปลี่ยสถานะ</h3>
            <p className="font-bold text-lg ">ID = {orderId.id}</p>
            <div className="modal-action">
              <button className="btn btn-success mr-4" onClick={updateStatusto}>
                ยืนยัน
              </button>
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal */}
      {isModalOpen2 && (
        <dialog className="modal " open>
          <div className="modal-box">
            <h3 className="font-bold text-lg ">ยืนยันการจัดส่ง</h3>
            <p className="font-bold text-lg ">ID = {orderId.id}</p>
            <div className="modal-action">
              <button className="btn btn-success mr-4" onClick={updateStatusto}>
                ยืนยัน
              </button>
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

{isModalOpen4 && (
        <dialog className="modal " open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">รายละเอียดสินค้า</h3>
            <p className="pt-8">ชื่อ : {orderData.name}</p>
            <p >ราคา : {orderData.price}</p>
            <p >
              สถานะ : {orderData.order_status}
            </p>
            {/* Additional details go here */}
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen4(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}


export default OrdarManage;
