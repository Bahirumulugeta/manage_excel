// File used to start the server or ignite the server

// Http
import http from 'http'

// App
import app  from './app';

// DB Connection
import sequelize from '../utils/db';

// Igniter function
export default () => {
  sequelize
    .sync()
    .then(() => {
      console.log(`DB connection sucessfuly.`);
    })
    .catch((err:any) => console.log(`Error has occured in database connection`,err));
  // Server
  const server = http.createServer(app);

  // Port
  const port = (process.env.PORT as unknown as number) || 4000;

  // Listen
  server.listen(port, () => {
    console.log(`Listening on ${port}...`);
  });
  setTimeout(() => {
    try {
      // habesha_INIT();
    } catch (err) {
      console.log(err);
    }
  }, 3000);
  // Majestic Close
  process.on("SIGINT", () => {
    server.close(() => {
      console.log(`App is closing`);
    });
  });
};

