export default class Artist {
    name;
    albums = [];

    constructor(name, albums) {
        this.name = name;
        for (let album in albums) {
            this.addAlbum(album);
        }
    }

    addAlbum(album) {
        album.artist = this;
        this.albums.push(album);
    }
}
