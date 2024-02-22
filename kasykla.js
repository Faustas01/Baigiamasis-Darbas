let energy = 100;
let money = 0;
let inventory = [];
let minedGoldData = [];


function updateDisplay() {
    const energyInfo = document.getElementById('energy-info');
    energyInfo.innerText = `Energy: ${energy}`;

    const energyBar = document.getElementById('energy-progress');
    const energyPercentage = (energy / 100) * 100;
    energyBar.style.width = `${energyPercentage}%`;

    const goldInventory = document.getElementById('gold-inventory');
    goldInventory.innerText = `Gold Inventory: ${inventory.join(', ')}`;
    updateEnergyOnServer();
}


function updateEnergyOnServer() {
    fetch('http://localhost:3000/Player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ energy, money }), 
    });
}
function retrieveEnergyFromServer() {
    fetch('http://localhost:3000/Player')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
}

retrieveEnergyFromServer();

// Mine Gold mygtukas ir funkcionalumas
function mineGold() {
    if (energy <= 0) {
        alert("You don't have enough energy to mine gold!");
        return;
    }

    const energyCost = Math.floor(Math.random() * 10) + 1; 
    const goldWeight = (Math.random() * 0.9) + 0.1; 
    energy -= energyCost;
    inventory.push(`${goldWeight.toFixed(2)}g`);
    
    minedGoldData.push({ id: String(Number(new Date())), weight: goldWeight.toFixed(2) });
    updateDisplay();
    postDataToServer({ id: String(Number(new Date())), weight: goldWeight.toFixed(2)});
}
// Energijos Regen
setInterval(function() {
    if (energy < 100) {
        energy++;
        updateDisplay();
    }
}, 60000);

document.getElementById('mine-gold').addEventListener('click', mineGold);

updateDisplay();

// Datos Postinimas jsonui

function postDataToServer({id, energy, money, weight}) {
    
    const playerEndpoint = 'http://localhost:3000/Player';
    const inventoryEndpoint = 'http://localhost:3000/Inventory';

    const playerData = {
        id: id,
        energy: energy,
        money: money
    };

    const inventoryData = {
        id: id,
        weight: weight
    };

    fetch(playerEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });

    fetch(inventoryEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })}
 


const sekcija = document.querySelector('#inventory');
fetch('http://localhost:3000/Inventory')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(element => {
            let goldSpan = document.createElement('div');
            goldSpan.textContent = element.weight + 'g.';
            sekcija.appendChild(goldSpan);

        });
    })
