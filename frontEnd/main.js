const divRestaurant = document.querySelector('.restaurant');
const divPlat = document.querySelector('.plat');





let maRequete = new XMLHttpRequest();
   
maRequete.open('GET', `http://localhost/frameworkObjet/index.php?controller=restaurant&task=indexApi` )

maRequete.onload = () => {

    let data = JSON.parse(maRequete.responseText)

    faireDesCardsRestaurants(data)


}

maRequete.send();


function faireDesCardsRestaurants(tableauRestaurant) {

    let cards ="";

    tableauRestaurant.forEach(element =>{

        card = `<div class="col-4 p-3">

        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.address}</p>
            <button value="${element.id}" class="btn btn-primary showRestaurant">voir la carte</button>
            </div>
        </div>

    </div>`

    cards += card

    divRestaurant.innerHTML = cards
    divPlat.innerHTML = ""

    })

    document.querySelectorAll('.showRestaurant').forEach(bouton =>{

        bouton.addEventListener('click', event =>{
    
            afficheUnRestaurant(bouton.value);
    
        })})

    }
    
    function afficheUnRestaurant(id){

        let maRequete = new XMLHttpRequest() ;

        maRequete.open('GET', `http://localhost/frameworkObjet/index.php?controller=restaurant&task=showApi&id=${id}` )
 
 
 
    maRequete.onload =  () => {
 
            let data = JSON.parse(maRequete.responseText)
 
            let restaurant = data.restaurant   //objet
            let plats = data.plats   //tableau d'objets recette
 
            faireCardRestaurantEtCardsPlats(restaurant, plats)



    }
 
          maRequete.send();
}

function faireCardRestaurantEtCardsPlats(restaurant , plats){

    cardsRestaurant =  `<div class="col-4 p-3">

    <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${restaurant.name}</h5>
        <p class="card-text">${restaurant.address}</p>
        </div>
             <button class="btn btn-success retourRestaurants">Retour aux Restaurants</button>
     </div> 
   
</div>`

    divRestaurant.innerHTML = cardsRestaurant  
    
    cardsPlats ="";

    plats.forEach(plat => {

        cardPlat = `
        <div data-plat="${plat.id}">
    <hr>
    <h2>${plat.name}</h2>
    <p><strong>${plat.price}€</strong></p>
    <p>${plat.description}</p>
    <button class="btn btn-danger supprPlat" value="${plat.id}">Supprimer</button>
        <hr>
        </div>
    `

    cardsPlats += cardPlat
    })
    document.querySelectorAll('.supprPlat').forEach(bouton =>{

        bouton.addEventListener('click', event =>{
            alert("bien cablé")
           // supprimeUnPlat(bouton.value)
        })
    
    })
    divPlat.innerHTML = cardsPlats


    document.querySelector('.retourRestaurants').addEventListener('click', event => {

        let maRequete = new XMLHttpRequest();
   
maRequete.open('GET', `http://localhost/frameworkObjet/index.php?controller=restaurant&task=indexApi` )

maRequete.onload = () => {

    let data = JSON.parse(maRequete.responseText)

    faireDesCardsRestaurants(data)


}



maRequete.send();


    })
    
}
function  supprimeUnPlat(idPlat){


    let maRequete = new XMLHttpRequest();
   
    maRequete.open('POST', 'http://localhost/frameworkObjet/index.php?controller=plat&task=supprApi' )
 
 
 
    maRequete.onload =  () => {
 
       

            let divPlat = document.querySelector(`div[data-plat="${idPlat}"]`)
 
                divPlat.remove()
    }

    maRequete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        params = "id="+idPlat
          maRequete.send(params);

}