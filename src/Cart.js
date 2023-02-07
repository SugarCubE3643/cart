import React from "react";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 999,
          title: "Mobile Phone",
          qty: 1,
          img: "",
          id: 1,
        },
        {
          price: 2143,
          title: "RAM",
          qty: 1,
          img: "",
          id: 2,
        },
        {
          price: 15000,
          title: "RTX 3090",
          qty: 1,
          img: "",
          id: 3,
        },
        {
          price: 999,
          title: "Mobile Phone",
          qty: 1,
          img: "",
          id: 4,
        },
        {
          price: 999,
          title: "Mobile Phone",
          qty: 1,
          img: "",
          id: 5,
        },
      ],
    };
  }
  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
      products
    });
  }
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if(products[index].qty > 0){
      products[index].qty -=1;
      this.setState({products});
    }
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter( (item) => item.id !== id );

    this.setState({
      products: items
    });
  }
  render() {
    const { products } = this.state;
    return (
      <div className="cart">
        {products.map((product) => {
          return <CartItem 
            product={product} 
            key={product.id} 
            onIncreaseQuantity={this.handleIncreaseQuantity} 
            onDecreaseQuantity={this.handleDecreaseQuantity}
            onDeleteProduct={this.handleDeleteProduct}
          />;
        })}
      </div>
    );
  }
}

export default Cart;
