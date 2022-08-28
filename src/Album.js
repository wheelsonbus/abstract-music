import { v4 as uuid } from "uuid";

export default class Album {
    id;
    title;
    year;
    cover;
    artistId;
    tracks = [];

    constructor(title, year, cover, tracks) {
        this.id = uuid();
        this.title = title;
        this.year = year;
        this.cover = cover;
        tracks.foreach((track) => this.addTrack(track));
    }

    addTrack(track) {
        track.albumId = id;
        this.tracks.push(track);
    }
}
