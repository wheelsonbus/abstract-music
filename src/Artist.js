export default class Artist {
    name;
    albums = [];

    constructor(name, albums) {
        this.name = name;
        this.albums = albums;
    }
}
