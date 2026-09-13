const seatContainer = document.getElementById("seatContainer");

const Name = document.getElementById("Name");
const Id = document.getElementById("Id");
const SeatCategory = document.getElementById("SeatCategory");
const  Venue = document.getElementById("Venue");

const summaryName = document.getElementById("summaryName");
const summaryId = document.getElementById("summaryId");
const summarySeatCategory = document.getElementById("summarySeatCategory");
const summaryVenue = document.getElementById("summaryVenue");
const summarySeat = document.getElementById("summarySeat");
const totalPrice = document.getElementById("totalPrice");

const confirm= document.getElementById("confirm");
const reset = document.getElementById("reset");

const resultfinal = document.getElementById("resultfinal");
const result = document.getElementById("result");

const totalSeats = 60;

function getSeatPrice(seatNumber) {
    if (seatNumber<=20 || SeatCategory===VIP) {
        return 500;
    }
    if (seatNumber<=40 ) {
        return 300;
    }
    return 150;
}
 
let bookings = JSON.parse(
    localStorage.getItem("seatBookings")
)||[];

 function createSeats(){
    seatContainer.innerHTML = "";
    for (let i= 1;i<=totalSeats;i++) {
       const seat = document.createElement("button");
        seat.classList.add("seat");
        seat.textContent = i;
        seat.dataset.seat = i;
  
        const alreadyBooked = bookings.some(
            booking => booking.seat == i
        );
        if (alreadyBooked) {
           seat.classList.add("booked");
           seat.disabled = true;
        }
        seat.addEventListener("click", function () {
          selectSeat(i , seat);
        });
        seatContainer.appendChild(seat);
    }
}
 
let selectedSeat = null;
function selectSeat(seatNumber,seatElement){
    const previousSeat = document.querySelector(".seat.selected");
       if(previousSeat){
        previousSeat.classList.remove("selected");
    } 
    seatElement.classList.add("selected");
    selectedSeat = seatNumber;
    const price = getSeatPrice(seatNumber);
    totalPrice.textContent = price;
    summarySeat.textContent = "Seat"+seatNumber;
}
 

Name.addEventListener("input",function(){
summaryName.textContent=Name.value||"---";
});


Id.addEventListener("input",function(){
summaryId.textContent=Id.value||"---";
});


SeatCategory.addEventListener("change",function(){
summarySeatCategory.textContent=SeatCategory.value||"---";
});


Venue.addEventListener("change",function(){
summaryVenue.textContent=Venue.value||"---";
});
 
confirm.addEventListener("click",function(){
    if(Name.value.trim()===""){
     alert("Please enter your name.");
     return;
    }

    if(Id.value.trim()===""){
     alert("Please enter your mobile number.");
     return;
    }

    if( SeatCategory.value===""){
     alert("Please select your Seat Category.");
     return;
    }

    if(Venue.value===""){
     alert("Please select your Venue.");
     return;
    }

    if(selectedSeat===null){
     alert("Please select a seat.");
     return;
    }
 
    const seatAlreadyBooked=bookings.some(
        booking => booking.seat ==selectedSeat
    );

    if(seatAlreadyBooked){
     alert("This seat has already been booked.");
     return;
    }

    const price = getSeatPrice(selectedSeat);
    
    const booking ={
        name: Name.value.trim(),
        id: Id.value.trim(),
        SeatCategory: SeatCategory.value,
        Venue: Venue.value,
        seat: selectedSeat,
        price: price
   };
   
   bookings.push(booking);
 
    localStorage.setItem("seatBookings",JSON.stringify(bookings));
     
    result.innerHTML = `

        <div class="result-line">
            <span> Name</span>
            <strong>${booking.name}</strong>
        </div>

        <div class="result-line">
            <span>ID</span>
            <strong>${booking.id}</strong>
        </div>

        <div class="result-line">
            <span>SeatCategory</span>
            <strong>${booking.SeatCategory}</strong>
        </div>

        <div class="result-line">
            <span>Venue</span>
            <strong>${booking.Venue}</strong>
        </div>

        <div class="result-line">
            <span>Seat Number</span>
            <strong>${booking.seat}</strong>
        </div>

        <div class="result-line">
            <span>Total Price</span>
            <strong>Rs${booking.price}</strong>
        </div>

    `;
 
     result.classList.remove("hidden");
 
     const selectedElement = document.querySelector(".seat.selected");
        

    if(selectedElement){

     selectedElement.classList.remove("selected");
     selectedElement.classList.add("booked"); 
     selectedElement.disabled =true;
   
    }
 
    selectedSeat =null;
 
    summarySeat.textContent ="---";

    totalPrice.textContent ="0";

    alert("Seat booked successfully!");

});

 
reset.addEventListener("click",function(){

    Name.value ="";
    Id.value ="";
    SeatCategory.value ="";
    Venue.value ="";
    
    summaryName.textContent ="---";
    summaryId.textContent ="---";
    summarySeatCategory.textContent ="---";
    summaryVenue.textContent ="---";
    summarySeat.textContent ="---";

    totalPrice.textContent ="0";
   const selectedElement = document.querySelector(".seat.selected");
      
   if(selectedElement){
        selectedElement.classList.remove("selected");
    }
    selectedSeat =null;
    result.classList.add("hidden");

});

 
createSeats();