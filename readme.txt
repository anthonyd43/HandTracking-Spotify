--Readme document for author(s), email(s), UCI id(s)--
authors: Anthony Diep, Brandon Nguyen, 
emails: atdiep1@uci.edu, brandln3@uci.edu
UCI ids: 80843005, 64403170

How many assignment points do you believe you completed (replace the *'s with your numbers)?
19/20

6/7 A functional web app
5/5 The ability to control the web app with basic gestures (5 points, 1 per gesture)
2/2 The ability to control the web app with custom gestures (2 points)
2/2 Following good principles of UI design (2 points)
2/2 Creating a compelling app (2 points)
2/2 A readme and demo video which explains how these features were implemented and their design rationale (2 point)
 
How long, in hours, did it take you to complete this assignment?
    40-50hrs


What online resources did you consult when completing this assignment? (list specific URLs)
    https://developer.spotify.com/documentation/web-api/reference/#/
    https://getbootstrap.com/docs/4.0/components/buttons/
    https://getbootstrap.com/docs/4.0/layout/grid/
    https://angular.io/api/core/EventEmitter
    https://angular.io/guide/binding-syntax
    https://stackoverflow.com/questions/47193997/im-trying-to-dynamically-change-the-url-of-an-iframe-but-im-getting-an-error-un/47194242

What classmates or other individuals did you consult as part of this assignment? What did you discuss?
    We mainly discussed with eachother to figure out what we wanted to make and how we can implement hand gestures 
    to the project.


Is there anything special we need to know in order to run your code?
We utilzied the Spotify api and you may need to add your own client/secret keys. We used A3 as a base to start from to set up authentication and routing.

Gestures Implmented
    We implemented hand gestures to control a spotify player. Our spotify player shows a list of your own playlists
    and the tracks in the selected playlist. You can select a song to play and add songs to queue. You can also use gestures
    to do the following actions:

    1. Play/Pause Track (Closed Fist)
        A user will want to play/pause a track frequently, so attaching this to a simple gesture makes it more intuitive and easy to use
    2. Show Queue (Open Hand)
        A user will hold an open hand to view the queue and will disappear when user puts it down.
    3. Next Song (Open Hand Swipe Right to left)
    4. Previous Song (Open Hand Swpie Left to Right)
        Going to the next and previous song follow similar practice to other mobile app gestures, like going to next page or swiping to next image
    5. Volume Up (One Hand Open One Hand Pointing)
    6. Volume Down (One Hand Closed One Hand Pointing)
        Pointing up is an intuitive and common way of communicating you want something to go up. If we had more time, we would have tried to implement Pointing
        up as volume up and pointing down as volume down. However, it did not seem possible to figure out pointing down, so we instead used open/closed hand to 
        differnetiate volume up/down
    7. Remove From Queue (Open Hand Swipe Up)
        Many mobile apps and devices use swiping up as a way to remove apps or tabs. This seemed intuitive to have a remove from queue feature be swipe up.

    We were able to embed the spotify track into the web page, but we did not have time to make the embbedded track play through code compared to clickingthe
    play button. We did however, added logic for whether the track should be playing or not. In addition, we also added gestures that can activate play/pause.
    It is in this logic where we would trigger play/pause in the embbedded track.
