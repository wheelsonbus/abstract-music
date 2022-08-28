import { v4 as uuid } from "uuid";

export default class Artist {
    id = uuid();
    name;
    albums = [];

    constructor(name, albums) {
        this.id = uuid();
        this.name = name;
        albums.foreach((album) => this.addAlbum(album));
    }

    addAlbum(album) {
        album.artistId = id;
        this.albums.push(album);
    }
}
