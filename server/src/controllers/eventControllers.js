const FlakeId = require('flake-idgen');
const intformat = require('biguint-format');
const db = require('../config/db');
const { events } = require('../models/schema');
const { eq } = require('drizzle-orm');

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

const getEvent = async (req, res) => {

  const eventId = req.params.id
  try{
    const [ event ] = await db
    .select()
    .from(events)
    .where(eq(events.id, eventId));

    if( !event ){
      return res.status(404).json({ message: '找不到活動'})
    }
    return res.status(200).json(stringifyBigInts(event));
  }catch(err){
    console.log(err)
    
    return res.status(500).json({ message: '伺服器錯誤' });
  }
}

function stringifyBigInts(obj) {
  return JSON.parse(JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
}

const updateEvent = async( req, res) => {
  const eventId = req.params.id

  try{
    const [ event ] = await db
    .select()
    .from(events)
    .where(eq(events.id, eventId));

    if( !event ){
      return res.status(404).json({ message: '找不到活動'})
    }

    const updatedData = {
      name: req.body.name,
      barName: req.body.barName,
      location: req.body.location,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      maxPeople: req.body.maxPeople,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      hostUser: req.body.hostUser,
      modifyAt: new Date()
    };
    
    await db
    .update(events)
    .set(updatedData)
    .where((eq(events.id, eventId)));

    res.status(200).json({
      message: '活動已更新',
      update: updatedData
    });
  }catch(err){
    console.log(`更新活動發生錯誤:${err}`)
    res.status(500).json({ message: '伺服器錯誤'})

  }
}

module.exports = { createEvent, getEvent, updateEvent };