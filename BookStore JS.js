
var fetchTime = localStorage.getItem("fetchTime");
var currentTime = Date.now();
var elapsedTimeInHours = (currentTime-fetchTime)/(1000*60*60);
var checkDataAvailability = JSON.parse(localStorage.getItem("bookData"));


if ((checkDataAvailability == null) || (elapsedTimeInHours>24)){
    console.log("fetching data");
    fetch ("https://api.myjson.com/bins/1h3vb3", {
        method: "GET",
    //    headers: {'X-API-Key': "Key goes inside the quotes"}

    }).then(function (response){
        if (response.ok){return response.json();}
        throw new Error(response.statusText);

    }).then(function (json){
        window.localStorage.setItem("fetchTime", Date.now());
        var receivedData = json;
        
        window.localStorage.setItem("bookData", JSON.stringify(receivedData));
        var storedData = JSON.parse(localStorage.getItem("bookData"));
        var books = storedData.books;
        
        callVue (books);

    }).catch(function(error){console.log("Request failed: " + error.message);});
}

else {
        
    console.log(" retreiving data from local storage ");
    var storedData = JSON.parse(localStorage.getItem("bookData"));
    var books = storedData.books;

    callVue (books);
}





function callVue (books){  

    new Vue({
    
    el: "#pageBody",
    
    data: {
            myBooks: books,
        
            langAll: true,
            langES: false,
            langEN: false,
        
            searchBox: ''
        
    },
    
    methods: {
                
    },   
    
    computed: {
        
       filteredBooks: function (){
            return this.myBooks.filter((aBook)=>{
                return (aBook.titulo.toLowerCase().includes(this.searchBox.toLowerCase())) || (aBook.descripcion.toLowerCase().includes(this.searchBox.toLowerCase())) ;
            })
        } 
    }    

});

}




