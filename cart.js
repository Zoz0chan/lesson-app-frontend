let app = new Vue({
  el: '#app',
  data: {
    cartItems: sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : [],
    checkoutInfo: {
      firstName: '',
      lastName: '',
      phone: ''
    }
  },
  methods: {
    removeFromCart: function(index){
      this.cartItems.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    clearCart: function(){
      this.cartItems = [];
      sessionStorage.removeItem("cart");
    },
    decreaseQuantity(item){
      if(item.quantity > 1){
        item.quantity--;
        sessionStorage.setItem("cart", JSON.stringify(this.cartItems));
      }
