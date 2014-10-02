var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticeSchema = new Schema({
	title: String,
	body: String,
	datetime: String,
	img: String,
	url: String,
	user_id: Number,
	read: Boolean
});

NoticeSchema.set("toJSON", {
	transform: function(doc, ret, options){
		//ret.id = ret._id;
		//delete ret._id;
		delete ret.__v;
	}
});

var model = mongoose.model("notice", NoticeSchema);

module.exports = model;