import React, { useEffect, useState } from "react";
import data from "./data";
// import "./Food.css";
import trolley from "./images/icon-add-to-cart.svg";
import CartStore from "./CartStore";
// type ProductRecord = {
//   index:number;
//   quantity:number;
// }[]

/* You cannot MUTATE STATES IN REACT
EX.
❌productRecord.push()
✅ const modifiedRecord = [...productRecord].push()
setProductRecord(modifiedRecord) */

const Food = () => {
  // State to track if the item is added to the cart
  const [isInCart, setIsInCart] = useState(false);

  // State to track hover
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [productRecord, setProductRecord] = useState([]);

  // Handle adding item to the cart
  const handleAddToCart = () => {
    setIsInCart(true);
  };

  // Handle increase in quantity
  const increaseQuantity = (idx) => {
    const toIncrease = productRecord.map((d) => {
      if (d.idx === idx) {
        return { ...d, quantity: ++d.quantity };
      }
      return d;
    });
    setProductRecord(toIncrease);
  };

  // Handle decrease in quantity
  const decreaseQuantity = (idx) => {
    const toDecrease = productRecord.map((d) => {
      if (d.idx === idx) {
        if (d.quantity < 1) return d;
        return { ...d, quantity: --d.quantity };
      }
      return d;
    });
    setProductRecord(toDecrease);
  };

  useEffect(() => {
    const extendedData = data.map((d, idx) => ({ ...d, quantity: 0, idx }));
    setProductRecord(extendedData);
  }, [data]);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <h1>DESSERT</h1>

        <div className="house">
          {productRecord.map((item) => (
            <div key={item.idx} className="house-1">
              <div className="image-container">
                <img src={item.image} alt={item.name} className="edit" />

                {/* <div className="add-to-cart">
                <img src={trolley} alt="trolley image" />
                <p>Add to Cart</p>
              </div> */}

                <div
                  className="add-to-cart"
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setHoveredIdx(item.idx);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleAddToCart}
                >
                  {isHovered && hoveredIdx === item.idx ? (
                    <div style={{ cursor: "pointer" }} className="hover-house">
                      <button onClick={() => decreaseQuantity(item.idx)}>
                        -
                      </button>
                      <div>
                        <span>{item.quantity}</span>
                      </div>
                      <button onClick={() => increaseQuantity(item.idx)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <>
                      <img src={trolley} alt="trolley" />
                      <p>Add to Cart</p>
                    </>
                  )}
                </div>
              </div>
              <h3 className="house-2">{item.name}</h3>
              <p className="house-3">Category: {item.category}</p>
              <p className="house-4">Price: ${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <CartStore productRecord={productRecord} />
      </div>
    </div>
  );
};

export default Food;
