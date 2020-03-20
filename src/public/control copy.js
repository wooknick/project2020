var textInit = () => {
  document.getElementsByClassName("pages_text")[0].innerHTML = `1 / ${
    document.getElementsByClassName("content_cell").length
  }`;
};
textInit();

// audio setting
var soundInit = false;
var t;
var d;
var audio = new (window.AudioContext || window.webkitAudioContext)();
var queue = [];
var wantStop = true;
var sources = [];
var gainNodes = [];
var oscs = [];

// tone setting 정보

var wave = "sine"; // sine, sawtooth, square, triangle, custom
var key = "c"; // c, d, e, f, g, a, b
var mod = ""; // "", #, b
var scale = "pentatonic"; // Pentatonic, Major, Minor, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian
var activity = 4000; // 1000, 2000, 4000, 8000
var attack = 250; // 10, 250
var voices = 1; // 1, 2, 3, 4, 5
var masterVolume = 50; // 1 - 100;

var toneSetting = {
  wave: "sine",
  key: "c",
  mod: "",
  scale: "pentatonic",
  activity: 4000,
  attack: 250,
  voices: 1,
  masterVolume: 50
};

// 모바일 버퍼 생성
window.addEventListener(
  "touchstart",
  function() {
    // create empty buffer
    var buffer = audio.createBuffer(1, 1, 22050);
    var source = audio.createBufferSource();
    // alert(source);
    source.buffer = buffer;
    // connect to output (your speakers)
    source.connect(audio.destination);
    // play the file
    source.noteOn(0);
  },
  false
);

if (window.speechSynthesis) {
  var announce = window.speechSynthesis;
}

// function audioInit() {
//   // create empty buffer
//   var buffer = audio.createBuffer(1, 1, 22050);
//   var source = audio.createBufferSource();
//   // alert(source);
//   source.buffer = buffer;
//   // connect to output (your speakers)
//   source.connect(audio.destination);
//   // play the file
//   source.noteOn(0);
// }

function control(event) {
  const tag = event.target.localName;
  const name = event.target.name;
  let value = event.target.value;
  if (tag === "input") {
    event.target.nextElementSibling.innerHTML = value;
  }
  if (name === "mod") {
    if (value === "none") {
      value = "";
    } else if (value === "sharp") {
      value = "#";
    } else if (value === "flat") {
      value = "b";
    }
  }
  toneSetting[name] = value;

  if (name === "wave") {
    wave = value;
  } else if (name === "key") {
    key = value;
  } else if (name === "mod") {
    mod = value;
  } else if (name === "scale") {
    scale = value;
  } else if (name === "activity") {
    activity = value;
  } else if (name === "attack") {
    attack = value;
  } else if (name === "voices") {
    voices = value;
  } else if (name === "masterVolume") {
    masterVolume = value;
  }
}

function testPlay(event) {
  wantStop = false;
  console.log(audio.state);
  if (audio.state === "suspended") {
    audio.resume();
  }
  play();
}

function testStop(event) {
  wantStop = true;
  console.log(audio.state);
  if (audio.state === "running") {
    audio.suspend();
  }
  console.log(queue);
  queue.map(s => clearTimeout(s));
  queue = [];
  oscs.map((osc, i) => {
    console.log(osc, i);
    osc.stop(0);
    osc.disconnect(gainNodes[i]);
    console.log(gainNodes[i]);
    gainNodes[i].disconnect(audio.destination);
  });
  oscs = [];
  gainNodes = [];
}

function setMotion(emotion) {
  if (emotion === 1) {
    wave = "sine";
    key = "c";
    mod = "#"; //
    scale = "minor";
    activity = 4000;
    attack = 250;
    voices = 1;
    masterVolume = 50;
  } else if (emotion === 2) {
    wave = "square";
    key = "a";
    mod = "M"; //
    scale = "Lydian";
    activity = 3000;
    attack = 250;
    voices = 2;
    masterVolume = 70;
  }
}

function getTheme() {
  let notes = Tonal.Scale.notes(key + mod + " " + scale);
  let returnTheme = new Array();
  for (var i = 2; i <= 5; i++) {
    for (var j = 0; j < notes.length; j++) {
      returnTheme.push(notes[j] + i + "");
    }
  }
  console.log("playing phrase: " + key + mod + " " + scale);
  // returnTheme : ["G#2", "A#2", "B#2", "D#2", "E#2", "G#3", "A#3", "B#3", "D#3", "E#3", "G#4", "A#4", "B#4", "D#4", "E#4", "G#5", "A#5", "B#5", "D#5", "E#5"]
  return returnTheme;
}

function separateTones(theme, octave) {
  let theseNotes = new Array();
  theseNotes["drone"] = new Array();
  theseNotes["melody"] = new Array();
  for (a = 0; a < theme.length; a++) {
    if (theme[a].match(/\d+/)[0] <= octave) {
      theseNotes["drone"].push(theme[a]);
    } else {
      theseNotes["melody"].push(theme[a]);
    }
  }
  return theseNotes;
}

