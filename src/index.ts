"use strict";

import express from 'express';
import dateUtils from 'dayjs';
import { getUserAddressFields, sortAlphabetical } from './utils';
import data from './mockData.json'; // todo: implement db instead of JSON file

const PORT = 1337; // todo: keep this in .env

const VALID_SORT_PARAMS = [
  'created_date',
  'last_name',
  'zip',
  'state'
] as const;
type sortParam = typeof VALID_SORT_PARAMS[number];

const SORT_COMPARATORS = { // optional sort parameters
  created_date: (a: User, b: User): number => new Date(a.created_date).getTime() - new Date(b.created_date).getTime(),
  last_name: (a: User, b: User): number => sortAlphabetical(a.last_name, b.last_name),
  zip: (a: User, b: User): number => getUserAddressFields(a)['zip'] - getUserAddressFields(b)['zip'],
  state: (a: User, b: User): number => sortAlphabetical(
    getUserAddressFields(a)['state'],
    getUserAddressFields(b)['state']
  )
};

const app = express();

app.get('/users', (req, res) => {
  let sortBy: sortParam = req.query.sortBy;
  if (sortBy && !VALID_SORT_PARAMS.includes(sortBy)) {
    res.status(400).send('received invalid sort param');
  }

  // todo: fetch data from db instead of JSON
  // const data = db.get('users').where('deleted_date === null')
  let returnData: Array<User> = data.filter(el => el.deleted_date === null);

  if (sortBy) {
    returnData = returnData.sort(SORT_COMPARATORS[sortBy]);
  }

  res.status(200).json(returnData);
});

app.get('/user/:id', (req, res) => {
  // todo: fetch data from db instead of JSON
  // const data = db.get('users').where('u.id === req.params.id')
  let returnData: User | undefined = data.find(
    u => u.id === parseInt(req.params.id, 10)
  );
  if (returnData) {
    res.json(returnData);
  } else {
    res.status(404).json({msg: 'There is no user matching the provided id'});
  }
});

app.patch('/delete/user/:id', (req, res) => {
  // todo: update record in db instead of JSON
  // db.get('users').where('u.id === req.params.id').update(newData)
  const userIndex: number = data.findIndex(u => u.id === parseInt(req.params.id, 10));

  if (userIndex >= 0 && data[userIndex].deleted_date === null) {
    const deleted_date = dateUtils(new Date()).format('YYYY-MM-DD hh:mm:ss');
    data[userIndex] = Object.assign({}, data[userIndex], { deleted_date });
    res.status(200).json(data[userIndex]);
    return;
  }

  res.status(404).json({msg: 'There is no undeleted user matching the provided id'});
});

app.listen(PORT);

console.log(`Listening on port ${PORT}`);
