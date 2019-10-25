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

- As a User I want to be able to modify all my profile data and have it updated.
- As a user I want to be able to add an image to my user profile, so that other users can see me.


**Beer**

- As a user I want to be able to create beers, so that other people can meet them.

- As a user I want to be able to update beers, so that other people know the new data I provide.

- As a user I want to be able to delete a beer that I have created, because it is possible that it is no longer supplied.

- As a user I want to be able to add a picture of the beer that I have added to the database, so that other people can know it visually.

- As a user I want to be able to search for beers by name in the search bar.

- As a user I want to be able to see the details of a beer that you have previously searched.

- As a user I want to be able to create comment about a beer that you have previously searched.

- As a user I want to be able to delete my comment, which I created about a beer.

- As a user I want to be able to edit my comment, which I created about a beer.

- As a user I want to be able to mark a beer as my favorite.

- As a user I want to be able to add a tapa that matches well with a beer, to the profile of a beer, to inform other users.

**Site**

- As a user, I can be a bar owner / user and want to create a profile, so that other people know it.

- As a user, I want to be able to edit the bar or brewery data so that the rest of the user is aware of the new data.

- As a user I want to be able to erase data from a restaurant or brewery, because it may have ceased to exist.

- As a user I want to be able to remove a bar from the list of my favorites, because I may have stopped liking it.

- As a user I want to be able to create comment about a bar that you have previously searched.



**Food**

- As a user I want to be able to create tapa, so that other people can meet them.

- As a user I want to be able to update tapa, so that other people know the new data I provide.

- As a user I want to be able to delete a tapa that I have created, because it is possible that it is no longer supplied.

- As a user I want to be able to add a picture of the tapa that I have added to the database, so that other people can know it visually.

- As a user I want to be able to search for tapa by name in the search bar.

- As a user I want to be able to see the details of a tapa that you have previously searched.

- As a user I want to be able to create comment about a tapa that you have previously searched.

- As a user I want to be able to delete my comment, which I created about a tapa.

- As a user I want to be able to edit my comment, which I created about a tapa.

- As a user I want to be able to mark a tapa as my favorite.



## Backlog

List of other features outside of the MVPs scope

- As a user I want to be able to search for a bar in the search bar, by name.

- As a user I want to be able to add a bar among my favorites, which I have previously searched for.

- As a user I want to be able to add a beer that I have previously found to a bar that I already know. For other users to know that there you can drink.

- As a user I want to be able to see what tapas other users recommend with the beer I'm looking for.

- As a user I want to be able to see on a map the bars that are in the database near me. and mark the ones that appear with my favorites.

- As a user I want to be able to mark a bar that I have found on the map as my favorite but it is still

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

