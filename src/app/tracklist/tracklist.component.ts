import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrackData } from '../data/track-data';


@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.css']
})
export class TracklistComponent implements OnInit {
  @Input() tracks:TrackData[];
  @Output() notifyTrackPlaying: EventEmitter<TrackData> = new EventEmitter<TrackData>();
  @Output() notifyAddQueue: EventEmitter<TrackData> = new EventEmitter<TrackData>();

  constructor() { }

  ngOnInit(): void {
  }
  
  playTrack(track:TrackData): void{
    this.notifyTrackPlaying.emit(track);
  }

  addToQueue(track:TrackData): void{
    this.notifyAddQueue.emit(track);
  }
  
}
