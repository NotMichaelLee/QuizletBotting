!function (e) {
    function a(c) {
        if (d[c]) return d[c].exports;
        var f = d[c] = {i: c, l: !1, exports: {}};
        return e[c].call(f.exports, f, f.exports, a), f.l = !0, f.exports
    }

    var c = window.QJP;
    window.QJP = function (d, n, t) {
        console.log("window.QJP");
        // console.log("d =");
        // console.log(d);
        if (d === 37 || d[0] === 37) {
            console.log("=====] n =");
            console.log(n);

            // console.log(n("hVQy"));
            //
            // console.log("###########");
            //
            // console.log(n["hVQy"].g);
            //
            // console.log("###########");
            //
            // console.log(n["hVQy"]["g"]); // setup
            //
            // console.log("###########");
            //
            // n["hVQy"]._updatePoints(1000000);

            // console.log("=====] t =");
            // console.log(t);
        } else {
            // console.log("NOOOOOOOOOOOOOOOOOO:::::: " + d);
        }
        for (var o, b, r, i = 0, u = []; i < d.length; i++) b = d[i], f[b] && u.push(f[b][0]), f[b] = 0;
        for (o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        for (c && c(d, n, t); u.length;) u.shift()();
        if (t) for (i = 0; i < t.length; i++) r = a(a.s = t[i]);
        return r
    };
    var d = {}, f = {93: 0};
    a.e = function (e) {
        function c() {
            o.onerror = o.onload = null, clearTimeout(b);
            var a = f[e];
            0 !== a && (a && a[1](new Error("Loading chunk " + e + " failed.")), f[e] = void 0)
        }

        var d = f[e];
        if (0 === d) return new Promise(function (e) {
            e()
        });
        if (d) return d[2];
        var n = new Promise(function (a, c) {
            d = f[e] = [a, c]
        });
        d[2] = n;
        var t = document.getElementsByTagName("head")[0], o = document.createElement("script");
        o.type = "text/javascript", o.charset = "utf-8", o.async = !0, o.timeout = 12e4, a.nc && o.setAttribute("nonce", a.nc), o.src = a.p + "" + {
            0: "20cad794d4ffbd8",
            1: "493be0842fb7a9c",
            2: "46bd8c002e96d22",
            3: "21e762c14de4a20",
            4: "e12ffde7c9e8e5f",
            5: "3106d73dd52fc56",
            6: "d6e17be50599e51",
            7: "b45f11bb2f50077",
            8: "ad035e1cddee744",
            9: "37fbc90749a8ef1",
            10: "2b56b34334d6177",
            11: "a0cf173017411ab",
            12: "ad5d45bff568847",
            13: "79a4dd2d6d8d9fb",
            14: "335dd46b0e0ee1f",
            15: "b34217a9b49e7ce",
            16: "81f304ceca44010",
            17: "cc84a97aa58b91e",
            18: "42b3db5981414c2",
            19: "b0225751eadb48e",
            20: "54f6ac5f8f5891e",
            21: "24baaeefbdea9e2",
            22: "c7dcc048a010571",
            23: "439147bafab5023",
            24: "296423e84363d19",
            25: "3c8d8fd1ce5d4a9",
            26: "e74774dbed90177",
            27: "a6967f330d3f6cc",
            28: "026f6c5a2a90077",
            29: "913fc18555c6cd0",
            30: "239205e2142e85a",
            31: "9e09cfb5f56a76d",
            32: "da7203040265025",
            33: "48dd1ce33c00c45",
            34: "1a7e11a0c0b7f94",
            35: "a2c696bd2538fe1",
            36: "30623eb5cf43477",
            37: "d80eb8da143b847",
            38: "06c845399fc85b4",
            39: "e72ac92a4e3ee71",
            40: "7fe56de2d5904a4",
            41: "2fab7f5d913b773",
            42: "3923e72273f458b",
            43: "72fe262f97eaa71",
            44: "43709074ca0024d",
            45: "fb58b8406d5ffe7",
            46: "a885ea574dedb9e",
            47: "43806ac2a6fde3c",
            48: "d8b7fed539bcff0",
            49: "b0aa4a3838588b6",
            50: "ae843a942529c12",
            51: "89e7191c3ea36af",
            52: "9d19d7db24f3f97",
            53: "9931f1debcb46ea",
            54: "93df9f6e42e4e05",
            55: "5420b25c6c8cd84",
            56: "877acf1c98fff9b",
            57: "d8c4b857415cb4d",
            58: "c989c84a9c7c471",
            59: "b4d8fe731705da9",
            60: "f12aa3bbce2cc54",
            61: "bf7c69256fdf104",
            62: "3a8e186381e9c51",
            63: "4e588effe9dd1c4",
            64: "95c17f109c1d45e",
            65: "7a679064a251a29",
            66: "49bc352476aeb5a",
            67: "a9deb6a02d37308",
            68: "3264a4cc93e86f8",
            69: "b02b0754160eb2b",
            70: "56a13c067512da0",
            71: "d1d0bdfc03279bf",
            72: "cd47698306df3db",
            73: "5abdfffe2cadfc2",
            74: "f4755e67a330b85",
            75: "1256113511472cc",
            76: "cfd4be10704030a",
            77: "2e5e6c0beab122d",
            78: "53a86bd163db541",
            79: "5a343f63980faad",
            80: "b390e38abcc0b85",
            81: "0092a6451990177",
            82: "2aaeb7cf74f4e0e",
            83: "97f244226fb85b5",
            84: "1ea502bc090b5c9",
            85: "8061ab4c1d2cea7",
            86: "54d68c7ee941d97",
            87: "325e4a0e30ccf73",
            88: "be75300bf1c1986",
            89: "583ca766f82cd68",
            90: "ac457caf4fd7e25",
            91: "421ddd7fc90f3a2",
            92: "8b5254d9a55c9f1"
        }[e] + ".a.en-gb.js";
        var b = setTimeout(c, 12e4);
        return o.onerror = o.onload = c, t.appendChild(o), n
    }, a.m = e, a.c = d, a.d = function (e, c, d) {
        a.o(e, c) || Object.defineProperty(e, c, {configurable: !1, enumerable: !0, get: d})
    }, a.n = function (e) {
        var c = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return a.d(c, "a", c), c
    }, a.o = function (e, a) {
        return Object.prototype.hasOwnProperty.call(e, a)
    }, a.p = "/a/j/dist/", a.oe = function (e) {
        throw console.error(e), e
    }, void 0 !== c && (c.l = 0, c.p.forEach(function (e) {
        QJP.apply(this, e)
    }), delete c.p);
    var n = window.QWait.p || [], t = window.QLoad.p || [], o = [], b = {};
    QWait = function () {
        for (var e = arguments, a = e.length - 1, c = e[a], d = [], f = a; f--;) b.hasOwnProperty(e[f]) || d.push(e[f]);
        d.length ? o.push({labels: d, func: c}) : c()
    }, QLoad = function (e) {
        var a, c, d, f;
        for (a = 0, c = o.length; a < c; a++) for (d = f = o[a].labels.length; d--;) if (o[a].labels[d] === e) {
            if (o[a].labels.splice(d, 1), 1 === f) return o.splice(a, 1)[0].func(), void QLoad(e);
            break
        }
        b[e] = 1
    }, t.forEach(function (e) {
        QLoad.apply(window, e)
    }), n.forEach(function (e) {
        QWait.apply(window, e)
    }), setTimeout(function () {
        for (var e = o.length, a = {}, c = ""; e--;) c = o[e].labels.join(","), a[c] || (Rollbar.warning("QWait pending " + c, {done: Object.keys(b)}), a[c] = 1)
    }, 2e4), "readyState" in document && ("complete" === document.readyState && QLoad("dom"), document.onreadystatechange = function () {
        "complete" === document.readyState && QLoad("dom")
    })
}([]), QLoad("Quizlet.Common.main");
//# sourceMappingURL=main.96cd39ad7a20649d3bc9.a.en-gb.js.map