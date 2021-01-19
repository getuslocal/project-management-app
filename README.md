# Simplanner 

#### A large-scale web app aimed to facilitate the workflow of a team collaborating on the same project.
- **Client** built with React, Redux, Styled Components, Webpack, and Babel
- **Server** built with TypeScript, Node.js, Express.js, JSON Web Token, MongoDB and Mongoose
- **Deployed** using Digital Ocean with Docker containers

## Features
- Written in modern React, only functional components with hooks
- CSS-in-JS styling using styled-component library
- A variety of custom light-weight UI components such as datepicker, modal, various form elements etc
- Complex front-end global states management using Redux with Redux Thunk and other helper libraries.
- Custom React environment setup using Webpack and Babel without create-react-app or similar
- API written in TypeScript and using Express.js
- Role Based Access Control to restricts network access based on a user's role within an organization
- Modular and easily scalable code structure
- User authentication and authorization using JSON Web Tokens
- Image file upload developed with Cloudinary API
- Launched using Digital Ocean with the Docker containers and Cloudflare for an extra security layer.

## User Level Features
- Project
  - Create/edit/delete an issue within a project (Story, Task, or Bug)
  - Move an issue within a column or between two columns to change the issue status
  - Create/edit/delete a column on a kanban board
  - Move a column and change the order of columns on a kanban board
  - Search issues by assigned user(s) or summary/title.
  - Create/edit/delete an epic issue (a large body of work with a deadline)
  - Drag an epic element horizontally to change the epic's start date and deadline visually and easily
  - Create an issue on calendar view with a deadline to visually see what needs to be done on the day/week/month.
- User Account
  - Login or logout
  - Register and create a new user account
  - Edit user profile (name, email, profile image, etc)
- Project Management
  - Create a new project, or delete an existing one
  - Edit project properties
  - Manage members of a project
- Admin Settings
  - Alter a member's role (Admin, Project Manager, or Member)
  - View a user's organization info and all the active projects

## What I Learned
- Benefits of using React functional components with hooks
- How to manage complex front-end global states in a large-scale app using Redux with Redux Thunk and other helper libraries.
- How to create more moduler and easily scalable code structure.
- How to set up react environment using Webpack and Babel without create-react-app or similar
- Benefits of using styled-compoenent library instead of Sass or similar
- How to handle user authentication/authorization securely using JSON Web Token.
- How to write TypeScript and benefits of using it
- More knowledge of creating a REST API with Node.js and MongoDB for more complex interactions between front-end and back-end
- How to deploy the app on Digital Ocean with docker containers and Cloudflare

## Setup and Running
- Prerequisites
  - Node
  - MongoDB
- Clone repo `git@github.com:takkuyu/project-management-app.git`
- Server
  - Go to `/api`
  - Copy `sample.env` to `.env` for database credentials and JWT access token
  - Run `npm install`
- React Client
  - Go to `/client` directory
  - Run `npm install`
- Development
  - Run Server with `npm run dev`
  - Run Client with `npm start`, browse webapp at http://localhost:8080/

## Screenshots
![Simplanner](https://i.ibb.co/B29JHhz/dashboard-vertical.png)

![Simplanner](https://i.ibb.co/0VqQn9N/top.png)

![Simplanner](https://i.ibb.co/8XNN9kf/issue-vertical.png)

![Simplanner](https://i.ibb.co/XsFM9yd/roadmap-2.png)

## Developer
- Takaya Hirose - [GitHub](https://github.com/takkuyu) · [LinkedIn](https://www.linkedin.com/in/takaya-hirose-685632196/)

## License
Copyright (c) 2021 Takaya Hirose https://github.com/takkuyu
 
