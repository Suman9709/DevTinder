- create a vite +React application
- remove unnecessary files like app.css,  assest
- install tailwind css
- Add a navbar.jsx components
-  install react-router-dom
- create BrowserRouter ->Router -> Routes
- create a body component for the children components
- 









Body component
    Navbar
    Route = /  =>feed
    Route = /login  =>Login
    Route = /connection  => Connections



- cors error:- when we hit an api from one domain to another domain then this error arise
- cors error is at browser level
- we user cors middleware and give orign and credentials in index.js
- whenever you are making api call pass with {Credentials:true} in axios
- install redux toolkit 
- store consist of slices
- create a store
- create a slice
- create reducer in the slice
- import slice as reducer in store
- add redux dev tools in chrome
- login and see if data is coming properly iin the store
- navbar should update as soon as logsin



deployemt

signup aws
launch instance in ec2
create a key value pair
chmod  400 secket.pem
connect  t0 machine using the 1st cmd and then eg cmd
install node version with the project
git clone the project


# frontEnd
npm run buils a dist folder create


now npm i in ec2
then npm run buils
sudo apt update
sudo apt install nginx
sudo systemctl start nginx  //this will start nginx
sudo systemctl enable nginx  //this will start nginx

copy code from build file to nginx http server to path cd/var/www/html/

now go to frontend folder and copy all dist file using sudo scp -r dist/* /var/www/html  // this will copy recursevily all file
enable port 80 of your instance in security and securitygroup 





# Deploy Backend

    - in backend npm i
    - then npm start

    - to continue runing the server we need to install PM2
    - npm install pm2 -g
    - then run pm2 start npm -- start
    - we have to change ip of the mongodb optional 0.0.0/0 to public ip of aws
    - pm2 list
    - pm2 logs
    - pm2 flush npm||name of the process // this is used to remove logs
    - pm2 stop npm || name of the process
    - pm2 delete npm || name of the process

    - pm2 start npm --name "name of the process" -- start //this will change the name

    - frontEnd  http://3.111.47.221/
    - Backend   http://3.111.47.221:3000/



nginx config-  sudo nano /etc/nginx/sites-available/default

restart nginx- sudo systemctl restart nginx

server name: ipname
//add this inginx to the 
    location /api/ {
    proxy_pass http://localhost:3000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
