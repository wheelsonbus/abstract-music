import Release from "./Release.js";
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
                    ", secret=" +
                    this.consumerSecret,
            },
        });
        const data = await response.json();

        return new Artist(
            data.name,
            data.images[0].uri,
            await this.getArtistReleases(data.id)
        );
    }

    async getArtistReleases(id) {
        const response = await fetch(
            "https://api.discogs.com/artists/" + id + "/releases",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Discogs key=" +
                        this.consumerKey +
                        ", secret=" +
                        this.consumerSecret,
                },
            }
        );

        const data = (await response.json()).releases;

        let releases = [];
        for (const release of data) {
            if (release.type !== "master" || release.role !== "Main") {
                continue;
            }
            releases.push(
                await this.getReleases(release.main_release.toString())
            );
        }
        return releases;
    }

    async getReleases(id) {
        const response = await fetch("https://api.discogs.com/releases/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Discogs key=" +
                    this.consumerKey +
                    ", secret=" +
                    this.consumerSecret,
            },
        });
        const data = await response.json();

        let tracks = [];
        for (const track of data.tracklist) {
            const hms = track.duration.split(":");
            while (hms.length < 3) {
                hms.unshift("00");
            }
            const duration = +hms[0] * 60 * 60 + +hms[1] * 60 + +hms[2];
            tracks.push(new Track(track.title, duration));
        }

        return new Release(
            data.title,
            data.year.toString(),
            data.images[0].uri,
            tracks
        );
    }
}
