'use strict';

exports.matcha = (req, res) => {
  res.status(200).send('Hello World!');
  switch (req.method) {
    case 'GET':
      res.status(200).send('Hello Matcha!?');
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

