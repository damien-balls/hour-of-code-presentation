const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const crypto = require('crypto-js');
const prism = require('prism-media');
const bodypart = require('body-parser');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const app = express();
const port = 553;
//does being on 553 make secured? dont know

//using bodyparser
app.use(bodypart.urlencoded({ extended: false }));
app.use(bodypart.json());

//not sure
app.use(express.static("views/"));

//link is link, videoinfo is metadata, errorstate to trigger 404, title is viode title (here for easy reference), i wish mp4 and downloadFinish didnt exist
var link = "";
var videoinfo;
var errorstate = false;
var title;
var downloadFinish = false;
var gerb = false;

//doesnt do anyntihgn
app.get("/", (req, res) => {
  console.log("thing gettegedeifdcneij");
});

//thing is the route for metadata fetching
app.post("/thing", async (req, res) => {
  console.log("soti tregigered");
  //errostate will always be reset to false on start of every metdata fetch
  errorstate = false;
  console.log("errorstate: " + errorstate);
  //link
  link = req.body;
  //should be object
  console.log("input datatype: " + typeof link);
  if (!link || link == undefined) {
    errorstate = true;
    res.status(400).json({ "status": "died-badlink" });
  };
  try {
    //final check on link state (shuold be stirng of just link)
    console.log("input as whole: " + JSON.stringify(link));
    //check function is acutal fetching of metadata
    await check(link.input);
    //one more error check
    if (errorstate === true) {
      console.log("errorsdao");
      res.status(400).json({ "status": "died-badlink" });
    }
    //if no issue, send videoinfo
    else {
      res.status(200).json(videoinfo);
    };
  }
  //catch for anyhitng uncaught
  catch (error) {
    console.log("poop " + error);
    res.status(400).send({ "status": "died-unknown" });
  };
});

//getting 404 page (just to make sure)
app.get("/poopnis", (req, res) => {
  console.log('a poopnis');
});

//donwloading audio route
app.post("/download-audio", async (req, res) => {
  console.log("\n\n\n\ donwlaoding audio executed\n\n\n\n");
  console.log(`linl input: ${link.input} \n\n`);
  console.log("raw link as object: ");
  console.log(link);

  //fetches name of mp4
  var mp4 = `./${title}.mp4`;

  //delete vddeo on serever yes pleasle yeokospsl,ll
  function gayBalls(videoTitle) {
    console.log("starting delete");
    if (gerb == true) {
      console.log("starting delete 2");
      fs.unlink(videoTitle + '.mp4', (err) => {
        if (err) throw err;
        console.log(videoTitle + '.mp4 was deleted');
      });
      fs.unlink(videoTitle + '.mp3', (err) => {
        if (err) throw err;
        console.log(videoTitle + '.mp3 was deleted');
      });
    };
  };
  
  //crteates file of same name to transcode mp3 into, currently empty
  fs.open(title + ".mp3", "w", (err, file) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(title + '.mp3 created');
    };
    console.log("ready to milk from " + mp4);
  });

  //initoal download as mp4
  ytdl(link.input, { filter: 'audioandvideo', format: 96 }).pipe(fs.createWriteStream(title + ".mp4")).on("finish", () => {

    // if (downloadFinish == true) {
    var liberate = new ffmpeg({ source: mp4 });
    console.log("liberate")
    liberate.setFfmpegPath(ffmpegPath).toFormat('mp3').saveToFile(`./${title}.mp3`).on("end", () => {
      //sends video to client
      console.log('down has finishred'),
        fs.exists(title + ".mp3", (e) => {
          console.log(`${title}.mp3 eixstists`);
          gerb = false;
          console.log(gerb + " gerb state");
          res.download(`./${title}.mp3`, title + ".mp3");
              gerb = true;
              console.log(gerb + " gerb state 2");
              console.log("gabyalls"); gayBalls(title);
        });
    })
    //finish and delte please
    console.log("donwloadeded fdownloaded finished");
  });
})
  .on("error", (err) => console.log(err));

//donwloading 720p route
app.post('/download-smallvideo', async (req, res) => {
  console.log('\n\n\n\ donwlaoding smallvideo executed\n\n\n\n');
  console.log("linl input: " + link.input + '\n\n');
  //audio(link);
  //format property takes an itag to download then append mp4 (might not need mp4 but still hvae)
  //first line is downloading it, second is sending it to client as response
  ytdl(link.input, { filter: 'audioandvideo', format: 22 }).pipe(fs.createWriteStream("vido.mp4")).on("finish", () => {
    res.download("vido.mp4");
  }).on("error", (err) => {
    console.log("error: " + err);
  });
  console.log("donwloadeded fdownloaded finished");
});

//donwloading 1080p route
app.post('/download-bigvideo', async (req, res) => {
  console.log('\n\n\n\ donwlaoding bbigvideo executed\n\n\n\n');
  console.log("linl input: " + link.input + '\n\n');
  //audio(link);
  console.log(link);
  //see 720p comment
  ytdl(link.input, { filter: 'audioandvideo', format: 96 }).pipe(fs.createWriteStream("vido.mp4")).on("finish", () => {
    res.download("vido" + ".mp4");
  }).on("error", (err) => {
    console.log("error: " + err);
  });
  console.log("donwloadeded fdownloaded finished");
});

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
    console.log('title: ' + title + '\nauthor: ' + author + '\nprivate: ' + private + '\nunlished: ' + unlisted + '\nleong seconds: ' + long + '\ndate: ' + when + "\nviews: " + views);
  }
  //probably no error at this point but made it try/catch just in case
  catch (error) {
    console.log(error);
    errorstate = true;
  };
};

app.listen(port, () => console.log('startin and fartin'));