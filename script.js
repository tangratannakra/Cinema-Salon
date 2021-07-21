import { movies } from "./movies.js";

const salonContainer = document.querySelector('.salon');
const seatAll = Array.prototype.slice.call(salonContainer.querySelectorAll('.seat'));
const infoSeat = document.querySelector('.ticket__number');
const infoPrice = document.querySelector('.ticket__price');
const selectMovie = document.getElementById('select-movie');
const btnCLR = document.querySelector('.btn-clear');
const btnBuy = document.querySelector('.btn-buy');
const btnClose = document.querySelector('.btn-close');
const modal = document.querySelector('.modal');

let seatIndex =[];

selectMovie.addEventListener('change', setMovieSalon);
btnCLR.addEventListener('click', clearBtnHandler);
btnBuy.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);

//inital load write
salonInitialization();

function seatClickHandler(e){
    if(selectMovie.selectedIndex == 0){
        salonInitialization();
    } else {
        e.target.classList.toggle('seat--selected');
        seatStatusHandler(e.target);
        purchaseInfo();
        selectedIndex();
        toLocalStorage(seatIndex);
    }
}

//handles the text content and classes of the seats when selected/deselected
function seatStatusHandler(seat){
    if (seat.classList.contains('seat--selected')){
         seat.innerHTML = '<div class="visually-hidden">Seat is selected</div>';
         seat.title = 'Selected';
    } else if (seat.classList.contains('seat--na')){
         seat.innerHTML = '<div class="visually-hidden">Seat is not available</div>';
         seat.title = 'Not Available';
    } else {
         seat.innerHTML = '<div class="visually-hidden">Seat is available</div>';
         seat.title = 'Available';
    }   
 
}
 
 function selectedIndex(){
     const seatSelected = salonContainer.querySelectorAll('.seat--selected')
     
     seatIndex = [...seatSelected].map(seat => seatAll.indexOf(seat));
}

function setMovieSalon(e){
    const backgroundImae = document.querySelector('body');
    const movieDescr = document.querySelector('.movie-dscription');
    const ticketTitle = document.querySelector('.ticket__title');
    const pageTitle = document.querySelector('.screen__title');
    const timeInfo = document.querySelector('.salon-meta');

    if (selectMovie.selectedIndex > 0){
        backgroundImae.style.backgroundImage = 'url(./' + movies[e.target.value].poster + ')';
        pageTitle.innerText =  movies[e.target.value].name;
        ticketTitle.innerText =  movies[e.target.value].name + ' ' +  movies[e.target.value].price +'$';
        movieDescr.innerText = movies[e.target.value].description;
        timeInfo.innerHTML = '<span>22.03.2021</span> | <span>projection</span> <span>' + movies[e.target.value].time + '</span>';

        clearSalon();
        setSeatNA();
        setSeatAV();
        salonInitialization();
        fromLocalStorage();
        purchaseInfo();

    } else {
        backgroundImae.style.backgroundImage = 'none';
        pageTitle.innerText =  'Please, select a movie';
        ticketTitle.innerText =  'Please, select a movie';
        movieDescr.innerText = '';
        
        clearSalon();
    }
}


function clearSalon(){
    seatAll.map( seat => {
        seat.removeEventListener('click', seatClickHandler);
        seat.classList = 'seat';
    });
}
function setSeatNA(){
    if(selectMovie.selectedIndex > 0){
        if(selectMovie.value in movies){
            const seatNA = movies[selectMovie.value].seats;

            seatNA.map( seat => {
                seatAll[seat].classList.add('seat--na');
            });
        } 
    }    
}
function setSeatAV(){
    seatAll.map(function(seat){
        if(!seat.classList.contains('seat--na'))
        seat.addEventListener('click', seatClickHandler);
    }); 
}
function salonInitialization(){
    seatAll.map(seat => seatStatusHandler(seat));
    purchaseInfo();
}

function selectInitialization(moviesObj){
    Object.entries(moviesObj).map(function(movie){
        const option = document.createElement('option');
        
        option.value = movie[0];
        option.innerText = movie[1].name + ' - ' + movie[1].price + '$';
        // option.dataset.id = movie[0];
        
        selectMovie.appendChild(option);
    });
    
}

selectInitialization(movies);
 //Info bout the purchase at the end of the screen


 function purchaseInfo(){
     if (movies[selectMovie.value]) {
        const ticketNum = salonContainer.querySelectorAll('.seat--selected').length;
        const price = movies[selectMovie.value].price * ticketNum; 
    
        infoSeat.innerText = ticketNum;
        infoPrice.innerText = price;
     }
  
}

function toLocalStorage(seatIndex){
    
    let storageData = localStorage.getItem('cinema') ? JSON.parse(localStorage.getItem('cinema')) : [];
    const movieData = storageData[selectMovie.selectedIndex] = {'movie': movies[selectMovie.value].name, 'salon' : seatIndex}

    storageData[selectMovie.selectedIndex] = movieData;
    localStorage.setItem('cinema', JSON.stringify(storageData) );
}

function fromLocalStorage(){
    let storageData = localStorage.getItem('cinema') ? JSON.parse(localStorage.getItem('cinema')) : [];
    if (storageData.length > 0 && storageData[selectMovie.selectedIndex]){
        const selectedSeats = storageData[selectMovie.selectedIndex].salon;

        if(selectedSeats){
            selectedSeats.map( seat => {
                seatAll[seat].classList.add('seat--selected');
                seatStatusHandler(seatAll[seat]);
            });  
        } 
    }
}

function clearBtnHandler(){
    if(selectMovie.selectedIndex > 0 ){
        seatAll.map( seat => seat.classList.remove('seat--selected'));
        toLocalStorage([]);
    }   
}
const modalTickets = document.querySelector('.modal__tickets');
const modalName = document.querySelector('.modal__name');
const modalTime = document.querySelector('.modal__time');

function openModal(e){
    if (selectMovie.selectedIndex > 0 && salonContainer.querySelectorAll('.seat--selected').length > 0 ){
        modalTickets.innerText = salonContainer.querySelectorAll('.seat--selected').length;
        modalName.innerText = movies[selectMovie.value].name;
        modalTime.innerText = movies[selectMovie.value].time;
        modal.classList.remove('d-none');
    }
}
function closeModal(e){
    e.target.parentElement.parentElement.classList.add('d-none');
}