const express = require('express')
const app = express()
const shakes = require('./data/shakes')
const ingredients = require('./data/ingredients')
const anecdote = require('./data/anecdote')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/anecdote', (req, res) => {
    const anecdote_arr = Object.values(anecdote)[0];
    res.json({
        anecdote: anecdote_arr[Math.floor(Math.random() * anecdote_arr.length) - 1]
    })
})

app.get('/shake/:mood', (req, res) => {
    const {mood} = req.params
    const shakes_arr = Object.values(shakes)[0];
    return res.json({
        cocktailsByMood: shakes_arr[mood][Math.floor(Math.random() * 5)]
    })
})

app.get('/cocktail_by_name/:name', (req, res) => {
    const {name} = req.params
    const alphabet = ['а', 'б', 'в', 'г', '', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я']
    const letters = name.trim().toLocaleLowerCase().split('').map(a => alphabet.indexOf(a)).sort()
    const ingredients_arr = Object.values(ingredients)[0];
    const ingredients_for_shake = letters.map(l => ingredients_arr[l])
    return res.json({
        ingredients_for_shake
    })
})

app.listen(3000, () => {
    console.log(`Север запущений на http://localhost:${3000}`);
    
})
