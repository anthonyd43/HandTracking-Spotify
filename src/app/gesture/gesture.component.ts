import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { PredictionEvent } from '../prediction-event';

export class GestureEvent {
  
  gesture: string = "";

  constructor(gest:string){
    var actionGesture = new Map<string, string>([
      ["Closed Hand", "Play/Pause"],
      ["None", "No Action"],
      ["Open Hand", "Show Queue"],
      ["Hand Pointing", "Volume Up"],
      ["RtL Swipe", "Next Song"],
      ["Swipe Up", "Remove From Queue"],
      ["LtR Swipe","Previous Song"],
      ["One Hand Open One Hand Pointing", "Volume Up"],
      ["One Hand Closed One Hand Pointing", "Volume Down"],
      ["Hide Queue","Hide Queue"]
  ]);   
      this.gesture = actionGesture.get(gest) || '';
  }

  public getGesture(){
      return this.gesture;
  }
}

@Component({
  selector: 'app-gesture',
  templateUrl: './gesture.component.html',
  styleUrls: ['./gesture.component.css']
})
export class GestureComponent implements OnInit {
  @Output() onGesture = new EventEmitter<GestureEvent>();
  currPrediction: string = "";
  predictionTimeHeldUp: number=0;

  predictionHistory: Array<PredictionEvent>=[];
  private historySize=4;
  private predictionTimeThresh: number=2;
  private canEmit:boolean=true;
   
  constructor() { }

  ngOnInit(): void {
    
    for (let i = 0; i < this.historySize; i++) {
      var temp=new PredictionEvent("None");
      this.predictionHistory.push(temp);
    }
  }

  //when handtracker sends a PredictionEvent to this component
  prediction(event: PredictionEvent){
    this.updatePredictionHistory(event);
    this.updatePrediction(event);
  }


  updatePrediction(event: PredictionEvent){
    var newPrediction=event.getPrediction();
    this.updatePredictionData(newPrediction);
    this.emitValidGestureEvent();
    this.currPrediction =newPrediction;
  }

  updatePredictionHistory(event: PredictionEvent){
    for (let i = this.historySize-1; i > 0; i--) {
      this.predictionHistory[i]=this.predictionHistory[i-1];
    }
    this.predictionHistory[0]=event;

  }



  //update currentPrediction gesture and how long user has held that gesture up
  updatePredictionData(newPrediction:string){
    if(this.currPrediction === newPrediction){
      this.predictionTimeHeldUp+=1;
    }
    else{
      //since we detected a new hand gesture, we can now emit a new event once it meets the predictionTimeThresh
      this.canEmit=true;
      this.predictionTimeHeldUp=0;
      if(this.predictionHistory[0].prediction==='None' && this.predictionHistory[1].prediction==='Open Hand'){
        this.onGesture.emit(new GestureEvent("Hide Queue"));
      }
    }
  }

  //logic that checks if we should emit a gesture event
  //only emit an event if user holds up a gesture for longer than this.predictionTimeThresh
  emitValidGestureEvent(){
    if(this.predictionTimeHeldUp > this.predictionTimeThresh && this.canEmit===true){
      
      if(this.currPrediction==="One Hand Open One Hand Pointing" || this.currPrediction==="One Hand Closed One Hand Pointing"){
        //emit 'volume up' event every 2 seconds
        if((this.predictionTimeHeldUp-3)%2===0){
          this.emitGestureEvent();
        }
      }
      else if(this.currPrediction==='Open Hand' && this.checkForSwipe()){
        if(this.RtLSwipeDetected()){
          this.canEmit=false;
          this.onGesture.emit(new GestureEvent("RtL Swipe"));
        }
        else if(this.LtRSwipeDetected()){
          this.canEmit=false;
          this.onGesture.emit(new GestureEvent("LtR Swipe"));
        }
        else if(this.verticalSwipeDetected()){
          this.canEmit=false;
          this.onGesture.emit(new GestureEvent("Swipe Up"));
        }
        //shuffle gesture
        else{
          this.canEmit=false;
          this.emitGestureEvent();
        }

      }
      else{
        //set to false so we don't continuously send this event;
        this.canEmit=false;
        this.emitGestureEvent();
      }
    }
  }

  checkForSwipe(){
    var initialPredictionType=this.predictionHistory[0].getPrediction();
    for (let i = 1; i < this.historySize; i++) {
      var currEvent=this.predictionHistory[i];
      if(initialPredictionType!==currEvent.getPrediction()){
        return false;
      }
    }
    return true;
  }


  RtLSwipeDetected(){
    var start= this.predictionHistory[this.historySize-1].getBbox();
    var end= this.predictionHistory[0].getBbox();

    if(start[0]-end[0]>200){
      return true;
    }
    return false;
  }

  
  LtRSwipeDetected(){
    var start= this.predictionHistory[this.historySize-1].getBbox();
    var end= this.predictionHistory[0].getBbox();

    if(start[0]-end[0]<-200){
      return true;
    }
    return false;
  }

  verticalSwipeDetected(){
    var start= this.predictionHistory[this.historySize-1].getBbox();
    var end= this.predictionHistory[0].getBbox();
    if(start[1]-end[1]>200){
      return true;
    }
    return false;
  }

  emitGestureEvent(){
    if(this.currPrediction!=='None'){
      this.onGesture.emit(new GestureEvent(this.currPrediction));
    }

  }

}
