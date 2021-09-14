const router = require("express").Router();
const bcrypt = require('bcryptjs');
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const User = require("../users/users-model")

router.post("/register", validateRoleName,async (req, res, next) => {
  /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */
 try{
  const hash = bcrypt.hashSync(req.body.password, 8)
  const newUser = await User.add({
    username: req.body.username, 
    password: hash, 
    role_name: req.body.role_name
  })
  res.status(201)(newUser)
 }catch (err){
   next(err)
 }

});


router.post("/login", checkUsernameExists, (req, res, next) => {
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */



});

module.exports = router;
