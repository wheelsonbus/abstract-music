export default class Artist {
    name;
    albums = [];

    constructor(name, albums) {
        this.name = name;
        albums.forEach((album) => {
            this.addAlbum(album);
        });
    }

    addAlbum(album) {
        album.artist = this;
        this.albums.push(album);
    }
}
