import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebaseApp from "./firebase";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  addDoc,
  runTransaction,
  doc,
  deleteDoc,
} from "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
      // unsubscribe: () => {}
    };
  }
  async getProducts() {
    const db = getFirestore(firebaseApp);
    const productsCollection = collection(db, "products");
    const productsCollectionQuery = query(productsCollection);
    // const unsubscribe =
    onSnapshot(productsCollectionQuery, (productsSnapshot) => {
      const productsList = productsSnapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({ products: productsList, loading: false });
    });
  }
  componentDidMount() {
    this.getProducts();
  }
  componentWillUnmount() {
    // this.unsubscribe();
  }
  handleIncreaseQuantity = async (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;

    // this.setState({
    //   products,
    // });

    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "products", products[index].id);

    try {
      await runTransaction(db, async (transaction) => {
        const fetchedDoc = await transaction.get(docRef);
        if (!fetchedDoc.exists()) {
          throw ErrorEvent("Document does not exist!");
        }
        const newQty = fetchedDoc.data().qty + 1;
        transaction.update(docRef, { qty: newQty });
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };
  handleDecreaseQuantity = async (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products,
    // });

    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "products", products[index].id);

    try {
      await runTransaction(db, async (transaction) => {
        const fetchedDoc = await transaction.get(docRef);
        if (!fetchedDoc.exists()) {
          throw ErrorEvent("Document does not exist!");
        }
        const newQty = fetchedDoc.data().qty - 1;
        transaction.update(docRef, { qty: newQty });
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };
  handleDeleteProduct = async (id) => {
    // const { products } = this.state;

    // const product = products.filter((item) => item.id !== id);

    // this.setState({
    //   products: items,
    // });

    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };
  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.forEach((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    });

    return cartTotal;
  };

  addProduct = async () => {
    const db = getFirestore(this.props.app);
    await addDoc(collection(db, "products"), {
      img: "https://images.unsplash.com/photo-1577553698923-17f1a80ce5bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2FzaGluZyUyMG1hY2hpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60",
      price: 43646,
      qty: 3,
      title: "Washing Machine",
    });
  };
  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a product
        </button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL: {this.getCartTotal()}{" "}
        </div>
      </div>
    );
  }
}

export default App;
