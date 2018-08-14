// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1872380913068281', // your App ID
        'clientSecret'  : '75f9624206ab1052e26fd7f9a214f352', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'emails', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '659437981884-4rj7e6ob8tsgohjmq7fhmjcvt1r9013j.apps.googleusercontent.com',
        'clientSecret'  : 'mjhW-13VaJm4pmt33GM4RNFX',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
