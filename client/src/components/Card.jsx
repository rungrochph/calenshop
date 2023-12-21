import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Card({ product }) {
  // eslint-disable-next-line react/prop-types
  const { title, description, price, image, name, quantity } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityc, setQuantityc] = useState(1);
  const [totalPrice, setTotalPrice] = useState();
  const [modalContent, setModalContent] = useState({
    title: "Your Calendar Name",
    description: "Your Calendar Description",
    price: 10, // Replace with the actual price by calen id
  });
  const [dataInsert, setDataInsert] = useState({
    name: null,
    price: null,
    user_id: null,
  });

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setDataInsert(prevData => ({
      ...prevData,
      name: modalContent.title,
      price: totalPrice,
      user_id: user_id,
    }));
  }, [modalContent.title, totalPrice]);

  const onClickInsert = () =>{
    console.log("Insert",dataInsert)
    insertOrder(dataInsert)
  }


  const insertOrder = async (JasonData) => {
    try {
      const response = await fetch(`http://localhost:3000/insertOrder/Id`, {
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



  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantityc(newQuantity);
    setTotalPrice((newQuantity * modalContent.price).toFixed(2));
    console.log("lll", newQuantity);
  };

  const openModal = () => {
    setModalContent({ title, description, price });
    setIsModalOpen(true);
    setTotalPrice(price);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl p-auto">
      <figure className="px-10 pt-10">
        <img src={image} alt={title} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <h4 className="card-title">ประเภท : {name}</h4>
        <p>{description}</p>
        <p>จำนวนคงเหลือ : {quantity} ชิ้น </p>
        <h1 className="card-title">ราคา {price} บาท</h1>
        {quantity > 0 && (
          <div className="card-actions">
            <button className="btn btn-primary" onClick={openModal}>
              Buy Now
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog className="modal " open>
          <div className="modal-box">
            <h3 className="font-bold text-lg ">{modalContent.title}</h3>
            <p className="py-4">{modalContent.description}</p>
            <p className="py-4 mt-4 lg:ml-16">จำนวนที่ต้องการ (ชิ้น)</p>
            <input
              required
              value={quantityc}
              onChange={handleQuantityChange}
              type="number"
              placeholder="จำนวนที่ต้องการ(ชิ้น)"
              className="input input-bordered w-full max-w-xs lg:ml-16"
            />
            <p className="py-4 mt-4 lg:ml-16">ราคารวม (บาท)</p>
            <input
              type="number"
              id="total_price"
              placeholder="ราคารวม"
              className="input input-bordered w-full max-w-xs mt-2 lg:ml-16"
              value={totalPrice}
              onChange={(e)=>setTotalPrice(e.target.value)}
              readOnly
            />
            <div className="modal-action">
              <button className="btn btn-success mr-4" onClick={onClickInsert}>
                ยืนยัน
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

export default Card;
