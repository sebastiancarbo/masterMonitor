'use strict';

var exec = require('child_process').exec;
var request = require('request');


exports.getStatus = function(req, res) {
			function parseCraveResponse(error, stdout, stderr) {
                var jsonResult = JSON.parse(stdout);
                var names = Object.keys( jsonResult);
                if (jsonResult && names && jsonResult[names[0]]) {
					var attrs = jsonResult[names[0]].split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
					res.json({
							status: attrs[0],
							protocol: attrs[1],
							pubkey: attrs[2],
							vin: attrs[3],
							lastseen: attrs[4],
							activeseconds: attrs[5]
					});
                } else {
					res.json({
							status: 'ERROR'
					});
                }
        }
		
		function parseChcResponse(error, stdout, stderr) {
                var jsonResult = JSON.parse(stdout);
                var names = Object.keys( jsonResult);
				if (jsonResult && names && jsonResult[names[0]]) {
					var attrs = jsonResult[names[0]].split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
					res.json({
							status: attrs[0],
							protocol: attrs[1],
							pubkey: attrs[2],
							vin: attrs[3],
							lastseen: attrs[4],
							activeseconds: attrs[5],
							ip: names[0].trim()
					});
				} else {
					res.json({
							status: 'ERROR'
					});
                }
        }
		
		function parseArcResponse(error, stdout, stderr) {
                var jsonResult = JSON.parse(stdout);
                var names = Object.keys( jsonResult);
				if (jsonResult && names && jsonResult[names[0]]) {				
					var attrs = jsonResult[names[0]].split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
					res.json({
							status: attrs[0],
							protocol: attrs[1],
							payee: attrs[2],
							lastseen: attrs[3],
							activeseconds: attrs[4],
							lastpaidtime: attrs[5],
							lastpaidblock: attrs[6],
							ip: attrs[7]
					});
									} else {
					res.json({
							status: 'ERROR'
					});
                }

        }



	if (req.params.type === 'CRAVE')
		exec("/home/chc/crave/src/craved masternodelist full " + req.params.address, parseCraveResponse);
	else if (req.params.type === 'CHC')
		exec("/home/chc/chaincoin/src/chaincoin-cli masternodelist full " + req.params.address, parseChcResponse);
	else if (req.params.type === 'ARC')
		exec("/home/chc/arcticcore-0.12.1/bin/arcticcoin-cli goldminenodelist full "  + req.params.address, parseArcResponse);
	else
		res.json(req.params.type + " not found");
	
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

