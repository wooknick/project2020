parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"oTeL":[function(require,module,exports) {
var n=function(){document.getElementsByClassName("pages_text")[0].innerHTML="1 / ".concat(document.getElementsByClassName("content_cell").length)};n();var e,t,o=!1,r=new(window.AudioContext||window.webkitAudioContext),i="triangle",l="g",s="",m="major",u=4e3,d=250,h=1,f=50;if(window.addEventListener("touchstart",function(){var n=r.createBuffer(1,1,22050),e=r.createBufferSource();e.buffer=n,e.connect(r.destination),e.noteOn(0)},!1),window.speechSynthesis)var g=window.speechSynthesis;function y(n){1===n?(i="sine",l="c",s="#",m="minor",u=4e3,d=250,h=1,f=50):2===n&&(i="square",l="a",s="M",m="Lydian",u=3e3,d=250,h=2,f=70)}function M(){for(var n=Tonal.Scale.notes(l+s+" "+m),e=new Array,t=2;t<=5;t++)for(var a=0;a<n.length;a++)e.push(n[a]+t+"");return console.log("playing phrase: "+l+s+" "+m),e}function p(n,e){var t=new Array;for(t.drone=new Array,t.melody=new Array,a=0;a<n.length;a++)n[a].match(/\d+/)[0]<=e?t.drone.push(n[a]):t.melody.push(n[a]);return t}function v(n,e,t,a,o,c,i,l,s){if(0!=(t*=f/100)){var m=r.createGain(),u=r.createOscillator();m.connect(r.destination),m.gain.setValueAtTime(0,r.currentTime),m.gain.linearRampToValueAtTime(t,r.currentTime+a/1e3),m.gain.linearRampToValueAtTime(0,r.currentTime+(a/1e3+o/1e3+c/1e3)),panner=r.createPanner(),panner.setPosition(i,l,s),u.connect(panner),panner.connect(r.destination),u.frequency.value=e,u.type=n,u.connect(m),u.start(0),setTimeout(function(){m.gain.linearRampToValueAtTime(0,r.currentTime+5),u.stop(r.currentTime+7),u.disconnect(m),m.disconnect(r.destination)},1.1*(a+o+c))}}function T(){for(voice=0;voice<h;voice++){var n=0,o=p(M(),2),r=o.drone[Math.floor(Math.random()*o.drone.length)],l=Math.floor(Math.random()*o.melody.length),s=new Array;for(a=0;a<l;a++)s.push(o.melody[Math.floor(Math.random()*o.melody.length)]);var m=0;for(b=0;b<=s.length;b++){var f=.15*Math.random(),g=100*Math.random()+150,y=u*((Math.floor(8*Math.random())+1)/8);n+=d+y;var v=300*Math.random()-150,w=300*Math.random()-150,A=300*Math.random()-150;b<s.length&&(e=setTimeout('synth("'.concat(i,'", ').concat(Tonal.Note.freq(s[b]),", ").concat(f,", ").concat(d,", ").concat(y,", ").concat(g,", ").concat(v,", ").concat(w,", ").concat(A,")"),m+1e3*Math.random())),m+=y}for(c=0;c<=1;c++){var B=.15*Math.random(),C=100*Math.random()+150,N=300*Math.random()-150,q=300*Math.random()-150,x=300*Math.random()-150;t=setTimeout('synth("'.concat(i,'",\n        ').concat(Tonal.Note.freq(r),", ").concat(B,", ").concat(d,", ").concat(n,", ").concat(C,", ").concat(N,", ").concat(q,", ").concat(x,")\n        "),voice*(1e3*Math.random()))}}e=setTimeout(function(){T()},n)}function w(){console.log(source),source.stop(0)}var A=-1,B=document.querySelector(".content"),C=new Flickity(B,{cellAlign:"left",dragThreshold:10,pageDots:!1,prevNextButtons:!1,on:{ready:function(){console.log("start")},change:function(n){N(n),o||(T(),o=!0),2===A&&3===n?y(1):5===A&&6===n?y(2):6===A&&5===n?y(1):3===A&&2===n&&y(2),A=n}}});C.on("staticClick",function(){});var N=function(n){document.getElementsByClassName("pages_text")[0].innerHTML="".concat(n+1," / ").concat(document.getElementsByClassName("content_cell").length)};
},{}]},{},["oTeL"], null)
//# sourceMappingURL=/control%20copy.96aab522.js.map