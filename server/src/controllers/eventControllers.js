const FlakeId = require('flake-idgen');
const intformat = require('biguint-format');
const db = require('../drizzle/drizzle');
const { events } = require('../models/schema');

const flake = new FlakeId({ id: 1 });

const createEvent = async (req, res) => {
  const id = intformat(flake.next(), 'dec');
  const now = new Date();

  const newEvent = {
    id,
    name: req.body.name,
    barName: req.body.barName,
    location: req.body.location,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    maxPeople: req.body.maxPeople,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    hostUser: req.body.hostUser,
    createdAt: now,
    modifyAt: now,
  };

  console.log('startDate:', req.body.startDate, typeof req.body.startDate);
  console.log('startDate as Date:', new Date(req.body.startDate));
  
  try {
    await db.insert(events).values(newEvent);
    res.status(201).json({ message: '活動已建立', event: newEvent });
  } catch (err) {
    console.error('建立活動時發生錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

module.exports = { createEvent };