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
        tracks.forEach((track) => {
            this.addTrack(track);
        });
    }

    addTrack(track) {
        track.album = this;
        this.tracks.push(track);
    }
}
