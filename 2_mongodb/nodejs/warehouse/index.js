const DB = "mongodb+srv://<username>:<pw>@<cluster>";


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const item = require('./collections/item');
const user = require('./collections/user');
const order = require('./collections/order');

async function create_user(req, res) {
  if (req.query.name !== undefined && req.query.surname !== undefined) {
    const nuovo_utente = new user({
      name: req.query.name,
      data_cre: new Date(),
      surname: req.query.surname
    });
    await nuovo_utente.save();
    res.send("<p>ok</p>");
  } else {
    res.send("<p>err</p>");
  }
}

async function create_item(req, res) {
  const nuovo_item = new item({
    name: req.query.name,
    data_cre: new Date(),
    price: req.query.price,
    quantity: req.query.quantity
  });
  await nuovo_item.save();
  res.send("<p>ok</p>");
}

async function create_order(req, res) {
  if (req.query.item_name !== undefined &&
    req.query.user_name !== undefined) {
    const selected_user = await user.findOne({ name: req.query.user_name });
    if (selected_user !== null) {
      const selected_item = await item.findOne({ name: req.query.item_name });
      if (selected_item !== null) {
        const id_item = selected_item._id;
        const id_user = selected_user._id;
        const nuovo_ordine = new order({ user_id: id_user, item_id: id_item });
        await nuovo_ordine.save();
        res.send("<p>Ordine inviato</p>");
      } else {
        res.send("<p>Item non trovato</p>");
      }
    } else {
      res.send("<p>Utente non trovato</p>");
    }
  } else {
    res.send("<p>Parametri mancanti: item_name, user_name</p>");
  }
}

function hello(req, res) {
  if (req.query.name !== undefined && req.query.x !== undefined) {
    res.send("<p>" + req.query.x + "!!! Hello " + req.query.name + "</p>");
  } else {
    res.send("<p>Who are you?</p>");
  }
}

async function list_users(req, res) {
  var ris = "";
  const users = await user.find({});
  for (var x = 0; x < users.length; x++) {
    ris = ris + "<p>" + users[x].name + " " + users[x].surname + "</p>";
  }
  res.send(ris);
}

async function list_item(req, res) {
  var ris = "";
  const items = await item.find({});
  for (var x = 0; x < items.length; x++) {
    ris = ris + "<p>" + items[x].name + " " + items[x].price + "</p>";
  }
  res.send(ris);
}

function cb(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Database connected!");
    const server = express()
      .use(cors())
      .use('/hello', hello)
      .use('/create_user', create_user)
      .use('/create_item', create_item)
      .use('/create_order', create_order)
      .use('/list_users', list_users)
      .use('/list_item', list_item)
      .use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST', 'GET, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        return next();
      })
      .listen(4000, async () => {
        console.log(`Listening on 4000`);
      });
  }
}
//DB connection
mongoose.connect(DB, cb);