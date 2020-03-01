parcelRequire = (function(e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function(r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function(e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function(r, t) {
      e[r] = [
        function(e, r) {
          r.exports = t;
        },
        {}
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function() {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    s9h5: [
      function(require, module, exports) {
        var t = function() {
          document.getElementsByClassName(
            "pages_text"
          )[0].innerHTML = "1 / ".concat(
            document.getElementsByClassName("content_cell").length
          );
        };
        t();
        var n,
          e = window.AudioContext || window.webkitAudioContext,
          o = new e(),
          a = function(t) {
            var e,
              a,
              c = function() {
                var t = o.createBufferSource();
                (n = t), (t.buffer = e), t.connect(o.destination), t.start(0);
              };
            (a = new XMLHttpRequest()).open("get", s(t), !0),
              (a.responseType = "arraybuffer"),
              (a.onload = function() {
                o.decodeAudioData(a.response, function(t) {
                  (e = t),
                    console.log(n),
                    n && (console.log(n), n.stop()),
                    setTimeout(c, 200);
                });
              }),
              a.send();
          },
          s = function(t) {
            var n = "";
            return (
              "dawn" === t
                ? (n =
                    "https://dl.dropboxusercontent.com/s/4gre7t0md3z7skd/dawn.mp3?dl=0")
                : "magical_journey" === t
                ? (n =
                    "https://dl.dropboxusercontent.com/s/n27d4jo5le70cxf/magical_journey.mp3?dl=0")
                : "first_snow" === t
                ? (n =
                    "https://dl.dropboxusercontent.com/s/8a6a0s739iacjjy/music_zapsplat_rabbits_first_snow_143.mp3?dl=0")
                : "star_gazing" === t &&
                  (n =
                    "https://dl.dropboxusercontent.com/s/v04fwko5ggxdjb3/star_gazing.mp3?dl=0"),
              n
            );
          },
          c = 0,
          r = document.querySelector(".content"),
          l = new Flickity(r, {
            cellAlign: "left",
            dragThreshold: 10,
            pageDots: !1,
            prevNextButtons: !1,
            on: {
              ready: function() {
                console.log("start");
              },
              change: function(t) {
                d(t),
                  2 === c && 3 === t
                    ? a("star_gazing")
                    : 5 === c && 6 === t
                    ? a("magical_journey")
                    : 6 === c && 5 === t
                    ? a("star_gazing")
                    : 3 === c && 2 === t && a("dawn"),
                  (c = t);
              }
            }
          });
        l.on("staticClick", function() {
          n || a("dawn");
        });
        var d = function(t) {
          document.getElementsByClassName(
            "pages_text"
          )[0].innerHTML = ""
            .concat(t + 1, " / ")
            .concat(document.getElementsByClassName("content_cell").length);
        };
      },
      {}
    ]
  },
  {},
  ["s9h5"],
  null
);
//# sourceMappingURL=/control.3e73e40e.js.map
