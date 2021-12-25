import React from "react";
import "./css/ShoppingCart.css";
import { useStateValue } from "../context/StateProvider";
import Subtotal from "./Subtotal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ClearIcon from "@material-ui/icons/Clear";
import TableHead from "@material-ui/core/TableHead";
import CurrencyFormat from "react-currency-format";

function ShoppingCart() {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = (id) => {
    // remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="shoppingcart">
      <div className="shoppingcart__left">
        <h1 className="shoppingcart__title"> Shopping Cart </h1>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className={"table"}
          >
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
                <TableRow hover key={row.name}>
                  <TableCell>
                    <div className={"shoppingcart__product"}>
                      <img
                        className={"shoppingcart__image"}
                        src={row.image}
                        alt={"Product " + index + " image"}
                      />
                    </div>
                  </TableCell>
                  <TableCell className={"tablecell"}>
                    <span className={"shoppingcart__producttext"}>
                      {row.title}
                    </span>
                  </TableCell>
                  <TableCell align={"center"} className={"tablecell"}>
                    <CurrencyFormat
                      renderText={(value) => <p>{value}</p>}
                      value={row.price}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </TableCell>
                  <TableCell align={"center"} className={"tablecell"}>
                    {row.rating + " star(s)"}
                  </TableCell>
                  <TableCell align={"center"} className={"tablecell"}>
                    {row.quantity}
                  </TableCell>
                  <TableCell align={"center"} className={"tablecell"}>
                    <CurrencyFormat
                      renderText={(value) => <p>{value}</p>}
                      value={row.price * row.quantity}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </TableCell>
                  <TableCell align={"center"} className={"tablecell"}>
                    <ClearIcon
                      fontSize={"medium"}
                      onClick={() => removeFromBasket(row.id)}
                      className={"clearicon"}
                    />
                  </TableCell>
                </TableRow>
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
