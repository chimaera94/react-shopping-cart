// feature 1
import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import data from './data.json';
import Cart from './components/Cart';


class App extends React.Component  {
  //The constructor is a method used to initialize an object's state in a class.
  //It automatically called during the creation of an object in a class.
  //Always call super() method to prevent 'undefined' error.
  constructor(){
    super();
    //State of a component is an object that holds some information that may change over the lifetime of the component.
    this.state = {
      products: data.products,
      //check if item exists, else use array []
      //localStorage is used to save some user data in the local browser. more like a cookie.
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
      size: "",
      sort:"",
    };
  }
  createOrder = (order) =>{

    alert("Need to save order for " + order.name)
  };
  removeFromCart=(product) => {
    //.slice() is used to return selected elements in an array.
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(x=>x._id !== product._id)});
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=>x._id !== product._id)));
  }

  addToCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) =>{
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });

    if(!alreadyInCart){
      //spread operator: ...product: instead of having the product, we will get the fields/details of the product.
      //count: 1 : add the instance of the product as new item inside cart items
      cartItems.push({...product, count:1});

    }
    //set the state or cartItems
    this.setState({cartItems}); 
    //saving the item in localstorage.
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  };
  sortProducts = (event) =>{
    //implement
    //const means constant, which indicates the variable’s value won’t change.
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a,b) =>(
        sort === "lowest"?
        ((a.price > b.price)? 1:-1):
        sort === "highest"?
        ((a.price < b.price)? 1:-1):
        ((a._id < b._id)? 1:-1)
      ))

    }));
  }

  filterProducts  = (event) =>{
    console.log(event.target.value);
    if(event.target.value ===""){
      this.setState({size: event.target.value, products:data.products});

    }

    else {
    this.setState({
      size: event.target.value,
      products: data.products.filter(product => product.availableSizes.indexOf(event.target.value)>=0)
    })
  }

  }
  render(){
  return (
    <div className="grid-container">
      <header className="App-header">
        <a href="/">React Shopping Cart</a>
      </header>

      <main>
        <div className="content">
          <div className="main">
            <Filter count={this.state.products.length}
            size={this.state.size}
            sort={this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}>
              
            </Filter>
            <Products products={this.state.products} addToCart={this.addToCart}></Products>
          </div>
          <div className="sidebar">
           <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}
           createOrder={this.createOrder}/>
           
          </div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
  );
}
}

export default App;
