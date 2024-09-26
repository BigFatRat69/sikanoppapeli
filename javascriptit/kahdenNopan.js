let pelaajat = [];
let nykyinenPelaajaIndex = 0;
let kierrosPisteet = 0;
let pelitavoite = 100;
let tuplat = 0;

function aloitus() {
    pelaajat = [];
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
    let nopan1Heitto = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice1-img').src = `nopat/dice${nopan1Heitto}.png`;
    let nopan2Heitto = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice2-img').src = `nopat/dice${nopan2Heitto}.png`;

    let statusDiv = document.getElementById('score-board');
    console.log(nopan1Heitto, nopan2Heitto);
    if (nopan1Heitto === 1 && nopan2Heitto === 1) {
        tuplat += 1;
        kierrosPisteet += 25;
        statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} heitti tupla ykköset. Kierroksen pisteet: ${kierrosPisteet}`;
    }
    else if (nopan1Heitto === 1 || nopan2Heitto === 1) {
        kierrosPisteet = 0;
        statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} heitti ykkösen. Vuoro siirtyy.`;
        seuraavaPelaaja();
        return;
    }
    else if (nopan1Heitto === nopan2Heitto) {
        tuplat += 1;
        kierrosPisteet = (nopan1Heitto + nopan2Heitto) * 2
        statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} heitti tuplat. Kierroksen pisteet: ${kierrosPisteet}`;
        return;
    }

    if (tuplat === 3) {
        statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} kolme tuplaa. Vuoro siirtyy.`;
        seuraavaPelaaja();
    }

    else {
        tuplat = 0;
        kierrosPisteet += nopan1Heitto + nopan2Heitto;
        statusDiv.textContent = `${pelaajat[nykyinenPelaajaIndex].nimi} heitti ${nopan1Heitto} ja ${nopan2Heitto}. Kierroksen pisteet: ${kierrosPisteet}`;
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