function synth(w, f, v, a, l, d, x, y, z) {
  v = v * (masterVolume / 100);

  if (v == 0) {
    return;
  }

  var gainNode = audio.createGain();
  var osc = audio.createOscillator();
  gainNode.connect(audio.destination);
  gainNode.gain.setValueAtTime(0, audio.currentTime);
  gainNode.gain.linearRampToValueAtTime(v, audio.currentTime + a / 1000);
  gainNode.gain.linearRampToValueAtTime(
    0,
    audio.currentTime + (a / 1000 + l / 1000 + d / 1000)
  );

  panner = audio.createPanner();
  panner.setPosition(x, y, z);
  osc.connect(panner);
  panner.connect(audio.destination);

  osc.frequency.value = f;
  osc.type = w;
  osc.connect(gainNode);
  osc.start(0);

  oscs.push(osc);
  gainNodes.push(gainNode);

  var stoptime = (a + l + d) * 1.1;

  var ss = setTimeout(function() {
    gainNode.gain.linearRampToValueAtTime(0, audio.currentTime + 5);
    osc.stop(audio.currentTime + 7);
    osc.disconnect(gainNode);
    gainNode.disconnect(audio.destination);
  }, stoptime);

  console.log(ss);
  queue.push(ss);
  console.log(queue);
}

function play() {
  if (wantStop) {
    return;
  }
  console.log("play");
  for (voice = 0; voice < voices; voice++) {
    var nextPhrase = 0; // 재생 시간 관련인듯
    let theme = getTheme(); // 스케일에 따라 note 확보
    let thisPhrase = separateTones(theme, 2); // note 구분 - 베이스 영역 / 멜로디 영역
    let drone =
      thisPhrase["drone"][
        Math.floor(Math.random() * thisPhrase["drone"].length)
      ];
    let phraseLen = Math.floor(Math.random() * thisPhrase["melody"].length);
    let phrase = new Array();
    for (a = 0; a < phraseLen; a++) {
      phrase.push(
        thisPhrase["melody"][
          Math.floor(Math.random() * thisPhrase["melody"].length)
        ]
      );
    }

    // melody 노트 예약 일괄 등록
    var noteDelay = 0;
    for (b = 0; b <= phrase.length; b++) {
      let volume = Math.random() * 0.15;
      let delay = Math.random() * 100 + 150;
      let length = activity * ((Math.floor(Math.random() * 8) + 1) / 8);
      let release = attack + length;
      nextPhrase += release;
      let x = Math.random() * 300 - 150;
      let y = Math.random() * 300 - 150;
      let z = Math.random() * 300 - 150;
      if (b < phrase.length) {
        t = setTimeout(
          `synth("${wave}", ${Tonal.Note.freq(
            phrase[b]
          )}, ${volume}, ${attack}, ${length}, ${delay}, ${x}, ${y}, ${z})`,
          noteDelay + Math.random() * 1000
        );

        queue.push(t);
      }
      noteDelay += length;
    }

    // drone 노트 예약 등록
    for (c = 0; c <= 1; c++) {
      let volume = Math.random() * 0.15;
      let delay = Math.random() * 100 + 150;
      let x = Math.random() * 300 - 150;
      let y = Math.random() * 300 - 150;
      let z = Math.random() * 300 - 150;

      d = setTimeout(
        `synth("${wave}",
        ${Tonal.Note.freq(
          drone
        )}, ${volume}, ${attack}, ${nextPhrase}, ${delay}, ${x}, ${y}, ${z})
        `,
        voice * (Math.random() * 1000)
      );

      queue.push(d);
    }
  }

  t = setTimeout(function() {
    play();
  }, nextPhrase);
}

function stop() {
  console.log(source);
  source.stop(0);
}

// 슬라이드 설정 시작
var preIndex = -1;
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
      // if (!soundInit) {
      //   play();
      //   soundInit = true;
      // }
      // if (preIndex === 2 && index === 3) {
      //   setMotion(1);
      // } else if (preIndex === 5 && index === 6) {
      //   setMotion(2);
      // } else if (preIndex === 6 && index === 5) {
      //   setMotion(1);
      // } else if (preIndex === 3 && index === 2) {
      //   setMotion(2);
      // }
      // preIndex = index;
    }
  }
});

flkty.on("staticClick", () => {
  //   if (!nowPlaySource) {
  //     playSound("dawn");
  //   }
  // if (!soundInit) {
  //   playSound("init");
  //   soundInit = true;
  // }
});

var pageUpdate = page => {
  document.getElementsByClassName("pages_text")[0].innerHTML = `${page + 1} / ${
    document.getElementsByClassName("content_cell").length
  }`;
};
