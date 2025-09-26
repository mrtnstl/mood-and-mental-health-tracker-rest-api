# mood-and-mental-health-tracker-rest-api

A REST API written in TypeScript with functions to track users mood, sleeping schedule, eating habits and stress level, allowing the program to suggest mitigation strategies against unbalanced lifestyle with LLM integration.

## Use Cases / User Stories

- As a visitor, i want to create a user account through registration
- As a user, i want to track my mood, and see stats about it
- As a user, i want to track my sleeping, and get streaks and stats about it
- As a user, i want to track my food consumption and body movement, and get streaks and stats about it
- As a user, i want to track my stress level, and get stats about it
- As a user, i want to get my summarized statistics
- As a user, i want to get suggestions of mitigation of potentially unbalanced lifestyle
- As a user, i want the program to remind me if i forgot to record new data for a while
- As a user, if i'm consistent enough and completed some streaks, i want to get some words of encouragement from the system

## Stack

| layer     | technology        |
|-----------|-------------------|
| Backend   | Node.js, Express  |
| DB        | Mongodb(?not sure)|

### Backend

#### Routing (by functionality)

| method        | route                 | description                           |
|---------------|-----------------------|---------------------------------------|
| POST          | /login                | login                                 |
| POST          | /logout               | logout                                |
|---------------|-----------------------|---------------------------------------|
| POST          | /register             | user registration                     |
| GET           | /profile              | get user profile                      |
| PUT           | /profile              | modify user profile                   |
| DELETE        | /profile              | delete user profile                   |
|---------------|-----------------------|---------------------------------------|
| POST          | /moods                | add new mood                          |
| GET           | /moods/today          | get todays mood                       |
| GET           | /moods/stats          | weeks/months avg, best, worst         |
|---------------|-----------------------|---------------------------------------|
| POST          | /sleeping             | sleeping and waking up timestamps     |
| GET           | /sleeping/summary     | time slept                            |
| GET           | /sleeping/streak      | if user slept at least X hours        |
|---------------|-----------------------|---------------------------------------|
| POST          | /habits               | add drinking, meals and moving habits |
| GET           | /habits/streaks       | if daily goal met                     |
| GET           | /habits/today         | current days state                    |
|---------------|-----------------------|---------------------------------------|
| POST          | /stress               | add stress level for the day          |
| GET           | /stress/today         | get todays stress level               |
| GET           | /stress/history       | past stress level                     |
|---------------|-----------------------|---------------------------------------|
| GET           | /suggestions          | get suggestions(LLM)                  |
| GET           | /dashboard            | get aggregate personal data           |
|---------------|-----------------------|---------------------------------------|
| GET           | /encouragement        | get words of encouragement(LLM)       |
|---------------|-----------------------|---------------------------------------|

#### The Gamification Aspect

To motivate the user, some parts of the application tracks the users streak in a given topic, for example sleeping. If the user meets the set goals for this topic, the system keeps track of a streak, which is incremented each day. If the criteria are not met, the streak zeroes. The user has one opportunity to save this streak per month, but this doesn't increment the count.
(version 2 could have badges or achievments correlated to streaks, to enforce better personal habits, this could vary depending on frontend implementation)

### Database

?
