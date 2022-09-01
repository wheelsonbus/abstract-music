export default class Artist {
    name;
    releases = [];

    constructor(name, releases) {
        this.name = name;
        this.releases = releases;
    }
}
