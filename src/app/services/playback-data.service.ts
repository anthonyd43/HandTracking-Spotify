import { Injectable } from '@angular/core';
import { TrackData } from '../data/track-data';
import { DomSanitizer } from '@angular/platform-browser';
export interface PlaybackData{
  volume:number,
  isPlaying:boolean,
  shuffleToggled:boolean,
  showQueue:boolean,
  currSong:string,
  prevHistory:string[],
  queuedSongs:string[],
  queuedSongNames:string[],
  currSongSrc:any
}
@Injectable({
  providedIn: 'root'
})
export class PlaybackDataService {
  private maxVol=100;
  private minVol=0;
  private volInc=10;
  private firstSongPlayed=false;
  playbackData:PlaybackData;

  constructor(private sanitizer: DomSanitizer) { 
    this.playbackData={"volume":50,"isPlaying":false,
    "shuffleToggled":false,"showQueue":false,'currSong':'','prevHistory':[],'queuedSongs':[],'currSongSrc':'','queuedSongNames':[]};
  }
  getSafeUrl(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
  getSrcLink(songId:string){
    var srcLink='https://open.spotify.com/embed/track/'+songId+'?utm_source=generator';
    return srcLink;
  }

  playSong(track:TrackData){
    if(this.firstSongPlayed){
      this.playbackData['prevHistory'].push(this.playbackData['currSong']);
    }
    this.playbackData['currSong'] = track.id;
    this.firstSongPlayed=true;
    this.updateCurrSongSrc();
  }

  isPlaying(){
    return this.playbackData['isPlaying'];
  }

  playPause(){
    console.log('here');
    this.playbackData['isPlaying']=!this.playbackData['isPlaying'];
  }
  toggleShuffle(){
    this.playbackData['shuffleToggled']=!this.playbackData['shuffleToggled'];
  }

  decVolume(){
    this.playbackData['volume']=this.playbackData['volume']-this.volInc;
    if(this.playbackData['volume']>this.maxVol){
      this.playbackData['volume']=this.maxVol;
    }
  }
  
  incVolume(){
    this.playbackData['volume']=this.playbackData['volume']+this.volInc;
    if(this.playbackData['volume']<this.minVol){
      this.playbackData['volume']=this.minVol;
    }
  }

  nextSong(){
    if(this.playbackData['queuedSongs'].length>0){
      if(this.firstSongPlayed){
        this.playbackData['prevHistory'].push(this.playbackData['currSong']);
      }
      this.playbackData['currSong'] = this.playbackData['queuedSongs'][0];
      this.playbackData['queuedSongs'].shift();
      this.playbackData['queuedSongNames'].shift();
      this.updateCurrSongSrc();
      this.firstSongPlayed=true;
    }

  }
  prevSong(){
    if(this.playbackData['prevHistory'].length>0){
      this.playbackData['currSong'] = this.playbackData['prevHistory'][this.playbackData['prevHistory'].length-1];
      this.playbackData['prevHistory'].pop();
      this.updateCurrSongSrc();
    }
  }
  addToQueue(track:TrackData){
    this.playbackData['queuedSongs'].push(track.id);
    this.playbackData['queuedSongNames'].push(track.name);
  }
  removeFromQueue(){
    this.playbackData['queuedSongs'].shift();
    this.playbackData['queuedSongNames'].shift();
  }

  showHideQueue(){
    this.playbackData['showQueue']=true;
  }

  hideQueue(){
    this.playbackData['showQueue']=false;
  }

  updateCurrSongSrc(){
    var srcLink=this.getSrcLink(this.playbackData['currSong']);
    this.playbackData['currSongSrc']=this.getSafeUrl(srcLink);
  }

}
