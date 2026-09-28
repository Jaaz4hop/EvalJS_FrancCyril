/***************
  MAP LEAFLET
***************/
//Import de la map
const map = L.map('map').setView([0, 0], 5);

//Ajout des tuiles de la map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Création de l'icone
let issIcon =  L.icon({
    iconUrl: '../assets/img/international-space-station-icon.png',
    iconSize: [50, 50],
    iconAnchor: [22, 94],
    popupAnchor: [0, -90]
});

//Création du marqueur
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);

//Fonction pour appeler l'api ISS et appliquer les valeurs de lng et lat pour placer notre marqueur.
async function issAPI(map, marker) {
    try {
        const response = await fetch("http://api.open-notify.org/iss-now.json");

        const value = await response.json();

        const issLat = value.iss_position.latitude;
        const issLong = value.iss_position.longitude;

        map.setView([issLat, issLong], 5);
        marker.setLatLng([issLat, issLong]);
    } catch (error) {
        console.log("Une erreur est survenue :", error);
    }
}

/*******************
  SUIVI ISS
*******************/

setInterval(() => issAPI(map, marker), 1000);

/***************
  METEO LOCALE
***************/

//Création d'un paragraphe avec attributs demandés
let text = document.createElement("p");
text.style.height = "300px";
text.style.width = "200px";
text.style.margin = "16px 0px 16px 0px";
text.style.border = "3px solid grey";
text.style.padding = "16px 12px 24px 12px";

//récupération de la div souhaitée
const wheatherCard = document.getElementsByClassName("cardMeteo");

//ajout du texte dans la div souhaitée
wheatherCard.appendChild(text);
