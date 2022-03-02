- ~~settings routes~~

  - [x] set account theme
  - [x] set account language
  - [x] load settings

- ~~user registration~~

  - [x] send user browser language along with platform in register

- auth

  - [ ] delete user account
  - [ ] edit user account information
  - [x] login with ID, email, username
  - [x] admin accounts
  - [x] roles/permission
  - [ ] move auth to passport.js
    - [ ] google oauth
    - [ ] facebook oauth
    - [ ] twitter oauth
    - [x] github oauth
  - [ ] ~~create neo-expensive oauth routes like the current github implementation, maybe make it a different api and deploy together to api in heroku, just like the `old` folder~~

- oauth

  - [x] add functionality to create oauth apps in neo-expensive developer platform, just like github does it
  - [x] give the user an appId and appSecret

- web

  - [ ] extract refresh token logic into a hook
  - [ ] ~~broadcast user logout to all window tabs~~
  - [ ] use react query in context to better check for auth updates
  - [x] give a user choice between using cookies or not
  - [x] page to show users what information we hold of him
  - [x] page for user to delete his cookies or localStorage
  - [x] verify if the session being deleted is the same session in the cookies, if so, warn the user and then if confirmed log user out
  - [ ] create dashboard in a completely different app

- github actions
  - [ ] build services after push to main branch in different jobs to optimize time then deploy to heroku
  - [ ] in production use heroku awake to keep heroku server running
