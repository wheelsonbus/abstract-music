export default class Artist {
    name;
    image;
    releases = [];

    constructor(name, image, releases) {
        this.name = name;
        this.image = image;
        this.releases = releases;
    }
}
