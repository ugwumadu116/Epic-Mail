# Epic-Mail
Epic-Mail is a web app that helps people exchange messages/information over the internet.

[![Build Status](https://travis-ci.com/ugwumadu116/Epic-Mail.svg?branch=develop)](https://travis-ci.com/ugwumadu116/Epic-Mail)
[![Coverage Status](https://coveralls.io/repos/github/ugwumadu116/Epic-Mail/badge.svg?branch=develop)](https://coveralls.io/github/ugwumadu116/Epic-Mail?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/3bc8d760aceaf1753269/maintainability)](https://codeclimate.com/github/ugwumadu116/Epic-Mail/maintainability)

## Getting Started
Clone the Repository.
-------------
https://github.com/ugwumadu116/Epic-Mail.git

## Prerequisites
* Node v10.15.0 or above
* Npm v6.4 or above

## Endpoints
<table>
<tr>
    <th>HTTP VERB</th>
	<th>ENDPOINT</th>
	<th>FUNCTIONALITY</th>
</tr>
<tr>
	<td>POST</td>
	<td>api/v1/auth/signup</td> 
	<td>Sign up to Epic-Mail</td>
</tr>
<tr>
	<td>POST</td>
	<td>api/v1/auth/login</td> 
	<td>Login to Epic-Mail</td>
</tr>
<tr>
	<td>GET</td>
	<td>api/vi/messages</td> 
	<td>Get all received mails</td>
</tr>
<tr>
	<td>POST</td>
	<td>api/vi/messages</td> 
	<td>Add New message to the system</td>
</tr>
<tr>
	<td>GET</td>
	<td>/api/v1/messages/{id}</td> 
	<td>Get Messages with given ID</td>
</tr>
<tr>
	<td>DELETE</td>
	<td>/api/v1/messages/{id}</td> 
	<td>Delete message with given ID</td>
</tr>
<tr>
	<td>GET</td>
	<td>/api/v1/messages/unread</td> 
	<td>Get all unread messages</td>
</tr>
<tr>
	<td>GET</td>
	<td>/api/v1/messages/sent</td> 
	<td>Get all sent messages</td>
</tr>
<tr>
	<td>GET</td>
	<td>/api-docs</td> 
	<td>GET api documentation</td>
</tr>
</table>

## Installation
**On your Local Machine**
- Pull the [develop](https://github.com/ugwumadu116/Epic-Mail.git) branch off this repository
- Run `npm install` to install all dependencies
- Run npm start to start the app
- Access endpoints on **localhost:3001**
## Running the tests
Run `npm test` in the terminal for the cloned folder.
## Heroku endpoints
Base URL: https://peaceful-forest-12339.herokuapp.com


## Built With
* [Node.js](http://www.nodejs.org/) - Runtime-Environment


## GitHub Pages
URL: https://ugwumadu116.github.io/Epic-Mail/ui/
## Heroku endpoints
Base URL: https://peaceful-forest-12339.herokuapp.com

## Pivotal Tracker board
URL:  https://www.pivotaltracker.com/n/projects/2315337

## Authors
* **Ugwumadu Joel**