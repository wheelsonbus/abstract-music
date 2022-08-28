export default class Album {
    title;
    year;
    cover;
    artist;
    tracks = [];

    constructor(title, year, cover, tracks) {
        this.title = title;
        this.year = year;
        this.cover = cover;
        for (let track in tracks) {
            this.addTrack(track);
        }
    }

    addTrack(track) {
        track.album = this;
        this.tracks.push(track);
    }
}
