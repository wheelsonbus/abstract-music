export default class Album {
    id;
    title;
    date;
    cover;
    artist;
    tracks = [];

    constructor(title, date, cover, tracks, id = null, artist = null) {
        this.id = id;
        this.artist = artist;

        this.title = title;
        this.date = date;
        this.cover = cover;

        if (id == null) {
            tracks.forEach((track) => {
                track.album = this;
                this.tracks.push(track);
            });
        } else {
            this.tracks = tracks;
        }
    }
}
