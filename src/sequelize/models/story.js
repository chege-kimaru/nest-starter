'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    category: DataTypes.STRING
  });
  Story.associate = function(models) {
    // associations can be defined here
  };
  return Story;
};
