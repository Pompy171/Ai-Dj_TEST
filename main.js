song="";
leftWrisrtX=0;
leftWrisrtY=0;
rightWrisrtX=0;
rightWrisrtY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",got_poses);
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(scoreLeftWrist > 0.2){

        circle(leftWrisrtX,leftWrisrtY,20);
        leftWrisrtY_inNumber=Number(leftWrisrtY);
        console.log("leftrisht no = " + leftWrisrtY_inNumber);
        leftWrisrtY_withotdecimals=floor(leftWrisrtY_inNumber);
        volume=leftWrisrtY_withotdecimals/500;
        document.getElementById("volume").innerHTML="Volume = " + volume ;
        song.setVolume(volume);

    }

}

function play(){
    song.play();
}

function preload(){
    song=loadSound("music.mp3");
}

function modelloaded(){
    console.log("model Loaded");
}

function got_poses(results){
    if (results.length>0){
        console.log(results);

        leftWrisrtX=results[0].pose.leftWrist.x;

        leftWrisrtY=results[0].pose.leftWrist.y;


        scoreLeftWrist=results[0].pose.keypoints[9].score;

        scoreRightWrist=results[0].pose.keypoints[10].score;

        console.log("leftwrist Score = " + scoreLeftWrist);


        rightWrisrtX=results[0].pose.rightWrist.x;

        rightWrisrtY=results[0].pose.rightWrist.y;

        console.log("left Wirst : x = "+leftWrisrtX + " y = "+leftWrisrtY);

        console.log("right Wirst : x = "+rightWrisrtX + " y = "+rightWrisrtY);
    }
}

