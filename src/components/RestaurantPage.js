import React, { useState, useEffect } from "react";
import { db } from "../tools/firebase";
import ReactLoading from "react-loading";
import "./css/RestaurantPage.css";
import Product from "./Product";
import MenuFilter from "./MenuFilter";
import { DARK_GRAY, PRODUCTS_PER_ROW } from "../util/constants";

function RestaurantPage({ restaurant }) {
  const [productMatrix, setProductMatrix] = useState([]);
  const Banner = require(`../img/${restaurant}Banner.png`);

  useEffect(() => {
    //Retrieve all relevant data for restaurant from firestore
    db.collection("Restaurant Information")
      .doc(restaurant)
      .get()
      .then((snapshot) => {
        const data = snapshot.data()["Menu"];
        let prodMatrix = [];
        for (let i = 0; i < data.length; i += PRODUCTS_PER_ROW) {
          prodMatrix.push(
            data.slice(i, Math.min(i + PRODUCTS_PER_ROW, data.length))
          );
        }
        setProductMatrix(prodMatrix);
      });
  }, [restaurant]);

  return (
    <div className="restaurant">
      <div className="restaurant__container">
        <div className="restaurant__header">
          {/* Banner */}
          <img
            className="restaurant__banner"
            src={Banner}
            alt="Restaurant Banner"
          />
          {/* Menu Filter */}
          <MenuFilter />
        </div>
        {/* Products */}
        {productMatrix.length > 0 ? (
          productMatrix.map((row, index) => (
            <div key={`restaurant__row_${index}`} className="restaurant__row">
              {row.map((prod) => (
                <Product key={`restaurant__prod_${prod.id}`} product={prod} />
              ))}
            </div>
          ))
        ) : (
          <div className="restaurant__loading">
            <ReactLoading
              type={"bars"}
              color={DARK_GRAY}
              height={"100px"}
              width={"100px"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantPage;
