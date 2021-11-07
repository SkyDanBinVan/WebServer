const { sequelize } = require("./sequelize-connect");
const express = require("express");
const port = 3001;
const app = express();
const  restaurantRoutes  = require('./routes/restaurant')
const  menuRoutes  = require('./routes/menu')
const  menuItemRoutes  = require('./routes/menuItem')
const cors = require("cors")

app.use(cors())
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/menuItems', menuItemRoutes);

async function start() {
    await sequelize.sync({
        logging: false
    });
}

start()
    .then(() => console.log('Sequelize connected'))
    .catch((e) => console.log(`Caught error: ${e}`));

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})