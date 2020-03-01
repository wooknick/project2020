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
        var e = function() {
          document.getElementsByClassName(
            "pages_text"
          )[0].innerHTML = "1 / ".concat(
            document.getElementsByClassName("content_cell").length
          );
        };
        e();
        var n,
          t = new AudioContext(),
          o = function(e) {
            var o,
              a,
              s = function() {
                var e = t.createBufferSource();
                (n = e), (e.buffer = o), e.connect(t.destination), e.start(0);
              };
            (a = new XMLHttpRequest()).open(
              "get",
              c(e, "http://wooknick.github.io/"),
              !0
            ),
              (a.responseType = "arraybuffer"),
              (a.onload = function() {
                t.decodeAudioData(a.response, function(e) {
                  (o = e),
                    console.log(n),
                    n && (console.log(n), n.stop()),
                    setTimeout(s, 500);
                });
              }),
              a.send();
          },
          c = function(e, n) {
            return "".concat(n, "/sounds/").concat(e);
          },
          a = 0,
          s = document.querySelector(".content"),
          l = new Flickity(s, {
            cellAlign: "left",
            dragThreshold: 10,
            pageDots: !1,
            prevNextButtons: !1,
            on: {
              ready: function() {},
              change: function(e) {
                r(e),
                  console.log(a),
                  2 === a && 3 === e
                    ? o("first_snow.mp3")
                    : 5 === a && 6 === e
                    ? o("star_gazing.mp3")
                    : 6 === a && 7 === e
                    ? o("magical_journey.mp3")
                    : 7 === a && 6 === e
                    ? o("star_gazing.mp3")
                    : 6 === a && 5 === e
                    ? o("first_snow.mp3")
                    : 3 === a && 2 === e && o("dawn.mp3"),
                  (a = e);
              }
            }
          });
        l.on("staticClick", function() {
          o("dawn.mp3");
        });
        var r = function(e) {
          document.getElementsByClassName(
            "pages_text"
          )[0].innerHTML = ""
            .concat(e + 1, " / ")
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
//# sourceMappingURL=/control.0b4e1d9b.js.map
