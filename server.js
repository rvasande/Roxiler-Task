const connectDB = require("./config/db");

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception shutting down.....');
  console.log(`${err.name} = ${err.message}`);
  process.exit(1);
});

connectDB();

const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
