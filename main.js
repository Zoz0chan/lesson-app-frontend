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
     sort(){
      const order = this.sortOrder;
      const attribute = this.sortAttribute;
      
      this.lessons.sort((a, b) => {
        let comparison = 0;
        // Handle string comparisons (topic/name and location)
        if(attribute === 'name' || attribute === 'topic'){
          comparison = a.subject.localeCompare(b.topic);
        } else if(attribute === 'location'){
          comparison = a.location.localeCompare(b.location);
        } 
        // Handle numeric comparisons (space and price)
        else if(attribute === 'space' || attribute === 'price'){
          comparison = a[attribute] - b[attribute];
        }
        // Reverse for descending order
        return order === 'desc' ? -comparison : comparison;
      });
    }
  },
  beforeMount: function(){
    fetch("https://lesson-app-backend-pbex.onrender.com/lessons")
      .then(response => response.json())
      .then(data => {
        this.lessons = data;
        this.fullLessons = data;
      });
  },
  mounted: function(){}
});
