import React, { useState } from "react";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";

const Home = () => {
  const [currentItem, setCurrentItem] = useState(null);

  const fetchItems = async () => {
    // Fetch logic will be reused here
  };

  return (
    <div className="container">
      <h1 className="header">Inventory Management</h1>
      <ItemForm currentItem={currentItem} setCurrentItem={setCurrentItem} fetchItems={fetchItems} />
      <ItemList onEdit={setCurrentItem} fetchItems={fetchItems} />
    </div>
  );
};

export default Home;
