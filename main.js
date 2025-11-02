const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const db = require('./models/index')
const routes = require('./routes/index')
const authMiddleware = require('./middlewares/auth')
const userMiddleware = require('./middlewares/user')
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// JWT Authentication middleware
app.use("/api", authMiddleware.authenticate);
// Load user from token
app.use("/api", userMiddleware.load_user)


routes(app)
const errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  
  res.status(status).json({ error: message });
};
app.use(errorHandler);

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!');
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
