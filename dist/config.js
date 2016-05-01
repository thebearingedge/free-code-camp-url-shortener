'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var client = 'postgresql';

var development = exports.development = {
  client: client,
  connection: {
    user: 'url-shortener',
    password: 'url-shortener',
    database: 'url-shortener'
  }
};

var production = exports.production = {
  client: client,
  connection: process.env.DATABASE_URL,
  ssl: true
};