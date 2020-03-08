# Batzler Bluprint Take Home

Hello Bluprint team!

My name is Graham Batzler and this is my submission for the Bluprint Sr. Dev take home challenge. Both the frontend and backend for the project are contained within this repo.

## Getting Started

Clone this repo and navigate to your new local project directory.

```
cd batzler-bluprint-take-home

// installs frontend and backend deps
npm install:both

// generates static front end build, compiles TS, starts Node server
npm start

// navigate to localhost:1337
```

## Assignment Parameters

For the purpose of this exercise we will look for a certain set of APIs that will need to be built and consumed by the front-end application. Anything that is not specifically outlined will be free to interpretation of the implementer.

A user object will have this shape:
```
{
    id: int <primary key>,
    first_name: string,
    last_name: string,
    address: string,
    created_date: datetime,
    deleted_date?: datetime (if null user is active)
}
```

Write a backend in Typescript that has the following endpoints:

* Get all users
    * should only return non-deleted users
    * optional sort parameter
        * created_date
        * last_name ascending
        * postal code ascending
        * state ascending
* Get individual user by id
    * should return user for a valid id even if the user is deleted_date
* Delete individual user by id


Write a complimenting frontend in React using React table (or similar) to display and exercise each of the endpoints. We are looking for your idea of clean code - once you hit ~2 hours stop and turn in what you have. How much you accomplish in the 2 hours is not the primary measure, but rather how you think through the problems and implement them.
