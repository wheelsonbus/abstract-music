import Album from "./Album.js";
import Artist from "./Artist.js";
import Track from "./Track.js";

export default class Spotify {
    token;

    constructor(clientId, clientSecret) {
        return (async () => {
            const response = await fetch(
                "https://accounts.spotify.com/api/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization:
                            "Basic " + btoa(clientId + ":" + clientSecret),
                    },
                    body: "grant_type=client_credentials",
                }
            );

            this.token = (await response.json()).access_token;
            return this;
        })();
    }

    async getArtist(id) {
        const artist = new Artist("Coldplay", []);
        let response;

        response = await fetch("https://api.spotify.com/v1/artists/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.token,
            },
        });

        const data = await response.json();

        return new Artist(data.name, await this.getArtistAlbums(data.id));
    }

    async getArtistAlbums(id) {
        const response = await fetch(
            "https://api.spotify.com/v1/artists/" +
                id +
                "/albums?limit=50&include_groups=album",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.token,
                },
            }
        );

        const data = (await response.json()).items;
        let albums = [];
        for (const album of data) {
            albums.push(
                new Album(
                    album.name,
                    album.release_date,
                    album.images[0].url,
                    await this.getAlbumTracks(album.id)
                )
            );
        }
        return albums;
    }

    async getAlbumTracks(id) {
        const response = await fetch(
            "https://api.spotify.com/v1/albums/" + id + "/tracks?limit=50",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.token,
                },
            }
        );

        const data = (await response.json()).items;
        let tracks = [];
        data.forEach((track) => {
            tracks.push(new Track(track.name));
        });
        return tracks;
    }
}
