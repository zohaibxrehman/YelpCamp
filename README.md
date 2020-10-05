## YelpCamp

YelpCamp is a website which offers crowdsourced reviews for campgrounds. Sellers can advertise new campgrounds with photos and Google Map locations and users can review the camps.

![](https://github.com/zohaibxrehman/YelpCamp/blob/master/readmegif.gif?raw=true)

This project was created using Node.js, Express, MongoDB, EJS and Bootstrap.
Passport.js has been used to handle authentication.
Google Maps API has been used for Geocoding and displaying maps.
Connect flash has been used to flash messages to enhance the user experience with various activity feedback.

For a complete list of dependencies, check out the package.json file.


<img src='https://i.imgur.com/cqDUFN0.png' height=500 />  
<img src='https://i.imgur.com/3ipsldo.png' height=500 />

## Features

### Authentication

User login and sign up with username and password using Passport.js.

### Encrypted Password

All users' passwords are stored with encryption powered by Passport.js.

### Authorization

Managing posts is only allowed to the OP(Original Poster).

Editing or deleting posts and comments is only allowed to the OP.

### Campground and Comment CRUD (Create, Read, Update, Destroy)

Create, edit and delete posts and comments implemented with **RESTful routing.**

Upload campground photos.

Display campground location on Google Maps.

### Responsive web design

The website has been designed to scale correctly on all display sizes; mobile, tablet and PC.

## Cloning and Running the Application in local

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs


### Install dependencies and run

Clone the project onto your local machine.

Install all the npm packages. Go into the project folder and install all npm packages:

```bash
npm install
```

To run the application:

```bash
npm start
```

The application runs on **localhost:3000** on your local machine.
