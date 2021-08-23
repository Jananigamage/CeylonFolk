const express = require("express");
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
const db = require('./models');

//view engine setup
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//static folder
// app.use('/public',express.static(path.join(_dirname,'public')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

const contactusRouter = require('./routes/Contactus');
app.use("/contact", contactusRouter);

const inventoryRouter = require('./routes/Inventory');
app.use("/invent",inventoryRouter);

const wishlistRouter = require('./routes/Wishlist');
app.use("/wishlist", wishlistRouter);

const collectionRouter = require("./routes/Collections");
app.use("/collect", collectionRouter);

const productDetailsRouter = require('./routes/ProductDetails');
app.use("/ProductDetails", productDetailsRouter);

 const couponRouter = require('./routes/Coupons');
 app.use("/coupons", couponRouter);

const checkoutRouter = require('./routes/Checkout');
app.use("/check", checkoutRouter);

const shopRouter = require('./routes/Shop');
app.use("/shop", shopRouter);

const inventorySearchRouter = require("./routes/Inventory.route");
app.use("/inventSearch", inventorySearchRouter);

const ordersRouter = require('./routes/Orders');
app.use("/placeOrder", ordersRouter);

const userManageRouter = require('./routes/UserManage');
app.use("/users", userManageRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

