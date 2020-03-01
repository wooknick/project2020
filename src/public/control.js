var init = () => {
  document.getElementsByClassName("pages_text")[0].innerHTML = `1 / ${
    document.getElementsByClassName("content_cell").length
  }`;
};
init();

// Sound 설정 시작
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var nowPlaySource;

var playSound = file => {
  var savedBuffer;
  var xhr;
  var play = () => {
    var source = context.createBufferSource();
    nowPlaySource = source;
    source.buffer = savedBuffer;
    source.connect(context.destination);
    source.start(0);
  };
  var xhr = new XMLHttpRequest();
  xhr.open("get", getFileURL(file), true);
  xhr.responseType = "arraybuffer";
  xhr.onload = () => {
    context.decodeAudioData(xhr.response, function(incomingBuffer) {
      savedBuffer = incomingBuffer;
      console.log(nowPlaySource);
      if (!!nowPlaySource) {
        console.log(nowPlaySource);
        nowPlaySource.stop();
      }
      setTimeout(play, 200);
    });
  };
  xhr.send();
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
  if (!nowPlaySource) {
    playSound("dawn");
  }
});

var pageUpdate = page => {
  document.getElementsByClassName("pages_text")[0].innerHTML = `${page + 1} / ${
    document.getElementsByClassName("content_cell").length
  }`;
};
