import { Component, OnInit } from '@angular/core';
import { PlaybackDataService,PlaybackData } from 'src/app/services/playback-data.service';


@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css']
})

export class PlaybackComponent implements OnInit {
  playbackData:PlaybackData;

  constructor(public playbackDataService:PlaybackDataService) {
    this.playbackData=this.playbackDataService.playbackData;
  }

  ngOnInit(): void {
  }

  playPause(){
    this.playbackDataService.playPause();
  }

  toggleShuffle(){
    this.playbackDataService.toggleShuffle();
  }

  nextSong(){
    this.playbackDataService.nextSong();
  }

  prevSong(){
    this.playbackDataService.prevSong();
  }

  decVolume(){
    this.playbackDataService.decVolume();
  }
  
  incVolume(){
    this.playbackDataService.incVolume();
  }

  showQueue(){
    this.playbackDataService.showHideQueue();
  }

}
