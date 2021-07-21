


// window.addEventListener('load', (event) => {
//     let xhr = new XMLHttpRequest();
    
//     xhr.open('GET', 'movies.json', true);
//     xhr.responseType = 'text';

//     xhr.onload = function(){
//         if( xhr.status === 200){
//             salonData = JSON.parse(xhr.responseText);

//             salonData.map(function(movie){
//             const option = document.createElement('option');
            
//             option.value = movie.price;
//             option.innerText = movie.name + ' - ' + movie.price;
//             option.dataset.image = movie.poster;
//             option.dataset.na = movie.seats;
            
//             selectMovie.appendChild(option);
//         });
//         }
//     }
//   });