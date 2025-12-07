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
      },
    increaseQuantity(item){
      if(item.quantity < item.spaces){
        item.quantity++;
        sessionStorage.setItem("cart", JSON.stringify(this.cartItems));
      }
    },
    async checkout(){
      // Validate all fields are filled
      if(!this.checkoutInfo.firstName.trim() || !this.checkoutInfo.lastName.trim() || !this.checkoutInfo.phone.trim()){
        alert("Please fill in all checkout fields.");
        return;
      }
      // Validate first name length
      else if (this.checkoutInfo.firstName.length < 3){ 
        alert("Please enter a valid firstname (at least 3 characters).");
        return;
      }
      // Validate last name length
      else if (this.checkoutInfo.lastName.length < 3){ 
        alert("Please enter a valid lastname (at least 3 characters).");
        return;
      }
      // Validate phone number
      else if (this.checkoutInfo.phone.length < 8 || !/^(?:\+230)?(2\d{6}|5\d{7})$/.test(this.checkoutInfo.phone)){
        alert("Please enter a valid phone number.");
        return;
      }
      // All validations passed, proceed with checkout
      else {
        try {
          const response = await fetch('https://lesson-app-backend-pbex.onrender.com/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart: this.cartItems,
              checkoutInfo: this.checkoutInfo
            })
          });
          if(response.ok){
            alert("Thank you! Order placed successfully.");
            this.clearCart();
            this.checkoutInfo.firstName = '';
            this.checkoutInfo.lastName = '';
            this.checkoutInfo.phone = '';
            window.location.href = "index.html";
          } else {
            alert("Checkout failed. Please try again.");
          }
        } catch (error) {
          console.error("Checkout error:", error);
          alert("Checkout failed. Please check your connection and try again.");
        }
      }
}
  },
  computed: {
    subtotal(){
      let total = 0;
      this.cartItems.forEach(item => {total += item.price * item.quantity});
      return total
    },
  }
})
