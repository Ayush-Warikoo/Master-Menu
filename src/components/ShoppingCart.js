import React from "react";
import "./css/ShoppingCart.css";
import Subtotal from "./Subtotal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import { useBasketContext } from "../context/BasketContext";
import ShoppingCartRow from "./ShoppingCartRow";

function ShoppingCart() {
  const [{ basket }] = useBasketContext();

  return (
    <div className="shoppingcart">
      <div className="shoppingcart__left">
        <h1 className="shoppingcart__title"> Shopping Cart </h1>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className={"table"}>
            <TableHead>
              <TableRow>
                <TableCell align={"left"}>
                  <span className={"tablehead__product"}> Product</span>
                </TableCell>
                <TableCell align={"center"}></TableCell>
                <TableCell align={"center"}>
                  <span className={"tablehead"}> Price </span>
                </TableCell>
                <TableCell align={"center"}>
                  <span className={"tablehead"}> Rating </span>
                </TableCell>
                <TableCell align={"center"}>
                  <span className={"tablehead"}> Quantity </span>
                </TableCell>
                <TableCell align={"center"}>
                  <span className={"tablehead"}> Subtotal </span>
                </TableCell>
                <TableCell align={"center"} className={"tablehead__remove"}>
                  {" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.map((row, index) => (
                <ShoppingCartRow row={row} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="shoppingcart__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default ShoppingCart;
