var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "osis"
});

db.connect(err => {
  if (err) throw err;
  console.log("database connected...");
});

router.get("/user", function(req, res, next) {
  let sql = "SELECT id, nama, keterangan, islock, waktu FROM user";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/statKetua/", function(req, res, next) {
  let sql = "CALL `looppemilih`();";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result.slice(0, result.length - 1));
  });
});
router.get("/jumlahKetua", function(req, res, next) {
  let jumlah;
  let sql = "SELECT COUNT(*) AS jumlah FROM ketua";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0].jumlah);
  });
});

router.post("/vote", function(req, res, next) {
  var body = req.body;
  let sql = "CALL updatePemilih(" + body.idUser + "," + body.idKetua + "); ";
  let sql2 = "CALL setLock(" + body.idUser + ");";
  db.query(sql2, (err, result) => {
    if (err) throw err;
  });
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({
      success: true,
      data: result
    });
  });
});

router.post("/auth", function(req, res, next) {
  var body = req.body;
  sql = "CALL auth('" + body.nama + "','" + body.password + "')";
  db.query(sql, (err, result) => {
    if (err) {
      res.json({
        success: false
      });
    }

    res.json({
      success: true,
      panjang: result[0].length,
      data: result[0]
    });
  });
});
router.post("/deauth", function(req, res, next) {
  var body = req.body;
  sql = "CALL deauth('" + body.id + "')";
  db.query(sql, (err, result) => {
    if (err) {
      res.json({
        success: false
      });
    }

    res.json({
      success: true,
      data: result
    });
  });
});
router.post("/getpassword", function(req, res, next) {
  var body = req.body;
  sql = "CALL getpassword('" + body.nama + "','" + body.password + "')";
  db.query(sql, (err, result) => {
    if (err) {
      res.json({
        success: false
      });
    }

    res.json({
      success: true,
      data: result,
      m: sql
    });
  });
});
router.get("/statpemilih", function(req, res, next) {
  let sql = "CALL `getstatPemilih`();";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({
      success: true,
      data: result[0]
    });
  });
});
router.get("/onlinepemilih", function(req, res, next) {
  let sql = "SELECT * FROM `user` WHERE `user`.`isonline` = 1 ";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({
      success: true,
      data: result
    });
  });
});
router.get("/ketua", function(req, res, next) {
  let sql =
    "SELECT `ketua`.`id`, `ketua`.`nama`, `ketua`.`url_photo` AS 'photo', `ketua`.`kelas`, `ketua_data`.`ttl`, `ketua_data`.`eskul`, `ketua_data`.`visi`, `ketua_data`.`misi`, `ketua_data`.`prestasi` FROM `ketua` JOIN `ketua_data` WHERE `ketua_data`.`idketua` = `ketua`.`id`";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({
      success: true,
      data: result
    });
  });
});

module.exports = router;
