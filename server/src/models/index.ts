import { DataTypes } from 'sequelize';
import sequelize from '../utils/db';

// Pre test - model of excel data
const DataModel = sequelize.define('DataModel', {
    item_number: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,

    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    qty: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'data',
});

export default DataModel;
