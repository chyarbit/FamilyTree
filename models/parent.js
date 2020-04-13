module.exports = function(sequelize, DataTypes) {
    const Parent = sequelize.define("Parent", {
    // create a Child model
  parent1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parent2: DataTypes.STRING
})

Parent.associate = function(models){
    Parent.hasMany(models.Child,{
      onDelete: "cascade"
  });
}
return Parent;
}