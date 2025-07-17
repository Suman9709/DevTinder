# Dev Tinder API

## auth router
- POST /signup
- POST /login
- POST /logout


## profile router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password  //forget password api

## connection request router
  status: ignored, interested, accepted, rejected
<!-- - POST /request/send/interested/:toUserId   --right swip  -->
- POST /request/send/:status/:toUserId   --right swip  dynamic status 
<!-- - POST /request/send/ignored/:userId   -- left swip -->

- POST /request/review/accepted/:requestId
<!-- make the api same for both -->
- POST /request/review/rejected/:requestId

## user router
- GET /user/connections
- Get /user/request/received
- GET /user/feed  -gets tou the profile of other user of the plateform


