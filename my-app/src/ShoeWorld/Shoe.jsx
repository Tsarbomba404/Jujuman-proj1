import React, { useState } from "react";
// import "./Shoe.css";
import trolley from "./images/icon-cart.svg";
import avatar from "./images/image-avatar.png";
import productImage1 from "./images/image-product-1.jpg";
import productImage2 from "./images/image-product-2.jpg";
import productImage3 from "./images/image-product-3.jpg";
import productImage4 from "./images/image-product-4.jpg";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const Shoe = () => {
  // List of images
  const images = [productImage1, productImage2, productImage3, productImage4];

  // State to handle the index of the currently opened image for the lightbox
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // State to manage the main image displayed
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [addCount, setAddcount] = useState(1);

  // State to manage cart and total price
  const [cart, setCart] = useState([]);
  const productPrice = 125; // Product price

  function handleAddclick() {
    setAddcount(addCount + 1);
  }

  function handleDeductclick() {
    if (addCount > 1) {
      setAddcount(addCount - 1);
    }
  }

  // Handle adding the product to the cart
  function handleAddToCart() {
    const existingItem = cart.find((item) => item.id === selectedImage);

    if (existingItem) {
      // If the product already exists in the cart, update the quantity
      setCart(
        cart.map((item) =>
          item.id === selectedImage
            ? { ...item, quantity: item.quantity + addCount }
            : item
        )
      );
    } else {
      // Add new product to the cart
      setCart([
        ...cart,
        {
          id: selectedImage,
          name: "Fall Limited Edition Sneakers",
          price: productPrice,
          quantity: addCount,
        },
      ]);
    }

    alert("Product added to cart!");
  }

  // Calculate the total cart value
  const totalCartValue = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Total items in the cart
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <header>
        <div className="select-house">
          <h1>sneakers</h1>
          <div className="select">
            <h3>Collections</h3>
            <h3>Men</h3>
            <h3>Women</h3>
            <h3>About</h3>
            <h3>Contact</h3>
          </div>
        </div>
        <div className="head-icon">
          <img src={trolley} alt="Trolley icon" />
          <span>{totalItemsInCart}</span> {/* Show total items in the cart */}
          <img src={avatar} alt="Avatar image" />
        </div>
      </header>
      <hr />

      {/* Main image display */}
      <div className="frame-house-container">
        <div className="frame-house">
          <div className="frame-1">
            <div className="main-image">
              <img
                src={selectedImage}
                alt="Selected shoe"
                style={{
                  width: "300px",
                  height: "auto",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  justifyContent: "center",
                }}
              />
            </div>

            {/* Image thumbnails */}
            <div className="image-gallery">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(image)} // Update the main image on click
                  onDoubleClick={() => {
                    setPhotoIndex(index); // Open Lightbox when double-clicked
                    setIsOpen(true);
                  }}
                  style={{
                    width: "60px",
                    height: "auto",
                    cursor: "pointer",
                    margin: "10px",
                    borderRadius: "4px",
                    border:
                      selectedImage === image ? "2px solid orange" : "none", // Highlight the selected thumbnail
                  }}
                />
              ))}
            </div>
          </div>

          <div className="frame-2">
            <h5>SNEAKER COMPANY</h5>
            <h1>Fall Limited Edition Sneakers</h1>
            <p>
              These low profile sneakers are your perfect casual wear
              companion.Featuring a durable rubber outer sole, they'll withstand
              everything the weather can offer.
            </p>
            <div className="amount-sign">
              <p>$125.00</p>
              <p>50%</p>
            </div>
            <p className="line-through">$250.00</p>
            <div className="action">
              <div className="amount">
                <button onClick={handleDeductclick}>-</button>
                <span>{addCount}</span>
                <button onClick={handleAddclick}>+</button>
              </div>

              <div className="check-out" onClick={handleAddToCart}>
                <img src={trolley} alt="trolle logo" />
                <p>Add to cart</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cart section */}
        <div className="cart-section">
          <h3>Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} = $
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total: ${totalCartValue.toFixed(2)}</p>
              <button>Checkout</button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default Shoe;
