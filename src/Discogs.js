import Album from "./Album.js";
import Artist from "./Artist.js";
import Track from "./Track.js";

export default class Discogs {
    consumerKey;
    consumerSecret;

    constructor(consumerKey, consumerSecret) {
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
    }

    async getArtist(id) {
        const response = await fetch("https://api.discogs.com/artists/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Discogs key=" +
                    this.consumerKey +
                    " secret=" +
                    this.consumerSecret,
            },
        });
        const data = await response.json();

        return new Artist(
            data.name,
            data.images[0].url,
            await this.getArtistAlbums(data.id)
        );
    }

    async getArtistAlbums(id) {
        const response = await fetch(
            "https://api.discogs.com/artists/" + id + "/releases",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Discogs key=" +
                        this.consumerKey +
                        " secret=" +
                        this.consumerSecret,
                },
            }
        );

        const data = (await response.json()).releases;
        let albums = [];
        for (const album of data) {
            albums.push(
                this.getAlbum(album.id);
            );
        }
        return albums;
    }

    async getAlbum(id) {
        const response = await fetch(
            "https://api.discogs.com/releases/" + id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Discogs key=" +
                        this.consumerKey +
                        " secret=" +
                        this.consumerSecret,
                },
            }
        );
        const data = await response.json();

        let tracks = []
        for (track of data.tracklist) {
            tracks.push(new Track(track.title));
        }

        return new Album(
            data.title,
            data.year.toString(),
            data.images[0].uri,
            tracks
        );
    }
}
