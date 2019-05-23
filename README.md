

# Quick Tournament

![noun_Tennis Court_1835472](https://github.com/screeeen/project-server/img_readme/noun_Tennis_Court_1835472.png?raw=true)

## Description

This is an app to manage unofficial tournaments within communities. The app helps to organize, manage and track competitions.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start playing into competition
-  **Login:** As a user I can login to the platform so that I can play competitions
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Tournaments** As a user I can add a tournament
-  **Edit Tournaments** As a user I can edit a tournament
-  **Add Player Names** As a user I can add players to a tournament
-  **Edit Player profiles** As a user I can edit a player profile to fit into the tournament view
-  **View Tournament Table** As a user I want to see the tournament table
-  **Edit Games** As a user I can edit the games, so I can add scores
-  **View Ranks** As a user I can see the ranks

## ![IMG_4421](IMG_4421.jpg)



## Backlog

User profile:
- see my profile
- change tournament mode to FFA
- Add weather widget
- lottie interactions
- users can bet
- add geolocation to events when creating



# Client

## Routes
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashPage           | public      | just promotional copy                                        |
| `/auth/signup`            | SignupPage           | anon only   | signup form, link to login, navigate to homepage after signup |
| `/auth/login`             | LoginPage            | anon only   | login form, link to signup, navigate to homepage after login |
| `/auth/logout`            | n/a                  | anon only   | navigate to homepage after logout, expire session            |
| `/tournaments`            | TournamentListPage   | user only   | shows all tournaments in a list                              |
| `/tournaments/add`        | TournamentListPage   | user only   | edits a tournament                                           |
| `/tournaments/:id`        | TournamentDetailPage | user only   | details of a tournament to edit                              |
| `/tournament/:id`         | na                   | user only   | delete tournament                                            |
| `/tournament/players`     | PlayersListPage      | user only   | list of players of a tournament                              |
| `/tournament/players/add` | PlayersListPage      | user only   | add a player to the tournament                               |
| `/tournament/players/:id` | PlayersDetailPage    | user only   | edit player for tournament                                   |
| `/tournament/players/:id` | PlayersListPage      | user only   | delete player from tournament                                |
| `/tournament/tableview`   | TableView            | user only   | games view and brackets                                      |
| `/tournament/ranks`       | RanksPage            | user only   | Ranks list                                                   |
| `/tournament/game`        | GameDetailPage       | user only   | Game detail                                                  |
| `/tournament/game`        | Game                 | user only   |                                                              |

## Components

- LoginPage

- SplashPage

- TournamentListPage

- Tournament Cell

- TournamentDetailPage

- TableViewPage

- PlayersListPage

- PlayerDetailPage

- RanksPage

- TournamentDetailPageOutput

- Navbar

- footer

- brackets

  

  


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Tournament Service
  - tournament.list()
  - tournament.detail(id)
  - tournament.add(id)
  - tournament.delete(id)
  
- Player Service 

  - player.detail(id)
  - player.add(id)
  - player.delete(id)

- Game Service

  - Game.put(id)

    

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Restaurant>]
```

Tournament model

```
  name:String
  img:String
  players: [{type: Schema.Types.ObjectId,ref:'Participant'}]
  games:[{type: Schema.Types.ObjectId,ref:'Game'}]
```

Player model

``` name: String,
img: String
score: []
```

Game model

```  player1: [{type: Schema.Types.ObjectId,ref:'Participant'}],
player2: [{type: Schema.Types.ObjectId,ref:'Player'}]
player2: [{type: Schema.Types.ObjectId,ref:'Player'}]
winner: String
img :String
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | /auth/profile               | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | /auth/signup                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | /auth/logout                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | /tournaments                |                              |                | 400          | Show all tournaments                                         |
| GET         | /tournaments/:id            | {id}                         |                |              | Show specific tournament                                     |
| POST        | /tournaments/add-tournament | {}                           | 201            | 400          | Create and save a new tournament                             |
| PUT         | /tournaments/edit/:id       | {name,img,players}           | 200            | 400          | edit tournament                                              |
| DELETE      | /tournaments/delete/:id     | {id}                         | 201            | 400          | delete tournament                                            |
| GET         | /players                    |                              |                | 400          | show players                                                 |
| GET         | /players/:id                | {id}                         |                |              | show specific player                                         |
| POST        | /players/add-player         | {name,img,tournamentId}      | 200            | 404          | add player                                                   |
| PUT         | /players/edit/:id           | {name,img}                   | 201            | 400          | edit player                                                  |
| DELETE      | /players/delete/:id         | {id}                         | 200            | 400          | delete player                                                |
| GET         | /games                      | {}                           | 201            | 400          | show games                                                   |
| GET         | /games/:id                  | {id,tournamentId}            |                |              | show specific game                                           |
| POST        | /games/add-game             | {player1,player2,winner,img} |                |              | add game                                                     |
| POST        | /games/add-all-games        |                              |                |              | add all games from a tournament. Gets a list of players and populates them via algorithm. |
| PUT         | /games/edit/:id             | {winner,score}               |                |              | edit game                                                    |
|             |                             |                              |                |              |                                                              |


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)
[Server repository Link](https://github.com/screeeen/project-server)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)









