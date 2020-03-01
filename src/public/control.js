var init = () => {
  document.getElementsByClassName("pages_text")[0].innerHTML = `1 / ${
    document.getElementsByClassName("content_cell").length
  }`;
};
init();

// Sound 설정 시작
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
  xhr.open("get", getFileURL(file, "http://localhost:3000/"), true);
  xhr.responseType = "arraybuffer";
  xhr.onload = () => {
    context.decodeAudioData(xhr.response, function(incomingBuffer) {
      savedBuffer = incomingBuffer;
      console.log(nowPlaySource);
      if (!!nowPlaySource) {
        console.log(nowPlaySource);
        nowPlaySource.stop();
      }
      setTimeout(play, 500);
    });
  };
  xhr.send();
};

var getFileURL = (file, host) => {
  return `${host}/sounds/${file}`;
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
      //   playSound("dawn.mp3");
    },
    change: function(index) {
      pageUpdate(index);
      console.log(preIndex);
      if (preIndex === 2 && index === 3) {
        playSound("first_snow.mp3");
      } else if (preIndex === 5 && index === 6) {
        playSound("star_gazing.mp3");
      } else if (preIndex === 6 && index === 7) {
        playSound("magical_journey.mp3");
      } else if (preIndex === 7 && index === 6) {
        playSound("star_gazing.mp3");
      } else if (preIndex === 6 && index === 5) {
        playSound("first_snow.mp3");
      } else if (preIndex === 3 && index === 2) {
        playSound("dawn.mp3");
      }
      preIndex = index;
    }
  }
});

flkty.on("staticClick", () => {
  playSound("dawn.mp3");
});

var pageUpdate = page => {
  document.getElementsByClassName("pages_text")[0].innerHTML = `${page + 1} / ${
    document.getElementsByClassName("content_cell").length
  }`;
};
