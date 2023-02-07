import increaseIcon from "./increase.png";
import decreaseIcon from "./decrease.png";
import deleteIcon from "./delete.png";
import React from "react";

class CartItem extends React.Component {
  // increaseQuantity = () => {
  // Set state uses shallow merging and then the component is re rendered (setState is asynchronus)
  // Set state acts as synchronously inside api calls and promises etc

  // setState form 1 (When the state is not dependent on previous state)

  // In case of multiple setStates react uses batching to render the component only once
  // The calls are merged shallowly so react will take only the last returned object for updating the state

  // this.setState({
  //   qty: this.state.qty + 1,
  // }, () => {}); There is an option for a callback after state is finished updated

  // setState form 2 (When the state is dependent on previous state)

  // In case of multiple setStates react uses batching to render the component only once
  // The calls are merged but react makes sure the prevState is up to date so the amount will update after every setState

  //   this.setState((prevState) => {
  //     return {
  //       qty: prevState.qty + 1,
  //     };
  //   });
  // };

  // decreaseQuantity = () => {
  //   this.setState((prevState) => {
  //     return prevState.qty > 0 ? { qty: prevState.qty - 1 } : {};
  //   });
  // };
  render() {
    const { price, title, qty } = this.props.product;
    const { product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct } =
      this.props;
    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image} alt="Product" />
        </div>
        <div className="right-block">
          <div style={{ fontSize: 25 }}>{title}</div>
          <div style={{ color: "#777" }}>Rs {price} </div>
          <div style={{ color: "#777" }}>Qty: {qty} </div>
          <div className="cart-item-actions">
            {/* Buttons */}
            <img
              alt="increase"
              className="action-icons"
              src={increaseIcon}
              onClick={() => onIncreaseQuantity(product)}
            />
            <img
              alt="decrease"
              className="action-icons"
              src={decreaseIcon}
              onClick={() => onDecreaseQuantity(product)}
            />
            <img
              alt="delete"
              className="action-icons"
              src={deleteIcon}
              onClick={() => onDeleteProduct(product.id)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: "#ccc",
  },
};

export default CartItem;
