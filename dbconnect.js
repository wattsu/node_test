var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer();
server.on('request', function(req, res) {
　const mysql = require('mysql');
 
　// DB接続config
　const connection = mysql.createConnection({
  　host : 'localhost',
  　user : 'root',
  　password : '',
  　database: 'ec'
　});

　connection.connect();
　var body = new Array();
 
　// テーブルデータ取得
　connection.query('SELECT * from m_items;', function (err, rows, fields) {
  　if (err) {
    　console.log('err: ' + err);
	}

  　i = 0;
  　sum = 0;
  　req.setEncoding('utf8');
  　while(i < rows.length) {
    　body[i] = rows[i].item_name;
    　sum = (sum+rows[i])|0;
    　i=(i+1)|0;
　	}
  　console.log(body);
  　var data = new Array();
  　data.items = body;
  　var template = fs.readFileSync('./dbconnect.ejs', 'utf-8');
  　var page = ejs.render(template, data);
  　res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
  　res.write(page);
  　res.end();
　});

　connection.end();
});
server.listen(port, hostname, function() {
    console.log(`Server runnning at http://${hostname}:${port}/`);
});