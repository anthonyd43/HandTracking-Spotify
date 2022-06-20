import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HandtrackerComponent } from './handtracker/handtracker.component';
import { GestureComponent } from './gesture/gesture.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { TracklistComponent } from './tracklist/tracklist.component';
import { PlaybackComponent } from './playback/playback.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    HomePageComponent,
    HandtrackerComponent,
    GestureComponent,
    PlaylistComponent,
    TracklistComponent,
    PlaybackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
