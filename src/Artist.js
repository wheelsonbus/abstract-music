export default class Artist {
    name;
    image;
    albums = [];

    constructor(name, image, albums) {
        this.name = name;
        this.image = image;
        this.albums = albums;
    }
}
