const express = require('express')
const Router = express.Router()
const { Menu, MenuItem } = require('../sequelize-connect')
// Get All Menus

Router.get('/', async (req, res) => {
    try {
        const menus = await Menu.findAll();

        res.status(200).send(menus);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Get One Menu

.get('/:id', async (req, res) => {
    try {
        const menu = await Menu.findOne({where: {id: req.params.id}});

        res.status(200).send(menu);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Update Menu

.put('/:id', async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);

        await menu.update(req.body)
        await menu.save()
        await menu.reload()

        res.status(200).send(menu);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Delete Menu

.delete('/:id', async (req, res) => {
    try {
        const menu = await Menu.destroy({where: {
            id : req.params.id
            }
        });

        res.status(200).send(`Menu id: ${req.params.id} deleted`);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

// Post Menu Item

.post('/:menu_id/menuitems', async (req, res) => {
    try {
        const menu = await Menu.findOne({where: {id: req.params.menu_id}})
        const menuItem = await MenuItem.create(req.body);

        await menu.addMenuItem(menuItem)
        await menuItem.reload()

        res.status(201).send(menuItem);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

// module.exports = Router;