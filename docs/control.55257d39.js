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
        var e,
          n = new AudioContext(),
          o = function(t) {
            var o,
              s,
              c = function() {
                var t = n.createBufferSource();
                (e = t), (t.buffer = o), t.connect(n.destination), t.start(0);
              };
            (s = new XMLHttpRequest()).open("get", a(t), !0),
              (s.responseType = "arraybuffer"),
              (s.onload = function() {
                n.decodeAudioData(s.response, function(t) {
                  (o = t),
                    console.log(e),
                    e && (console.log(e), e.stop()),
                    setTimeout(c, 200);
                });
              }),
              s.send();
          },
          a = function(t) {
            var e = "";
            return (
              "dawn" === t
                ? (e =
                    "https://dl.dropboxusercontent.com/s/4gre7t0md3z7skd/dawn.mp3?dl=0")
                : "magical_journey" === t
                ? (e =
                    "https://dl.dropboxusercontent.com/s/n27d4jo5le70cxf/magical_journey.mp3?dl=0")
                : "first_snow" === t
                ? (e =
                    "https://dl.dropboxusercontent.com/s/8a6a0s739iacjjy/music_zapsplat_rabbits_first_snow_143.mp3?dl=0")
                : "star_gazing" === t &&
                  (e =
                    "https://dl.dropboxusercontent.com/s/v04fwko5ggxdjb3/star_gazing.mp3?dl=0"),
              e
            );
          },
          s = 0,
          c = document.querySelector(".content"),
          r = new Flickity(c, {
            cellAlign: "left",
            dragThreshold: 10,
            pageDots: !1,
            prevNextButtons: !1,
            on: {
              ready: function() {},
              change: function(t) {
                l(t),
                  console.log(s),
                  2 === s && 3 === t
                    ? o("star_gazing")
                    : 5 === s && 6 === t
                    ? o("magical_journey")
                    : 6 === s && 5 === t
                    ? o("star_gazing")
                    : 3 === s && 2 === t && o("dawn"),
                  (s = t);
              }
            }
          });
        r.on("staticClick", function() {
          e || o("dawn");
        });
        var l = function(t) {
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
//# sourceMappingURL=./control.55257d39.js.map
