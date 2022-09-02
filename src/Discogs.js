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

    async get(source) {
        const response = await fetch(source, {
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
        if (response.headers.get("x-discogs-ratelimit-remaining") === "1") {
            await new Promise((r) => setTimeout(r, 60 * 1000));
        }
        return response;
    }

    async getArtist(id) {
        const response = await this.get(
            "https://api.discogs.com/artists/" + id
        );
        const data = await response.json();

        return new Artist(data.name, await this.getArtistReleases(data.id));
        console.log("Fetched " + data.name);
    }

    async getArtistReleases(id) {
        const response = await this.get(
            "https://api.discogs.com/artists/" +
                id +
                "/releases?page=1&per_page=100"
        );

        const data = await response.json();

        let releases = [];
        for (const release of data.releases) {
            if (release.role !== "Main") {
                continue;
            }
            let id = "";
            if (release.type === "master") {
                id = release.main_release.toString();
            } else {
                id = release.id;
            }

            releases.push(await this.getRelease(id));
        }
        return releases;
    }

    async getRelease(id) {
        const response = await this.get(
            "https://api.discogs.com/releases/" + id
        );

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
            data.images ? data.images[0].uri : "",
            tracks
        );
    }
}
