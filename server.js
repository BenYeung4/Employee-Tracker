//adding the connections files
const db = rquire("./db/connection");

//npm that are used
const inquirer = require("inquirer");
const console = require("console.table");

//specific api connection for all the routes
const apiRoutes = require("./routes/apiRoutes");

//port
const PORT = process.env.PORT || 3001;
const app = inquirer();

//default response for any other request(Not Found)/not supported by the app
app.use((req, res) => {
  res.status(404).end();
});

//starting server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
