const express = require('express')
const Router = express.Router()
const { Restaurant, Menu } = require('../sequelize-connect')
// Get all Restaurants

Router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();

        res.status(200).send(restaurants);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Get one Restaurant

.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({where: {id: req.params.id}});

        res.status(200).send(restaurant);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Post Restaurant

.post('/', async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);

        res.status(201).send(restaurant);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Update Restaurant

.put('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);

        await restaurant.update(req.body)
        await restaurant.save()
        await restaurant.reload()

        res.status(200).send(restaurant);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Delete Restaurant

.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.destroy({where: {
            id : req.params.id
            }
        });

        res.status(200).send(`restaurant id: ${req.params.id} deleted`);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Post Menu

.post('/:rest_id/menus', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({where: {id: req.params.rest_id}})
        const menu = await Menu.create(req.body);

        await restaurant.addMenu(menu)
        await menu.reload()

        res.status(201).send(menu);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})
.get('/:rest_id/menus', async (req, res) => {
    try {
        const restaurantMenus = await Menu.findAll({where: {RestaurantId: req.params.rest_id}})

        res.status(201).send(restaurantMenus);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = Router;