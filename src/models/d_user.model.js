import { DataTypes, Sequelize } from 'sequelize';
export default (sequelize) => {
    sequelize.define('d_users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // Ensures email is unique
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT, // Assuming weight can be a decimal number
            allowNull: true
        },
        height: {
            type: DataTypes.FLOAT, // Assuming height can be a decimal number
            allowNull: true
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, // Default value is 1
            validate: {
                isIn: [[0, 1]] // Only allow 0 or 1 as values
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        freezeTableName: true,
        timestamps: true, // Automatically manage createdAt and updatedAt fields
        createdAt: 'created_at', // Customize the name of the createdAt field
        updatedAt: 'updated_at' // Customize the name of the updatedAt field
    });
};