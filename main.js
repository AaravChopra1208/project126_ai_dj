song_harry = "";
song_peterPan = "";
harry_song="";
peterPan_song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload(){
    harry_song = loadSound("music1.mp3");
    peterPan_song = loadSound("music2.mp3");
}


function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded(){
    console.log('poseNet is Initialized');
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist =" + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#00FF00");
    stroke("#FF0000");
    song_harry=harry_song.isPlaying();
    console.log(song_harry);
    song_peterPan=peterPan_song.isPlaying();
    console.log(song_peterPan);

    if(scoreleftWrist >0.2){
        circle(leftWristX,leftWristY,20);
        harry_song.stop();
        if(song_peterPan==false){
            peterPan_song.play();
        }
        else{
            console.log("song name: peterPan_song");
            document.getElementById("song_id").innerHTML="song name:Peter Pan";
        }
        
    }

    if(scorerightWrist >0.2){
        circle(rightWristX,rightWristY,20);
        peterPan_song.stop();
        if(song_harry==false){
            harry_song.play();
        }
        else{
            console.log("song name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML="song name:Harry Potter Theme Song";
        }
        
    }
    }


function play(){
    song1.play();
    song2.play();
}