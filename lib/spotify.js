import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "streaming",
    "app-remote-control",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-follow-modify",
    "user-follow-read",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-top-read",
    "user-read-email",
    "user-read-private",
].join(",");

const params = {
    scope: scopes,
}

const queryParamString = new URLSearchParams(params)

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString()

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi

export {LOGIN_URL}