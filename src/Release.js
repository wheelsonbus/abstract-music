export default class Release {
    title;
    date;
    cover;
    tracks = [];

    constructor(title, date, cover, tracks) {
        this.title = title;
        this.date = date;
        this.cover = cover;
        this.tracks = tracks;
    }
}
