let pelaajat = [];
let nykyinenPelaajaIndex = 0;
let kierrosPisteet = 0;
let pelitavoite = 100;

function aloitus() {
    let pelaajienMaara = prompt("Kuinka monta pelaajaa?");
    while (isNaN(pelaajienMaara) || pelaajienMaara < 2) {
        pelaajienMaara = prompt("Anna vähintään 2 pelaajaa.");
    }

    for (let i = 0; i < pelaajienMaara; i++) {
        let pelaajanNimi = prompt("Anna pelaajan " + (i + 1) + " nimi:");
        pelaajat.push({ nimi: pelaajanNimi, pisteet: 0 });
    }

    paivitaPelaajaTiedot();
    naytaNykyinenPelaaja();
}

function paivitaPelaajaTiedot() {
    let pelaajaInfoDiv = document.getElementById('player-info');
    pelaajaInfoDiv.innerHTML = "<h2>Pelaajat:</h2>";
    pelaajat.forEach((pelaaja, index) => {
        pelaajaInfoDiv.innerHTML += `<p>${pelaaja.nimi}: ${pelaaja.pisteet} pistettä</p>`;
    });
}

function naytaNykyinenPelaaja() {
    let pelaajaInfoDiv = document.getElementById('player-info');
    pelaajaInfoDiv.innerHTML += `<h3>Vuorossa: ${pelaajat[nykyinenPelaajaIndex].nimi}</h3>`;
}

document.getElementById('roll-dice-btn').addEventListener('click', function() {
    let nopanHeitto = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-img').src = `nopat/dice${nopanHeitto}.png`;

    let statusDiv = document.getElementById('score-board');
    
    if (nopanHeitto === 1) {
        kierrosPisteet = 0;
        statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} heitti ykkösen. Vuoro siirtyy.`;
        seuraavaPelaaja();
    } else {
        kierrosPisteet += nopanHeitto;
        statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} heitti ${nopanHeitto}. Kierroksen pisteet: ${kierrosPisteet}`;
    }
});

document.getElementById('end-turn-btn').addEventListener('click', function() {
    pelaajat[nykyinenPelaajaIndex].pisteet += kierrosPisteet;
    kierrosPisteet = 0;

    let statusDiv = document.getElementById('score-board');

    if (pelaajat[nykyinenPelaajaIndex].pisteet >= pelitavoite) {
        statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} voitti pelin ${pelaajat[nykyinenPelaajaIndex].pisteet} pisteellä!`;
        return;
    }

    statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} lopetti vuoron. Vuoro siirtyy.`;
    seuraavaPelaaja();
});

function seuraavaPelaaja() {
    paivitaPelaajaTiedot();
    nykyinenPelaajaIndex = (nykyinenPelaajaIndex + 1) % pelaajat.length;
    naytaNykyinenPelaaja();
    kierrosPisteet = 0;
}
