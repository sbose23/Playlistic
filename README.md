[![Netlify Status](https://api.netlify.com/api/v1/badges/be42048e-916d-42f3-b372-752e5f2fb021/deploy-status)](https://app.netlify.com/sites/playlistic/deploys)

# Playlistic - Introduction

Playlistic is a web app to provide an easy way to create, save, edit, and share playlists. I created this app because I was not satisfied with the way playlists have to be made and used on YouTube. 

This app was built with a ReactJS frontend written in TypeScript, Auth0 for user authentication, a [backend REST API made on AWS that stores playlists](https://github.com/sbose23/Playlistic/tree/main/api), and Netlify functions for secure consumption of the backend API.

# Features

* Creating playlists: There is no need to be logged in to get started with making a temporary playlist. Simply adding videos with the center search bar will create an auto-looping video player with those videos. The list of videos can be edited or reordered with the drag and drop functionality. A Play/Pause button is also available for the video player.

* User management: The Login or Sign-up button, once clicked, redirects the user to the Auth0 authentication website where the user can login or sign up. The user may logout after with a button which appears while logged in.

* Playlist management: Upon login, the user can create a playlist and then see a field for Playlist name and a Save button. The user can provide or edit the name of the playlist and save it. After saving, the playlist (with the playlist name and a randomly generated UID) can be found under My Playlists. Saved playlists are listed here and can be deleted with the delete button or selected by clicking on the playlist name. 

* Sharing playlists: Playlists can be shared to others by clicking the share button which copies a URL to the playlist with username and playlist ID query parameters to the user's clipboard (beside the delete button under My Playlists). 

🎵
