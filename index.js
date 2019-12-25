'use strict';

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient

const client = new MongoClient(process.env.DB_HOST, { useNewUrlParser: true });

connectMongoDB() = { 
   return client.connect(err => {
      const collection = client.db(process.env.DB_DATABASE).collection(process.env.DB_DEVICE)
      client.close();
    });
}

const getMatcha = (req, res) => {
  return connectMongoDB()
    .then(
      db => db.db(process.env.DB_DATABASE)
        .find({shortcode:res.params.code})
        .toArray()
        .then(data => ({db, data}))
    )
    .then(({db, data}) => {
      db.close()
      return data
    })
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.toString()))
}
const listMatcha = (req, res) => {
  return connectMongoDB()
    .then(
      db => db.db(process.env.DB_DATABASE)
        .find({}).limit(10).skip(0)
        .toArray()
        .then(data => ({db, data}))
    )
    .then(({db, data}) => {
      db.close()
      return data
    })
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.toString()))
}

// const createContact = (req, res) => {
//   return connectMongoDB()
//     .then(
//       db => db.collection('contacts').insertOne(req.body)
//         .then(result => db)
//     )
//     .then(db => db.close())
//     .then(() => res.json({result: 'ok'}))
//     .catch(err => res.status(400).send(err.toString()))
// }

exports.matcha = (req, res) => {
  switch (req.method) {
    case 'GET':
      if(req.params.code){
        getMatcha(req, res)
      }else{
        listMatcha(req, res)
      }
      break;
    case 'PUT':
      res.status(403).send('Forbidden!');
      break;
    case 'POST':
      res.status(403).send('Forbidden!');
      break;
    case 'DELETE':
      res.status(403).send('Forbidden!');
      break;    
    default:
      res.status(405).send({error: 'Something blew up!'});
      break;
  }
};


exports.test = (req, res) => {
  res.status(200).send('Hello World!?');
};

