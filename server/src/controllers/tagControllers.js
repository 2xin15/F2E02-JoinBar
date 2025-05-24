const db = require('../config/db');
const { tags } = require('../models/schema');
const { eq } = require('drizzle-orm');

const createTag = async (req, res) => {
  const newTag = {
    name: req.body.name
  }

  try {
    await db.insert(tags).values(newTag);
    res.status(201).json({ message: '標籤已建立', tag: newTag });
  } catch (err) {
    console.error('建立標籤時發生錯誤:', err);
    return res.status(500).json({ message: '伺服器錯誤' });
  }
};

const getTag = async (req, res) => {

  const tagId = req.params.id
  try{
    const [ tag ] = await db
    .select()
    .from(tags)
    .where(eq(tags.id, tagId));

    if( !tag ){
      return res.status(404).json({ message: '找不到標籤'})
    }
    return res.status(200).json(tag);
  }catch(err){
    console.log(err)
    
    return res.status(500).json({ message: '伺服器錯誤' });
  }
}

// const updateEvent = async( req, res) => {
//   const eventId = req.params.id

//   try{
//     const [ event ] = await db
//     .select()
//     .from(events)
//     .where(eq(events.id, eventId));

//     if( !event ){
//       return res.status(404).json({ message: '找不到活動'})
//     }

//     const updatedData = {
//       name: req.body.name,
//       barName: req.body.barName,
//       location: req.body.location,
//       startDate: new Date(req.body.startDate),
//       endDate: new Date(req.body.endDate),
//       maxPeople: req.body.maxPeople,
//       imageUrl: req.body.imageUrl,
//       price: req.body.price,
//       hostUser: req.body.hostUser,
//       modifyAt: new Date()
//     };
    
//     await db
//     .update(events)
//     .set(updatedData)
//     .where((eq(events.id, eventId)));

//     res.status(200).json({
//       message: '活動已更新',
//       update: updatedData
//     });
//   }catch(err){
//     console.log(`更新活動發生錯誤: ${err}`)
//     return res.status(500).json({ message: '伺服器錯誤'})
//   }
// }

// const softDeleteEvent  = async( req, res) => {
//   const eventId = req.params.id

//   try{
//     const [ event ] = await db
//     .select()
//     .from(events)
//     .where(eq(events.id, eventId));

//     if( !event || event.status == 2 ){
//       return res.status(404).json({ message: '找不到活動或已刪除' })
//     };

//     await db.update(events)
//     .set({ status : 2, modifyAt: new Date() })
//     .where(eq(events.id, eventId));
//     return res.status(200).json({ message: '活動已刪除'})

//   }catch(err){
//     console.log(`無法刪除: ${err}`)
//     return res.status(500).json({ message: '伺服器錯誤'})
//   }
// }

module.exports = { createTag, getTag };