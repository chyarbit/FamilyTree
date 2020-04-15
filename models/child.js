module.exports = function(sequelize, DataTypes) {
    const Child = sequelize.define("Child", {
    // create a Child model
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

// Creates a column ParentId in the Child table that is linked to the parent table 
Child.associate = function(models){
  Child.belongsTo(models.Parent,{
    foreignKey: {
      allowNull: true
    }
  });
}
return Child;
}