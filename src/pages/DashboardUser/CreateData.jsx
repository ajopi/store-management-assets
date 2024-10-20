import React, { useState } from "react";
import useUser from "../../store/useUsers";
import { useNavigate } from "react-router-dom";

const CreateData = () => {
  const navigate = useNavigate();
  const [itemName, setitemName] = useState("");
  const [itemPrice, setitemPrice] = useState(0);
  const [itemStatus, setitemStatus] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const { fetchData, createTransactionData } = useUser((state) => state);

  const handleSubmitCreateData = (e) => {
    e.preventDefault();
    const create = async () => {
      await createTransactionData(user.id, itemName, itemPrice, itemStatus);
      await fetchData();
      navigate("/dashboard");
    };
    create();
  };

  return (
    <div className="create-data">
      <h2>
        Create a Record of Your Transaction by Completing the Following Form
      </h2>
      <form onSubmit={(e) => handleSubmitCreateData(e)}>
        <label htmlFor="item-name">Item Name</label>
        <input
          className="create-data__input-field"
          type="text"
          id="item-name"
          placeholder="input Your Item Name"
          required
          onChange={(e) => setitemName(e.target.value)}
        />

        <label htmlFor="item-price">Item Price</label>
        <input
          className="create-data__input-field"
          type="number"
          id="item-price"
          placeholder="set Your Item Price"
          required
          onChange={(e) => setitemPrice(e.target.value)}
        />

        <p>Is this transaction completed?</p>
        <div className="item-price__status-option">
          <input
            type="radio"
            name="option"
            id="item-status"
            placeholder="input Your Item Name"
            required
            value={true}
            onClick={(e) => setitemStatus(e.target.value)}
          />
          <label htmlFor="item-status">yes</label>

          <input
            type="radio"
            name="option"
            id="item-status-no"
            placeholder="input Your Item Name"
            required
            value={false}
            onClick={(e) => setitemStatus(e.target.value)}
          />
          <label htmlFor="item-status-no">No</label>
        </div>

        <button>Submit Form</button>
      </form>
    </div>
  );
};

export default CreateData;
