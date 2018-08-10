var mongoose 	= require('mongoose');
var crypto    = require('crypto');
var Schema	= mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	
	lastName:String,
	
	email:{
		type:String,
		index: true,
		match:/.+\@.+\..+/
	},
	
	username:{
		type:String,
		trim:true,//example of simple modifiers.
		unique: true,//this is the index.
		required: 'User Name is Required'
	},
	password:{
		type:String,
		validate: [function(password){
			return password.length >=6;
		}, 'Password should be longer or equal 6']
	},
	
	salt:{
		type: String
	},
	
	created:{
		type: Date,
		default: Date.now
	},
	
	provider:{//this will indicate the strategy that we use.
		type: String,
		required: 'Provider is required'
	},
	
	providerId: String,//this is the userId that will saved to the session
	
	providerData:{},//used to store the user object retrieved from OAuth providers.
	
	role:{
		type: String,
		enum:['Admin', 'Owner', 'User']
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

//handle the hashing of the user password.
//first it creates autogenerated pseudo-random hashing salt
//and then it replaces the current user password with hashed password using the hashPassword intsance method.
UserSchema.pre('save', function(next){
	console.log('');
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	
	next();
});

UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
	var _this = this;
	var possibleUsername = username + (suffix|| '');
	
	_this.findOne({
		username: possibleUsername
	}, function(err, user){
		if(!err){
			if(!user){
				callback(possibleUsername);
			}else{
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		}else{
			callback(null);
		}
	});
};

//for better performance in Mongoose.
/*
You simply changed the setter modifier to a getter modifier by changing the set property to get . But the important thing to notice here is how you configured your schema using UserSchema.set() . This will force Mongoose to include getters when converting the MongoDB document to a JSON representation and will allow the output of documents using res.json() to include the getter's behavior. If you didn't include this, you would have your document's JSON representation ignoring the getter modifiers.
*/
UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.statics.findOneByUsername=function(username, callback){
	this.findOne({username: new RegExp(username, 'i')}, callback);
}

//here we define the model that we want to use to save user data.
//the first parameter is the name of schema.
//the second parameter is the structure of the schema.
mongoose.model('User', UserSchema);

console.log("User Schema Model Created Successfully");
			/*--------------------------------------------------*/

