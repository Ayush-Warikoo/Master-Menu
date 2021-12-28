import React from "react";
import "./css/ShoppingCartRow.css";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ClearIcon from "@material-ui/icons/Clear";
import CurrencyFormat from "react-currency-format";
import { useBasketContext } from "../context/BasketContext";

const ShoppingCartRow = ({ row, index }) => {
  const [, basketDispatch] = useBasketContext();

  const removeFromBasket = (id) => {
    // remove the item from the basket
    basketDispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return React.useMemo(() => {
    return (
      <TableRow hover key={row.id}>
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
          <span className={"shoppingcart__producttext"}>{row.title}</span>
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
    );
  }, [row.id, row.title, row.rating, row.quantity, row.price, index]);
};

export default ShoppingCartRow;
