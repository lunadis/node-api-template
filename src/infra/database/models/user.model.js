module.exports = (sequelize, DataTypes) => {
  const modelName = 'users';
  const users = sequelize.define(modelName, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  return {
    modelName,
    defineModel: function () {
      return users;
    },
  };
};
