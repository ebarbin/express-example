const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorControllers = require('./controllers/error');

app.use('/admin/', adminRoutes);
app.use('/', shopRoutes);
app.use(errorControllers.get404);

app.listen(3000);