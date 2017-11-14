module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Item',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return model;
};
