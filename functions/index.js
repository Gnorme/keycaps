const fs = require('fs');
exports.keyboard = (req, res) => {
    res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //respond to CORS preflight requests
	var boardType = req.query.board
	var keyboard = {}
	fs.readFile(__dirname+'/'+boardType+'.json','utf-8', (err, jData) => {
		if (err) {
			console.log(err)
		} else {
			try { 
				keyboard = JSON.parse(jData);
				if (req.query.sides) {
					fs.readFile(__dirname+'/'+'sides.json','utf-8', (err, jData) => {
						if (err) {
							console.log(err)
						} else {
							try { 
								keyboard.sides = JSON.parse(jData);
								res.send(keyboard)
							} catch(e) {
								console.log(e);
							}			
						}
					})		
				} else {
					res.send(keyboard)
				}				
				console.log("sent")
			} catch(e) {
				console.log(e);
			}			
		}
	})
}