- settings routes

  - [x] set account theme
  - [ ] set account language
  - [ ] load settings

- user registration

  - [ ] send user browser language along with platform in register

- auth

  - [x] admin accounts
  - [x] roles/permission
  - [ ] move auth to passport.js
    - [ ] google oauth
    - [ ] facebook oauth
    - [ ] twitter oauth
    - [x] github oauth
  - [ ] create neo-expensive oauth routes like the current github implementation, maybe make it a different api and deploy together to api in heroku, just like the `old` folder

- oauth

  - [ ] add functionality to create oauth apps in neo-expensive developer platform, just like github does it -[ ] give the user an appId and appSecret

- web

  - [ ] broadcast user logout to all window tabs
  - [ ] use react query in context to better check for auth updates
  - [ ] give a user choice between using cookies or not
  - [ ] page to show users what information we hold of him
  - [ ] page for user to delete his cookies or localStorage
  - [ ] verify if the session being deleted is the same session in the cookies, if so, warn the user and then if confirmed log user out
  - [ ] create dashboard in a completely different app

- github actions
  - [ ] build services after push to main branch in different jobs to optimize time then deploy to heroku
  - [ ] in production use heroku awake to keep heroku server running
