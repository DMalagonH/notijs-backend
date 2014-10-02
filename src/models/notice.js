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

var model = mongoose.model("notice", NoticeSchema);

module.exports = model;