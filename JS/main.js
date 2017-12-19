 /*************
                      SAMPLE URLS
                      
                      1. To get the config data like image base urls
                      https://api.themoviedb.org/3/configuration?api_key=<APIKEY>
                      
                      2. To fetch a list of movies based on a keyword
                      https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>
                      
                      3. To fetch more details about a movie
                      https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>
                      *************/
 //https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>
 //const APIKEY is inside key.js


 let baseURL = 'https://api.themoviedb.org/3/';
 let configData = null;
 let baseImageURL = "https://image.tmdb.org/t/p/";
 let path = null;
 let imgSize = "w185"
 let movieID = null;
 let movieTitle = null;
 //        const APIKEY = "dfdf4fc07421ba63801f5839358dd692";


 let init = function () {
     let btn1 = document.querySelector("#search-button");
     btn1.addEventListener("click", runSearch);

     document.addEventListener('keypress', function (ev) {
         let char = ev.char || ev.charCode || ev.which;
         //         let str = String.fromCharCode(char);
         if (char == 10 || char == 13) {
             btn1.dispatchEvent(new MouseEvent('click'));
         }
     });



     /*let btn2 = document.querySelector("#back-button");
     btn.addEventListener("click", goBack);
      getConfig();*/
 }

 /*let getDetails = function (ev) {
     console.log(ev.currentTarget.parentNode.childNodes[3].innerHTML);
     let movieID2 = ev.currentTarget.parentNode.childNodes[3].innerHTML;
     let url = "".concat(baseURL, 'movie/', movieID2, '?api_key=', APIKEY);
     console.log("test get details", url);

     fetch(url)
         .then(result =>
             result.json()
         )
         .then((data) => {
             console.log(data);

             document.querySelector("#search-results").classList.remove("active");
             document.querySelector("#recommend-results").classList.add("active");

             document.querySelector("#details-title").innerHTML = data.tagline;
             document.querySelector("#details").innerHTML = data.overview + "\n Vote Average: " + data.vote_average + "\n\n Vote Count: " + data.vote_count;


         })
         .catch(err => alert(err))
 }*/

 let recommendedSearch = function (ev) {
     console.log(ev.currentTarget.parentNode.childNodes[3].innerHTML);
     let movieID2 = ev.currentTarget.parentNode.childNodes[3].innerHTML;
     let url = "".concat(baseURL, 'movie/', movieID2, '/recommendations?api_key=', APIKEY);
     console.log("test recommended search", url);

     fetch(url)
         .then(result =>
             result.json()
         )
         .then((data) => {
             console.log(data);

             document.querySelector("#search-results").classList.remove("active");
             document.querySelector("#recommend-results").classList.add("active");

             console.log(data);

             let df = document.createDocumentFragment();
             data.results.forEach(function (item, index) {
                 let unit = document.createElement("div");
                 unit.className = "movie";

                 let unitImage = document.createElement("img");
                 let unitImageURL = ''.concat(baseImageURL, imgSize, item.poster_path);
                 unitImage.className = "poster";
                 unitImage.setAttribute("alt", "poster");
                 unitImage.setAttribute("src", unitImageURL);

                 let h2 = document.createElement("h2");
                 h2.className = "movie-title";
                 h2.innerHTML = item.title;

                 let p1 = document.createElement("p");
                 p1.className = "movie-desc";
                 movieID = item.id;
                 p1.innerHTML = item.overview + " Movie ID: " + movieID;

                 let h4 = document.createElement("h4");
                 h4.className = "item.title";
                 h4.innerHTML = movieID;


                 unit.appendChild(unitImage);
                 unit.appendChild(h2);
                 unit.appendChild(p1);
                 unit.appendChild(h4);

                 df.appendChild(unit);

             })
             document.querySelector('#recommend-results').appendChild(df);


         })
         .catch(err => alert(err))
 }

 let runSearch = function () {
     //     ev.preventDefault();
     let keyWord = document.getElementById("search-input").value;
     console.log("Searching for this: ", keyWord);


     document.querySelector(".search").classList.remove("home");
     let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyWord);
     fetch(url)
         .then(result =>
             result.json()
         )

         .then((data) => {
             console.log(data);
             displayResults(data);

         })
         .catch(err => alert(err))
 }

 let displayResults = function (data) {

     while (document.querySelector(".content").hasChildNodes()) {
         document.querySelector(".content").removeChild(document.querySelector(".content").firstChild);
     }


     document.querySelector('.num').innerHTML = "You have " + data.results.length + " results";

     let df = document.createDocumentFragment();
     data.results.forEach(function (item, index) {
         let unit = document.createElement("div");
         unit.className = "movie";

         let unitImage = document.createElement("img");
         let unitImageURL = ''.concat(baseImageURL, imgSize, item.poster_path);
         unitImage.className = "poster";
         unitImage.setAttribute("alt", "poster");
         unitImage.setAttribute("src", unitImageURL);

         let h2 = document.createElement("h2");
         h2.className = "movie-title";
         h2.innerHTML = item.title;
         h2.addEventListener("click", recommendedSearch);

         let p1 = document.createElement("p");
         p1.className = "movie-desc";
         movieID = item.id;
         p1.innerHTML = item.overview + " Movie ID: " + movieID;


         let h4 = document.createElement("h4");
         h4.className = "item.title";
         h4.innerHTML = movieID;


         unit.appendChild(unitImage);
         unit.appendChild(h2);
         unit.appendChild(p1);
         unit.appendChild(h4);

         df.appendChild(unit);

     })
     document.querySelector('.content').appendChild(df);
 }

 document.addEventListener('DOMContentLoaded', init);
 /*******************************
 SAMPLE SEARCH RESULTS DATA
 { "vote_count": 2762, 
     "id": 578, 
     "video": false, 
     "vote_average": 7.5, 
     "title": "Jaws", 
     "popularity": 16.273358, 
     "poster_path": "/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg", 
     "original_language": "en", 
     "original_title": "Jaws", 
     "genre_ids": [ 27, 53, 12 ], 
     "backdrop_path": "/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg", 
     "adult": false, 
     "overview": "An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.", 
     "release_date": "1975-06-18" 
 }
 *******************************/
