create a repository 
initialize the repository
node module, package.json, package-lock.josn
install express
create server
listen to a port
write request handler for  /test
install nodemon and update script inside package.json
what is the use of -g while installing nodemon
what is difference between caret and tilda (^ vs ~)

play with routes and order of the routes like /, /hello, /test/2, 
explore routing and use 0f ? + * () in the routes
use of regex in the routes
multiple routes handler - play with them
next() use
next function and error along with res.send() change the order of res.send and next
what is middleware
how express js basically handles request behind the scene
difference between app.all and app.use
write a dummy middleware for admin
write dummy auth middleware for all user

create a free cluster on mongoDBatlas
install mongoose
connect your application to the databse
call the connectDB function and connect to databse stating application on the port

create a userSchema and usermodel

js object and json difference
add the express.json middleware to your app
make your signup API to receive data from the end user

experiment for the user.find and user.findOne
create a api where we can use findById, get user by Id

create a delete user id

findOneAndUpdate and findIdAndUpdate difference

data sanitization:- add api validation for each field
install validator
explore validator library and use validator function for password email 

validate data in signup
install bcrypt package
create passwordHash using bcrypt.hash and save the user is encrypted password
create login api
commpare password and throw error if email or password us valid

install cookie-parser
just send a dummy cokkies to user
create Get /profile api and check if you get the cookie back
install jsonwebtoken
in login api after email and password validation, create a JWT token and send it to user in cookie
read the cookies inside your profile api and find the logged in user

userAuth middleware
add the userauth middleware in profile api and newsencconnection api
set the expiry jwt token and cookies to 7 days

create a UserSchema methods to getJWT()

create userSchema methods to comparepassword(passwordInputByUser)

explore tinder api
create a list all api you can thinkof in dev tinder
group multiple routes under respective router
read documentatio for express.Router
create routes folder for managinf different routes
import those routes in app.js 



# Real time cat using websocket
 - Build the ui for a chat window on /chat/:targetUserId
 - setup socket.io
 - 
 - import http
 - create server
 - socket
 - io
