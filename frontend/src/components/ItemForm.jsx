import React, { useState, useEffect } from "react";

const ItemForm = ({ currentItem, setCurrentItem, fetchItems }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setQuantity(currentItem.quantity);
      setPrice(currentItem.price);
      setCategory(currentItem.category);
    }
  }, [currentItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, quantity, price, category };

    try {
      const response = currentItem
        ? await fetch(`http://127.0.0.1:8000/api/items/${currentItem.id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
        : await fetch("http://127.0.0.1:8000/api/items/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

      if (response.ok) {
        setCurrentItem(null);
        setName("");
        setQuantity("");
        setPrice("");
        setCategory("");
        fetchItems();
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{currentItem ? "Edit Item" : "Add Item"}</h2>
      <input
        className="input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="input"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        className="input"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <select
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Clothing">Clothing</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit" className="button button-add">
        {currentItem ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default ItemForm;
