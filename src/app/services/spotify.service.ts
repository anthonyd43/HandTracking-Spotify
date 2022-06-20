import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ArtistData } from '../data/artist-data';
// import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ProfileData } from '../data/profile-data';
import { PlaylistData } from '../data/playlist-data';
// import { ResourceData } from '../data/resource-data';
// import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }


  private sendRequestToExpress(endpoint:string):Promise<any> {
    var url = this.expressBaseUrl+endpoint;
    return this.http.get(url).toPromise();
  }

  // returns ProfileData containing user's name and id 
  aboutMe():Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then((data) => {
      // console.log('returning aboutMe data');
      return new ProfileData(data.display_name, data.id);
    });
  }

  // returns array of PlaylistData containing the playlist's name, id, and imageURL
  getPlaylists():Promise<PlaylistData[]> {
      return this.sendRequestToExpress('/me-playlists').then((data) => {
        // console.log(data);
        return data.items.map((data: { name: string; id: string; images:{url:string}[] }) => {
          return new PlaylistData(data.name, data.id, data.images[0].url)
        });
      });
  }

  // ***WIP*** returns array of Tracks from Playlist containing track's name, artist, id, imageURL
  getPlaylistTracks(playlist_id:String):Promise<TrackData[]>{
    return this.sendRequestToExpress(`/playlists/${playlist_id}`).then((data) => {
      // let artist:string[];
      // data[0].track.artists.forEach(artist => {
      //   artist.push(artist.name);
      // });

      return data.items.map((data: { track: { artists: { name: any; }[]; album: { name: any; images: { url: any; }[]; }; name: any; id: any; duration_ms: any; }; added_at: any; }) => {
        // console.log(data.track.artists[0].name);
        var artist = data.track.artists[0].name;
        var album = data.track.album.name;
        var name = data.track.name;
        var date_added = data.added_at;
        var imageURL = data.track.album.images[2].url;
        var id = data.track.id;
        var duration_ms = data.track.duration_ms;
        return new TrackData(artist,album,name,date_added,imageURL,id,duration_ms);
      });
    });
  }
  // data.items.track.name
  /*
    data.items.track.artists[i].name
    data.items.track.album.name
    data.items.track.name
    data.items.added_at
    data.items.track.album.images[2].url
    data.items.track.id
    data.items.track.duration_ms
  */


  // searchFor(category:string, resource:string):Promise<ResourceData[]> {
  //   //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
  //   //Make sure you're encoding the resource with encodeURIComponent().
  //   //Depending on the category (artist, track, album), return an array of that type of data.
  //   //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    // var endpoint:string=`/search/${category}/${encodeURIComponent(resource)}`;
  //   var resourceData:ResourceData[]=[];
  //   if(category==='artist'){
  //     return this.sendRequestToExpress(endpoint).then((data) => {
  //       data.artists.items.forEach(artist => this.getArtist(artist.id).then((result)=>resourceData.push(result)));
  //       return resourceData;
  //     });
  //   }
  //   else if(category==='album'){
  //     return this.sendRequestToExpress(endpoint).then((data) => {
  //       data.albums.items.forEach(album => this.getAlbum(album.id).then((result)=>resourceData.push(result)));
  //       return resourceData;

  //     }); 
  //   }
  //   else if(category==='track'){
  //     return this.sendRequestToExpress(endpoint).then((data) => {
  //       data.tracks.items.forEach(track => this.getTrack(track.id).then((result)=>resourceData.push(result)));
  //       console.log(resourceData);
  //       return resourceData;
  //     });       
  //   }
  //   return null;
  // }

  // getArtist(artistId:string):Promise<ArtistData> {
  //   var endpoint:string=`/artist/${encodeURIComponent(artistId)}`;
  //   return this.sendRequestToExpress(endpoint).then((data) => {
  //     return new ArtistData(data);
  //   });
  // }

  // getRelatedArtists(artistId:string):Promise<ArtistData[]> {
  //   var endpoint:string=`/artist-related-artists/${encodeURIComponent(artistId)}`;
  //   return this.sendRequestToExpress(endpoint).then((data) => {
  //     var relatedArtists:ArtistData[]=[];
  //     data.artists.forEach(artist=>relatedArtists.push(new ArtistData(artist)));
  //     return relatedArtists;
  //   });
  // }

  // getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
  //   //TODO: use the top tracks endpoint to make a request to express.
  //   var endpoint:string=`/artist-top-tracks/${encodeURIComponent(artistId)}`;
  //   return this.sendRequestToExpress(endpoint).then((data) => {
  //     var topTracks:TrackData[]=[];
  //     data.tracks.forEach(track=>topTracks.push(new TrackData(track)));
  //     return topTracks;
  //   });

  // }

  // getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
  //   var endpoint:string=`/artist-albums/${encodeURIComponent(artistId)}`;
  //   return this.sendRequestToExpress(endpoint).then((data) => {
  //     var albums:AlbumData[]=[];
  //     data.items.forEach(album=>albums.push(new AlbumData(album)));
  //     return albums;
  //   });
  // }

  // getAlbum(albumId:string):Promise<AlbumData> {
  //   var endpoint:string=`/album/${encodeURIComponent(albumId)}`;
  //   return this.sendRequestToExpress(endpoint).then((data) => {
  //     console.log(data);
  //     return new AlbumData(data);
  //   });
  // }

  // getTracksForAlbum(albumId:string):Promise<TrackData[]> {
  //   var endpoint:string=`/album-tracks/${encodeURIComponent(albumId)}`;
  //   return this.sendRequestToExpress(endpoint).then((data) => {
  //     var albumTracks:TrackData[]=[];
  //     data.items.forEach(track=>albumTracks.push(new TrackData(track)));
  //     return albumTracks;
  //   });
  // }

  // getTrack(trackId:string):Promise<TrackData> {
  //   var endpoint:string=`/track/${encodeURIComponent(trackId)}`;
  //   return this.sendRequestToExpress(endpoint).then((data) => {
  //     return new TrackData(data);
  //   });
  // }

  // getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
  //   var endpoint:string=`/track-audio-features/${encodeURIComponent(trackId)}`;
  //   return this.sendRequestToExpress(endpoint).then((data) => this.addToTrackFeatures(data));
  // }

  // private addToTrackFeatures(data):TrackFeature[]{
  //   var trackFeatures:TrackFeature[]=[];
  //   for (let [key, value] of Object.entries(data)) {
  //     if(TrackFeature.FeatureTypes.includes(key) && typeof value ==='number'){
  //       trackFeatures.push(new TrackFeature(key,value));
  //     }
  //   }
  //   return trackFeatures;
  // }
}
