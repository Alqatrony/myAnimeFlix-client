
# myAnimeFlix-client

After i created my [anime_api](https://github.com/Alqatrony/anime_api) database, in this project i built the client-side using React.
It's a Single-page application that fetches data from the anime API (i.e., [anime_api/documentation](https://myanimed-b.herokuapp.com/documentation.html)).
You can register as a user and navigate through the app. You can add animes to your favorit list and remove them as well and search for an anime and update your data.
The app shows you important information about each anime when you click on it.

## Views and Features

### Main view 
- Returns a list of all animes to the user (each listed item with an image and title)
- Ability to select an anime for more details
- Allows users to add an anime to their list of favorites

### Single anime view
- Returns data (description, genre, mangaArtist, image) about a single anime to the user

### Login view
- Allows users to log in with a username and password

### Registration view
- Allows new users to register (username, password, email, birthday)

### Genre view
- Returns data about a genre, with a name and description
- Displays example animes

### MangaArtist view
- Returns data about a mangaArtist (name, bio, birth year, death year)
- Displays example animes

### Profile view
- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays favorite animes
- Allows users to remove an anime from their favorites list.
## Tech Stack

MERN Stack (MongoDB, ExpressJS, ReactJS, NodeJS), Parcel, Axios, React-Bootstrap, React Router DOM, Redux


## Demo
![Demo](src/img/myAnimeFlix.gif)