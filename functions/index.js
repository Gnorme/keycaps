const fs = require('fs');
exports.keyboard = (req, res) => {
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