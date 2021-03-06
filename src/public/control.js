var init = () => {
  document.getElementsByClassName("pages_text")[0].innerHTML = `1 / ${
    document.getElementsByClassName("content_cell").length
  }`;
};
init();

// Sound 설정 시작
// var AudioContext = window.AudioContext || window.webkitAudioContext;
// var context = new AudioContext();
// var nowPlaySource;

// var playSound = file => {
//   var savedBuffer;
//   var xhr;
//   var play = () => {
//     var source = context.createBufferSource();
//     nowPlaySource = source;
//     source.buffer = savedBuffer;
//     source.connect(context.destination);
//     source.start(0);
//   };
//   var xhr = new XMLHttpRequest();
//   xhr.open("get", getFileURL(file), true);
//   xhr.responseType = "arraybuffer";
//   xhr.onload = () => {
//     context.decodeAudioData(xhr.response, function(incomingBuffer) {
//       savedBuffer = incomingBuffer;
//       if (!!nowPlaySource) {
//         nowPlaySource.stop();
//       }
//       setTimeout(play, 200);
//     });
//   };
//   xhr.send();
// };
var soundInit = false;
var dawn = document.getElementById("dawn");
var magical_journey = document.getElementById("magical_journey");
var star_gazing = document.getElementById("star_gazing");
dawn.muted = true;
dawn.loop = true;
magical_journey.muted = true;
magical_journey.loop = true;
star_gazing.muted = true;
star_gazing.loop = true;

var playSound = file => {
  //   dawn.play();
  //   magical_journey.play();
  //   star_gazing.play();
  if (file === "init") {
    dawn.muted = false;
    dawn.play();
    magical_journey.play();
    star_gazing.play();
  } else if (file === "dawn") {
    magical_journey.muted = true;
    star_gazing.muted = true;
    dawn.currentTime = 0;
    setTimeout(() => {
      dawn.muted = false;
    }, 500);
    // dawn.muted = false;
    // dawn.loop = true;
    // dawn.play();
  } else if (file === "magical_journey") {
    dawn.muted = true;
    star_gazing.muted = true;
    magical_journey.currentTime = 0;
    setTimeout(() => {
      magical_journey.muted = false;
    }, 500);
    // magical_journey.muted = false;
    // magical_journey.loop = true;
    // magical_journey.play();
  } else if (file === "star_gazing") {
    dawn.muted = true;
    magical_journey.muted = true;
    star_gazing.currentTime = 0;
    setTimeout(() => {
      star_gazing.muted = false;
    }, 500);
    // star_gazing.muted = false;
    // star_gazing.loop = true;
    // star_gazing.play();
  }
  //   if (!!sound) {
  //     sound.pause();
  //   }
  //   alert(sound);
  //   sound = document.getElementById(file);
  //   sound.currentTime = 0;
  //   sound.loop = true;
  //   //   setTimeout(() => {
  //   //     sound.play();
  //   //   }, 200);
  //   sound.play();
};

var getFileURL = file => {
  var ret = "";
  if (file === "dawn") {
    ret = "https://dl.dropboxusercontent.com/s/4gre7t0md3z7skd/dawn.mp3?dl=0";
  } else if (file === "magical_journey") {
    ret =
      "https://dl.dropboxusercontent.com/s/n27d4jo5le70cxf/magical_journey.mp3?dl=0";
  } else if (file === "first_snow") {
    ret =
      "https://dl.dropboxusercontent.com/s/8a6a0s739iacjjy/music_zapsplat_rabbits_first_snow_143.mp3?dl=0";
  } else if (file === "star_gazing") {
    ret =
      "https://dl.dropboxusercontent.com/s/v04fwko5ggxdjb3/star_gazing.mp3?dl=0";
  }
  return ret;
};

// 슬라이드 설정 시작
var preIndex = 0;
var elem = document.querySelector(".content");
var flkty = new Flickity(elem, {
  // options
  cellAlign: "left",
  dragThreshold: 10,
  pageDots: false,
  prevNextButtons: false,
  on: {
    ready: function() {
      console.log("start");
    },
    change: function(index) {
      pageUpdate(index);
      if (!soundInit) {
        playSound("init");
        soundInit = true;
      }
      if (preIndex === 2 && index === 3) {
        playSound("star_gazing");
      } else if (preIndex === 5 && index === 6) {
        playSound("magical_journey");
      } else if (preIndex === 6 && index === 5) {
        playSound("star_gazing");
      } else if (preIndex === 3 && index === 2) {
        playSound("dawn");
      }
      preIndex = index;
    }
  }
});

flkty.on("staticClick", () => {
  //   if (!nowPlaySource) {
  //     playSound("dawn");
  //   }
  if (!soundInit) {
    playSound("init");
    soundInit = true;
  }
});

var pageUpdate = page => {
  document.getElementsByClassName("pages_text")[0].innerHTML = `${page + 1} / ${
    document.getElementsByClassName("content_cell").length
  }`;
};
