const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const crypto = require('crypto-js');
const prism = require('prism-media');
const bodypart = require('body-parser');
const ffmpeg = require('@ffmpeg/ffmpeg');
const app = express();
const port = 553;
//does being on 553 make secured? dont know

//using bodyparser
app.use(bodypart.urlencoded({ extended: false }));
app.use(bodypart.json());

//not sure
app.use(express.static('views/'));

//link is link, videoinfo is metadata, errorstate to trigger 404
var link = '';
var videoinfo;
var errorstate = false;

console.log('started');

//doesnt do anyntihgn
app.get("/", (req, res) => {
  console.log('thing gettegedeifdcneij');
});

//thing is the route for metadata fetching
app.post("/thing", async (req, res) => {
  console.log('soti tregigered');
  //errostate will always be reset to false on start of every metdata fetch
  errorstate = false;
  console.log('errorstate: ' + errorstate);
  //link
  link = req.body;
  //should be object
  console.log('fskdgfjdgvifjdvj: ' + typeof link);
  console.log('' + JSON.stringify(link));
  if (!link || link == undefined) {
    errorstate = true;
    res.status(400).json({ "status": "died-badlink" });
  };
  try {
    //final check on link state (shuold be stirng of just link)
    console.log('input 1nd checkpoint: ' + JSON.stringify(link));
    console.log('input 2nd checkpoint: ' + JSON.stringify(link.input));
    //check function is acutal fetching of metadata
    await check(link.input);
    //one more error check
    if (errorstate === true) {
      console.log('errorsdao');
      res.status(400).json({ "status": "died-badlink" });
    }
    //if no issue, send videoinfo
    else {
      res.status(200).json(videoinfo);
    };
  }
  //catch for anyhitng uncaught
  catch (error) {
    console.log('poop ' + error);
    res.status(400).send({ "status": "died-unknown" });
  };
});

//getting 404 page (just to make sure)
app.get('/poopnis', (req, res) => {
  console.log('a poopnis');
});

//donwloading audio route
app.post('/download-audio', async (req, res) => {
  console.log('\n\n\n\donwlaoding audio executed\n\n\n\n');
  console.log("linl input: " + link.input + '\n\n');
  //audio(link);
  console.log(link);
  //format property takes an itag to download then append mp3 (might not need mp3 but still hvae)
  //first line is downloading it, second is sending it to client as response
  ytdl(link.input, { filter: 'audio', format: 140 }).pipe(fs.createWriteStream(title + ".webm")).on("finish", () => {
    res.download(title + ".webm");
  });
  console.log("donwloadeded fdownloaded finished");
});

//donwloading 720p route
app.post('/download-smallvideo', async (req, res) => {
  console.log('\n\n\n\donwlaoding video executed\n\n\n\n');
  console.log("linl input: " + link.input + '\n\n');
  //audio(link);
  console.log(link);
  //format property takes an itag to download then append mp4 (might not need mp4 but still hvae)
  //first line is downloading it, second is sending it to client as response
  ytdl(link.input, { filter: 'audioandvideo', format: 22 }).pipe(fs.createWriteStream(title + ".mp4")).on("finish", () => {
    res.download(title + ".mp4");
  });
  console.log("donwloadeded fdownloaded finished");
});

//donwloading 1080p route
app.post('/download-bigvideo', async (req, res) => {
  console.log('\n\n\n\donwlaoding video executed\n\n\n\n');
  console.log("linl input: " + link.input + '\n\n');
  //audio(link);
  console.log(link);
  //see 720p comment
  ytdl(link.input, { filter: 'audioandvideo', format: 96 }).pipe(fs.createWriteStream(title + ".mp4")).on("finish", () => {
    res.download(title + ".mp4");
  });
  console.log("donwloadeded fdownloaded finished");
});

//have video title globael for easy reference
var title;
//actual fetching of metadata functioj
async function check(link) {
  try {
    var info = await ytdl.getBasicInfo(link);
    title = info.videoDetails.title;
    var author = info.videoDetails.author.name;
    var private = info.videoDetails.isPrivate;
    var unlisted = info.videoDetails.isUnlisted;
    var long = info.videoDetails.lengthSeconds;
    var thumbs = info.videoDetails.thumbnails;
    var when = info.videoDetails.uploadDate;
    var views = info.videoDetails.viewCount;
    videoinfo = { title, author, private, unlisted, long, thumbs, when, views };
    console.log('title: ' + title);
    console.log('author: ' + author);
    console.log('private: ' + private, ' unlished: ' + unlisted);
    console.log('leong seconds: ' + long);
    console.log('date: ' + when);
    console.log('views: ' + views);
  }
  //probably no error at this point but made it try/catch just in case
  catch (error) {
    console.log(error);
    errorstate = true;
    console.log(errorstate);
    console.log('\n\n\n\n\n\n\ idiot');
  };
};

app.listen(port, () => console.log('startin and fartin'));