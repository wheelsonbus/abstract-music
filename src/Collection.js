import Artist from "./Artist.js";
import Album from "./Album.js";
import Track from "./Track.js";

export default class Collection {
    artists = [];
    nArtists = 0;
    albums = [];
    nAlbums = 0;
    tracks = [];
    nTracks = 0;

    constructor(artists) {
        artists.forEach((artist) => {
            this.addArtist(artist);
        });
    }

    getArtist(id) {
        return this.artists[id];
    }
    getAlbum(id) {
        return this.albums[id];
    }
    getTrack(id) {
        return this.tracks[id];
    }

    addArtist(artist) {
        const artistId = this.nArtists++;

        let albums = [];
        artist.albums.forEach((album) => {
            const albumId = this.nAlbums++;
            albums.push(albumId);

            let tracks = [];
            album.tracks.forEach((track) => {
                const trackId = this.nTracks++;
                tracks.push(trackId);
                this.tracks.push(new Track(track.title, trackId, albumId));
            });

            this.albums.push(
                new Album(
                    album.title,
                    album.date,
                    album.cover,
                    tracks,
                    albumId,
                    artistId
                )
            );
        });

        this.artists.push(new Artist(artist.name, albums, artistId));
    }
}
