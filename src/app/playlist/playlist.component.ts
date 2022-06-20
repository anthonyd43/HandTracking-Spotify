import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlaylistData } from '../data/playlist-data';
import { TrackData } from '../data/track-data';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistArray:PlaylistData[];
  currentPlaylist:PlaylistData;
  curPlaylistName:string;
  curPlaylistImage:string;
  tracks:TrackData[];
  @Output() notifyHomeTrackPlaying: EventEmitter<TrackData> = new EventEmitter<TrackData>();
  @Output() notifyAddQueue: EventEmitter<TrackData> = new EventEmitter<TrackData>();


  constructor(private spotifyService:SpotifyService) { 
    this.spotifyService.getPlaylists().then((data) => {
      this.listTracks(data[0]);
      this.playlistArray = data;
    });
  }

  ngOnInit(): void {
    console.log("loading app playlist")
    // console.log(this.currentPlaylist);

    // this.listDefaultPlaylist();
    // if(this.playlistArray.length > 0){
    //   this.currentPlaylist = this.playlistArray[0];
    // }
  }

  listTracks(listPlaylist:PlaylistData): void{
    this.currentPlaylist = listPlaylist;
    console.log(this.currentPlaylist.name);
    this.curPlaylistName = this.currentPlaylist.name;
    this.curPlaylistImage = this.currentPlaylist.imageURL;
    this.spotifyService.getPlaylistTracks(this.currentPlaylist.id).then((data) =>{
      this.tracks = data;
    });
  }
  onNotifyClicked(track:TrackData): void{
    // console.log("Playing" +track.name);
    this.notifyHomeTrackPlaying.emit(track);
  }
  onNotifyAddQueue(track:TrackData): void{
    // console.log("Adding " + track.name);
    this.notifyAddQueue.emit(track);
  }
}
  // @Input() currSong:TrackData;
  // @Input() addToQueue:TrackData;
  // Queue:TrackData[];
  
    // onNotifyAddQueue(track:TrackData): void{
  //   console.log("Adding " + track.name);
  //   this.addToQueue = track;
  // }