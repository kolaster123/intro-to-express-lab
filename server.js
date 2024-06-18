const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('<h1> Hello World!</h1>')
});
// task 1 //
app.get('/greetings/:name', (req, res) => {
  res.send(`Hello there ${req.params.name}!`);
});

//task 2 // 
app.get('/roll/:number', (req,res) => {
    const number = req.params.number;
    if (isNaN(number)) {
        return res.status(400).send('You must specify a number.')
    }
    const MaxNumber = parseInt(number, 18);
    const rollResult = Math.floor(Math.random() * (MaxNumber +1));
    res.send(`you rolled a ${rollResult}!`);
});

//task 3 //
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        res.status(404).send("This item is not yet in stock. Check back soon!");
    } else {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});
//task 4
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;

    if (req.query['min-price']) {
        const minPrice = parseFloat(req.query['min-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }

    if (req.query['max-price']) {
        const maxPrice = parseFloat(req.query['max-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }

    if (req.query.type) {
        const type = req.query.type.toLowerCase();
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type);
    }

    res.json(filteredShoes);
});


app.listen(3000, () => {
    console.log(`Server is running`);
});
