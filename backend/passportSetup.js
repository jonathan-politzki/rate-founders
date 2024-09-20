const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(done);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: 't3qg5orjXwt58m8Hv0XAPr1Rm',  // Replace with your Twitter consumer key
      consumerSecret: 'PGRfGq8IjcQDcDHczPJ3ipbLGZ2lUXprMsWkpHG4PJUYQqZ9K3',  // Replace with your Twitter consumer secret
      callbackURL: 'http://localhost:5000/auth/twitter/callback',  // Replace with your callback URL
    },
    (token, tokenSecret, profile, done) => {
      User.findOne({ twitterId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({
              twitterId: profile.id,
              username: profile.username,
              displayName: profile.displayName,
              photos: profile.photos.map((photo) => photo.value),
            })
              .save()
              .then((newUser) => done(null, newUser));
          }
        })
        .catch(done);
    }
  )
);