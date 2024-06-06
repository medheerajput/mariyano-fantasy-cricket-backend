// env config
require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');  //reducing the size of the body.
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connection to mongodb
require("./config/dbConfig")

// Clustering for better performance
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Error handling middleware
    app.use(require("./utils/apiErrorMiddleware"));

    // Routes
    app.use('/', require("./routes/apiConfig"));

    // server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}