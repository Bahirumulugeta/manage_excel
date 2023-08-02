
// Database connection
import { Sequelize } from 'sequelize';

// Sequelize
const sequelize = new Sequelize({
    database: 'pre_test',
    username: 'root',
    password: "",
    dialect: 'mysql',
});

// Export
export default sequelize;

