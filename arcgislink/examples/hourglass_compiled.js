(function(){/*
 http://google-maps-utility-library-v3.googlecode.com
*/
var i, j = Math.PI / 180, l = 0, n = google.maps, o, q, r, s = {R:null, Q:false}, t = {}, u = {};
function v(a, b, c) {
  var d = b === "" ? 0 : a.indexOf(b);
  return a.substring(d + b.length, c === "" ? a.length : a.indexOf(c, d + b.length))
}
function w(a, b, c) {
  if(a && b) {
    var d;
    for(d in a) {
      if(c || !(d in b)) {
        b[d] = a[d]
      }
    }
  }
  return b
}
function x() {
  n.event.trigger.apply(this, arguments)
}
function y(a, b) {
  var c = "";
  if(a) {
    c += a.getTime() - a.getTimezoneOffset() * 6E4
  }
  if(b) {
    c += ", " + (b.getTime() - b.getTimezoneOffset() * 6E4)
  }
  return c
}
function z(a, b) {
  b = Math.min(Math.max(b, 0), 1);
  if(a) {
    var c = a.style;
    if(typeof c.opacity !== "undefined") {
      c.opacity = b
    }
    if(typeof c.filters !== "undefined") {
      c.filters.alpha.opacity = Math.floor(100 * b)
    }
    if(typeof c.filter !== "undefined") {
      c.filter = "alpha(opacity:" + Math.floor(b * 100) + ")"
    }
  }
}
function A(a) {
  var b = "";
  for(var c in a) {
    if(a.hasOwnProperty(c)) {
      if(b.length > 0) {
        b += ";"
      }
      b += c + ":" + a[c]
    }
  }
  return b
}
function B() {
  if(typeof XMLHttpRequest === "undefined") {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0")
    }catch(a) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0")
    }catch(b) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP")
    }catch(c) {
    }
    throw new Error("This browser does not support XMLHttpRequest.");
  }else {
    return new XMLHttpRequest
  }
}
var C = "esriGeometryPoint", D = "esriGeometryMultipoint", E = "esriGeometryPolyline", F = "esriGeometryPolygon", G = "esriGeometryEnvelope";
function aa(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b instanceof n.LatLng || b instanceof n.Marker) {
    return a && a.splice && a.length > 1 ? D : C
  }else {
    if(b instanceof n.Polyline) {
      return E
    }else {
      if(b instanceof n.Polygon) {
        return F
      }else {
        if(b instanceof n.LatLngBounds) {
          return G
        }else {
          if(b.x !== undefined && b.y !== undefined) {
            return C
          }else {
            if(b.points) {
              return D
            }else {
              if(b.paths) {
                return E
              }else {
                if(b.rings) {
                  return F
                }
              }
            }
          }
        }
      }
    }
  }
  return null
}
function H(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b && b.splice && b.length > 0) {
    b = b[0]
  }
  if(b instanceof n.LatLng || b instanceof n.Marker || b instanceof n.Polyline || b instanceof n.Polygon || b instanceof n.LatLngBounds) {
    return true
  }
  return false
}
function I(a, b) {
  for(var c = [], d, e = 0, f = a.getLength();e < f;e++) {
    d = a.getAt(e);
    c.push("[" + d.lng() + "," + d.lat() + "]")
  }
  b && c.length > 0 && c.push("[" + a.getAt(0).lng() + "," + a.getAt(0).lat() + "]");
  return c.join(",")
}
function J(a) {
  var b;
  if(typeof a === "object") {
    if(a && a.splice) {
      b = [];
      for(var c = 0, d = a.length;c < d;c++) {
        b.push(J(a[c]))
      }
      return"[" + b.join(",") + "]"
    }else {
      if(H(a)) {
        var e;
        d = "{";
        switch(aa(a)) {
          case C:
            e = a && a.splice ? a[0] : a;
            if(e instanceof n.Marker) {
              e = e.getPosition()
            }
            d += "x:" + e.lng() + ",y:" + e.lat();
            break;
          case D:
            c = [];
            for(b = 0;b < a.length;b++) {
              e = a[b] instanceof n.Marker ? a[b].getPosition() : a[b];
              c.push("[" + e.lng() + "," + e.lat() + "]")
            }
            d += "points: [" + c.join(",") + "]";
            break;
          case E:
            c = [];
            a = a && a.splice ? a : [a];
            for(b = 0;b < a.length;b++) {
              c.push("[" + I(a[b].getPath()) + "]")
            }
            d += "paths:[" + c.join(",") + "]";
            break;
          case F:
            c = [];
            e = a && a.splice ? a[0] : a;
            a = e.getPaths();
            for(b = 0;b < a.getLength();b++) {
              c.push("[" + I(a.getAt(b), true) + "]")
            }
            d += "rings:[" + c.join(",") + "]";
            break;
          case G:
            e = a && a.splice ? a[0] : a;
            d += "xmin:" + e.getSouthWest().lng() + ",ymin:" + e.getSouthWest().lat() + ",xmax:" + e.getNorthEast().lng() + ",ymax:" + e.getNorthEast().lat();
            break
        }
        d += ", spatialReference:{wkid:4326}";
        d += "}";
        return d
      }else {
        if(a.toJSON) {
          return a.toJSON()
        }else {
          b = "";
          for(c in a) {
            if(a.hasOwnProperty(c)) {
              if(b.length > 0) {
                b += ", "
              }
              b += c + ":" + J(a[c])
            }
          }
          return"{" + b + "}"
        }
      }
    }
  }
  return a.toString()
}
function K(a) {
  var b = "";
  if(a) {
    a.f = a.f || "json";
    for(var c in a) {
      if(a.hasOwnProperty(c) && a[c] !== null && a[c] !== undefined) {
        var d = J(a[c]);
        b += c + "=" + (escape ? escape(d) : encodeURIComponent(d)) + "&"
      }
    }
  }
  return b
}
function L(a, b, c, d) {
  var e = "ags_jsonp_" + l++ + "_" + Math.floor(Math.random() * 1E6), f = null;
  b = b || {};
  b[c || "callback"] = e + " && " + e;
  b = K(b);
  var k = document.getElementsByTagName("head")[0];
  if(!k) {
    throw new Error("document must have header tag");
  }
  window[e] = function() {
    delete window[e];
    f && k.removeChild(f);
    f = null;
    d.apply(null, arguments);
    x(u, "jsonpend", e)
  };
  if((b + a).length < 2E3 && !s.Q) {
    f = document.createElement("script");
    f.src = a + (a.indexOf("?") === -1 ? "?" : "&") + b;
    f.id = e;
    k.appendChild(f)
  }else {
    c = window.location;
    c = c.protocol + "//" + c.hostname + (!c.port || c.port === 80 ? "" : ":" + c.port + "/");
    var g = true;
    if(a.toLowerCase().indexOf(c.toLowerCase()) !== -1) {
      g = false
    }
    if(s.Q) {
      g = true
    }
    if(g && !s.R) {
      throw new Error("No proxyUrl property in Config is defined");
    }
    var h = B();
    h.onreadystatechange = function() {
      if(h.readyState === 4) {
        if(h.status === 200) {
          eval(h.responseText)
        }else {
          throw new Error("Error code " + h.status);
        }
      }
    };
    h.open("POST", g ? s.R + "?" + a : a, true);
    h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    h.send(b)
  }
  x(u, "jsonpstart", e);
  return e
}
u.ea = function(a, b, c, d) {
  L(a, b, c, d)
};
u.P = function(a, b) {
  if(b && b.splice) {
    for(var c, d = 0, e = b.length;d < e;d++) {
      if((c = b[d]) && c.splice) {
        u.P(a, c)
      }else {
        H(c) && c.setMap(a)
      }
    }
  }
};
u.ia = function(a, b) {
  u.P(null, a);
  if(b) {
    a.length = 0
  }
};
function M(a) {
  a = a || {};
  this.wkid = a.wkid;
  this.wkt = a.wkt
}
M.prototype.forward = function(a) {
  return a
};
M.prototype.n = function(a) {
  return a
};
M.prototype.m = function() {
  return 360
};
M.prototype.toJSON = function() {
  return"{" + (this.wkid ? " wkid:" + this.wkid : "wkt: '" + this.wkt + "'") + "}"
};
function N(a) {
  a = a || {};
  M.call(this, a)
}
N.prototype = new M;
function O(a) {
  a = a || {};
  M.call(this, a);
  var b = a.J, c = a.M * j, d = a.N * j, e = a.K * j;
  this.a = a.z / a.C;
  this.e = a.q * j;
  this.h = a.H;
  this.i = a.I;
  a = 1 / b;
  b = 2 * a - a * a;
  this.d = Math.sqrt(b);
  a = this.j(c, b);
  b = this.j(d, b);
  e = P(this, e, this.d);
  c = P(this, c, this.d);
  d = P(this, d, this.d);
  this.b = Math.log(a / b) / Math.log(c / d);
  this.F = a / (this.b * Math.pow(c, this.b));
  this.g = this.p(this.a, this.F, e, this.b)
}
O.prototype = new M;
O.prototype.j = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function P(a, b, c) {
  a = c * Math.sin(b);
  return Math.tan(Math.PI / 4 - b / 2) / Math.pow((1 - a) / (1 + a), c / 2)
}
i = O.prototype;
i.p = function(a, b, c, d) {
  return a * b * Math.pow(c, d)
};
i.o = function(a, b, c) {
  c = b * Math.sin(c);
  return Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - c) / (1 + c), b / 2))
};
i.L = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.o(a, b, c);Math.abs(e - c) > 1.0E-9 && d < 10;) {
    d++;
    c = e;
    e = this.o(a, b, c)
  }
  return e
};
i.forward = function(a) {
  var b = a[0] * j;
  a = this.p(this.a, this.F, P(this, a[1] * j, this.d), this.b);
  b = this.b * (b - this.e);
  return[this.h + a * Math.sin(b), this.i + this.g - a * Math.cos(b)]
};
i.n = function(a) {
  var b = a[0] - this.h, c = a[1] - this.i;
  a = Math.atan(b / (this.g - c));
  b = Math.pow((this.b > 0 ? 1 : -1) * Math.sqrt(b * b + (this.g - c) * (this.g - c)) / (this.a * this.F), 1 / this.b);
  return[(a / this.b + this.e) / j, this.L(b, this.d, Math.PI / 2 - 2 * Math.atan(b)) / j]
};
i.m = function() {
  return Math.PI * 2 * this.a
};
function Q(a) {
  a = a || {};
  M.call(this, a);
  this.a = a.z / a.C;
  var b = a.J;
  this.t = a.aa;
  var c = a.K * j;
  this.e = a.q * j;
  this.h = a.H;
  this.i = a.I;
  a = 1 / b;
  this.c = 2 * a - a * a;
  this.s = this.c * this.c;
  this.G = this.s * this.c;
  this.l = this.c / (1 - this.c);
  this.O = this.j(c, this.a, this.c, this.s, this.G)
}
Q.prototype = new M;
Q.prototype.j = function(a, b, c, d, e) {
  return b * ((1 - c / 4 - 3 * d / 64 - 5 * e / 256) * a - (3 * c / 8 + 3 * d / 32 + 45 * e / 1024) * Math.sin(2 * a) + (15 * d / 256 + 45 * e / 1024) * Math.sin(4 * a) - 35 * e / 3072 * Math.sin(6 * a))
};
Q.prototype.forward = function(a) {
  var b = a[1] * j, c = a[0] * j;
  a = this.a / Math.sqrt(1 - this.c * Math.pow(Math.sin(b), 2));
  var d = Math.pow(Math.tan(b), 2), e = this.l * Math.pow(Math.cos(b), 2);
  c = (c - this.e) * Math.cos(b);
  var f = this.j(b, this.a, this.c, this.s, this.G);
  return[this.h + this.t * a * (c + (1 - d + e) * Math.pow(c, 3) / 6 + (5 - 18 * d + d * d + 72 * e - 58 * this.l) * Math.pow(c, 5) / 120), this.i + this.t * (f - this.O) + a * Math.tan(b) * (c * c / 2 + (5 - d + 9 * e + 4 * e * e) * Math.pow(c, 4) / 120 + (61 - 58 * d + d * d + 600 * e - 330 * this.l) * Math.pow(c, 6) / 720)]
};
Q.prototype.n = function(a) {
  var b = a[0], c = a[1];
  a = (1 - Math.sqrt(1 - this.c)) / (1 + Math.sqrt(1 - this.c));
  c = (this.O + (c - this.i) / this.t) / (this.a * (1 - this.c / 4 - 3 * this.s / 64 - 5 * this.G / 256));
  a = c + (3 * a / 2 - 27 * Math.pow(a, 3) / 32) * Math.sin(2 * c) + (21 * a * a / 16 - 55 * Math.pow(a, 4) / 32) * Math.sin(4 * c) + 151 * Math.pow(a, 3) / 6 * Math.sin(6 * c) + 1097 * Math.pow(a, 4) / 512 * Math.sin(8 * c);
  c = this.l * Math.pow(Math.cos(a), 2);
  var d = Math.pow(Math.tan(a), 2), e = this.a / Math.sqrt(1 - this.c * Math.pow(Math.sin(a), 2)), f = this.a * (1 - this.c) / Math.pow(1 - this.c * Math.pow(Math.sin(a), 2), 1.5);
  b = (b - this.h) / (e * this.t);
  e = a - e * Math.tan(a) / f * (b * b / 2 - (5 + 3 * d + 10 * c - 4 * c * c - 9 * this.l) * Math.pow(b, 4) / 24 + (61 + 90 * d + 28 * c + 45 * d * d - 252 * this.l - 3 * c * c) * Math.pow(b, 6) / 720);
  return[(this.e + (b - (1 + 2 * d + c) * Math.pow(b, 3) / 6 + (5 - 2 * c + 28 * d - 3 * c * c + 8 * this.l + 24 * d * d) * Math.pow(b, 5) / 120) / Math.cos(a)) / j, e / j]
};
Q.prototype.m = function() {
  return Math.PI * 2 * this.a
};
function R(a) {
  a = a || {};
  M.call(this, a);
  this.a = (a.z || 6378137) / (a.C || 1);
  this.e = (a.q || 0) * j
}
R.prototype = new M;
R.prototype.forward = function(a) {
  var b = a[1] * j;
  return[this.a * (a[0] * j - this.e), this.a / 2 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b)))]
};
R.prototype.n = function(a) {
  return[(a[0] / this.a + this.e) / j, (Math.PI / 2 - 2 * Math.atan(Math.exp(-a[1] / this.a))) / j]
};
R.prototype.m = function() {
  return Math.PI * 2 * this.a
};
function S(a) {
  a = a || {};
  M.call(this, a);
  var b = a.J, c = a.M * j, d = a.N * j, e = a.K * j;
  this.a = a.z / a.C;
  this.e = a.q * j;
  this.h = a.H;
  this.i = a.I;
  a = 1 / b;
  b = 2 * a - a * a;
  this.d = Math.sqrt(b);
  a = this.j(c, b);
  b = this.j(d, b);
  c = T(this, c, this.d);
  d = T(this, d, this.d);
  e = T(this, e, this.d);
  this.b = (a * a - b * b) / (d - c);
  this.D = a * a + this.b * c;
  this.g = this.p(this.a, this.D, this.b, e)
}
S.prototype = new M;
S.prototype.j = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function T(a, b, c) {
  a = c * Math.sin(b);
  return(1 - c * c) * (Math.sin(b) / (1 - a * a) - 1 / (2 * c) * Math.log((1 - a) / (1 + a)))
}
i = S.prototype;
i.p = function(a, b, c, d) {
  return a * Math.sqrt(b - c * d) / c
};
i.o = function(a, b, c) {
  var d = b * Math.sin(c);
  return c + (1 - d * d) * (1 - d * d) / (2 * Math.cos(c)) * (a / (1 - b * b) - Math.sin(c) / (1 - d * d) + Math.log((1 - d) / (1 + d)) / (2 * b))
};
i.L = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.o(a, b, c);Math.abs(e - c) > 1.0E-8 && d < 10;) {
    d++;
    c = e;
    e = this.o(a, b, c)
  }
  return e
};
i.forward = function(a) {
  var b = a[0] * j;
  a = this.p(this.a, this.D, this.b, T(this, a[1] * j, this.d));
  b = this.b * (b - this.e);
  return[this.h + a * Math.sin(b), this.i + this.g - a * Math.cos(b)]
};
i.n = function(a) {
  var b = a[0] - this.h;
  a = a[1] - this.i;
  var c = Math.sqrt(b * b + (this.g - a) * (this.g - a)), d = this.b > 0 ? 1 : -1;
  c = (this.D - c * c * this.b * this.b / (this.a * this.a)) / this.b;
  return[(Math.atan(d * b / (d * this.g - d * a)) / this.b + this.e) / j, this.L(c, this.d, Math.asin(c / 2)) / j]
};
i.m = function() {
  return Math.PI * 2 * this.a
};
i.m = function() {
  return Math.PI * 2 * this.a
};
o = new N({wkid:4326});
q = new N({wkid:4269});
r = new R({wkid:102113, semi_major:6378137, central_meridian:0, unit:1});
t = {"4326":o, "4269":q, "102113":r, "102100":new R({wkid:102100, semi_major:6378137, central_meridian:0, unit:1})};
u.ha = function(a, b) {
  var c = t["" + a];
  if(c) {
    return c
  }
  if(b instanceof M) {
    c = t["" + a] = b
  }else {
    c = b || a;
    var d = {wkt:a};
    if(a === parseInt(a, 10)) {
      d = {wkid:a}
    }
    var e = v(c, 'PROJECTION["', '"]'), f = v(c, "SPHEROID[", "]").split(",");
    if(e !== "") {
      d.C = parseFloat(v(v(c, "PROJECTION", ""), "UNIT[", "]").split(",")[1]);
      d.z = parseFloat(f[1]);
      d.J = parseFloat(f[2]);
      d.K = parseFloat(v(c, '"Latitude_Of_Origin",', "]"));
      d.q = parseFloat(v(c, '"Central_Meridian",', "]"));
      d.H = parseFloat(v(c, '"False_Easting",', "]"));
      d.I = parseFloat(v(c, '"False_Northing",', "]"))
    }
    switch(e) {
      case "":
        c = new M(d);
        break;
      case "Lambert_Conformal_Conic":
        d.M = parseFloat(v(c, '"Standard_Parallel_1",', "]"));
        d.N = parseFloat(v(c, '"Standard_Parallel_2",', "]"));
        c = new O(d);
        break;
      case "Transverse_Mercator":
        d.aa = parseFloat(v(c, '"Scale_Factor",', "]"));
        c = new Q(d);
        break;
      case "Albers":
        d.M = parseFloat(v(c, '"Standard_Parallel_1",', "]"));
        d.N = parseFloat(v(c, '"Standard_Parallel_2",', "]"));
        c = new S(d);
        break;
      default:
        throw new Error(e + "  not supported");
    }
    if(c) {
      t["" + a] = c
    }
  }
  return c
};
function U(a) {
  this.url = a;
  this.definition = null
}
U.prototype.load = function() {
  var a = this;
  this.u || L(this.url, {}, "", function(b) {
    w(b, a);
    a.u = true;
    x(a, "load")
  })
};
function V(a, b) {
  this.url = a;
  this.u = false;
  var c = a.split("/");
  this.name = c[c.length - 2].replace(/_/g, " ");
  b = b || {};
  b.ba || this.load()
}
V.prototype.load = function() {
  var a = this;
  L(this.url, {}, "", function(b) {
    ba(a, b)
  })
};
function ba(a, b) {
  w(b, a);
  a.spatialReference = b.spatialReference.wkt ? M.ga(b.spatialReference.wkt) : t[b.spatialReference.wkid];
  b.tables !== undefined ? L(a.url + "/layers", {}, "", function(c) {
    W(a, c)
  }) : W(a, b)
}
function W(a, b) {
  var c = [], d = [];
  a.layers = c;
  if(b.tables) {
    a.tables = d
  }
  var e, f, k, g;
  f = 0;
  for(k = b.layers.length;f < k;f++) {
    g = b.layers[f];
    e = new U(a.url + "/" + g.id);
    w(g, e);
    e.visible = e.defaultVisibility;
    c.push(e)
  }
  if(b.tables) {
    f = 0;
    for(k = b.tables.length;f < k;f++) {
      g = b.tables[f];
      e = new U(a.url + "/" + g.id);
      w(g, e);
      d.push(e)
    }
  }
  f = 0;
  for(k = c.length;f < k;f++) {
    e = c[f];
    if(e.subLayerIds) {
      e.B = [];
      d = 0;
      for(g = e.subLayerIds.length;d < g;d++) {
        var h;
        a: {
          h = e.subLayerIds[d];
          var m = a.layers;
          if(m) {
            for(var p = 0, ca = m.length;p < ca;p++) {
              if(h === m[p].id) {
                h = m[p];
                break a
              }
              if(h && typeof h === "string" && m[p].name.toLowerCase() === h.toLowerCase()) {
                h = m[p];
                break a
              }
            }
          }
          h = null
        }
        e.B.push(h);
        h.fa = e
      }
    }
  }
  a.u = true;
  x(a, "load")
}
function da(a) {
  var b = {};
  if(a.layers) {
    for(var c = 0, d = a.layers.length;c < d;c++) {
      var e = a.layers[c];
      if(e.definition) {
        b[String(e.id)] = e.definition
      }
    }
  }
  return b
}
function ea(a) {
  var b = [];
  if(a.layers) {
    var c, d, e;
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      if(c.B) {
        for(var f = 0, k = c.B.length;f < k;f++) {
          if(c.B[f].visible === false) {
            c.visible = false;
            break
          }
        }
      }
    }
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      c.visible === true && b.push(c.id)
    }
  }
  return b
}
function fa(a, b, c, d) {
  if(b && b.bounds) {
    var e = {};
    e.f = b.f;
    var f = b.bounds;
    e.bbox = "" + f.getSouthWest().lng() + "," + f.getSouthWest().lat() + "," + f.getNorthEast().lng() + "," + f.getNorthEast().lat();
    e.size = "" + b.width + "," + b.height;
    e.dpi = b.dpi;
    if(b.imageSR) {
      e.imageSR = b.imageSR.wkid ? b.imageSR.wkid : "{wkt:" + b.imageSR.wkt + "}"
    }
    e.bboxSR = "4326";
    e.format = b.format;
    f = b.layerDefinitions;
    if(f === undefined) {
      f = da(a)
    }
    e.layerDefs = A(f);
    f = b.layerIds;
    var k = b.layerOption || "show";
    if(f === undefined) {
      f = ea(a)
    }
    if(f.length > 0) {
      e.layers = k + ":" + f.join(",")
    }else {
      if(a.u && c) {
        c({href:null});
        return
      }
    }
    e.transparent = b.transparent === false ? false : true;
    if(b.time) {
      e.time = y(b.time, b.ca)
    }
    e.W = b.W;
    if(e.f === "image") {
      return a.url + "/export?" + K(e)
    }else {
      L(a.url + "/export", e, "", function(g) {
        if(g.extent) {
          var h, m = g.extent, p = t[m.spatialReference.wkid || m.spatialReference.wkt];
          p = p || o;
          h = p.n([m.xmin, m.ymin]);
          m = p.n([m.xmax, m.ymax]);
          h = new n.LatLngBounds(new n.LatLng(h[1], h[0]), new n.LatLng(m[1], m[0]));
          g.bounds = h;
          delete g.extent;
          c(g)
        }else {
          g = g.error;
          d && g && g.error && d(g.error)
        }
      })
    }
  }
}
function X(a) {
  this.X = a ? a.lods : null;
  this.A = a ? t[a.spatialReference.wkid || a.spatialReference.wkt] : r;
  if(!this.A) {
    throw new Error("unsupported Spatial Reference");
  }
  this.S = a ? a.lods[0].resolution : 156543.033928;
  this.minZoom = Math.floor(Math.log(this.A.m() / this.S / 256) / Math.LN2 + 0.5);
  this.maxZoom = a ? this.minZoom + this.X.length - 1 : 20;
  if(n.Size) {
    this.ja = a ? new n.Size(a.cols, a.rows) : new n.Size(256, 256)
  }
  this.T = Math.pow(2, this.minZoom) * this.S;
  this.Z = a ? a.origin.x : -2.0037508342787E7;
  this.$ = a ? a.origin.y : 2.0037508342787E7;
  if(a) {
    for(var b, c = 0;c < a.lods.length - 1;c++) {
      b = a.lods[c].resolution / a.lods[c + 1].resolution;
      if(b > 2.001 || b < 1.999) {
        throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");
      }
    }
  }
}
X.prototype.fromLatLngToPoint = function(a, b) {
  if(!a || isNaN(a.lat()) || isNaN(a.lng())) {
    return null
  }
  var c = this.A.forward([a.lng(), a.lat()]), d = b || new n.Point(0, 0);
  d.x = (c[0] - this.Z) / this.T;
  d.y = (this.$ - c[1]) / this.T;
  return d
};
X.prototype.fromLatLngToPoint = X.prototype.fromLatLngToPoint;
new X;
function Y(a, b) {
  b = b || {};
  this.Y = a instanceof V ? a : new V(a);
  this.w = b.opacity || 1;
  this.V = b.da || {};
  this.v = this.r = false;
  this.k = null;
  b.map && this.setMap(b.map)
}
Y.prototype = new n.OverlayView;
Y.prototype.onAdd = function() {
  var a = document.createElement("div");
  a.style.position = "absolute";
  a.style.border = "none";
  this.k = a;
  this.getPanes().overlayLayer.appendChild(a);
  this.w && z(a, this.w);
  var b = this;
  this.U = n.event.addListener(this.getMap(), "bounds_changed", function() {
    Z(b)
  })
};
Y.prototype.onAdd = Y.prototype.onAdd;
Y.prototype.onRemove = function() {
  n.event.removeListener(this.U);
  this.k.parentNode.removeChild(this.k);
  this.k = null
};
Y.prototype.onRemove = Y.prototype.onRemove;
Y.prototype.draw = function() {
  if(!this.r || this.v === true) {
    Z(this)
  }
};
Y.prototype.draw = Y.prototype.draw;
function Z(a) {
  if(a.r === true) {
    a.v = true
  }else {
    var b = a.getMap(), c = b ? b.getBounds() : null;
    if(c) {
      var d = a.V;
      d.bounds = c;
      c = r;
      var e = b.getDiv();
      d.width = e.offsetWidth;
      d.height = e.offsetHeight;
      if((b = b.getProjection()) && b instanceof X) {
        c = b.A
      }
      d.imageSR = c;
      x(a, "drawstart");
      a.r = true;
      a.k.style.backgroundImage = "";
      fa(a.Y, d, function(f) {
        a.r = false;
        if(a.v === true) {
          a.v = false;
          Z(a)
        }else {
          if(f.href) {
            var k = a.getProjection(), g = f.bounds, h = k.fromLatLngToDivPixel(g.getSouthWest());
            k = k.fromLatLngToDivPixel(g.getNorthEast());
            g = a.k;
            g.style.left = h.x + "px";
            g.style.top = k.y + "px";
            g.style.width = k.x - h.x + "px";
            g.style.height = h.y - k.y + "px";
            a.k.style.backgroundImage = "url(" + f.href + ")";
            f = Math.min(Math.max(a.w, 0), 1);
            a.w = f;
            z(a.k, f)
          }
          x(a, "drawend")
        }
      })
    }
  }
}
var $ = u;window.onload = function() {
  var a = {zoom:4, center:new google.maps.LatLng(40, -100), mapTypeId:google.maps.MapTypeId.ROADMAP, streetViewControl:true}, b = new google.maps.Map(document.getElementById("map_canvas"), a);
  a = new Y("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer");
  google.maps.event.addListener(a, "drawstart", function() {
    document.getElementById("drawing").style.visibility = "visible"
  });
  google.maps.event.addListener(a, "drawend", function() {
    document.getElementById("drawing").style.visibility = "hidden"
  });
  a.setMap(b);
  google.maps.event.addListener($, "jsonpstart", function() {
    b.setOptions({draggableCursor:"wait"})
  });
  google.maps.event.addListener($, "jsonpend", function() {
    b.setOptions({draggableCursor:"url(http://maps.gstatic.com/intl/en_us/mapfiles/openhand_8_8.cur),default"})
  })
};})()
