var play = document.getElementById("play");
var title = document.getElementById("title");
var artist = document.getElementById("artist");
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var music = document.querySelector("audio");
var img = document.querySelector("img");
var isplaying = false;
var songIndex = 0;
var progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
var prog_div = document.getElementById("prog_div");
var songs = [
    {
    name: "song1",
    title: "baby",
    artist: "justin bieber",
    },
    {
    name: "song2",
    title: "born to shine",
    artist: "diljit dosanjh",
    },
    {
    name: "song3",
    title: "god's plan",
    artist: "drake",
    },
    {
    name: "song4",
    title: "see you again",
    artist: "wiz & charlie",
    },
    {
    name: "song5",
    title: "worth it",
    artist: "FifthHarmony",
    }
]

//play function//
function playsong(){
    music.play();
    isplaying = true;
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("rotate");
    document.getElementById("play").title = "Pause";
}

// pause function //
function pausesong(){
    music.pause();
    isplaying = false;
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("rotate");
    document.getElementById("play").title = "Play";
}

// LOAD songs //
function loadSongs(songs){
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = songs.name + ".mp3";
    img.src = songs.name + ".jpg";
}

// next Songs //
function nextSong(){
    songIndex = (songIndex + 1 )% songs.length;
    loadSongs(songs[songIndex]);
    playsong();
}

// prev Songs //
function prevSong(){
    songIndex = (songIndex - 1 + songs.length)%songs.length;
    loadSongs(songs[songIndex]);
    playsong();
}

// AUTOPLAY NEXT SONG //
music.addEventListener("ended",function(){
    songIndex = (songIndex + 1 )% songs.length;
    loadSongs(songs[songIndex]);
    playsong();
});

play.addEventListener("click",function(){
    isplaying ? pausesong() : playsong();
});

// PROGRESS BAR //
music.addEventListener("timeupdate",function(event){
    const {currentTime, duration} = event.srcElement;
    let prog_time =  (currentTime / duration) * 100;
    progress.style.width = prog_time+'%';
    
    // music duration 
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if(sec_duration < 10){
        sec_duration = "0" + sec_duration;
    }
    let tot_duration = min_duration +":"+ sec_duration;
    if (duration){
       total_duration.textContent = tot_duration; 
    }
    
    // music Current time 
    let min_current_time = Math.floor(currentTime / 60);
    let sec_current_time = Math.floor(currentTime % 60);
    if(sec_current_time < 10){
        sec_current_time = "0" + sec_current_time;
    }
    let tot_current_time = min_current_time +":"+ sec_current_time;
    current_time.textContent = tot_current_time; 
    
});

// ONCLICK PROGRESS

prog_div.addEventListener("click",function(event){
    const {duration} = music;
    let move_prog = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_prog;
});

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);














