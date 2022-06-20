import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { GestureEvent } from '../gesture/gesture.component';
import { TrackData } from '../data/track-data';
import { PlaybackDataService } from 'src/app/services/playback-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  gesture: String = '';
  name:String = '';
  user_id:String = '';
  isLoggedIn: boolean = false;

  constructor(private spotifyService:SpotifyService,private playbackDataService:PlaybackDataService) { }


  ngOnInit(): void {
    this.getUserInfo();
  }

  gestEvent(event: GestureEvent){
    this.gesture = event.getGesture();
    this.doGestureEvent();
    if(this.gesture!=='Hide Queue'){
      console.log(event);
    }
    
  }

  doGestureEvent(){
    if(this.gesture==="Play/Pause"){
      console.log("inside");
      this.playbackDataService.playPause();
    }
    else if(this.gesture==="Show Queue"){
      this.playbackDataService.showHideQueue();
    }
    else if(this.gesture==="Hide Queue"){
      this.playbackDataService.hideQueue();
    }
    else if(this.gesture==="Next Song"){
      this.playbackDataService.nextSong();
    }
    else if(this.gesture==="Previous Song"){
      this.playbackDataService.prevSong();
    }
    else if(this.gesture==="Remove From Queue"){
      this.playbackDataService.removeFromQueue();
    }
    else if(this.gesture==="Volume Up"){
      this.playbackDataService.incVolume();
    }
    else if(this.gesture==="Volume Down"){
      this.playbackDataService.decVolume();
    }
  }

  getUserInfo(){
    this.spotifyService.aboutMe().then((data) => {
      this.name = data.name;
      this.user_id = data.user_id;
    });
  }

  onNotifyClicked(track:TrackData): void{
    this.playbackDataService.playSong(track);

  }

  onNotifyAddQueue(track:TrackData): void{

    this.playbackDataService.addToQueue(track);
  }
}
