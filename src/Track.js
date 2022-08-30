export default class Track {
    id;
    album;
    title;

    constructor(title, id = null, album = null) {
        this.id = id;
        this.album = album;

        this.title = title;
    }
}
