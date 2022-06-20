
//TODO: If you would like to expose additional data from the handtracker component,
//extend this class with additional properties.

export class PredictionEvent {
    prediction: string = "None";
    bbox: number[]=[0,0,0,0];
    constructor(prediction:string,bbox:number[]=[0,0,0,0]){
        this.prediction = prediction;
        this.bbox=bbox;
    }

    public getPrediction(){
        return this.prediction;
    }

    public getBbox(){
        return this.bbox;
    }
}
