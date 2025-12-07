let app = new Vue({
  el: '#app',
  data: {
    lessons: [],
    fullLessons: [],
    cart: [],
    sortOrder: 'asc',
    sortAttribute: 'name',
    searchQuery: '',
    
  },
   methods: {
    addtoCart: function(lesson){
      if(lesson.spaces <= 0){
        alert("No spaces available for this lesson.");
        return;
      }else if(this.cart.includes(lesson)){
        alert("This lesson is already in your cart.");
        return;
      }
      lesson.spaces -= 1;
      lesson.quantity = 1; // Initialize quantity
      this.cart.push(lesson);

      sessionStorage.setItem("cart", JSON.stringify(this.cart));
      console.log(sessionStorage.getItem("cart"));
    },
     search(){
      const query = this.searchQuery.toLowerCase().trim();
      if(query.length){
        this.lessons = this.fullLessons.filter(lesson => 
          lesson.subject.toLowerCase().includes(query) || 
          lesson.location.toLowerCase().includes(query)
        );
      }else{
        this.lessons = this.fullLessons;
      }
    },
