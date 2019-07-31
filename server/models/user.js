const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://mevn:xxxxxx00@ds143342.mlab.com:43342/mevn-todo',{ useNewUrlParser: true });
var db = mongoose.connection;



const UserSchema = mongoose.Schema({
   name:{
       type: String,
       required: true
   } ,
    password :{
        type: String,
        required:true,
        bcrypt:true
    },
    email:{
       type: String,
       index:true
    },
    todos:{
      type: Object, default: []
    }
});
var User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function (id,callback) {
    User.findById(id,callback);
}
module.exports.getUserByEmail = function (email,callback) {
    var query = {email: email};
    User.findOne(query,callback);
}


module.exports.comparePassword = function (candidatePassword,hash,callback) {
    bcrypt.compare(candidatePassword,hash,function (err,isMatch) {
        if(err) return callback(err);
        callback(null,isMatch);
    });
}

module.exports.createUser = function (newUser,callback) {
    bcrypt.hash(newUser.password,10,function (err,hash) {
        if(err) throw err;
        //set hashed pass
        newUser.password = hash;
        //create a new user
        newUser.save(callback);
    });
}