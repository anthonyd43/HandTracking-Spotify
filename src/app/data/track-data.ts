export class TrackData {
	artist:string[];
    album:string;
    name:string;
    date_added:string;
    imageURL:string;
    id:string;
    duration_ms:number;


	constructor(artist:string[], album:string, name:string, 
                date_added:string, imageURL:string,
                id:string, duration:number) {
        this.artist = artist;
        this.album = album;
        this.name = name;
        this.date_added = date_added;
        this.imageURL = imageURL
        this.id = id;
        this.duration_ms = duration;

    }

	//Return duration_ms in X:XX form (and drop ms component)
	get durationStr() {
		var minutes:number = this.duration_ms / 60000; //60 sec/min * 100ms/sec
		var seconds:number = (this.duration_ms) / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
	}

}

