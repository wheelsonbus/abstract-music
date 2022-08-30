export default class Artist {
    id;
    name;
    albums = [];

    constructor(name, albums, id = null) {
        this.id = id;

        this.name = name;

        if (id == null) {
            albums.forEach((album) => {
                album.artist = this;
                this.albums.push(album);
            });
        } else {
            albums = albums;
        }
    }
}
