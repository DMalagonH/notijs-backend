var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticeSchema = new Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	datetime: { type: Date, default: Date.now },
	img: { type: String, default: null },
	url: { type: String, default: null },
	user_id: { type: String, required: true },
	read: { type: Boolean, default: false }
});

NoticeSchema.set("toJSON", {
	transform: function(doc, ret, options){
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

var model = mongoose.model("notice", NoticeSchema);

module.exports = model;