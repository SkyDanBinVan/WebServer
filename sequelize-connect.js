const Sequelize = require('sequelize');
const {restaurantModel, menuModel, menuItemModel} = require('./models/models');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

const Restaurant = sequelize.define('Restaurant', restaurantModel);
const Menu = sequelize.define('Menu', menuModel);
const MenuItem = sequelize.define('MenuItem', menuItemModel);


Menu.belongsTo(Restaurant);
MenuItem.belongsTo(Menu);
Restaurant.hasMany(Menu);
Menu.hasMany(MenuItem);

module.exports = { sequelize, Restaurant, Menu, MenuItem };