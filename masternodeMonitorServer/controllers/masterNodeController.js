'use strict';

var exec = require('child_process').exec;
var request = require('request');


exports.getStatus = function(req, res) {
	function puts(error, stdout, stderr) { 
		res.json({
			status: stdout
			});
	}
	exec("dir", puts);
};

exports.getBalance = function(req, res) {
	if (req.params.type == 'ARC') {
		request('http://explorer.arcticcoin.org/ext/getbalance/' + req.params.address, function (error, response, body) {
		  res.json({
			  balance: body
		  });
		});
	} else if (req.params.type == 'CRAVE') {
		request('http://cryptobe.com/chain/Crave/q/addressbalance/' + req.params.address, function (error, response, body) {
		  res.json({
			  balance: body
		  });
		});
	} else if (req.params.type == 'CHC') {
		request('http://104.238.153.140:3001/ext/getbalance/' + req.params.address, function (error, response, body) {
		  res.json({
			  balance: body
		  });
		});
	} else {
		res.json({
			balance: 0
		});
		
	}		
  
};

