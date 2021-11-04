// get the seq package
const Sequelize = require("sequelize");

// model = outline of the data we'll store against an entity
const restaurantModel = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg : "Cannot be empty"
            }
        }
    },
    imagelink: {
        type: Sequelize.STRING,
        allowNull: false,
    },
};

const menuModel = {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
};

const menuItemModel = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
};

module.exports = { restaurantModel, menuModel, menuItemModel };
