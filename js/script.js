// ## Consegna
// Dato un array di oggetti letterali con:
// - url dell’immagine
// - titolo
// - descrizione
// Creare un carosello ispirandosi alla foto allegata. Potete anche usare come base il carosello dell'esercizio precedente
//// ## Milstone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l’immagine grande in modo da poter stilare lo slider.
//// ## Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell’utente sulle frecce verso sinistra o destra, l’immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
//// ## Milestone 2:
// Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l’utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l’ultima e viceversa per l’ultima miniatura se l’utente clicca la freccia verso sinistra.

// ---
//// ## BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

//// ## BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

// ## BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.


const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description:
            'La Svezia è un paese scandinavo che comprende migliaia di isole lungo la costa e laghi nell entroterra, oltre a vaste foreste boreali e rilievi glaciali',
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description:
            'Il Perù è una nazione sudamericana che ospita una parte della Foresta Amazzonica e Machu Picchu, l antica città inca situata sulla catena delle Ande.',
    },
    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description:
            'Il Cile è un paese lungo e stretto che si estende lungo il confine occidentale del Sud America, con più di 6000 km di costa affacciata sull Oceano Pacifico.',
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description:
            'L Argentina è uno stato sudamericano molto esteso con un territorio che comprende la cordigliera delle Ande, laghi glaciali e le pianure della Pampa, il tradizionale terreno di pascolo dei famosi bovini da carne.',
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description:
            'La Colombia è un paese che si trova sulla punta nord del Sud America.',
    },
];

// prendo elemento carousel dal DOM
const carousel = document.getElementById('carousel');
const thumbnailContainer = document.getElementById('thumbnail');

let index = 1;
// per ogni elemento nell array... 
images.forEach((picture) => {
    const img = document.createElement('img');
    // assegno all 'attributo src dell'elemento i-esimo dell'array
    img.setAttribute('src', picture.url);
    // inserisco nell'elemento carousel l'immagine appena creata
    carousel.append(img);
    const thumbImage = document.createElement('img');
    thumbImage.setAttribute('src', picture.url);
    thumbImage.classList.add('opacity-50');
    thumbnailContainer.append(thumbImage);
})

// creo un elemento con tag img

// AZIONE 1.2 RECUPERO TRAMITE QUERYSELECTOR LE IMMAGINI
const myImages = document.querySelectorAll('#gallery img');
// AZIONE 1.2 RECUPERO TRAMITE QUERYSELECTOR LE IMMAGINI PER IL THUMBNAIL
const myThumbsImg = document.querySelectorAll('#thumbnail img');

// AZIONE 2 CREO UNA VARIABILE D'APPOGGIO CHE VALUTI LA POSIZIONE ATTUALE
let currentActiveIndex = 0;

// AZIONE 3 TRAMITE CLASSLIST.ADD AGGIUNGO ACTIVE ALLA MIA PRIMA IMMAGINE
myImages[currentActiveIndex].classList.add('active');
myThumbsImg[0].classList.remove('opacity-50');

/* MILESTONE 3

Al click dell'utente sulle frecce, l'immagine attiva cambia e diventa visibile nello slider, prendendo il posto della precedente. */

// AZIONE 4 RECUPERO I BOTTONI DALL'HTML
const btnNext = document.getElementById('next');
const btnPrev = document.getElementById('previous');
const titleEl = document.getElementById('title')
const descriptionEl = document.getElementById('description')

// AZIONE 5 EVENT LISTNER BOTTONE NEXT
btnNext.addEventListener('click', nextImage);


const button = document.getElementById('button');


// AZIONE 6 EVENT LISTNER BOTTONE PREVIOUS
btnPrev.addEventListener('click', function () {
    myImages[currentActiveIndex].classList.remove('active');
    myThumbsImg[currentActiveIndex].classList.remove('scale');
    myThumbsImg[currentActiveIndex].classList.add('opacity-50');
    // DECREMENTO L'INDICE DI 1
    currentActiveIndex--;
    // CONTROLLA SE L'INDICE NON SIA MINORE DI 0 (IN QUESTO MODO NON ASSUME VALORI NEGATIVI)
    if (currentActiveIndex < 0) {
        // SE E' MINORE DI 0 LO REIMPOSTO ALL' ULTIMO ELEMENTO DELL'ARRAY
        currentActiveIndex = images.length - 1;
    }
    updateText(images[currentActiveIndex].title, images[currentActiveIndex].description);
    myImages[currentActiveIndex].classList.add('active');
    myThumbsImg[currentActiveIndex].classList.add('scale');
    myThumbsImg[currentActiveIndex].classList.remove('opacity-50');
});

updateText(images[currentActiveIndex].title, images[currentActiveIndex].description);

function updateText(title, description) {
    titleEl.innerText = title;
    descriptionEl.innerText = description;
}

let isPlaying = true;
let leftToRight = true;
const pauseButton = document.getElementById('button');

let interval = setInterval(nextImage, 3000)

button.addEventListener('click', () => {
    if (isPlaying) {
        clearInterval(interval)
        button.innerHTML = 'Resume'
    } else{
        button.innerHTML = 'Pause'    
        interval = setInterval(nextImage, 3000)
    }
    isPlaying = !isPlaying;
})


function nextImage() {

    // RIMUOVO LA CLASSE ACTIVE
    myImages[currentActiveIndex].classList.remove('active');
    //RIMUOVO LA CLASSE SCALE
    myThumbsImg[currentActiveIndex].classList.remove('scale');
    //AGGIUNGO LA CLASSE OPACITY
    myThumbsImg[currentActiveIndex].classList.add('opacity-50');
    // AUMENTA L'INDICE DI 1
    currentActiveIndex++;

    // CONTROLLA SE L'INDICE E' MAGGIORE DELLA LUNGEZZA DELL'ARRAY PERCHE' NON DEVE SUPERARE L'ULTIMO ELEMENTO
    if (currentActiveIndex > images.length - 1) {
        // SE E' MAGGIORE LO REIMPOSTO AL PRIMO ELEMENTO DELL'ARRAY
        currentActiveIndex = 0;
    }

    updateText(images[currentActiveIndex].title, images[currentActiveIndex].description);
    //ALL'IMMAGINE SUCCESSIVA APPLICO (PERCHE' HO AUMENTATO L'INDICE DI 1)    
    myImages[currentActiveIndex].classList.add('active');
    myThumbsImg[currentActiveIndex].classList.add('scale');
    myThumbsImg[currentActiveIndex].classList.remove('opacity-50');
}

//clickable thumbnails


myThumbsImg.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
        myImages[currentActiveIndex].classList.remove('active');
        myThumbsImg[currentActiveIndex].classList.remove('active');
        currentActiveIndex = i;

        myImages[currentActiveIndex].classList.add('active');
        myThumbsImg[currentActiveIndex].classList.add('active');

    })
})

