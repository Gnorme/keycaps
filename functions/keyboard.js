const fs = require('fs');

exports.handler = async (event, context) => {
	const boardType = event.queryStringParameters.board || "keyboard-104";
	const sides = event.queryStringParameters.sides || false;
	var keyboard = {}
	
	fs.readFile(boardType+'.json','utf-8', (err, jData) => {
		if (err) {
			return {
				statusCode:404,
				body:err
			}
		} else {
			try { 
				keyboard = JSON.parse(jData);
				if (req.query.sides) {
					fs.readFile('sides.json','utf-8', (err, jData) => {
						if (err) {
							return {
								statusCode:404,
								body:err
							}
						} else {
							try { 
								keyboard.sides = JSON.parse(jData);
								return {
									statusCode:200,
									body: keyboard
								}
							} catch(e) {
								return {
									statusCode:404,
									body:err
								}
							}			
						}
					})		
				} else {
					return {
						statusCode:200,
						body: keyboard
					}
				}				
			} catch(e) {
				return {
					statusCode:404,
					body:err
				}				
			}			
		}
	})
};