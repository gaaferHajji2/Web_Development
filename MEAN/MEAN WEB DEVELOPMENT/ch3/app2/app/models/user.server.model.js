var mongoose 	= require('mongoose');
var Schema	= mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName:String,
	email:{
		type:String,
		index: true
	},
	username:{
		type:String,
		trim:true,//example of simple modifiers.
		unique: true//this is the index.
	},
	password:String,
	created:{
		type: Date,
		default: Date.now
	},
	
	website:{
		type:String,
		get: function(url){
			if(!url){
				return url;
			}else{
				/*
				You can of course migrate your existing data, but when dealing with big datasets, it would have a serious performance impact, so you 					can simply use getter modifiers.
				*/
				if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
					url= 'http://'+url;
				}
				
				return url;
			}
		}
	}
});

//use the virtual Attribute
UserSchema.virtual('fullName').get(function(){
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
	var splitName = fullName.split(' ');
	this.firstName= splitName[0] || '';
	this.lastName = splitName[1] || '';
});

//for better performance in Mongoose.
/*
You simply changed the setter modifier to a getter modifier by changing the set property to get . But the important thing to notice here is how you configured your schema using UserSchema.set() . This will force Mongoose to include getters when converting the MongoDB document to a JSON representation and will allow the output of documents using res.json() to include the getter's behavior. If you didn't include this, you would have your document's JSON representation ignoring the getter modifiers.
*/
UserSchema.set('toJSON', {getters: true});

//here we define the model that we want to use to save user data.
//the first parameter is the name of schema.
//the second parameter is the structure of the schema.
mongoose.model('User', UserSchema);

console.log("User Schema Model Created Successfully");
