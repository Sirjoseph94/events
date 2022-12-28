import { Request, Response } from "express";
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(_req: Request, res: Response) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
