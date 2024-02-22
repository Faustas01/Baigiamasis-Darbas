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


const sekcijaShop = document.querySelector('#energy-shop');
fetch('http://localhost:3000/Shop')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(element => {
            let energy = document.createElement('div');
            energy.textContent = element.energy + ' energy';
            let price = document.createElement('div');
            price.textContent = 'price: '+ element.price + '$';
            sekcijaShop.append(energy, price);

        });
    })
    function updateEnergyOnServer() {
        fetch('http://localhost:3000/Player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  money }), 
        });

    }
   
    document.getElementById("sell-gold").addEventListener("click", sellGold);

    function sellGold() {
        fetch('http://localhost:3000/Inventory')
        .then(response => response.json())
        .then(data => {
            const inventory = data;
            let totalGoldWeight = 0;
            inventory.forEach(item => {
                if (item.weight && !isNaN(parseFloat(item.weight))) {
                    totalGoldWeight += parseFloat(item.weight);
                }
            });
            alert("Total gold weight available for sale: " + totalGoldWeight);
        })
        .catch(error => console.error('Error fetching inventory:', error));
    }

    