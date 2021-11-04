const express = require('express')
const Router = express.Router()
const { MenuItem } = require('../sequelize-connect')
// Get All Menu Items

Router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll();

        res.status(200).send(menuItems);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Get One Menu Item

.get('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findOne({where: {id: req.params.id}});

        res.status(200).send(menuItem);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Update Menu Item

.put('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id);

        await menuItem.update(req.body)
        await menuItem.save()
        await menuItem.reload()

        res.status(200).send(menuItem);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Delete Menu Item

.delete('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.destroy({where: {
            id : req.params.id
            }
        });

        res.status(200).send(`Menu item id: ${req.params.id} deleted`);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = Router