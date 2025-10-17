const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const adapter = new JSONFile(path.join(__dirname, '..', '..', 'data', 'db.json'));
const db = new Low(adapter);
async function read(){ await db.read(); db.data = db.data || { users: [], videos: [] }; }
module.exports = { db, read };
