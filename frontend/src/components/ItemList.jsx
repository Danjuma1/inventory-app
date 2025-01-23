import React, { useState, useEffect } from "react";

const ItemList = ({ onEdit }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchItems = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/items/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/items/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchItems(); // Refresh the item list after deletion
      } else {
        throw new Error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setCategoryFilter(filterValue);

    if (filterValue === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.category === filterValue);
      setFilteredItems(filtered);
    }
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    let sorted = [...filteredItems];
    if (sortValue === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortValue === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredItems(sorted);
  };

  const totalInventoryValue = filteredItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Item List</h2>
      <div style={styles.filters}>
        <label style={styles.label}>
          Filter by Category:
          <select value={categoryFilter} onChange={handleFilterChange} style={styles.select}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Stationery">Stationery</option>
          </select>
        </label>

        <label style={{ ...styles.label, marginLeft: "20px" }}>
          Sort by Price:
          <select value={sortOption} onChange={handleSortChange} style={styles.select}>
            <option value="">None</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </label>
      </div>

      {filteredItems.length === 0 ? (
        <p style={styles.noItems}>No items found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.category}</td>
                <td style={styles.td}>${item.price}</td>
                <td style={styles.td}>{item.quantity}</td>
                <td style={styles.td}>
                  <button onClick={() => onEdit(item)} style={styles.button}>
                    Edit
                  </button>
                  <button onClick={() => deleteItem(item.id)} style={{ ...styles.button, backgroundColor: "#e74c3c" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={styles.totalValue}>
        <strong>Total Inventory Value: </strong>${totalInventoryValue.toFixed(2)}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  filters: {
    marginBottom: "20px",
    textAlign: "center",
  },
  label: {
    fontSize: "16px",
    marginRight: "10px",
  },
  select: {
    padding: "5px",
    fontSize: "16px",
    marginLeft: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  button: {
    padding: "5px 10px",
    margin: "0 5px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  noItems: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
  },
  totalValue: {
    fontSize: "18px",
    marginTop: "20px",
    textAlign: "center",
  },
};

export default ItemList;
