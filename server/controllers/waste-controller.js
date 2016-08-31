var Waste = require('../datasets/wastes');
module.exports.postWaste = function (req, res){
    var waste = new Waste(req.body);
    waste.save();
    
    Waste.find({})
        .sort({date: -1}).exec(function(err, allWastes){
        if (err){
            res.error(err);
        } else {
            res.json(allWastes);
        }
    });
}

module.exports.getWastes = function (req, res){
	//console.log(req.body);
    if (!req.body.following){
        //console.log("returning all wastes");
	Waste.find({})
          .sort({date: -1})
          .exec(function(err, allWastes){
        if (err){
            res.error(err)
        } else {
            res.json(allWastes);
        }
    })
 } else {
    //console.log("returning user wastes");
	 var requestedWastes = [];
	 for (var i = 0, len = req.body.following.length; i < len; i++){
	 	requestedWastes.push({userId: req.body.following[i].userId});
	 }
     //console.log(requestedWastes);
     //console.log("space");
 	Waste.find({$or: requestedWastes})
		.sort({date: -1})
		.exec(function(err, allWastes){
						if (err){
							res.error(err)
						} else {
							res.json(allWastes);
						}
						})
 };
}

module.exports.getUserWastes = function(req,res){
    Waste.find({ userId: req.params.id })
          .sort({date: -1})
          .exec(function(err, allWastes){
        if (err){
            res.error(err)
        } else {
            res.json(allWastes);
        }
    })
}