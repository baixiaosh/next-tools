const Sequelize = require('sequelize');

const sequelize = new Sequelize('NEXT-Tool', 'admin', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return this.getDataValue('createAt');
        },
        set(createAt) {
            return this.setDataValue('createAt', createAt);
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return this.getDataValue('updatedAt');
        },
        set(updatedAt) {
            return this.setDataValue('updatedAt', updatedAt);
        }
    }
});

exports.User = User;
