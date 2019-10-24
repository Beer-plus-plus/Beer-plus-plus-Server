# BEER++

## Description

SPA about beers, which shows where to drink them and with which to pair them

## User Stories / MVP

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the SPA is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**User**

-

**Beer**

-

## **Site**

## Backlog

List of other features outside of the MVPs scope

**User profile:**

-

**Pet:**

-

**Events:**

-

**Searches:**

-

## ROUTES

| Mockup | Name            | Method | Endpoint         | Description                                | Body                                                           | Redirects |
| :----: | :-------------- | :----- | :--------------- | :----------------------------------------- | :------------------------------------------------------------- | :-------- |
|       | Home            | GET    | /                | Show home page                             | -                                                              |           |
|       | Sign Up Form    | GET    | /signup          | User see the form in order to sign up      | -                                                              |           |
|       | Sign Up         | POST   | /signup          | Sign up a user                             | {email, password}                                              | /profile  |
|       | Log In Form     | GET    | /login           | User see the form in order to log in       | -                                                              |           |
|       | Log In          | POST   | /login           | Log in a user                              | {email, password}                                              | /profile  |
|        | Log Out         | POST   | /logout          | Log out a user 



## Models

**_User Model_**

```javascript
 {
    username:{ type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    name: { type: String },
    lastName: { type: String },
    location:{latitude:{type: String}, longitude:{type: String}}
    img: { type: String },
  },

  {
    timestamps: true,
  }

```

**_Brewery Model_**

```javascript
{

  },
  {
    timestamps: true,
  }
```

**_Beer Model_**

```javascript
  {

   },
  {
    timestamps: true,
  }
```

### Git

[Repository Link](https://github.com/Beer-plus-plus/Beer-plus-plus-Client)

[Deploy Link](deploy)

### Slides

[Slides Link](slides)

