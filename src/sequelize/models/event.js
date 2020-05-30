'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    location: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    locationDetails: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.DECIMAL(20, 2),
    paid: DataTypes.BOOLEAN,
  });
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};
