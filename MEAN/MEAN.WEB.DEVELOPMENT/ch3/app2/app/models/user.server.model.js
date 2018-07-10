var mongoose 	= require('mongoose');
var Schema	= mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName:String,
	email:String,
	username:String,
	password:String
});

//here we define the model that we want to use to save user data.
//the first parameter is the name of schema.
//the second parameter is the structure of the schema.
mongoose.model('User', UserSchema);

console.log("User Schema Model Created Successfully");
