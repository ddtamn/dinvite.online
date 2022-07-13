var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};

// node_modules/@sveltejs/kit/dist/chunks/_commonjsHelpers.js
var commonjsGlobal;
var init_commonjsHelpers = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/_commonjsHelpers.js"() {
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  }
});

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData2();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file2 = new File2(entryChunks, filename, { type: contentType });
    formData.append(entryName, file2);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    init_node();
    init_commonjsHelpers();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index: index8, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index8 === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index8++;
                break;
              } else if (index8 - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index8 = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index8 + 2]) {
                index8 = -2;
              }
              if (c === boundary[index8 + 2]) {
                index8++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index8 = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index8++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index8 === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index8;
              if (index8 === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index8 < boundary.length) {
                if (boundary[index8] === c) {
                  if (index8 === 0) {
                    dataCallback("onPartData", true);
                  }
                  index8++;
                } else {
                  index8 = 0;
                }
              } else if (index8 === boundary.length) {
                index8++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index8 = 0;
                }
              } else if (index8 - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index8 = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index8 = 0;
                  }
                } else {
                  index8 = 0;
                }
              }
              if (index8 > 0) {
                lookbehind[index8 - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index8;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/node.js
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
async function* toIterator(parts, clone2) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$12) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$1].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$1].disturbed = true;
  if (data[INTERNALS$1].error) {
    throw data[INTERNALS$1].error;
  }
  const { body: body2 } = data;
  if (body2 === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body2 instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body2) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body2.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body2.readableEnded === true || body2._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function validateReferrerPolicy(referrerPolicy2) {
  if (!ReferrerPolicy.has(referrerPolicy2)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy2}`);
  }
  return referrerPolicy2;
}
function get_raw_body(req) {
  const h2 = req.headers;
  if (!h2["content-type"]) {
    return null;
  }
  const length = Number(h2["content-length"]);
  if (isNaN(length) && h2["transfer-encoding"] == null) {
    return null;
  }
  return new ReadableStream({
    start(controller) {
      req.on("error", (error2) => {
        controller.error(error2);
      });
      let size = 0;
      req.on("data", (chunk) => {
        size += chunk.length;
        if (size > length) {
          controller.error(new Error("content-length exceeded"));
        }
        controller.enqueue(chunk);
      });
      req.on("end", () => {
        controller.close();
      });
    }
  });
}
async function getRequest(base2, req) {
  let headers2 = req.headers;
  if (req.httpVersionMajor === 2) {
    headers2 = Object.assign({}, headers2);
    delete headers2[":method"];
    delete headers2[":path"];
    delete headers2[":authority"];
    delete headers2[":scheme"];
  }
  const request2 = new Request(base2 + req.url, {
    method: req.method,
    headers: headers2,
    body: get_raw_body(req)
  });
  request2.formData = async () => {
    return new Request$12(request2.url, {
      method: request2.method,
      headers: request2.headers,
      body: request2.body && import_stream2.Readable.from(request2.body)
    }).formData();
  };
  return request2;
}
async function setResponse(res, response2) {
  const headers2 = Object.fromEntries(response2.headers);
  if (response2.headers.has("set-cookie")) {
    const header = response2.headers.get("set-cookie");
    const split = splitCookiesString_1(header);
    headers2["set-cookie"] = split;
  }
  res.writeHead(response2.status, headers2);
  if (response2.body) {
    let cancelled = false;
    const reader = response2.body.getReader();
    res.on("close", () => {
      reader.cancel();
      cancelled = true;
    });
    const next = async () => {
      const { done, value } = await reader.read();
      if (cancelled)
        return;
      if (done) {
        res.end();
        return;
      }
      res.write(Buffer.from(value), (error2) => {
        if (error2) {
          console.error("Error writing stream", error2);
          res.end();
        } else {
          next();
        }
      });
    };
    next();
  } else {
    res.end();
  }
}
var import_node_http, import_node_stream, import_node_buffer, import_node_url, import_node_util, import_stream2, setCookie, defaultParseOptions, splitCookiesString_1, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _Blob, Blob3, Blob$12, _File, File2, t, i, h, r, m, f2, e, x, FormData2, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$1, Body, clone, getNonSpecFormDataBoundary, extractContentType, validateHeaderName2, validateHeaderValue2, Headers3, ReferrerPolicy, INTERNALS, isRequest, doBadDataWarn, Request$12;
var init_node = __esm({
  "node_modules/@sveltejs/kit/dist/node.js"() {
    import_node_http = __toESM(require("node:http"), 1);
    import_node_stream = __toESM(require("node:stream"), 1);
    import_node_buffer = require("node:buffer");
    import_node_url = require("node:url");
    import_node_util = require("node:util");
    init_commonjsHelpers();
    import_stream2 = require("stream");
    setCookie = { exports: {} };
    defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    setCookie.exports = parse;
    setCookie.exports.parse = parse;
    setCookie.exports.parseString = parseString;
    splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global3, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop3() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals2 = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop3;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask2 = (() => {
          const globalQueueMicrotask = globals2 && globals2.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream2) {
          reader._ownerReadableStream = stream2;
          stream2._reader = reader;
          if (stream2._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream2._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream2._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream2 = reader._ownerReadableStream;
          return ReadableStreamCancel(stream2, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject2(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject2(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream2) {
          return new ReadableStreamDefaultReader(stream2);
        }
        function ReadableStreamAddReadRequest(stream2, readRequest) {
          stream2._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream2, chunk, done) {
          const reader = stream2._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream2) {
          return stream2._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream2) {
          const reader = stream2._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream2) {
            assertRequiredArgument(stream2, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream2, "First parameter");
            if (IsReadableStreamLocked(stream2)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream2);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream2 = reader._ownerReadableStream;
          stream2._disturbed = true;
          if (stream2._state === "closed") {
            readRequest._closeSteps();
          } else if (stream2._state === "errored") {
            readRequest._errorSteps(stream2._storedError);
          } else {
            stream2._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask2(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream2, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream2);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream2 = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry8 = this._queue.shift();
              this._queueTotalSize -= entry8.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry8.buffer, entry8.byteOffset, entry8.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream2, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream2, pullIntoDescriptor) {
          let done = false;
          if (stream2._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream2, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream2, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream2 = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream2, readIntoRequest);
            return;
          }
          if (stream2._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream2, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream2 = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream2)) {
            while (ReadableStreamGetNumReadIntoRequests(stream2) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream2, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream2 = controller._controlledReadableByteStream;
          if (stream2._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream2) && ReadableStreamGetNumReadRequests(stream2) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream2) && ReadableStreamGetNumReadIntoRequests(stream2) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream2 = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream2._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream2);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream2 = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream2._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream2)) {
            if (ReadableStreamGetNumReadRequests(stream2) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream2, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream2)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream2 = controller._controlledReadableByteStream;
          if (stream2._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream2, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream2, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream2;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream2._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream2, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream2, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request2, controller, view) {
          request2._associatedReadableByteStreamController = controller;
          request2._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream2) {
          return new ReadableStreamBYOBReader(stream2);
        }
        function ReadableStreamAddReadIntoRequest(stream2, readIntoRequest) {
          stream2._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream2, chunk, done) {
          const reader = stream2._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream2) {
          return stream2._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream2) {
          const reader = stream2._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream2) {
            assertRequiredArgument(stream2, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream2, "First parameter");
            if (IsReadableStreamLocked(stream2)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream2._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream2);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream2 = reader._ownerReadableStream;
          stream2._disturbed = true;
          if (stream2._state === "errored") {
            readIntoRequest._errorSteps(stream2._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream2._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort2 = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write2 = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort2 === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort2, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write2 === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write2, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream2 {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream2.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream2) {
          return new WritableStreamDefaultWriter(stream2);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream2 = Object.create(WritableStream2.prototype);
          InitializeWritableStream(stream2);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream2, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream2;
        }
        function InitializeWritableStream(stream2) {
          stream2._state = "writable";
          stream2._storedError = void 0;
          stream2._writer = void 0;
          stream2._writableStreamController = void 0;
          stream2._writeRequests = new SimpleQueue();
          stream2._inFlightWriteRequest = void 0;
          stream2._closeRequest = void 0;
          stream2._inFlightCloseRequest = void 0;
          stream2._pendingAbortRequest = void 0;
          stream2._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream2;
        }
        function IsWritableStreamLocked(stream2) {
          if (stream2._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream2, reason) {
          var _a;
          if (stream2._state === "closed" || stream2._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream2._writableStreamController._abortReason = reason;
          (_a = stream2._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
          const state = stream2._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream2._pendingAbortRequest !== void 0) {
            return stream2._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream2._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream2._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream2, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream2) {
          const state = stream2._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream2._closeRequest = closeRequest;
          });
          const writer = stream2._writer;
          if (writer !== void 0 && stream2._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream2._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream2) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream2._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream2, error2) {
          const state = stream2._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream2, error2);
            return;
          }
          WritableStreamFinishErroring(stream2);
        }
        function WritableStreamStartErroring(stream2, reason) {
          const controller = stream2._writableStreamController;
          stream2._state = "erroring";
          stream2._storedError = reason;
          const writer = stream2._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream2) && controller._started) {
            WritableStreamFinishErroring(stream2);
          }
        }
        function WritableStreamFinishErroring(stream2) {
          stream2._state = "errored";
          stream2._writableStreamController[ErrorSteps]();
          const storedError = stream2._storedError;
          stream2._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream2._writeRequests = new SimpleQueue();
          if (stream2._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream2);
            return;
          }
          const abortRequest = stream2._pendingAbortRequest;
          stream2._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream2);
            return;
          }
          const promise = stream2._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream2);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream2);
          });
        }
        function WritableStreamFinishInFlightWrite(stream2) {
          stream2._inFlightWriteRequest._resolve(void 0);
          stream2._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream2, error2) {
          stream2._inFlightWriteRequest._reject(error2);
          stream2._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream2, error2);
        }
        function WritableStreamFinishInFlightClose(stream2) {
          stream2._inFlightCloseRequest._resolve(void 0);
          stream2._inFlightCloseRequest = void 0;
          const state = stream2._state;
          if (state === "erroring") {
            stream2._storedError = void 0;
            if (stream2._pendingAbortRequest !== void 0) {
              stream2._pendingAbortRequest._resolve();
              stream2._pendingAbortRequest = void 0;
            }
          }
          stream2._state = "closed";
          const writer = stream2._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream2, error2) {
          stream2._inFlightCloseRequest._reject(error2);
          stream2._inFlightCloseRequest = void 0;
          if (stream2._pendingAbortRequest !== void 0) {
            stream2._pendingAbortRequest._reject(error2);
            stream2._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream2, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream2) {
          if (stream2._closeRequest === void 0 && stream2._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream2) {
          if (stream2._inFlightWriteRequest === void 0 && stream2._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream2) {
          stream2._inFlightCloseRequest = stream2._closeRequest;
          stream2._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream2) {
          stream2._inFlightWriteRequest = stream2._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream2) {
          if (stream2._closeRequest !== void 0) {
            stream2._closeRequest._reject(stream2._storedError);
            stream2._closeRequest = void 0;
          }
          const writer = stream2._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream2._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream2, backpressure) {
          const writer = stream2._writer;
          if (writer !== void 0 && backpressure !== stream2._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream2._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream2) {
            assertRequiredArgument(stream2, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream2, "First parameter");
            if (IsWritableStreamLocked(stream2)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream2;
            stream2._writer = this;
            const state = stream2._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream2) && stream2._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream2._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream2._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream2 = this._ownerWritableStream;
            if (stream2 === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream2)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream2 = this._ownerWritableStream;
            if (stream2 === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream2 = writer._ownerWritableStream;
          return WritableStreamAbort(stream2, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream2 = writer._ownerWritableStream;
          return WritableStreamClose(stream2);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream2 = writer._ownerWritableStream;
          const state = stream2._state;
          if (WritableStreamCloseQueuedOrInFlight(stream2) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream2._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream2 = writer._ownerWritableStream;
          const state = stream2._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream2._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream2 = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream2._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream2 = writer._ownerWritableStream;
          const controller = stream2._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream2 !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream2._state;
          if (state === "errored") {
            return promiseRejectedWith(stream2._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream2) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream2._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream2);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream2, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream2;
          stream2._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream2, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream2, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream2, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream2, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream2 = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream2) && stream2._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream2, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream2 = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream2._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream2._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream2);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream2 = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream2);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream2);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream2, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream2 = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream2);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream2);
            const state = stream2._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream2) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream2, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream2._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream2, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream2 = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream2, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream2, promise, action) {
              if (stream2._state === "errored") {
                action(stream2._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream2, promise, action) {
              if (stream2._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream2 = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream2);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream2, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream2 = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream2) && ReadableStreamGetNumReadRequests(stream2) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream2 = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream2);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream2 = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream2) && ReadableStreamGetNumReadRequests(stream2) > 0) {
            ReadableStreamFulfillReadRequest(stream2, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream2 = controller._controlledReadableStream;
          if (stream2._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream2, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream2, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream2;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream2._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream2, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream2, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream2, cloneForBranch2) {
          if (IsReadableByteStreamController(stream2._readableStreamController)) {
            return ReadableByteStreamTee(stream2);
          }
          return ReadableStreamDefaultTee(stream2);
        }
        function ReadableStreamDefaultTee(stream2, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream2);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask2(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream2, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream2, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream2) {
          let reader = AcquireReadableStreamDefaultReader(stream2);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream2);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask2(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream2, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream2);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask2(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream2, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream2, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream2, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable3 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable3, "readable", "ReadableWritablePair");
          assertReadableStream(readable3, `${context} has member 'readable' that`);
          const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable2, "writable", "ReadableWritablePair");
          assertWritableStream(writable2, `${context} has member 'writable' that`);
          return { readable: readable3, writable: writable2 };
        }
        class ReadableStream3 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream3.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream3.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream3.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream3.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream2 = Object.create(ReadableStream3.prototype);
          InitializeReadableStream(stream2);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream2, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream2;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream2 = Object.create(ReadableStream3.prototype);
          InitializeReadableStream(stream2);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream2, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream2;
        }
        function InitializeReadableStream(stream2) {
          stream2._state = "readable";
          stream2._reader = void 0;
          stream2._storedError = void 0;
          stream2._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream3;
        }
        function IsReadableStreamLocked(stream2) {
          if (stream2._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream2, reason) {
          stream2._disturbed = true;
          if (stream2._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream2._state === "errored") {
            return promiseRejectedWith(stream2._storedError);
          }
          ReadableStreamClose(stream2);
          const reader = stream2._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream2._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop3);
        }
        function ReadableStreamClose(stream2) {
          stream2._state = "closed";
          const reader = stream2._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream2, e2) {
          stream2._state = "errored";
          stream2._storedError = e2;
          const reader = stream2._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        try {
          Object.defineProperty(byteLengthSizeFunction, "name", {
            value: "size",
            configurable: true
          });
        } catch (_a) {
        }
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        try {
          Object.defineProperty(countSizeFunction, "name", {
            value: "size",
            configurable: true
          });
        } catch (_a) {
        }
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream2 {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream2.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream2, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream2, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream2, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream2);
          }
          stream2._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream2);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream2, reason);
            return promiseResolvedWith(void 0);
          }
          stream2._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream2._backpressure = void 0;
          stream2._backpressureChangePromise = void 0;
          stream2._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream2, true);
          stream2._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream2;
        }
        function TransformStreamError(stream2, e2) {
          ReadableStreamDefaultControllerError(stream2._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream2, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream2, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream2._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream2._writable._writableStreamController, e2);
          if (stream2._backpressure) {
            TransformStreamSetBackpressure(stream2, false);
          }
        }
        function TransformStreamSetBackpressure(stream2, backpressure) {
          if (stream2._backpressureChangePromise !== void 0) {
            stream2._backpressureChangePromise_resolve();
          }
          stream2._backpressureChangePromise = newPromise((resolve2) => {
            stream2._backpressureChangePromise_resolve = resolve2;
          });
          stream2._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream2, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream2;
          stream2._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream2, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream2, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream2 = controller._controlledTransformStream;
          const readableController = stream2._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream2, e2);
            throw stream2._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream2._backpressure) {
            TransformStreamSetBackpressure(stream2, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream2 = controller._controlledTransformStream;
          const readableController = stream2._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream2, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream2, chunk) {
          const controller = stream2._transformStreamController;
          if (stream2._backpressure) {
            const backpressureChangePromise = stream2._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable2 = stream2._writable;
              const state = writable2._state;
              if (state === "erroring") {
                throw writable2._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream2, reason) {
          TransformStreamError(stream2, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream2) {
          const readable3 = stream2._readable;
          const controller = stream2._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable3._state === "errored") {
              throw readable3._storedError;
            }
            ReadableStreamDefaultControllerClose(readable3._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream2, r2);
            throw readable3._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream2) {
          TransformStreamSetBackpressure(stream2, false);
          return stream2._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream3;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream2;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream2;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob4 } = require("buffer");
      if (Blob4 && !Blob4.prototype.stream) {
        Blob4.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = class Blob2 {
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder3 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob2) {
            part = element;
          } else {
            part = encoder3.encode(`${element}`);
          }
          const size = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (size) {
            this.#size += size;
            this.#parts.push(part);
          }
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob2([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob3 = _Blob;
    Blob$12 = Blob3;
    _File = class File3 extends Blob$12 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof Blob$12 && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File2 = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File2([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData2 = class FormData3 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    (0, import_node_util.promisify)(import_node_stream.default.pipeline);
    INTERNALS$1 = Symbol("Body internals");
    Body = class {
      constructor(body2, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body2 === null) {
          body2 = null;
        } else if (isURLSearchParameters(body2)) {
          body2 = import_node_buffer.Buffer.from(body2.toString());
        } else if (isBlob(body2))
          ;
        else if (import_node_buffer.Buffer.isBuffer(body2))
          ;
        else if (import_node_util.types.isAnyArrayBuffer(body2)) {
          body2 = import_node_buffer.Buffer.from(body2);
        } else if (ArrayBuffer.isView(body2)) {
          body2 = import_node_buffer.Buffer.from(body2.buffer, body2.byteOffset, body2.byteLength);
        } else if (body2 instanceof import_node_stream.default)
          ;
        else if (body2 instanceof FormData2) {
          body2 = formDataToBlob(body2);
          boundary = body2.type.split("=")[1];
        } else {
          body2 = import_node_buffer.Buffer.from(String(body2));
        }
        let stream2 = body2;
        if (import_node_buffer.Buffer.isBuffer(body2)) {
          stream2 = import_node_stream.default.Readable.from(body2);
        } else if (isBlob(body2)) {
          stream2 = import_node_stream.default.Readable.from(body2.stream());
        }
        this[INTERNALS$1] = {
          body: body2,
          stream: stream2,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body2 instanceof import_node_stream.default) {
          body2.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$1].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$1].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$1].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData2();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$1].body && this[INTERNALS$1].body.type || "";
        const buf = await this.arrayBuffer();
        return new Blob$12([buf], {
          type: ct
        });
      }
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      async text() {
        const buffer = await consumeBody(this);
        return new TextDecoder().decode(buffer);
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: (0, import_node_util.deprecate)(() => {
      }, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body: body2 } = instance[INTERNALS$1];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body2 instanceof import_node_stream.default && typeof body2.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body2.pipe(p1);
        body2.pipe(p2);
        instance[INTERNALS$1].stream = p1;
        body2 = p2;
      }
      return body2;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body2) => body2.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body2, request2) => {
      if (body2 === null) {
        return null;
      }
      if (typeof body2 === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body2)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body2)) {
        return body2.type || null;
      }
      if (import_node_buffer.Buffer.isBuffer(body2) || import_node_util.types.isAnyArrayBuffer(body2) || ArrayBuffer.isView(body2)) {
        return null;
      }
      if (body2 instanceof FormData2) {
        return `multipart/form-data; boundary=${request2[INTERNALS$1].boundary}`;
      }
      if (body2 && typeof body2.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body2)}`;
      }
      if (body2 instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    validateHeaderName2 = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue2 = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers3 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers3) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName2(name);
          validateHeaderValue2(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName2(name);
                  validateHeaderValue2(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName2(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers3.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    doBadDataWarn = (0, import_node_util.deprecate)(() => {
    }, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
    Request$12 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init2.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if ("data" in init2) {
          doBadDataWarn();
        }
        if ((init2.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers2 = new Headers3(init2.headers || input.headers || {});
        if (inputBody !== null && !headers2.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers2.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers: headers2,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy2) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy2);
      }
      clone() {
        return new Request$12(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request$12.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
  }
});

// .svelte-kit/output/server/chunks/index-c5e2452c.js
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css15) => css15.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
var current_component, escaped, missing_component, on_destroy;
var init_index_c5e2452c = __esm({
  ".svelte-kit/output/server/chunks/index-c5e2452c.js"() {
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-1c45ba0b.js
var hooks_1c45ba0b_exports = {};
var init_hooks_1c45ba0b = __esm({
  ".svelte-kit/output/server/chunks/hooks-1c45ba0b.js"() {
  }
});

// .svelte-kit/output/server/entries/fallbacks/layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/layout.svelte.js"() {
    init_index_c5e2452c();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css,
  entry: () => entry,
  index: () => index,
  js: () => js,
  module: () => layout_svelte_exports
});
var index, entry, js, css;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    index = 0;
    entry = "layout.svelte-d08cc9cd.js";
    js = ["layout.svelte-d08cc9cd.js", "chunks/index-b83f0d2a.js"];
    css = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_c5e2452c();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css2,
  entry: () => entry2,
  index: () => index2,
  js: () => js2,
  module: () => error_svelte_exports
});
var index2, entry2, js2, css2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    index2 = 1;
    entry2 = "error.svelte-9e17dc01.js";
    js2 = ["error.svelte-9e17dc01.js", "chunks/index-b83f0d2a.js"];
    css2 = [];
  }
});

// .svelte-kit/output/server/chunks/index.es-638ce7e7.js
function joinCss(obj, separator = ";") {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text) => text);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}
function getStyles(style, size, pull, fw) {
  let float;
  let width;
  const height = "1em";
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = "-.125em";
  const overflow = "visible";
  if (fw) {
    textAlign = "center";
    width = "1.25em";
  }
  if (pull) {
    float = pull;
  }
  if (size) {
    if (size == "lg") {
      fontSize = "1.33333em";
      lineHeight = ".75em";
      verticalAlign = "-.225em";
    } else if (size == "xs") {
      fontSize = ".75em";
    } else if (size == "sm") {
      fontSize = ".875em";
    } else {
      fontSize = size.replace("x", "em");
    }
  }
  return joinCss([
    joinCss({
      float,
      width,
      height,
      "line-height": lineHeight,
      "font-size": fontSize,
      "text-align": textAlign,
      "vertical-align": verticalAlign,
      "transform-origin": "center",
      overflow
    }),
    style
  ]);
}
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip) {
    if (flip == "horizontal") {
      flipX = -1;
    } else if (flip == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  return joinCss([
    `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
    `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
    rotate && `rotate(${rotate}${rotateUnit})`
  ], " ");
}
var parseNumber, faFacebook, faInstagram, faWhatsapp;
var init_index_es_638ce7e7 = __esm({
  ".svelte-kit/output/server/chunks/index.es-638ce7e7.js"() {
    parseNumber = parseFloat;
    faFacebook = {
      prefix: "fab",
      iconName: "facebook",
      icon: [512, 512, [62e3], "f09a", "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.69 226.4 209.3 245V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.3 482.4 504 379.8 504 256z"]
    };
    faInstagram = {
      prefix: "fab",
      iconName: "instagram",
      icon: [448, 512, [], "f16d", "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"]
    };
    faWhatsapp = {
      prefix: "fab",
      iconName: "whatsapp",
      icon: [448, 512, [], "f232", "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"]
    };
  }
});

// .svelte-kit/output/server/chunks/WhatsappButton-9d53bed0.js
var css$3, Header, css$2, Fa, Fa$1, faAddressBook, faComments, faEnvelope, faFilm, faGift, faHeart, faImages, faMapLocation, faMusic, faStopwatch20, faXmark, css$1, Footer, css3, WhatsappButton;
var init_WhatsappButton_9d53bed0 = __esm({
  ".svelte-kit/output/server/chunks/WhatsappButton-9d53bed0.js"() {
    init_index_c5e2452c();
    init_index_es_638ce7e7();
    css$3 = {
      code: 'header.svelte-uuigre.svelte-uuigre{position:fixed;width:100vw;top:0;z-index:999;height:4rem;background-color:var(--background)}.container.svelte-uuigre.svelte-uuigre{display:flex;justify-content:space-between;align-items:center;height:100%;padding-inline:3rem}.logo.svelte-uuigre.svelte-uuigre{font-family:"cano", sans-serif;color:var(--primary);font-size:1.8rem}ul.svelte-uuigre.svelte-uuigre{display:flex;justify-content:center;align-items:center;gap:1rem}.mobile-menu.svelte-uuigre.svelte-uuigre{display:none}li.active.svelte-uuigre a.svelte-uuigre,li.active.svelte-uuigre a.svelte-uuigre:hover{color:var(--primary)}.mobile-toggle.svelte-uuigre.svelte-uuigre{display:none}@media screen and (max-width: 768px){header.svelte-uuigre.svelte-uuigre{border-bottom:1px solid var(--border-color);position:fixed;top:0;left:0;width:100vw}.container.svelte-uuigre.svelte-uuigre{padding-inline:1rem }.mobile-toggle.svelte-uuigre.svelte-uuigre{display:block;width:21px;height:24px;position:relative;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.5s ease-in-out;-moz-transition:.5s ease-in-out;-o-transition:.5s ease-in-out;transition:.5s ease-in-out;cursor:pointer}.mobile-toggle.svelte-uuigre span.svelte-uuigre{display:block;position:absolute;height:3px;width:100%;background:var(--primary);border-radius:9px;opacity:1;left:0;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.25s ease-in-out;-moz-transition:.25s ease-in-out;-o-transition:.25s ease-in-out;transition:.25s ease-in-out}.mobile-toggle.svelte-uuigre span.svelte-uuigre:nth-child(1){top:0}.mobile-toggle.svelte-uuigre span.svelte-uuigre:nth-child(2),.mobile-toggle.svelte-uuigre span.svelte-uuigre:nth-child(3){top:8px}.mobile-toggle.svelte-uuigre span.svelte-uuigre:nth-child(4){top:16px}.mobile-toggle.open.svelte-uuigre span.svelte-uuigre:nth-child(1){top:8px;width:0%;left:50%}.mobile-toggle.open.svelte-uuigre span.svelte-uuigre:nth-child(2){-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.mobile-toggle.open.svelte-uuigre span.svelte-uuigre:nth-child(3){-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}.mobile-toggle.open.svelte-uuigre span.svelte-uuigre:nth-child(4){top:8px;width:0%;left:50%}nav.svelte-uuigre.svelte-uuigre{position:fixed;width:100vw;top:4rem;left:0;padding-block:1rem;transform:translateX(100%);opacity:0;transition:0.3s ease-in-out;pointer-events:none;padding:1rem}nav.show.svelte-uuigre.svelte-uuigre{transform:translateX(0);opacity:1;background-color:var(--background);pointer-events:all}ul.svelte-uuigre.svelte-uuigre{flex-direction:column}.mobile-menu.svelte-uuigre.svelte-uuigre{display:flex;margin-top:1rem}.mobile-menu.svelte-uuigre .order.svelte-uuigre{background:var(--primary-gradient);color:whitesmoke;padding:8px 8px;border-radius:0.5rem;cursor:pointer}}',
      map: null
    };
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$3);
      return `<header class="${"svelte-uuigre"}"><div class="${"container svelte-uuigre"}"><a href="${"/"}" class="${"logo svelte-uuigre"}">dinvite</a>
        <div class="${"mobile-toggle " + escape("") + " svelte-uuigre"}"><span class="${"svelte-uuigre"}"></span>
            <span class="${"svelte-uuigre"}"></span>
            <span class="${"svelte-uuigre"}"></span>
            <span class="${"svelte-uuigre"}"></span></div>
        <nav class="${escape(null_to_empty("")) + " svelte-uuigre"}"><ul class="${"svelte-uuigre"}"><li class="${escape(null_to_empty("active")) + " svelte-uuigre"}"><a href="${"/"}" class="${"svelte-uuigre"}">Home</a></li>
                <li class="${escape(null_to_empty("")) + " svelte-uuigre"}"><a href="${"/tema"}" class="${"svelte-uuigre"}">Tema</a></li>
                <li class="${escape(null_to_empty("")) + " svelte-uuigre"}"><a href="${"/harga"}" class="${"svelte-uuigre"}">Harga</a></li>
                <li class="${escape(null_to_empty("")) + " svelte-uuigre"}"><a href="${"/blog"}" class="${"svelte-uuigre"}">Blog</a></li></ul>
            <ul class="${"mobile-menu svelte-uuigre"}"><li><a href="${"/"}">Syarat &amp; Ketentuan</a></li>
                <li><a href="${"/"}">Tentang Kami</a></li>
                <li><a href="${"/"}">Kebijakan Privasi</a></li>
                <li><a href="${"/"}">FAQ</a></li>
                <li><a class="${"order svelte-uuigre"}" href="${"/"}">Pesan Sekarang</a></li></ul></nav></div>
    
</header>`;
    });
    css$2 = {
      code: ".spin.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 2s 0s infinite linear}.pulse.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 1s infinite steps(8)}@keyframes svelte-1cj2gr0-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
      map: null
    };
    Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { class: clazz = "" } = $$props;
      let { id = "" } = $$props;
      let { style: style2 = "" } = $$props;
      let { icon } = $$props;
      let { size = "" } = $$props;
      let { color = "" } = $$props;
      let { fw = false } = $$props;
      let { pull = "" } = $$props;
      let { scale = 1 } = $$props;
      let { translateX = 0 } = $$props;
      let { translateY = 0 } = $$props;
      let { rotate = "" } = $$props;
      let { flip = false } = $$props;
      let { spin = false } = $$props;
      let { pulse = false } = $$props;
      let { primaryColor = "" } = $$props;
      let { secondaryColor = "" } = $$props;
      let { primaryOpacity = 1 } = $$props;
      let { secondaryOpacity = 0.4 } = $$props;
      let { swapOpacity = false } = $$props;
      let i2;
      let s3;
      let transform;
      if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
        $$bindings.class(clazz);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.style === void 0 && $$bindings.style && style2 !== void 0)
        $$bindings.style(style2);
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0)
        $$bindings.fw(fw);
      if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0)
        $$bindings.pull(pull);
      if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
        $$bindings.scale(scale);
      if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0)
        $$bindings.translateX(translateX);
      if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0)
        $$bindings.translateY(translateY);
      if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
        $$bindings.rotate(rotate);
      if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0)
        $$bindings.flip(flip);
      if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
        $$bindings.spin(spin);
      if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0)
        $$bindings.pulse(pulse);
      if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0)
        $$bindings.primaryColor(primaryColor);
      if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0)
        $$bindings.secondaryColor(secondaryColor);
      if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0)
        $$bindings.primaryOpacity(primaryOpacity);
      if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0)
        $$bindings.secondaryOpacity(secondaryOpacity);
      if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0)
        $$bindings.swapOpacity(swapOpacity);
      $$result.css.add(css$2);
      i2 = icon && icon.icon || [0, 0, "", [], ""];
      s3 = getStyles(style2, size, pull, fw);
      transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
      return `${i2[4] ? `<svg${add_attribute("id", id, 0)} class="${[
        "svelte-fa " + escape(clazz) + " svelte-1cj2gr0",
        (pulse ? "pulse" : "") + " " + (spin ? "spin" : "")
      ].join(" ").trim()}"${add_attribute("style", s3, 0)} viewBox="${"0 0 " + escape(i2[0]) + " " + escape(i2[1])}" aria-hidden="${"true"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}"><g transform="${"translate(" + escape(i2[0] / 2) + " " + escape(i2[1] / 2) + ")"}" transform-origin="${escape(i2[0] / 4) + " 0"}"><g${add_attribute("transform", transform, 0)}>${typeof i2[4] == "string" ? `<path${add_attribute("d", i2[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(" + escape(i2[0] / -2) + " " + escape(i2[1] / -2) + ")"}"></path>` : `
          <path${add_attribute("d", i2[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(" + escape(i2[0] / -2) + " " + escape(i2[1] / -2) + ")"}"></path>
          <path${add_attribute("d", i2[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(" + escape(i2[0] / -2) + " " + escape(i2[1] / -2) + ")"}"></path>`}</g></g></svg>` : ``}`;
    });
    Fa$1 = Fa;
    faAddressBook = {
      prefix: "fas",
      iconName: "address-book",
      icon: [512, 512, [62138, "contact-book"], "f2b9", "M384 0H96C60.65 0 32 28.65 32 64v384c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM240 128c35.35 0 64 28.65 64 64s-28.65 64-64 64c-35.34 0-64-28.65-64-64S204.7 128 240 128zM336 384h-192C135.2 384 128 376.8 128 368C128 323.8 163.8 288 208 288h64c44.18 0 80 35.82 80 80C352 376.8 344.8 384 336 384zM496 64H480v96h16C504.8 160 512 152.8 512 144v-64C512 71.16 504.8 64 496 64zM496 192H480v96h16C504.8 288 512 280.8 512 272v-64C512 199.2 504.8 192 496 192zM496 320H480v96h16c8.836 0 16-7.164 16-16v-64C512 327.2 504.8 320 496 320z"]
    };
    faComments = {
      prefix: "fas",
      iconName: "comments",
      icon: [640, 512, [61670, 128490], "f086", "M416 176C416 78.8 322.9 0 208 0S0 78.8 0 176c0 39.57 15.62 75.96 41.67 105.4c-16.39 32.76-39.23 57.32-39.59 57.68c-2.1 2.205-2.67 5.475-1.441 8.354C1.9 350.3 4.602 352 7.66 352c38.35 0 70.76-11.12 95.74-24.04C134.2 343.1 169.8 352 208 352C322.9 352 416 273.2 416 176zM599.6 443.7C624.8 413.9 640 376.6 640 336C640 238.8 554 160 448 160c-.3145 0-.6191 .041-.9336 .043C447.5 165.3 448 170.6 448 176c0 98.62-79.68 181.2-186.1 202.5C282.7 455.1 357.1 512 448 512c33.69 0 65.32-8.008 92.85-21.98C565.2 502 596.1 512 632.3 512c3.059 0 5.76-1.725 7.02-4.605c1.229-2.879 .6582-6.148-1.441-8.354C637.6 498.7 615.9 475.3 599.6 443.7z"]
    };
    faEnvelope = {
      prefix: "fas",
      iconName: "envelope",
      icon: [512, 512, [128386, 61443, 9993], "f0e0", "M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"]
    };
    faFilm = {
      prefix: "fas",
      iconName: "film",
      icon: [512, 512, [127902], "f008", "M463.1 32h-416C21.49 32-.0001 53.49-.0001 80v352c0 26.51 21.49 48 47.1 48h416c26.51 0 48-21.49 48-48v-352C511.1 53.49 490.5 32 463.1 32zM111.1 408c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 408zM111.1 280c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM111.1 152c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 152zM351.1 400c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V400zM351.1 208c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V208zM463.1 408c0 4.418-3.582 8-8 8h-47.1c-4.418 0-7.1-3.582-7.1-8l0-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V408zM463.1 280c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM463.1 152c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8l0-48c0-4.418 3.582-8 7.1-8h47.1c4.418 0 8 3.582 8 8V152z"]
    };
    faGift = {
      prefix: "fas",
      iconName: "gift",
      icon: [512, 512, [127873], "f06b", "M152 0H154.2C186.1 0 215.7 16.91 231.9 44.45L256 85.46L280.1 44.45C296.3 16.91 325.9 0 357.8 0H360C408.6 0 448 39.4 448 88C448 102.4 444.5 115.1 438.4 128H480C497.7 128 512 142.3 512 160V224C512 241.7 497.7 256 480 256H32C14.33 256 0 241.7 0 224V160C0 142.3 14.33 128 32 128H73.6C67.46 115.1 64 102.4 64 88C64 39.4 103.4 0 152 0zM190.5 68.78C182.9 55.91 169.1 48 154.2 48H152C129.9 48 112 65.91 112 88C112 110.1 129.9 128 152 128H225.3L190.5 68.78zM360 48H357.8C342.9 48 329.1 55.91 321.5 68.78L286.7 128H360C382.1 128 400 110.1 400 88C400 65.91 382.1 48 360 48V48zM32 288H224V512H80C53.49 512 32 490.5 32 464V288zM288 512V288H480V464C480 490.5 458.5 512 432 512H288z"]
    };
    faHeart = {
      prefix: "fas",
      iconName: "heart",
      icon: [512, 512, [128153, 128154, 128155, 128156, 128420, 129293, 129294, 129505, 10084, 61578, 9829], "f004", "M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"]
    };
    faImages = {
      prefix: "fas",
      iconName: "images",
      icon: [576, 512, [], "f302", "M528 32H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48H528c26.51 0 48-21.49 48-48v-256C576 53.49 554.5 32 528 32zM223.1 96c17.68 0 32 14.33 32 32S241.7 160 223.1 160c-17.67 0-32-14.33-32-32S206.3 96 223.1 96zM494.1 311.6C491.3 316.8 485.9 320 480 320H192c-6.023 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.332-16.68l70-96C252.1 194.4 256.9 192 262 192c5.111 0 9.916 2.441 12.93 6.574l22.35 30.66l62.74-94.11C362.1 130.7 367.1 128 373.3 128c5.348 0 10.34 2.672 13.31 7.125l106.7 160C496.6 300 496.9 306.3 494.1 311.6zM456 432H120c-39.7 0-72-32.3-72-72v-240C48 106.8 37.25 96 24 96S0 106.8 0 120v240C0 426.2 53.83 480 120 480h336c13.25 0 24-10.75 24-24S469.3 432 456 432z"]
    };
    faMapLocation = {
      prefix: "fas",
      iconName: "map-location",
      icon: [576, 512, ["map-marked"], "f59f", "M273.2 311.1C241.1 271.9 167.1 174.6 167.1 120C167.1 53.73 221.7 0 287.1 0C354.3 0 408 53.73 408 120C408 174.6 334.9 271.9 302.8 311.1C295.1 321.6 280.9 321.6 273.2 311.1V311.1zM416 503V200.4C419.5 193.5 422.7 186.7 425.6 179.8C426.1 178.6 426.6 177.4 427.1 176.1L543.1 129.7C558.9 123.4 576 135 576 152V422.8C576 432.6 570 441.4 560.9 445.1L416 503zM15.09 187.3L137.6 138.3C140 152.5 144.9 166.6 150.4 179.8C153.3 186.7 156.5 193.5 160 200.4V451.8L32.91 502.7C17.15 508.1 0 497.4 0 480.4V209.6C0 199.8 5.975 190.1 15.09 187.3H15.09zM384 504.3L191.1 449.4V255C212.5 286.3 234.3 314.6 248.2 331.1C268.7 357.6 307.3 357.6 327.8 331.1C341.7 314.6 363.5 286.3 384 255L384 504.3z"]
    };
    faMusic = {
      prefix: "fas",
      iconName: "music",
      icon: [512, 512, [127925], "f001", "M511.1 367.1c0 44.18-42.98 80-95.1 80s-95.1-35.82-95.1-79.1c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32.01 4.898V148.1L192 224l-.0023 208.1C191.1 476.2 149 512 95.1 512S0 476.2 0 432c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32 4.898V126.5c0-12.97 10.06-26.63 22.41-30.52l319.1-94.49C472.1 .6615 477.3 0 480 0c17.66 0 31.97 14.34 32 31.99L511.1 367.1z"]
    };
    faStopwatch20 = {
      prefix: "fas",
      iconName: "stopwatch-20",
      icon: [448, 512, [], "e06f", "M276 256C276 249.4 281.4 244 288 244C294.6 244 300 249.4 300 256V352C300 358.6 294.6 364 288 364C281.4 364 276 358.6 276 352V256zM272 0C289.7 0 304 14.33 304 32C304 49.67 289.7 64 272 64H256V98.45C293.5 104.2 327.7 120 355.7 143L377.4 121.4C389.9 108.9 410.1 108.9 422.6 121.4C435.1 133.9 435.1 154.1 422.6 166.6L398.5 190.8C419.7 223.3 432 262.2 432 304C432 418.9 338.9 512 224 512C109.1 512 16 418.9 16 304C16 200 92.32 113.8 192 98.45V64H176C158.3 64 144 49.67 144 32C144 14.33 158.3 0 176 0L272 0zM288 204C259.3 204 236 227.3 236 256V352C236 380.7 259.3 404 288 404C316.7 404 340 380.7 340 352V256C340 227.3 316.7 204 288 204zM172 256.5V258.8C172 262.4 170.7 265.9 168.3 268.6L129.2 312.5C115.5 327.9 108 347.8 108 368.3V384C108 395 116.1 404 128 404H192C203 404 212 395 212 384C212 372.1 203 364 192 364H148.2C149.1 354.8 152.9 346.1 159.1 339.1L198.2 295.2C207.1 285.1 211.1 272.2 211.1 258.8V256.5C211.1 227.5 188.5 204 159.5 204C136.8 204 116.8 218.5 109.6 239.9L109 241.7C105.5 252.2 111.2 263.5 121.7 266.1C132.2 270.5 143.5 264.8 146.1 254.3L147.6 252.6C149.3 247.5 154.1 244 159.5 244C166.4 244 171.1 249.6 171.1 256.5L172 256.5z"]
    };
    faXmark = {
      prefix: "fas",
      iconName: "xmark",
      icon: [320, 512, [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], "f00d", "M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"]
    };
    css$1 = {
      code: `.top.svelte-6q47zx.svelte-6q47zx.svelte-6q47zx{background:var(--primary-gradient);text-align:center;padding-block:1rem}.top.svelte-6q47zx p.svelte-6q47zx.svelte-6q47zx{color:whitesmoke;font-weight:400}.top.svelte-6q47zx button.svelte-6q47zx.svelte-6q47zx{all:unset;color:whitesmoke;padding:5px 8px;border-radius:0.5rem;border:none;cursor:pointer;margin-right:1rem;margin-top:1rem;background:#ecb62e;color:inherit}.bottom.svelte-6q47zx.svelte-6q47zx.svelte-6q47zx{text-align:center}.bottom.svelte-6q47zx p.svelte-6q47zx.svelte-6q47zx{font-size:14px}.socials.svelte-6q47zx.svelte-6q47zx.svelte-6q47zx{display:flex;justify-content:center;align-items:center;gap:1rem;margin-block:1rem}.socials.svelte-6q47zx a.svelte-6q47zx.svelte-6q47zx{background:var(--primary-gradient);width:2rem;height:2rem;display:grid;place-items:center;color:whitesmoke;border-radius:50%}.menu.svelte-6q47zx.svelte-6q47zx.svelte-6q47zx{display:flex;justify-content:center;align-items:center;gap:1rem;margin-bottom:1rem}.menu.svelte-6q47zx a.svelte-6q47zx.svelte-6q47zx:hover{color:var(--primary)}.menu.svelte-6q47zx a.svelte-6q47zx.svelte-6q47zx::after{content:"|";margin:0 1rem;color:#464646}.menu.svelte-6q47zx li.svelte-6q47zx:last-child a.svelte-6q47zx::after{content:''}@media screen and (max-width: 768px){.container.svelte-6q47zx.svelte-6q47zx.svelte-6q47zx{text-align:left}.menu.svelte-6q47zx.svelte-6q47zx.svelte-6q47zx{align-items:flex-start;flex-direction:column}.menu.svelte-6q47zx a.svelte-6q47zx.svelte-6q47zx::after{content:''}.socials.svelte-6q47zx.svelte-6q47zx.svelte-6q47zx{justify-content:flex-start}.bottom.svelte-6q47zx p.svelte-6q47zx.svelte-6q47zx:last-child{text-align:center}}`,
      map: null
    };
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$1);
      return `<footer><div class="${"top svelte-6q47zx"}"><div class="${"container svelte-6q47zx"}"><p class="${"svelte-6q47zx"}">Terima kasih untuk kamu yang sudah membaca isi dari website ini. Semoga kita dapat berbincang lebih lanjut.</p>
            <button class="${"svelte-6q47zx"}">Hubungi Kami</button></div></div>
    <div class="${"bottom svelte-6q47zx"}"><div class="${"container svelte-6q47zx"}"><p class="${"svelte-6q47zx"}">Lebih dekat dengan kami :</p>
            <ul class="${"socials svelte-6q47zx"}"><li class="${"svelte-6q47zx"}"><a href="${"/"}" class="${"svelte-6q47zx"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faFacebook }, {}, {})}</a></li>
                <li class="${"svelte-6q47zx"}"><a href="${"/"}" class="${"svelte-6q47zx"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faInstagram }, {}, {})}</a></li>
                <li class="${"svelte-6q47zx"}"><a href="${"/"}" class="${"svelte-6q47zx"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faWhatsapp }, {}, {})}</a></li>
                <li class="${"svelte-6q47zx"}"><a href="${"/"}" class="${"svelte-6q47zx"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faEnvelope }, {}, {})}</a></li></ul>
            <ul class="${"menu svelte-6q47zx"}"><li><a href="${"/"}" class="${"svelte-6q47zx"}">Syarat &amp; Ketentuan</a></li>
                <li><a href="${"/"}" class="${"svelte-6q47zx"}">Tentang Kami</a></li>
                <li><a href="${"/"}" class="${"svelte-6q47zx"}">Kebijakan Privasi</a></li>
                <li><a href="${"/"}" class="${"svelte-6q47zx"}">FAQ</a></li></ul>
            <p class="${"svelte-6q47zx"}">Copyright 2021 - ${escape(new Date().getFullYear())} | <a href="${"/"}"><strong style="${"color: var(--primary)"}">dinvite.id</strong></a> Jasa pembuatan
            undangan
            digital website - All rights reserved. <br> self-developed by
            <strong style="${"color: #666666"}">diditamin.m </strong>from Luwuk Banggai.
        </p></div></div>
</footer>`;
    });
    css3 = {
      code: '.whatsapp-button.svelte-l0ie32.svelte-l0ie32{position:fixed;bottom:1rem;right:1rem;z-index:999;width:100vw}.icon.svelte-l0ie32.svelte-l0ie32{width:3rem;height:3rem;background-color:#4dc247;position:absolute;right:0;bottom:0;display:grid;place-items:center;font-size:1.8rem;color:whitesmoke;border-radius:50%;cursor:pointer}.container.svelte-l0ie32.svelte-l0ie32{position:absolute;bottom:3.5rem;right:0;width:100vw;max-width:360px;box-shadow:-2px 2px 10px rgb(0 0 0 / 25%);border-radius:12px;overflow-x:hidden;transform:translateY(150%);opacity:0;transition:all 0.35s ease-in-out;z-index:1;padding:0}.container.show.svelte-l0ie32.svelte-l0ie32{transform:translateY(0);opacity:1}.head.svelte-l0ie32.svelte-l0ie32{background:#0a5f54;padding:25px 20px;display:flex;align-items:center;position:relative}.close-icon.svelte-l0ie32.svelte-l0ie32{position:absolute;top:10px;right:1rem;color:whitesmoke;cursor:pointer}.avatar.svelte-l0ie32.svelte-l0ie32{width:50px;height:50px;margin-right:20px;border-radius:25px;background-color:var(--background-variant);display:grid;place-items:center;position:relative}.avatar.svelte-l0ie32.svelte-l0ie32::before{content:"";width:0.8rem;height:0.8rem;background-color:#4dc247;position:absolute;top:0;right:0;border-radius:50%}.avatar.svelte-l0ie32 img.svelte-l0ie32{width:65%;height:65%;object-fit:cover}.head.svelte-l0ie32 .text.svelte-l0ie32{color:whitesmoke}.head.svelte-l0ie32 h4.svelte-l0ie32{font-weight:bold;font-size:1.1rem}.head.svelte-l0ie32 p.svelte-l0ie32{font-size:0.8rem}.body.svelte-l0ie32.svelte-l0ie32{background-image:url(https://katsudoto.id/media/kat/bg-wa-box-fix.jpg);background-position:center;background-size:cover;padding:10px 20px}.chat.svelte-l0ie32.svelte-l0ie32{background-color:whitesmoke;margin:10px 0;padding:10px 15px;border-radius:12px;display:inline-block;text-align:left}.nickname.svelte-l0ie32.svelte-l0ie32{color:#00000075;font-size:14px;margin-bottom:5px;font-weight:700}.chat.svelte-l0ie32 .text.svelte-l0ie32{color:#111;font-size:15px;line-height:1.5}.footer.svelte-l0ie32.svelte-l0ie32{background:#fff;padding:20px;text-align:center}.footer.svelte-l0ie32 .send.svelte-l0ie32{background:#4dc247;padding:10px;display:flex;align-items:center;justify-content:center;text-decoration:none;text-align:center;color:#fff;border-radius:50px;margin-bottom:10px;gap:0.5rem}.footer.svelte-l0ie32 p.svelte-l0ie32{font-size:13px;color:#636363;font-style:italic;display:inline-block}@media screen and (max-width: 768px){.container.svelte-l0ie32.svelte-l0ie32{left:1.5rem}}',
      map: null
    };
    WhatsappButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css3);
      return `<div class="${"whatsapp-button svelte-l0ie32"}"><div class="${"icon svelte-l0ie32"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faWhatsapp }, {}, {})}</div>
    <div class="${"container " + escape("") + " svelte-l0ie32"}"><div class="${"head svelte-l0ie32"}"><div class="${"close-icon svelte-l0ie32"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faXmark }, {}, {})}</div>
            <div class="${"avatar svelte-l0ie32"}"><img src="${"/images/dinvite.png"}" alt="${""}" class="${"svelte-l0ie32"}"></div>
            <div class="${"text svelte-l0ie32"}"><h4 class="${"svelte-l0ie32"}">dinvite</h4>
                <p class="${"svelte-l0ie32"}">online</p></div></div>
        <div class="${"body svelte-l0ie32"}"><div class="${"chat svelte-l0ie32"}"><div class="${"nickname svelte-l0ie32"}">dinvite</div>
                <div class="${"text svelte-l0ie32"}">Hai kak, <br> Ada yang bisa kami bantu.?</div></div></div>
        <div class="${"footer svelte-l0ie32"}"><a class="${"send svelte-l0ie32"}" href="${"https://wa.me/6281354911647"}" target="${"_blank"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faWhatsapp }, {}, {})} Start Chat</a>
            <p class="${"svelte-l0ie32"}">\u26A1 by
                <a href="${"/"}" target="${"_blank"}">dinvite.id</a></p></div></div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/Pricelist-f607e4bc.js
var css4, Pricelist;
var init_Pricelist_f607e4bc = __esm({
  ".svelte-kit/output/server/chunks/Pricelist-f607e4bc.js"() {
    init_index_c5e2452c();
    css4 = {
      code: 'section.svelte-usggce.svelte-usggce{background-color:var(--background-variant);position:relative;margin-top:-10px}h1.svelte-usggce.svelte-usggce{text-align:center}p.svelte-usggce.svelte-usggce{margin-bottom:1rem;text-align:center}.packages.svelte-usggce.svelte-usggce{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-top:2rem;padding-inline:8rem}.package.svelte-usggce.svelte-usggce{padding:1rem;border-radius:10px;border:1px solid #bebebe;position:relative;overflow:hidden}.head.svelte-usggce.svelte-usggce{position:absolute;background:var(--primary-gradient);width:100%;height:3rem;left:0;top:0;display:grid;place-items:center;color:whitesmoke;font-weight:bold;text-transform:uppercase}.head.svelte-usggce span.svelte-usggce{color:#fcc437;font-size:0.8rem;margin-top:-1rem}ul.svelte-usggce.svelte-usggce{margin-top:3rem}li.svelte-usggce.svelte-usggce{text-align:left;position:relative;padding-left:1.8rem;margin-bottom:1rem;font-size:0.8rem;border-bottom:1px solid #bebebe;padding-bottom:0.3rem}li.svelte-usggce.svelte-usggce::before{content:"\\2713";position:absolute;left:0;top:0;color:#eff0f0;font-size:1rem;color:var(--primary)}h3.svelte-usggce.svelte-usggce{font-weight:bold;text-transform:uppercase;font-size:1.3rem;color:var(--primary)}.footer.svelte-usggce.svelte-usggce{text-align:center}.footer.svelte-usggce span.svelte-usggce{color:#858585;margin-left:0.8rem;text-decoration:line-through;text-decoration-thickness:0.5px}.footer.svelte-usggce p.svelte-usggce{font-size:0.7rem;margin-top:0.5rem}button.svelte-usggce.svelte-usggce{all:unset;background:var(--primary-gradient);color:whitesmoke;padding:5px 8px;border-radius:0.5rem;border:none;cursor:pointer;margin-right:1rem}@media screen and (max-width: 768px){.container.svelte-usggce.svelte-usggce{padding:0.8rem}.packages.svelte-usggce.svelte-usggce{grid-template-columns:1fr;padding-inline:1rem}h1.svelte-usggce.svelte-usggce,p.svelte-usggce.svelte-usggce{text-align:left}}',
      map: null
    };
    Pricelist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css4);
      return `<section class="${"price-lists svelte-usggce"}"><div class="${"container svelte-usggce"}"><h1 class="${"svelte-usggce"}">Harga Bersahabat Sesuai Dengan Kebutuhan</h1>
            <p class="${"svelte-usggce"}">Semua paket undangan website sudah mendapatkan halaman website, e-guestbook, fitur bahasa, navigasi
                peta, quotes, &amp; dukungan teknis</p>
            <div class="${"packages svelte-usggce"}"><div class="${"package svelte-usggce"}"><div class="${"head svelte-usggce"}"><h4>Paket Standard</h4></div>
                    <ul class="${"svelte-usggce"}"><li class="${"svelte-usggce"}">Pilihan Tema Standard</li>
                        <li class="${"svelte-usggce"}">Detail Info Acara</li>
                        <li class="${"svelte-usggce"}">Profil Pasangan</li>
                        <li class="${"svelte-usggce"}">Protokol Kesehatan</li>
                        <li class="${"svelte-usggce"}">Background Music (sesuai list)</li>
                        <li class="${"svelte-usggce"}">Navigasi Lokasi</li>
                        <li class="${"svelte-usggce"}">Ingatkan di Google Calendar</li>
                        <li class="${"svelte-usggce"}">2 Jadwal Acara</li>
                        <li class="${"svelte-usggce"}">Ucapan &amp; Kehadiran</li>
                        <li class="${"svelte-usggce"}">Love Stories</li>
                        <li class="${"svelte-usggce"}">Gallery foto (max 10)</li>
                        <li class="${"svelte-usggce"}">Generator Tamu Undangan</li>
                        <li class="${"svelte-usggce"}">Masa aktif 3 Bulan</li></ul>
                    <div class="${"footer svelte-usggce"}"><h3 class="${"svelte-usggce"}">idr 149.000</h3>
                        <button class="${"button svelte-usggce"}">Pesan Sekarang</button></div></div>
                <div class="${"package svelte-usggce"}"><div class="${"head svelte-usggce"}"><h4>Paket Premium</h4>
                        <span class="${"svelte-usggce"}">Hemat 101rb</span></div>
                    <ul class="${"svelte-usggce"}"><li class="${"svelte-usggce"}">Pilihan Tema Standard &amp; Premium</li>
                        <li class="${"svelte-usggce"}">Semua Fitur paket basic</li>
                        <li class="${"svelte-usggce"}">Gallery foto (max 20)</li>
                        <li class="${"svelte-usggce"}">Tampilkan tombol Live Streaming</li>
                        <li class="${"svelte-usggce"}">Amplop Digital</li>
                        <li class="${"svelte-usggce"}">QR Scanner untuk Buku Tamu di Lokasi</li>
                        <li class="${"svelte-usggce"}">Kisah Cinta Berupa Timeline</li>
                        <li class="${"svelte-usggce"}">5 Kali Revisi</li>
                        <li class="${"svelte-usggce"}">Masa Aktif 6 Bulan</li></ul>
                    <div class="${"footer svelte-usggce"}"><h3 class="${"svelte-usggce"}">idr 199.000 <span class="${"svelte-usggce"}">300rb</span></h3>
                        <button class="${"button svelte-usggce"}">Pesan Sekarang</button></div></div>
                <div class="${"package svelte-usggce"}"><div class="${"head svelte-usggce"}"><h4>Paket Special</h4>
                        <span class="${"svelte-usggce"}">Hemat 500rb</span></div>
                    <ul class="${"svelte-usggce"}"><li class="${"svelte-usggce"}">Custom Domain (.com, .id, dll)</li>
                        <li class="${"svelte-usggce"}">Semua Fitur paket Premium</li>
                        <li class="${"svelte-usggce"}">Smart Dashboard</li>
                        <li class="${"svelte-usggce"}">Bebas Pilih Tema</li>
                        <li class="${"svelte-usggce"}">Bisa Custom Tema yang ada</li>
                        <li class="${"svelte-usggce"}">Bisa Custom tema sesuai permintaan</li>
                        <li class="${"svelte-usggce"}">Gallery Foto (unlimited)</li>
                        <li class="${"svelte-usggce"}">Gallery Video</li>
                        <li class="${"svelte-usggce"}">Background Music (Bisa Request)</li>
                        <li class="${"svelte-usggce"}">Gratis undangan JPEG</li>
                        <li class="${"svelte-usggce"}">Dukungan teknis 24/7</li>
                        <li class="${"svelte-usggce"}">Revisi Sampai Puas</li>
                        <li class="${"svelte-usggce"}">Masa Aktif 1 Tahun</li></ul>
                    <div class="${"footer svelte-usggce"}"><h3 class="${"svelte-usggce"}">idr 1.500.000 <span class="${"svelte-usggce"}">2JT</span></h3>
                        <button class="${"button svelte-usggce"}">Pesan Sekarang</button>
                        <p class="${"svelte-usggce"}">*Pemesanan Minimal 1 Bulan sebelum Hari H</p></div></div></div></div>
    </section>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes
});
var css$32, Hero, css$22, Wave, css$12, About, css5, Features, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_c5e2452c();
    init_WhatsappButton_9d53bed0();
    init_index_es_638ce7e7();
    init_Pricelist_f607e4bc();
    css$32 = {
      code: "section.svelte-1k43s9b.svelte-1k43s9b{min-height:calc(100vh - 4rem);margin-top:4rem}.container.svelte-1k43s9b.svelte-1k43s9b{display:flex;align-items:center;min-height:inherit}.content.svelte-1k43s9b.svelte-1k43s9b{width:55%}h1.svelte-1k43s9b.svelte-1k43s9b{font-size:3rem}p.svelte-1k43s9b.svelte-1k43s9b{color:var(--primary);font-size:1.3rem;font-weight:300}.buttons.svelte-1k43s9b.svelte-1k43s9b{margin-top:1rem}.buttons.svelte-1k43s9b a.svelte-1k43s9b{background:var(--primary-gradient);color:whitesmoke;padding:8px 8px;border-radius:0.5rem;cursor:pointer;margin-right:0.5rem}.image.svelte-1k43s9b.svelte-1k43s9b{width:45%;height:100%;position:relative}.image.svelte-1k43s9b img.svelte-1k43s9b{position:absolute;width:150%;height:auto;top:-400px}@media screen and (max-width: 768px){.container.svelte-1k43s9b.svelte-1k43s9b{display:flex;flex-direction:column;min-height:auto;justify-content:center;align-items:center}.content.svelte-1k43s9b.svelte-1k43s9b{width:100%;margin-top:1rem}h1.svelte-1k43s9b.svelte-1k43s9b{font-size:2rem}.image.svelte-1k43s9b.svelte-1k43s9b{width:100%}.image.svelte-1k43s9b img.svelte-1k43s9b{position:static;top:0px;margin-left:-10rem;margin-top:1rem}}",
      map: null
    };
    Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$32);
      return `<section class="${"svelte-1k43s9b"}"><div class="${"container svelte-1k43s9b"}"><div class="${"content svelte-1k43s9b"}"><h1 class="${"svelte-1k43s9b"}">Undangan Pernikahan Digital Website</h1>
            <p class="${"svelte-1k43s9b"}">solusi undangan pernikahan website kamu jadi lebih menarik &amp; berkesan</p>
            <div class="${"buttons svelte-1k43s9b"}"><a class="${"order svelte-1k43s9b"}" href="${"/"}">Pesan Sekarang</a>
                <a class="${"pricelist svelte-1k43s9b"}" href="${"/"}">Harga</a></div></div>
        <div class="${"image svelte-1k43s9b"}"><img src="${"/images/hero.png"}" alt="${""}" class="${"svelte-1k43s9b"}"></div></div>
</section>`;
    });
    css$22 = {
      code: ".top-wave.svelte-1u3j808{margin-top:-100px;position:relative;z-index:1}.bottom-wave.svelte-1u3j808{transform:rotate(180deg);margin-top:-10px;position:relative;z-index:1}@media screen and (max-width: 768px){.top-wave.svelte-1u3j808,.bottom-wave.svelte-1u3j808{width:200%;margin-left:-3rem}}",
      map: null
    };
    Wave = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { position } = $$props;
      if ($$props.position === void 0 && $$bindings.position && position !== void 0)
        $$bindings.position(position);
      $$result.css.add(css$22);
      return `<div class="${escape(null_to_empty(position == "top" ? "top-wave" : "bottom-wave")) + " svelte-1u3j808"}"><svg width="${"100%"}" preserveAspectRatio="${"none"}" height="${"100px"}" viewBox="${"0 0 1300 100"}" version="${"1.1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}"><path d="${"M1300,0 L1300,99.9998042 L0,99.9998042 L0,60.1910374 C549.576968,-84.3633414 541.584175,191.147059 1300,0 Z"}" fill="${"#e9ebee"}"></path></svg>
</div>`;
    });
    css$12 = {
      code: "section.svelte-1fhthwy{background-color:var(--background-variant);margin-top:-10px;position:relative}h1.svelte-1fhthwy{margin-bottom:1rem}button.svelte-1fhthwy{all:unset;background:var(--primary-gradient);color:whitesmoke;padding:5px 8px;border-radius:0.5rem;border:none;cursor:pointer;margin-right:1rem;margin-top:1rem}",
      map: null
    };
    About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$12);
      return `<section class="${"svelte-1fhthwy"}"><div class="${"container"}"><h1 class="${"svelte-1fhthwy"}">Mengapa dinvite ??</h1>
            <p><strong style="${"color: var(--primary)"}">dinvite</strong> adalah penyedia layanan pembuatan undangan
                digital berbasis website. Kami
                memberikan sebuah
                layanan mudah, hemat, dan praktis kepada calon pengantin dalam mengirimkan informasi
                pernikahan/undangan berupa link. Undangan online dari <strong style="${"color: var(--primary)"}">dinvite</strong>
                juga menawarkan berbagai fitur
                menarik.</p>
            <button class="${"button svelte-1fhthwy"}">Hubungi Kami</button></div>
</section>`;
    });
    css5 = {
      code: ".container.svelte-7c29n4{padding:1rem 8rem;padding-bottom:10rem}h1.svelte-7c29n4{margin-bottom:1rem}.subtitle.svelte-7c29n4{margin-bottom:1rem}ul.svelte-7c29n4{display:grid;grid-template-columns:1fr 1fr;flex-wrap:wrap;margin-top:2rem;padding:00.8rem;gap:0.5rem}li.svelte-7c29n4{display:grid;grid-template-columns:1fr 90%;margin-bottom:1rem;margin-right:2rem;align-items:center}.icon.svelte-7c29n4{height:3.8rem;width:4.8rem;background:var(--primary-gradient);color:whitesmoke;display:grid;place-items:center;border-radius:0.5rem;font-size:1.1rem;margin-right:1rem}@media screen and (max-width: 768px){.container.svelte-7c29n4{padding:0.8rem;padding-bottom:8rem}ul.svelte-7c29n4{grid-template-columns:1fr}li.svelte-7c29n4{align-items:flex-start}.icon.svelte-7c29n4{width:3.8rem;height:2.8rem}}",
      map: null
    };
    Features = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css5);
      return `<section class="${"features"}"><div class="${"container svelte-7c29n4"}"><h1 class="${"svelte-7c29n4"}">Fitur Undangan Website</h1>
            <p class="${"subtitle svelte-7c29n4"}">Merencanakan pernikahan bisa menjadi pengalaman yang menyenangkan sekaligus menegangkan. Solusinya
                yaitu
                menggunakan undangan pernikahan online berbentuk website yang memberikan berbagai fitur yang
                menarik.
            </p>
            <ul class="${"svelte-7c29n4"}"><li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faImages }, {}, {})}</div>
                    <div><h4>Gallery Foto</h4>
                        <p>Tampilkan foto prewedding kalian di undangan. Bagikan momen indahmu kepada keluarga dan
                            kerabat.</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faMusic }, {}, {})}</div>
                    <div><h4>Musik</h4>
                        <p>Pilih lagu terbaik untuk undangan kalian, agar pembaca akan sekaligus mendengarkan musik
                            yang kalian tentukan</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faMapLocation }, {}, {})}</div>
                    <div><h4>Navigasi Lokasi</h4>
                        <p>Tidak ada kata tersesat, memudahkan tamu kalian menemukan lokasi pernikkahanmu. Hanya
                            dengan satu tombol.</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faComments }, {}, {})}</div>
                    <div><h4>Kolom Ucapan</h4>
                        <p>Kalian dapat membaca ucapan hangat dari saudara maupun kerabat kamu.</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faStopwatch20 }, {}, {})}</div>
                    <div><h4>Hitung Mundur</h4>
                        <p>Countdown ditamplikan secara animasi menuju acara pernikahan kalian.</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faFilm }, {}, {})}</div>
                    <div><h4>Video</h4>
                        <p>Sisipkan video prewedding kamu. Biarkan saudara dan kerabat melihat kebahagiaanmu
                            menunggu
                            hari pernikahanmu.</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faWhatsapp }, {}, {})}</div>
                    <div><h4>Whatsapp Otomatis</h4>
                        <p>Kirim undangan sekali klik tanpa ribet. Hanya tuliskan nama tamu dan undangan langsung
                            tertuju.</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faHeart }, {}, {})}</div>
                    <div><h4>Cerita Cinta</h4>
                        <p>Ceritakan kepada tamu undangan tentang cerita cinta kalian dari awal bertemu sampai
                            akhirnya memutuskan untuk menikah</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faAddressBook }, {}, {})}</div>
                    <div><h4>Buku Tamu Digital</h4>
                        <p>Catatan kehadiran dapat dipantau dengan mudah dan lengkap.</p></div></li>
                <li class="${"svelte-7c29n4"}"><div class="${"icon svelte-7c29n4"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faGift }, {}, {})}</div>
                    <div><h4>Amplop Digital</h4>
                        <p>Donasi dapat dikumpulkan baik melalui website maupun di tempat acara.</p></div></li></ul></div>
    </section>`;
    });
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `${$$result.title = `<title>Dinvite</title>`, ""}`, ""}

<main>${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
    ${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
    ${validate_component(Wave, "Wave").$$render($$result, { position: "top" }, {}, {})}
    ${validate_component(About, "About").$$render($$result, {}, {}, {})}
    ${validate_component(Wave, "Wave").$$render($$result, { position: "bottom" }, {}, {})}
    ${validate_component(Features, "Features").$$render($$result, {}, {}, {})}
    ${validate_component(Wave, "Wave").$$render($$result, { position: "top" }, {}, {})}
    ${validate_component(Pricelist, "Pricelist").$$render($$result, {}, {}, {})}
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
    ${validate_component(WhatsappButton, "WhatsappButton").$$render($$result, {}, {}, {})}</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports3 = {};
__export(__exports3, {
  css: () => css6,
  entry: () => entry3,
  index: () => index3,
  js: () => js3,
  module: () => index_svelte_exports
});
var index3, entry3, js3, css6;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_index_svelte();
    index3 = 4;
    entry3 = "pages/index.svelte-9542a6fc.js";
    js3 = ["pages/index.svelte-9542a6fc.js", "chunks/index-b83f0d2a.js", "chunks/WhatsappButton-b1573f4c.js", "chunks/index.es-638ce7e7.js", "chunks/Pricelist-eddc6c5a.js"];
    css6 = ["assets/pages/index.svelte-6cbe309c.css", "assets/WhatsappButton-00b0970a.css", "assets/Pricelist-7bce2c6a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/blog.svelte.js
var blog_svelte_exports = {};
__export(blog_svelte_exports, {
  default: () => Blog
});
var css7, Blog;
var init_blog_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/blog.svelte.js"() {
    init_index_c5e2452c();
    init_WhatsappButton_9d53bed0();
    init_index_es_638ce7e7();
    css7 = {
      code: "section.svelte-ki485w{min-height:50vh}",
      map: null
    };
    Blog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css7);
      return `${$$result.head += `${$$result.title = `<title>Dinvite - Blog</title>`, ""}`, ""}


<main>${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
    <section class="${"svelte-ki485w"}"></section>
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
    ${validate_component(WhatsappButton, "WhatsappButton").$$render($$result, {}, {}, {})}
</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports4 = {};
__export(__exports4, {
  css: () => css8,
  entry: () => entry4,
  index: () => index4,
  js: () => js4,
  module: () => blog_svelte_exports
});
var index4, entry4, js4, css8;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_blog_svelte();
    index4 = 2;
    entry4 = "pages/blog.svelte-55df9e3d.js";
    js4 = ["pages/blog.svelte-55df9e3d.js", "chunks/index-b83f0d2a.js", "chunks/WhatsappButton-b1573f4c.js", "chunks/index.es-638ce7e7.js"];
    css8 = ["assets/pages/blog.svelte-f00ed4d7.css", "assets/WhatsappButton-00b0970a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/harga.svelte.js
var harga_svelte_exports = {};
__export(harga_svelte_exports, {
  default: () => Harga
});
var css9, Harga;
var init_harga_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/harga.svelte.js"() {
    init_index_c5e2452c();
    init_WhatsappButton_9d53bed0();
    init_Pricelist_f607e4bc();
    init_index_es_638ce7e7();
    css9 = {
      code: "section.svelte-mqfb8m{min-height:50vh;margin-top:5rem}",
      map: null
    };
    Harga = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css9);
      return `${$$result.head += `${$$result.title = `<title>Dinvite - Harga</title>`, ""}`, ""}


<main>${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
    <section class="${"svelte-mqfb8m"}">${validate_component(Pricelist, "Pricelist").$$render($$result, {}, {}, {})}</section>
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
    ${validate_component(WhatsappButton, "WhatsappButton").$$render($$result, {}, {}, {})}
</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports5 = {};
__export(__exports5, {
  css: () => css10,
  entry: () => entry5,
  index: () => index5,
  js: () => js5,
  module: () => harga_svelte_exports
});
var index5, entry5, js5, css10;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_harga_svelte();
    index5 = 3;
    entry5 = "pages/harga.svelte-907fa774.js";
    js5 = ["pages/harga.svelte-907fa774.js", "chunks/index-b83f0d2a.js", "chunks/WhatsappButton-b1573f4c.js", "chunks/index.es-638ce7e7.js", "chunks/Pricelist-eddc6c5a.js"];
    css10 = ["assets/pages/harga.svelte-366dbec9.css", "assets/WhatsappButton-00b0970a.css", "assets/Pricelist-7bce2c6a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/tema/index.svelte.js
var index_svelte_exports2 = {};
__export(index_svelte_exports2, {
  default: () => Tema
});
var css11, Tema;
var init_index_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/tema/index.svelte.js"() {
    init_index_c5e2452c();
    init_WhatsappButton_9d53bed0();
    init_index_es_638ce7e7();
    css11 = {
      code: "section.svelte-ki485w{min-height:50vh}",
      map: null
    };
    Tema = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css11);
      return `${$$result.head += `${$$result.title = `<title>Dinvite - Tema</title>`, ""}`, ""}


<main>${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
    <section class="${"svelte-ki485w"}"></section>
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
    ${validate_component(WhatsappButton, "WhatsappButton").$$render($$result, {}, {}, {})}
</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  css: () => css12,
  entry: () => entry6,
  index: () => index6,
  js: () => js6,
  module: () => index_svelte_exports2
});
var index6, entry6, js6, css12;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_index_svelte2();
    index6 = 5;
    entry6 = "pages/tema/index.svelte-8a0aea11.js";
    js6 = ["pages/tema/index.svelte-8a0aea11.js", "chunks/index-b83f0d2a.js", "chunks/WhatsappButton-b1573f4c.js", "chunks/index.es-638ce7e7.js"];
    css12 = ["assets/pages/blog.svelte-f00ed4d7.css", "assets/WhatsappButton-00b0970a.css"];
  }
});

// node_modules/lightgallery/lightgallery.umd.js
var require_lightgallery_umd = __commonJS({
  "node_modules/lightgallery/lightgallery.umd.js"(exports, module2) {
    (function(global3, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global3 = typeof globalThis !== "undefined" ? globalThis : global3 || self, global3.lightGallery = factory());
    })(exports, function() {
      "use strict";
      var __assign = function() {
        __assign = Object.assign || function __assign2(t2) {
          for (var s3, i2 = 1, n = arguments.length; i2 < n; i2++) {
            s3 = arguments[i2];
            for (var p in s3)
              if (Object.prototype.hasOwnProperty.call(s3, p))
                t2[p] = s3[p];
          }
          return t2;
        };
        return __assign.apply(this, arguments);
      };
      function __spreadArrays() {
        for (var s3 = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
          s3 += arguments[i2].length;
        for (var r2 = Array(s3), k = 0, i2 = 0; i2 < il; i2++)
          for (var a = arguments[i2], j = 0, jl = a.length; j < jl; j++, k++)
            r2[k] = a[j];
        return r2;
      }
      var lGEvents = {
        afterAppendSlide: "lgAfterAppendSlide",
        init: "lgInit",
        hasVideo: "lgHasVideo",
        containerResize: "lgContainerResize",
        updateSlides: "lgUpdateSlides",
        afterAppendSubHtml: "lgAfterAppendSubHtml",
        beforeOpen: "lgBeforeOpen",
        afterOpen: "lgAfterOpen",
        slideItemLoad: "lgSlideItemLoad",
        beforeSlide: "lgBeforeSlide",
        afterSlide: "lgAfterSlide",
        posterClick: "lgPosterClick",
        dragStart: "lgDragStart",
        dragMove: "lgDragMove",
        dragEnd: "lgDragEnd",
        beforeNextSlide: "lgBeforeNextSlide",
        beforePrevSlide: "lgBeforePrevSlide",
        beforeClose: "lgBeforeClose",
        afterClose: "lgAfterClose",
        rotateLeft: "lgRotateLeft",
        rotateRight: "lgRotateRight",
        flipHorizontal: "lgFlipHorizontal",
        flipVertical: "lgFlipVertical",
        autoplay: "lgAutoplay",
        autoplayStart: "lgAutoplayStart",
        autoplayStop: "lgAutoplayStop"
      };
      var lightGalleryCoreSettings = {
        mode: "lg-slide",
        easing: "ease",
        speed: 400,
        licenseKey: "0000-0000-000-0000",
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 300,
        container: "",
        startAnimationDuration: 400,
        zoomFromOrigin: true,
        hideBarsDelay: 0,
        showBarsAfter: 1e4,
        slideDelay: 0,
        supportLegacyBrowser: true,
        allowMediaOverlap: false,
        videoMaxSize: "1280-720",
        loadYouTubePoster: true,
        defaultCaptionHeight: 0,
        ariaLabelledby: "",
        ariaDescribedby: "",
        resetScrollPosition: true,
        hideScrollbar: false,
        closable: true,
        swipeToClose: true,
        closeOnTap: true,
        showCloseIcon: true,
        showMaximizeIcon: false,
        loop: true,
        escKey: true,
        keyPress: true,
        trapFocus: true,
        controls: true,
        slideEndAnimation: true,
        hideControlOnEnd: false,
        mousewheel: false,
        getCaptionFromTitleOrAlt: true,
        appendSubHtmlTo: ".lg-sub-html",
        subHtmlSelectorRelative: false,
        preload: 2,
        numberOfSlideItemsInDom: 10,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: 0,
        iframeWidth: "100%",
        iframeHeight: "100%",
        iframeMaxWidth: "100%",
        iframeMaxHeight: "100%",
        download: true,
        counter: true,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: true,
        enableDrag: true,
        dynamic: false,
        dynamicEl: [],
        extraProps: [],
        exThumbImage: "",
        isMobile: void 0,
        mobileSettings: {
          controls: false,
          showCloseIcon: false,
          download: false
        },
        plugins: [],
        strings: {
          closeGallery: "Close gallery",
          toggleMaximize: "Toggle maximize",
          previousSlide: "Previous slide",
          nextSlide: "Next slide",
          download: "Download",
          playVideo: "Play video"
        }
      };
      function initLgPolyfills() {
        (function() {
          if (typeof window.CustomEvent === "function")
            return false;
          function CustomEvent2(event, params) {
            params = params || {
              bubbles: false,
              cancelable: false,
              detail: null
            };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
          }
          window.CustomEvent = CustomEvent2;
        })();
        (function() {
          if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
          }
        })();
      }
      var lgQuery = function() {
        function lgQuery2(selector) {
          this.cssVenderPrefixes = [
            "TransitionDuration",
            "TransitionTimingFunction",
            "Transform",
            "Transition"
          ];
          this.selector = this._getSelector(selector);
          this.firstElement = this._getFirstEl();
          return this;
        }
        lgQuery2.generateUUID = function() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r2 = Math.random() * 16 | 0, v = c == "x" ? r2 : r2 & 3 | 8;
            return v.toString(16);
          });
        };
        lgQuery2.prototype._getSelector = function(selector, context) {
          if (context === void 0) {
            context = document;
          }
          if (typeof selector !== "string") {
            return selector;
          }
          context = context || document;
          var fl = selector.substring(0, 1);
          if (fl === "#") {
            return context.querySelector(selector);
          } else {
            return context.querySelectorAll(selector);
          }
        };
        lgQuery2.prototype._each = function(func) {
          if (!this.selector) {
            return this;
          }
          if (this.selector.length !== void 0) {
            [].forEach.call(this.selector, func);
          } else {
            func(this.selector, 0);
          }
          return this;
        };
        lgQuery2.prototype._setCssVendorPrefix = function(el, cssProperty, value) {
          var property = cssProperty.replace(/-([a-z])/gi, function(s3, group1) {
            return group1.toUpperCase();
          });
          if (this.cssVenderPrefixes.indexOf(property) !== -1) {
            el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
            el.style["webkit" + property] = value;
            el.style["moz" + property] = value;
            el.style["ms" + property] = value;
            el.style["o" + property] = value;
          } else {
            el.style[property] = value;
          }
        };
        lgQuery2.prototype._getFirstEl = function() {
          if (this.selector && this.selector.length !== void 0) {
            return this.selector[0];
          } else {
            return this.selector;
          }
        };
        lgQuery2.prototype.isEventMatched = function(event, eventName) {
          var eventNamespace = eventName.split(".");
          return event.split(".").filter(function(e2) {
            return e2;
          }).every(function(e2) {
            return eventNamespace.indexOf(e2) !== -1;
          });
        };
        lgQuery2.prototype.attr = function(attr, value) {
          if (value === void 0) {
            if (!this.firstElement) {
              return "";
            }
            return this.firstElement.getAttribute(attr);
          }
          this._each(function(el) {
            el.setAttribute(attr, value);
          });
          return this;
        };
        lgQuery2.prototype.find = function(selector) {
          return $LG(this._getSelector(selector, this.selector));
        };
        lgQuery2.prototype.first = function() {
          if (this.selector && this.selector.length !== void 0) {
            return $LG(this.selector[0]);
          } else {
            return $LG(this.selector);
          }
        };
        lgQuery2.prototype.eq = function(index8) {
          return $LG(this.selector[index8]);
        };
        lgQuery2.prototype.parent = function() {
          return $LG(this.selector.parentElement);
        };
        lgQuery2.prototype.get = function() {
          return this._getFirstEl();
        };
        lgQuery2.prototype.removeAttr = function(attributes) {
          var attrs = attributes.split(" ");
          this._each(function(el) {
            attrs.forEach(function(attr) {
              return el.removeAttribute(attr);
            });
          });
          return this;
        };
        lgQuery2.prototype.wrap = function(className) {
          if (!this.firstElement) {
            return this;
          }
          var wrapper = document.createElement("div");
          wrapper.className = className;
          this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
          this.firstElement.parentNode.removeChild(this.firstElement);
          wrapper.appendChild(this.firstElement);
          return this;
        };
        lgQuery2.prototype.addClass = function(classNames) {
          if (classNames === void 0) {
            classNames = "";
          }
          this._each(function(el) {
            classNames.split(" ").forEach(function(className) {
              if (className) {
                el.classList.add(className);
              }
            });
          });
          return this;
        };
        lgQuery2.prototype.removeClass = function(classNames) {
          this._each(function(el) {
            classNames.split(" ").forEach(function(className) {
              if (className) {
                el.classList.remove(className);
              }
            });
          });
          return this;
        };
        lgQuery2.prototype.hasClass = function(className) {
          if (!this.firstElement) {
            return false;
          }
          return this.firstElement.classList.contains(className);
        };
        lgQuery2.prototype.hasAttribute = function(attribute) {
          if (!this.firstElement) {
            return false;
          }
          return this.firstElement.hasAttribute(attribute);
        };
        lgQuery2.prototype.toggleClass = function(className) {
          if (!this.firstElement) {
            return this;
          }
          if (this.hasClass(className)) {
            this.removeClass(className);
          } else {
            this.addClass(className);
          }
          return this;
        };
        lgQuery2.prototype.css = function(property, value) {
          var _this = this;
          this._each(function(el) {
            _this._setCssVendorPrefix(el, property, value);
          });
          return this;
        };
        lgQuery2.prototype.on = function(events, listener) {
          var _this = this;
          if (!this.selector) {
            return this;
          }
          events.split(" ").forEach(function(event) {
            if (!Array.isArray(lgQuery2.eventListeners[event])) {
              lgQuery2.eventListeners[event] = [];
            }
            lgQuery2.eventListeners[event].push(listener);
            _this.selector.addEventListener(event.split(".")[0], listener);
          });
          return this;
        };
        lgQuery2.prototype.once = function(event, listener) {
          var _this = this;
          this.on(event, function() {
            _this.off(event);
            listener(event);
          });
          return this;
        };
        lgQuery2.prototype.off = function(event) {
          var _this = this;
          if (!this.selector) {
            return this;
          }
          Object.keys(lgQuery2.eventListeners).forEach(function(eventName) {
            if (_this.isEventMatched(event, eventName)) {
              lgQuery2.eventListeners[eventName].forEach(function(listener) {
                _this.selector.removeEventListener(eventName.split(".")[0], listener);
              });
              lgQuery2.eventListeners[eventName] = [];
            }
          });
          return this;
        };
        lgQuery2.prototype.trigger = function(event, detail) {
          if (!this.firstElement) {
            return this;
          }
          var customEvent = new CustomEvent(event.split(".")[0], {
            detail: detail || null
          });
          this.firstElement.dispatchEvent(customEvent);
          return this;
        };
        lgQuery2.prototype.load = function(url) {
          var _this = this;
          fetch(url).then(function(res) {
            return res.text();
          }).then(function(html) {
            _this.selector.innerHTML = html;
          });
          return this;
        };
        lgQuery2.prototype.html = function(html) {
          if (html === void 0) {
            if (!this.firstElement) {
              return "";
            }
            return this.firstElement.innerHTML;
          }
          this._each(function(el) {
            el.innerHTML = html;
          });
          return this;
        };
        lgQuery2.prototype.append = function(html) {
          this._each(function(el) {
            if (typeof html === "string") {
              el.insertAdjacentHTML("beforeend", html);
            } else {
              el.appendChild(html);
            }
          });
          return this;
        };
        lgQuery2.prototype.prepend = function(html) {
          this._each(function(el) {
            el.insertAdjacentHTML("afterbegin", html);
          });
          return this;
        };
        lgQuery2.prototype.remove = function() {
          this._each(function(el) {
            el.parentNode.removeChild(el);
          });
          return this;
        };
        lgQuery2.prototype.empty = function() {
          this._each(function(el) {
            el.innerHTML = "";
          });
          return this;
        };
        lgQuery2.prototype.scrollTop = function(scrollTop) {
          if (scrollTop !== void 0) {
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            return this;
          } else {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          }
        };
        lgQuery2.prototype.scrollLeft = function(scrollLeft) {
          if (scrollLeft !== void 0) {
            document.body.scrollLeft = scrollLeft;
            document.documentElement.scrollLeft = scrollLeft;
            return this;
          } else {
            return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
          }
        };
        lgQuery2.prototype.offset = function() {
          if (!this.firstElement) {
            return {
              left: 0,
              top: 0
            };
          }
          var rect = this.firstElement.getBoundingClientRect();
          var bodyMarginLeft = $LG("body").style().marginLeft;
          return {
            left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
            top: rect.top + this.scrollTop()
          };
        };
        lgQuery2.prototype.style = function() {
          if (!this.firstElement) {
            return {};
          }
          return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
        };
        lgQuery2.prototype.width = function() {
          var style = this.style();
          return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        };
        lgQuery2.prototype.height = function() {
          var style = this.style();
          return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
        };
        lgQuery2.eventListeners = {};
        return lgQuery2;
      }();
      function $LG(selector) {
        initLgPolyfills();
        return new lgQuery(selector);
      }
      var defaultDynamicOptions = [
        "src",
        "sources",
        "subHtml",
        "subHtmlUrl",
        "html",
        "video",
        "poster",
        "slideName",
        "responsive",
        "srcset",
        "sizes",
        "iframe",
        "downloadUrl",
        "download",
        "width",
        "facebookShareUrl",
        "tweetText",
        "iframeTitle",
        "twitterShareUrl",
        "pinterestShareUrl",
        "pinterestText",
        "fbHtml",
        "disqusIdentifier",
        "disqusUrl"
      ];
      function convertToData(attr) {
        if (attr === "href") {
          return "src";
        }
        attr = attr.replace("data-", "");
        attr = attr.charAt(0).toLowerCase() + attr.slice(1);
        attr = attr.replace(/-([a-z])/g, function(g) {
          return g[1].toUpperCase();
        });
        return attr;
      }
      var utils2 = {
        getSize: function(el, container, spacing, defaultLgSize) {
          if (spacing === void 0) {
            spacing = 0;
          }
          var LGel = $LG(el);
          var lgSize = LGel.attr("data-lg-size") || defaultLgSize;
          if (!lgSize) {
            return;
          }
          var isResponsiveSizes = lgSize.split(",");
          if (isResponsiveSizes[1]) {
            var wWidth = window.innerWidth;
            for (var i2 = 0; i2 < isResponsiveSizes.length; i2++) {
              var size_1 = isResponsiveSizes[i2];
              var responsiveWidth = parseInt(size_1.split("-")[2], 10);
              if (responsiveWidth > wWidth) {
                lgSize = size_1;
                break;
              }
              if (i2 === isResponsiveSizes.length - 1) {
                lgSize = size_1;
              }
            }
          }
          var size = lgSize.split("-");
          var width = parseInt(size[0], 10);
          var height = parseInt(size[1], 10);
          var cWidth = container.width();
          var cHeight = container.height() - spacing;
          var maxWidth = Math.min(cWidth, width);
          var maxHeight = Math.min(cHeight, height);
          var ratio = Math.min(maxWidth / width, maxHeight / height);
          return { width: width * ratio, height: height * ratio };
        },
        getTransform: function(el, container, top, bottom, imageSize) {
          if (!imageSize) {
            return;
          }
          var LGel = $LG(el).find("img").first();
          if (!LGel.get()) {
            return;
          }
          var containerRect = container.get().getBoundingClientRect();
          var wWidth = containerRect.width;
          var wHeight = container.height() - (top + bottom);
          var elWidth = LGel.width();
          var elHeight = LGel.height();
          var elStyle = LGel.style();
          var x2 = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
          var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
          var scX = elWidth / imageSize.width;
          var scY = elHeight / imageSize.height;
          var transform = "translate3d(" + (x2 *= -1) + "px, " + (y *= -1) + "px, 0) scale3d(" + scX + ", " + scY + ", 1)";
          return transform;
        },
        getIframeMarkup: function(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
          var title = iframeTitle ? 'title="' + iframeTitle + '"' : "";
          return '<div class="lg-video-cont lg-has-iframe" style="width:' + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + '">\n                    <iframe class="lg-object" frameborder="0" ' + title + ' src="' + src + '"  allowfullscreen="true"></iframe>\n                </div>';
        },
        getImgMarkup: function(index8, src, altAttr, srcset, sizes, sources) {
          var srcsetAttr = srcset ? 'srcset="' + srcset + '"' : "";
          var sizesAttr = sizes ? 'sizes="' + sizes + '"' : "";
          var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + ' class="lg-object lg-image" data-index="' + index8 + '" src="' + src + '" />';
          var sourceTag = "";
          if (sources) {
            var sourceObj = typeof sources === "string" ? JSON.parse(sources) : sources;
            sourceTag = sourceObj.map(function(source) {
              var attrs = "";
              Object.keys(source).forEach(function(key2) {
                attrs += " " + key2 + '="' + source[key2] + '"';
              });
              return "<source " + attrs + "></source>";
            });
          }
          return "" + sourceTag + imgMarkup;
        },
        getResponsiveSrc: function(srcItms) {
          var rsWidth = [];
          var rsSrc = [];
          var src = "";
          for (var i2 = 0; i2 < srcItms.length; i2++) {
            var _src = srcItms[i2].split(" ");
            if (_src[0] === "") {
              _src.splice(0, 1);
            }
            rsSrc.push(_src[0]);
            rsWidth.push(_src[1]);
          }
          var wWidth = window.innerWidth;
          for (var j = 0; j < rsWidth.length; j++) {
            if (parseInt(rsWidth[j], 10) > wWidth) {
              src = rsSrc[j];
              break;
            }
          }
          return src;
        },
        isImageLoaded: function(img) {
          if (!img)
            return false;
          if (!img.complete) {
            return false;
          }
          if (img.naturalWidth === 0) {
            return false;
          }
          return true;
        },
        getVideoPosterMarkup: function(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
          var videoClass = "";
          if (_isVideo && _isVideo.youtube) {
            videoClass = "lg-has-youtube";
          } else if (_isVideo && _isVideo.vimeo) {
            videoClass = "lg-has-vimeo";
          } else {
            videoClass = "lg-has-html5";
          }
          return '<div class="lg-video-cont ' + videoClass + '" style="' + videoContStyle + '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' + playVideoString + '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' + playVideoString + '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' + (dummyImg || "") + '\n            <img class="lg-object lg-video-poster" src="' + _poster + '" />\n        </div>';
        },
        getFocusableElements: function(container) {
          var elements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
          var visibleElements = [].filter.call(elements, function(element) {
            var style = window.getComputedStyle(element);
            return style.display !== "none" && style.visibility !== "hidden";
          });
          return visibleElements;
        },
        getDynamicOptions: function(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
          var dynamicElements = [];
          var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
          [].forEach.call(items, function(item) {
            var dynamicEl = {};
            for (var i2 = 0; i2 < item.attributes.length; i2++) {
              var attr = item.attributes[i2];
              if (attr.specified) {
                var dynamicAttr = convertToData(attr.name);
                var label = "";
                if (availableDynamicOptions.indexOf(dynamicAttr) > -1) {
                  label = dynamicAttr;
                }
                if (label) {
                  dynamicEl[label] = attr.value;
                }
              }
            }
            var currentItem = $LG(item);
            var alt = currentItem.find("img").first().attr("alt");
            var title = currentItem.attr("title");
            var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find("img").first().attr("src");
            dynamicEl.thumb = thumb;
            if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) {
              dynamicEl.subHtml = title || alt || "";
            }
            dynamicEl.alt = alt || title || "";
            dynamicElements.push(dynamicEl);
          });
          return dynamicElements;
        },
        isMobile: function() {
          return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
        isVideo: function(src, isHTML5VIdeo, index8) {
          if (!src) {
            if (isHTML5VIdeo) {
              return {
                html5: true
              };
            } else {
              console.error("lightGallery :- data-src is not provided on slide item " + (index8 + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");
              return;
            }
          }
          var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
          var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
          var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
          if (youtube) {
            return {
              youtube
            };
          } else if (vimeo) {
            return {
              vimeo
            };
          } else if (wistia) {
            return {
              wistia
            };
          }
        }
      };
      var lgId = 0;
      var LightGallery = function() {
        function LightGallery2(element, options) {
          this.lgOpened = false;
          this.index = 0;
          this.plugins = [];
          this.lGalleryOn = false;
          this.lgBusy = false;
          this.currentItemsInDom = [];
          this.prevScrollTop = 0;
          this.bodyPaddingRight = 0;
          this.isDummyImageRemoved = false;
          this.dragOrSwipeEnabled = false;
          this.mediaContainerPosition = {
            top: 0,
            bottom: 0
          };
          if (!element) {
            return this;
          }
          lgId++;
          this.lgId = lgId;
          this.el = element;
          this.LGel = $LG(element);
          this.generateSettings(options);
          this.buildModules();
          if (this.settings.dynamic && this.settings.dynamicEl !== void 0 && !Array.isArray(this.settings.dynamicEl)) {
            throw "When using dynamic mode, you must also define dynamicEl as an Array.";
          }
          this.galleryItems = this.getItems();
          this.normalizeSettings();
          this.init();
          this.validateLicense();
          return this;
        }
        LightGallery2.prototype.generateSettings = function(options) {
          this.settings = __assign(__assign({}, lightGalleryCoreSettings), options);
          if (this.settings.isMobile && typeof this.settings.isMobile === "function" ? this.settings.isMobile() : utils2.isMobile()) {
            var mobileSettings = __assign(__assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
            this.settings = __assign(__assign({}, this.settings), mobileSettings);
          }
        };
        LightGallery2.prototype.normalizeSettings = function() {
          if (this.settings.slideEndAnimation) {
            this.settings.hideControlOnEnd = false;
          }
          if (!this.settings.closable) {
            this.settings.swipeToClose = false;
          }
          this.zoomFromOrigin = this.settings.zoomFromOrigin;
          if (this.settings.dynamic) {
            this.zoomFromOrigin = false;
          }
          if (!this.settings.container) {
            this.settings.container = document.body;
          }
          this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
        };
        LightGallery2.prototype.init = function() {
          var _this = this;
          this.addSlideVideoInfo(this.galleryItems);
          this.buildStructure();
          this.LGel.trigger(lGEvents.init, {
            instance: this
          });
          if (this.settings.keyPress) {
            this.keyPress();
          }
          setTimeout(function() {
            _this.enableDrag();
            _this.enableSwipe();
            _this.triggerPosterClick();
          }, 50);
          this.arrow();
          if (this.settings.mousewheel) {
            this.mousewheel();
          }
          if (!this.settings.dynamic) {
            this.openGalleryOnItemClick();
          }
        };
        LightGallery2.prototype.openGalleryOnItemClick = function() {
          var _this = this;
          var _loop_1 = function(index9) {
            var element = this_1.items[index9];
            var $element = $LG(element);
            var uuid = lgQuery.generateUUID();
            $element.attr("data-lg-id", uuid).on("click.lgcustom-item-" + uuid, function(e2) {
              e2.preventDefault();
              var currentItemIndex = _this.settings.index || index9;
              _this.openGallery(currentItemIndex, element);
            });
          };
          var this_1 = this;
          for (var index8 = 0; index8 < this.items.length; index8++) {
            _loop_1(index8);
          }
        };
        LightGallery2.prototype.buildModules = function() {
          var _this = this;
          this.settings.plugins.forEach(function(plugin) {
            _this.plugins.push(new plugin(_this, $LG));
          });
        };
        LightGallery2.prototype.validateLicense = function() {
          if (!this.settings.licenseKey) {
            console.error("Please provide a valid license key");
          } else if (this.settings.licenseKey === "0000-0000-000-0000") {
            console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
          }
        };
        LightGallery2.prototype.getSlideItem = function(index8) {
          return $LG(this.getSlideItemId(index8));
        };
        LightGallery2.prototype.getSlideItemId = function(index8) {
          return "#lg-item-" + this.lgId + "-" + index8;
        };
        LightGallery2.prototype.getIdName = function(id) {
          return id + "-" + this.lgId;
        };
        LightGallery2.prototype.getElementById = function(id) {
          return $LG("#" + this.getIdName(id));
        };
        LightGallery2.prototype.manageSingleSlideClassName = function() {
          if (this.galleryItems.length < 2) {
            this.outer.addClass("lg-single-item");
          } else {
            this.outer.removeClass("lg-single-item");
          }
        };
        LightGallery2.prototype.buildStructure = function() {
          var _this = this;
          var container = this.$container && this.$container.get();
          if (container) {
            return;
          }
          var controls = "";
          var subHtmlCont = "";
          if (this.settings.controls) {
            controls = '<button type="button" id="' + this.getIdName("lg-prev") + '" aria-label="' + this.settings.strings["previousSlide"] + '" class="lg-prev lg-icon"> ' + this.settings.prevHtml + ' </button>\n                <button type="button" id="' + this.getIdName("lg-next") + '" aria-label="' + this.settings.strings["nextSlide"] + '" class="lg-next lg-icon"> ' + this.settings.nextHtml + " </button>";
          }
          if (this.settings.appendSubHtmlTo !== ".lg-item") {
            subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
          }
          var addClasses = "";
          if (this.settings.allowMediaOverlap) {
            addClasses += "lg-media-overlap ";
          }
          var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "";
          var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "";
          var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : "");
          var closeIcon = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="' + this.settings.strings["closeGallery"] + '" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "";
          var maximizeIcon = this.settings.showMaximizeIcon ? '<button type="button" aria-label="' + this.settings.strings["toggleMaximize"] + '" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "";
          var template2 = '\n        <div class="' + containerClassName + '" id="' + this.getIdName("lg-container") + '" tabindex="-1" aria-modal="true" ' + ariaLabelledby + " " + ariaDescribedby + ' role="dialog"\n        >\n            <div id="' + this.getIdName("lg-backdrop") + '" class="lg-backdrop"></div>\n\n            <div id="' + this.getIdName("lg-outer") + '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' + addClasses + ' ">\n\n              <div id="' + this.getIdName("lg-content") + '" class="lg-content">\n                <div id="' + this.getIdName("lg-inner") + '" class="lg-inner">\n                </div>\n                ' + controls + '\n              </div>\n                <div id="' + this.getIdName("lg-toolbar") + '" class="lg-toolbar lg-group">\n                    ' + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (this.settings.appendSubHtmlTo === ".lg-outer" ? subHtmlCont : "") + '\n                <div id="' + this.getIdName("lg-components") + '" class="lg-components">\n                    ' + (this.settings.appendSubHtmlTo === ".lg-sub-html" ? subHtmlCont : "") + "\n                </div>\n            </div>\n        </div>\n        ";
          $LG(this.settings.container).append(template2);
          if (document.body !== this.settings.container) {
            $LG(this.settings.container).css("position", "relative");
          }
          this.outer = this.getElementById("lg-outer");
          this.$lgComponents = this.getElementById("lg-components");
          this.$backdrop = this.getElementById("lg-backdrop");
          this.$container = this.getElementById("lg-container");
          this.$inner = this.getElementById("lg-inner");
          this.$content = this.getElementById("lg-content");
          this.$toolbar = this.getElementById("lg-toolbar");
          this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
          var outerClassNames = this.settings.mode + " ";
          this.manageSingleSlideClassName();
          if (this.settings.enableDrag) {
            outerClassNames += "lg-grab ";
          }
          this.outer.addClass(outerClassNames);
          this.$inner.css("transition-timing-function", this.settings.easing);
          this.$inner.css("transition-duration", this.settings.speed + "ms");
          if (this.settings.download) {
            this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="' + this.settings.strings["download"] + '" download class="lg-download lg-icon"></a>');
          }
          this.counter();
          $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, function() {
            _this.refreshOnResize();
          });
          this.hideBars();
          this.manageCloseGallery();
          this.toggleMaximize();
          this.initModules();
        };
        LightGallery2.prototype.refreshOnResize = function() {
          if (this.lgOpened) {
            var currentGalleryItem = this.galleryItems[this.index];
            var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var _a = this.mediaContainerPosition, top_1 = _a.top, bottom = _a.bottom;
            this.currentImageSize = utils2.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
            if (__slideVideoInfo) {
              this.resizeVideoSlide(this.index, this.currentImageSize);
            }
            if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
              var imgStyle = this.getDummyImgStyles(this.currentImageSize);
              this.outer.find(".lg-current .lg-dummy-img").first().attr("style", imgStyle);
            }
            this.LGel.trigger(lGEvents.containerResize);
          }
        };
        LightGallery2.prototype.resizeVideoSlide = function(index8, imageSize) {
          var lgVideoStyle = this.getVideoContStyle(imageSize);
          var currentSlide = this.getSlideItem(index8);
          currentSlide.find(".lg-video-cont").attr("style", lgVideoStyle);
        };
        LightGallery2.prototype.updateSlides = function(items, index8) {
          if (this.index > items.length - 1) {
            this.index = items.length - 1;
          }
          if (items.length === 1) {
            this.index = 0;
          }
          if (!items.length) {
            this.closeGallery();
            return;
          }
          var currentSrc = this.galleryItems[index8].src;
          this.galleryItems = items;
          this.updateControls();
          this.$inner.empty();
          this.currentItemsInDom = [];
          var _index = 0;
          this.galleryItems.some(function(galleryItem, itemIndex) {
            if (galleryItem.src === currentSrc) {
              _index = itemIndex;
              return true;
            }
            return false;
          });
          this.currentItemsInDom = this.organizeSlideItems(_index, -1);
          this.loadContent(_index, true);
          this.getSlideItem(_index).addClass("lg-current");
          this.index = _index;
          this.updateCurrentCounter(_index);
          this.LGel.trigger(lGEvents.updateSlides);
        };
        LightGallery2.prototype.getItems = function() {
          this.items = [];
          if (!this.settings.dynamic) {
            if (this.settings.selector === "this") {
              this.items.push(this.el);
            } else if (this.settings.selector) {
              if (typeof this.settings.selector === "string") {
                if (this.settings.selectWithin) {
                  var selectWithin = $LG(this.settings.selectWithin);
                  this.items = selectWithin.find(this.settings.selector).get();
                } else {
                  this.items = this.el.querySelectorAll(this.settings.selector);
                }
              } else {
                this.items = this.settings.selector;
              }
            } else {
              this.items = this.el.children;
            }
            return utils2.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
          } else {
            return this.settings.dynamicEl || [];
          }
        };
        LightGallery2.prototype.shouldHideScrollbar = function() {
          return this.settings.hideScrollbar && document.body === this.settings.container;
        };
        LightGallery2.prototype.hideScrollbar = function() {
          if (!this.shouldHideScrollbar()) {
            return;
          }
          this.bodyPaddingRight = parseFloat($LG("body").style().paddingRight);
          var bodyRect = document.documentElement.getBoundingClientRect();
          var scrollbarWidth = window.innerWidth - bodyRect.width;
          $LG(document.body).css("padding-right", scrollbarWidth + this.bodyPaddingRight + "px");
          $LG(document.body).addClass("lg-overlay-open");
        };
        LightGallery2.prototype.resetScrollBar = function() {
          if (!this.shouldHideScrollbar()) {
            return;
          }
          $LG(document.body).css("padding-right", this.bodyPaddingRight + "px");
          $LG(document.body).removeClass("lg-overlay-open");
        };
        LightGallery2.prototype.openGallery = function(index8, element) {
          var _this = this;
          if (index8 === void 0) {
            index8 = this.settings.index;
          }
          if (this.lgOpened)
            return;
          this.lgOpened = true;
          this.outer.removeClass("lg-hide-items");
          this.hideScrollbar();
          this.$container.addClass("lg-show");
          var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index8, index8);
          this.currentItemsInDom = itemsToBeInsertedToDom;
          var items = "";
          itemsToBeInsertedToDom.forEach(function(item) {
            items = items + ('<div id="' + item + '" class="lg-item"></div>');
          });
          this.$inner.append(items);
          this.addHtml(index8);
          var transform = "";
          this.mediaContainerPosition = this.getMediaContainerPosition();
          var _a = this.mediaContainerPosition, top = _a.top, bottom = _a.bottom;
          if (!this.settings.allowMediaOverlap) {
            this.setMediaContainerPosition(top, bottom);
          }
          var __slideVideoInfo = this.galleryItems[index8].__slideVideoInfo;
          if (this.zoomFromOrigin && element) {
            this.currentImageSize = utils2.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
            transform = utils2.getTransform(element, this.outer, top, bottom, this.currentImageSize);
          }
          if (!this.zoomFromOrigin || !transform) {
            this.outer.addClass(this.settings.startClass);
            this.getSlideItem(index8).removeClass("lg-complete");
          }
          var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
          setTimeout(function() {
            _this.outer.addClass("lg-components-open");
          }, timeout);
          this.index = index8;
          this.LGel.trigger(lGEvents.beforeOpen);
          this.getSlideItem(index8).addClass("lg-current");
          this.lGalleryOn = false;
          this.prevScrollTop = $LG(window).scrollTop();
          setTimeout(function() {
            if (_this.zoomFromOrigin && transform) {
              var currentSlide_1 = _this.getSlideItem(index8);
              currentSlide_1.css("transform", transform);
              setTimeout(function() {
                currentSlide_1.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", _this.settings.startAnimationDuration + "ms");
                _this.outer.addClass("lg-zoom-from-image");
              });
              setTimeout(function() {
                currentSlide_1.css("transform", "translate3d(0, 0, 0)");
              }, 100);
            }
            setTimeout(function() {
              _this.$backdrop.addClass("in");
              _this.$container.addClass("lg-show-in");
            }, 10);
            setTimeout(function() {
              if (_this.settings.trapFocus && document.body === _this.settings.container) {
                _this.trapFocus();
              }
            }, _this.settings.backdropDuration + 50);
            if (!_this.zoomFromOrigin || !transform) {
              setTimeout(function() {
                _this.outer.addClass("lg-visible");
              }, _this.settings.backdropDuration);
            }
            _this.slide(index8, false, false, false);
            _this.LGel.trigger(lGEvents.afterOpen);
          });
          if (document.body === this.settings.container) {
            $LG("html").addClass("lg-on");
          }
        };
        LightGallery2.prototype.getMediaContainerPosition = function() {
          if (this.settings.allowMediaOverlap) {
            return {
              top: 0,
              bottom: 0
            };
          }
          var top = this.$toolbar.get().clientHeight || 0;
          var subHtml = this.outer.find(".lg-components .lg-sub-html").get();
          var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
          var thumbContainer = this.outer.find(".lg-thumb-outer").get();
          var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
          var bottom = thumbHeight + captionHeight;
          return {
            top,
            bottom
          };
        };
        LightGallery2.prototype.setMediaContainerPosition = function(top, bottom) {
          if (top === void 0) {
            top = 0;
          }
          if (bottom === void 0) {
            bottom = 0;
          }
          this.$content.css("top", top + "px").css("bottom", bottom + "px");
        };
        LightGallery2.prototype.hideBars = function() {
          var _this = this;
          setTimeout(function() {
            _this.outer.removeClass("lg-hide-items");
            if (_this.settings.hideBarsDelay > 0) {
              _this.outer.on("mousemove.lg click.lg touchstart.lg", function() {
                _this.outer.removeClass("lg-hide-items");
                clearTimeout(_this.hideBarTimeout);
                _this.hideBarTimeout = setTimeout(function() {
                  _this.outer.addClass("lg-hide-items");
                }, _this.settings.hideBarsDelay);
              });
              _this.outer.trigger("mousemove.lg");
            }
          }, this.settings.showBarsAfter);
        };
        LightGallery2.prototype.initPictureFill = function($img) {
          if (this.settings.supportLegacyBrowser) {
            try {
              picturefill({
                elements: [$img.get()]
              });
            } catch (e2) {
              console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.");
            }
          }
        };
        LightGallery2.prototype.counter = function() {
          if (this.settings.counter) {
            var counterHtml = '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' + this.getIdName("lg-counter-current") + '" class="lg-counter-current">' + (this.index + 1) + ' </span> /\n                <span id="' + this.getIdName("lg-counter-all") + '" class="lg-counter-all">' + this.galleryItems.length + " </span></div>";
            this.outer.find(this.settings.appendCounterTo).append(counterHtml);
          }
        };
        LightGallery2.prototype.addHtml = function(index8) {
          var subHtml;
          var subHtmlUrl;
          if (this.galleryItems[index8].subHtmlUrl) {
            subHtmlUrl = this.galleryItems[index8].subHtmlUrl;
          } else {
            subHtml = this.galleryItems[index8].subHtml;
          }
          if (!subHtmlUrl) {
            if (subHtml) {
              var fL = subHtml.substring(0, 1);
              if (fL === "." || fL === "#") {
                if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) {
                  subHtml = $LG(this.items).eq(index8).find(subHtml).first().html();
                } else {
                  subHtml = $LG(subHtml).first().html();
                }
              }
            } else {
              subHtml = "";
            }
          }
          if (this.settings.appendSubHtmlTo !== ".lg-item") {
            if (subHtmlUrl) {
              this.outer.find(".lg-sub-html").load(subHtmlUrl);
            } else {
              this.outer.find(".lg-sub-html").html(subHtml);
            }
          } else {
            var currentSlide = $LG(this.getSlideItemId(index8));
            if (subHtmlUrl) {
              currentSlide.load(subHtmlUrl);
            } else {
              currentSlide.append('<div class="lg-sub-html">' + subHtml + "</div>");
            }
          }
          if (typeof subHtml !== "undefined" && subHtml !== null) {
            if (subHtml === "") {
              this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html");
            } else {
              this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html");
            }
          }
          this.LGel.trigger(lGEvents.afterAppendSubHtml, {
            index: index8
          });
        };
        LightGallery2.prototype.preload = function(index8) {
          for (var i2 = 1; i2 <= this.settings.preload; i2++) {
            if (i2 >= this.galleryItems.length - index8) {
              break;
            }
            this.loadContent(index8 + i2, false);
          }
          for (var j = 1; j <= this.settings.preload; j++) {
            if (index8 - j < 0) {
              break;
            }
            this.loadContent(index8 - j, false);
          }
        };
        LightGallery2.prototype.getDummyImgStyles = function(imageSize) {
          if (!imageSize)
            return "";
          return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
        };
        LightGallery2.prototype.getVideoContStyle = function(imageSize) {
          if (!imageSize)
            return "";
          return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
        };
        LightGallery2.prototype.getDummyImageContent = function($currentSlide, index8, alt) {
          var $currentItem;
          if (!this.settings.dynamic) {
            $currentItem = $LG(this.items).eq(index8);
          }
          if ($currentItem) {
            var _dummyImgSrc = void 0;
            if (!this.settings.exThumbImage) {
              _dummyImgSrc = $currentItem.find("img").first().attr("src");
            } else {
              _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
            }
            if (!_dummyImgSrc)
              return "";
            var imgStyle = this.getDummyImgStyles(this.currentImageSize);
            var dummyImgContent = "<img " + alt + ' style="' + imgStyle + '" class="lg-dummy-img" src="' + _dummyImgSrc + '" />';
            $currentSlide.addClass("lg-first-slide");
            this.outer.addClass("lg-first-slide-loading");
            return dummyImgContent;
          }
          return "";
        };
        LightGallery2.prototype.setImgMarkup = function(src, $currentSlide, index8) {
          var currentGalleryItem = this.galleryItems[index8];
          var alt = currentGalleryItem.alt, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
          var imgContent = "";
          var altAttr = alt ? 'alt="' + alt + '"' : "";
          if (this.isFirstSlideWithZoomAnimation()) {
            imgContent = this.getDummyImageContent($currentSlide, index8, altAttr);
          } else {
            imgContent = utils2.getImgMarkup(index8, src, altAttr, srcset, sizes, sources);
          }
          var imgMarkup = '<picture class="lg-img-wrap"> ' + imgContent + "</picture>";
          $currentSlide.prepend(imgMarkup);
        };
        LightGallery2.prototype.onSlideObjectLoad = function($slide, isHTML5VideoWithoutPoster, onLoad, onError2) {
          var mediaObject = $slide.find(".lg-object").first();
          if (utils2.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) {
            onLoad();
          } else {
            mediaObject.on("load.lg error.lg", function() {
              onLoad && onLoad();
            });
            mediaObject.on("error.lg", function() {
              onError2 && onError2();
            });
          }
        };
        LightGallery2.prototype.onLgObjectLoad = function(currentSlide, index8, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
          var _this = this;
          this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, function() {
            _this.triggerSlideItemLoad(currentSlide, index8, delay, speed, isFirstSlide);
          }, function() {
            currentSlide.addClass("lg-complete lg-complete_");
            currentSlide.html('<span class="lg-error-msg">Oops... Failed to load content...</span>');
          });
        };
        LightGallery2.prototype.triggerSlideItemLoad = function($currentSlide, index8, delay, speed, isFirstSlide) {
          var _this = this;
          var currentGalleryItem = this.galleryItems[index8];
          var _speed = isFirstSlide && this.getSlideType(currentGalleryItem) === "video" && !currentGalleryItem.poster ? speed : 0;
          setTimeout(function() {
            $currentSlide.addClass("lg-complete lg-complete_");
            _this.LGel.trigger(lGEvents.slideItemLoad, {
              index: index8,
              delay: delay || 0,
              isFirstSlide
            });
          }, _speed);
        };
        LightGallery2.prototype.isFirstSlideWithZoomAnimation = function() {
          return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
        };
        LightGallery2.prototype.addSlideVideoInfo = function(items) {
          var _this = this;
          items.forEach(function(element, index8) {
            element.__slideVideoInfo = utils2.isVideo(element.src, !!element.video, index8);
            if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) {
              element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
            }
          });
        };
        LightGallery2.prototype.loadContent = function(index8, rec) {
          var _this = this;
          var currentGalleryItem = this.galleryItems[index8];
          var $currentSlide = $LG(this.getSlideItemId(index8));
          var poster = currentGalleryItem.poster, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
          var src = currentGalleryItem.src;
          var video = currentGalleryItem.video;
          var _html5Video = video && typeof video === "string" ? JSON.parse(video) : video;
          if (currentGalleryItem.responsive) {
            var srcDyItms = currentGalleryItem.responsive.split(",");
            src = utils2.getResponsiveSrc(srcDyItms) || src;
          }
          var videoInfo = currentGalleryItem.__slideVideoInfo;
          var lgVideoStyle = "";
          var iframe = !!currentGalleryItem.iframe;
          var isFirstSlide = !this.lGalleryOn;
          var delay = 0;
          if (isFirstSlide) {
            if (this.zoomFromOrigin && this.currentImageSize) {
              delay = this.settings.startAnimationDuration + 10;
            } else {
              delay = this.settings.backdropDuration + 10;
            }
          }
          if (!$currentSlide.hasClass("lg-loaded")) {
            if (videoInfo) {
              var _a = this.mediaContainerPosition, top_2 = _a.top, bottom = _a.bottom;
              var videoSize = utils2.getSize(this.items[index8], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
              lgVideoStyle = this.getVideoContStyle(videoSize);
            }
            if (iframe) {
              var markup = utils2.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
              $currentSlide.prepend(markup);
            } else if (poster) {
              var dummyImg = "";
              var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
              if (hasStartAnimation) {
                dummyImg = this.getDummyImageContent($currentSlide, index8, "");
              }
              var markup = utils2.getVideoPosterMarkup(poster, dummyImg || "", lgVideoStyle, this.settings.strings["playVideo"], videoInfo);
              $currentSlide.prepend(markup);
            } else if (videoInfo) {
              var markup = '<div class="lg-video-cont " style="' + lgVideoStyle + '"></div>';
              $currentSlide.prepend(markup);
            } else {
              this.setImgMarkup(src, $currentSlide, index8);
              if (srcset || sources) {
                var $img = $currentSlide.find(".lg-object");
                this.initPictureFill($img);
              }
            }
            if (poster || videoInfo) {
              this.LGel.trigger(lGEvents.hasVideo, {
                index: index8,
                src,
                html5Video: _html5Video,
                hasPoster: !!poster
              });
            }
            this.LGel.trigger(lGEvents.afterAppendSlide, { index: index8 });
            if (this.lGalleryOn && this.settings.appendSubHtmlTo === ".lg-item") {
              this.addHtml(index8);
            }
          }
          var _speed = 0;
          if (delay && !$LG(document.body).hasClass("lg-from-hash")) {
            _speed = delay;
          }
          if (this.isFirstSlideWithZoomAnimation()) {
            setTimeout(function() {
              $currentSlide.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style");
            }, this.settings.startAnimationDuration + 100);
            if (!$currentSlide.hasClass("lg-loaded")) {
              setTimeout(function() {
                if (_this.getSlideType(currentGalleryItem) === "image") {
                  var alt = currentGalleryItem.alt;
                  var altAttr = alt ? 'alt="' + alt + '"' : "";
                  $currentSlide.find(".lg-img-wrap").append(utils2.getImgMarkup(index8, src, altAttr, srcset, sizes, currentGalleryItem.sources));
                  if (srcset || sources) {
                    var $img2 = $currentSlide.find(".lg-object");
                    _this.initPictureFill($img2);
                  }
                }
                if (_this.getSlideType(currentGalleryItem) === "image" || _this.getSlideType(currentGalleryItem) === "video" && poster) {
                  _this.onLgObjectLoad($currentSlide, index8, delay, _speed, true, false);
                  _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), function() {
                    _this.loadContentOnFirstSlideLoad(index8, $currentSlide, _speed);
                  }, function() {
                    _this.loadContentOnFirstSlideLoad(index8, $currentSlide, _speed);
                  });
                }
              }, this.settings.startAnimationDuration + 100);
            }
          }
          $currentSlide.addClass("lg-loaded");
          if (!this.isFirstSlideWithZoomAnimation() || this.getSlideType(currentGalleryItem) === "video" && !poster) {
            this.onLgObjectLoad($currentSlide, index8, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
          }
          if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass("lg-complete_") && !this.lGalleryOn) {
            setTimeout(function() {
              $currentSlide.addClass("lg-complete");
            }, this.settings.backdropDuration);
          }
          this.lGalleryOn = true;
          if (rec === true) {
            if (!$currentSlide.hasClass("lg-complete_")) {
              $currentSlide.find(".lg-object").first().on("load.lg error.lg", function() {
                _this.preload(index8);
              });
            } else {
              this.preload(index8);
            }
          }
        };
        LightGallery2.prototype.loadContentOnFirstSlideLoad = function(index8, $currentSlide, speed) {
          var _this = this;
          setTimeout(function() {
            $currentSlide.find(".lg-dummy-img").remove();
            $currentSlide.removeClass("lg-first-slide");
            _this.outer.removeClass("lg-first-slide-loading");
            _this.isDummyImageRemoved = true;
            _this.preload(index8);
          }, speed + 300);
        };
        LightGallery2.prototype.getItemsToBeInsertedToDom = function(index8, prevIndex, numberOfItems) {
          var _this = this;
          if (numberOfItems === void 0) {
            numberOfItems = 0;
          }
          var itemsToBeInsertedToDom = [];
          var possibleNumberOfItems = Math.max(numberOfItems, 3);
          possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
          var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
          if (this.galleryItems.length <= 3) {
            this.galleryItems.forEach(function(_element, index9) {
              itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index9);
            });
            return itemsToBeInsertedToDom;
          }
          if (index8 < (this.galleryItems.length - 1) / 2) {
            for (var idx = index8; idx > index8 - possibleNumberOfItems / 2 && idx >= 0; idx--) {
              itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
            }
            var numberOfExistingItems = itemsToBeInsertedToDom.length;
            for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
              itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index8 + idx + 1));
            }
          } else {
            for (var idx = index8; idx <= this.galleryItems.length - 1 && idx < index8 + possibleNumberOfItems / 2; idx++) {
              itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
            }
            var numberOfExistingItems = itemsToBeInsertedToDom.length;
            for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
              itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index8 - idx - 1));
            }
          }
          if (this.settings.loop) {
            if (index8 === this.galleryItems.length - 1) {
              itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0);
            } else if (index8 === 0) {
              itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
            }
          }
          if (itemsToBeInsertedToDom.indexOf(prevIndexItem) === -1) {
            itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
          }
          return itemsToBeInsertedToDom;
        };
        LightGallery2.prototype.organizeSlideItems = function(index8, prevIndex) {
          var _this = this;
          var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index8, prevIndex, this.settings.numberOfSlideItemsInDom);
          itemsToBeInsertedToDom.forEach(function(item) {
            if (_this.currentItemsInDom.indexOf(item) === -1) {
              _this.$inner.append('<div id="' + item + '" class="lg-item"></div>');
            }
          });
          this.currentItemsInDom.forEach(function(item) {
            if (itemsToBeInsertedToDom.indexOf(item) === -1) {
              $LG("#" + item).remove();
            }
          });
          return itemsToBeInsertedToDom;
        };
        LightGallery2.prototype.getPreviousSlideIndex = function() {
          var prevIndex = 0;
          try {
            var currentItemId = this.outer.find(".lg-current").first().attr("id");
            prevIndex = parseInt(currentItemId.split("-")[3]) || 0;
          } catch (error2) {
            prevIndex = 0;
          }
          return prevIndex;
        };
        LightGallery2.prototype.setDownloadValue = function(index8) {
          if (this.settings.download) {
            var currentGalleryItem = this.galleryItems[index8];
            var hideDownloadBtn = currentGalleryItem.downloadUrl === false || currentGalleryItem.downloadUrl === "false";
            if (hideDownloadBtn) {
              this.outer.addClass("lg-hide-download");
            } else {
              var $download = this.getElementById("lg-download");
              this.outer.removeClass("lg-hide-download");
              $download.attr("href", currentGalleryItem.downloadUrl || currentGalleryItem.src);
              if (currentGalleryItem.download) {
                $download.attr("download", currentGalleryItem.download);
              }
            }
          }
        };
        LightGallery2.prototype.makeSlideAnimation = function(direction, currentSlideItem, previousSlideItem) {
          var _this = this;
          if (this.lGalleryOn) {
            previousSlideItem.addClass("lg-slide-progress");
          }
          setTimeout(function() {
            _this.outer.addClass("lg-no-trans");
            _this.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide");
            if (direction === "prev") {
              currentSlideItem.addClass("lg-prev-slide");
              previousSlideItem.addClass("lg-next-slide");
            } else {
              currentSlideItem.addClass("lg-next-slide");
              previousSlideItem.addClass("lg-prev-slide");
            }
            setTimeout(function() {
              _this.outer.find(".lg-item").removeClass("lg-current");
              currentSlideItem.addClass("lg-current");
              _this.outer.removeClass("lg-no-trans");
            }, 50);
          }, this.lGalleryOn ? this.settings.slideDelay : 0);
        };
        LightGallery2.prototype.slide = function(index8, fromTouch, fromThumb, direction) {
          var _this = this;
          var prevIndex = this.getPreviousSlideIndex();
          this.currentItemsInDom = this.organizeSlideItems(index8, prevIndex);
          if (this.lGalleryOn && prevIndex === index8) {
            return;
          }
          var numberOfGalleryItems = this.galleryItems.length;
          if (!this.lgBusy) {
            if (this.settings.counter) {
              this.updateCurrentCounter(index8);
            }
            var currentSlideItem = this.getSlideItem(index8);
            var previousSlideItem_1 = this.getSlideItem(prevIndex);
            var currentGalleryItem = this.galleryItems[index8];
            var videoInfo = currentGalleryItem.__slideVideoInfo;
            this.outer.attr("data-lg-slide-type", this.getSlideType(currentGalleryItem));
            this.setDownloadValue(index8);
            if (videoInfo) {
              var _a = this.mediaContainerPosition, top_3 = _a.top, bottom = _a.bottom;
              var videoSize = utils2.getSize(this.items[index8], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
              this.resizeVideoSlide(index8, videoSize);
            }
            this.LGel.trigger(lGEvents.beforeSlide, {
              prevIndex,
              index: index8,
              fromTouch: !!fromTouch,
              fromThumb: !!fromThumb
            });
            this.lgBusy = true;
            clearTimeout(this.hideBarTimeout);
            this.arrowDisable(index8);
            if (!direction) {
              if (index8 < prevIndex) {
                direction = "prev";
              } else if (index8 > prevIndex) {
                direction = "next";
              }
            }
            if (!fromTouch) {
              this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1);
            } else {
              this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
              var touchPrev = void 0;
              var touchNext = void 0;
              if (numberOfGalleryItems > 2) {
                touchPrev = index8 - 1;
                touchNext = index8 + 1;
                if (index8 === 0 && prevIndex === numberOfGalleryItems - 1) {
                  touchNext = 0;
                  touchPrev = numberOfGalleryItems - 1;
                } else if (index8 === numberOfGalleryItems - 1 && prevIndex === 0) {
                  touchNext = 0;
                  touchPrev = numberOfGalleryItems - 1;
                }
              } else {
                touchPrev = 0;
                touchNext = 1;
              }
              if (direction === "prev") {
                this.getSlideItem(touchNext).addClass("lg-next-slide");
              } else {
                this.getSlideItem(touchPrev).addClass("lg-prev-slide");
              }
              currentSlideItem.addClass("lg-current");
            }
            if (!this.lGalleryOn) {
              this.loadContent(index8, true);
            } else {
              setTimeout(function() {
                _this.loadContent(index8, true);
                if (_this.settings.appendSubHtmlTo !== ".lg-item") {
                  _this.addHtml(index8);
                }
              }, this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
            }
            setTimeout(function() {
              _this.lgBusy = false;
              previousSlideItem_1.removeClass("lg-slide-progress");
              _this.LGel.trigger(lGEvents.afterSlide, {
                prevIndex,
                index: index8,
                fromTouch,
                fromThumb
              });
            }, (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
          }
          this.index = index8;
        };
        LightGallery2.prototype.updateCurrentCounter = function(index8) {
          this.getElementById("lg-counter-current").html(index8 + 1 + "");
        };
        LightGallery2.prototype.updateCounterTotal = function() {
          this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
        };
        LightGallery2.prototype.getSlideType = function(item) {
          if (item.__slideVideoInfo) {
            return "video";
          } else if (item.iframe) {
            return "iframe";
          } else {
            return "image";
          }
        };
        LightGallery2.prototype.touchMove = function(startCoords, endCoords, e2) {
          var distanceX = endCoords.pageX - startCoords.pageX;
          var distanceY = endCoords.pageY - startCoords.pageY;
          var allowSwipe = false;
          if (this.swipeDirection) {
            allowSwipe = true;
          } else {
            if (Math.abs(distanceX) > 15) {
              this.swipeDirection = "horizontal";
              allowSwipe = true;
            } else if (Math.abs(distanceY) > 15) {
              this.swipeDirection = "vertical";
              allowSwipe = true;
            }
          }
          if (!allowSwipe) {
            return;
          }
          var $currentSlide = this.getSlideItem(this.index);
          if (this.swipeDirection === "horizontal") {
            e2 === null || e2 === void 0 ? void 0 : e2.preventDefault();
            this.outer.addClass("lg-dragging");
            this.setTranslate($currentSlide, distanceX, 0);
            var width = $currentSlide.get().offsetWidth;
            var slideWidthAmount = width * 15 / 100;
            var gutter = slideWidthAmount - Math.abs(distanceX * 10 / 100);
            this.setTranslate(this.outer.find(".lg-prev-slide").first(), -width + distanceX - gutter, 0);
            this.setTranslate(this.outer.find(".lg-next-slide").first(), width + distanceX + gutter, 0);
          } else if (this.swipeDirection === "vertical") {
            if (this.settings.swipeToClose) {
              e2 === null || e2 === void 0 ? void 0 : e2.preventDefault();
              this.$container.addClass("lg-dragging-vertical");
              var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
              this.$backdrop.css("opacity", opacity);
              var scale = 1 - Math.abs(distanceY) / (window.innerWidth * 2);
              this.setTranslate($currentSlide, 0, distanceY, scale, scale);
              if (Math.abs(distanceY) > 100) {
                this.outer.addClass("lg-hide-items").removeClass("lg-components-open");
              }
            }
          }
        };
        LightGallery2.prototype.touchEnd = function(endCoords, startCoords, event) {
          var _this = this;
          var distance;
          if (this.settings.mode !== "lg-slide") {
            this.outer.addClass("lg-slide");
          }
          setTimeout(function() {
            _this.$container.removeClass("lg-dragging-vertical");
            _this.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
            var triggerClick = true;
            if (_this.swipeDirection === "horizontal") {
              distance = endCoords.pageX - startCoords.pageX;
              var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
              if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
                _this.goToNextSlide(true);
                triggerClick = false;
              } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
                _this.goToPrevSlide(true);
                triggerClick = false;
              }
            } else if (_this.swipeDirection === "vertical") {
              distance = Math.abs(endCoords.pageY - startCoords.pageY);
              if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
                _this.closeGallery();
                return;
              } else {
                _this.$backdrop.css("opacity", 1);
              }
            }
            _this.outer.find(".lg-item").removeAttr("style");
            if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
              var target = $LG(event.target);
              if (_this.isPosterElement(target)) {
                _this.LGel.trigger(lGEvents.posterClick);
              }
            }
            _this.swipeDirection = void 0;
          });
          setTimeout(function() {
            if (!_this.outer.hasClass("lg-dragging") && _this.settings.mode !== "lg-slide") {
              _this.outer.removeClass("lg-slide");
            }
          }, this.settings.speed + 100);
        };
        LightGallery2.prototype.enableSwipe = function() {
          var _this = this;
          var startCoords = {};
          var endCoords = {};
          var isMoved = false;
          var isSwiping = false;
          if (this.settings.enableSwipe) {
            this.$inner.on("touchstart.lg", function(e2) {
              _this.dragOrSwipeEnabled = true;
              var $item = _this.getSlideItem(_this.index);
              if (($LG(e2.target).hasClass("lg-item") || $item.get().contains(e2.target)) && !_this.outer.hasClass("lg-zoomed") && !_this.lgBusy && e2.targetTouches.length === 1) {
                isSwiping = true;
                _this.touchAction = "swipe";
                _this.manageSwipeClass();
                startCoords = {
                  pageX: e2.targetTouches[0].pageX,
                  pageY: e2.targetTouches[0].pageY
                };
              }
            });
            this.$inner.on("touchmove.lg", function(e2) {
              if (isSwiping && _this.touchAction === "swipe" && e2.targetTouches.length === 1) {
                endCoords = {
                  pageX: e2.targetTouches[0].pageX,
                  pageY: e2.targetTouches[0].pageY
                };
                _this.touchMove(startCoords, endCoords, e2);
                isMoved = true;
              }
            });
            this.$inner.on("touchend.lg", function(event) {
              if (_this.touchAction === "swipe") {
                if (isMoved) {
                  isMoved = false;
                  _this.touchEnd(endCoords, startCoords, event);
                } else if (isSwiping) {
                  var target = $LG(event.target);
                  if (_this.isPosterElement(target)) {
                    _this.LGel.trigger(lGEvents.posterClick);
                  }
                }
                _this.touchAction = void 0;
                isSwiping = false;
              }
            });
          }
        };
        LightGallery2.prototype.enableDrag = function() {
          var _this = this;
          var startCoords = {};
          var endCoords = {};
          var isDraging = false;
          var isMoved = false;
          if (this.settings.enableDrag) {
            this.outer.on("mousedown.lg", function(e2) {
              _this.dragOrSwipeEnabled = true;
              var $item = _this.getSlideItem(_this.index);
              if ($LG(e2.target).hasClass("lg-item") || $item.get().contains(e2.target)) {
                if (!_this.outer.hasClass("lg-zoomed") && !_this.lgBusy) {
                  e2.preventDefault();
                  if (!_this.lgBusy) {
                    _this.manageSwipeClass();
                    startCoords = {
                      pageX: e2.pageX,
                      pageY: e2.pageY
                    };
                    isDraging = true;
                    _this.outer.get().scrollLeft += 1;
                    _this.outer.get().scrollLeft -= 1;
                    _this.outer.removeClass("lg-grab").addClass("lg-grabbing");
                    _this.LGel.trigger(lGEvents.dragStart);
                  }
                }
              }
            });
            $LG(window).on("mousemove.lg.global" + this.lgId, function(e2) {
              if (isDraging && _this.lgOpened) {
                isMoved = true;
                endCoords = {
                  pageX: e2.pageX,
                  pageY: e2.pageY
                };
                _this.touchMove(startCoords, endCoords);
                _this.LGel.trigger(lGEvents.dragMove);
              }
            });
            $LG(window).on("mouseup.lg.global" + this.lgId, function(event) {
              if (!_this.lgOpened) {
                return;
              }
              var target = $LG(event.target);
              if (isMoved) {
                isMoved = false;
                _this.touchEnd(endCoords, startCoords, event);
                _this.LGel.trigger(lGEvents.dragEnd);
              } else if (_this.isPosterElement(target)) {
                _this.LGel.trigger(lGEvents.posterClick);
              }
              if (isDraging) {
                isDraging = false;
                _this.outer.removeClass("lg-grabbing").addClass("lg-grab");
              }
            });
          }
        };
        LightGallery2.prototype.triggerPosterClick = function() {
          var _this = this;
          this.$inner.on("click.lg", function(event) {
            if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) {
              _this.LGel.trigger(lGEvents.posterClick);
            }
          });
        };
        LightGallery2.prototype.manageSwipeClass = function() {
          var _touchNext = this.index + 1;
          var _touchPrev = this.index - 1;
          if (this.settings.loop && this.galleryItems.length > 2) {
            if (this.index === 0) {
              _touchPrev = this.galleryItems.length - 1;
            } else if (this.index === this.galleryItems.length - 1) {
              _touchNext = 0;
            }
          }
          this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide");
          if (_touchPrev > -1) {
            this.getSlideItem(_touchPrev).addClass("lg-prev-slide");
          }
          this.getSlideItem(_touchNext).addClass("lg-next-slide");
        };
        LightGallery2.prototype.goToNextSlide = function(fromTouch) {
          var _this = this;
          var _loop = this.settings.loop;
          if (fromTouch && this.galleryItems.length < 3) {
            _loop = false;
          }
          if (!this.lgBusy) {
            if (this.index + 1 < this.galleryItems.length) {
              this.index++;
              this.LGel.trigger(lGEvents.beforeNextSlide, {
                index: this.index
              });
              this.slide(this.index, !!fromTouch, false, "next");
            } else {
              if (_loop) {
                this.index = 0;
                this.LGel.trigger(lGEvents.beforeNextSlide, {
                  index: this.index
                });
                this.slide(this.index, !!fromTouch, false, "next");
              } else if (this.settings.slideEndAnimation && !fromTouch) {
                this.outer.addClass("lg-right-end");
                setTimeout(function() {
                  _this.outer.removeClass("lg-right-end");
                }, 400);
              }
            }
          }
        };
        LightGallery2.prototype.goToPrevSlide = function(fromTouch) {
          var _this = this;
          var _loop = this.settings.loop;
          if (fromTouch && this.galleryItems.length < 3) {
            _loop = false;
          }
          if (!this.lgBusy) {
            if (this.index > 0) {
              this.index--;
              this.LGel.trigger(lGEvents.beforePrevSlide, {
                index: this.index,
                fromTouch
              });
              this.slide(this.index, !!fromTouch, false, "prev");
            } else {
              if (_loop) {
                this.index = this.galleryItems.length - 1;
                this.LGel.trigger(lGEvents.beforePrevSlide, {
                  index: this.index,
                  fromTouch
                });
                this.slide(this.index, !!fromTouch, false, "prev");
              } else if (this.settings.slideEndAnimation && !fromTouch) {
                this.outer.addClass("lg-left-end");
                setTimeout(function() {
                  _this.outer.removeClass("lg-left-end");
                }, 400);
              }
            }
          }
        };
        LightGallery2.prototype.keyPress = function() {
          var _this = this;
          $LG(window).on("keydown.lg.global" + this.lgId, function(e2) {
            if (_this.lgOpened && _this.settings.escKey === true && e2.keyCode === 27) {
              e2.preventDefault();
              if (_this.settings.allowMediaOverlap && _this.outer.hasClass("lg-can-toggle") && _this.outer.hasClass("lg-components-open")) {
                _this.outer.removeClass("lg-components-open");
              } else {
                _this.closeGallery();
              }
            }
            if (_this.lgOpened && _this.galleryItems.length > 1) {
              if (e2.keyCode === 37) {
                e2.preventDefault();
                _this.goToPrevSlide();
              }
              if (e2.keyCode === 39) {
                e2.preventDefault();
                _this.goToNextSlide();
              }
            }
          });
        };
        LightGallery2.prototype.arrow = function() {
          var _this = this;
          this.getElementById("lg-prev").on("click.lg", function() {
            _this.goToPrevSlide();
          });
          this.getElementById("lg-next").on("click.lg", function() {
            _this.goToNextSlide();
          });
        };
        LightGallery2.prototype.arrowDisable = function(index8) {
          if (!this.settings.loop && this.settings.hideControlOnEnd) {
            var $prev = this.getElementById("lg-prev");
            var $next = this.getElementById("lg-next");
            if (index8 + 1 === this.galleryItems.length) {
              $next.attr("disabled", "disabled").addClass("disabled");
            } else {
              $next.removeAttr("disabled").removeClass("disabled");
            }
            if (index8 === 0) {
              $prev.attr("disabled", "disabled").addClass("disabled");
            } else {
              $prev.removeAttr("disabled").removeClass("disabled");
            }
          }
        };
        LightGallery2.prototype.setTranslate = function($el, xValue, yValue, scaleX, scaleY) {
          if (scaleX === void 0) {
            scaleX = 1;
          }
          if (scaleY === void 0) {
            scaleY = 1;
          }
          $el.css("transform", "translate3d(" + xValue + "px, " + yValue + "px, 0px) scale3d(" + scaleX + ", " + scaleY + ", 1)");
        };
        LightGallery2.prototype.mousewheel = function() {
          var _this = this;
          var lastCall = 0;
          this.outer.on("wheel.lg", function(e2) {
            if (!e2.deltaY || _this.galleryItems.length < 2) {
              return;
            }
            e2.preventDefault();
            var now = new Date().getTime();
            if (now - lastCall < 1e3) {
              return;
            }
            lastCall = now;
            if (e2.deltaY > 0) {
              _this.goToNextSlide();
            } else if (e2.deltaY < 0) {
              _this.goToPrevSlide();
            }
          });
        };
        LightGallery2.prototype.isSlideElement = function(target) {
          return target.hasClass("lg-outer") || target.hasClass("lg-item") || target.hasClass("lg-img-wrap");
        };
        LightGallery2.prototype.isPosterElement = function(target) {
          var playButton = this.getSlideItem(this.index).find(".lg-video-play-button").get();
          return target.hasClass("lg-video-poster") || target.hasClass("lg-video-play-button") || playButton && playButton.contains(target.get());
        };
        LightGallery2.prototype.toggleMaximize = function() {
          var _this = this;
          this.getElementById("lg-maximize").on("click.lg", function() {
            _this.$container.toggleClass("lg-inline");
            _this.refreshOnResize();
          });
        };
        LightGallery2.prototype.invalidateItems = function() {
          for (var index8 = 0; index8 < this.items.length; index8++) {
            var element = this.items[index8];
            var $element = $LG(element);
            $element.off("click.lgcustom-item-" + $element.attr("data-lg-id"));
          }
        };
        LightGallery2.prototype.trapFocus = function() {
          var _this = this;
          this.$container.get().focus({
            preventScroll: true
          });
          $LG(window).on("keydown.lg.global" + this.lgId, function(e2) {
            if (!_this.lgOpened) {
              return;
            }
            var isTabPressed = e2.key === "Tab" || e2.keyCode === 9;
            if (!isTabPressed) {
              return;
            }
            var focusableEls = utils2.getFocusableElements(_this.$container.get());
            var firstFocusableEl = focusableEls[0];
            var lastFocusableEl = focusableEls[focusableEls.length - 1];
            if (e2.shiftKey) {
              if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e2.preventDefault();
              }
            } else {
              if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e2.preventDefault();
              }
            }
          });
        };
        LightGallery2.prototype.manageCloseGallery = function() {
          var _this = this;
          if (!this.settings.closable)
            return;
          var mousedown = false;
          this.getElementById("lg-close").on("click.lg", function() {
            _this.closeGallery();
          });
          if (this.settings.closeOnTap) {
            this.outer.on("mousedown.lg", function(e2) {
              var target = $LG(e2.target);
              if (_this.isSlideElement(target)) {
                mousedown = true;
              } else {
                mousedown = false;
              }
            });
            this.outer.on("mousemove.lg", function() {
              mousedown = false;
            });
            this.outer.on("mouseup.lg", function(e2) {
              var target = $LG(e2.target);
              if (_this.isSlideElement(target) && mousedown) {
                if (!_this.outer.hasClass("lg-dragging")) {
                  _this.closeGallery();
                }
              }
            });
          }
        };
        LightGallery2.prototype.closeGallery = function(force) {
          var _this = this;
          if (!this.lgOpened || !this.settings.closable && !force) {
            return 0;
          }
          this.LGel.trigger(lGEvents.beforeClose);
          if (this.settings.resetScrollPosition && !this.settings.hideScrollbar) {
            $LG(window).scrollTop(this.prevScrollTop);
          }
          var currentItem = this.items[this.index];
          var transform;
          if (this.zoomFromOrigin && currentItem) {
            var _a = this.mediaContainerPosition, top_4 = _a.top, bottom = _a.bottom;
            var _b = this.galleryItems[this.index], __slideVideoInfo = _b.__slideVideoInfo, poster = _b.poster;
            var imageSize = utils2.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
            transform = utils2.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
          }
          if (this.zoomFromOrigin && transform) {
            this.outer.addClass("lg-closing lg-zoom-from-image");
            this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration", this.settings.startAnimationDuration + "ms").css("transform", transform);
          } else {
            this.outer.addClass("lg-hide-items");
            this.outer.removeClass("lg-zoom-from-image");
          }
          this.destroyModules();
          this.lGalleryOn = false;
          this.isDummyImageRemoved = false;
          this.zoomFromOrigin = this.settings.zoomFromOrigin;
          clearTimeout(this.hideBarTimeout);
          this.hideBarTimeout = false;
          $LG("html").removeClass("lg-on");
          this.outer.removeClass("lg-visible lg-components-open");
          this.$backdrop.removeClass("in").css("opacity", 0);
          var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
          this.$container.removeClass("lg-show-in");
          setTimeout(function() {
            if (_this.zoomFromOrigin && transform) {
              _this.outer.removeClass("lg-zoom-from-image");
            }
            _this.$container.removeClass("lg-show");
            _this.resetScrollBar();
            _this.$backdrop.removeAttr("style").css("transition-duration", _this.settings.backdropDuration + "ms");
            _this.outer.removeClass("lg-closing " + _this.settings.startClass);
            _this.getSlideItem(_this.index).removeClass("lg-start-end-progress");
            _this.$inner.empty();
            if (_this.lgOpened) {
              _this.LGel.trigger(lGEvents.afterClose, {
                instance: _this
              });
            }
            if (_this.$container.get()) {
              _this.$container.get().blur();
            }
            _this.lgOpened = false;
          }, removeTimeout + 100);
          return removeTimeout + 100;
        };
        LightGallery2.prototype.initModules = function() {
          this.plugins.forEach(function(module3) {
            try {
              module3.init();
            } catch (err) {
              console.warn("lightGallery:- make sure lightGallery module is properly initiated");
            }
          });
        };
        LightGallery2.prototype.destroyModules = function(destroy2) {
          this.plugins.forEach(function(module3) {
            try {
              if (destroy2) {
                module3.destroy();
              } else {
                module3.closeGallery && module3.closeGallery();
              }
            } catch (err) {
              console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
            }
          });
        };
        LightGallery2.prototype.refresh = function(galleryItems) {
          if (!this.settings.dynamic) {
            this.invalidateItems();
          }
          if (galleryItems) {
            this.galleryItems = galleryItems;
          } else {
            this.galleryItems = this.getItems();
          }
          this.updateControls();
          this.openGalleryOnItemClick();
          this.LGel.trigger(lGEvents.updateSlides);
        };
        LightGallery2.prototype.updateControls = function() {
          this.addSlideVideoInfo(this.galleryItems);
          this.updateCounterTotal();
          this.manageSingleSlideClassName();
        };
        LightGallery2.prototype.destroy = function() {
          var _this = this;
          var closeTimeout = this.closeGallery(true);
          setTimeout(function() {
            _this.destroyModules(true);
            if (!_this.settings.dynamic) {
              _this.invalidateItems();
            }
            $LG(window).off(".lg.global" + _this.lgId);
            _this.LGel.off(".lg");
            _this.$container.remove();
          }, closeTimeout);
          return closeTimeout;
        };
        return LightGallery2;
      }();
      function lightGallery(el, options) {
        return new LightGallery(el, options);
      }
      return lightGallery;
    });
  }
});

// .svelte-kit/output/server/entries/pages/tema/preview/001.svelte.js
var svelte_exports = {};
__export(svelte_exports, {
  default: () => _001
});
var import_lightgallery, css$4, Cover, css$33, Hero2, css$23, Fa2, css$13, Brides, css13, SaveTheDate, Gallery, _001;
var init_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/tema/preview/001.svelte.js"() {
    init_index_c5e2452c();
    init_index_es_638ce7e7();
    import_lightgallery = __toESM(require_lightgallery_umd(), 1);
    css$4 = {
      code: "section.svelte-1ndw765{position:fixed;top:0;left:0;z-index:999;height:100vh;width:100vw;transition:0.3s ease;line-height:1}section.hide.svelte-1ndw765{transform:translateY(-100%)}.container.svelte-1ndw765{background-size:cover;background-repeat:no-repeat;background-position:center center;height:100%;color:whitesmoke;width:100%;padding:0}.overlay.svelte-1ndw765{position:absolute;top:0;left:0;width:100%;height:100%;background:#25252581;z-index:1}.content.svelte-1ndw765{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.5rem;height:100%;width:100%;padding:1rem;position:absolute;z-index:2;color:whitesmoke;text-align:center}h1.svelte-1ndw765{font-family:'Arima', cursive;font-weight:900;font-size:3rem}button.svelte-1ndw765{background-color:var(--primary-color);padding:0.3rem 1rem;font-size:1.1em;border:none;border-radius:0.5em;color:whitesmoke;box-shadow:var(--box-shadow);cursor:pointer;margin-top:1rem}",
      map: null
    };
    Cover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$4);
      return `<section class="${escape(null_to_empty("")) + " svelte-1ndw765"}"><div class="${"container svelte-1ndw765"}" style="${"background-image: url('https://cdn.imweb.me/upload/S201904265cc294845b98d/3aeac83be14ce.jpg');"}"><div class="${"overlay svelte-1ndw765"}"></div>
        <div class="${"content svelte-1ndw765"}"><p>Hai..</p>
            <p>You are invited to our wedding day</p>
            <h1 class="${"svelte-1ndw765"}">Andy &amp; Indah</h1>
            <button class="${"svelte-1ndw765"}">Let&#39;s Begin</button></div></div>
</section>`;
    });
    css$33 = {
      code: "section.svelte-86kb3g{height:100%;min-height:100vh;position:relative}.container.svelte-86kb3g{background-position:center center;background-size:cover;background-repeat:no-repeat;display:flex;flex-direction:column;align-items:center;height:100%;position:absolute;width:100%;padding:1rem}.overlay.svelte-86kb3g{position:absolute;top:0;left:0;width:100%;height:100%;background:#25252581;z-index:1}.content.svelte-86kb3g{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;margin-top:-1rem;padding:1rem;position:absolute;z-index:2;color:whitesmoke}.image.svelte-86kb3g{width:80%;aspect-ratio:9 / 14;border-radius:10px;overflow:hidden}img.svelte-86kb3g{width:100%;height:100%;object-fit:cover}h1.svelte-86kb3g{font-family:'Arima', cursive;font-weight:900;font-size:3rem}h3.svelte-86kb3g{transform:scaleX(1.1);letter-spacing:3px;text-transform:uppercase;font-weight:600;font-size:1rem}",
      map: null
    };
    Hero2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$33);
      return `<section class="${"svelte-86kb3g"}"><div class="${"container svelte-86kb3g"}" style="${"background-image: url('https://cdn.imweb.me/upload/S201904265cc294845b98d/3aeac83be14ce.jpg');"}"><div class="${"overlay svelte-86kb3g"}"></div>
        <div class="${"content svelte-86kb3g"}">
            <div class="${"image svelte-86kb3g"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/3aeac83be14ce.jpg"}" loading="${"lazy"}" class="${"svelte-86kb3g"}"></div>
            <p style="${"margin-top: 1rem;"}">Wedding Invitation</p>
            <h1 class="${"svelte-86kb3g"}">Andi &amp; Indah</h1>
            <p style="${"font-style: italic;"}">#2gether4ever</p>
            <h3 class="${"svelte-86kb3g"}">Minggu, 12 April 2023</h3></div></div>
</section>`;
    });
    css$23 = {
      code: ".spin.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 2s 0s infinite linear}.pulse.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 1s infinite steps(8)}@keyframes svelte-1cj2gr0-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
      map: null
    };
    Fa2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { class: clazz = "" } = $$props;
      let { id = "" } = $$props;
      let { style = "" } = $$props;
      let { icon } = $$props;
      let { size = "" } = $$props;
      let { color = "" } = $$props;
      let { fw = false } = $$props;
      let { pull = "" } = $$props;
      let { scale = 1 } = $$props;
      let { translateX = 0 } = $$props;
      let { translateY = 0 } = $$props;
      let { rotate = "" } = $$props;
      let { flip = false } = $$props;
      let { spin = false } = $$props;
      let { pulse = false } = $$props;
      let { primaryColor = "" } = $$props;
      let { secondaryColor = "" } = $$props;
      let { primaryOpacity = 1 } = $$props;
      let { secondaryOpacity = 0.4 } = $$props;
      let { swapOpacity = false } = $$props;
      let i2;
      let s3;
      let transform;
      if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
        $$bindings.class(clazz);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.style === void 0 && $$bindings.style && style !== void 0)
        $$bindings.style(style);
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0)
        $$bindings.fw(fw);
      if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0)
        $$bindings.pull(pull);
      if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
        $$bindings.scale(scale);
      if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0)
        $$bindings.translateX(translateX);
      if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0)
        $$bindings.translateY(translateY);
      if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
        $$bindings.rotate(rotate);
      if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0)
        $$bindings.flip(flip);
      if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
        $$bindings.spin(spin);
      if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0)
        $$bindings.pulse(pulse);
      if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0)
        $$bindings.primaryColor(primaryColor);
      if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0)
        $$bindings.secondaryColor(secondaryColor);
      if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0)
        $$bindings.primaryOpacity(primaryOpacity);
      if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0)
        $$bindings.secondaryOpacity(secondaryOpacity);
      if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0)
        $$bindings.swapOpacity(swapOpacity);
      $$result.css.add(css$23);
      i2 = icon && icon.icon || [0, 0, "", [], ""];
      s3 = getStyles(style, size, pull, fw);
      transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
      return `${i2[4] ? `<svg${add_attribute("id", id, 0)} class="${[
        "svelte-fa " + escape(clazz) + " svelte-1cj2gr0",
        (pulse ? "pulse" : "") + " " + (spin ? "spin" : "")
      ].join(" ").trim()}"${add_attribute("style", s3, 0)} viewBox="${"0 0 " + escape(i2[0]) + " " + escape(i2[1])}" aria-hidden="${"true"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}"><g transform="${"translate(" + escape(i2[0] / 2) + " " + escape(i2[1] / 2) + ")"}" transform-origin="${escape(i2[0] / 4) + " 0"}"><g${add_attribute("transform", transform, 0)}>${typeof i2[4] == "string" ? `<path${add_attribute("d", i2[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(" + escape(i2[0] / -2) + " " + escape(i2[1] / -2) + ")"}"></path>` : `
          <path${add_attribute("d", i2[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(" + escape(i2[0] / -2) + " " + escape(i2[1] / -2) + ")"}"></path>
          <path${add_attribute("d", i2[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(" + escape(i2[0] / -2) + " " + escape(i2[1] / -2) + ")"}"></path>`}</g></g></svg>` : ``}`;
    });
    css$13 = {
      code: ".container.svelte-11wk2q7.svelte-11wk2q7{padding:1rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding-block:2rem;gap:2rem}.head.svelte-11wk2q7.svelte-11wk2q7{margin-bottom:3rem;color:var(--primary-color);line-height:1.5}h3.svelte-11wk2q7.svelte-11wk2q7{font-family:'Arima', cursive;font-weight:900;color:var(--primary-color)}.brides.svelte-11wk2q7.svelte-11wk2q7{display:flex;flex-direction:column;justify-content:center;align-items:center}.brides.svelte-11wk2q7 h3.svelte-11wk2q7{margin-top:1rem}.brides.svelte-11wk2q7 a.svelte-11wk2q7{background-color:var(--primary-color);width:2rem;height:2rem;color:whitesmoke;display:flex;justify-content:center;align-items:center;border-radius:5px;margin-top:1rem}.image.svelte-11wk2q7.svelte-11wk2q7{width:200px;height:200px;border-radius:50%;overflow:hidden}img.svelte-11wk2q7.svelte-11wk2q7{width:100%;height:100%;object-fit:cover}",
      map: null
    };
    Brides = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$13);
      return `<section><div class="${"container svelte-11wk2q7"}"><div class="${"head svelte-11wk2q7"}"><h3 class="${"svelte-11wk2q7"}">Bride &amp; Groom</h3>
            <p>Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkai kasih sayang yang Kau ciptakan di antara putra-putri kami:</p></div>
        <div class="${"brides svelte-11wk2q7"}"><div class="${"image svelte-11wk2q7"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/6648600291075.jpg"}" alt="${""}" class="${"svelte-11wk2q7"}"></div>
            <h3 class="${"svelte-11wk2q7"}">Andi Putra Pratama, SE</h3>
            <p style="${"font-style: italic;"}">Putra dari pasangan</p>
            <p style="${"font-weight: 500; color: var(--secondary-color);"}">Bpk. Haris Sustyanto &amp; Ibu. Bella Ayu</p>
            <a href="${"https://instagram.com/ddtamn"}" class="${"svelte-11wk2q7"}">${validate_component(Fa2, "Fa").$$render($$result, { icon: faInstagram }, {}, {})}</a></div>
        <div style="${"margin-bottom: 1rem; color: var(--primary-color); font-size: 6rem; display: flex; justify-content: center; align-items: center; line-height: 1.5; font-family: 'Arima', cursive; font-weight: 900;"}">&amp;</div>
        <div class="${"brides svelte-11wk2q7"}"><div class="${"image svelte-11wk2q7"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/70c569ab32e12.jpg"}" alt="${""}" class="${"svelte-11wk2q7"}"></div>
            <h3 class="${"svelte-11wk2q7"}">Indah Permata Sari, SH., MM</h3>
            <p style="${"font-style: italic;"}">Putri dari pasangan</p>
            <p style="${"font-weight: 500; color: var(--secondary-color);"}">Bpk. Haris Sustyanto &amp; Ibu. Bella Ayu</p>
            <a href="${"https://instagram.com/ddtamn"}" class="${"svelte-11wk2q7"}">${validate_component(Fa2, "Fa").$$render($$result, { icon: faInstagram }, {}, {})}</a></div></div>
</section>`;
    });
    css13 = {
      code: "section.svelte-tug2qs.svelte-tug2qs{background-image:url('https://cdn.imweb.me/upload/S201904265cc294845b98d/72d552aefd853.jpg');background-position:center center;background-size:cover;background-repeat:no-repeat;position:relative;height:300px}.container.svelte-tug2qs.svelte-tug2qs{padding:1rem}.overlay.svelte-tug2qs.svelte-tug2qs{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;background:var(--primary-color);opacity:0.7}.content.svelte-tug2qs.svelte-tug2qs{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:2rem;width:100%;height:100%;left:0;top:0;position:absolute;z-index:2;color:whitesmoke}h1.svelte-tug2qs.svelte-tug2qs{font-size:2rem;letter-spacing:0.5rem;text-transform:uppercase;font-family:'Arima', cursive;font-weight:900}.counter.svelte-tug2qs.svelte-tug2qs{display:flex;justify-content:center;align-items:center;gap:1.3rem}.counter.svelte-tug2qs h6.svelte-tug2qs{font-weight:bold;font-size:1.3rem}a.svelte-tug2qs.svelte-tug2qs{border-radius:5px;border:1px solid whitesmoke;padding:0.5rem 0.8rem;font-size:0.8rem;background-color:var(--primary-color);color:whitesmoke;text-decoration:none;box-shadow:var(--box-shadow)}",
      map: null
    };
    SaveTheDate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css13);
      return `<section class="${"svelte-tug2qs"}"><div class="${"container svelte-tug2qs"}"><div class="${"overlay svelte-tug2qs"}"></div>
        <div class="${"content svelte-tug2qs"}"><h1 class="${"svelte-tug2qs"}">save the date</h1>
            <div class="${"counter svelte-tug2qs"}"><div class="${"count"}"><h6 class="${"svelte-tug2qs"}">00</h6><p>Days</p></div>
                <div class="${"count"}"><h6 class="${"svelte-tug2qs"}">00</h6><p>Hours</p></div>
                <div class="${"count"}"><h6 class="${"svelte-tug2qs"}">00</h6><p>Minutes</p></div>
                <div class="${"count"}"><h6 class="${"svelte-tug2qs"}">00</h6><p>Seconds</p></div></div>
            <a href="${"#d"}" class="${"svelte-tug2qs"}">Add to Calendar</a></div></div>
</section>`;
    });
    Gallery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<section><div class="${"container"}"><div class="${"head"}"><h3>Our Moment&#39;s</h3>
            <p>True love stands by each other\u2019s side on good days and stands closer on bad days</p></div>
        <div class="${"flexbin flexbin-margin"}" id="${"lightgallery"}"><a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/b2d3bc663702a.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/b2d3bc663702a.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/e6e512e4e7668.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/e6e512e4e7668.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/238d27e87b918.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/238d27e87b918.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/74e3f2d06773d.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/74e3f2d06773d.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/2aae3d50e20f6.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/2aae3d50e20f6.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/27c1b036ae3bc.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/27c1b036ae3bc.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/b2fdc287b3da6.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/b2fdc287b3da6.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/32d4161951e3d.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/32d4161951e3d.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/9955a968d7bae.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/9955a968d7bae.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/232fb3b70c156.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/232fb3b70c156.jpg"}" alt="${""}"></a>
            <a href="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/5d43ef2b2f57e.jpg"}"><img src="${"https://cdn.imweb.me/upload/S201904265cc294845b98d/5d43ef2b2f57e.jpg"}" alt="${""}"></a></div></div></section>`;
    });
    _001 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<main>${validate_component(Cover, "Cover").$$render($$result, {}, {}, {})}
    ${validate_component(Hero2, "Hero").$$render($$result, {}, {}, {})}
    ${validate_component(Brides, "Brides").$$render($$result, {}, {}, {})}
    ${validate_component(SaveTheDate, "SaveTheDate").$$render($$result, {}, {}, {})}
    ${validate_component(Gallery, "Gallery").$$render($$result, {}, {}, {})}</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  css: () => css14,
  entry: () => entry7,
  index: () => index7,
  js: () => js7,
  module: () => svelte_exports
});
var index7, entry7, js7, css14;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_svelte();
    index7 = 6;
    entry7 = "pages/tema/preview/001.svelte-2df84ffc.js";
    js7 = ["pages/tema/preview/001.svelte-2df84ffc.js", "chunks/index-b83f0d2a.js", "chunks/index.es-638ce7e7.js"];
    css14 = ["assets/pages/tema/preview/001.svelte-24f2a878.css"];
  }
});

// .svelte-kit/vercel-tmp/serverless.js
var serverless_exports = {};
__export(serverless_exports, {
  default: () => serverless_default
});
module.exports = __toCommonJS(serverless_exports);

// node_modules/@sveltejs/kit/dist/node/polyfills.js
var import_assert = __toESM(require("assert"), 1);
var import_net = __toESM(require("net"), 1);
var import_http = __toESM(require("http"), 1);
var import_stream = __toESM(require("stream"), 1);
var import_buffer = __toESM(require("buffer"), 1);
var import_util = __toESM(require("util"), 1);
var import_web = __toESM(require("stream/web"), 1);
var import_perf_hooks = __toESM(require("perf_hooks"), 1);
var import_types = __toESM(require("util/types"), 1);
var import_events = __toESM(require("events"), 1);
var import_tls = __toESM(require("tls"), 1);
init_commonjsHelpers();
var import_async_hooks = __toESM(require("async_hooks"), 1);
var import_zlib = __toESM(require("zlib"), 1);
var import_crypto = require("crypto");
var symbols$1 = {
  kClose: Symbol("close"),
  kDestroy: Symbol("destroy"),
  kDispatch: Symbol("dispatch"),
  kUrl: Symbol("url"),
  kWriting: Symbol("writing"),
  kResuming: Symbol("resuming"),
  kQueue: Symbol("queue"),
  kConnect: Symbol("connect"),
  kConnecting: Symbol("connecting"),
  kHeadersList: Symbol("headers list"),
  kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
  kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
  kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
  kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
  kKeepAlive: Symbol("keep alive"),
  kHeadersTimeout: Symbol("headers timeout"),
  kBodyTimeout: Symbol("body timeout"),
  kServerName: Symbol("server name"),
  kHost: Symbol("host"),
  kNoRef: Symbol("no ref"),
  kBodyUsed: Symbol("used"),
  kRunning: Symbol("running"),
  kBlocking: Symbol("blocking"),
  kPending: Symbol("pending"),
  kSize: Symbol("size"),
  kBusy: Symbol("busy"),
  kQueued: Symbol("queued"),
  kFree: Symbol("free"),
  kConnected: Symbol("connected"),
  kClosed: Symbol("closed"),
  kNeedDrain: Symbol("need drain"),
  kReset: Symbol("reset"),
  kDestroyed: Symbol("destroyed"),
  kMaxHeadersSize: Symbol("max headers size"),
  kRunningIdx: Symbol("running index"),
  kPendingIdx: Symbol("pending index"),
  kError: Symbol("error"),
  kClients: Symbol("clients"),
  kClient: Symbol("client"),
  kParser: Symbol("parser"),
  kOnDestroyed: Symbol("destroy callbacks"),
  kPipelining: Symbol("pipelinig"),
  kSocket: Symbol("socket"),
  kHostHeader: Symbol("host header"),
  kConnector: Symbol("connector"),
  kStrictContentLength: Symbol("strict content length"),
  kMaxRedirections: Symbol("maxRedirections"),
  kMaxRequests: Symbol("maxRequestsPerClient"),
  kProxy: Symbol("proxy agent options"),
  kCounter: Symbol("socket request counter")
};
var AbortError$2 = class extends Error {
  constructor() {
    super("The operation was aborted");
    this.code = "ABORT_ERR";
    this.name = "AbortError";
  }
};
var UndiciError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "UndiciError";
    this.code = "UND_ERR";
  }
};
var ConnectTimeoutError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ConnectTimeoutError$1);
    this.name = "ConnectTimeoutError";
    this.message = message || "Connect Timeout Error";
    this.code = "UND_ERR_CONNECT_TIMEOUT";
  }
};
var HeadersTimeoutError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, HeadersTimeoutError$1);
    this.name = "HeadersTimeoutError";
    this.message = message || "Headers Timeout Error";
    this.code = "UND_ERR_HEADERS_TIMEOUT";
  }
};
var HeadersOverflowError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, HeadersOverflowError$1);
    this.name = "HeadersOverflowError";
    this.message = message || "Headers Overflow Error";
    this.code = "UND_ERR_HEADERS_OVERFLOW";
  }
};
var BodyTimeoutError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, BodyTimeoutError$1);
    this.name = "BodyTimeoutError";
    this.message = message || "Body Timeout Error";
    this.code = "UND_ERR_BODY_TIMEOUT";
  }
};
var ResponseStatusCodeError$1 = class extends UndiciError {
  constructor(message, statusCode, headers2) {
    super(message);
    Error.captureStackTrace(this, ResponseStatusCodeError$1);
    this.name = "ResponseStatusCodeError";
    this.message = message || "Response Status Code Error";
    this.code = "UND_ERR_RESPONSE_STATUS_CODE";
    this.status = statusCode;
    this.statusCode = statusCode;
    this.headers = headers2;
  }
};
var InvalidArgumentError$f = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InvalidArgumentError$f);
    this.name = "InvalidArgumentError";
    this.message = message || "Invalid Argument Error";
    this.code = "UND_ERR_INVALID_ARG";
  }
};
var InvalidReturnValueError$2 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InvalidReturnValueError$2);
    this.name = "InvalidReturnValueError";
    this.message = message || "Invalid Return Value Error";
    this.code = "UND_ERR_INVALID_RETURN_VALUE";
  }
};
var RequestAbortedError$8 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, RequestAbortedError$8);
    this.name = "AbortError";
    this.message = message || "Request aborted";
    this.code = "UND_ERR_ABORTED";
  }
};
var InformationalError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InformationalError$1);
    this.name = "InformationalError";
    this.message = message || "Request information";
    this.code = "UND_ERR_INFO";
  }
};
var RequestContentLengthMismatchError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, RequestContentLengthMismatchError$1);
    this.name = "RequestContentLengthMismatchError";
    this.message = message || "Request body length does not match content-length header";
    this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";
  }
};
var ResponseContentLengthMismatchError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ResponseContentLengthMismatchError$1);
    this.name = "ResponseContentLengthMismatchError";
    this.message = message || "Response body length does not match content-length header";
    this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH";
  }
};
var ClientDestroyedError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ClientDestroyedError$1);
    this.name = "ClientDestroyedError";
    this.message = message || "The client is destroyed";
    this.code = "UND_ERR_DESTROYED";
  }
};
var ClientClosedError$1 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ClientClosedError$1);
    this.name = "ClientClosedError";
    this.message = message || "The client is closed";
    this.code = "UND_ERR_CLOSED";
  }
};
var SocketError$3 = class extends UndiciError {
  constructor(message, socket) {
    super(message);
    Error.captureStackTrace(this, SocketError$3);
    this.name = "SocketError";
    this.message = message || "Socket error";
    this.code = "UND_ERR_SOCKET";
    this.socket = socket;
  }
};
var NotSupportedError$3 = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError$3);
    this.name = "NotSupportedError";
    this.message = message || "Not supported error";
    this.code = "UND_ERR_NOT_SUPPORTED";
  }
};
var BalancedPoolMissingUpstreamError = class extends UndiciError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError$3);
    this.name = "MissingUpstreamError";
    this.message = message || "No upstream has been added to the BalancedPool";
    this.code = "UND_ERR_BPL_MISSING_UPSTREAM";
  }
};
var HTTPParserError$1 = class extends Error {
  constructor(message, code, data) {
    super(message);
    Error.captureStackTrace(this, HTTPParserError$1);
    this.name = "HTTPParserError";
    this.code = code ? `HPE_${code}` : void 0;
    this.data = data ? data.toString() : void 0;
  }
};
var errors$1 = {
  AbortError: AbortError$2,
  HTTPParserError: HTTPParserError$1,
  UndiciError,
  HeadersTimeoutError: HeadersTimeoutError$1,
  HeadersOverflowError: HeadersOverflowError$1,
  BodyTimeoutError: BodyTimeoutError$1,
  RequestContentLengthMismatchError: RequestContentLengthMismatchError$1,
  ConnectTimeoutError: ConnectTimeoutError$1,
  ResponseStatusCodeError: ResponseStatusCodeError$1,
  InvalidArgumentError: InvalidArgumentError$f,
  InvalidReturnValueError: InvalidReturnValueError$2,
  RequestAbortedError: RequestAbortedError$8,
  ClientDestroyedError: ClientDestroyedError$1,
  ClientClosedError: ClientClosedError$1,
  InformationalError: InformationalError$1,
  SocketError: SocketError$3,
  NotSupportedError: NotSupportedError$3,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError$1,
  BalancedPoolMissingUpstreamError
};
var assert$d = import_assert.default;
var { kDestroyed: kDestroyed$1, kBodyUsed: kBodyUsed$2 } = symbols$1;
var { IncomingMessage } = import_http.default;
var stream$1 = import_stream.default;
var net$2 = import_net.default;
var { InvalidArgumentError: InvalidArgumentError$e } = errors$1;
var { Blob: Blob$4 } = import_buffer.default;
var nodeUtil = import_util.default;
function nop() {
}
function isStream(obj) {
  return obj && typeof obj.pipe === "function";
}
function isBlobLike$4(object) {
  return Blob$4 && object instanceof Blob$4 || object && typeof object === "object" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function encode(val) {
  return encodeURIComponent(val);
}
function buildURL(url, queryParams) {
  if (url.includes("?") || url.includes("#")) {
    throw new Error('Query params cannot be passed when url already contains "?" or "#".');
  }
  if (!isObject(queryParams)) {
    throw new Error("Query params must be an object");
  }
  const parts = [];
  for (let [key2, val] of Object.entries(queryParams)) {
    if (val === null || typeof val === "undefined") {
      continue;
    }
    if (!Array.isArray(val)) {
      val = [val];
    }
    for (const v of val) {
      if (isObject(v)) {
        throw new Error("Passing object as a query param is not supported, please serialize to string up-front");
      }
      parts.push(encode(key2) + "=" + encode(v));
    }
  }
  const serializedParams = parts.join("&");
  if (serializedParams) {
    url += "?" + serializedParams;
  }
  return url;
}
function parseURL(url) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  if (!url || typeof url !== "object") {
    throw new InvalidArgumentError$e("invalid url");
  }
  if (url.port != null && url.port !== "" && !Number.isFinite(parseInt(url.port))) {
    throw new InvalidArgumentError$e("invalid port");
  }
  if (url.path != null && typeof url.path !== "string") {
    throw new InvalidArgumentError$e("invalid path");
  }
  if (url.pathname != null && typeof url.pathname !== "string") {
    throw new InvalidArgumentError$e("invalid pathname");
  }
  if (url.hostname != null && typeof url.hostname !== "string") {
    throw new InvalidArgumentError$e("invalid hostname");
  }
  if (url.origin != null && typeof url.origin !== "string") {
    throw new InvalidArgumentError$e("invalid origin");
  }
  if (!/^https?:/.test(url.origin || url.protocol)) {
    throw new InvalidArgumentError$e("invalid protocol");
  }
  if (!(url instanceof URL)) {
    const port = url.port != null ? url.port : url.protocol === "https:" ? 443 : 80;
    const origin = url.origin != null ? url.origin : `${url.protocol}//${url.hostname}:${port}`;
    const path = url.path != null ? url.path : `${url.pathname || ""}${url.search || ""}`;
    url = new URL(path, origin);
  }
  return url;
}
function parseOrigin(url) {
  url = parseURL(url);
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new InvalidArgumentError$e("invalid url");
  }
  return url;
}
function getHostname(host) {
  if (host[0] === "[") {
    const idx2 = host.indexOf("]");
    assert$d(idx2 !== -1);
    return host.substr(1, idx2 - 1);
  }
  const idx = host.indexOf(":");
  if (idx === -1)
    return host;
  return host.substr(0, idx);
}
function getServerName(host) {
  if (!host) {
    return null;
  }
  assert$d.strictEqual(typeof host, "string");
  const servername = getHostname(host);
  if (net$2.isIP(servername)) {
    return "";
  }
  return servername;
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isAsyncIterable(obj) {
  return !!(obj != null && typeof obj[Symbol.asyncIterator] === "function");
}
function isIterable(obj) {
  return !!(obj != null && (typeof obj[Symbol.iterator] === "function" || typeof obj[Symbol.asyncIterator] === "function"));
}
function bodyLength(body2) {
  if (body2 == null) {
    return 0;
  } else if (isStream(body2)) {
    const state = body2._readableState;
    return state && state.ended === true && Number.isFinite(state.length) ? state.length : null;
  } else if (isBlobLike$4(body2)) {
    return body2.size != null ? body2.size : null;
  } else if (isBuffer(body2)) {
    return body2.byteLength;
  }
  return null;
}
function isDestroyed(stream2) {
  return !stream2 || !!(stream2.destroyed || stream2[kDestroyed$1]);
}
function isReadableAborted(stream2) {
  const state = stream2 && stream2._readableState;
  return isDestroyed(stream2) && state && !state.endEmitted;
}
function destroy(stream2, err) {
  if (!isStream(stream2) || isDestroyed(stream2)) {
    return;
  }
  if (typeof stream2.destroy === "function") {
    if (Object.getPrototypeOf(stream2).constructor === IncomingMessage) {
      stream2.socket = null;
    }
    stream2.destroy(err);
  } else if (err) {
    process.nextTick((stream3, err2) => {
      stream3.emit("error", err2);
    }, stream2, err);
  }
  if (stream2.destroyed !== true) {
    stream2[kDestroyed$1] = true;
  }
}
var KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
function parseKeepAliveTimeout(val) {
  const m2 = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
  return m2 ? parseInt(m2[1], 10) * 1e3 : null;
}
function parseHeaders(headers2, obj = {}) {
  for (let i2 = 0; i2 < headers2.length; i2 += 2) {
    const key2 = headers2[i2].toString().toLowerCase();
    let val = obj[key2];
    if (!val) {
      obj[key2] = headers2[i2 + 1].toString();
    } else {
      if (!Array.isArray(val)) {
        val = [val];
        obj[key2] = val;
      }
      val.push(headers2[i2 + 1].toString());
    }
  }
  return obj;
}
function parseRawHeaders(headers2) {
  return headers2.map((header) => header.toString());
}
function isBuffer(buffer) {
  return buffer instanceof Uint8Array || Buffer.isBuffer(buffer);
}
function validateHandler(handler, method, upgrade2) {
  if (!handler || typeof handler !== "object") {
    throw new InvalidArgumentError$e("handler must be an object");
  }
  if (typeof handler.onConnect !== "function") {
    throw new InvalidArgumentError$e("invalid onConnect method");
  }
  if (typeof handler.onError !== "function") {
    throw new InvalidArgumentError$e("invalid onError method");
  }
  if (typeof handler.onBodySent !== "function" && handler.onBodySent !== void 0) {
    throw new InvalidArgumentError$e("invalid onBodySent method");
  }
  if (upgrade2 || method === "CONNECT") {
    if (typeof handler.onUpgrade !== "function") {
      throw new InvalidArgumentError$e("invalid onUpgrade method");
    }
  } else {
    if (typeof handler.onHeaders !== "function") {
      throw new InvalidArgumentError$e("invalid onHeaders method");
    }
    if (typeof handler.onData !== "function") {
      throw new InvalidArgumentError$e("invalid onData method");
    }
    if (typeof handler.onComplete !== "function") {
      throw new InvalidArgumentError$e("invalid onComplete method");
    }
  }
}
function isDisturbed(body2) {
  return !!(body2 && (stream$1.isDisturbed ? stream$1.isDisturbed(body2) || body2[kBodyUsed$2] : body2[kBodyUsed$2] || body2.readableDidRead || body2._readableState && body2._readableState.dataEmitted || isReadableAborted(body2)));
}
function isErrored$2(body2) {
  return !!(body2 && (stream$1.isErrored ? stream$1.isErrored(body2) : /state: 'errored'/.test(nodeUtil.inspect(body2))));
}
function isReadable$1(body2) {
  return !!(body2 && (stream$1.isReadable ? stream$1.isReadable(body2) : /state: 'readable'/.test(nodeUtil.inspect(body2))));
}
function getSocketInfo(socket) {
  return {
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
    timeout: socket.timeout,
    bytesWritten: socket.bytesWritten,
    bytesRead: socket.bytesRead
  };
}
var ReadableStream$2;
function ReadableStreamFrom$3(iterable) {
  if (!ReadableStream$2) {
    ReadableStream$2 = import_web.default.ReadableStream;
  }
  if (ReadableStream$2.from) {
    return ReadableStream$2.from(iterable);
  }
  let iterator;
  return new ReadableStream$2({
    async start() {
      iterator = iterable[Symbol.asyncIterator]();
    },
    async pull(controller) {
      const { done, value } = await iterator.next();
      if (done) {
        queueMicrotask(() => {
          controller.close();
        });
      } else {
        const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
        controller.enqueue(new Uint8Array(buf));
      }
      return controller.desiredSize > 0;
    },
    async cancel(reason) {
      await iterator.return();
    }
  }, 0);
}
function isFormDataLike(chunk) {
  return chunk && chunk.constructor && chunk.constructor.name === "FormData";
}
var kEnumerableProperty$3 = /* @__PURE__ */ Object.create(null);
kEnumerableProperty$3.enumerable = true;
var util$h = {
  kEnumerableProperty: kEnumerableProperty$3,
  nop,
  isDisturbed,
  isErrored: isErrored$2,
  isReadable: isReadable$1,
  toUSVString: nodeUtil.toUSVString || ((val) => `${val}`),
  isReadableAborted,
  isBlobLike: isBlobLike$4,
  parseOrigin,
  parseURL,
  getServerName,
  isStream,
  isIterable,
  isAsyncIterable,
  isDestroyed,
  parseRawHeaders,
  parseHeaders,
  parseKeepAliveTimeout,
  destroy,
  bodyLength,
  deepClone,
  ReadableStreamFrom: ReadableStreamFrom$3,
  isBuffer,
  validateHandler,
  getSocketInfo,
  isFormDataLike,
  buildURL
};
var corsSafeListedMethods$1 = ["GET", "HEAD", "POST"];
var nullBodyStatus$2 = [101, 204, 205, 304];
var redirectStatus$3 = [301, 302, 303, 307, 308];
var referrerPolicy$1 = [
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
];
var requestRedirect$1 = ["follow", "manual", "error"];
var safeMethods$1 = ["GET", "HEAD", "OPTIONS", "TRACE"];
var requestMode$1 = ["navigate", "same-origin", "no-cors", "cors"];
var requestCredentials$1 = ["omit", "same-origin", "include"];
var requestCache$1 = [
  "default",
  "no-store",
  "reload",
  "no-cache",
  "force-cache",
  "only-if-cached"
];
var requestBodyHeader$1 = [
  "content-encoding",
  "content-language",
  "content-location",
  "content-type"
];
var forbiddenMethods$1 = ["CONNECT", "TRACE", "TRACK"];
var subresource$1 = [
  "audio",
  "audioworklet",
  "font",
  "image",
  "manifest",
  "paintworklet",
  "script",
  "style",
  "track",
  "video",
  "xslt",
  ""
];
var constants$2 = {
  subresource: subresource$1,
  forbiddenMethods: forbiddenMethods$1,
  requestBodyHeader: requestBodyHeader$1,
  referrerPolicy: referrerPolicy$1,
  requestRedirect: requestRedirect$1,
  requestMode: requestMode$1,
  requestCredentials: requestCredentials$1,
  requestCache: requestCache$1,
  redirectStatus: redirectStatus$3,
  corsSafeListedMethods: corsSafeListedMethods$1,
  nullBodyStatus: nullBodyStatus$2,
  safeMethods: safeMethods$1
};
var symbols = {
  kUrl: Symbol("url"),
  kHeaders: Symbol("headers"),
  kSignal: Symbol("signal"),
  kState: Symbol("state"),
  kGuard: Symbol("guard"),
  kRealm: Symbol("realm")
};
var { Blob: Blob$3 } = import_buffer.default;
var { kState: kState$5 } = symbols;
var File$2 = class extends Blob$3 {
  constructor(fileBits, fileName, options = {}) {
    const n = fileName;
    const t2 = options.type;
    const d = options.lastModified ?? Date.now();
    super(fileBits, { type: t2 });
    this[kState$5] = {
      name: n,
      lastModified: d
    };
  }
  get name() {
    if (!(this instanceof File$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].name;
  }
  get lastModified() {
    if (!(this instanceof File$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].lastModified;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FileLike$1 = class {
  constructor(blobLike, fileName, options = {}) {
    const n = fileName;
    const t2 = options.type;
    const d = options.lastModified ?? Date.now();
    this[kState$5] = {
      blobLike,
      name: n,
      type: t2,
      lastModified: d
    };
  }
  stream(...args) {
    if (!(this instanceof FileLike$1)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].blobLike.stream(...args);
  }
  arrayBuffer(...args) {
    if (!(this instanceof FileLike$1)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].blobLike.arrayBuffer(...args);
  }
  slice(...args) {
    if (!(this instanceof FileLike$1)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].blobLike.slice(...args);
  }
  text(...args) {
    if (!(this instanceof FileLike$1)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].blobLike.text(...args);
  }
  get size() {
    if (!(this instanceof FileLike$1)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].blobLike.size;
  }
  get type() {
    if (!(this instanceof FileLike$1)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].blobLike.type;
  }
  get name() {
    if (!(this instanceof FileLike$1)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].name;
  }
  get lastModified() {
    if (!(this instanceof FileLike$1)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$5].lastModified;
  }
  get [Symbol.toStringTag]() {
    return "File";
  }
};
var file = { File: globalThis.File ?? File$2, FileLike: FileLike$1 };
var { redirectStatus: redirectStatus$2 } = constants$2;
var { performance } = import_perf_hooks.default;
var { isBlobLike: isBlobLike$3, toUSVString: toUSVString$5, ReadableStreamFrom: ReadableStreamFrom$2 } = util$h;
var assert$c = import_assert.default;
var File$1;
var badPorts = [
  "1",
  "7",
  "9",
  "11",
  "13",
  "15",
  "17",
  "19",
  "20",
  "21",
  "22",
  "23",
  "25",
  "37",
  "42",
  "43",
  "53",
  "69",
  "77",
  "79",
  "87",
  "95",
  "101",
  "102",
  "103",
  "104",
  "109",
  "110",
  "111",
  "113",
  "115",
  "117",
  "119",
  "123",
  "135",
  "137",
  "139",
  "143",
  "161",
  "179",
  "389",
  "427",
  "465",
  "512",
  "513",
  "514",
  "515",
  "526",
  "530",
  "531",
  "532",
  "540",
  "548",
  "554",
  "556",
  "563",
  "587",
  "601",
  "636",
  "989",
  "990",
  "993",
  "995",
  "1719",
  "1720",
  "1723",
  "2049",
  "3659",
  "4045",
  "5060",
  "5061",
  "6000",
  "6566",
  "6665",
  "6666",
  "6667",
  "6668",
  "6669",
  "6697",
  "10080"
];
function responseURL$1(response2) {
  const urlList = response2.urlList;
  const length = urlList.length;
  return length === 0 ? null : urlList[length - 1].toString();
}
function responseLocationURL$1(response2, requestFragment) {
  if (!redirectStatus$2.includes(response2.status)) {
    return null;
  }
  let location = response2.headersList.get("location");
  location = location ? new URL(location, responseURL$1(response2)) : null;
  if (location && !location.hash) {
    location.hash = requestFragment;
  }
  return location;
}
function requestCurrentURL$1(request2) {
  return request2.urlList[request2.urlList.length - 1];
}
function requestBadPort$1(request2) {
  const url = requestCurrentURL$1(request2);
  if (/^https?:/.test(url.protocol) && badPorts.includes(url.port)) {
    return "blocked";
  }
  return "allowed";
}
function isFileLike$1(object) {
  if (!File$1) {
    File$1 = file.File;
  }
  return object instanceof File$1 || object && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(File)$/.test(object[Symbol.toStringTag]);
}
function isValidReasonPhrase$1(statusText) {
  for (let i2 = 0; i2 < statusText.length; ++i2) {
    const c = statusText.charCodeAt(i2);
    if (!(c === 9 || c >= 32 && c <= 126 || c >= 128 && c <= 255)) {
      return false;
    }
  }
  return true;
}
function isTokenChar(c) {
  return !(c >= 127 || c <= 32 || c === "(" || c === ")" || c === "<" || c === ">" || c === "@" || c === "," || c === ";" || c === ":" || c === "\\" || c === '"' || c === "/" || c === "[" || c === "]" || c === "?" || c === "=" || c === "{" || c === "}");
}
function isValidHTTPToken$1(characters) {
  if (!characters || typeof characters !== "string") {
    return false;
  }
  for (let i2 = 0; i2 < characters.length; ++i2) {
    const c = characters.charCodeAt(i2);
    if (c > 127 || !isTokenChar(c)) {
      return false;
    }
  }
  return true;
}
function setRequestReferrerPolicyOnRedirect$1(request2, actualResponse) {
}
function crossOriginResourcePolicyCheck$1() {
  return "allowed";
}
function corsCheck$1() {
  return "success";
}
function TAOCheck$1() {
  return "success";
}
function appendFetchMetadata$1(httpRequest) {
  let header = null;
  header = httpRequest.mode;
  httpRequest.headersList.set("sec-fetch-mode", header);
}
function appendRequestOriginHeader$1(request2) {
  let serializedOrigin = request2.origin;
  if (request2.responseTainting === "cors" || request2.mode === "websocket") {
    if (serializedOrigin) {
      request2.headersList.append("Origin", serializedOrigin);
    }
  } else if (request2.method !== "GET" && request2.method !== "HEAD") {
    switch (request2.referrerPolicy) {
      case "no-referrer":
        serializedOrigin = null;
        break;
      case "no-referrer-when-downgrade":
      case "strict-origin":
      case "strict-origin-when-cross-origin":
        if (/^https:/.test(request2.origin) && !/^https:/.test(requestCurrentURL$1(request2))) {
          serializedOrigin = null;
        }
        break;
      case "same-origin":
        if (!sameOrigin$2(request2, requestCurrentURL$1(request2))) {
          serializedOrigin = null;
        }
        break;
    }
    if (serializedOrigin) {
      request2.headersList.append("Origin", serializedOrigin);
    }
  }
}
function coarsenedSharedCurrentTime$1(crossOriginIsolatedCapability) {
  return performance.now();
}
function createOpaqueTimingInfo$1(timingInfo) {
  return {
    startTime: timingInfo.startTime ?? 0,
    redirectStartTime: 0,
    redirectEndTime: 0,
    postRedirectStartTime: timingInfo.startTime ?? 0,
    finalServiceWorkerStartTime: 0,
    finalNetworkResponseStartTime: 0,
    finalNetworkRequestStartTime: 0,
    endTime: 0,
    encodedBodySize: 0,
    decodedBodySize: 0,
    finalConnectionTimingInfo: null
  };
}
function makePolicyContainer$1() {
  return {};
}
function clonePolicyContainer$1() {
  return {};
}
function determineRequestsReferrer$1(request2) {
  return "no-referrer";
}
function matchRequestIntegrity$1(request2, bytes) {
  return false;
}
function tryUpgradeRequestToAPotentiallyTrustworthyURL$1(request2) {
}
function sameOrigin$2(A2, B) {
  if (A2.protocol === B.protocol && A2.hostname === B.hostname && A2.port === B.port) {
    return true;
  }
  return false;
}
function createDeferredPromise$1() {
  let res;
  let rej;
  const promise = new Promise((resolve2, reject) => {
    res = resolve2;
    rej = reject;
  });
  return { promise, resolve: res, reject: rej };
}
function isAborted$2(fetchParams) {
  return fetchParams.controller.state === "aborted";
}
function isCancelled$2(fetchParams) {
  return fetchParams.controller.state === "aborted" || fetchParams.controller.state === "terminated";
}
function normalizeMethod$1(method) {
  return /^(DELETE|GET|HEAD|OPTIONS|POST|PUT)$/i.test(method) ? method.toUpperCase() : method;
}
function serializeJavascriptValueToJSONString$1(value) {
  const result = JSON.stringify(value);
  if (result === void 0) {
    throw new TypeError("Value is not JSON serializable");
  }
  assert$c(typeof result === "string");
  return result;
}
var util$g = {
  isAborted: isAborted$2,
  isCancelled: isCancelled$2,
  createDeferredPromise: createDeferredPromise$1,
  ReadableStreamFrom: ReadableStreamFrom$2,
  toUSVString: toUSVString$5,
  tryUpgradeRequestToAPotentiallyTrustworthyURL: tryUpgradeRequestToAPotentiallyTrustworthyURL$1,
  coarsenedSharedCurrentTime: coarsenedSharedCurrentTime$1,
  matchRequestIntegrity: matchRequestIntegrity$1,
  determineRequestsReferrer: determineRequestsReferrer$1,
  makePolicyContainer: makePolicyContainer$1,
  clonePolicyContainer: clonePolicyContainer$1,
  appendFetchMetadata: appendFetchMetadata$1,
  appendRequestOriginHeader: appendRequestOriginHeader$1,
  TAOCheck: TAOCheck$1,
  corsCheck: corsCheck$1,
  crossOriginResourcePolicyCheck: crossOriginResourcePolicyCheck$1,
  createOpaqueTimingInfo: createOpaqueTimingInfo$1,
  setRequestReferrerPolicyOnRedirect: setRequestReferrerPolicyOnRedirect$1,
  isValidHTTPToken: isValidHTTPToken$1,
  requestBadPort: requestBadPort$1,
  requestCurrentURL: requestCurrentURL$1,
  responseURL: responseURL$1,
  responseLocationURL: responseLocationURL$1,
  isBlobLike: isBlobLike$3,
  isFileLike: isFileLike$1,
  isValidReasonPhrase: isValidReasonPhrase$1,
  sameOrigin: sameOrigin$2,
  normalizeMethod: normalizeMethod$1,
  serializeJavascriptValueToJSONString: serializeJavascriptValueToJSONString$1
};
var { isBlobLike: isBlobLike$2, isFileLike, toUSVString: toUSVString$4 } = util$g;
var { kState: kState$4 } = symbols;
var { File, FileLike } = file;
var { Blob: Blob$2 } = import_buffer.default;
var _FormData$1 = class {
  constructor(...args) {
    if (args.length > 0 && !(args[0]?.constructor?.name === "HTMLFormElement")) {
      throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'");
    }
    this[kState$4] = [];
  }
  append(...args) {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    if (args.length < 2) {
      throw new TypeError(`Failed to execute 'append' on 'FormData': 2 arguments required, but only ${args.length} present.`);
    }
    if (args.length === 3 && !isBlobLike$2(args[1])) {
      throw new TypeError("Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'");
    }
    const name = toUSVString$4(args[0]);
    const filename = args.length === 3 ? toUSVString$4(args[2]) : void 0;
    const value = isBlobLike$2(args[1]) ? args[1] : toUSVString$4(args[1]);
    const entry8 = makeEntry(name, value, filename);
    this[kState$4].push(entry8);
  }
  delete(...args) {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    if (args.length < 1) {
      throw new TypeError(`Failed to execute 'delete' on 'FormData': 1 arguments required, but only ${args.length} present.`);
    }
    const name = toUSVString$4(args[0]);
    const next = [];
    for (const entry8 of this[kState$4]) {
      if (entry8.name !== name) {
        next.push(entry8);
      }
    }
    this[kState$4] = next;
  }
  get(...args) {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    if (args.length < 1) {
      throw new TypeError(`Failed to execute 'get' on 'FormData': 1 arguments required, but only ${args.length} present.`);
    }
    const name = toUSVString$4(args[0]);
    const idx = this[kState$4].findIndex((entry8) => entry8.name === name);
    if (idx === -1) {
      return null;
    }
    return this[kState$4][idx].value;
  }
  getAll(...args) {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    if (args.length < 1) {
      throw new TypeError(`Failed to execute 'getAll' on 'FormData': 1 arguments required, but only ${args.length} present.`);
    }
    const name = toUSVString$4(args[0]);
    return this[kState$4].filter((entry8) => entry8.name === name).map((entry8) => entry8.value);
  }
  has(...args) {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    if (args.length < 1) {
      throw new TypeError(`Failed to execute 'has' on 'FormData': 1 arguments required, but only ${args.length} present.`);
    }
    const name = toUSVString$4(args[0]);
    return this[kState$4].findIndex((entry8) => entry8.name === name) !== -1;
  }
  set(...args) {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    if (args.length < 2) {
      throw new TypeError(`Failed to execute 'set' on 'FormData': 2 arguments required, but only ${args.length} present.`);
    }
    if (args.length === 3 && !isBlobLike$2(args[1])) {
      throw new TypeError("Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'");
    }
    const name = toUSVString$4(args[0]);
    const filename = args.length === 3 ? toUSVString$4(args[2]) : void 0;
    const value = isBlobLike$2(args[1]) ? args[1] : toUSVString$4(args[1]);
    const entry8 = makeEntry(name, value, filename);
    const idx = this[kState$4].findIndex((entry9) => entry9.name === name);
    if (idx !== -1) {
      this[kState$4] = [
        ...this[kState$4].slice(0, idx),
        entry8,
        ...this[kState$4].slice(idx + 1).filter((entry9) => entry9.name !== name)
      ];
    } else {
      this[kState$4].push(entry8);
    }
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  *entries() {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    for (const pair of this) {
      yield pair;
    }
  }
  *keys() {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    for (const [key2] of this) {
      yield key2;
    }
  }
  *values() {
    if (!(this instanceof _FormData$1)) {
      throw new TypeError("Illegal invocation");
    }
    for (const [, value] of this) {
      yield value;
    }
  }
  *[Symbol.iterator]() {
    for (const { name, value } of this[kState$4]) {
      yield [name, value];
    }
  }
};
var FormData$1 = _FormData$1;
__publicField(FormData$1, "name", "FormData");
function makeEntry(name, value, filename) {
  const entry8 = {
    name: null,
    value: null
  };
  entry8.name = name;
  if (isBlobLike$2(value) && !isFileLike(value)) {
    value = value instanceof Blob$2 ? new File([value], "blob", value) : new FileLike(value, "blob", value);
  }
  if (isFileLike(value) && filename != null) {
    value = value instanceof File ? new File([value], filename, value) : new FileLike(value, filename, value);
  }
  entry8.value = value;
  return entry8;
}
var formdata = { FormData: FormData$1 };
var util$f = util$h;
var { ReadableStreamFrom: ReadableStreamFrom$1, toUSVString: toUSVString$3, isBlobLike: isBlobLike$1 } = util$g;
var { FormData } = formdata;
var { kState: kState$3 } = symbols;
var { Blob: Blob$1 } = import_buffer.default;
var { kBodyUsed: kBodyUsed$1 } = symbols$1;
var assert$b = import_assert.default;
var { NotSupportedError: NotSupportedError$2 } = errors$1;
var { isErrored: isErrored$1 } = util$h;
var { isUint8Array } = import_types.default;
var ReadableStream$1;
async function* blobGen(blob) {
  if (blob.stream) {
    yield* blob.stream();
  } else {
    yield await blob.arrayBuffer();
  }
}
function extractBody$4(object, keepalive = false) {
  if (!ReadableStream$1) {
    ReadableStream$1 = import_web.default.ReadableStream;
  }
  let stream2 = null;
  let action = null;
  let source = null;
  let length = null;
  let contentType = null;
  if (object == null)
    ;
  else if (object instanceof URLSearchParams) {
    source = object.toString();
    contentType = "application/x-www-form-urlencoded;charset=UTF-8";
  } else if (object instanceof ArrayBuffer || ArrayBuffer.isView(object)) {
    if (object instanceof DataView) {
      object = object.buffer;
    }
    source = new Uint8Array(object);
  } else if (util$f.isFormDataLike(object)) {
    const boundary = "----formdata-undici-" + Math.random();
    const prefix = `--${boundary}\r
Content-Disposition: form-data`;
    const escape2 = (str) => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, "\r\n");
    action = async function* (object2) {
      const enc = new TextEncoder();
      for (const [name, value] of object2) {
        if (typeof value === "string") {
          yield enc.encode(prefix + `; name="${escape2(normalizeLinefeeds(name))}"\r
\r
${normalizeLinefeeds(value)}\r
`);
        } else {
          yield enc.encode(prefix + `; name="${escape2(normalizeLinefeeds(name))}"` + (value.name ? `; filename="${escape2(value.name)}"` : "") + `\r
Content-Type: ${value.type || "application/octet-stream"}\r
\r
`);
          yield* blobGen(value);
          yield enc.encode("\r\n");
        }
      }
      yield enc.encode(`--${boundary}--`);
    };
    source = object;
    contentType = "multipart/form-data; boundary=" + boundary;
  } else if (isBlobLike$1(object)) {
    action = blobGen;
    source = object;
    length = object.size;
    if (object.type) {
      contentType = object.type;
    }
  } else if (typeof object[Symbol.asyncIterator] === "function") {
    if (keepalive) {
      throw new TypeError("keepalive");
    }
    if (util$f.isDisturbed(object) || object.locked) {
      throw new TypeError("Response body object should not be disturbed or locked");
    }
    stream2 = object instanceof ReadableStream$1 ? object : ReadableStreamFrom$1(object);
  } else {
    source = toUSVString$3(object);
    contentType = "text/plain;charset=UTF-8";
  }
  if (typeof source === "string" || util$f.isBuffer(source)) {
    length = Buffer.byteLength(source);
  }
  if (action != null) {
    let iterator;
    stream2 = new ReadableStream$1({
      async start() {
        iterator = action(object)[Symbol.asyncIterator]();
      },
      async pull(controller) {
        const { value, done } = await iterator.next();
        if (done) {
          queueMicrotask(() => {
            controller.close();
          });
        } else {
          if (!isErrored$1(stream2)) {
            controller.enqueue(new Uint8Array(value));
          }
        }
        return controller.desiredSize > 0;
      },
      async cancel(reason) {
        await iterator.return();
      }
    });
  } else if (!stream2) {
    stream2 = new ReadableStream$1({
      async pull(controller) {
        controller.enqueue(typeof source === "string" ? new TextEncoder().encode(source) : source);
        queueMicrotask(() => {
          controller.close();
        });
      }
    });
  }
  const body2 = { stream: stream2, source, length };
  return [body2, contentType];
}
function safelyExtractBody$1(object, keepalive = false) {
  if (!ReadableStream$1) {
    ReadableStream$1 = import_web.default.ReadableStream;
  }
  if (object instanceof ReadableStream$1) {
    assert$b(!util$f.isDisturbed(object), "disturbed");
    assert$b(!object.locked, "locked");
  }
  return extractBody$4(object, keepalive);
}
function cloneBody$2(body2) {
  const [out1, out2] = body2.stream.tee();
  body2.stream = out1;
  return {
    stream: out2,
    length: body2.length,
    source: body2.source
  };
}
var methods = {
  async blob() {
    const chunks = [];
    if (this[kState$3].body) {
      if (isUint8Array(this[kState$3].body)) {
        chunks.push(this[kState$3].body);
      } else {
        const stream2 = this[kState$3].body.stream;
        if (util$f.isDisturbed(stream2)) {
          throw new TypeError("disturbed");
        }
        if (stream2.locked) {
          throw new TypeError("locked");
        }
        stream2[kBodyUsed$1] = true;
        for await (const chunk of stream2) {
          chunks.push(chunk);
        }
      }
    }
    return new Blob$1(chunks, { type: this.headers.get("Content-Type") || "" });
  },
  async arrayBuffer() {
    const blob = await this.blob();
    return await blob.arrayBuffer();
  },
  async text() {
    const blob = await this.blob();
    return toUSVString$3(await blob.text());
  },
  async json() {
    return JSON.parse(await this.text());
  },
  async formData() {
    const contentType = this.headers.get("Content-Type");
    if (/multipart\/form-data/.test(contentType)) {
      throw new NotSupportedError$2("multipart/form-data not supported");
    } else if (/application\/x-www-form-urlencoded/.test(contentType)) {
      let entries;
      try {
        entries = new URLSearchParams(await this.text());
      } catch (err) {
        throw Object.assign(new TypeError(), { cause: err });
      }
      const formData = new FormData();
      for (const [name, value] of entries) {
        formData.append(name, value);
      }
      return formData;
    } else {
      throw new TypeError();
    }
  }
};
var properties = {
  body: {
    enumerable: true,
    get() {
      return this[kState$3].body ? this[kState$3].body.stream : null;
    }
  },
  bodyUsed: {
    enumerable: true,
    get() {
      return !!this[kState$3].body && util$f.isDisturbed(this[kState$3].body.stream);
    }
  }
};
function mixinBody$2(prototype) {
  Object.assign(prototype, methods);
  Object.defineProperties(prototype, properties);
}
var body = {
  extractBody: extractBody$4,
  safelyExtractBody: safelyExtractBody$1,
  cloneBody: cloneBody$2,
  mixinBody: mixinBody$2
};
var {
  InvalidArgumentError: InvalidArgumentError$d,
  NotSupportedError: NotSupportedError$1
} = errors$1;
var assert$a = import_assert.default;
var util$e = util$h;
var kHandler = Symbol("handler");
var channels$1 = {};
var extractBody$3;
var nodeVersion$1 = process.versions.node.split(".");
var nodeMajor$1 = Number(nodeVersion$1[0]);
var nodeMinor$1 = Number(nodeVersion$1[1]);
try {
  const diagnosticsChannel = require("diagnostics_channel");
  channels$1.create = diagnosticsChannel.channel("undici:request:create");
  channels$1.bodySent = diagnosticsChannel.channel("undici:request:bodySent");
  channels$1.headers = diagnosticsChannel.channel("undici:request:headers");
  channels$1.trailers = diagnosticsChannel.channel("undici:request:trailers");
  channels$1.error = diagnosticsChannel.channel("undici:request:error");
} catch {
  channels$1.create = { hasSubscribers: false };
  channels$1.bodySent = { hasSubscribers: false };
  channels$1.headers = { hasSubscribers: false };
  channels$1.trailers = { hasSubscribers: false };
  channels$1.error = { hasSubscribers: false };
}
var Request$4 = class {
  constructor(origin, {
    path,
    method,
    body: body$1,
    headers: headers2,
    query,
    idempotent,
    blocking,
    upgrade: upgrade2,
    headersTimeout,
    bodyTimeout,
    throwOnError
  }, handler) {
    if (typeof path !== "string") {
      throw new InvalidArgumentError$d("path must be a string");
    } else if (path[0] !== "/" && !(path.startsWith("http://") || path.startsWith("https://"))) {
      throw new InvalidArgumentError$d("path must be an absolute URL or start with a slash");
    }
    if (typeof method !== "string") {
      throw new InvalidArgumentError$d("method must be a string");
    }
    if (upgrade2 && typeof upgrade2 !== "string") {
      throw new InvalidArgumentError$d("upgrade must be a string");
    }
    if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$d("invalid headersTimeout");
    }
    if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$d("invalid bodyTimeout");
    }
    this.headersTimeout = headersTimeout;
    this.bodyTimeout = bodyTimeout;
    this.throwOnError = throwOnError === true;
    this.method = method;
    if (body$1 == null) {
      this.body = null;
    } else if (util$e.isStream(body$1)) {
      this.body = body$1;
    } else if (body$1 instanceof DataView) {
      this.body = body$1.buffer.byteLength ? Buffer.from(body$1.buffer) : null;
    } else if (body$1 instanceof ArrayBuffer || ArrayBuffer.isView(body$1)) {
      this.body = body$1.byteLength ? Buffer.from(body$1) : null;
    } else if (util$e.isBuffer(body$1)) {
      this.body = body$1.byteLength ? body$1 : null;
    } else if (typeof body$1 === "string") {
      this.body = body$1.length ? Buffer.from(body$1) : null;
    } else if (util$e.isFormDataLike(body$1) || util$e.isIterable(body$1) || util$e.isBlobLike(body$1)) {
      this.body = body$1;
    } else {
      throw new InvalidArgumentError$d("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
    }
    this.completed = false;
    this.aborted = false;
    this.upgrade = upgrade2 || null;
    this.path = query ? util$e.buildURL(path, query) : path;
    this.origin = origin;
    this.idempotent = idempotent == null ? method === "HEAD" || method === "GET" : idempotent;
    this.blocking = blocking == null ? false : blocking;
    this.host = null;
    this.contentLength = null;
    this.contentType = null;
    this.headers = "";
    if (Array.isArray(headers2)) {
      if (headers2.length % 2 !== 0) {
        throw new InvalidArgumentError$d("headers array must be even");
      }
      for (let i2 = 0; i2 < headers2.length; i2 += 2) {
        processHeader(this, headers2[i2], headers2[i2 + 1]);
      }
    } else if (headers2 && typeof headers2 === "object") {
      const keys = Object.keys(headers2);
      for (let i2 = 0; i2 < keys.length; i2++) {
        const key2 = keys[i2];
        processHeader(this, key2, headers2[key2]);
      }
    } else if (headers2 != null) {
      throw new InvalidArgumentError$d("headers must be an object or an array");
    }
    if (util$e.isFormDataLike(this.body)) {
      if (nodeMajor$1 < 16 || nodeMajor$1 === 16 && nodeMinor$1 < 5) {
        throw new InvalidArgumentError$d("Form-Data bodies are only supported in node v16.5 and newer.");
      }
      if (!extractBody$3) {
        extractBody$3 = body.extractBody;
      }
      const [bodyStream, contentType] = extractBody$3(body$1);
      if (this.contentType == null) {
        this.contentType = contentType;
        this.headers += `content-type: ${contentType}\r
`;
      }
      this.body = bodyStream.stream;
    } else if (util$e.isBlobLike(body$1) && this.contentType == null && body$1.type) {
      this.contentType = body$1.type;
      this.headers += `content-type: ${body$1.type}\r
`;
    }
    util$e.validateHandler(handler, method, upgrade2);
    this.servername = util$e.getServerName(this.host);
    this[kHandler] = handler;
    if (channels$1.create.hasSubscribers) {
      channels$1.create.publish({ request: this });
    }
  }
  onBodySent(chunk) {
    if (this[kHandler].onBodySent) {
      try {
        this[kHandler].onBodySent(chunk);
      } catch (err) {
        this.onError(err);
      }
    }
  }
  onRequestSent() {
    if (channels$1.bodySent.hasSubscribers) {
      channels$1.bodySent.publish({ request: this });
    }
  }
  onConnect(abort2) {
    assert$a(!this.aborted);
    assert$a(!this.completed);
    return this[kHandler].onConnect(abort2);
  }
  onHeaders(statusCode, headers2, resume2, statusText) {
    assert$a(!this.aborted);
    assert$a(!this.completed);
    if (channels$1.headers.hasSubscribers) {
      channels$1.headers.publish({ request: this, response: { statusCode, headers: headers2, statusText } });
    }
    return this[kHandler].onHeaders(statusCode, headers2, resume2, statusText);
  }
  onData(chunk) {
    assert$a(!this.aborted);
    assert$a(!this.completed);
    return this[kHandler].onData(chunk);
  }
  onUpgrade(statusCode, headers2, socket) {
    assert$a(!this.aborted);
    assert$a(!this.completed);
    return this[kHandler].onUpgrade(statusCode, headers2, socket);
  }
  onComplete(trailers) {
    assert$a(!this.aborted);
    this.completed = true;
    if (channels$1.trailers.hasSubscribers) {
      channels$1.trailers.publish({ request: this, trailers });
    }
    return this[kHandler].onComplete(trailers);
  }
  onError(error2) {
    if (channels$1.error.hasSubscribers) {
      channels$1.error.publish({ request: this, error: error2 });
    }
    if (this.aborted) {
      return;
    }
    this.aborted = true;
    return this[kHandler].onError(error2);
  }
  addHeader(key2, value) {
    processHeader(this, key2, value);
    return this;
  }
};
function processHeader(request2, key2, val) {
  if (val && typeof val === "object") {
    throw new InvalidArgumentError$d(`invalid ${key2} header`);
  } else if (val === void 0) {
    return;
  }
  if (request2.host === null && key2.length === 4 && key2.toLowerCase() === "host") {
    request2.host = val;
  } else if (request2.contentLength === null && key2.length === 14 && key2.toLowerCase() === "content-length") {
    request2.contentLength = parseInt(val, 10);
    if (!Number.isFinite(request2.contentLength)) {
      throw new InvalidArgumentError$d("invalid content-length header");
    }
  } else if (request2.contentType === null && key2.length === 12 && key2.toLowerCase() === "content-type") {
    request2.contentType = val;
    request2.headers += `${key2}: ${val}\r
`;
  } else if (key2.length === 17 && key2.toLowerCase() === "transfer-encoding") {
    throw new InvalidArgumentError$d("invalid transfer-encoding header");
  } else if (key2.length === 10 && key2.toLowerCase() === "connection") {
    throw new InvalidArgumentError$d("invalid connection header");
  } else if (key2.length === 10 && key2.toLowerCase() === "keep-alive") {
    throw new InvalidArgumentError$d("invalid keep-alive header");
  } else if (key2.length === 7 && key2.toLowerCase() === "upgrade") {
    throw new InvalidArgumentError$d("invalid upgrade header");
  } else if (key2.length === 6 && key2.toLowerCase() === "expect") {
    throw new NotSupportedError$1("expect header not supported");
  } else {
    request2.headers += `${key2}: ${val}\r
`;
  }
}
var request$2 = Request$4;
var EventEmitter = import_events.default;
var Dispatcher$2 = class extends EventEmitter {
  dispatch() {
    throw new Error("not implemented");
  }
  close() {
    throw new Error("not implemented");
  }
  destroy() {
    throw new Error("not implemented");
  }
};
var dispatcher = Dispatcher$2;
var Dispatcher$1 = dispatcher;
var {
  ClientDestroyedError,
  ClientClosedError,
  InvalidArgumentError: InvalidArgumentError$c
} = errors$1;
var { kDestroy: kDestroy$3, kClose: kClose$3, kDispatch: kDispatch$3 } = symbols$1;
var kDestroyed = Symbol("destroyed");
var kClosed = Symbol("closed");
var kOnDestroyed = Symbol("onDestroyed");
var kOnClosed = Symbol("onClosed");
var DispatcherBase$3 = class extends Dispatcher$1 {
  constructor() {
    super();
    this[kDestroyed] = false;
    this[kOnDestroyed] = [];
    this[kClosed] = false;
    this[kOnClosed] = [];
  }
  get destroyed() {
    return this[kDestroyed];
  }
  get closed() {
    return this[kClosed];
  }
  close(callback) {
    if (callback === void 0) {
      return new Promise((resolve2, reject) => {
        this.close((err, data) => {
          return err ? reject(err) : resolve2(data);
        });
      });
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$c("invalid callback");
    }
    if (this[kDestroyed]) {
      queueMicrotask(() => callback(new ClientDestroyedError(), null));
      return;
    }
    if (this[kClosed]) {
      if (this[kOnClosed]) {
        this[kOnClosed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return;
    }
    this[kClosed] = true;
    this[kOnClosed].push(callback);
    const onClosed = () => {
      const callbacks = this[kOnClosed];
      this[kOnClosed] = null;
      for (let i2 = 0; i2 < callbacks.length; i2++) {
        callbacks[i2](null, null);
      }
    };
    this[kClose$3]().then(() => this.destroy()).then(() => {
      queueMicrotask(onClosed);
    });
  }
  destroy(err, callback) {
    if (typeof err === "function") {
      callback = err;
      err = null;
    }
    if (callback === void 0) {
      return new Promise((resolve2, reject) => {
        this.destroy(err, (err2, data) => {
          return err2 ? reject(err2) : resolve2(data);
        });
      });
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$c("invalid callback");
    }
    if (this[kDestroyed]) {
      if (this[kOnDestroyed]) {
        this[kOnDestroyed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return;
    }
    if (!err) {
      err = new ClientDestroyedError();
    }
    this[kDestroyed] = true;
    this[kOnDestroyed].push(callback);
    const onDestroyed = () => {
      const callbacks = this[kOnDestroyed];
      this[kOnDestroyed] = null;
      for (let i2 = 0; i2 < callbacks.length; i2++) {
        callbacks[i2](null, null);
      }
    };
    this[kDestroy$3](err).then(() => {
      queueMicrotask(onDestroyed);
    });
  }
  dispatch(opts, handler) {
    if (!handler || typeof handler !== "object") {
      throw new InvalidArgumentError$c("handler must be an object");
    }
    try {
      if (!opts || typeof opts !== "object") {
        throw new InvalidArgumentError$c("opts must be an object.");
      }
      if (this[kDestroyed]) {
        throw new ClientDestroyedError();
      }
      if (this[kClosed]) {
        throw new ClientClosedError();
      }
      return this[kDispatch$3](opts, handler);
    } catch (err) {
      if (typeof handler.onError !== "function") {
        throw new InvalidArgumentError$c("invalid onError method");
      }
      handler.onError(err);
      return false;
    }
  }
};
var dispatcherBase = DispatcherBase$3;
var util$d = util$h;
var { kBodyUsed } = symbols$1;
var assert$9 = import_assert.default;
var { InvalidArgumentError: InvalidArgumentError$b } = errors$1;
var EE$1 = import_events.default;
var redirectableStatusCodes = [300, 301, 302, 303, 307, 308];
var kBody$1 = Symbol("body");
var BodyAsyncIterable = class {
  constructor(body2) {
    this[kBody$1] = body2;
    this[kBodyUsed] = false;
  }
  async *[Symbol.asyncIterator]() {
    assert$9(!this[kBodyUsed], "disturbed");
    this[kBodyUsed] = true;
    yield* this[kBody$1];
  }
};
var RedirectHandler$2 = class {
  constructor(dispatcher2, maxRedirections, opts, handler) {
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$b("maxRedirections must be a positive number");
    }
    util$d.validateHandler(handler, opts.method, opts.upgrade);
    this.dispatcher = dispatcher2;
    this.location = null;
    this.abort = null;
    this.opts = { ...opts, maxRedirections: 0 };
    this.maxRedirections = maxRedirections;
    this.handler = handler;
    this.history = [];
    if (util$d.isStream(this.opts.body)) {
      if (util$d.bodyLength(this.opts.body) === 0) {
        this.opts.body.on("data", function() {
          assert$9(false);
        });
      }
      if (typeof this.opts.body.readableDidRead !== "boolean") {
        this.opts.body[kBodyUsed] = false;
        EE$1.prototype.on.call(this.opts.body, "data", function() {
          this[kBodyUsed] = true;
        });
      }
    } else if (this.opts.body && typeof this.opts.body.pipeTo === "function") {
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    } else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && util$d.isIterable(this.opts.body)) {
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    }
  }
  onConnect(abort2) {
    this.abort = abort2;
    this.handler.onConnect(abort2, { history: this.history });
  }
  onUpgrade(statusCode, headers2, socket) {
    this.handler.onUpgrade(statusCode, headers2, socket);
  }
  onError(error2) {
    this.handler.onError(error2);
  }
  onHeaders(statusCode, headers2, resume2, statusText) {
    this.location = this.history.length >= this.maxRedirections || util$d.isDisturbed(this.opts.body) ? null : parseLocation(statusCode, headers2);
    if (this.opts.origin) {
      this.history.push(new URL(this.opts.path, this.opts.origin));
    }
    if (!this.location) {
      return this.handler.onHeaders(statusCode, headers2, resume2, statusText);
    }
    const { origin, pathname, search } = util$d.parseURL(new URL(this.location, this.opts.origin));
    const path = search ? `${pathname}${search}` : pathname;
    this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
    this.opts.path = path;
    this.opts.origin = origin;
    this.opts.maxRedirections = 0;
    if (statusCode === 303 && this.opts.method !== "HEAD") {
      this.opts.method = "GET";
      this.opts.body = null;
    }
  }
  onData(chunk) {
    if (this.location)
      ;
    else {
      return this.handler.onData(chunk);
    }
  }
  onComplete(trailers) {
    if (this.location) {
      this.location = null;
      this.abort = null;
      this.dispatcher.dispatch(this.opts, this);
    } else {
      this.handler.onComplete(trailers);
    }
  }
  onBodySent(chunk) {
    if (this.handler.onBodySent) {
      this.handler.onBodySent(chunk);
    }
  }
};
function parseLocation(statusCode, headers2) {
  if (redirectableStatusCodes.indexOf(statusCode) === -1) {
    return null;
  }
  for (let i2 = 0; i2 < headers2.length; i2 += 2) {
    if (headers2[i2].toString().toLowerCase() === "location") {
      return headers2[i2 + 1];
    }
  }
}
function shouldRemoveHeader(header, removeContent, unknownOrigin) {
  return header.length === 4 && header.toString().toLowerCase() === "host" || removeContent && header.toString().toLowerCase().indexOf("content-") === 0 || unknownOrigin && header.length === 13 && header.toString().toLowerCase() === "authorization";
}
function cleanRequestHeaders(headers2, removeContent, unknownOrigin) {
  const ret = [];
  if (Array.isArray(headers2)) {
    for (let i2 = 0; i2 < headers2.length; i2 += 2) {
      if (!shouldRemoveHeader(headers2[i2], removeContent, unknownOrigin)) {
        ret.push(headers2[i2], headers2[i2 + 1]);
      }
    }
  } else if (headers2 && typeof headers2 === "object") {
    for (const key2 of Object.keys(headers2)) {
      if (!shouldRemoveHeader(key2, removeContent, unknownOrigin)) {
        ret.push(key2, headers2[key2]);
      }
    }
  } else {
    assert$9(headers2 == null, "headers must be an object or an array");
  }
  return ret;
}
var redirect = RedirectHandler$2;
var net$1 = import_net.default;
var assert$8 = import_assert.default;
var util$c = util$h;
var { InvalidArgumentError: InvalidArgumentError$a, ConnectTimeoutError } = errors$1;
var tls;
function buildConnector$2({ maxCachedSessions, socketPath, timeout, ...opts }) {
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new InvalidArgumentError$a("maxCachedSessions must be a positive integer or zero");
  }
  const options = { path: socketPath, ...opts };
  const sessionCache = /* @__PURE__ */ new Map();
  timeout = timeout == null ? 1e4 : timeout;
  maxCachedSessions = maxCachedSessions == null ? 100 : maxCachedSessions;
  return function connect2({ hostname, host, protocol, port, servername }, callback) {
    let socket;
    if (protocol === "https:") {
      if (!tls) {
        tls = import_tls.default;
      }
      servername = servername || options.servername || util$c.getServerName(host) || null;
      const sessionKey = servername || hostname;
      const session = sessionCache.get(sessionKey) || null;
      assert$8(sessionKey);
      socket = tls.connect({
        highWaterMark: 16384,
        ...options,
        servername,
        session,
        port: port || 443,
        host: hostname
      });
      socket.on("session", function(session2) {
        if (maxCachedSessions === 0) {
          return;
        }
        if (sessionCache.size >= maxCachedSessions) {
          const { value: oldestKey } = sessionCache.keys().next();
          sessionCache.delete(oldestKey);
        }
        sessionCache.set(sessionKey, session2);
      }).on("error", function(err) {
        if (sessionKey && err.code !== "UND_ERR_INFO") {
          sessionCache.delete(sessionKey);
        }
      });
    } else {
      socket = net$1.connect({
        highWaterMark: 64 * 1024,
        ...options,
        port: port || 80,
        host: hostname
      });
    }
    const timeoutId = timeout ? setTimeout(onConnectTimeout, timeout, socket) : null;
    socket.setNoDelay(true).once(protocol === "https:" ? "secureConnect" : "connect", function() {
      clearTimeout(timeoutId);
      if (callback) {
        const cb = callback;
        callback = null;
        cb(null, this);
      }
    }).on("error", function(err) {
      clearTimeout(timeoutId);
      if (callback) {
        const cb = callback;
        callback = null;
        cb(err);
      }
    });
    return socket;
  };
}
function onConnectTimeout(socket) {
  util$c.destroy(socket, new ConnectTimeoutError());
}
var connect$2 = buildConnector$2;
var constants$1 = {};
var utils = {};
Object.defineProperty(utils, "__esModule", { value: true });
utils.enumToMap = void 0;
function enumToMap(obj) {
  const res = {};
  Object.keys(obj).forEach((key2) => {
    const value = obj[key2];
    if (typeof value === "number") {
      res[key2] = value;
    }
  });
  return res;
}
utils.enumToMap = enumToMap;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SPECIAL_HEADERS = exports.HEADER_STATE = exports.MINOR = exports.MAJOR = exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS = exports.TOKEN = exports.STRICT_TOKEN = exports.HEX = exports.URL_CHAR = exports.STRICT_URL_CHAR = exports.USERINFO_CHARS = exports.MARK = exports.ALPHANUM = exports.NUM = exports.HEX_MAP = exports.NUM_MAP = exports.ALPHA = exports.FINISH = exports.H_METHOD_MAP = exports.METHOD_MAP = exports.METHODS_RTSP = exports.METHODS_ICE = exports.METHODS_HTTP = exports.METHODS = exports.LENIENT_FLAGS = exports.FLAGS = exports.TYPE = exports.ERROR = void 0;
  const utils_1 = utils;
  (function(ERROR) {
    ERROR[ERROR["OK"] = 0] = "OK";
    ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
    ERROR[ERROR["STRICT"] = 2] = "STRICT";
    ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
    ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
    ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
    ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
    ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
    ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
    ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
    ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
    ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
    ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
    ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
    ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
    ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
    ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
    ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
    ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
    ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
    ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
    ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
    ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
    ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
    ERROR[ERROR["USER"] = 24] = "USER";
  })(exports.ERROR || (exports.ERROR = {}));
  (function(TYPE) {
    TYPE[TYPE["BOTH"] = 0] = "BOTH";
    TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
    TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
  })(exports.TYPE || (exports.TYPE = {}));
  (function(FLAGS) {
    FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
    FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
    FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
    FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
    FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
    FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
    FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
    FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING";
    FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
  })(exports.FLAGS || (exports.FLAGS = {}));
  (function(LENIENT_FLAGS) {
    LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
    LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
    LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
  })(exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));
  var METHODS;
  (function(METHODS2) {
    METHODS2[METHODS2["DELETE"] = 0] = "DELETE";
    METHODS2[METHODS2["GET"] = 1] = "GET";
    METHODS2[METHODS2["HEAD"] = 2] = "HEAD";
    METHODS2[METHODS2["POST"] = 3] = "POST";
    METHODS2[METHODS2["PUT"] = 4] = "PUT";
    METHODS2[METHODS2["CONNECT"] = 5] = "CONNECT";
    METHODS2[METHODS2["OPTIONS"] = 6] = "OPTIONS";
    METHODS2[METHODS2["TRACE"] = 7] = "TRACE";
    METHODS2[METHODS2["COPY"] = 8] = "COPY";
    METHODS2[METHODS2["LOCK"] = 9] = "LOCK";
    METHODS2[METHODS2["MKCOL"] = 10] = "MKCOL";
    METHODS2[METHODS2["MOVE"] = 11] = "MOVE";
    METHODS2[METHODS2["PROPFIND"] = 12] = "PROPFIND";
    METHODS2[METHODS2["PROPPATCH"] = 13] = "PROPPATCH";
    METHODS2[METHODS2["SEARCH"] = 14] = "SEARCH";
    METHODS2[METHODS2["UNLOCK"] = 15] = "UNLOCK";
    METHODS2[METHODS2["BIND"] = 16] = "BIND";
    METHODS2[METHODS2["REBIND"] = 17] = "REBIND";
    METHODS2[METHODS2["UNBIND"] = 18] = "UNBIND";
    METHODS2[METHODS2["ACL"] = 19] = "ACL";
    METHODS2[METHODS2["REPORT"] = 20] = "REPORT";
    METHODS2[METHODS2["MKACTIVITY"] = 21] = "MKACTIVITY";
    METHODS2[METHODS2["CHECKOUT"] = 22] = "CHECKOUT";
    METHODS2[METHODS2["MERGE"] = 23] = "MERGE";
    METHODS2[METHODS2["M-SEARCH"] = 24] = "M-SEARCH";
    METHODS2[METHODS2["NOTIFY"] = 25] = "NOTIFY";
    METHODS2[METHODS2["SUBSCRIBE"] = 26] = "SUBSCRIBE";
    METHODS2[METHODS2["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
    METHODS2[METHODS2["PATCH"] = 28] = "PATCH";
    METHODS2[METHODS2["PURGE"] = 29] = "PURGE";
    METHODS2[METHODS2["MKCALENDAR"] = 30] = "MKCALENDAR";
    METHODS2[METHODS2["LINK"] = 31] = "LINK";
    METHODS2[METHODS2["UNLINK"] = 32] = "UNLINK";
    METHODS2[METHODS2["SOURCE"] = 33] = "SOURCE";
    METHODS2[METHODS2["PRI"] = 34] = "PRI";
    METHODS2[METHODS2["DESCRIBE"] = 35] = "DESCRIBE";
    METHODS2[METHODS2["ANNOUNCE"] = 36] = "ANNOUNCE";
    METHODS2[METHODS2["SETUP"] = 37] = "SETUP";
    METHODS2[METHODS2["PLAY"] = 38] = "PLAY";
    METHODS2[METHODS2["PAUSE"] = 39] = "PAUSE";
    METHODS2[METHODS2["TEARDOWN"] = 40] = "TEARDOWN";
    METHODS2[METHODS2["GET_PARAMETER"] = 41] = "GET_PARAMETER";
    METHODS2[METHODS2["SET_PARAMETER"] = 42] = "SET_PARAMETER";
    METHODS2[METHODS2["REDIRECT"] = 43] = "REDIRECT";
    METHODS2[METHODS2["RECORD"] = 44] = "RECORD";
    METHODS2[METHODS2["FLUSH"] = 45] = "FLUSH";
  })(METHODS = exports.METHODS || (exports.METHODS = {}));
  exports.METHODS_HTTP = [
    METHODS.DELETE,
    METHODS.GET,
    METHODS.HEAD,
    METHODS.POST,
    METHODS.PUT,
    METHODS.CONNECT,
    METHODS.OPTIONS,
    METHODS.TRACE,
    METHODS.COPY,
    METHODS.LOCK,
    METHODS.MKCOL,
    METHODS.MOVE,
    METHODS.PROPFIND,
    METHODS.PROPPATCH,
    METHODS.SEARCH,
    METHODS.UNLOCK,
    METHODS.BIND,
    METHODS.REBIND,
    METHODS.UNBIND,
    METHODS.ACL,
    METHODS.REPORT,
    METHODS.MKACTIVITY,
    METHODS.CHECKOUT,
    METHODS.MERGE,
    METHODS["M-SEARCH"],
    METHODS.NOTIFY,
    METHODS.SUBSCRIBE,
    METHODS.UNSUBSCRIBE,
    METHODS.PATCH,
    METHODS.PURGE,
    METHODS.MKCALENDAR,
    METHODS.LINK,
    METHODS.UNLINK,
    METHODS.PRI,
    METHODS.SOURCE
  ];
  exports.METHODS_ICE = [
    METHODS.SOURCE
  ];
  exports.METHODS_RTSP = [
    METHODS.OPTIONS,
    METHODS.DESCRIBE,
    METHODS.ANNOUNCE,
    METHODS.SETUP,
    METHODS.PLAY,
    METHODS.PAUSE,
    METHODS.TEARDOWN,
    METHODS.GET_PARAMETER,
    METHODS.SET_PARAMETER,
    METHODS.REDIRECT,
    METHODS.RECORD,
    METHODS.FLUSH,
    METHODS.GET,
    METHODS.POST
  ];
  exports.METHOD_MAP = utils_1.enumToMap(METHODS);
  exports.H_METHOD_MAP = {};
  Object.keys(exports.METHOD_MAP).forEach((key2) => {
    if (/^H/.test(key2)) {
      exports.H_METHOD_MAP[key2] = exports.METHOD_MAP[key2];
    }
  });
  (function(FINISH) {
    FINISH[FINISH["SAFE"] = 0] = "SAFE";
    FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
    FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
  })(exports.FINISH || (exports.FINISH = {}));
  exports.ALPHA = [];
  for (let i2 = "A".charCodeAt(0); i2 <= "Z".charCodeAt(0); i2++) {
    exports.ALPHA.push(String.fromCharCode(i2));
    exports.ALPHA.push(String.fromCharCode(i2 + 32));
  }
  exports.NUM_MAP = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
  };
  exports.HEX_MAP = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  };
  exports.NUM = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
  exports.MARK = ["-", "_", ".", "!", "~", "*", "'", "(", ")"];
  exports.USERINFO_CHARS = exports.ALPHANUM.concat(exports.MARK).concat(["%", ";", ":", "&", "=", "+", "$", ","]);
  exports.STRICT_URL_CHAR = [
    "!",
    '"',
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~"
  ].concat(exports.ALPHANUM);
  exports.URL_CHAR = exports.STRICT_URL_CHAR.concat(["	", "\f"]);
  for (let i2 = 128; i2 <= 255; i2++) {
    exports.URL_CHAR.push(i2);
  }
  exports.HEX = exports.NUM.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
  exports.STRICT_TOKEN = [
    "!",
    "#",
    "$",
    "%",
    "&",
    "'",
    "*",
    "+",
    "-",
    ".",
    "^",
    "_",
    "`",
    "|",
    "~"
  ].concat(exports.ALPHANUM);
  exports.TOKEN = exports.STRICT_TOKEN.concat([" "]);
  exports.HEADER_CHARS = ["	"];
  for (let i2 = 32; i2 <= 255; i2++) {
    if (i2 !== 127) {
      exports.HEADER_CHARS.push(i2);
    }
  }
  exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter((c) => c !== 44);
  exports.MAJOR = exports.NUM_MAP;
  exports.MINOR = exports.MAJOR;
  var HEADER_STATE;
  (function(HEADER_STATE2) {
    HEADER_STATE2[HEADER_STATE2["GENERAL"] = 0] = "GENERAL";
    HEADER_STATE2[HEADER_STATE2["CONNECTION"] = 1] = "CONNECTION";
    HEADER_STATE2[HEADER_STATE2["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
    HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
    HEADER_STATE2[HEADER_STATE2["UPGRADE"] = 4] = "UPGRADE";
    HEADER_STATE2[HEADER_STATE2["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
    HEADER_STATE2[HEADER_STATE2["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
    HEADER_STATE2[HEADER_STATE2["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
    HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
  })(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));
  exports.SPECIAL_HEADERS = {
    "connection": HEADER_STATE.CONNECTION,
    "content-length": HEADER_STATE.CONTENT_LENGTH,
    "proxy-connection": HEADER_STATE.CONNECTION,
    "transfer-encoding": HEADER_STATE.TRANSFER_ENCODING,
    "upgrade": HEADER_STATE.UPGRADE
  };
})(constants$1);
var llhttp_wasm = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzk4AwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAYGAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMEBQFwAQ4OBQMBAAIGCAF/AUGgtwQLB/UEHwZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAJGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAKGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQA1DGxsaHR0cF9hbGxvYwAMBm1hbGxvYwA6C2xsaHR0cF9mcmVlAA0EZnJlZQA8D2xsaHR0cF9nZXRfdHlwZQAOFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAPFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAQEWxsaHR0cF9nZXRfbWV0aG9kABEWbGxodHRwX2dldF9zdGF0dXNfY29kZQASEmxsaHR0cF9nZXRfdXBncmFkZQATDGxsaHR0cF9yZXNldAAUDmxsaHR0cF9leGVjdXRlABUUbGxodHRwX3NldHRpbmdzX2luaXQAFg1sbGh0dHBfZmluaXNoABcMbGxodHRwX3BhdXNlABgNbGxodHRwX3Jlc3VtZQAZG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAaEGxsaHR0cF9nZXRfZXJybm8AGxdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAcF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uAB0UbGxodHRwX2dldF9lcnJvcl9wb3MAHhFsbGh0dHBfZXJybm9fbmFtZQAfEmxsaHR0cF9tZXRob2RfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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QZx/akHkAEkNACAAQcwBRg0AIABBsAJGDQBBBCEFIARBiARxQYAERg0CIARBKHFFDQILQQAPC0EAQQMgACkDIFAbIQULIAULXQECf0EAIQECQCAALQAoQQFGDQAgAC8BMiICQZx/akHkAEkNACACQcwBRg0AIAJBsAJGDQAgAC8BMCIAQcAAcQ0AQQEhASAAQYgEcUGABEYNACAAQShxRSEBCyABC6IBAQN/AkACQAJAIAAtACpFDQAgAC0AK0UNAEEAIQMgAC8BMCIEQQJxRQ0BDAILQQAhAyAALwEwIgRBAXFFDQELQQEhAyAALQAoQQFGDQAgAC8BMiIFQZx/akHkAEkNACAFQcwBRg0AIAVBsAJGDQAgBEHAAHENAEEAIQMgBEGIBHFBgARGDQAgBEEocUEARyEDCyAAQQA7ATAgAEEAOgAvIAMLlAEBAn8CQAJAAkAgAC0AKkUNACAALQArRQ0AQQAhASAALwEwIgJBAnFFDQEMAgtBACEBIAAvATAiAkEBcUUNAQtBASEBIAAtAChBAUYNACAALwEyIgBBnH9qQeQASQ0AIABBzAFGDQAgAEGwAkYNACACQcAAcQ0AQQAhASACQYgEcUGABEYNACACQShxQQBHIQELIAELTwAgAEEYakIANwMAIABCADcDACAAQTBqQgA3AwAgAEEoakIANwMAIABBIGpCADcDACAAQRBqQgA3AwAgAEEIakIANwMAIABBuAE2AhxBAAt7AQF/AkAgACgCDCIDDQACQCAAKAIERQ0AIAAgATYCBAsCQCAAIAEgAhC4gICAACIDDQAgACgCDA8LIAAgAzYCHEEAIQMgACgCBCIBRQ0AIAAgASACIAAoAggRgYCAgAAAIgFFDQAgACACNgIUIAAgATYCDCABIQMLIAML8soBAxl/A34FfyOAgICAAEEQayIDJICAgIAAIAEhBCABIQUgASEGIAEhByABIQggASEJIAEhCiABIQsgASEMIAEhDSABIQ4gASEPIAEhECABIREgASESIAEhEyABIRQgASEVIAEhFiABIRcgASEYIAEhGSABIRoCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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QQEhGwwPC0GbASEbDA4LQZwBIRsMDQtBngEhGwwMC0GgASEbDAsLQZ8BIRsMCgtBoQEhGwwJC0GiASEbDAgLQaMBIRsMBwtBpAEhGwwGC0GlASEbDAULQaYBIRsMBAtBpwEhGwwDC0GoASEbDAILQakBIRsMAQtBrwEhGwsDQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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IAAgIDYCAAybAgsgAEEANgIAIB8gI2tBBWohAUEjIRsMswELAkAgASIEIAJHDQBB6wAhGwyaAgsCQAJAIAQtAABBtH9qDggAtgG2AbYBtgG2AbYBAbYBCyAEQQFqIQFB3QAhGwyPAgsgBEEBaiEBQd4AIRsMjgILAkAgASIEIAJHDQBB7AAhGwyZAgsgBC0AAEHFAEcNswEgBEEBaiEBDOQBC0HtACEbIAEiHyACRg2XAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBqLKAgABqLQAARw2zASABQQNGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMmAILIABBADYCACAfICNrQQRqIQFBLSEbDLABC0HuACEbIAEiHyACRg2WAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFB8LKAgABqLQAARw2yASABQQhGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMlwILIABBADYCACAfICNrQQlqIQFBKSEbDK8BCwJAIAEiASACRw0AQe8AIRsMlgILQQEhGyABLQAAQd8ARw2uASABQQFqIQEM4gELQfAAIRsgASIfIAJGDZQCIAIgH2sgACgCACIjaiEgIB8hBCAjIQEDQCAELQAAIAFBrLKAgABqLQAARw2vASABQQFGDfoBIAFBAWohASAEQQFqIgQgAkcNAAsgACAgNgIADJQCC0HxACEbIAEiHyACRg2TAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBrrKAgABqLQAARw2vASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMlAILIABBADYCACAfICNrQQNqIQFBAiEbDKwBC0HyACEbIAEiHyACRg2SAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBkLOAgABqLQAARw2uASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMkwILIABBADYCACAfICNrQQJqIQFBHyEbDKsBC0HzACEbIAEiHyACRg2RAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBkrOAgABqLQAARw2tASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMkgILIABBADYCACAfICNrQQJqIQFBCSEbDKoBCwJAIAEiBCACRw0AQfQAIRsMkQILAkACQCAELQAAQbd/ag4HAK0BrQGtAa0BrQEBrQELIARBAWohAUHmACEbDIYCCyAEQQFqIQFB5wAhGwyFAgsCQCABIhsgAkcNAEH1ACEbDJACCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFBsbKAgABqLQAARw2rASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBB9QAhGwyQAgsgAEEANgIAIBsgH2tBBmohAUEYIRsMqAELAkAgASIbIAJHDQBB9gAhGwyPAgsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQbeygIAAai0AAEcNqgEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQfYAIRsMjwILIABBADYCACAbIB9rQQNqIQFBFyEbDKcBCwJAIAEiGyACRw0AQfcAIRsMjgILIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUG6soCAAGotAABHDakBIAFBBkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEH3ACEbDI4CCyAAQQA2AgAgGyAfa0EHaiEBQRUhGwymAQsCQCABIhsgAkcNAEH4ACEbDI0CCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFBwbKAgABqLQAARw2oASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBB+AAhGwyNAgsgAEEANgIAIBsgH2tBBmohAUEeIRsMpQELAkAgASIEIAJHDQBB+QAhGwyMAgsgBC0AAEHMAEcNpgEgBEEBaiEBQQohGwykAQsCQCABIgQgAkcNAEH6ACEbDIsCCwJAAkAgBC0AAEG/f2oODwCnAacBpwGnAacBpwGnAacBpwGnAacBpwGnAQGnAQsgBEEBaiEBQewAIRsMgAILIARBAWohAUHtACEbDP8BCwJAIAEiBCACRw0AQfsAIRsMigILAkACQCAELQAAQb9/ag4DAKYBAaYBCyAEQQFqIQFB6wAhGwz/AQsgBEEBaiEBQe4AIRsM/gELAkAgASIbIAJHDQBB/AAhGwyJAgsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQceygIAAai0AAEcNpAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQfwAIRsMiQILIABBADYCACAbIB9rQQJqIQFBCyEbDKEBCwJAIAEiBCACRw0AQf0AIRsMiAILAkACQAJAAkAgBC0AAEFTag4jAKYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmAaYBpgGmAaYBpgEBpgGmAaYBpgGmAQKmAaYBpgEDpgELIARBAWohAUHpACEbDP8BCyAEQQFqIQFB6gAhGwz+AQsgBEEBaiEBQe8AIRsM/QELIARBAWohAUHwACEbDPwBCwJAIAEiGyACRw0AQf4AIRsMhwILIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUHJsoCAAGotAABHDaIBIAFBBEYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEH+ACEbDIcCCyAAQQA2AgAgGyAfa0EFaiEBQRkhGwyfAQsCQCABIh8gAkcNAEH/ACEbDIYCCyACIB9rIAAoAgAiI2ohGyAfIQQgIyEBAkADQCAELQAAIAFBzrKAgABqLQAARw2hASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBs2AgBB/wAhGwyGAgsgAEEANgIAQQYhGyAfICNrQQZqIQEMngELAkAgASIbIAJHDQBBgAEhGwyFAgsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQdSygIAAai0AAEcNoAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQYABIRsMhQILIABBADYCACAbIB9rQQJqIQFBHCEbDJ0BCwJAIAEiGyACRw0AQYEBIRsMhAILIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUHWsoCAAGotAABHDZ8BIAFBAUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEGBASEbDIQCCyAAQQA2AgAgGyAfa0ECaiEBQSchGwycAQsCQCABIgQgAkcNAEGCASEbDIMCCwJAAkAgBC0AAEGsf2oOAgABnwELIARBAWohAUH0ACEbDPgBCyAEQQFqIQFB9QAhGwz3AQsCQCABIhsgAkcNAEGDASEbDIICCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFB2LKAgABqLQAARw2dASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBBgwEhGwyCAgsgAEEANgIAIBsgH2tBAmohAUEmIRsMmgELAkAgASIbIAJHDQBBhAEhGwyBAgsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQdqygIAAai0AAEcNnAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQYQBIRsMgQILIABBADYCACAbIB9rQQJqIQFBAyEbDJkBCwJAIAEiGyACRw0AQYUBIRsMgAILIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUGNs4CAAGotAABHDZsBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEGFASEbDIACCyAAQQA2AgAgGyAfa0EDaiEBQQwhGwyYAQsCQCABIhsgAkcNAEGGASEbDP8BCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFB3LKAgABqLQAARw2aASABQQNGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBBhgEhGwz/AQsgAEEANgIAIBsgH2tBBGohAUENIRsMlwELAkAgASIEIAJHDQBBhwEhGwz+AQsCQAJAIAQtAABBun9qDgsAmgGaAZoBmgGaAZoBmgGaAZoBAZoBCyAEQQFqIQFB+QAhGwzzAQsgBEEBaiEBQfoAIRsM8gELAkAgASIEIAJHDQBBiAEhGwz9AQsgBC0AAEHQAEcNlwEgBEEBaiEBDMoBCwJAIAEiBCACRw0AQYkBIRsM/AELAkACQCAELQAAQbd/ag4HAZgBmAGYAZgBmAEAmAELIARBAWohAUH8ACEbDPEBCyAEQQFqIQFBIiEbDJQBCwJAIAEiGyACRw0AQYoBIRsM+wELIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUHgsoCAAGotAABHDZYBIAFBAUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEGKASEbDPsBCyAAQQA2AgAgGyAfa0ECaiEBQR0hGwyTAQsCQCABIgQgAkcNAEGLASEbDPoBCwJAAkAgBC0AAEGuf2oOAwCWAQGWAQsgBEEBaiEBQf4AIRsM7wELIARBAWohAUEEIRsMkgELAkAgASIEIAJHDQBBjAEhGwz5AQsCQAJAAkACQAJAIAQtAABBv39qDhUAmAGYAZgBmAGYAZgBmAGYAZgBmAEBmAGYAQKYAZgBA5gBmAEEmAELIARBAWohAUH2ACEbDPEBCyAEQQFqIQFB9wAhGwzwAQsgBEEBaiEBQfgAIRsM7wELIARBAWohAUH9ACEbDO4BCyAEQQFqIQFB/wAhGwztAQsCQCABIhsgAkcNAEGNASEbDPgBCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFBjbOAgABqLQAARw2TASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBBjQEhGwz4AQsgAEEANgIAIBsgH2tBA2ohAUERIRsMkAELAkAgASIbIAJHDQBBjgEhGwz3AQsgAiAbayAAKAIAIh9qISMgGyEEIB8hAQJAA0AgBC0AACABQeKygIAAai0AAEcNkgEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAjNgIAQY4BIRsM9wELIABBADYCACAbIB9rQQNqIQFBLCEbDI8BCwJAIAEiGyACRw0AQY8BIRsM9gELIAIgG2sgACgCACIfaiEjIBshBCAfIQECQANAIAQtAAAgAUHlsoCAAGotAABHDZEBIAFBBEYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgIzYCAEGPASEbDPYBCyAAQQA2AgAgGyAfa0EFaiEBQSshGwyOAQsCQCABIhsgAkcNAEGQASEbDPUBCyACIBtrIAAoAgAiH2ohIyAbIQQgHyEBAkADQCAELQAAIAFB6rKAgABqLQAARw2QASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICM2AgBBkAEhGwz1AQsgAEEANgIAIBsgH2tBA2ohAUEUIRsMjQELAkAgBCACRw0AQZEBIRsM9AELAkACQAJAAkAgBC0AAEG+f2oODwABApIBkgGSAZIBkgGSAZIBkgGSAZIBkgEDkgELIARBAWohAUGBASEbDOsBCyAEQQFqIQFBggEhGwzqAQsgBEEBaiEBQYMBIRsM6QELIARBAWohAUGEASEbDOgBCwJAIAQgAkcNAEGSASEbDPMBCyAELQAAQcUARw2NASAEQQFqIQQMwQELAkAgBSACRw0AQZMBIRsM8gELIAIgBWsgACgCACIbaiEfIAUhBCAbIQECQANAIAQtAAAgAUHtsoCAAGotAABHDY0BIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgHzYCAEGTASEbDPIBCyAAQQA2AgAgBSAba0EDaiEBQQ4hGwyKAQsCQCAEIAJHDQBBlAEhGwzxAQsgBC0AAEHQAEcNiwEgBEEBaiEBQSUhGwyJAQsCQCAGIAJHDQBBlQEhGwzwAQsgAiAGayAAKAIAIhtqIR8gBiEEIBshAQJAA0AgBC0AACABQfCygIAAai0AAEcNiwEgAUEIRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAfNgIAQZUBIRsM8AELIABBADYCACAGIBtrQQlqIQFBKiEbDIgBCwJAIAQgAkcNAEGWASEbDO8BCwJAAkAgBC0AAEGrf2oOCwCLAYsBiwGLAYsBiwGLAYsBiwEBiwELIARBAWohBEGIASEbDOQBCyAEQQFqIQZBiQEhGwzjAQsCQCAEIAJHDQBBlwEhGwzuAQsCQAJAIAQtAABBv39qDhQAigGKAYoBigGKAYoBigGKAYoBigGKAYoBigGKAYoBigGKAYoBAYoBCyAEQQFqIQVBhwEhGwzjAQsgBEEBaiEEQYoBIRsM4gELAkAgByACRw0AQZgBIRsM7QELIAIgB2sgACgCACIbaiEfIAchBCAbIQECQANAIAQtAAAgAUH5soCAAGotAABHDYgBIAFBA0YNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgHzYCAEGYASEbDO0BCyAAQQA2AgAgByAba0EEaiEBQSEhGwyFAQsCQCAIIAJHDQBBmQEhGwzsAQsgAiAIayAAKAIAIhtqIR8gCCEEIBshAQJAA0AgBC0AACABQf2ygIAAai0AAEcNhwEgAUEGRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAfNgIAQZkBIRsM7AELIABBADYCACAIIBtrQQdqIQFBGiEbDIQBCwJAIAQgAkcNAEGaASEbDOsBCwJAAkACQCAELQAAQbt/ag4RAIgBiAGIAYgBiAGIAYgBiAGIAQGIAYgBiAGIAYgBAogBCyAEQQFqIQRBiwEhGwzhAQsgBEEBaiEHQYwBIRsM4AELIARBAWohCEGNASEbDN8BCwJAIAkgAkcNAEGbASEbDOoBCyACIAlrIAAoAgAiG2ohHyAJIQQgGyEBAkADQCAELQAAIAFBhLOAgABqLQAARw2FASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIB82AgBBmwEhGwzqAQsgAEEANgIAIAkgG2tBBmohAUEoIRsMggELAkAgCiACRw0AQZwBIRsM6QELIAIgCmsgACgCACIbaiEfIAohBCAbIQECQANAIAQtAAAgAUGKs4CAAGotAABHDYQBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgHzYCAEGcASEbDOkBCyAAQQA2AgAgCiAba0EDaiEBQQchGwyBAQsCQCAEIAJHDQBBnQEhGwzoAQsCQAJAIAQtAABBu39qDg4AhAGEAYQBhAGEAYQBhAGEAYQBhAGEAYQBAYQBCyAEQQFqIQlBjwEhGwzdAQsgBEEBaiEKQZABIRsM3AELAkAgCyACRw0AQZ4BIRsM5wELIAIgC2sgACgCACIbaiEfIAshBCAbIQECQANAIAQtAAAgAUGNs4CAAGotAABHDYIBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgHzYCAEGeASEbDOcBCyAAQQA2AgAgCyAba0EDaiEBQRIhGwx/CwJAIAwgAkcNAEGfASEbDOYBCyACIAxrIAAoAgAiG2ohHyAMIQQgGyEBAkADQCAELQAAIAFBkLOAgABqLQAARw2BASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIB82AgBBnwEhGwzmAQsgAEEANgIAIAwgG2tBAmohAUEgIRsMfgsCQCANIAJHDQBBoAEhGwzlAQsgAiANayAAKAIAIhtqIR8gDSEEIBshAQJAA0AgBC0AACABQZKzgIAAai0AAEcNgAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAfNgIAQaABIRsM5QELIABBADYCACANIBtrQQJqIQFBDyEbDH0LAkAgBCACRw0AQaEBIRsM5AELAkACQCAELQAAQbd/ag4HAIABgAGAAYABgAEBgAELIARBAWohDEGTASEbDNkBCyAEQQFqIQ1BlAEhGwzYAQsCQCAOIAJHDQBBogEhGwzjAQsgAiAOayAAKAIAIhtqIR8gDiEEIBshAQJAA0AgBC0AACABQZSzgIAAai0AAEcNfiABQQdGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIB82AgBBogEhGwzjAQsgAEEANgIAIA4gG2tBCGohAUEbIRsMewsCQCAEIAJHDQBBowEhGwziAQsCQAJAAkAgBC0AAEG+f2oOEgB/f39/f39/f38Bf39/f39/An8LIARBAWohC0GSASEbDNgBCyAEQQFqIQRBlQEhGwzXAQsgBEEBaiEOQZYBIRsM1gELAkAgBCACRw0AQaQBIRsM4QELIAQtAABBzgBHDXsgBEEBaiEEDLABCwJAIAQgAkcNAEGlASEbDOABCwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAQtAABBv39qDhUAAQIDigEEBQaKAYoBigEHCAkKC4oBDA0OD4oBCyAEQQFqIQFB1gAhGwzjAQsgBEEBaiEBQdcAIRsM4gELIARBAWohAUHcACEbDOEBCyAEQQFqIQFB4AAhGwzgAQsgBEEBaiEBQeEAIRsM3wELIARBAWohAUHkACEbDN4BCyAEQQFqIQFB5QAhGwzdAQsgBEEBaiEBQegAIRsM3AELIARBAWohAUHxACEbDNsBCyAEQQFqIQFB8gAhGwzaAQsgBEEBaiEBQfMAIRsM2QELIARBAWohAUGAASEbDNgBCyAEQQFqIQRBhgEhGwzXAQsgBEEBaiEEQY4BIRsM1gELIARBAWohBEGRASEbDNUBCyAEQQFqIQRBmAEhGwzUAQsCQCAQIAJHDQBBpwEhGwzfAQsgEEEBaiEPDHsLA0ACQCAbLQAAQXZqDgR7AAB+AAsgG0EBaiIbIAJHDQALQagBIRsM3QELAkAgESACRg0AIABBjYCAgAA2AgggACARNgIEIBEhAUEBIRsM0gELQakBIRsM3AELAkAgESACRw0AQaoBIRsM3AELAkACQCARLQAAQXZqDgQBsQGxAQCxAQsgEUEBaiEQDHwLIBFBAWohDwx4CyAAIA8gAhCngICAABogDyEBDEkLAkAgESACRw0AQasBIRsM2gELAkACQCARLQAAQXZqDhcBfX0BfX19fX19fX19fX19fX19fX19AH0LIBFBAWohEQtBnAEhGwzOAQsCQCASIAJHDQBBrQEhGwzZAQsgEi0AAEEgRw17IABBADsBMiASQQFqIQFBoAEhGwzNAQsgASEjAkADQCAjIhEgAkYNASARLQAAQVBqQf8BcSIbQQpPDa4BAkAgAC8BMiIfQZkzSw0AIAAgH0EKbCIfOwEyIBtB//8DcyAfQf7/A3FJDQAgEUEBaiEjIAAgHyAbaiIbOwEyIBtB//8DcUHoB0kNAQsLQQAhGyAAQQA2AhwgAEGdiYCAADYCECAAQQ02AgwgACARQQFqNgIUDNgBC0GsASEbDNcBCwJAIBMgAkcNAEGuASEbDNcBC0EAIRsCQAJAAkACQAJAAkACQAJAIBMtAABBUGoOCoMBggEAAQIDBAUGB4QBC0ECIRsMggELQQMhGwyBAQtBBCEbDIABC0EFIRsMfwtBBiEbDH4LQQchGwx9C0EIIRsMfAtBCSEbDHsLAkAgFCACRw0AQa8BIRsM1gELIBQtAABBLkcNfCAUQQFqIRMMrAELAkAgFSACRw0AQbABIRsM1QELQQAhGwJAAkACQAJAAkACQAJAAkAgFS0AAEFQag4KhQGEAQABAgMEBQYHhgELQQIhGwyEAQtBAyEbDIMBC0EEIRsMggELQQUhGwyBAQtBBiEbDIABC0EHIRsMfwtBCCEbDH4LQQkhGwx9CwJAIAQgAkcNAEGxASEbDNQBCyACIARrIAAoAgAiH2ohIyAEIRUgHyEbA0AgFS0AACAbQZyzgIAAai0AAEcNfyAbQQRGDbcBIBtBAWohGyAVQQFqIhUgAkcNAAsgACAjNgIAQbEBIRsM0wELAkAgFiACRw0AQbIBIRsM0wELIAIgFmsgACgCACIbaiEfIBYhBCAbIQEDQCAELQAAIAFBobOAgABqLQAARw1/IAFBAUYNuQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIB82AgBBsgEhGwzSAQsCQCAXIAJHDQBBswEhGwzSAQsgAiAXayAAKAIAIhVqIR8gFyEEIBUhGwNAIAQtAAAgG0Gjs4CAAGotAABHDX4gG0ECRg2AASAbQQFqIRsgBEEBaiIEIAJHDQALIAAgHzYCAEGzASEbDNEBCwJAIAQgAkcNAEG0ASEbDNEBCwJAAkAgBC0AAEG7f2oOEAB/f39/f39/f39/f39/fwF/CyAEQQFqIRZBpQEhGwzGAQsgBEEBaiEXQaYBIRsMxQELAkAgBCACRw0AQbUBIRsM0AELIAQtAABByABHDXwgBEEBaiEEDKgBCwJAIAQgAkcNAEG2ASEbDM8BCyAELQAAQcgARg2oASAAQQE6ACgMnwELA0ACQCAELQAAQXZqDgQAfn4AfgsgBEEBaiIEIAJHDQALQbgBIRsMzQELIABBADoALyAALQAtQQRxRQ3GAQsgAEEAOgAvIAEhAQx9CyAbQRVGDawBIABBADYCHCAAIAE2AhQgAEGrjICAADYCECAAQRI2AgxBACEbDMoBCwJAIAAgGyACEK2AgIAAIgQNACAbIQEMwwELAkAgBEEVRw0AIABBAzYCHCAAIBs2AhQgAEGGkoCAADYCECAAQRU2AgxBACEbDMoBCyAAQQA2AhwgACAbNgIUIABBq4yAgAA2AhAgAEESNgIMQQAhGwzJAQsgG0EVRg2oASAAQQA2AhwgACABNgIUIABBiIyAgAA2AhAgAEEUNgIMQQAhGwzIAQsgACgCBCEjIABBADYCBCAbIBynaiIgIQEgACAjIBsgICAfGyIbEK6AgIAAIh9FDX8gAEEHNgIcIAAgGzYCFCAAIB82AgxBACEbDMcBCyAAIAAvATBBgAFyOwEwIAEhAQw1CyAbQRVGDaQBIABBADYCHCAAIAE2AhQgAEHFi4CAADYCECAAQRM2AgxBACEbDMUBCyAAQQA2AhwgACABNgIUIABBi4uAgAA2AhAgAEECNgIMQQAhGwzEAQsgG0E7Rw0BIAFBAWohAQtBCCEbDLcBC0EAIRsgAEEANgIcIAAgATYCFCAAQaOQgIAANgIQIABBDDYCDAzBAQtCASEcCyAbQQFqIQECQCAAKQMgIh1C//////////8PVg0AIAAgHUIEhiAchDcDICABIQEMfAsgAEEANgIcIAAgATYCFCAAQYmJgIAANgIQIABBDDYCDEEAIRsMvwELIABBADYCHCAAIBs2AhQgAEGjkICAADYCECAAQQw2AgxBACEbDL4BCyAAKAIEISMgAEEANgIEIBsgHKdqIiAhASAAICMgGyAgIB8bIhsQroCAgAAiH0UNcyAAQQU2AhwgACAbNgIUIAAgHzYCDEEAIRsMvQELIABBADYCHCAAIBs2AhQgAEGNlICAADYCECAAQQ82AgxBACEbDLwBCyAAIBsgAhCtgICAACIBDQEgGyEBC0EQIRsMrwELAkAgAUEVRw0AIABBAjYCHCAAIBs2AhQgAEGGkoCAADYCECAAQRU2AgxBACEbDLoBCyAAQQA2AhwgACAbNgIUIABBq4yAgAA2AhAgAEESNgIMQQAhGwy5AQsgAUEBaiEbAkAgAC8BMCIBQYABcUUNAAJAIAAgGyACELCAgIAAIgENACAbIQEMcAsgAUEVRw2aASAAQQU2AhwgACAbNgIUIABB7pGAgAA2AhAgAEEVNgIMQQAhGwy5AQsCQCABQaAEcUGgBEcNACAALQAtQQJxDQAgAEEANgIcIAAgGzYCFCAAQeyPgIAANgIQIABBBDYCDEEAIRsMuQELIAAgGyACELGAgIAAGiAbIQECQAJAAkACQAJAIAAgGyACEKyAgIAADhYCAQAEBAQEBAQEBAQEBAQEBAQEBAQDBAsgAEEBOgAuCyAAIAAvATBBwAByOwEwIBshAQtBHiEbDK8BCyAAQRU2AhwgACAbNgIUIABBkZGAgAA2AhAgAEEVNgIMQQAhGwy5AQsgAEEANgIcIAAgGzYCFCAAQbGLgIAANgIQIABBETYCDEEAIRsMuAELIAAtAC1BAXFFDQFBqgEhGwysAQsCQCAYIAJGDQADQAJAIBgtAABBIEYNACAYIQEMpwELIBhBAWoiGCACRw0AC0EXIRsMtwELQRchGwy2AQsgACgCBCEEIABBADYCBCAAIAQgGBCogICAACIERQ2TASAAQRg2AhwgACAENgIMIAAgGEEBajYCFEEAIRsMtQELIABBGTYCHCAAIAE2AhQgACAbNgIMQQAhGwy0AQsgGyEBQQEhHwJAAkACQAJAAkACQAJAIAAtACxBfmoOBwYFBQMBAgAFCyAAIAAvATBBCHI7ATAMAwtBAiEfDAELQQQhHwsgAEEBOgAsIAAgAC8BMCAfcjsBMAsgGyEBC0EhIRsMqQELIABBADYCHCAAIBs2AhQgAEGBj4CAADYCECAAQQs2AgxBACEbDLMBCyAbIQFBASEfAkACQAJAAkACQCAALQAsQXtqDgQCAAEDBQtBAiEfDAELQQQhHwsgAEEBOgAsIAAgAC8BMCAfcjsBMAwBCyAAIAAvATBBCHI7ATALIBshAQtBqwEhGwymAQsgACABIAIQq4CAgAAaDB8LAkAgASIbIAJGDQAgGyEBAkACQCAbLQAAQXZqDgQBb28AbwsgG0EBaiEBC0EfIRsMpQELQT8hGwyvAQsgAEEANgIcIAAgATYCFCAAQeqQgIAANgIQIABBAzYCDEEAIRsMrgELIAAoAgQhASAAQQA2AgQCQCAAIAEgGRCqgICAACIBDQAgGUEBaiEBDG0LIABBHjYCHCAAIAE2AgwgACAZQQFqNgIUQQAhGwytAQsgAC0ALUEBcUUNA0GtASEbDKEBCwJAIBkgAkcNAEEfIRsMrAELA0ACQCAZLQAAQXZqDgQCAAADAAsgGUEBaiIZIAJHDQALQR8hGwyrAQsgACgCBCEBIABBADYCBAJAIAAgASAZEKqAgIAAIgENACAZIQEMagsgAEEeNgIcIAAgGTYCFCAAIAE2AgxBACEbDKoBCyAAKAIEIQEgAEEANgIEAkAgACABIBkQqoCAgAAiAQ0AIBlBAWohAQxpCyAAQR42AhwgACABNgIMIAAgGUEBajYCFEEAIRsMqQELIABBADYCHCAAIBk2AhQgAEHujICAADYCECAAQQo2AgxBACEbDKgBCyAbQSxHDQEgAUEBaiEbQQEhAQJAAkACQAJAAkAgAC0ALEF7ag4EAwECBAALIBshAQwEC0ECIQEMAQtBBCEBCyAAQQE6ACwgACAALwEwIAFyOwEwIBshAQwBCyAAIAAvATBBCHI7ATAgGyEBC0EuIRsMmwELIABBADoALCABIQELQSohGwyZAQsgAEEANgIAICAgIWtBCWohAUEFIRsMkwELIABBADYCACAgICFrQQZqIQFBByEbDJIBCyAAIAAvATBBIHI7ATAgASEBDAILIAAoAgQhBCAAQQA2AgQCQCAAIAQgARCqgICAACIEDQAgASEBDJcBCyAAQSg2AhwgACABNgIUIAAgBDYCDEEAIRsMoAELIABBCDoALCABIQELQSYhGwyTAQsgAC0AMEEgcQ15Qa4BIRsMkgELAkAgGiACRg0AAkADQAJAIBotAABBUGoiAUH/AXFBCkkNACAaIQFBKyEbDJUBCyAAKQMgIhxCmbPmzJmz5swZVg0BIAAgHEIKfiIcNwMgIBwgAa0iHUJ/hUKAfoRWDQEgACAcIB1C/wGDfDcDICAaQQFqIhogAkcNAAtBKiEbDJ4BCyAAKAIEIQQgAEEANgIEIAAgBCAaQQFqIgEQqoCAgAAiBA16IAEhAQyUAQtBKiEbDJwBCyAAIAAvATBB9/sDcUGABHI7ATAgGiEBC0EsIRsMjwELIAAgAC8BMEEQcjsBMAsgAEEAOgAsIBohAQxYCyAAQTI2AhwgACABNgIMIAAgGEEBajYCFEEAIRsMlwELIAEtAABBOkcNAiAAKAIEIRsgAEEANgIEIAAgGyABEKiAgIAAIhsNASABQQFqIQELQTEhGwyKAQsgAEEyNgIcIAAgGzYCDCAAIAFBAWo2AhRBACEbDJQBCyAAQQA2AhwgACABNgIUIABBh46AgAA2AhAgAEEKNgIMQQAhGwyTAQsgAUEBaiEBCyAAQYASOwEqIAAgASACEKWAgIAAGiABIQELQawBIRsMhQELIAAoAgQhGyAAQQA2AgQCQCAAIBsgARCkgICAACIbDQAgASEBDFILIABBwAA2AhwgACABNgIUIAAgGzYCDEEAIRsMjwELIABBADYCHCAAIB82AhQgAEGVmICAADYCECAAQQc2AgwgAEEANgIAQQAhGwyOAQsgACgCBCEbIABBADYCBAJAIAAgGyABEKSAgIAAIhsNACABIQEMUQsgAEHBADYCHCAAIAE2AhQgACAbNgIMQQAhGwyNAQtBACEbIABBADYCHCAAIAE2AhQgAEHrjYCAADYCECAAQQk2AgwMjAELQQEhGwsgACAbOgArIAFBAWohASAALQApQSJGDYUBDE4LIABBADYCHCAAIAE2AhQgAEGijYCAADYCECAAQQk2AgxBACEbDIkBCyAAQQA2AhwgACABNgIUIABBxYqAgAA2AhAgAEEJNgIMQQAhGwyIAQtBASEbCyAAIBs6ACogAUEBaiEBDEwLIABBADYCHCAAIAE2AhQgAEG4jYCAADYCECAAQQk2AgxBACEbDIUBCyAAQQA2AgAgIyAga0EEaiEBAkAgAC0AKUEjTw0AIAEhAQxMCyAAQQA2AhwgACABNgIUIABBr4mAgAA2AhAgAEEINgIMQQAhGwyEAQsgAEEANgIAC0EAIRsgAEEANgIcIAAgATYCFCAAQdmagIAANgIQIABBCDYCDAyCAQsgAEEANgIAICMgIGtBA2ohAQJAIAAtAClBIUcNACABIQEMSQsgAEEANgIcIAAgATYCFCAAQfeJgIAANgIQIABBCDYCDEEAIRsMgQELIABBADYCACAjICBrQQRqIQECQCAALQApIhtBXWpBC08NACABIQEMSAsCQCAbQQZLDQBBASAbdEHKAHFFDQAgASEBDEgLQQAhGyAAQQA2AhwgACABNgIUIABB04mAgAA2AhAgAEEINgIMDIABCyAAKAIEIRsgAEEANgIEAkAgACAbIAEQpICAgAAiGw0AIAEhAQxICyAAQcwANgIcIAAgATYCFCAAIBs2AgxBACEbDH8LIAAoAgQhGyAAQQA2AgQCQCAAIBsgARCkgICAACIbDQAgASEBDEELIABBwAA2AhwgACABNgIUIAAgGzYCDEEAIRsMfgsgACgCBCEbIABBADYCBAJAIAAgGyABEKSAgIAAIhsNACABIQEMQQsgAEHBADYCHCAAIAE2AhQgACAbNgIMQQAhGwx9CyAAKAIEIRsgAEEANgIEAkAgACAbIAEQpICAgAAiGw0AIAEhAQxFCyAAQcwANgIcIAAgATYCFCAAIBs2AgxBACEbDHwLIABBADYCHCAAIAE2AhQgAEGiioCAADYCECAAQQc2AgxBACEbDHsLIAAoAgQhGyAAQQA2AgQCQCAAIBsgARCkgICAACIbDQAgASEBDD0LIABBwAA2AhwgACABNgIUIAAgGzYCDEEAIRsMegsgACgCBCEbIABBADYCBAJAIAAgGyABEKSAgIAAIhsNACABIQEMPQsgAEHBADYCHCAAIAE2AhQgACAbNgIMQQAhGwx5CyAAKAIEIRsgAEEANgIEAkAgACAbIAEQpICAgAAiGw0AIAEhAQxBCyAAQcwANgIcIAAgATYCFCAAIBs2AgxBACEbDHgLIABBADYCHCAAIAE2AhQgAEG4iICAADYCECAAQQc2AgxBACEbDHcLIBtBP0cNASABQQFqIQELQQUhGwxqC0EAIRsgAEEANgIcIAAgATYCFCAAQdOPgIAANgIQIABBBzYCDAx0CyAAKAIEIRsgAEEANgIEAkAgACAbIAEQpICAgAAiGw0AIAEhAQw2CyAAQcAANgIcIAAgATYCFCAAIBs2AgxBACEbDHMLIAAoAgQhGyAAQQA2AgQCQCAAIBsgARCkgICAACIbDQAgASEBDDYLIABBwQA2AhwgACABNgIUIAAgGzYCDEEAIRsMcgsgACgCBCEbIABBADYCBAJAIAAgGyABEKSAgIAAIhsNACABIQEMOgsgAEHMADYCHCAAIAE2AhQgACAbNgIMQQAhGwxxCyAAKAIEIQEgAEEANgIEAkAgACABIB8QpICAgAAiAQ0AIB8hAQwzCyAAQcAANgIcIAAgHzYCFCAAIAE2AgxBACEbDHALIAAoAgQhASAAQQA2AgQCQCAAIAEgHxCkgICAACIBDQAgHyEBDDMLIABBwQA2AhwgACAfNgIUIAAgATYCDEEAIRsMbwsgACgCBCEBIABBADYCBAJAIAAgASAfEKSAgIAAIgENACAfIQEMNwsgAEHMADYCHCAAIB82AhQgACABNgIMQQAhGwxuCyAAQQA2AhwgACAfNgIUIABB0IyAgAA2AhAgAEEHNgIMQQAhGwxtCyAAQQA2AhwgACABNgIUIABB0IyAgAA2AhAgAEEHNgIMQQAhGwxsC0EAIRsgAEEANgIcIAAgHzYCFCAAQe+TgIAANgIQIABBBzYCDAxrCyAAQQA2AhwgACAfNgIUIABB75OAgAA2AhAgAEEHNgIMQQAhGwxqCyAAQQA2AhwgACAfNgIUIABB1I6AgAA2AhAgAEEHNgIMQQAhGwxpCyAAQQA2AhwgACABNgIUIABB8ZKAgAA2AhAgAEEGNgIMQQAhGwxoCyAAQQA2AgAgHyAja0EGaiEBQSQhGwsgACAbOgApIAEhAQxNCyAAQQA2AgALQQAhGyAAQQA2AhwgACAENgIUIABB1JOAgAA2AhAgAEEGNgIMDGQLIAAoAgQhDyAAQQA2AgQgACAPIBsQpoCAgAAiDw0BIBtBAWohDwtBnQEhGwxXCyAAQaYBNgIcIAAgDzYCDCAAIBtBAWo2AhRBACEbDGELIAAoAgQhECAAQQA2AgQgACAQIBsQpoCAgAAiEA0BIBtBAWohEAtBmgEhGwxUCyAAQacBNgIcIAAgEDYCDCAAIBtBAWo2AhRBACEbDF4LIABBADYCHCAAIBE2AhQgAEHzioCAADYCECAAQQ02AgxBACEbDF0LIABBADYCHCAAIBI2AhQgAEHOjYCAADYCECAAQQk2AgxBACEbDFwLQQEhGwsgACAbOgArIBNBAWohEgwwCyAAQQA2AhwgACATNgIUIABBoo2AgAA2AhAgAEEJNgIMQQAhGwxZCyAAQQA2AhwgACAUNgIUIABBxYqAgAA2AhAgAEEJNgIMQQAhGwxYC0EBIRsLIAAgGzoAKiAVQQFqIRQMLgsgAEEANgIcIAAgFTYCFCAAQbiNgIAANgIQIABBCTYCDEEAIRsMVQsgAEEANgIcIAAgFTYCFCAAQdmagIAANgIQIABBCDYCDCAAQQA2AgBBACEbDFQLIABBADYCAAtBACEbIABBADYCHCAAIAQ2AhQgAEG7k4CAADYCECAAQQg2AgwMUgsgAEECOgAoIABBADYCACAXIBVrQQNqIRUMNQsgAEECOgAvIAAgBCACEKOAgIAAIhsNAUGvASEbDEULIAAtAChBf2oOAiAiIQsgG0EVRw0pIABBtwE2AhwgACAENgIUIABB15GAgAA2AhAgAEEVNgIMQQAhGwxOC0EAIRsMQgtBAiEbDEELQQwhGwxAC0EPIRsMPwtBESEbDD4LQR0hGww9C0EVIRsMPAtBFyEbDDsLQRghGww6C0EaIRsMOQtBGyEbDDgLQTohGww3C0EkIRsMNgtBJSEbDDULQS8hGww0C0EwIRsMMwtBOyEbDDILQTwhGwwxC0E+IRsMMAtBPyEbDC8LQcAAIRsMLgtBwQAhGwwtC0HFACEbDCwLQccAIRsMKwtByAAhGwwqC0HKACEbDCkLQd8AIRsMKAtB4gAhGwwnC0H7ACEbDCYLQYUBIRsMJQtBlwEhGwwkC0GZASEbDCMLQakBIRsMIgtBpAEhGwwhC0GbASEbDCALQZ4BIRsMHwtBnwEhGwweC0GhASEbDB0LQaIBIRsMHAtBpwEhGwwbC0GoASEbDBoLIABBADYCHCAAIAQ2AhQgAEHmi4CAADYCECAAQRA2AgxBACEbDCQLIABBADYCHCAAIBo2AhQgAEG6j4CAADYCECAAQQQ2AgxBACEbDCMLIABBJzYCHCAAIAE2AhQgACAENgIMQQAhGwwiCyAYQQFqIQEMGQsgAEEKNgIcIAAgATYCFCAAQcGRgIAANgIQIABBFTYCDEEAIRsMIAsgAEEQNgIcIAAgATYCFCAAQe6RgIAANgIQIABBFTYCDEEAIRsMHwsgAEEANgIcIAAgGzYCFCAAQYiMgIAANgIQIABBFDYCDEEAIRsMHgsgAEEENgIcIAAgATYCFCAAQYaSgIAANgIQIABBFTYCDEEAIRsMHQsgAEEANgIAIAQgH2tBBWohFQtBowEhGwwQCyAAQQA2AgAgHyAja0ECaiEBQeMAIRsMDwsgAEEANgIAIABBgQQ7ASggFiAba0ECaiEBC0HTACEbDA0LIAEhAQJAIAAtAClBBUcNAEHSACEbDA0LQdEAIRsMDAtBACEbIABBADYCHCAAQbqOgIAANgIQIABBBzYCDCAAIB9BAWo2AhQMFgsgAEEANgIAICMgIGtBAmohAUE0IRsMCgsgASEBC0EtIRsMCAsgAUEBaiEBQSMhGwwHC0EgIRsMBgsgAEEANgIAICAgIWtBBGohAUEGIRsLIAAgGzoALCABIQFBDiEbDAQLIABBADYCACAjICBrQQdqIQFBDSEbDAMLIABBADYCACAfIQFBCyEbDAILIABBADYCAAsgAEEAOgAsIBghAUEJIRsMAAsLQQAhGyAAQQA2AhwgACABNgIUIABBlo+AgAA2AhAgAEELNgIMDAkLQQAhGyAAQQA2AhwgACABNgIUIABB8YiAgAA2AhAgAEELNgIMDAgLQQAhGyAAQQA2AhwgACABNgIUIABBiI2AgAA2AhAgAEEKNgIMDAcLIABBAjYCHCAAIAE2AhQgAEGgkoCAADYCECAAQRY2AgxBACEbDAYLQQEhGwwFC0HCACEbIAEiBCACRg0EIANBCGogACAEIAJB+KWAgABBChC5gICAACADKAIMIQQgAygCCA4DAQQCAAsQv4CAgAAACyAAQQA2AhwgAEG5koCAADYCECAAQRc2AgwgACAEQQFqNgIUQQAhGwwCCyAAQQA2AhwgACAENgIUIABBzpKAgAA2AhAgAEEJNgIMQQAhGwwBCwJAIAEiBCACRw0AQRQhGwwBCyAAQYmAgIAANgIIIAAgBDYCBEETIRsLIANBEGokgICAgAAgGwuvAQECfyABKAIAIQYCQAJAIAIgA0YNACAEIAZqIQQgBiADaiACayEHIAIgBkF/cyAFaiIGaiEFA0ACQCACLQAAIAQtAABGDQBBAiEEDAMLAkAgBg0AQQAhBCAFIQIMAwsgBkF/aiEGIARBAWohBCACQQFqIgIgA0cNAAsgByEGIAMhAgsgAEEBNgIAIAEgBjYCACAAIAI2AgQPCyABQQA2AgAgACAENgIAIAAgAjYCBAsKACAAELuAgIAAC5U3AQt/I4CAgIAAQRBrIgEkgICAgAACQEEAKALAs4CAAA0AQQAQvoCAgABBoLeEgABrIgJB2QBJDQBBACEDAkBBACgCgLeAgAAiBA0AQQBCfzcCjLeAgABBAEKAgISAgIDAADcChLeAgABBACABQQhqQXBxQdiq1aoFcyIENgKAt4CAAEEAQQA2ApS3gIAAQQBBADYC5LaAgAALQQAgAjYC7LaAgABBAEGgt4SAADYC6LaAgABBAEGgt4SAADYCuLOAgABBACAENgLMs4CAAEEAQX82AsizgIAAA0AgA0Hks4CAAGogA0HYs4CAAGoiBDYCACAEIANB0LOAgABqIgU2AgAgA0Hcs4CAAGogBTYCACADQeyzgIAAaiADQeCzgIAAaiIFNgIAIAUgBDYCACADQfSzgIAAaiADQeizgIAAaiIENgIAIAQgBTYCACADQfCzgIAAaiAENgIAIANBIGoiA0GAAkcNAAtBoLeEgABBeEGgt4SAAGtBD3FBAEGgt4SAAEEIakEPcRsiA2oiBEEEaiACIANrQUhqIgNBAXI2AgBBAEEAKAKQt4CAADYCxLOAgABBACAENgLAs4CAAEEAIAM2ArSzgIAAIAJBoLeEgABqQUxqQTg2AgALAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB7AFLDQACQEEAKAKos4CAACIGQRAgAEETakFwcSAAQQtJGyICQQN2IgR2IgNBA3FFDQAgA0EBcSAEckEBcyIFQQN0IgBB2LOAgABqKAIAIgRBCGohAwJAAkAgBCgCCCICIABB0LOAgABqIgBHDQBBACAGQX4gBXdxNgKos4CAAAwBCyAAIAI2AgggAiAANgIMCyAEIAVBA3QiBUEDcjYCBCAEIAVqQQRqIgQgBCgCAEEBcjYCAAwMCyACQQAoArCzgIAAIgdNDQECQCADRQ0AAkACQCADIAR0QQIgBHQiA0EAIANrcnEiA0EAIANrcUF/aiIDIANBDHZBEHEiA3YiBEEFdkEIcSIFIANyIAQgBXYiA0ECdkEEcSIEciADIAR2IgNBAXZBAnEiBHIgAyAEdiIDQQF2QQFxIgRyIAMgBHZqIgVBA3QiAEHYs4CAAGooAgAiBCgCCCIDIABB0LOAgABqIgBHDQBBACAGQX4gBXdxIgY2AqizgIAADAELIAAgAzYCCCADIAA2AgwLIARBCGohAyAEIAJBA3I2AgQgBCAFQQN0IgVqIAUgAmsiBTYCACAEIAJqIgAgBUEBcjYCBAJAIAdFDQAgB0EDdiIIQQN0QdCzgIAAaiECQQAoAryzgIAAIQQCQAJAIAZBASAIdCIIcQ0AQQAgBiAIcjYCqLOAgAAgAiEIDAELIAIoAgghCAsgCCAENgIMIAIgBDYCCCAEIAI2AgwgBCAINgIIC0EAIAA2AryzgIAAQQAgBTYCsLOAgAAMDAtBACgCrLOAgAAiCUUNASAJQQAgCWtxQX9qIgMgA0EMdkEQcSIDdiIEQQV2QQhxIgUgA3IgBCAFdiIDQQJ2QQRxIgRyIAMgBHYiA0EBdkECcSIEciADIAR2IgNBAXZBAXEiBHIgAyAEdmpBAnRB2LWAgABqKAIAIgAoAgRBeHEgAmshBCAAIQUCQANAAkAgBSgCECIDDQAgBUEUaigCACIDRQ0CCyADKAIEQXhxIAJrIgUgBCAFIARJIgUbIQQgAyAAIAUbIQAgAyEFDAALCyAAKAIYIQoCQCAAKAIMIgggAEYNAEEAKAK4s4CAACAAKAIIIgNLGiAIIAM2AgggAyAINgIMDAsLAkAgAEEUaiIFKAIAIgMNACAAKAIQIgNFDQMgAEEQaiEFCwNAIAUhCyADIghBFGoiBSgCACIDDQAgCEEQaiEFIAgoAhAiAw0ACyALQQA2AgAMCgtBfyECIABBv39LDQAgAEETaiIDQXBxIQJBACgCrLOAgAAiB0UNAEEAIQsCQCACQYACSQ0AQR8hCyACQf///wdLDQAgA0EIdiIDIANBgP4/akEQdkEIcSIDdCIEIARBgOAfakEQdkEEcSIEdCIFIAVBgIAPakEQdkECcSIFdEEPdiADIARyIAVyayIDQQF0IAIgA0EVanZBAXFyQRxqIQsLQQAgAmshBAJAAkACQAJAIAtBAnRB2LWAgABqKAIAIgUNAEEAIQNBACEIDAELQQAhAyACQQBBGSALQQF2ayALQR9GG3QhAEEAIQgDQAJAIAUoAgRBeHEgAmsiBiAETw0AIAYhBCAFIQggBg0AQQAhBCAFIQggBSEDDAMLIAMgBUEUaigCACIGIAYgBSAAQR12QQRxakEQaigCACIFRhsgAyAGGyEDIABBAXQhACAFDQALCwJAIAMgCHINAEEAIQhBAiALdCIDQQAgA2tyIAdxIgNFDQMgA0EAIANrcUF/aiIDIANBDHZBEHEiA3YiBUEFdkEIcSIAIANyIAUgAHYiA0ECdkEEcSIFciADIAV2IgNBAXZBAnEiBXIgAyAFdiIDQQF2QQFxIgVyIAMgBXZqQQJ0Qdi1gIAAaigCACEDCyADRQ0BCwNAIAMoAgRBeHEgAmsiBiAESSEAAkAgAygCECIFDQAgA0EUaigCACEFCyAGIAQgABshBCADIAggABshCCAFIQMgBQ0ACwsgCEUNACAEQQAoArCzgIAAIAJrTw0AIAgoAhghCwJAIAgoAgwiACAIRg0AQQAoArizgIAAIAgoAggiA0saIAAgAzYCCCADIAA2AgwMCQsCQCAIQRRqIgUoAgAiAw0AIAgoAhAiA0UNAyAIQRBqIQULA0AgBSEGIAMiAEEUaiIFKAIAIgMNACAAQRBqIQUgACgCECIDDQALIAZBADYCAAwICwJAQQAoArCzgIAAIgMgAkkNAEEAKAK8s4CAACEEAkACQCADIAJrIgVBEEkNACAEIAJqIgAgBUEBcjYCBEEAIAU2ArCzgIAAQQAgADYCvLOAgAAgBCADaiAFNgIAIAQgAkEDcjYCBAwBCyAEIANBA3I2AgQgAyAEakEEaiIDIAMoAgBBAXI2AgBBAEEANgK8s4CAAEEAQQA2ArCzgIAACyAEQQhqIQMMCgsCQEEAKAK0s4CAACIAIAJNDQBBACgCwLOAgAAiAyACaiIEIAAgAmsiBUEBcjYCBEEAIAU2ArSzgIAAQQAgBDYCwLOAgAAgAyACQQNyNgIEIANBCGohAwwKCwJAAkBBACgCgLeAgABFDQBBACgCiLeAgAAhBAwBC0EAQn83Aoy3gIAAQQBCgICEgICAwAA3AoS3gIAAQQAgAUEMakFwcUHYqtWqBXM2AoC3gIAAQQBBADYClLeAgABBAEEANgLktoCAAEGAgAQhBAtBACEDAkAgBCACQccAaiIHaiIGQQAgBGsiC3EiCCACSw0AQQBBMDYCmLeAgAAMCgsCQEEAKALgtoCAACIDRQ0AAkBBACgC2LaAgAAiBCAIaiIFIARNDQAgBSADTQ0BC0EAIQNBAEEwNgKYt4CAAAwKC0EALQDktoCAAEEEcQ0EAkACQAJAQQAoAsCzgIAAIgRFDQBB6LaAgAAhAwNAAkAgAygCACIFIARLDQAgBSADKAIEaiAESw0DCyADKAIIIgMNAAsLQQAQvoCAgAAiAEF/Rg0FIAghBgJAQQAoAoS3gIAAIgNBf2oiBCAAcUUNACAIIABrIAQgAGpBACADa3FqIQYLIAYgAk0NBSAGQf7///8HSw0FAkBBACgC4LaAgAAiA0UNAEEAKALYtoCAACIEIAZqIgUgBE0NBiAFIANLDQYLIAYQvoCAgAAiAyAARw0BDAcLIAYgAGsgC3EiBkH+////B0sNBCAGEL6AgIAAIgAgAygCACADKAIEakYNAyAAIQMLAkAgA0F/Rg0AIAJByABqIAZNDQACQCAHIAZrQQAoAoi3gIAAIgRqQQAgBGtxIgRB/v///wdNDQAgAyEADAcLAkAgBBC+gICAAEF/Rg0AIAQgBmohBiADIQAMBwtBACAGaxC+gICAABoMBAsgAyEAIANBf0cNBQwDC0EAIQgMBwtBACEADAULIABBf0cNAgtBAEEAKALktoCAAEEEcjYC5LaAgAALIAhB/v///wdLDQEgCBC+gICAACEAQQAQvoCAgAAhAyAAQX9GDQEgA0F/Rg0BIAAgA08NASADIABrIgYgAkE4ak0NAQtBAEEAKALYtoCAACAGaiIDNgLYtoCAAAJAIANBACgC3LaAgABNDQBBACADNgLctoCAAAsCQAJAAkACQEEAKALAs4CAACIERQ0AQei2gIAAIQMDQCAAIAMoAgAiBSADKAIEIghqRg0CIAMoAggiAw0ADAMLCwJAAkBBACgCuLOAgAAiA0UNACAAIANPDQELQQAgADYCuLOAgAALQQAhA0EAIAY2Auy2gIAAQQAgADYC6LaAgABBAEF/NgLIs4CAAEEAQQAoAoC3gIAANgLMs4CAAEEAQQA2AvS2gIAAA0AgA0Hks4CAAGogA0HYs4CAAGoiBDYCACAEIANB0LOAgABqIgU2AgAgA0Hcs4CAAGogBTYCACADQeyzgIAAaiADQeCzgIAAaiIFNgIAIAUgBDYCACADQfSzgIAAaiADQeizgIAAaiIENgIAIAQgBTYCACADQfCzgIAAaiAENgIAIANBIGoiA0GAAkcNAAsgAEF4IABrQQ9xQQAgAEEIakEPcRsiA2oiBCAGIANrQUhqIgNBAXI2AgRBAEEAKAKQt4CAADYCxLOAgABBACAENgLAs4CAAEEAIAM2ArSzgIAAIAYgAGpBTGpBODYCAAwCCyADLQAMQQhxDQAgBSAESw0AIAAgBE0NACAEQXggBGtBD3FBACAEQQhqQQ9xGyIFaiIAQQAoArSzgIAAIAZqIgsgBWsiBUEBcjYCBCADIAggBmo2AgRBAEEAKAKQt4CAADYCxLOAgABBACAFNgK0s4CAAEEAIAA2AsCzgIAAIAsgBGpBBGpBODYCAAwBCwJAIABBACgCuLOAgAAiC08NAEEAIAA2ArizgIAAIAAhCwsgACAGaiEIQei2gIAAIQMCQAJAAkACQAJAAkACQANAIAMoAgAgCEYNASADKAIIIgMNAAwCCwsgAy0ADEEIcUUNAQtB6LaAgAAhAwNAAkAgAygCACIFIARLDQAgBSADKAIEaiIFIARLDQMLIAMoAgghAwwACwsgAyAANgIAIAMgAygCBCAGajYCBCAAQXggAGtBD3FBACAAQQhqQQ9xG2oiBiACQQNyNgIEIAhBeCAIa0EPcUEAIAhBCGpBD3EbaiIIIAYgAmoiAmshBQJAIAQgCEcNAEEAIAI2AsCzgIAAQQBBACgCtLOAgAAgBWoiAzYCtLOAgAAgAiADQQFyNgIEDAMLAkBBACgCvLOAgAAgCEcNAEEAIAI2AryzgIAAQQBBACgCsLOAgAAgBWoiAzYCsLOAgAAgAiADQQFyNgIEIAIgA2ogAzYCAAwDCwJAIAgoAgQiA0EDcUEBRw0AIANBeHEhBwJAAkAgA0H/AUsNACAIKAIIIgQgA0EDdiILQQN0QdCzgIAAaiIARhoCQCAIKAIMIgMgBEcNAEEAQQAoAqizgIAAQX4gC3dxNgKos4CAAAwCCyADIABGGiADIAQ2AgggBCADNgIMDAELIAgoAhghCQJAAkAgCCgCDCIAIAhGDQAgCyAIKAIIIgNLGiAAIAM2AgggAyAANgIMDAELAkAgCEEUaiIDKAIAIgQNACAIQRBqIgMoAgAiBA0AQQAhAAwBCwNAIAMhCyAEIgBBFGoiAygCACIEDQAgAEEQaiEDIAAoAhAiBA0ACyALQQA2AgALIAlFDQACQAJAIAgoAhwiBEECdEHYtYCAAGoiAygCACAIRw0AIAMgADYCACAADQFBAEEAKAKss4CAAEF+IAR3cTYCrLOAgAAMAgsgCUEQQRQgCSgCECAIRhtqIAA2AgAgAEUNAQsgACAJNgIYAkAgCCgCECIDRQ0AIAAgAzYCECADIAA2AhgLIAgoAhQiA0UNACAAQRRqIAM2AgAgAyAANgIYCyAHIAVqIQUgCCAHaiEICyAIIAgoAgRBfnE2AgQgAiAFaiAFNgIAIAIgBUEBcjYCBAJAIAVB/wFLDQAgBUEDdiIEQQN0QdCzgIAAaiEDAkACQEEAKAKos4CAACIFQQEgBHQiBHENAEEAIAUgBHI2AqizgIAAIAMhBAwBCyADKAIIIQQLIAQgAjYCDCADIAI2AgggAiADNgIMIAIgBDYCCAwDC0EfIQMCQCAFQf///wdLDQAgBUEIdiIDIANBgP4/akEQdkEIcSIDdCIEIARBgOAfakEQdkEEcSIEdCIAIABBgIAPakEQdkECcSIAdEEPdiADIARyIAByayIDQQF0IAUgA0EVanZBAXFyQRxqIQMLIAIgAzYCHCACQgA3AhAgA0ECdEHYtYCAAGohBAJAQQAoAqyzgIAAIgBBASADdCIIcQ0AIAQgAjYCAEEAIAAgCHI2AqyzgIAAIAIgBDYCGCACIAI2AgggAiACNgIMDAMLIAVBAEEZIANBAXZrIANBH0YbdCEDIAQoAgAhAANAIAAiBCgCBEF4cSAFRg0CIANBHXYhACADQQF0IQMgBCAAQQRxakEQaiIIKAIAIgANAAsgCCACNgIAIAIgBDYCGCACIAI2AgwgAiACNgIIDAILIABBeCAAa0EPcUEAIABBCGpBD3EbIgNqIgsgBiADa0FIaiIDQQFyNgIEIAhBTGpBODYCACAEIAVBNyAFa0EPcUEAIAVBSWpBD3EbakFBaiIIIAggBEEQakkbIghBIzYCBEEAQQAoApC3gIAANgLEs4CAAEEAIAs2AsCzgIAAQQAgAzYCtLOAgAAgCEEQakEAKQLwtoCAADcCACAIQQApAui2gIAANwIIQQAgCEEIajYC8LaAgABBACAGNgLstoCAAEEAIAA2Aui2gIAAQQBBADYC9LaAgAAgCEEkaiEDA0AgA0EHNgIAIAUgA0EEaiIDSw0ACyAIIARGDQMgCCAIKAIEQX5xNgIEIAggCCAEayIGNgIAIAQgBkEBcjYCBAJAIAZB/wFLDQAgBkEDdiIFQQN0QdCzgIAAaiEDAkACQEEAKAKos4CAACIAQQEgBXQiBXENAEEAIAAgBXI2AqizgIAAIAMhBQwBCyADKAIIIQULIAUgBDYCDCADIAQ2AgggBCADNgIMIAQgBTYCCAwEC0EfIQMCQCAGQf///wdLDQAgBkEIdiIDIANBgP4/akEQdkEIcSIDdCIFIAVBgOAfakEQdkEEcSIFdCIAIABBgIAPakEQdkECcSIAdEEPdiADIAVyIAByayIDQQF0IAYgA0EVanZBAXFyQRxqIQMLIARCADcCECAEQRxqIAM2AgAgA0ECdEHYtYCAAGohBQJAQQAoAqyzgIAAIgBBASADdCIIcQ0AIAUgBDYCAEEAIAAgCHI2AqyzgIAAIARBGGogBTYCACAEIAQ2AgggBCAENgIMDAQLIAZBAEEZIANBAXZrIANBH0YbdCEDIAUoAgAhAANAIAAiBSgCBEF4cSAGRg0DIANBHXYhACADQQF0IQMgBSAAQQRxakEQaiIIKAIAIgANAAsgCCAENgIAIARBGGogBTYCACAEIAQ2AgwgBCAENgIIDAMLIAQoAggiAyACNgIMIAQgAjYCCCACQQA2AhggAiAENgIMIAIgAzYCCAsgBkEIaiEDDAULIAUoAggiAyAENgIMIAUgBDYCCCAEQRhqQQA2AgAgBCAFNgIMIAQgAzYCCAtBACgCtLOAgAAiAyACTQ0AQQAoAsCzgIAAIgQgAmoiBSADIAJrIgNBAXI2AgRBACADNgK0s4CAAEEAIAU2AsCzgIAAIAQgAkEDcjYCBCAEQQhqIQMMAwtBACEDQQBBMDYCmLeAgAAMAgsCQCALRQ0AAkACQCAIIAgoAhwiBUECdEHYtYCAAGoiAygCAEcNACADIAA2AgAgAA0BQQAgB0F+IAV3cSIHNgKss4CAAAwCCyALQRBBFCALKAIQIAhGG2ogADYCACAARQ0BCyAAIAs2AhgCQCAIKAIQIgNFDQAgACADNgIQIAMgADYCGAsgCEEUaigCACIDRQ0AIABBFGogAzYCACADIAA2AhgLAkACQCAEQQ9LDQAgCCAEIAJqIgNBA3I2AgQgAyAIakEEaiIDIAMoAgBBAXI2AgAMAQsgCCACaiIAIARBAXI2AgQgCCACQQNyNgIEIAAgBGogBDYCAAJAIARB/wFLDQAgBEEDdiIEQQN0QdCzgIAAaiEDAkACQEEAKAKos4CAACIFQQEgBHQiBHENAEEAIAUgBHI2AqizgIAAIAMhBAwBCyADKAIIIQQLIAQgADYCDCADIAA2AgggACADNgIMIAAgBDYCCAwBC0EfIQMCQCAEQf///wdLDQAgBEEIdiIDIANBgP4/akEQdkEIcSIDdCIFIAVBgOAfakEQdkEEcSIFdCICIAJBgIAPakEQdkECcSICdEEPdiADIAVyIAJyayIDQQF0IAQgA0EVanZBAXFyQRxqIQMLIAAgAzYCHCAAQgA3AhAgA0ECdEHYtYCAAGohBQJAIAdBASADdCICcQ0AIAUgADYCAEEAIAcgAnI2AqyzgIAAIAAgBTYCGCAAIAA2AgggACAANgIMDAELIARBAEEZIANBAXZrIANBH0YbdCEDIAUoAgAhAgJAA0AgAiIFKAIEQXhxIARGDQEgA0EddiECIANBAXQhAyAFIAJBBHFqQRBqIgYoAgAiAg0ACyAGIAA2AgAgACAFNgIYIAAgADYCDCAAIAA2AggMAQsgBSgCCCIDIAA2AgwgBSAANgIIIABBADYCGCAAIAU2AgwgACADNgIICyAIQQhqIQMMAQsCQCAKRQ0AAkACQCAAIAAoAhwiBUECdEHYtYCAAGoiAygCAEcNACADIAg2AgAgCA0BQQAgCUF+IAV3cTYCrLOAgAAMAgsgCkEQQRQgCigCECAARhtqIAg2AgAgCEUNAQsgCCAKNgIYAkAgACgCECIDRQ0AIAggAzYCECADIAg2AhgLIABBFGooAgAiA0UNACAIQRRqIAM2AgAgAyAINgIYCwJAAkAgBEEPSw0AIAAgBCACaiIDQQNyNgIEIAMgAGpBBGoiAyADKAIAQQFyNgIADAELIAAgAmoiBSAEQQFyNgIEIAAgAkEDcjYCBCAFIARqIAQ2AgACQCAHRQ0AIAdBA3YiCEEDdEHQs4CAAGohAkEAKAK8s4CAACEDAkACQEEBIAh0IgggBnENAEEAIAggBnI2AqizgIAAIAIhCAwBCyACKAIIIQgLIAggAzYCDCACIAM2AgggAyACNgIMIAMgCDYCCAtBACAFNgK8s4CAAEEAIAQ2ArCzgIAACyAAQQhqIQMLIAFBEGokgICAgAAgAwsKACAAEL2AgIAAC/ANAQd/AkAgAEUNACAAQXhqIgEgAEF8aigCACICQXhxIgBqIQMCQCACQQFxDQAgAkEDcUUNASABIAEoAgAiAmsiAUEAKAK4s4CAACIESQ0BIAIgAGohAAJAQQAoAryzgIAAIAFGDQACQCACQf8BSw0AIAEoAggiBCACQQN2IgVBA3RB0LOAgABqIgZGGgJAIAEoAgwiAiAERw0AQQBBACgCqLOAgABBfiAFd3E2AqizgIAADAMLIAIgBkYaIAIgBDYCCCAEIAI2AgwMAgsgASgCGCEHAkACQCABKAIMIgYgAUYNACAEIAEoAggiAksaIAYgAjYCCCACIAY2AgwMAQsCQCABQRRqIgIoAgAiBA0AIAFBEGoiAigCACIEDQBBACEGDAELA0AgAiEFIAQiBkEUaiICKAIAIgQNACAGQRBqIQIgBigCECIEDQALIAVBADYCAAsgB0UNAQJAAkAgASgCHCIEQQJ0Qdi1gIAAaiICKAIAIAFHDQAgAiAGNgIAIAYNAUEAQQAoAqyzgIAAQX4gBHdxNgKss4CAAAwDCyAHQRBBFCAHKAIQIAFGG2ogBjYCACAGRQ0CCyAGIAc2AhgCQCABKAIQIgJFDQAgBiACNgIQIAIgBjYCGAsgASgCFCICRQ0BIAZBFGogAjYCACACIAY2AhgMAQsgAygCBCICQQNxQQNHDQAgAyACQX5xNgIEQQAgADYCsLOAgAAgASAAaiAANgIAIAEgAEEBcjYCBA8LIAMgAU0NACADKAIEIgJBAXFFDQACQAJAIAJBAnENAAJAQQAoAsCzgIAAIANHDQBBACABNgLAs4CAAEEAQQAoArSzgIAAIABqIgA2ArSzgIAAIAEgAEEBcjYCBCABQQAoAryzgIAARw0DQQBBADYCsLOAgABBAEEANgK8s4CAAA8LAkBBACgCvLOAgAAgA0cNAEEAIAE2AryzgIAAQQBBACgCsLOAgAAgAGoiADYCsLOAgAAgASAAQQFyNgIEIAEgAGogADYCAA8LIAJBeHEgAGohAAJAAkAgAkH/AUsNACADKAIIIgQgAkEDdiIFQQN0QdCzgIAAaiIGRhoCQCADKAIMIgIgBEcNAEEAQQAoAqizgIAAQX4gBXdxNgKos4CAAAwCCyACIAZGGiACIAQ2AgggBCACNgIMDAELIAMoAhghBwJAAkAgAygCDCIGIANGDQBBACgCuLOAgAAgAygCCCICSxogBiACNgIIIAIgBjYCDAwBCwJAIANBFGoiAigCACIEDQAgA0EQaiICKAIAIgQNAEEAIQYMAQsDQCACIQUgBCIGQRRqIgIoAgAiBA0AIAZBEGohAiAGKAIQIgQNAAsgBUEANgIACyAHRQ0AAkACQCADKAIcIgRBAnRB2LWAgABqIgIoAgAgA0cNACACIAY2AgAgBg0BQQBBACgCrLOAgABBfiAEd3E2AqyzgIAADAILIAdBEEEUIAcoAhAgA0YbaiAGNgIAIAZFDQELIAYgBzYCGAJAIAMoAhAiAkUNACAGIAI2AhAgAiAGNgIYCyADKAIUIgJFDQAgBkEUaiACNgIAIAIgBjYCGAsgASAAaiAANgIAIAEgAEEBcjYCBCABQQAoAryzgIAARw0BQQAgADYCsLOAgAAPCyADIAJBfnE2AgQgASAAaiAANgIAIAEgAEEBcjYCBAsCQCAAQf8BSw0AIABBA3YiAkEDdEHQs4CAAGohAAJAAkBBACgCqLOAgAAiBEEBIAJ0IgJxDQBBACAEIAJyNgKos4CAACAAIQIMAQsgACgCCCECCyACIAE2AgwgACABNgIIIAEgADYCDCABIAI2AggPC0EfIQICQCAAQf///wdLDQAgAEEIdiICIAJBgP4/akEQdkEIcSICdCIEIARBgOAfakEQdkEEcSIEdCIGIAZBgIAPakEQdkECcSIGdEEPdiACIARyIAZyayICQQF0IAAgAkEVanZBAXFyQRxqIQILIAFCADcCECABQRxqIAI2AgAgAkECdEHYtYCAAGohBAJAAkBBACgCrLOAgAAiBkEBIAJ0IgNxDQAgBCABNgIAQQAgBiADcjYCrLOAgAAgAUEYaiAENgIAIAEgATYCCCABIAE2AgwMAQsgAEEAQRkgAkEBdmsgAkEfRht0IQIgBCgCACEGAkADQCAGIgQoAgRBeHEgAEYNASACQR12IQYgAkEBdCECIAQgBkEEcWpBEGoiAygCACIGDQALIAMgATYCACABQRhqIAQ2AgAgASABNgIMIAEgATYCCAwBCyAEKAIIIgAgATYCDCAEIAE2AgggAUEYakEANgIAIAEgBDYCDCABIAA2AggLQQBBACgCyLOAgABBf2oiAUF/IAEbNgLIs4CAAAsLTgACQCAADQA/AEEQdA8LAkAgAEH//wNxDQAgAEF/TA0AAkAgAEEQdkAAIgBBf0cNAEEAQTA2Api3gIAAQX8PCyAAQRB0DwsQv4CAgAAACwQAAAALC64rAQBBgAgLpisBAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEludmFsaWQgY2hhciBpbiB1cmwgcXVlcnkAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9ib2R5AENvbnRlbnQtTGVuZ3RoIG92ZXJmbG93AENodW5rIHNpemUgb3ZlcmZsb3cAUmVzcG9uc2Ugb3ZlcmZsb3cASW52YWxpZCBtZXRob2QgZm9yIEhUVFAveC54IHJlcXVlc3QASW52YWxpZCBtZXRob2QgZm9yIFJUU1AveC54IHJlcXVlc3QARXhwZWN0ZWQgU09VUkNFIG1ldGhvZCBmb3IgSUNFL3gueCByZXF1ZXN0AEludmFsaWQgY2hhciBpbiB1cmwgZnJhZ21lbnQgc3RhcnQARXhwZWN0ZWQgZG90AFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fc3RhdHVzAEludmFsaWQgcmVzcG9uc2Ugc3RhdHVzAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHBhcmFtZXRlcnMAVXNlciBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfaGVhZGVyYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9iZWdpbmAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzZXJ2ZXIASW52YWxpZCBoZWFkZXIgdmFsdWUgY2hhcgBJbnZhbGlkIGhlYWRlciBmaWVsZCBjaGFyAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVyIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAE1LQUNUSVZJVFkAQ09QWQBOT1RJRlkAUExBWQBQVVQAQ0hFQ0tPVVQAUE9TVABSRVBPUlQASFBFX0lOVkFMSURfQ09OU1RBTlQAR0VUAEhQRV9TVFJJQ1QAUkVESVJFQ1QAQ09OTkVDVABIUEVfSU5WQUxJRF9TVEFUVVMAT1BUSU9OUwBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIASFBFX0NCX0NIVU5LX0hFQURFUgBNS0NBTEVOREFSAFNFVFVQAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIUEVfSU5WQUxJRF9WRVJTSU9OAEhQRV9DQl9NRVNTQUdFX0JFR0lOAEhQRV9JTlZBTElEX0hFQURFUl9UT0tFTgBIUEVfSU5WQUxJRF9VUkwATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBERUxFVEUASFBFX0lOVkFMSURfRU9GX1NUQVRFAFBBVVNFAFBVUkdFAE1FUkdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QAUFJPUEZJTkQAVU5CSU5EAFJFQklORABIUEVfTEZfRVhQRUNURUQASFBFX1BBVVNFRABIRUFEAEV4cGVjdGVkIEhUVFAvAIwLAAB/CwAAgwoAADkNAADACwAADQsAAA8NAABlCwAAagoAACMLAABMCwAApQsAACMMAACfCgAAjAwAAPcLAAA3CwAAPwwAAG0MAADfCgAAVwwAAEkNAAC0DAAAxwwAANYKAACFDAAAfwoAAFQNAABeCgAAUQoAAJcKAACyCgAA7QwAAEAKAACcCwAAdQsAADoMAAAiDQAA5AsAAPALAACaCwAANA0AADINAAArDQAAewsAAGMKAAA1CgAAVQoAAK4MAADuCwAARQoAAP4MAAD8DAAA6AsAAKgMAADzCgAAlQsAAJMLAADdDAAAoQsAAPMMAADkDAAA/goAAEwKAACiDAAABAsAAMgKAAC6CgAAjgoAAAgNAADeCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWxvc2VlZXAtYWxpdmUAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWNodW5rZWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAAABAQABAQABAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZWN0aW9uZW50LWxlbmd0aG9ucm94eS1jb25uZWN0aW9uAAAAAAAAAAAAAAAAAAAAcmFuc2Zlci1lbmNvZGluZ3BncmFkZQ0KDQoNClNNDQoNClRUUC9DRS9UU1AvAAAAAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAEAAAIAAAAAAAAAAAAAAAAAAAAAAAADBAAABAQEBAQEBAQEBAQFBAQEBAQEBAQEBAQEAAQABgcEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAACAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATk9VTkNFRUNLT1VUTkVDVEVURUNSSUJFTFVTSEVURUFEU0VBUkNIUkdFQ1RJVklUWUxFTkRBUlZFT1RJRllQVElPTlNDSFNFQVlTVEFUQ0hHRU9SRElSRUNUT1JUUkNIUEFSQU1FVEVSVVJDRUJTQ1JJQkVBUkRPV05BQ0VJTkROS0NLVUJTQ1JJQkVIVFRQL0FEVFAv";
var assert$7 = import_assert.default;
var net = import_net.default;
var util$b = util$h;
var Request$3 = request$2;
var DispatcherBase$2 = dispatcherBase;
var RedirectHandler$1 = redirect;
var {
  RequestContentLengthMismatchError,
  ResponseContentLengthMismatchError,
  InvalidArgumentError: InvalidArgumentError$9,
  RequestAbortedError: RequestAbortedError$7,
  HeadersTimeoutError,
  HeadersOverflowError,
  SocketError: SocketError$2,
  InformationalError,
  BodyTimeoutError,
  HTTPParserError
} = errors$1;
var buildConnector$1 = connect$2;
var {
  kUrl: kUrl$2,
  kReset,
  kServerName,
  kClient,
  kBusy: kBusy$1,
  kParser,
  kConnect,
  kBlocking,
  kResuming,
  kRunning: kRunning$3,
  kPending: kPending$2,
  kSize: kSize$4,
  kWriting,
  kQueue: kQueue$1,
  kConnected: kConnected$3,
  kConnecting,
  kNeedDrain: kNeedDrain$2,
  kNoRef,
  kKeepAliveDefaultTimeout,
  kHostHeader,
  kPendingIdx,
  kRunningIdx,
  kError,
  kPipelining,
  kSocket,
  kKeepAliveTimeoutValue,
  kMaxHeadersSize,
  kKeepAliveMaxTimeout,
  kKeepAliveTimeoutThreshold,
  kHeadersTimeout,
  kBodyTimeout,
  kStrictContentLength,
  kConnector,
  kMaxRedirections: kMaxRedirections$1,
  kMaxRequests,
  kCounter,
  kClose: kClose$2,
  kDestroy: kDestroy$2,
  kDispatch: kDispatch$2
} = symbols$1;
var kClosedResolve$1 = Symbol("kClosedResolve");
var channels = {};
try {
  const diagnosticsChannel = require("diagnostics_channel");
  channels.sendHeaders = diagnosticsChannel.channel("undici:client:sendHeaders");
  channels.beforeConnect = diagnosticsChannel.channel("undici:client:beforeConnect");
  channels.connectError = diagnosticsChannel.channel("undici:client:connectError");
  channels.connected = diagnosticsChannel.channel("undici:client:connected");
} catch {
  channels.sendHeaders = { hasSubscribers: false };
  channels.beforeConnect = { hasSubscribers: false };
  channels.connectError = { hasSubscribers: false };
  channels.connected = { hasSubscribers: false };
}
var Client$2 = class extends DispatcherBase$2 {
  constructor(url, {
    maxHeaderSize,
    headersTimeout,
    socketTimeout,
    requestTimeout,
    connectTimeout,
    bodyTimeout,
    idleTimeout,
    keepAlive,
    keepAliveTimeout,
    maxKeepAliveTimeout,
    keepAliveMaxTimeout,
    keepAliveTimeoutThreshold,
    socketPath,
    pipelining,
    tls: tls2,
    strictContentLength,
    maxCachedSessions,
    maxRedirections,
    connect: connect2,
    maxRequestsPerClient
  } = {}) {
    super();
    if (keepAlive !== void 0) {
      throw new InvalidArgumentError$9("unsupported keepAlive, use pipelining=0 instead");
    }
    if (socketTimeout !== void 0) {
      throw new InvalidArgumentError$9("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
    }
    if (requestTimeout !== void 0) {
      throw new InvalidArgumentError$9("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
    }
    if (idleTimeout !== void 0) {
      throw new InvalidArgumentError$9("unsupported idleTimeout, use keepAliveTimeout instead");
    }
    if (maxKeepAliveTimeout !== void 0) {
      throw new InvalidArgumentError$9("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
    }
    if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
      throw new InvalidArgumentError$9("invalid maxHeaderSize");
    }
    if (socketPath != null && typeof socketPath !== "string") {
      throw new InvalidArgumentError$9("invalid socketPath");
    }
    if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
      throw new InvalidArgumentError$9("invalid connectTimeout");
    }
    if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
      throw new InvalidArgumentError$9("invalid keepAliveTimeout");
    }
    if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
      throw new InvalidArgumentError$9("invalid keepAliveMaxTimeout");
    }
    if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
      throw new InvalidArgumentError$9("invalid keepAliveTimeoutThreshold");
    }
    if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$9("headersTimeout must be a positive integer or zero");
    }
    if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$9("bodyTimeout must be a positive integer or zero");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$9("connect must be a function or an object");
    }
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$9("maxRedirections must be a positive number");
    }
    if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
      throw new InvalidArgumentError$9("maxRequestsPerClient must be a positive number");
    }
    if (typeof connect2 !== "function") {
      connect2 = buildConnector$1({
        ...tls2,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout,
        ...connect2
      });
    }
    this[kUrl$2] = util$b.parseOrigin(url);
    this[kConnector] = connect2;
    this[kSocket] = null;
    this[kPipelining] = pipelining != null ? pipelining : 1;
    this[kMaxHeadersSize] = maxHeaderSize || 16384;
    this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
    this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 6e5 : keepAliveMaxTimeout;
    this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 1e3 : keepAliveTimeoutThreshold;
    this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
    this[kServerName] = null;
    this[kResuming] = 0;
    this[kNeedDrain$2] = 0;
    this[kHostHeader] = `host: ${this[kUrl$2].hostname}${this[kUrl$2].port ? `:${this[kUrl$2].port}` : ""}\r
`;
    this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 3e4;
    this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 3e4;
    this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
    this[kMaxRedirections$1] = maxRedirections;
    this[kMaxRequests] = maxRequestsPerClient;
    this[kClosedResolve$1] = null;
    this[kQueue$1] = [];
    this[kRunningIdx] = 0;
    this[kPendingIdx] = 0;
  }
  get pipelining() {
    return this[kPipelining];
  }
  set pipelining(value) {
    this[kPipelining] = value;
    resume(this, true);
  }
  get [kPending$2]() {
    return this[kQueue$1].length - this[kPendingIdx];
  }
  get [kRunning$3]() {
    return this[kPendingIdx] - this[kRunningIdx];
  }
  get [kSize$4]() {
    return this[kQueue$1].length - this[kRunningIdx];
  }
  get [kConnected$3]() {
    return !!this[kSocket] && !this[kConnecting] && !this[kSocket].destroyed;
  }
  get [kBusy$1]() {
    const socket = this[kSocket];
    return socket && (socket[kReset] || socket[kWriting] || socket[kBlocking]) || this[kSize$4] >= (this[kPipelining] || 1) || this[kPending$2] > 0;
  }
  [kConnect](cb) {
    connect$1(this);
    this.once("connect", cb);
  }
  [kDispatch$2](opts, handler) {
    const { maxRedirections = this[kMaxRedirections$1] } = opts;
    if (maxRedirections) {
      handler = new RedirectHandler$1(this, maxRedirections, opts, handler);
    }
    const origin = opts.origin || this[kUrl$2].origin;
    const request2 = new Request$3(origin, opts, handler);
    this[kQueue$1].push(request2);
    if (this[kResuming])
      ;
    else if (util$b.bodyLength(request2.body) == null && util$b.isIterable(request2.body)) {
      this[kResuming] = 1;
      process.nextTick(resume, this);
    } else {
      resume(this, true);
    }
    if (this[kResuming] && this[kNeedDrain$2] !== 2 && this[kBusy$1]) {
      this[kNeedDrain$2] = 2;
    }
    return this[kNeedDrain$2] < 2;
  }
  async [kClose$2]() {
    return new Promise((resolve2) => {
      if (!this[kSize$4]) {
        this.destroy(resolve2);
      } else {
        this[kClosedResolve$1] = resolve2;
      }
    });
  }
  async [kDestroy$2](err) {
    return new Promise((resolve2) => {
      const requests = this[kQueue$1].splice(this[kPendingIdx]);
      for (let i2 = 0; i2 < requests.length; i2++) {
        const request2 = requests[i2];
        errorRequest(this, request2, err);
      }
      const callback = () => {
        if (this[kClosedResolve$1]) {
          this[kClosedResolve$1]();
          this[kClosedResolve$1] = null;
        }
        resolve2();
      };
      if (!this[kSocket]) {
        queueMicrotask(callback);
      } else {
        util$b.destroy(this[kSocket].on("close", callback), err);
      }
      resume(this);
    });
  }
};
var constants = constants$1;
var EMPTY_BUF = Buffer.alloc(0);
async function lazyllhttp() {
  const llhttpWasmData = process.env.JEST_WORKER_ID ? llhttp_wasm : void 0;
  let mod;
  try {
    mod = await WebAssembly.compile(Buffer.from(require("./llhttp/llhttp_simd.wasm.js"), "base64"));
  } catch (e2) {
    mod = await WebAssembly.compile(Buffer.from(llhttpWasmData || llhttp_wasm, "base64"));
  }
  return await WebAssembly.instantiate(mod, {
    env: {
      wasm_on_url: (p, at, len) => {
        return 0;
      },
      wasm_on_status: (p, at, len) => {
        assert$7.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onStatus(currentBufferRef.slice(start, end)) || 0;
      },
      wasm_on_message_begin: (p) => {
        assert$7.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageBegin() || 0;
      },
      wasm_on_header_field: (p, at, len) => {
        assert$7.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onHeaderField(currentBufferRef.slice(start, end)) || 0;
      },
      wasm_on_header_value: (p, at, len) => {
        assert$7.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onHeaderValue(currentBufferRef.slice(start, end)) || 0;
      },
      wasm_on_headers_complete: (p, statusCode, upgrade2, shouldKeepAlive) => {
        assert$7.strictEqual(currentParser.ptr, p);
        return currentParser.onHeadersComplete(statusCode, Boolean(upgrade2), Boolean(shouldKeepAlive)) || 0;
      },
      wasm_on_body: (p, at, len) => {
        assert$7.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onBody(currentBufferRef.slice(start, end)) || 0;
      },
      wasm_on_message_complete: (p) => {
        assert$7.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageComplete() || 0;
      }
    }
  });
}
var llhttpInstance = null;
var llhttpPromise = lazyllhttp().catch(() => {
});
var currentParser = null;
var currentBufferRef = null;
var currentBufferSize = 0;
var currentBufferPtr = null;
var TIMEOUT_HEADERS = 1;
var TIMEOUT_BODY = 2;
var TIMEOUT_IDLE = 3;
var Parser = class {
  constructor(client2, socket, { exports }) {
    assert$7(Number.isFinite(client2[kMaxHeadersSize]) && client2[kMaxHeadersSize] > 0);
    this.llhttp = exports;
    this.ptr = this.llhttp.llhttp_alloc(constants.TYPE.RESPONSE);
    this.client = client2;
    this.socket = socket;
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.statusCode = null;
    this.statusText = "";
    this.upgrade = false;
    this.headers = [];
    this.headersSize = 0;
    this.headersMaxSize = client2[kMaxHeadersSize];
    this.shouldKeepAlive = false;
    this.paused = false;
    this.resume = this.resume.bind(this);
    this.bytesRead = 0;
    this.keepAlive = "";
    this.contentLength = "";
  }
  setTimeout(value, type) {
    this.timeoutType = type;
    if (value !== this.timeoutValue) {
      clearTimeout(this.timeout);
      if (value) {
        this.timeout = setTimeout(onParserTimeout, value, this);
        if (this.timeout.unref) {
          this.timeout.unref();
        }
      } else {
        this.timeout = null;
      }
      this.timeoutValue = value;
    } else if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
  }
  resume() {
    if (this.socket.destroyed || !this.paused) {
      return;
    }
    assert$7(this.ptr != null);
    assert$7(currentParser == null);
    this.llhttp.llhttp_resume(this.ptr);
    assert$7(this.timeoutType === TIMEOUT_BODY);
    if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    this.paused = false;
    this.execute(this.socket.read() || EMPTY_BUF);
    this.readMore();
  }
  readMore() {
    while (!this.paused && this.ptr) {
      const chunk = this.socket.read();
      if (chunk === null) {
        break;
      }
      this.execute(chunk);
    }
  }
  execute(data) {
    assert$7(this.ptr != null);
    assert$7(currentParser == null);
    assert$7(!this.paused);
    const { socket, llhttp } = this;
    if (data.length > currentBufferSize) {
      if (currentBufferPtr) {
        llhttp.free(currentBufferPtr);
      }
      currentBufferSize = Math.ceil(data.length / 4096) * 4096;
      currentBufferPtr = llhttp.malloc(currentBufferSize);
    }
    new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data);
    try {
      let ret;
      try {
        currentBufferRef = data;
        currentParser = this;
        ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length);
      } catch (err) {
        throw err;
      } finally {
        currentParser = null;
        currentBufferRef = null;
      }
      const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr;
      if (ret === constants.ERROR.PAUSED_UPGRADE) {
        this.onUpgrade(data.slice(offset));
      } else if (ret === constants.ERROR.PAUSED) {
        this.paused = true;
        socket.unshift(data.slice(offset));
      } else if (ret !== constants.ERROR.OK) {
        const ptr = llhttp.llhttp_get_error_reason(this.ptr);
        let message = "";
        if (ptr) {
          const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
          message = Buffer.from(llhttp.memory.buffer, ptr, len).toString();
        }
        throw new HTTPParserError(message, constants.ERROR[ret], data.slice(offset));
      }
    } catch (err) {
      util$b.destroy(socket, err);
    }
  }
  finish() {
    try {
      try {
        currentParser = this;
      } finally {
        currentParser = null;
      }
    } catch (err) {
      util$b.destroy(this.socket, err);
    }
  }
  destroy() {
    assert$7(this.ptr != null);
    assert$7(currentParser == null);
    this.llhttp.llhttp_free(this.ptr);
    this.ptr = null;
    clearTimeout(this.timeout);
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.paused = false;
  }
  onStatus(buf) {
    this.statusText = buf.toString();
  }
  onMessageBegin() {
    const { socket, client: client2 } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    if (!request2) {
      return -1;
    }
  }
  onHeaderField(buf) {
    const len = this.headers.length;
    if ((len & 1) === 0) {
      this.headers.push(buf);
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }
    this.trackHeader(buf.length);
  }
  onHeaderValue(buf) {
    let len = this.headers.length;
    if ((len & 1) === 1) {
      this.headers.push(buf);
      len += 1;
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }
    const key2 = this.headers[len - 2];
    if (key2.length === 10 && key2.toString().toLowerCase() === "keep-alive") {
      this.keepAlive += buf.toString();
    } else if (key2.length === 14 && key2.toString().toLowerCase() === "content-length") {
      this.contentLength += buf.toString();
    }
    this.trackHeader(buf.length);
  }
  trackHeader(len) {
    this.headersSize += len;
    if (this.headersSize >= this.headersMaxSize) {
      util$b.destroy(this.socket, new HeadersOverflowError());
    }
  }
  onUpgrade(head) {
    const { upgrade: upgrade2, client: client2, socket, headers: headers2, statusCode } = this;
    assert$7(upgrade2);
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$7(request2);
    assert$7(!socket.destroyed);
    assert$7(socket === client2[kSocket]);
    assert$7(!this.paused);
    assert$7(request2.upgrade || request2.method === "CONNECT");
    this.statusCode = null;
    this.statusText = "";
    this.shouldKeepAlive = null;
    assert$7(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    socket.unshift(head);
    socket[kParser].destroy();
    socket[kParser] = null;
    socket[kClient] = null;
    socket[kError] = null;
    socket.removeListener("error", onSocketError).removeListener("readable", onSocketReadable).removeListener("end", onSocketEnd).removeListener("close", onSocketClose);
    client2[kSocket] = null;
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    client2.emit("disconnect", client2[kUrl$2], [client2], new InformationalError("upgrade"));
    try {
      request2.onUpgrade(statusCode, headers2, socket);
    } catch (err) {
      util$b.destroy(socket, err);
    }
    resume(client2);
  }
  onHeadersComplete(statusCode, upgrade2, shouldKeepAlive) {
    const { client: client2, socket, headers: headers2, statusText } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    if (!request2) {
      return -1;
    }
    assert$7(!this.upgrade);
    assert$7(this.statusCode < 200);
    if (statusCode === 100) {
      util$b.destroy(socket, new SocketError$2("bad response", util$b.getSocketInfo(socket)));
      return -1;
    }
    if (upgrade2 && !request2.upgrade) {
      util$b.destroy(socket, new SocketError$2("bad upgrade", util$b.getSocketInfo(socket)));
      return -1;
    }
    assert$7.strictEqual(this.timeoutType, TIMEOUT_HEADERS);
    this.statusCode = statusCode;
    this.shouldKeepAlive = shouldKeepAlive;
    if (this.statusCode >= 200) {
      const bodyTimeout = request2.bodyTimeout != null ? request2.bodyTimeout : client2[kBodyTimeout];
      this.setTimeout(bodyTimeout, TIMEOUT_BODY);
    } else if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    if (request2.method === "CONNECT" && statusCode >= 200 && statusCode < 300) {
      assert$7(client2[kRunning$3] === 1);
      this.upgrade = true;
      return 2;
    }
    if (upgrade2) {
      assert$7(client2[kRunning$3] === 1);
      this.upgrade = true;
      return 2;
    }
    assert$7(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    if (shouldKeepAlive && client2[kPipelining]) {
      const keepAliveTimeout = this.keepAlive ? util$b.parseKeepAliveTimeout(this.keepAlive) : null;
      if (keepAliveTimeout != null) {
        const timeout = Math.min(keepAliveTimeout - client2[kKeepAliveTimeoutThreshold], client2[kKeepAliveMaxTimeout]);
        if (timeout <= 0) {
          socket[kReset] = true;
        } else {
          client2[kKeepAliveTimeoutValue] = timeout;
        }
      } else {
        client2[kKeepAliveTimeoutValue] = client2[kKeepAliveDefaultTimeout];
      }
    } else {
      socket[kReset] = true;
    }
    let pause;
    try {
      pause = request2.onHeaders(statusCode, headers2, this.resume, statusText) === false;
    } catch (err) {
      util$b.destroy(socket, err);
      return -1;
    }
    if (request2.method === "HEAD") {
      assert$7(socket[kReset]);
      return 1;
    }
    if (statusCode < 200) {
      return 1;
    }
    if (socket[kBlocking]) {
      socket[kBlocking] = false;
      resume(client2);
    }
    return pause ? constants.ERROR.PAUSED : 0;
  }
  onBody(buf) {
    const { client: client2, socket, statusCode } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$7(request2);
    assert$7.strictEqual(this.timeoutType, TIMEOUT_BODY);
    if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    assert$7(statusCode >= 200);
    this.bytesRead += buf.length;
    try {
      if (request2.onData(buf) === false) {
        return constants.ERROR.PAUSED;
      }
    } catch (err) {
      util$b.destroy(socket, err);
      return -1;
    }
  }
  onMessageComplete() {
    const { client: client2, socket, statusCode, upgrade: upgrade2, headers: headers2, contentLength, bytesRead, shouldKeepAlive } = this;
    if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
      return -1;
    }
    if (upgrade2) {
      return;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$7(request2);
    assert$7(statusCode >= 100);
    this.statusCode = null;
    this.statusText = "";
    this.bytesRead = 0;
    this.contentLength = "";
    this.keepAlive = "";
    assert$7(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    if (statusCode < 200) {
      return;
    }
    if (request2.method !== "HEAD" && contentLength && bytesRead !== parseInt(contentLength, 10)) {
      util$b.destroy(socket, new ResponseContentLengthMismatchError());
      return -1;
    }
    try {
      request2.onComplete(headers2);
    } catch (err) {
      errorRequest(client2, request2, err);
    }
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    if (socket[kWriting]) {
      assert$7.strictEqual(client2[kRunning$3], 0);
      util$b.destroy(socket, new InformationalError("reset"));
      return constants.ERROR.PAUSED;
    } else if (!shouldKeepAlive) {
      util$b.destroy(socket, new InformationalError("reset"));
      return constants.ERROR.PAUSED;
    } else if (socket[kReset] && client2[kRunning$3] === 0) {
      util$b.destroy(socket, new InformationalError("reset"));
      return constants.ERROR.PAUSED;
    } else if (client2[kPipelining] === 1) {
      setImmediate(resume, client2);
    } else {
      resume(client2);
    }
  }
};
function onParserTimeout(parser) {
  const { socket, timeoutType, client: client2 } = parser;
  if (timeoutType === TIMEOUT_HEADERS) {
    if (!socket[kWriting]) {
      assert$7(!parser.paused, "cannot be paused while waiting for headers");
      util$b.destroy(socket, new HeadersTimeoutError());
    }
  } else if (timeoutType === TIMEOUT_BODY) {
    if (!parser.paused) {
      util$b.destroy(socket, new BodyTimeoutError());
    }
  } else if (timeoutType === TIMEOUT_IDLE) {
    assert$7(client2[kRunning$3] === 0 && client2[kKeepAliveTimeoutValue]);
    util$b.destroy(socket, new InformationalError("socket idle timeout"));
  }
}
function onSocketReadable() {
  const { [kParser]: parser } = this;
  parser.readMore();
}
function onSocketError(err) {
  const { [kParser]: parser } = this;
  assert$7(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
  if (err.code === "ECONNRESET" && parser.statusCode && !parser.shouldKeepAlive) {
    parser.finish();
    return;
  }
  this[kError] = err;
  onError(this[kClient], err);
}
function onError(client2, err) {
  if (client2[kRunning$3] === 0 && err.code !== "UND_ERR_INFO" && err.code !== "UND_ERR_SOCKET") {
    assert$7(client2[kPendingIdx] === client2[kRunningIdx]);
    const requests = client2[kQueue$1].splice(client2[kRunningIdx]);
    for (let i2 = 0; i2 < requests.length; i2++) {
      const request2 = requests[i2];
      errorRequest(client2, request2, err);
    }
    assert$7(client2[kSize$4] === 0);
  }
}
function onSocketEnd() {
  const { [kParser]: parser } = this;
  if (parser.statusCode && !parser.shouldKeepAlive) {
    parser.finish();
    return;
  }
  util$b.destroy(this, new SocketError$2("other side closed", util$b.getSocketInfo(this)));
}
function onSocketClose() {
  const { [kClient]: client2 } = this;
  this[kParser].destroy();
  this[kParser] = null;
  const err = this[kError] || new SocketError$2("closed", util$b.getSocketInfo(this));
  client2[kSocket] = null;
  if (client2.destroyed) {
    assert$7(client2[kPending$2] === 0);
    const requests = client2[kQueue$1].splice(client2[kRunningIdx]);
    for (let i2 = 0; i2 < requests.length; i2++) {
      const request2 = requests[i2];
      errorRequest(client2, request2, err);
    }
  } else if (client2[kRunning$3] > 0 && err.code !== "UND_ERR_INFO") {
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    errorRequest(client2, request2, err);
  }
  client2[kPendingIdx] = client2[kRunningIdx];
  assert$7(client2[kRunning$3] === 0);
  client2.emit("disconnect", client2[kUrl$2], [client2], err);
  resume(client2);
}
async function connect$1(client2) {
  assert$7(!client2[kConnecting]);
  assert$7(!client2[kSocket]);
  let { host, hostname, protocol, port } = client2[kUrl$2];
  if (hostname[0] === "[") {
    const idx = hostname.indexOf("]");
    assert$7(idx !== -1);
    const ip = hostname.substr(1, idx - 1);
    assert$7(net.isIP(ip));
    hostname = ip;
  }
  client2[kConnecting] = true;
  if (channels.beforeConnect.hasSubscribers) {
    channels.beforeConnect.publish({
      connectParams: {
        host,
        hostname,
        protocol,
        port,
        servername: client2[kServerName]
      },
      connector: client2[kConnector]
    });
  }
  try {
    const socket = await new Promise((resolve2, reject) => {
      client2[kConnector]({
        host,
        hostname,
        protocol,
        port,
        servername: client2[kServerName]
      }, (err, socket2) => {
        if (err) {
          reject(err);
        } else {
          resolve2(socket2);
        }
      });
    });
    if (!llhttpInstance) {
      llhttpInstance = await llhttpPromise;
      llhttpPromise = null;
    }
    client2[kConnecting] = false;
    assert$7(socket);
    client2[kSocket] = socket;
    socket[kNoRef] = false;
    socket[kWriting] = false;
    socket[kReset] = false;
    socket[kBlocking] = false;
    socket[kError] = null;
    socket[kParser] = new Parser(client2, socket, llhttpInstance);
    socket[kClient] = client2;
    socket[kCounter] = 0;
    socket[kMaxRequests] = client2[kMaxRequests];
    socket.on("error", onSocketError).on("readable", onSocketReadable).on("end", onSocketEnd).on("close", onSocketClose);
    if (channels.connected.hasSubscribers) {
      channels.connected.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client2[kServerName]
        },
        connector: client2[kConnector],
        socket
      });
    }
    client2.emit("connect", client2[kUrl$2], [client2]);
  } catch (err) {
    client2[kConnecting] = false;
    if (channels.connectError.hasSubscribers) {
      channels.connectError.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client2[kServerName]
        },
        connector: client2[kConnector],
        error: err
      });
    }
    if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
      assert$7(client2[kRunning$3] === 0);
      while (client2[kPending$2] > 0 && client2[kQueue$1][client2[kPendingIdx]].servername === client2[kServerName]) {
        const request2 = client2[kQueue$1][client2[kPendingIdx]++];
        errorRequest(client2, request2, err);
      }
    } else {
      onError(client2, err);
    }
    client2.emit("connectionError", client2[kUrl$2], [client2], err);
  }
  resume(client2);
}
function emitDrain(client2) {
  client2[kNeedDrain$2] = 0;
  client2.emit("drain", client2[kUrl$2], [client2]);
}
function resume(client2, sync) {
  if (client2[kResuming] === 2) {
    return;
  }
  client2[kResuming] = 2;
  _resume(client2, sync);
  client2[kResuming] = 0;
  if (client2[kRunningIdx] > 256) {
    client2[kQueue$1].splice(0, client2[kRunningIdx]);
    client2[kPendingIdx] -= client2[kRunningIdx];
    client2[kRunningIdx] = 0;
  }
}
function _resume(client2, sync) {
  while (true) {
    if (client2.destroyed) {
      assert$7(client2[kPending$2] === 0);
      return;
    }
    if (client2.closed && !client2[kSize$4]) {
      client2.destroy();
      return;
    }
    const socket = client2[kSocket];
    if (socket) {
      if (client2[kSize$4] === 0) {
        if (!socket[kNoRef] && socket.unref) {
          socket.unref();
          socket[kNoRef] = true;
        }
      } else if (socket[kNoRef] && socket.ref) {
        socket.ref();
        socket[kNoRef] = false;
      }
      if (client2[kSize$4] === 0) {
        if (socket[kParser].timeoutType !== TIMEOUT_IDLE) {
          socket[kParser].setTimeout(client2[kKeepAliveTimeoutValue], TIMEOUT_IDLE);
        }
      } else if (client2[kRunning$3] > 0 && socket[kParser].statusCode < 200) {
        if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
          const request3 = client2[kQueue$1][client2[kRunningIdx]];
          const headersTimeout = request3.headersTimeout != null ? request3.headersTimeout : client2[kHeadersTimeout];
          socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
        }
      }
    }
    if (client2[kBusy$1]) {
      client2[kNeedDrain$2] = 2;
    } else if (client2[kNeedDrain$2] === 2) {
      if (sync) {
        client2[kNeedDrain$2] = 1;
        process.nextTick(emitDrain, client2);
      } else {
        emitDrain(client2);
      }
      continue;
    }
    if (client2[kPending$2] === 0) {
      return;
    }
    if (client2[kRunning$3] >= (client2[kPipelining] || 1)) {
      return;
    }
    const request2 = client2[kQueue$1][client2[kPendingIdx]];
    if (client2[kUrl$2].protocol === "https:" && client2[kServerName] !== request2.servername) {
      if (client2[kRunning$3] > 0) {
        return;
      }
      client2[kServerName] = request2.servername;
      if (socket && socket.servername !== request2.servername) {
        util$b.destroy(socket, new InformationalError("servername changed"));
        return;
      }
    }
    if (client2[kConnecting]) {
      return;
    }
    if (!socket) {
      connect$1(client2);
      continue;
    }
    if (socket.destroyed || socket[kWriting] || socket[kReset] || socket[kBlocking]) {
      return;
    }
    if (client2[kRunning$3] > 0 && !request2.idempotent) {
      return;
    }
    if (client2[kRunning$3] > 0 && (request2.upgrade || request2.method === "CONNECT")) {
      return;
    }
    if (util$b.isStream(request2.body) && util$b.bodyLength(request2.body) === 0) {
      request2.body.on("data", function() {
        assert$7(false);
      }).on("error", function(err) {
        errorRequest(client2, request2, err);
      }).on("end", function() {
        util$b.destroy(this);
      });
      request2.body = null;
    }
    if (client2[kRunning$3] > 0 && (util$b.isStream(request2.body) || util$b.isAsyncIterable(request2.body))) {
      return;
    }
    if (!request2.aborted && write(client2, request2)) {
      client2[kPendingIdx]++;
    } else {
      client2[kQueue$1].splice(client2[kPendingIdx], 1);
    }
  }
}
function write(client2, request2) {
  const { body: body2, method, path, host, upgrade: upgrade2, headers: headers2, blocking } = request2;
  const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH";
  if (body2 && typeof body2.read === "function") {
    body2.read(0);
  }
  let contentLength = util$b.bodyLength(body2);
  if (contentLength === null) {
    contentLength = request2.contentLength;
  }
  if (contentLength === 0 && !expectsPayload) {
    contentLength = null;
  }
  if (request2.contentLength !== null && request2.contentLength !== contentLength) {
    if (client2[kStrictContentLength]) {
      errorRequest(client2, request2, new RequestContentLengthMismatchError());
      return false;
    }
    process.emitWarning(new RequestContentLengthMismatchError());
  }
  const socket = client2[kSocket];
  try {
    request2.onConnect((err) => {
      if (request2.aborted || request2.completed) {
        return;
      }
      errorRequest(client2, request2, err || new RequestAbortedError$7());
      util$b.destroy(socket, new InformationalError("aborted"));
    });
  } catch (err) {
    errorRequest(client2, request2, err);
  }
  if (request2.aborted) {
    return false;
  }
  if (method === "HEAD") {
    socket[kReset] = true;
  }
  if (upgrade2 || method === "CONNECT") {
    socket[kReset] = true;
  }
  if (client2[kMaxRequests] && socket[kCounter]++ >= client2[kMaxRequests]) {
    socket[kReset] = true;
  }
  if (blocking) {
    socket[kBlocking] = true;
  }
  let header = `${method} ${path} HTTP/1.1\r
`;
  if (typeof host === "string") {
    header += `host: ${host}\r
`;
  } else {
    header += client2[kHostHeader];
  }
  if (upgrade2) {
    header += `connection: upgrade\r
upgrade: ${upgrade2}\r
`;
  } else if (client2[kPipelining]) {
    header += "connection: keep-alive\r\n";
  } else {
    header += "connection: close\r\n";
  }
  if (headers2) {
    header += headers2;
  }
  if (channels.sendHeaders.hasSubscribers) {
    channels.sendHeaders.publish({ request: request2, headers: header, socket });
  }
  if (!body2) {
    if (contentLength === 0) {
      socket.write(`${header}content-length: 0\r
\r
`, "ascii");
    } else {
      assert$7(contentLength === null, "no body must not have content length");
      socket.write(`${header}\r
`, "ascii");
    }
    request2.onRequestSent();
  } else if (util$b.isBuffer(body2)) {
    assert$7(contentLength === body2.byteLength, "buffer body must have content length");
    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r
\r
`, "ascii");
    socket.write(body2);
    socket.uncork();
    request2.onBodySent(body2);
    request2.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
  } else if (util$b.isBlobLike(body2)) {
    if (typeof body2.stream === "function") {
      writeIterable({ body: body2.stream(), client: client2, request: request2, socket, contentLength, header, expectsPayload });
    } else {
      writeBlob({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
    }
  } else if (util$b.isStream(body2)) {
    writeStream({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
  } else if (util$b.isIterable(body2)) {
    writeIterable({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
  } else {
    assert$7(false);
  }
  return true;
}
function writeStream({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$7(contentLength !== 0 || client2[kRunning$3] === 0, "stream body cannot be pipelined");
  let finished2 = false;
  const writer = new AsyncWriter({ socket, request: request2, contentLength, client: client2, expectsPayload, header });
  const onData = function(chunk) {
    try {
      assert$7(!finished2);
      if (!writer.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (err) {
      util$b.destroy(this, err);
    }
  };
  const onDrain = function() {
    assert$7(!finished2);
    if (body2.resume) {
      body2.resume();
    }
  };
  const onAbort = function() {
    onFinished(new RequestAbortedError$7());
  };
  const onFinished = function(err) {
    if (finished2) {
      return;
    }
    finished2 = true;
    assert$7(socket.destroyed || socket[kWriting] && client2[kRunning$3] <= 1);
    socket.off("drain", onDrain).off("error", onFinished);
    body2.removeListener("data", onData).removeListener("end", onFinished).removeListener("error", onFinished).removeListener("close", onAbort);
    if (!err) {
      try {
        writer.end();
      } catch (er) {
        err = er;
      }
    }
    writer.destroy(err);
    if (err && (err.code !== "UND_ERR_INFO" || err.message !== "reset")) {
      util$b.destroy(body2, err);
    } else {
      util$b.destroy(body2);
    }
  };
  body2.on("data", onData).on("end", onFinished).on("error", onFinished).on("close", onAbort);
  if (body2.resume) {
    body2.resume();
  }
  socket.on("drain", onDrain).on("error", onFinished);
}
async function writeBlob({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$7(contentLength === body2.size, "blob body must have content length");
  try {
    if (contentLength != null && contentLength !== body2.size) {
      throw new RequestContentLengthMismatchError();
    }
    const buffer = Buffer.from(await body2.arrayBuffer());
    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r
\r
`, "ascii");
    socket.write(buffer);
    socket.uncork();
    request2.onBodySent(buffer);
    request2.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
    resume(client2);
  } catch (err) {
    util$b.destroy(socket, err);
  }
}
async function writeIterable({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$7(contentLength !== 0 || client2[kRunning$3] === 0, "iterator body cannot be pipelined");
  let callback = null;
  function onDrain() {
    if (callback) {
      const cb = callback;
      callback = null;
      cb();
    }
  }
  const waitForDrain = () => new Promise((resolve2, reject) => {
    assert$7(callback === null);
    if (socket[kError]) {
      reject(socket[kError]);
    } else {
      callback = resolve2;
    }
  });
  socket.on("close", onDrain).on("drain", onDrain);
  const writer = new AsyncWriter({ socket, request: request2, contentLength, client: client2, expectsPayload, header });
  try {
    for await (const chunk of body2) {
      if (socket[kError]) {
        throw socket[kError];
      }
      if (!writer.write(chunk)) {
        await waitForDrain();
      }
    }
    writer.end();
  } catch (err) {
    writer.destroy(err);
  } finally {
    socket.off("close", onDrain).off("drain", onDrain);
  }
}
var AsyncWriter = class {
  constructor({ socket, request: request2, contentLength, client: client2, expectsPayload, header }) {
    this.socket = socket;
    this.request = request2;
    this.contentLength = contentLength;
    this.client = client2;
    this.bytesWritten = 0;
    this.expectsPayload = expectsPayload;
    this.header = header;
    socket[kWriting] = true;
  }
  write(chunk) {
    const { socket, request: request2, contentLength, client: client2, bytesWritten, expectsPayload, header } = this;
    if (socket[kError]) {
      throw socket[kError];
    }
    if (socket.destroyed) {
      return false;
    }
    const len = Buffer.byteLength(chunk);
    if (!len) {
      return true;
    }
    if (contentLength !== null && bytesWritten + len > contentLength) {
      if (client2[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError();
      }
      process.emitWarning(new RequestContentLengthMismatchError());
    }
    if (bytesWritten === 0) {
      if (!expectsPayload) {
        socket[kReset] = true;
      }
      if (contentLength === null) {
        socket.write(`${header}transfer-encoding: chunked\r
`, "ascii");
      } else {
        socket.write(`${header}content-length: ${contentLength}\r
\r
`, "ascii");
      }
    }
    if (contentLength === null) {
      socket.write(`\r
${len.toString(16)}\r
`, "ascii");
    }
    this.bytesWritten += len;
    const ret = socket.write(chunk);
    request2.onBodySent(chunk);
    return ret;
  }
  end() {
    const { socket, contentLength, client: client2, bytesWritten, expectsPayload, header, request: request2 } = this;
    request2.onRequestSent();
    socket[kWriting] = false;
    if (socket[kError]) {
      throw socket[kError];
    }
    if (socket.destroyed) {
      return;
    }
    if (bytesWritten === 0) {
      if (expectsPayload) {
        socket.write(`${header}content-length: 0\r
\r
`, "ascii");
      } else {
        socket.write(`${header}\r
`, "ascii");
      }
    } else if (contentLength === null) {
      socket.write("\r\n0\r\n\r\n", "ascii");
    }
    if (contentLength !== null && bytesWritten !== contentLength) {
      if (client2[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError();
      } else {
        process.emitWarning(new RequestContentLengthMismatchError());
      }
    }
    if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
      if (socket[kParser].timeout.refresh) {
        socket[kParser].timeout.refresh();
      }
    }
    resume(client2);
  }
  destroy(err) {
    const { socket, client: client2 } = this;
    socket[kWriting] = false;
    if (err) {
      assert$7(client2[kRunning$3] <= 1, "pipeline should only contain this request");
      util$b.destroy(socket, err);
    }
  }
};
function errorRequest(client2, request2, err) {
  try {
    request2.onError(err);
    assert$7(request2.aborted);
  } catch (err2) {
    client2.emit("error", err2);
  }
}
var client = Client$2;
var kSize$3 = 2048;
var kMask = kSize$3 - 1;
var FixedCircularBuffer = class {
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = new Array(kSize$3);
    this.next = null;
  }
  isEmpty() {
    return this.top === this.bottom;
  }
  isFull() {
    return (this.top + 1 & kMask) === this.bottom;
  }
  push(data) {
    this.list[this.top] = data;
    this.top = this.top + 1 & kMask;
  }
  shift() {
    const nextItem = this.list[this.bottom];
    if (nextItem === void 0)
      return null;
    this.list[this.bottom] = void 0;
    this.bottom = this.bottom + 1 & kMask;
    return nextItem;
  }
};
var fixedQueue = class FixedQueue {
  constructor() {
    this.head = this.tail = new FixedCircularBuffer();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
  push(data) {
    if (this.head.isFull()) {
      this.head = this.head.next = new FixedCircularBuffer();
    }
    this.head.push(data);
  }
  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      this.tail = tail.next;
    }
    return next;
  }
};
var { kFree: kFree$1, kConnected: kConnected$2, kPending: kPending$1, kQueued: kQueued$1, kRunning: kRunning$2, kSize: kSize$2 } = symbols$1;
var kPool = Symbol("pool");
var PoolStats$1 = class {
  constructor(pool2) {
    this[kPool] = pool2;
  }
  get connected() {
    return this[kPool][kConnected$2];
  }
  get free() {
    return this[kPool][kFree$1];
  }
  get pending() {
    return this[kPool][kPending$1];
  }
  get queued() {
    return this[kPool][kQueued$1];
  }
  get running() {
    return this[kPool][kRunning$2];
  }
  get size() {
    return this[kPool][kSize$2];
  }
};
var poolStats = PoolStats$1;
var DispatcherBase$1 = dispatcherBase;
var FixedQueue2 = fixedQueue;
var { kConnected: kConnected$1, kSize: kSize$1, kRunning: kRunning$1, kPending, kQueued, kBusy, kFree, kUrl: kUrl$1, kClose: kClose$1, kDestroy: kDestroy$1, kDispatch: kDispatch$1 } = symbols$1;
var PoolStats = poolStats;
var kClients$2 = Symbol("clients");
var kNeedDrain$1 = Symbol("needDrain");
var kQueue = Symbol("queue");
var kClosedResolve = Symbol("closed resolve");
var kOnDrain$1 = Symbol("onDrain");
var kOnConnect$1 = Symbol("onConnect");
var kOnDisconnect$1 = Symbol("onDisconnect");
var kOnConnectionError$1 = Symbol("onConnectionError");
var kGetDispatcher$1 = Symbol("get dispatcher");
var kAddClient$1 = Symbol("add client");
var kRemoveClient = Symbol("remove client");
var kStats = Symbol("stats");
var PoolBase$1 = class extends DispatcherBase$1 {
  constructor() {
    super();
    this[kQueue] = new FixedQueue2();
    this[kClients$2] = [];
    this[kQueued] = 0;
    const pool2 = this;
    this[kOnDrain$1] = function onDrain(origin, targets) {
      const queue = pool2[kQueue];
      let needDrain = false;
      while (!needDrain) {
        const item = queue.shift();
        if (!item) {
          break;
        }
        pool2[kQueued]--;
        needDrain = !this.dispatch(item.opts, item.handler);
      }
      this[kNeedDrain$1] = needDrain;
      if (!this[kNeedDrain$1] && pool2[kNeedDrain$1]) {
        pool2[kNeedDrain$1] = false;
        pool2.emit("drain", origin, [pool2, ...targets]);
      }
      if (pool2[kClosedResolve] && queue.isEmpty()) {
        Promise.all(pool2[kClients$2].map((c) => c.close())).then(pool2[kClosedResolve]);
      }
    };
    this[kOnConnect$1] = (origin, targets) => {
      pool2.emit("connect", origin, [pool2, ...targets]);
    };
    this[kOnDisconnect$1] = (origin, targets, err) => {
      pool2.emit("disconnect", origin, [pool2, ...targets], err);
    };
    this[kOnConnectionError$1] = (origin, targets, err) => {
      pool2.emit("connectionError", origin, [pool2, ...targets], err);
    };
    this[kStats] = new PoolStats(this);
  }
  get [kBusy]() {
    return this[kNeedDrain$1];
  }
  get [kConnected$1]() {
    return this[kClients$2].filter((client2) => client2[kConnected$1]).length;
  }
  get [kFree]() {
    return this[kClients$2].filter((client2) => client2[kConnected$1] && !client2[kNeedDrain$1]).length;
  }
  get [kPending]() {
    let ret = this[kQueued];
    for (const { [kPending]: pending } of this[kClients$2]) {
      ret += pending;
    }
    return ret;
  }
  get [kRunning$1]() {
    let ret = 0;
    for (const { [kRunning$1]: running } of this[kClients$2]) {
      ret += running;
    }
    return ret;
  }
  get [kSize$1]() {
    let ret = this[kQueued];
    for (const { [kSize$1]: size } of this[kClients$2]) {
      ret += size;
    }
    return ret;
  }
  get stats() {
    return this[kStats];
  }
  async [kClose$1]() {
    if (this[kQueue].isEmpty()) {
      return Promise.all(this[kClients$2].map((c) => c.close()));
    } else {
      return new Promise((resolve2) => {
        this[kClosedResolve] = resolve2;
      });
    }
  }
  async [kDestroy$1](err) {
    while (true) {
      const item = this[kQueue].shift();
      if (!item) {
        break;
      }
      item.handler.onError(err);
    }
    return Promise.all(this[kClients$2].map((c) => c.destroy(err)));
  }
  [kDispatch$1](opts, handler) {
    const dispatcher2 = this[kGetDispatcher$1]();
    if (!dispatcher2) {
      this[kNeedDrain$1] = true;
      this[kQueue].push({ opts, handler });
      this[kQueued]++;
    } else if (!dispatcher2.dispatch(opts, handler)) {
      dispatcher2[kNeedDrain$1] = true;
      this[kNeedDrain$1] = !this[kGetDispatcher$1]();
    }
    return !this[kNeedDrain$1];
  }
  [kAddClient$1](client2) {
    client2.on("drain", this[kOnDrain$1]).on("connect", this[kOnConnect$1]).on("disconnect", this[kOnDisconnect$1]).on("connectionError", this[kOnConnectionError$1]);
    this[kClients$2].push(client2);
    if (this[kNeedDrain$1]) {
      process.nextTick(() => {
        if (this[kNeedDrain$1]) {
          this[kOnDrain$1](client2[kUrl$1], [this, client2]);
        }
      });
    }
    return this;
  }
  [kRemoveClient](client2) {
    client2.close(() => {
      const idx = this[kClients$2].indexOf(client2);
      if (idx !== -1) {
        this[kClients$2].splice(idx, 1);
      }
    });
    this[kNeedDrain$1] = this[kClients$2].some((dispatcher2) => !dispatcher2[kNeedDrain$1] && dispatcher2.closed !== true && dispatcher2.destroyed !== true);
  }
};
var poolBase = {
  PoolBase: PoolBase$1,
  kClients: kClients$2,
  kNeedDrain: kNeedDrain$1,
  kAddClient: kAddClient$1,
  kRemoveClient,
  kGetDispatcher: kGetDispatcher$1
};
var {
  PoolBase,
  kClients: kClients$1,
  kNeedDrain,
  kAddClient,
  kGetDispatcher
} = poolBase;
var Client$1 = client;
var {
  InvalidArgumentError: InvalidArgumentError$8
} = errors$1;
var util$a = util$h;
var { kUrl } = symbols$1;
var buildConnector = connect$2;
var kOptions$1 = Symbol("options");
var kConnections = Symbol("connections");
var kFactory$1 = Symbol("factory");
function defaultFactory$1(origin, opts) {
  return new Client$1(origin, opts);
}
var Pool$1 = class extends PoolBase {
  constructor(origin, {
    connections,
    factory = defaultFactory$1,
    connect: connect2,
    connectTimeout,
    tls: tls2,
    maxCachedSessions,
    socketPath,
    ...options
  } = {}) {
    super();
    if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
      throw new InvalidArgumentError$8("invalid connections");
    }
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$8("factory must be a function.");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$8("connect must be a function or an object");
    }
    if (typeof connect2 !== "function") {
      connect2 = buildConnector({
        ...tls2,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout == null ? 1e4 : connectTimeout,
        ...connect2
      });
    }
    this[kConnections] = connections || null;
    this[kUrl] = util$a.parseOrigin(origin);
    this[kOptions$1] = { ...util$a.deepClone(options), connect: connect2 };
    this[kFactory$1] = factory;
  }
  [kGetDispatcher]() {
    let dispatcher2 = this[kClients$1].find((dispatcher3) => !dispatcher3[kNeedDrain]);
    if (dispatcher2) {
      return dispatcher2;
    }
    if (!this[kConnections] || this[kClients$1].length < this[kConnections]) {
      dispatcher2 = this[kFactory$1](this[kUrl], this[kOptions$1]);
      this[kAddClient](dispatcher2);
    }
    return dispatcher2;
  }
};
var pool = Pool$1;
var { kConnected, kSize } = symbols$1;
var CompatWeakRef = class {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value[kConnected] === 0 && this.value[kSize] === 0 ? void 0 : this.value;
  }
};
var CompatFinalizer = class {
  constructor(finalizer) {
    this.finalizer = finalizer;
  }
  register(dispatcher2, key2) {
    dispatcher2.on("disconnect", () => {
      if (dispatcher2[kConnected] === 0 && dispatcher2[kSize] === 0) {
        this.finalizer(key2);
      }
    });
  }
};
var dispatcherWeakref = function() {
  return {
    WeakRef: commonjsGlobal.WeakRef || CompatWeakRef,
    FinalizationRegistry: commonjsGlobal.FinalizationRegistry || CompatFinalizer
  };
};
var { InvalidArgumentError: InvalidArgumentError$7 } = errors$1;
var { kClients, kRunning, kClose, kDestroy, kDispatch } = symbols$1;
var DispatcherBase = dispatcherBase;
var Pool = pool;
var Client = client;
var util$9 = util$h;
var RedirectHandler = redirect;
var { WeakRef, FinalizationRegistry: FinalizationRegistry$1 } = dispatcherWeakref();
var kOnConnect = Symbol("onConnect");
var kOnDisconnect = Symbol("onDisconnect");
var kOnConnectionError = Symbol("onConnectionError");
var kMaxRedirections = Symbol("maxRedirections");
var kOnDrain = Symbol("onDrain");
var kFactory = Symbol("factory");
var kFinalizer = Symbol("finalizer");
var kOptions = Symbol("options");
function defaultFactory(origin, opts) {
  return opts && opts.connections === 1 ? new Client(origin, opts) : new Pool(origin, opts);
}
var Agent$1 = class extends DispatcherBase {
  constructor({ factory = defaultFactory, maxRedirections = 0, connect: connect2, ...options } = {}) {
    super();
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$7("factory must be a function.");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$7("connect must be a function or an object");
    }
    if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
      throw new InvalidArgumentError$7("maxRedirections must be a positive number");
    }
    if (connect2 && typeof connect2 !== "function") {
      connect2 = { ...connect2 };
    }
    this[kOptions] = { ...util$9.deepClone(options), connect: connect2 };
    this[kMaxRedirections] = maxRedirections;
    this[kFactory] = factory;
    this[kClients] = /* @__PURE__ */ new Map();
    this[kFinalizer] = new FinalizationRegistry$1((key2) => {
      const ref = this[kClients].get(key2);
      if (ref !== void 0 && ref.deref() === void 0) {
        this[kClients].delete(key2);
      }
    });
    const agent2 = this;
    this[kOnDrain] = (origin, targets) => {
      agent2.emit("drain", origin, [agent2, ...targets]);
    };
    this[kOnConnect] = (origin, targets) => {
      agent2.emit("connect", origin, [agent2, ...targets]);
    };
    this[kOnDisconnect] = (origin, targets, err) => {
      agent2.emit("disconnect", origin, [agent2, ...targets], err);
    };
    this[kOnConnectionError] = (origin, targets, err) => {
      agent2.emit("connectionError", origin, [agent2, ...targets], err);
    };
  }
  get [kRunning]() {
    let ret = 0;
    for (const ref of this[kClients].values()) {
      const client2 = ref.deref();
      if (client2) {
        ret += client2[kRunning];
      }
    }
    return ret;
  }
  [kDispatch](opts, handler) {
    let key2;
    if (opts.origin && (typeof opts.origin === "string" || opts.origin instanceof URL)) {
      key2 = String(opts.origin);
    } else {
      throw new InvalidArgumentError$7("opts.origin must be a non-empty string or URL.");
    }
    const ref = this[kClients].get(key2);
    let dispatcher2 = ref ? ref.deref() : null;
    if (!dispatcher2) {
      dispatcher2 = this[kFactory](opts.origin, this[kOptions]).on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
      this[kClients].set(key2, new WeakRef(dispatcher2));
      this[kFinalizer].register(dispatcher2, key2);
    }
    const { maxRedirections = this[kMaxRedirections] } = opts;
    if (maxRedirections != null && maxRedirections !== 0) {
      opts = { ...opts, maxRedirections: 0 };
      handler = new RedirectHandler(this, maxRedirections, opts, handler);
    }
    return dispatcher2.dispatch(opts, handler);
  }
  async [kClose]() {
    const closePromises = [];
    for (const ref of this[kClients].values()) {
      const client2 = ref.deref();
      if (client2) {
        closePromises.push(client2.close());
      }
    }
    await Promise.all(closePromises);
  }
  async [kDestroy](err) {
    const destroyPromises = [];
    for (const ref of this[kClients].values()) {
      const client2 = ref.deref();
      if (client2) {
        destroyPromises.push(client2.destroy(err));
      }
    }
    await Promise.all(destroyPromises);
  }
};
var agent = Agent$1;
var api$1 = {};
var assert$6 = import_assert.default;
var { Readable: Readable$3 } = import_stream.default;
var { RequestAbortedError: RequestAbortedError$6, NotSupportedError } = errors$1;
var util$8 = util$h;
var { ReadableStreamFrom, toUSVString: toUSVString$2 } = util$h;
var Blob;
var kConsume = Symbol("kConsume");
var kReading = Symbol("kReading");
var kBody = Symbol("kBody");
var kAbort = Symbol("abort");
var kContentType = Symbol("kContentType");
var readable = class BodyReadable extends Readable$3 {
  constructor(resume2, abort2, contentType = "") {
    super({
      autoDestroy: true,
      read: resume2,
      highWaterMark: 64 * 1024
    });
    this._readableState.dataEmitted = false;
    this[kAbort] = abort2;
    this[kConsume] = null;
    this[kBody] = null;
    this[kContentType] = contentType;
    this[kReading] = false;
  }
  destroy(err) {
    if (this.destroyed) {
      return this;
    }
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$6();
    }
    if (err) {
      this[kAbort]();
    }
    return super.destroy(err);
  }
  emit(ev, ...args) {
    if (ev === "data") {
      this._readableState.dataEmitted = true;
    } else if (ev === "error") {
      this._readableState.errorEmitted = true;
    }
    return super.emit(ev, ...args);
  }
  on(ev, ...args) {
    if (ev === "data" || ev === "readable") {
      this[kReading] = true;
    }
    return super.on(ev, ...args);
  }
  addListener(ev, ...args) {
    return this.on(ev, ...args);
  }
  off(ev, ...args) {
    const ret = super.off(ev, ...args);
    if (ev === "data" || ev === "readable") {
      this[kReading] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0;
    }
    return ret;
  }
  removeListener(ev, ...args) {
    return this.off(ev, ...args);
  }
  push(chunk) {
    if (this[kConsume] && chunk !== null) {
      consumePush(this[kConsume], chunk);
      return this[kReading] ? super.push(chunk) : true;
    }
    return super.push(chunk);
  }
  async text() {
    return consume(this, "text");
  }
  async json() {
    return consume(this, "json");
  }
  async blob() {
    return consume(this, "blob");
  }
  async arrayBuffer() {
    return consume(this, "arrayBuffer");
  }
  async formData() {
    throw new NotSupportedError();
  }
  get bodyUsed() {
    return util$8.isDisturbed(this);
  }
  get body() {
    if (!this[kBody]) {
      this[kBody] = ReadableStreamFrom(this);
      if (this[kConsume]) {
        this[kBody].getReader();
        assert$6(this[kBody].locked);
      }
    }
    return this[kBody];
  }
  async dump(opts) {
    let limit = opts && Number.isFinite(opts.limit) ? opts.limit : 262144;
    try {
      for await (const chunk of this) {
        limit -= Buffer.byteLength(chunk);
        if (limit < 0) {
          return;
        }
      }
    } catch {
    }
  }
};
function isLocked(self2) {
  return self2[kBody] && self2[kBody].locked === true || self2[kConsume];
}
function isUnusable(self2) {
  return util$8.isDisturbed(self2) || isLocked(self2);
}
async function consume(stream2, type) {
  if (isUnusable(stream2)) {
    throw new TypeError("unusable");
  }
  assert$6(!stream2[kConsume]);
  return new Promise((resolve2, reject) => {
    stream2[kConsume] = {
      type,
      stream: stream2,
      resolve: resolve2,
      reject,
      length: 0,
      body: []
    };
    stream2.on("error", function(err) {
      consumeFinish(this[kConsume], err);
    }).on("close", function() {
      if (this[kConsume].body !== null) {
        consumeFinish(this[kConsume], new RequestAbortedError$6());
      }
    });
    process.nextTick(consumeStart, stream2[kConsume]);
  });
}
function consumeStart(consume2) {
  if (consume2.body === null) {
    return;
  }
  const { _readableState: state } = consume2.stream;
  for (const chunk of state.buffer) {
    consumePush(consume2, chunk);
  }
  if (state.endEmitted) {
    consumeEnd(this[kConsume]);
  } else {
    consume2.stream.on("end", function() {
      consumeEnd(this[kConsume]);
    });
  }
  consume2.stream.resume();
  while (consume2.stream.read() != null) {
  }
}
function consumeEnd(consume2) {
  const { type, body: body2, resolve: resolve2, stream: stream2, length } = consume2;
  try {
    if (type === "text") {
      resolve2(toUSVString$2(Buffer.concat(body2)));
    } else if (type === "json") {
      resolve2(JSON.parse(Buffer.concat(body2)));
    } else if (type === "arrayBuffer") {
      const dst = new Uint8Array(length);
      let pos = 0;
      for (const buf of body2) {
        dst.set(buf, pos);
        pos += buf.byteLength;
      }
      resolve2(dst);
    } else if (type === "blob") {
      if (!Blob) {
        Blob = require("buffer").Blob;
      }
      resolve2(new Blob(body2, { type: stream2[kContentType] }));
    }
    consumeFinish(consume2);
  } catch (err) {
    stream2.destroy(err);
  }
}
function consumePush(consume2, chunk) {
  consume2.length += chunk.length;
  consume2.body.push(chunk);
}
function consumeFinish(consume2, err) {
  if (consume2.body === null) {
    return;
  }
  if (err) {
    consume2.reject(err);
  } else {
    consume2.resolve();
  }
  consume2.type = null;
  consume2.stream = null;
  consume2.resolve = null;
  consume2.reject = null;
  consume2.length = 0;
  consume2.body = null;
}
var { RequestAbortedError: RequestAbortedError$5 } = errors$1;
var kListener = Symbol("kListener");
var kSignal$1 = Symbol("kSignal");
function abort(self2) {
  if (self2.abort) {
    self2.abort();
  } else {
    self2.onError(new RequestAbortedError$5());
  }
}
function addSignal$5(self2, signal) {
  self2[kSignal$1] = null;
  self2[kListener] = null;
  if (!signal) {
    return;
  }
  if (signal.aborted) {
    abort(self2);
    return;
  }
  self2[kSignal$1] = signal;
  self2[kListener] = () => {
    abort(self2);
  };
  if ("addEventListener" in self2[kSignal$1]) {
    self2[kSignal$1].addEventListener("abort", self2[kListener]);
  } else {
    self2[kSignal$1].addListener("abort", self2[kListener]);
  }
}
function removeSignal$5(self2) {
  if (!self2[kSignal$1]) {
    return;
  }
  if ("removeEventListener" in self2[kSignal$1]) {
    self2[kSignal$1].removeEventListener("abort", self2[kListener]);
  } else {
    self2[kSignal$1].removeListener("abort", self2[kListener]);
  }
  self2[kSignal$1] = null;
  self2[kListener] = null;
}
var abortSignal = {
  addSignal: addSignal$5,
  removeSignal: removeSignal$5
};
var Readable$2 = readable;
var {
  InvalidArgumentError: InvalidArgumentError$6,
  RequestAbortedError: RequestAbortedError$4,
  ResponseStatusCodeError
} = errors$1;
var util$7 = util$h;
var { AsyncResource: AsyncResource$4 } = import_async_hooks.default;
var { addSignal: addSignal$4, removeSignal: removeSignal$4 } = abortSignal;
var RequestHandler = class extends AsyncResource$4 {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$6("invalid opts");
    }
    const { signal, method, opaque, body: body2, onInfo, responseHeaders, throwOnError } = opts;
    try {
      if (typeof callback !== "function") {
        throw new InvalidArgumentError$6("invalid callback");
      }
      if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
        throw new InvalidArgumentError$6("signal must be an EventEmitter or EventTarget");
      }
      if (method === "CONNECT") {
        throw new InvalidArgumentError$6("invalid method");
      }
      if (onInfo && typeof onInfo !== "function") {
        throw new InvalidArgumentError$6("invalid onInfo callback");
      }
      super("UNDICI_REQUEST");
    } catch (err) {
      if (util$7.isStream(body2)) {
        util$7.destroy(body2.on("error", util$7.nop), err);
      }
      throw err;
    }
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.body = body2;
    this.trailers = {};
    this.context = null;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError;
    if (util$7.isStream(body2)) {
      body2.on("error", (err) => {
        this.onError(err);
      });
    }
    addSignal$4(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$4();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2, statusMessage) {
    const { callback, opaque, abort: abort2, context } = this;
    if (statusCode < 200) {
      if (this.onInfo) {
        const headers3 = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers: headers3 });
      }
      return;
    }
    const parsedHeaders = util$7.parseHeaders(rawHeaders);
    const body2 = new Readable$2(resume2, abort2, parsedHeaders["content-type"]);
    this.callback = null;
    this.res = body2;
    const headers2 = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
    if (callback !== null) {
      if (this.throwOnError && statusCode >= 400) {
        this.runInAsyncScope(callback, null, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2));
        return;
      }
      this.runInAsyncScope(callback, null, null, {
        statusCode,
        headers: headers2,
        trailers: this.trailers,
        opaque,
        body: body2,
        context
      });
    }
  }
  onData(chunk) {
    const { res } = this;
    return res.push(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    removeSignal$4(this);
    util$7.parseHeaders(trailers, this.trailers);
    res.push(null);
  }
  onError(err) {
    const { res, callback, body: body2, opaque } = this;
    removeSignal$4(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
    if (res) {
      this.res = null;
      queueMicrotask(() => {
        util$7.destroy(res, err);
      });
    }
    if (body2) {
      this.body = null;
      util$7.destroy(body2, err);
    }
  }
};
function request$1(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve2, reject) => {
      request$1.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve2(data);
      });
    });
  }
  try {
    this.dispatch(opts, new RequestHandler(opts, callback));
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiRequest = request$1;
var { finished } = import_stream.default;
var {
  InvalidArgumentError: InvalidArgumentError$5,
  InvalidReturnValueError: InvalidReturnValueError$1,
  RequestAbortedError: RequestAbortedError$3
} = errors$1;
var util$6 = util$h;
var { AsyncResource: AsyncResource$3 } = import_async_hooks.default;
var { addSignal: addSignal$3, removeSignal: removeSignal$3 } = abortSignal;
var StreamHandler = class extends AsyncResource$3 {
  constructor(opts, factory, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$5("invalid opts");
    }
    const { signal, method, opaque, body: body2, onInfo, responseHeaders } = opts;
    try {
      if (typeof callback !== "function") {
        throw new InvalidArgumentError$5("invalid callback");
      }
      if (typeof factory !== "function") {
        throw new InvalidArgumentError$5("invalid factory");
      }
      if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
        throw new InvalidArgumentError$5("signal must be an EventEmitter or EventTarget");
      }
      if (method === "CONNECT") {
        throw new InvalidArgumentError$5("invalid method");
      }
      if (onInfo && typeof onInfo !== "function") {
        throw new InvalidArgumentError$5("invalid onInfo callback");
      }
      super("UNDICI_STREAM");
    } catch (err) {
      if (util$6.isStream(body2)) {
        util$6.destroy(body2.on("error", util$6.nop), err);
      }
      throw err;
    }
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.factory = factory;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.context = null;
    this.trailers = null;
    this.body = body2;
    this.onInfo = onInfo || null;
    if (util$6.isStream(body2)) {
      body2.on("error", (err) => {
        this.onError(err);
      });
    }
    addSignal$3(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$3();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2) {
    const { factory, opaque, context } = this;
    if (statusCode < 200) {
      if (this.onInfo) {
        const headers3 = this.responseHeaders === "raw" ? util$6.parseRawHeaders(rawHeaders) : util$6.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers: headers3 });
      }
      return;
    }
    this.factory = null;
    const headers2 = this.responseHeaders === "raw" ? util$6.parseRawHeaders(rawHeaders) : util$6.parseHeaders(rawHeaders);
    const res = this.runInAsyncScope(factory, null, {
      statusCode,
      headers: headers2,
      opaque,
      context
    });
    if (!res || typeof res.write !== "function" || typeof res.end !== "function" || typeof res.on !== "function") {
      throw new InvalidReturnValueError$1("expected Writable");
    }
    res.on("drain", resume2);
    finished(res, { readable: false }, (err) => {
      const { callback, res: res2, opaque: opaque2, trailers, abort: abort2 } = this;
      this.res = null;
      if (err || !res2.readable) {
        util$6.destroy(res2, err);
      }
      this.callback = null;
      this.runInAsyncScope(callback, null, err || null, { opaque: opaque2, trailers });
      if (err) {
        abort2();
      }
    });
    this.res = res;
    const needDrain = res.writableNeedDrain !== void 0 ? res.writableNeedDrain : res._writableState && res._writableState.needDrain;
    return needDrain !== true;
  }
  onData(chunk) {
    const { res } = this;
    return res.write(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    removeSignal$3(this);
    this.trailers = util$6.parseHeaders(trailers);
    res.end();
  }
  onError(err) {
    const { res, callback, opaque, body: body2 } = this;
    removeSignal$3(this);
    this.factory = null;
    if (res) {
      this.res = null;
      util$6.destroy(res, err);
    } else if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
    if (body2) {
      this.body = null;
      util$6.destroy(body2, err);
    }
  }
};
function stream(opts, factory, callback) {
  if (callback === void 0) {
    return new Promise((resolve2, reject) => {
      stream.call(this, opts, factory, (err, data) => {
        return err ? reject(err) : resolve2(data);
      });
    });
  }
  try {
    this.dispatch(opts, new StreamHandler(opts, factory, callback));
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiStream = stream;
var {
  Readable: Readable$1,
  Duplex,
  PassThrough
} = import_stream.default;
var {
  InvalidArgumentError: InvalidArgumentError$4,
  InvalidReturnValueError,
  RequestAbortedError: RequestAbortedError$2
} = errors$1;
var util$5 = util$h;
var { AsyncResource: AsyncResource$2 } = import_async_hooks.default;
var { addSignal: addSignal$2, removeSignal: removeSignal$2 } = abortSignal;
var assert$5 = import_assert.default;
var kResume = Symbol("resume");
var PipelineRequest = class extends Readable$1 {
  constructor() {
    super({ autoDestroy: true });
    this[kResume] = null;
  }
  _read() {
    const { [kResume]: resume2 } = this;
    if (resume2) {
      this[kResume] = null;
      resume2();
    }
  }
  _destroy(err, callback) {
    this._read();
    callback(err);
  }
};
var PipelineResponse = class extends Readable$1 {
  constructor(resume2) {
    super({ autoDestroy: true });
    this[kResume] = resume2;
  }
  _read() {
    this[kResume]();
  }
  _destroy(err, callback) {
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$2();
    }
    callback(err);
  }
};
var PipelineHandler = class extends AsyncResource$2 {
  constructor(opts, handler) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$4("invalid opts");
    }
    if (typeof handler !== "function") {
      throw new InvalidArgumentError$4("invalid handler");
    }
    const { signal, method, opaque, onInfo, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$4("signal must be an EventEmitter or EventTarget");
    }
    if (method === "CONNECT") {
      throw new InvalidArgumentError$4("invalid method");
    }
    if (onInfo && typeof onInfo !== "function") {
      throw new InvalidArgumentError$4("invalid onInfo callback");
    }
    super("UNDICI_PIPELINE");
    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.handler = handler;
    this.abort = null;
    this.context = null;
    this.onInfo = onInfo || null;
    this.req = new PipelineRequest().on("error", util$5.nop);
    this.ret = new Duplex({
      readableObjectMode: opts.objectMode,
      autoDestroy: true,
      read: () => {
        const { body: body2 } = this;
        if (body2 && body2.resume) {
          body2.resume();
        }
      },
      write: (chunk, encoding, callback) => {
        const { req } = this;
        if (req.push(chunk, encoding) || req._readableState.destroyed) {
          callback();
        } else {
          req[kResume] = callback;
        }
      },
      destroy: (err, callback) => {
        const { body: body2, req, res, ret, abort: abort2 } = this;
        if (!err && !ret._readableState.endEmitted) {
          err = new RequestAbortedError$2();
        }
        if (abort2 && err) {
          abort2();
        }
        util$5.destroy(body2, err);
        util$5.destroy(req, err);
        util$5.destroy(res, err);
        removeSignal$2(this);
        callback(err);
      }
    }).on("prefinish", () => {
      const { req } = this;
      req.push(null);
    });
    this.res = null;
    addSignal$2(this, signal);
  }
  onConnect(abort2, context) {
    const { ret, res } = this;
    assert$5(!res, "pipeline cannot be retried");
    if (ret.destroyed) {
      throw new RequestAbortedError$2();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2) {
    const { opaque, handler, context } = this;
    if (statusCode < 200) {
      if (this.onInfo) {
        const headers2 = this.responseHeaders === "raw" ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    this.res = new PipelineResponse(resume2);
    let body2;
    try {
      this.handler = null;
      const headers2 = this.responseHeaders === "raw" ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);
      body2 = this.runInAsyncScope(handler, null, {
        statusCode,
        headers: headers2,
        opaque,
        body: this.res,
        context
      });
    } catch (err) {
      this.res.on("error", util$5.nop);
      throw err;
    }
    if (!body2 || typeof body2.on !== "function") {
      throw new InvalidReturnValueError("expected Readable");
    }
    body2.on("data", (chunk) => {
      const { ret, body: body3 } = this;
      if (!ret.push(chunk) && body3.pause) {
        body3.pause();
      }
    }).on("error", (err) => {
      const { ret } = this;
      util$5.destroy(ret, err);
    }).on("end", () => {
      const { ret } = this;
      ret.push(null);
    }).on("close", () => {
      const { ret } = this;
      if (!ret._readableState.ended) {
        util$5.destroy(ret, new RequestAbortedError$2());
      }
    });
    this.body = body2;
  }
  onData(chunk) {
    const { res } = this;
    return res.push(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    res.push(null);
  }
  onError(err) {
    const { ret } = this;
    this.handler = null;
    util$5.destroy(ret, err);
  }
};
function pipeline$1(opts, handler) {
  try {
    const pipelineHandler = new PipelineHandler(opts, handler);
    this.dispatch({ ...opts, body: pipelineHandler.req }, pipelineHandler);
    return pipelineHandler.ret;
  } catch (err) {
    return new PassThrough().destroy(err);
  }
}
var apiPipeline = pipeline$1;
var { InvalidArgumentError: InvalidArgumentError$3, RequestAbortedError: RequestAbortedError$1, SocketError: SocketError$1 } = errors$1;
var { AsyncResource: AsyncResource$1 } = import_async_hooks.default;
var util$4 = util$h;
var { addSignal: addSignal$1, removeSignal: removeSignal$1 } = abortSignal;
var assert$4 = import_assert.default;
var UpgradeHandler = class extends AsyncResource$1 {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$3("invalid opts");
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$3("invalid callback");
    }
    const { signal, opaque, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$3("signal must be an EventEmitter or EventTarget");
    }
    super("UNDICI_UPGRADE");
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.abort = null;
    this.context = null;
    addSignal$1(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$1();
    }
    this.abort = abort2;
    this.context = null;
  }
  onHeaders() {
    throw new SocketError$1("bad upgrade", null);
  }
  onUpgrade(statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;
    assert$4.strictEqual(statusCode, 101);
    removeSignal$1(this);
    this.callback = null;
    const headers2 = this.responseHeaders === "raw" ? util$4.parseRawHeaders(rawHeaders) : util$4.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      headers: headers2,
      socket,
      opaque,
      context
    });
  }
  onError(err) {
    const { callback, opaque } = this;
    removeSignal$1(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
};
function upgrade(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve2, reject) => {
      upgrade.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve2(data);
      });
    });
  }
  try {
    const upgradeHandler = new UpgradeHandler(opts, callback);
    this.dispatch({
      ...opts,
      method: opts.method || "GET",
      upgrade: opts.protocol || "Websocket"
    }, upgradeHandler);
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiUpgrade = upgrade;
var { InvalidArgumentError: InvalidArgumentError$2, RequestAbortedError, SocketError } = errors$1;
var { AsyncResource } = import_async_hooks.default;
var util$3 = util$h;
var { addSignal, removeSignal } = abortSignal;
var ConnectHandler = class extends AsyncResource {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$2("invalid opts");
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$2("invalid callback");
    }
    const { signal, opaque, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$2("signal must be an EventEmitter or EventTarget");
    }
    super("UNDICI_CONNECT");
    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.callback = callback;
    this.abort = null;
    addSignal(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders() {
    throw new SocketError("bad connect", null);
  }
  onUpgrade(statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;
    removeSignal(this);
    this.callback = null;
    const headers2 = this.responseHeaders === "raw" ? util$3.parseRawHeaders(rawHeaders) : util$3.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      statusCode,
      headers: headers2,
      socket,
      opaque,
      context
    });
  }
  onError(err) {
    const { callback, opaque } = this;
    removeSignal(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
};
function connect(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve2, reject) => {
      connect.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve2(data);
      });
    });
  }
  try {
    const connectHandler = new ConnectHandler(opts, callback);
    this.dispatch({ ...opts, method: "CONNECT" }, connectHandler);
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiConnect = connect;
api$1.request = apiRequest;
api$1.stream = apiStream;
api$1.pipeline = apiPipeline;
api$1.upgrade = apiUpgrade;
api$1.connect = apiConnect;
var globalDispatcher = Symbol.for("undici.globalDispatcher.1");
var { InvalidArgumentError: InvalidArgumentError$1 } = errors$1;
var Agent = agent;
if (getGlobalDispatcher$1() === void 0) {
  setGlobalDispatcher$1(new Agent());
}
function setGlobalDispatcher$1(agent2) {
  if (!agent2 || typeof agent2.dispatch !== "function") {
    throw new InvalidArgumentError$1("Argument agent must implement Agent");
  }
  Object.defineProperty(globalThis, globalDispatcher, {
    value: agent2,
    writable: true,
    enumerable: false,
    configurable: false
  });
}
function getGlobalDispatcher$1() {
  return globalThis[globalDispatcher];
}
var global2 = {
  setGlobalDispatcher: setGlobalDispatcher$1,
  getGlobalDispatcher: getGlobalDispatcher$1
};
var { validateHeaderName, validateHeaderValue } = import_http.default;
var { kHeadersList: kHeadersList$3 } = symbols$1;
var { kGuard: kGuard$3 } = symbols;
var { kEnumerableProperty: kEnumerableProperty$2 } = util$h;
var kHeadersMap = Symbol("headers map");
var kHeadersSortedMap = Symbol("headers map sorted");
function normalizeAndValidateHeaderName(name) {
  if (name === void 0) {
    throw new TypeError(`Header name ${name}`);
  }
  const normalizedHeaderName = name.toLocaleLowerCase();
  validateHeaderName(normalizedHeaderName);
  return normalizedHeaderName;
}
function normalizeAndValidateHeaderValue(name, value) {
  if (value === void 0) {
    throw new TypeError(value, name);
  }
  const normalizedHeaderValue = `${value}`.replace(/^[\n\t\r\x20]+|[\n\t\r\x20]+$/g, "");
  validateHeaderValue(name, normalizedHeaderValue);
  return normalizedHeaderValue;
}
function fill$1(headers2, object) {
  if (object[Symbol.iterator]) {
    for (let header of object) {
      if (!header[Symbol.iterator]) {
        throw new TypeError();
      }
      if (typeof header === "string") {
        throw new TypeError();
      }
      if (!Array.isArray(header)) {
        header = [...header];
      }
      if (header.length !== 2) {
        throw new TypeError();
      }
      headers2.append(header[0], header[1]);
    }
  } else if (object && typeof object === "object") {
    for (const header of Object.entries(object)) {
      headers2.append(header[0], header[1]);
    }
  } else {
    throw TypeError();
  }
}
var esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
function makeHeadersIterator(iterator) {
  const i2 = {
    next() {
      if (Object.getPrototypeOf(this) !== i2) {
        throw new TypeError("'next' called on an object that does not implement interface Headers Iterator.");
      }
      return iterator.next();
    },
    [Symbol.toStringTag]: "Headers Iterator"
  };
  Object.setPrototypeOf(i2, esIteratorPrototype);
  return Object.setPrototypeOf({}, i2);
}
var HeadersList$2 = class {
  constructor(init2) {
    if (init2 instanceof HeadersList$2) {
      this[kHeadersMap] = new Map(init2[kHeadersMap]);
      this[kHeadersSortedMap] = init2[kHeadersSortedMap];
    } else {
      this[kHeadersMap] = new Map(init2);
      this[kHeadersSortedMap] = null;
    }
  }
  clear() {
    this[kHeadersMap].clear();
    this[kHeadersSortedMap] = null;
  }
  append(name, value) {
    this[kHeadersSortedMap] = null;
    const normalizedName = normalizeAndValidateHeaderName(name);
    const normalizedValue = normalizeAndValidateHeaderValue(name, value);
    const exists = this[kHeadersMap].get(normalizedName);
    if (exists) {
      this[kHeadersMap].set(normalizedName, `${exists}, ${normalizedValue}`);
    } else {
      this[kHeadersMap].set(normalizedName, `${normalizedValue}`);
    }
  }
  set(name, value) {
    this[kHeadersSortedMap] = null;
    const normalizedName = normalizeAndValidateHeaderName(name);
    return this[kHeadersMap].set(normalizedName, value);
  }
  delete(name) {
    this[kHeadersSortedMap] = null;
    const normalizedName = normalizeAndValidateHeaderName(name);
    return this[kHeadersMap].delete(normalizedName);
  }
  get(name) {
    const normalizedName = normalizeAndValidateHeaderName(name);
    return this[kHeadersMap].get(normalizedName) ?? null;
  }
  has(name) {
    const normalizedName = normalizeAndValidateHeaderName(name);
    return this[kHeadersMap].has(normalizedName);
  }
  keys() {
    return this[kHeadersMap].keys();
  }
  values() {
    return this[kHeadersMap].values();
  }
  entries() {
    return this[kHeadersMap].entries();
  }
  [Symbol.iterator]() {
    return this[kHeadersMap][Symbol.iterator]();
  }
};
var Headers$4 = class {
  constructor(...args) {
    if (args[0] !== void 0 && !(typeof args[0] === "object" && args[0] != null) && !Array.isArray(args[0])) {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(record<ByteString, ByteString> or sequence<sequence<ByteString>>");
    }
    const init2 = args.length >= 1 ? args[0] ?? {} : {};
    this[kHeadersList$3] = new HeadersList$2();
    this[kGuard$3] = "none";
    fill$1(this, init2);
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  append(name, value) {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    if (arguments.length < 2) {
      throw new TypeError(`Failed to execute 'append' on 'Headers': 2 arguments required, but only ${arguments.length} present.`);
    }
    if (this[kGuard$3] === "immutable") {
      throw new TypeError("immutable");
    } else if (this[kGuard$3] === "request-no-cors")
      ;
    return this[kHeadersList$3].append(String(name), String(value));
  }
  delete(name) {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    if (arguments.length < 1) {
      throw new TypeError(`Failed to execute 'delete' on 'Headers': 1 argument required, but only ${arguments.length} present.`);
    }
    if (this[kGuard$3] === "immutable") {
      throw new TypeError("immutable");
    } else if (this[kGuard$3] === "request-no-cors")
      ;
    return this[kHeadersList$3].delete(String(name));
  }
  get(name) {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    if (arguments.length < 1) {
      throw new TypeError(`Failed to execute 'get' on 'Headers': 1 argument required, but only ${arguments.length} present.`);
    }
    return this[kHeadersList$3].get(String(name));
  }
  has(name) {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    if (arguments.length < 1) {
      throw new TypeError(`Failed to execute 'has' on 'Headers': 1 argument required, but only ${arguments.length} present.`);
    }
    return this[kHeadersList$3].has(String(name));
  }
  set(name, value) {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    if (arguments.length < 2) {
      throw new TypeError(`Failed to execute 'set' on 'Headers': 2 arguments required, but only ${arguments.length} present.`);
    }
    if (this[kGuard$3] === "immutable") {
      throw new TypeError("immutable");
    } else if (this[kGuard$3] === "request-no-cors")
      ;
    return this[kHeadersList$3].set(String(name), String(value));
  }
  get [kHeadersSortedMap]() {
    this[kHeadersList$3][kHeadersSortedMap] ??= new Map([...this[kHeadersList$3]].sort((a, b) => a[0] < b[0] ? -1 : 1));
    return this[kHeadersList$3][kHeadersSortedMap];
  }
  keys() {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    return makeHeadersIterator(this[kHeadersSortedMap].keys());
  }
  values() {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    return makeHeadersIterator(this[kHeadersSortedMap].values());
  }
  entries() {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    return makeHeadersIterator(this[kHeadersSortedMap].entries());
  }
  forEach(callbackFn, thisArg = globalThis) {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    if (arguments.length < 1) {
      throw new TypeError(`Failed to execute 'forEach' on 'Headers': 1 argument required, but only ${arguments.length} present.`);
    }
    if (typeof callbackFn !== "function") {
      throw new TypeError("Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'.");
    }
    for (const [key2, value] of this) {
      callbackFn.apply(thisArg, [value, key2, this]);
    }
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (!(this instanceof Headers$4)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kHeadersList$3];
  }
};
Headers$4.prototype[Symbol.iterator] = Headers$4.prototype.entries;
Object.defineProperties(Headers$4.prototype, {
  append: kEnumerableProperty$2,
  delete: kEnumerableProperty$2,
  get: kEnumerableProperty$2,
  has: kEnumerableProperty$2,
  set: kEnumerableProperty$2,
  keys: kEnumerableProperty$2,
  values: kEnumerableProperty$2,
  entries: kEnumerableProperty$2,
  forEach: kEnumerableProperty$2
});
var headers = {
  fill: fill$1,
  Headers: Headers$4,
  HeadersList: HeadersList$2,
  normalizeAndValidateHeaderName,
  normalizeAndValidateHeaderValue
};
var { Headers: Headers$3, HeadersList: HeadersList$1, fill } = headers;
var { AbortError: AbortError$1 } = errors$1;
var { extractBody: extractBody$2, cloneBody: cloneBody$1, mixinBody: mixinBody$1 } = body;
var util$2 = util$h;
var { kEnumerableProperty: kEnumerableProperty$1 } = util$2;
var { responseURL, isValidReasonPhrase, toUSVString: toUSVString$1, isCancelled: isCancelled$1, isAborted: isAborted$1, serializeJavascriptValueToJSONString } = util$g;
var {
  redirectStatus: redirectStatus$1,
  nullBodyStatus: nullBodyStatus$1
} = constants$2;
var { kState: kState$2, kHeaders: kHeaders$2, kGuard: kGuard$2, kRealm: kRealm$2 } = symbols;
var { kHeadersList: kHeadersList$2 } = symbols$1;
var assert$3 = import_assert.default;
var Response$2 = class {
  static error() {
    const relevantRealm = { settingsObject: {} };
    const responseObject = new Response$2();
    responseObject[kState$2] = makeNetworkError$1();
    responseObject[kRealm$2] = relevantRealm;
    responseObject[kHeaders$2][kHeadersList$2] = responseObject[kState$2].headersList;
    responseObject[kHeaders$2][kGuard$2] = "immutable";
    responseObject[kHeaders$2][kRealm$2] = relevantRealm;
    return responseObject;
  }
  static json(data, init2 = {}) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'json' on 'Response': 1 argument required, but 0 present.");
    }
    if (init2 === null || typeof init2 !== "object") {
      throw new TypeError(`Failed to execute 'json' on 'Response': init must be a RequestInit, found ${typeof init2}.`);
    }
    init2 = {
      status: 200,
      statusText: "",
      headers: new HeadersList$1(),
      ...init2
    };
    const bytes = new TextEncoder("utf-8").encode(serializeJavascriptValueToJSONString(data));
    const body2 = extractBody$2(bytes);
    const relevantRealm = { settingsObject: {} };
    const responseObject = new Response$2();
    responseObject[kRealm$2] = relevantRealm;
    responseObject[kHeaders$2][kGuard$2] = "response";
    responseObject[kHeaders$2][kRealm$2] = relevantRealm;
    initializeResponse(responseObject, init2, { body: body2[0], type: "application/json" });
    return responseObject;
  }
  static redirect(...args) {
    const relevantRealm = { settingsObject: {} };
    if (args.length < 1) {
      throw new TypeError(`Failed to execute 'redirect' on 'Response': 1 argument required, but only ${args.length} present.`);
    }
    const status = args.length >= 2 ? args[1] : 302;
    const url = toUSVString$1(args[0]);
    let parsedURL;
    try {
      parsedURL = new URL(url);
    } catch (err) {
      throw Object.assign(new TypeError("Failed to parse URL from " + url), {
        cause: err
      });
    }
    if (!redirectStatus$1.includes(status)) {
      throw new RangeError("Invalid status code");
    }
    const responseObject = new Response$2();
    responseObject[kRealm$2] = relevantRealm;
    responseObject[kHeaders$2][kGuard$2] = "immutable";
    responseObject[kHeaders$2][kRealm$2] = relevantRealm;
    responseObject[kState$2].status = status;
    const value = parsedURL.toString();
    responseObject[kState$2].headersList.append("location", value);
    return responseObject;
  }
  constructor(...args) {
    if (args.length >= 1 && typeof args[1] !== "object" && args[1] !== void 0) {
      throw new TypeError("Failed to construct 'Request': cannot convert to dictionary.");
    }
    const body2 = args.length >= 1 ? args[0] : null;
    const init2 = args.length >= 2 ? args[1] ?? {} : {};
    this[kRealm$2] = { settingsObject: {} };
    this[kState$2] = makeResponse$1({});
    this[kHeaders$2] = new Headers$3();
    this[kHeaders$2][kGuard$2] = "response";
    this[kHeaders$2][kHeadersList$2] = this[kState$2].headersList;
    this[kHeaders$2][kRealm$2] = this[kRealm$2];
    let bodyWithType = null;
    if (body2 != null) {
      const [extractedBody, type] = extractBody$2(body2);
      bodyWithType = { body: extractedBody, type };
    }
    initializeResponse(this, init2, bodyWithType);
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  get type() {
    if (!(this instanceof Response$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$2].type;
  }
  get url() {
    if (!(this instanceof Response$2)) {
      throw new TypeError("Illegal invocation");
    }
    let url = responseURL(this[kState$2]);
    if (url == null) {
      return "";
    }
    if (url.hash) {
      url = new URL(url);
      url.hash = "";
    }
    return url.toString();
  }
  get redirected() {
    if (!(this instanceof Response$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$2].urlList.length > 1;
  }
  get status() {
    if (!(this instanceof Response$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$2].status;
  }
  get ok() {
    if (!(this instanceof Response$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$2].status >= 200 && this[kState$2].status <= 299;
  }
  get statusText() {
    if (!(this instanceof Response$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$2].statusText;
  }
  get headers() {
    if (!(this instanceof Response$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kHeaders$2];
  }
  clone() {
    if (!(this instanceof Response$2)) {
      throw new TypeError("Illegal invocation");
    }
    if (this.bodyUsed || this.body && this.body.locked) {
      throw new TypeError();
    }
    const clonedResponse = cloneResponse(this[kState$2]);
    const clonedResponseObject = new Response$2();
    clonedResponseObject[kState$2] = clonedResponse;
    clonedResponseObject[kRealm$2] = this[kRealm$2];
    clonedResponseObject[kHeaders$2][kHeadersList$2] = clonedResponse.headersList;
    clonedResponseObject[kHeaders$2][kGuard$2] = this[kHeaders$2][kGuard$2];
    clonedResponseObject[kHeaders$2][kRealm$2] = this[kHeaders$2][kRealm$2];
    return clonedResponseObject;
  }
};
mixinBody$1(Response$2.prototype);
Object.defineProperties(Response$2.prototype, {
  type: kEnumerableProperty$1,
  url: kEnumerableProperty$1,
  status: kEnumerableProperty$1,
  ok: kEnumerableProperty$1,
  redirected: kEnumerableProperty$1,
  statusText: kEnumerableProperty$1,
  headers: kEnumerableProperty$1,
  clone: kEnumerableProperty$1
});
function cloneResponse(response2) {
  if (response2.internalResponse) {
    return filterResponse$1(cloneResponse(response2.internalResponse), response2.type);
  }
  const newResponse = makeResponse$1({ ...response2, body: null });
  if (response2.body != null) {
    newResponse.body = cloneBody$1(response2.body);
  }
  return newResponse;
}
function makeResponse$1(init2) {
  return {
    aborted: false,
    rangeRequested: false,
    timingAllowPassed: false,
    requestIncludesCredentials: false,
    type: "default",
    status: 200,
    timingInfo: null,
    cacheState: "",
    statusText: "",
    ...init2,
    headersList: init2.headersList ? new HeadersList$1(init2.headersList) : new HeadersList$1(),
    urlList: init2.urlList ? [...init2.urlList] : []
  };
}
function makeNetworkError$1(reason) {
  return makeResponse$1({
    type: "error",
    status: 0,
    error: reason instanceof Error ? reason : new Error(reason ? String(reason) : reason, {
      cause: reason instanceof Error ? reason : void 0
    }),
    aborted: reason && reason.name === "AbortError"
  });
}
function makeFilteredResponse(response2, state) {
  state = {
    internalResponse: response2,
    ...state
  };
  return new Proxy(response2, {
    get(target, p) {
      return p in state ? state[p] : target[p];
    },
    set(target, p, value) {
      assert$3(!(p in state));
      target[p] = value;
      return true;
    }
  });
}
function filterResponse$1(response2, type) {
  if (type === "basic") {
    return makeFilteredResponse(response2, {
      type: "basic",
      headersList: response2.headersList
    });
  } else if (type === "cors") {
    return makeFilteredResponse(response2, {
      type: "cors",
      headersList: response2.headersList
    });
  } else if (type === "opaque") {
    return makeFilteredResponse(response2, {
      type: "opaque",
      urlList: Object.freeze([]),
      status: 0,
      statusText: "",
      body: null
    });
  } else if (type === "opaqueredirect") {
    return makeFilteredResponse(response2, {
      type: "opaqueredirect",
      status: 0,
      statusText: "",
      headersList: [],
      body: null
    });
  } else {
    assert$3(false);
  }
}
function makeAppropriateNetworkError$1(fetchParams) {
  assert$3(isCancelled$1(fetchParams));
  return isAborted$1(fetchParams) ? makeNetworkError$1(new AbortError$1()) : makeNetworkError$1(fetchParams.controller.terminated.reason);
}
function initializeResponse(response2, init2, body2) {
  if (init2.status != null && (init2.status < 200 || init2.status > 599)) {
    throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
  }
  if ("statusText" in init2 && init2.statusText != null) {
    if (!isValidReasonPhrase(String(init2.statusText))) {
      throw new TypeError("Invalid statusText");
    }
  }
  if ("status" in init2 && init2.status != null) {
    response2[kState$2].status = init2.status;
  }
  if ("statusText" in init2 && init2.statusText != null) {
    response2[kState$2].statusText = init2.statusText;
  }
  if ("headers" in init2 && init2.headers != null) {
    fill(response2[kState$2].headersList, init2.headers);
  }
  if (body2) {
    if (nullBodyStatus$1.includes(response2.status)) {
      throw new TypeError();
    }
    response2[kState$2].body = body2.body;
    if (body2.type != null && !response2[kState$2].headersList.has("Content-Type")) {
      response2[kState$2].headersList.append("content-type", body2.type);
    }
  }
}
var response = {
  makeNetworkError: makeNetworkError$1,
  makeResponse: makeResponse$1,
  makeAppropriateNetworkError: makeAppropriateNetworkError$1,
  filterResponse: filterResponse$1,
  Response: Response$2
};
var { extractBody: extractBody$1, mixinBody, cloneBody } = body;
var { Headers: Headers$2, fill: fillHeaders, HeadersList } = headers;
var util$1 = util$h;
var {
  isValidHTTPToken,
  sameOrigin: sameOrigin$1,
  toUSVString,
  normalizeMethod
} = util$g;
var {
  forbiddenMethods,
  corsSafeListedMethods,
  referrerPolicy,
  requestRedirect,
  requestMode,
  requestCredentials,
  requestCache
} = constants$2;
var { kEnumerableProperty } = util$1;
var { kHeaders: kHeaders$1, kSignal, kState: kState$1, kGuard: kGuard$1, kRealm: kRealm$1 } = symbols;
var { kHeadersList: kHeadersList$1 } = symbols$1;
var assert$2 = import_assert.default;
var TransformStream$1;
var kInit = Symbol("init");
var requestFinalizer = new FinalizationRegistry(({ signal, abort: abort2 }) => {
  signal.removeEventListener("abort", abort2);
});
var Request$2 = class {
  constructor(...args) {
    if (args[0] === kInit) {
      return;
    }
    if (args.length < 1) {
      throw new TypeError(`Failed to construct 'Request': 1 argument required, but only ${args.length} present.`);
    }
    if (args.length >= 1 && typeof args[1] !== "object" && args[1] !== void 0) {
      throw new TypeError("Failed to construct 'Request': cannot convert to dictionary.");
    }
    const input = args[0] instanceof Request$2 ? args[0] : toUSVString(args[0]);
    const init2 = args.length >= 1 ? args[1] ?? {} : {};
    this[kRealm$1] = { settingsObject: {} };
    let request2 = null;
    let fallbackMode = null;
    const baseUrl = this[kRealm$1].settingsObject.baseUrl;
    let signal = null;
    if (typeof input === "string") {
      let parsedURL;
      try {
        parsedURL = new URL(input, baseUrl);
      } catch (err) {
        throw new TypeError("Failed to parse URL from " + input, { cause: err });
      }
      if (parsedURL.username || parsedURL.password) {
        throw new TypeError("Request cannot be constructed from a URL that includes credentials: " + input);
      }
      request2 = makeRequest$1({ urlList: [parsedURL] });
      fallbackMode = "cors";
    } else {
      assert$2(input instanceof Request$2);
      request2 = input[kState$1];
      signal = input[kSignal];
    }
    const origin = this[kRealm$1].settingsObject.origin;
    let window2 = "client";
    if (request2.window?.constructor?.name === "EnvironmentSettingsObject" && sameOrigin$1(request2.window, origin)) {
      window2 = request2.window;
    }
    if (init2.window !== void 0 && init2.window != null) {
      throw new TypeError(`'window' option '${window2}' must be null`);
    }
    if (init2.window !== void 0) {
      window2 = "no-window";
    }
    request2 = makeRequest$1({
      method: request2.method,
      headersList: request2.headersList,
      unsafeRequest: request2.unsafeRequest,
      client: this[kRealm$1].settingsObject,
      window: window2,
      priority: request2.priority,
      origin: request2.origin,
      referrer: request2.referrer,
      referrerPolicy: request2.referrerPolicy,
      mode: request2.mode,
      credentials: request2.credentials,
      cache: request2.cache,
      redirect: request2.redirect,
      integrity: request2.integrity,
      keepalive: request2.keepalive,
      reloadNavigation: request2.reloadNavigation,
      historyNavigation: request2.historyNavigation,
      urlList: [...request2.urlList]
    });
    if (Object.keys(init2).length > 0) {
      if (request2.mode === "navigate") {
        request2.mode = "same-origin";
      }
      request2.reloadNavigation = false;
      request2.historyNavigation = false;
      request2.origin = "client";
      request2.referrer = "client";
      request2.referrerPolicy = "";
      request2.url = request2.urlList[request2.urlList.length - 1];
      request2.urlList = [request2.url];
    }
    if (init2.referrer !== void 0) {
      const referrer = init2.referrer;
      if (referrer === "") {
        request2.referrer = "no-referrer";
      } else {
        let parsedReferrer;
        try {
          parsedReferrer = new URL(referrer, baseUrl);
        } catch (err) {
          throw new TypeError(`Referrer "${referrer}" is not a valid URL.`, { cause: err });
        }
        request2.referrer = parsedReferrer;
      }
    }
    if (init2.referrerPolicy !== void 0) {
      request2.referrerPolicy = init2.referrerPolicy;
      if (!referrerPolicy.includes(request2.referrerPolicy)) {
        throw new TypeError(`Failed to construct 'Request': The provided value '${request2.referrerPolicy}' is not a valid enum value of type ReferrerPolicy.`);
      }
    }
    let mode;
    if (init2.mode !== void 0) {
      mode = init2.mode;
      if (!requestMode.includes(mode)) {
        throw new TypeError(`Failed to construct 'Request': The provided value '${request2.mode}' is not a valid enum value of type RequestMode.`);
      }
    } else {
      mode = fallbackMode;
    }
    if (mode === "navigate") {
      throw new TypeError();
    }
    if (mode != null) {
      request2.mode = mode;
    }
    if (init2.credentials !== void 0) {
      request2.credentials = init2.credentials;
      if (!requestCredentials.includes(request2.credentials)) {
        throw new TypeError(`Failed to construct 'Request': The provided value '${request2.credentials}' is not a valid enum value of type RequestCredentials.`);
      }
    }
    if (init2.cache !== void 0) {
      request2.cache = init2.cache;
      if (!requestCache.includes(request2.cache)) {
        throw new TypeError(`Failed to construct 'Request': The provided value '${request2.cache}' is not a valid enum value of type RequestCache.`);
      }
    }
    if (request2.cache === "only-if-cached" && request2.mode !== "same-origin") {
      throw new TypeError("'only-if-cached' can be set only with 'same-origin' mode");
    }
    if (init2.redirect !== void 0) {
      request2.redirect = init2.redirect;
      if (!requestRedirect.includes(request2.redirect)) {
        throw new TypeError(`Failed to construct 'Request': The provided value '${request2.redirect}' is not a valid enum value of type RequestRedirect.`);
      }
    }
    if (init2.integrity !== void 0 && init2.integrity != null) {
      request2.integrity = String(init2.integrity);
    }
    if (init2.keepalive !== void 0) {
      request2.keepalive = Boolean(init2.keepalive);
    }
    if (init2.method !== void 0) {
      let method = init2.method;
      if (!isValidHTTPToken(init2.method)) {
        throw TypeError(`'${init2.method}' is not a valid HTTP method.`);
      }
      if (forbiddenMethods.indexOf(method.toUpperCase()) !== -1) {
        throw TypeError(`'${init2.method}' HTTP method is unsupported.`);
      }
      method = normalizeMethod(init2.method);
      request2.method = method;
    }
    if (init2.signal !== void 0) {
      signal = init2.signal;
    }
    this[kState$1] = request2;
    const ac = new AbortController();
    this[kSignal] = ac.signal;
    this[kSignal][kRealm$1] = this[kRealm$1];
    if (signal != null) {
      if (!signal || typeof signal.aborted !== "boolean" || typeof signal.addEventListener !== "function") {
        throw new TypeError("Failed to construct 'Request': member signal is not of type AbortSignal.");
      }
      if (signal.aborted) {
        ac.abort();
      } else {
        const abort2 = () => ac.abort();
        signal.addEventListener("abort", abort2, { once: true });
        requestFinalizer.register(this, { signal, abort: abort2 });
      }
    }
    this[kHeaders$1] = new Headers$2();
    this[kHeaders$1][kHeadersList$1] = request2.headersList;
    this[kHeaders$1][kGuard$1] = "request";
    this[kHeaders$1][kRealm$1] = this[kRealm$1];
    if (mode === "no-cors") {
      if (!corsSafeListedMethods.includes(request2.method)) {
        throw new TypeError(`'${request2.method} is unsupported in no-cors mode.`);
      }
      this[kHeaders$1][kGuard$1] = "request-no-cors";
    }
    if (Object.keys(init2).length !== 0) {
      let headers2 = new Headers$2(this[kHeaders$1]);
      if (init2.headers !== void 0) {
        headers2 = init2.headers;
      }
      this[kHeaders$1][kHeadersList$1].clear();
      if (headers2.constructor.name === "Headers") {
        for (const [key2, val] of headers2) {
          this[kHeaders$1].append(key2, val);
        }
      } else {
        fillHeaders(this[kHeaders$1], headers2);
      }
    }
    const inputBody = input instanceof Request$2 ? input[kState$1].body : null;
    if ((init2.body !== void 0 && init2.body != null || inputBody != null) && (request2.method === "GET" || request2.method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body.");
    }
    let initBody = null;
    if (init2.body !== void 0 && init2.body != null) {
      const [extractedBody, contentType] = extractBody$1(init2.body, request2.keepalive);
      initBody = extractedBody;
      if (contentType && !this[kHeaders$1].has("content-type")) {
        this[kHeaders$1].append("content-type", contentType);
      }
    }
    const inputOrInitBody = initBody ?? inputBody;
    if (inputOrInitBody != null && inputOrInitBody.source == null) {
      if (request2.mode !== "same-origin" && request2.mode !== "cors") {
        throw new TypeError('If request is made from ReadableStream, mode should be "same-origin" or "cors"');
      }
      request2.useCORSPreflightFlag = true;
    }
    let finalBody = inputOrInitBody;
    if (initBody == null && inputBody != null) {
      if (util$1.isDisturbed(inputBody.stream) || inputBody.stream.locked) {
        throw new TypeError("Cannot construct a Request with a Request object that has already been used.");
      }
      if (!TransformStream$1) {
        TransformStream$1 = import_web.default.TransformStream;
      }
      const identityTransform = new TransformStream$1();
      inputBody.stream.pipeThrough(identityTransform);
      finalBody = {
        source: inputBody.source,
        length: inputBody.length,
        stream: identityTransform.readable
      };
    }
    this[kState$1].body = finalBody;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  get method() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].method;
  }
  get url() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].url.toString();
  }
  get headers() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kHeaders$1];
  }
  get destination() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].destination;
  }
  get referrer() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    if (this[kState$1].referrer === "no-referrer") {
      return "";
    }
    if (this[kState$1].referrer === "client") {
      return "about:client";
    }
    return this[kState$1].referrer.toString();
  }
  get referrerPolicy() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].referrerPolicy;
  }
  get mode() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].mode;
  }
  get credentials() {
    return this[kState$1].credentials;
  }
  get cache() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].cache;
  }
  get redirect() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].redirect;
  }
  get integrity() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].integrity;
  }
  get keepalive() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].keepalive;
  }
  get isReloadNavigation() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].reloadNavigation;
  }
  get isHistoryNavigation() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kState$1].historyNavigation;
  }
  get signal() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    return this[kSignal];
  }
  clone() {
    if (!(this instanceof Request$2)) {
      throw new TypeError("Illegal invocation");
    }
    if (this.bodyUsed || this.body?.locked) {
      throw new TypeError("unusable");
    }
    const clonedRequest = cloneRequest(this[kState$1]);
    const clonedRequestObject = new Request$2(kInit);
    clonedRequestObject[kState$1] = clonedRequest;
    clonedRequestObject[kRealm$1] = this[kRealm$1];
    clonedRequestObject[kHeaders$1] = new Headers$2();
    clonedRequestObject[kHeaders$1][kHeadersList$1] = clonedRequest.headersList;
    clonedRequestObject[kHeaders$1][kGuard$1] = this[kHeaders$1][kGuard$1];
    clonedRequestObject[kHeaders$1][kRealm$1] = this[kHeaders$1][kRealm$1];
    const ac = new AbortController();
    if (this.signal.aborted) {
      ac.abort();
    } else {
      this.signal.addEventListener("abort", function() {
        ac.abort();
      }, { once: true });
    }
    clonedRequestObject[kSignal] = ac.signal;
    return clonedRequestObject;
  }
};
mixinBody(Request$2.prototype);
function makeRequest$1(init2) {
  const request2 = {
    method: "GET",
    localURLsOnly: false,
    unsafeRequest: false,
    body: null,
    client: null,
    reservedClient: null,
    replacesClientId: "",
    window: "client",
    keepalive: false,
    serviceWorkers: "all",
    initiator: "",
    destination: "",
    priority: null,
    origin: "client",
    policyContainer: "client",
    referrer: "client",
    referrerPolicy: "",
    mode: "no-cors",
    useCORSPreflightFlag: false,
    credentials: "same-origin",
    useCredentials: false,
    cache: "default",
    redirect: "follow",
    integrity: "",
    cryptoGraphicsNonceMetadata: "",
    parserMetadata: "",
    reloadNavigation: false,
    historyNavigation: false,
    userActivation: false,
    taintedOrigin: false,
    redirectCount: 0,
    responseTainting: "basic",
    preventNoCacheCacheControlHeaderModification: false,
    done: false,
    timingAllowFailed: false,
    ...init2,
    headersList: init2.headersList ? new HeadersList(init2.headersList) : new HeadersList()
  };
  request2.url = request2.urlList[0];
  return request2;
}
function cloneRequest(request2) {
  const newRequest = makeRequest$1({ ...request2, body: null });
  if (request2.body != null) {
    newRequest.body = cloneBody(request2.body);
  }
  return newRequest;
}
Object.defineProperties(Request$2.prototype, {
  method: kEnumerableProperty,
  url: kEnumerableProperty,
  headers: kEnumerableProperty,
  redirect: kEnumerableProperty,
  clone: kEnumerableProperty,
  signal: kEnumerableProperty
});
var request = { Request: Request$2, makeRequest: makeRequest$1 };
var assert$1 = import_assert.default;
var { atob } = import_buffer.default;
var encoder = new TextEncoder();
function dataURLProcessor$1(dataURL2) {
  assert$1(dataURL2.protocol === "data:");
  let input = URLSerializer(dataURL2, true);
  input = input.slice(5);
  const position = { position: 0 };
  let mimeType = collectASequenceOfCodePoints((char) => char !== ",", input, position);
  const mimeTypeLength = mimeType.length;
  mimeType = mimeType.replace(/^(\u0020)+|(\u0020)+$/g, "");
  if (position.position >= input.length) {
    return "failure";
  }
  position.position++;
  const encodedBody = input.slice(mimeTypeLength + 1);
  let body2 = stringPercentDecode(encodedBody);
  if (/;(\u0020){0,}base64$/i.test(mimeType)) {
    const stringBody = decodeURIComponent(new TextDecoder("utf-8").decode(body2));
    body2 = forgivingBase64(stringBody);
    if (body2 === "failure") {
      return "failure";
    }
    mimeType = mimeType.slice(0, -6);
    mimeType = mimeType.replace(/(\u0020)+$/, "");
    mimeType = mimeType.slice(0, -1);
  }
  if (mimeType.startsWith(";")) {
    mimeType = "text/plain" + mimeType;
  }
  let mimeTypeRecord = parseMIMEType(mimeType);
  if (mimeTypeRecord === "failure") {
    mimeTypeRecord = parseMIMEType("text/plain;charset=US-ASCII");
  }
  return { mimeType: mimeTypeRecord, body: body2 };
}
function URLSerializer(url, excludeFragment = false) {
  let output = url.protocol;
  if (url.host.length > 0) {
    output += "//";
    if (url.username.length > 0 || url.password.length > 0) {
      output += url.username;
      if (url.password.length > 0) {
        output += ":" + url.password;
      }
      output += "@";
    }
    output += decodeURIComponent(url.host);
    if (url.port.length > 0) {
      output += ":" + url.port;
    }
  }
  if (url.host.length === 0 && url.pathname.length > 1 && url.href.slice(url.protocol.length + 1)[0] === ".") {
    output += "/.";
  }
  output += url.pathname;
  if (url.search.length > 0) {
    output += url.search;
  }
  if (excludeFragment === false && url.hash.length > 0) {
    output += url.hash;
  }
  return output;
}
function collectASequenceOfCodePoints(condition, input, position) {
  let result = "";
  while (position.position < input.length && condition(input[position.position])) {
    result += input[position.position];
    position.position++;
  }
  return result;
}
function stringPercentDecode(input) {
  const bytes = encoder.encode(input);
  return percentDecode(bytes);
}
function percentDecode(input) {
  const output = [];
  for (let i2 = 0; i2 < input.length; i2++) {
    const byte = input[i2];
    if (byte !== 37) {
      output.push(byte);
    } else if (byte === 37 && !/^[0-9A-Fa-f]{2}$/i.test(String.fromCharCode(input[i2 + 1], input[i2 + 2]))) {
      output.push(37);
    } else {
      const nextTwoBytes = String.fromCharCode(input[i2 + 1], input[i2 + 2]);
      const bytePoint = Number.parseInt(nextTwoBytes, 16);
      output.push(bytePoint);
      i2 += 2;
    }
  }
  return Uint8Array.of(...output);
}
function parseMIMEType(input) {
  input = input.trim();
  const position = { position: 0 };
  const type = collectASequenceOfCodePoints((char) => char !== "/", input, position);
  if (type.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(type)) {
    return "failure";
  }
  if (position.position > input.length) {
    return "failure";
  }
  position.position++;
  let subtype = collectASequenceOfCodePoints((char) => char !== ";", input, position);
  subtype = subtype.trim();
  if (subtype.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(subtype)) {
    return "failure";
  }
  const mimeType = {
    type: type.toLowerCase(),
    subtype: subtype.toLowerCase(),
    parameters: /* @__PURE__ */ new Map()
  };
  while (position.position < input.length) {
    position.position++;
    collectASequenceOfCodePoints((char) => /(\u000A|\u000D|\u0009|\u0020)/.test(char), input, position);
    let parameterName = collectASequenceOfCodePoints((char) => char !== ";" && char !== "=", input, position);
    parameterName = parameterName.toLowerCase();
    if (position.position < input.length) {
      if (input[position.position] === ";") {
        continue;
      }
      position.position++;
    }
    if (position.position > input.length) {
      break;
    }
    let parameterValue = null;
    if (input[position.position] === '"') {
      parameterValue = collectAnHTTPQuotedString(input, position);
      collectASequenceOfCodePoints((char) => char !== ";", input, position);
    } else {
      parameterValue = collectASequenceOfCodePoints((char) => char !== ";", input, position);
      parameterValue = parameterValue.trim();
      if (parameterValue.length === 0) {
        continue;
      }
    }
    if (parameterName.length !== 0 && /^[!#$%&'*+-.^_|~A-z0-9]+$/.test(parameterName) && !/^(\u0009|\x{0020}-\x{007E}|\x{0080}-\x{00FF})+$/.test(parameterValue) && !mimeType.parameters.has(parameterName)) {
      mimeType.parameters.set(parameterName, parameterValue);
    }
  }
  return mimeType;
}
function forgivingBase64(data) {
  data = data.replace(/[\u0009\u000A\u000C\u000D\u0020]/g, "");
  if (data.length % 4 === 0) {
    data = data.replace(/=?=$/, "");
  }
  if (data.length % 4 === 1) {
    return "failure";
  }
  if (/[^+/0-9A-Za-z]/.test(data)) {
    return "failure";
  }
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let byte = 0; byte < binary.length; byte++) {
    bytes[byte] = binary.charCodeAt(byte);
  }
  return bytes;
}
function collectAnHTTPQuotedString(input, position, extractValue) {
  const positionStart = position.position;
  let value = "";
  assert$1(input[position.position] === '"');
  position.position++;
  while (true) {
    value += collectASequenceOfCodePoints((char) => char !== '"' && char !== "\\", input, position);
    if (position.position >= input.length) {
      break;
    }
    const quoteOrBackslash = input[position.position];
    position.position++;
    if (quoteOrBackslash === "\\") {
      if (position.position >= input.length) {
        value += "\\";
        break;
      }
      value += input[position.position];
      position.position++;
    } else {
      assert$1(quoteOrBackslash === '"');
      break;
    }
  }
  if (extractValue) {
    return value;
  }
  return input.slice(positionStart, position.position);
}
var dataURL = {
  dataURLProcessor: dataURLProcessor$1,
  URLSerializer,
  collectASequenceOfCodePoints,
  stringPercentDecode,
  parseMIMEType,
  collectAnHTTPQuotedString
};
var {
  Response: Response$1,
  makeNetworkError,
  makeAppropriateNetworkError,
  filterResponse,
  makeResponse
} = response;
var { Headers: Headers$1 } = headers;
var { Request: Request$1, makeRequest } = request;
var zlib = import_zlib.default;
var {
  matchRequestIntegrity,
  makePolicyContainer,
  clonePolicyContainer,
  requestBadPort,
  TAOCheck,
  appendRequestOriginHeader,
  responseLocationURL,
  requestCurrentURL,
  setRequestReferrerPolicyOnRedirect,
  tryUpgradeRequestToAPotentiallyTrustworthyURL,
  createOpaqueTimingInfo,
  appendFetchMetadata,
  corsCheck,
  crossOriginResourcePolicyCheck,
  determineRequestsReferrer,
  coarsenedSharedCurrentTime,
  createDeferredPromise,
  isBlobLike,
  sameOrigin,
  isCancelled,
  isAborted
} = util$g;
var { kState, kHeaders, kGuard, kRealm } = symbols;
var { AbortError } = errors$1;
var assert = import_assert.default;
var { safelyExtractBody, extractBody } = body;
var {
  redirectStatus,
  nullBodyStatus,
  safeMethods,
  requestBodyHeader,
  subresource
} = constants$2;
var { kHeadersList } = symbols$1;
var EE = import_events.default;
var { Readable, pipeline } = import_stream.default;
var { isErrored, isReadable } = util$h;
var { dataURLProcessor } = dataURL;
var { TransformStream } = import_web.default;
var resolveObjectURL;
var ReadableStream2;
var Fetch = class extends EE {
  constructor(dispatcher2) {
    super();
    this.dispatcher = dispatcher2;
    this.connection = null;
    this.dump = false;
    this.state = "ongoing";
  }
  terminate(reason) {
    if (this.state !== "ongoing") {
      return;
    }
    this.state = "terminated";
    this.connection?.destroy(reason);
    this.emit("terminated", reason);
  }
  abort() {
    if (this.state !== "ongoing") {
      return;
    }
    const reason = new AbortError();
    this.state = "aborted";
    this.connection?.destroy(reason);
    this.emit("terminated", reason);
  }
};
async function fetch$1(...args) {
  if (args.length < 1) {
    throw new TypeError(`Failed to execute 'fetch' on 'Window': 1 argument required, but only ${args.length} present.`);
  }
  if (args.length >= 1 && typeof args[1] !== "object" && args[1] !== void 0) {
    throw new TypeError("Failed to execute 'fetch' on 'Window': cannot convert to dictionary.");
  }
  const resource = args[0];
  const init2 = args.length >= 1 ? args[1] ?? {} : {};
  const p = createDeferredPromise();
  const requestObject = new Request$1(resource, init2);
  const request2 = requestObject[kState];
  if (requestObject.signal.aborted) {
    abortFetch(p, request2, null);
    return p.promise;
  }
  const globalObject = request2.client.globalObject;
  if (globalObject?.constructor?.name === "ServiceWorkerGlobalScope") {
    request2.serviceWorkers = "none";
  }
  let responseObject = null;
  const relevantRealm = null;
  let locallyAborted = false;
  let controller = null;
  requestObject.signal.addEventListener("abort", () => {
    locallyAborted = true;
    abortFetch(p, request2, responseObject);
    if (controller != null) {
      controller.abort();
    }
  }, { once: true });
  const handleFetchDone = (response2) => finalizeAndReportTiming(response2);
  const processResponse = (response2) => {
    if (locallyAborted) {
      return;
    }
    if (response2.aborted) {
      abortFetch(p, request2, responseObject);
      return;
    }
    if (response2.type === "error") {
      p.reject(Object.assign(new TypeError("fetch failed"), { cause: response2.error }));
      return;
    }
    responseObject = new Response$1();
    responseObject[kState] = response2;
    responseObject[kRealm] = relevantRealm;
    responseObject[kHeaders][kHeadersList] = response2.headersList;
    responseObject[kHeaders][kGuard] = "immutable";
    responseObject[kHeaders][kRealm] = relevantRealm;
    p.resolve(responseObject);
  };
  controller = fetching({
    request: request2,
    processResponseEndOfBody: handleFetchDone,
    processResponse,
    dispatcher: this
  });
  return p.promise;
}
function finalizeAndReportTiming(response2, initiatorType) {
  if (response2.type === "error" && response2.aborted) {
    return;
  }
  if (!response2.urlList?.length) {
    return;
  }
  const originalURL = response2.urlList[0];
  let timingInfo = response2.timingInfo;
  response2.cacheState;
  if (!/^https?:/.test(originalURL.protocol)) {
    return;
  }
  if (timingInfo === null) {
    return;
  }
  if (!timingInfo.timingAllowPassed) {
    timingInfo = createOpaqueTimingInfo({
      startTime: timingInfo.startTime
    });
  }
  response2.timingInfo.endTime = coarsenedSharedCurrentTime();
  response2.timingInfo = timingInfo;
}
function abortFetch(p, request2, responseObject) {
  const error2 = new AbortError();
  p.reject(error2);
  if (request2.body != null && isReadable(request2.body?.stream)) {
    request2.body.stream.cancel(error2).catch((err) => {
      if (err.code === "ERR_INVALID_STATE") {
        return;
      }
      throw err;
    });
  }
  if (responseObject == null) {
    return;
  }
  const response2 = responseObject[kState];
  if (response2.body != null && isReadable(response2.body?.stream)) {
    response2.body.stream.cancel(error2).catch((err) => {
      if (err.code === "ERR_INVALID_STATE") {
        return;
      }
      throw err;
    });
  }
}
function fetching({
  request: request2,
  processRequestBodyChunkLength,
  processRequestEndOfBody,
  processResponse,
  processResponseEndOfBody,
  processResponseConsumeBody,
  useParallelQueue = false,
  dispatcher: dispatcher2
}) {
  let taskDestination = null;
  let crossOriginIsolatedCapability = false;
  if (request2.client != null) {
    taskDestination = request2.client.globalObject;
    crossOriginIsolatedCapability = request2.client.crossOriginIsolatedCapability;
  }
  const currenTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
  const timingInfo = createOpaqueTimingInfo({
    startTime: currenTime
  });
  const fetchParams = {
    controller: new Fetch(dispatcher2),
    request: request2,
    timingInfo,
    processRequestBodyChunkLength,
    processRequestEndOfBody,
    processResponse,
    processResponseConsumeBody,
    processResponseEndOfBody,
    taskDestination,
    crossOriginIsolatedCapability
  };
  assert(!request2.body || request2.body.stream);
  if (request2.window === "client") {
    request2.window = request2.client?.globalObject?.constructor?.name === "Window" ? request2.client : "no-window";
  }
  if (request2.origin === "client") {
    request2.origin = request2.client?.origin;
  }
  if (request2.policyContainer === "client") {
    if (request2.client != null) {
      request2.policyContainer = clonePolicyContainer(request2.client.policyContainer);
    } else {
      request2.policyContainer = makePolicyContainer();
    }
  }
  if (!request2.headersList.has("accept")) {
    const value = "*/*";
    request2.headersList.append("accept", value);
  }
  if (!request2.headersList.has("accept-language")) {
    request2.headersList.append("accept-language", "*");
  }
  if (request2.priority === null)
    ;
  if (subresource.includes(request2.destination))
    ;
  mainFetch(fetchParams).catch((err) => {
    fetchParams.controller.terminate(err);
  });
  return fetchParams.controller;
}
async function mainFetch(fetchParams, recursive = false) {
  const request2 = fetchParams.request;
  let response2 = null;
  if (request2.localURLsOnly && !/^(about|blob|data):/.test(requestCurrentURL(request2).protocol)) {
    response2 = makeNetworkError("local URLs only");
  }
  tryUpgradeRequestToAPotentiallyTrustworthyURL(request2);
  if (requestBadPort(request2) === "blocked") {
    response2 = makeNetworkError("bad port");
  }
  if (request2.referrerPolicy === "") {
    request2.referrerPolicy = request2.policyContainer.referrerPolicy;
  }
  if (request2.referrer !== "no-referrer") {
    request2.referrer = determineRequestsReferrer(request2);
  }
  if (response2 === null) {
    response2 = await (async () => {
      const currentURL = requestCurrentURL(request2);
      if (sameOrigin(currentURL, request2.url) && request2.responseTainting === "basic" || currentURL.protocol === "data:" || (request2.mode === "navigate" || request2.mode === "websocket")) {
        request2.responseTainting = "basic";
        return await schemeFetch(fetchParams);
      }
      if (request2.mode === "same-origin") {
        return makeNetworkError('request mode cannot be "same-origin"');
      }
      if (request2.mode === "no-cors") {
        if (request2.redirect !== "follow") {
          return makeNetworkError('redirect mode cannot be "follow" for "no-cors" request');
        }
        request2.responseTainting = "opaque";
        return await schemeFetch(fetchParams);
      }
      if (!/^https?:/.test(requestCurrentURL(request2).protocol)) {
        return makeNetworkError("URL scheme must be a HTTP(S) scheme");
      }
      request2.responseTainting = "cors";
      return await httpFetch(fetchParams);
    })();
  }
  if (recursive) {
    return response2;
  }
  if (response2.status !== 0 && !response2.internalResponse) {
    if (request2.responseTainting === "cors")
      ;
    if (request2.responseTainting === "basic") {
      response2 = filterResponse(response2, "basic");
    } else if (request2.responseTainting === "cors") {
      response2 = filterResponse(response2, "cors");
    } else if (request2.responseTainting === "opaque") {
      response2 = filterResponse(response2, "opaque");
    } else {
      assert(false);
    }
  }
  let internalResponse = response2.status === 0 ? response2 : response2.internalResponse;
  if (internalResponse.urlList.length === 0) {
    internalResponse.urlList.push(...request2.urlList);
  }
  if (!request2.timingAllowFailed) {
    response2.timingAllowPassed = true;
  }
  if (response2.type === "opaque" && internalResponse.status === 206 && internalResponse.rangeRequested && !request2.headers.has("range")) {
    response2 = internalResponse = makeNetworkError();
  }
  if (response2.status !== 0 && (request2.method === "HEAD" || request2.method === "CONNECT" || nullBodyStatus.includes(internalResponse.status))) {
    internalResponse.body = null;
    fetchParams.controller.dump = true;
  }
  if (request2.integrity) {
    const processBodyError = (reason) => fetchFinale(fetchParams, makeNetworkError(reason));
    if (request2.responseTainting === "opaque" || response2.body == null) {
      processBodyError(response2.error);
      return;
    }
    const processBody = (bytes) => {
      if (!matchRequestIntegrity(request2, bytes)) {
        processBodyError("integrity mismatch");
        return;
      }
      response2.body = safelyExtractBody(bytes)[0];
      fetchFinale(fetchParams, response2);
    };
    try {
      processBody(await response2.arrayBuffer());
    } catch (err) {
      processBodyError(err);
    }
  } else {
    fetchFinale(fetchParams, response2);
  }
}
async function schemeFetch(fetchParams) {
  const { request: request2 } = fetchParams;
  const {
    protocol: scheme2,
    pathname: path
  } = requestCurrentURL(request2);
  switch (scheme2) {
    case "about:": {
      if (path === "blank") {
        const resp = makeResponse({
          statusText: "OK",
          headersList: [
            ["content-type", "text/html;charset=utf-8"]
          ]
        });
        resp.urlList = [new URL("about:blank")];
        return resp;
      }
      return makeNetworkError("invalid path called");
    }
    case "blob:": {
      resolveObjectURL = resolveObjectURL || import_buffer.default.resolveObjectURL;
      const currentURL = requestCurrentURL(request2);
      if (currentURL.search.length !== 0) {
        return makeNetworkError("NetworkError when attempting to fetch resource.");
      }
      const blob = resolveObjectURL(currentURL.toString());
      if (request2.method !== "GET" || !isBlobLike(blob)) {
        return makeNetworkError("invalid method");
      }
      const response2 = makeResponse({ statusText: "OK", urlList: [currentURL] });
      response2.headersList.set("content-length", `${blob.size}`);
      response2.headersList.set("content-type", blob.type);
      response2.body = extractBody(blob)[0];
      return response2;
    }
    case "data:": {
      const currentURL = requestCurrentURL(request2);
      const dataURLStruct = dataURLProcessor(currentURL);
      if (dataURLStruct === "failure") {
        return makeNetworkError("failed to fetch the data URL");
      }
      const { mimeType } = dataURLStruct;
      let contentType = `${mimeType.type}/${mimeType.subtype}`;
      const contentTypeParams = [];
      if (mimeType.parameters.size > 0) {
        contentType += ";";
      }
      for (const [key2, value] of mimeType.parameters) {
        if (value.length > 0) {
          contentTypeParams.push(`${key2}=${value}`);
        } else {
          contentTypeParams.push(key2);
        }
      }
      contentType += contentTypeParams.join(",");
      return makeResponse({
        statusText: "OK",
        headersList: [
          ["content-type", contentType]
        ],
        body: extractBody(dataURLStruct.body)[0]
      });
    }
    case "file:": {
      return makeNetworkError("not implemented... yet...");
    }
    case "http:":
    case "https:": {
      return await httpFetch(fetchParams).catch((err) => makeNetworkError(err));
    }
    default: {
      return makeNetworkError("unknown scheme");
    }
  }
}
function finalizeResponse(fetchParams, response2) {
  fetchParams.request.done = true;
  if (fetchParams.processResponseDone != null) {
    queueMicrotask(() => fetchParams.processResponseDone(response2));
  }
}
async function fetchFinale(fetchParams, response2) {
  if (response2.type === "error") {
    response2.urlList = [fetchParams.request.urlList[0]];
    response2.timingInfo = createOpaqueTimingInfo({
      startTime: fetchParams.timingInfo.startTime
    });
  }
  const processResponseEndOfBody = () => {
    fetchParams.request.done = true;
    if (fetchParams.processResponseEndOfBody != null) {
      queueMicrotask(() => fetchParams.processResponseEndOfBody(response2));
    }
  };
  if (fetchParams.processResponse != null) {
    queueMicrotask(() => fetchParams.processResponse(response2));
  }
  if (response2.body == null) {
    processResponseEndOfBody();
  } else {
    const identityTransformAlgorithm = (chunk, controller) => {
      controller.enqueue(chunk);
    };
    const transformStream = new TransformStream({
      start() {
      },
      transform: identityTransformAlgorithm,
      flush: processResponseEndOfBody
    });
    response2.body = { stream: response2.body.stream.pipeThrough(transformStream) };
  }
  if (fetchParams.processResponseConsumeBody != null) {
    const processBody = (nullOrBytes) => fetchParams.processResponseConsumeBody(response2, nullOrBytes);
    const processBodyError = (failure) => fetchParams.processResponseConsumeBody(response2, failure);
    if (response2.body == null) {
      queueMicrotask(() => processBody(null));
    } else {
      try {
        processBody(await response2.body.stream.arrayBuffer());
      } catch (err) {
        processBodyError(err);
      }
    }
  }
}
async function httpFetch(fetchParams) {
  const request2 = fetchParams.request;
  let response2 = null;
  let actualResponse = null;
  const timingInfo = fetchParams.timingInfo;
  if (request2.serviceWorkers === "all")
    ;
  if (response2 === null) {
    if (request2.redirect === "follow") {
      request2.serviceWorkers = "none";
    }
    actualResponse = response2 = await httpNetworkOrCacheFetch(fetchParams);
    if (request2.responseTainting === "cors" && corsCheck(request2, response2) === "failure") {
      return makeNetworkError("cors failure");
    }
    if (TAOCheck(request2, response2) === "failure") {
      request2.timingAllowFailed = true;
    }
  }
  if ((request2.responseTainting === "opaque" || response2.type === "opaque") && crossOriginResourcePolicyCheck(request2.origin, request2.client, request2.destination, actualResponse) === "blocked") {
    return makeNetworkError("blocked");
  }
  if (redirectStatus.includes(actualResponse.status)) {
    fetchParams.controller.connection.destroy();
    if (request2.redirect === "error") {
      response2 = makeNetworkError();
    } else if (request2.redirect === "manual") {
      response2 = actualResponse;
    } else if (request2.redirect === "follow") {
      response2 = await httpRedirectFetch(fetchParams, response2);
    } else {
      assert(false);
    }
  }
  response2.timingInfo = timingInfo;
  return response2;
}
async function httpRedirectFetch(fetchParams, response2) {
  const request2 = fetchParams.request;
  const actualResponse = response2.internalResponse ? response2.internalResponse : response2;
  let locationURL;
  try {
    locationURL = responseLocationURL(actualResponse, requestCurrentURL(request2).hash);
    if (locationURL == null) {
      return response2;
    }
  } catch (err) {
    return makeNetworkError(err);
  }
  if (!/^https?:/.test(locationURL.protocol)) {
    return makeNetworkError("URL scheme must be a HTTP(S) scheme");
  }
  if (request2.redirectCount === 20) {
    return makeNetworkError("redirect count exceeded");
  }
  request2.redirectCount += 1;
  if (request2.mode === "cors" && (locationURL.username || locationURL.password) && !sameOrigin(request2, locationURL)) {
    return makeNetworkError('cross origin not allowed for request mode "cors"');
  }
  if (request2.responseTainting === "cors" && (locationURL.username || locationURL.password)) {
    return makeNetworkError('URL cannot contain credentials for request mode "cors"');
  }
  if (actualResponse.status !== 303 && request2.body != null && request2.body.source == null) {
    return makeNetworkError();
  }
  if ([301, 302].includes(actualResponse.status) && request2.method === "POST" || actualResponse.status === 303 && !["GET", "HEADER"].includes(request2.method)) {
    request2.method = "GET";
    request2.body = null;
    for (const headerName of requestBodyHeader) {
      request2.headersList.delete(headerName);
    }
  }
  if (request2.body != null) {
    assert(request2.body.source);
    request2.body = safelyExtractBody(request2.body.source)[0];
  }
  const timingInfo = fetchParams.timingInfo;
  timingInfo.redirectEndTime = timingInfo.postRedirectStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
  if (timingInfo.redirectStartTime === 0) {
    timingInfo.redirectStartTime = timingInfo.startTime;
  }
  request2.urlList.push(locationURL);
  setRequestReferrerPolicyOnRedirect(request2, actualResponse);
  return mainFetch(fetchParams, true);
}
async function httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch = false, isNewConnectionFetch = false) {
  const request2 = fetchParams.request;
  let httpFetchParams = null;
  let httpRequest = null;
  let response2 = null;
  if (request2.window === "no-window" && request2.redirect === "error") {
    httpFetchParams = fetchParams;
    httpRequest = request2;
  } else {
    httpRequest = makeRequest(request2);
    httpFetchParams = { ...fetchParams };
    httpFetchParams.request = httpRequest;
  }
  const includeCredentials = request2.credentials === "include" || request2.credentials === "same-origin" && request2.responseTainting === "basic";
  const contentLength = httpRequest.body ? httpRequest.body.length : null;
  let contentLengthHeaderValue = null;
  if (httpRequest.body == null && ["POST", "PUT"].includes(httpRequest.method)) {
    contentLengthHeaderValue = "0";
  }
  if (contentLength != null) {
    contentLengthHeaderValue = String(contentLength);
  }
  if (contentLengthHeaderValue != null) {
    httpRequest.headersList.append("content-length", contentLengthHeaderValue);
  }
  if (contentLength != null && httpRequest.keepalive)
    ;
  if (httpRequest.referrer instanceof URL) {
    httpRequest.headersList.append("referer", httpRequest.referrer.href);
  }
  appendRequestOriginHeader(httpRequest);
  appendFetchMetadata(httpRequest);
  if (!httpRequest.headersList.has("user-agent")) {
    httpRequest.headersList.append("user-agent", "undici");
  }
  if (httpRequest.cache === "default" && (httpRequest.headersList.has("if-modified-since") || httpRequest.headersList.has("if-none-match") || httpRequest.headersList.has("if-unmodified-since") || httpRequest.headersList.has("if-match") || httpRequest.headersList.has("if-range"))) {
    httpRequest.cache = "no-store";
  }
  if (httpRequest.cache === "no-cache" && !httpRequest.preventNoCacheCacheControlHeaderModification && !httpRequest.headersList.has("cache-control")) {
    httpRequest.headersList.append("cache-control", "max-age=0");
  }
  if (httpRequest.cache === "no-store" || httpRequest.cache === "reload") {
    if (!httpRequest.headersList.has("pragma")) {
      httpRequest.headersList.append("pragma", "no-cache");
    }
    if (!httpRequest.headersList.has("cache-control")) {
      httpRequest.headersList.append("cache-control", "no-cache");
    }
  }
  if (httpRequest.headersList.has("range")) {
    httpRequest.headersList.append("accept-encoding", "identity");
  }
  if (!httpRequest.headersList.has("accept-encoding")) {
    if (/^https:/.test(requestCurrentURL(httpRequest).protocol)) {
      httpRequest.headersList.append("accept-encoding", "br, gzip, deflate");
    } else {
      httpRequest.headersList.append("accept-encoding", "gzip, deflate");
    }
  }
  {
    httpRequest.cache = "no-store";
  }
  if (httpRequest.mode !== "no-store" && httpRequest.mode !== "reload")
    ;
  if (response2 == null) {
    if (httpRequest.mode === "only-if-cached") {
      return makeNetworkError("only if cached");
    }
    const forwardResponse = await httpNetworkFetch(httpFetchParams);
    if (!safeMethods.includes(httpRequest.method) && forwardResponse.status >= 200 && forwardResponse.status <= 399)
      ;
    if (response2 == null) {
      response2 = forwardResponse;
    }
  }
  response2.urlList = [...httpRequest.urlList];
  if (httpRequest.headersList.has("range")) {
    response2.rangeRequested = true;
  }
  response2.requestIncludesCredentials = includeCredentials;
  if (response2.status === 407) {
    if (request2.window === "no-window") {
      return makeNetworkError();
    }
    if (isCancelled(fetchParams)) {
      return makeAppropriateNetworkError(fetchParams);
    }
    return makeNetworkError("proxy authentication required");
  }
  if (response2.status === 421 && !isNewConnectionFetch && (request2.body == null || request2.body.source != null)) {
    if (isCancelled(fetchParams)) {
      return makeAppropriateNetworkError(fetchParams);
    }
    fetchParams.controller.connection.destroy();
    response2 = await httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch, true);
  }
  return response2;
}
async function httpNetworkFetch(fetchParams, includeCredentials, forceNewConnection) {
  assert(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);
  fetchParams.controller.connection = {
    abort: null,
    destroyed: false,
    destroy(err) {
      if (!this.destroyed) {
        this.destroyed = true;
        this.abort?.(err ?? new AbortError());
      }
    }
  };
  const request2 = fetchParams.request;
  let response2 = null;
  const timingInfo = fetchParams.timingInfo;
  {
    request2.cache = "no-store";
  }
  if (request2.mode === "websocket")
    ;
  let requestBody = null;
  if (request2.body == null && fetchParams.processRequestEndOfBody) {
    queueMicrotask(() => fetchParams.processRequestEndOfBody());
  } else if (request2.body != null) {
    const processBodyChunk = async function* (bytes) {
      if (isCancelled(fetchParams)) {
        return;
      }
      yield bytes;
      fetchParams.processRequestBodyChunkLength?.(bytes.byteLength);
    };
    const processEndOfBody = () => {
      if (isCancelled(fetchParams)) {
        return;
      }
      if (fetchParams.processRequestEndOfBody) {
        fetchParams.processRequestEndOfBody();
      }
    };
    const processBodyError = (e2) => {
      if (isCancelled(fetchParams)) {
        return;
      }
      if (e2.name === "AbortError") {
        fetchParams.controller.abort();
      } else {
        fetchParams.controller.terminate(e2);
      }
    };
    requestBody = async function* () {
      try {
        for await (const bytes of request2.body.stream) {
          yield* processBodyChunk(bytes);
        }
        processEndOfBody();
      } catch (err) {
        processBodyError(err);
      }
    }();
  }
  try {
    const { body: body2, status, statusText, headersList } = await dispatch({ body: requestBody });
    const iterator = body2[Symbol.asyncIterator]();
    fetchParams.controller.next = () => iterator.next();
    response2 = makeResponse({ status, statusText, headersList });
  } catch (err) {
    if (err.name === "AbortError") {
      fetchParams.controller.connection.destroy();
      return makeAppropriateNetworkError(fetchParams);
    }
    return makeNetworkError(err);
  }
  const pullAlgorithm = () => {
    fetchParams.controller.resume();
  };
  const cancelAlgorithm = () => {
    fetchParams.controller.abort();
  };
  if (!ReadableStream2) {
    ReadableStream2 = import_web.default.ReadableStream;
  }
  const stream2 = new ReadableStream2({
    async start(controller) {
      fetchParams.controller.controller = controller;
    },
    async pull(controller) {
      await pullAlgorithm();
    },
    async cancel(reason) {
      await cancelAlgorithm();
    }
  }, { highWaterMark: 0 });
  response2.body = { stream: stream2 };
  fetchParams.controller.on("terminated", onAborted);
  fetchParams.controller.resume = async () => {
    while (true) {
      let bytes;
      try {
        const { done, value } = await fetchParams.controller.next();
        if (isAborted(fetchParams)) {
          break;
        }
        bytes = done ? void 0 : value;
      } catch (err) {
        if (fetchParams.controller.ended && !timingInfo.encodedBodySize) {
          bytes = void 0;
        } else {
          bytes = err;
        }
      }
      if (bytes === void 0) {
        try {
          fetchParams.controller.controller.close();
        } catch (err) {
          if (!/Controller is already closed/.test(err)) {
            throw err;
          }
        }
        finalizeResponse(fetchParams, response2);
        return;
      }
      timingInfo.decodedBodySize += bytes?.byteLength ?? 0;
      if (bytes instanceof Error) {
        fetchParams.controller.terminate(bytes);
        return;
      }
      fetchParams.controller.controller.enqueue(new Uint8Array(bytes));
      if (isErrored(stream2)) {
        fetchParams.controller.terminate();
        return;
      }
      if (!fetchParams.controller.controller.desiredSize) {
        return;
      }
    }
  };
  function onAborted(reason) {
    if (isAborted(fetchParams)) {
      response2.aborted = true;
      if (isReadable(stream2)) {
        fetchParams.controller.controller.error(new AbortError());
      }
    } else {
      if (isReadable(stream2)) {
        fetchParams.controller.controller.error(new TypeError("terminated", {
          cause: reason instanceof Error ? reason : void 0
        }));
      }
    }
    fetchParams.controller.connection.destroy();
  }
  return response2;
  async function dispatch({ body: body2 }) {
    const url = requestCurrentURL(request2);
    return new Promise((resolve2, reject) => fetchParams.controller.dispatcher.dispatch({
      path: url.pathname + url.search,
      origin: url.origin,
      method: request2.method,
      body: fetchParams.controller.dispatcher.isMockActive ? request2.body && request2.body.source : body2,
      headers: [...request2.headersList].flat(),
      maxRedirections: 0,
      bodyTimeout: 3e5,
      headersTimeout: 3e5
    }, {
      body: null,
      abort: null,
      onConnect(abort2) {
        const { connection } = fetchParams.controller;
        if (connection.destroyed) {
          abort2(new AbortError());
        } else {
          fetchParams.controller.on("terminated", abort2);
          this.abort = connection.abort = abort2;
        }
      },
      onHeaders(status, headersList, resume2, statusText) {
        if (status < 200) {
          return;
        }
        let codings = [];
        const headers2 = new Headers$1();
        for (let n = 0; n < headersList.length; n += 2) {
          const key2 = headersList[n + 0].toString();
          const val = headersList[n + 1].toString();
          if (key2.toLowerCase() === "content-encoding") {
            codings = val.split(",").map((x2) => x2.trim());
          }
          headers2.append(key2, val);
        }
        this.body = new Readable({ read: resume2 });
        const decoders = [];
        if (request2.method !== "HEAD" && request2.method !== "CONNECT" && !nullBodyStatus.includes(status)) {
          for (const coding of codings) {
            if (/(x-)?gzip/.test(coding)) {
              decoders.push(zlib.createGunzip());
            } else if (/(x-)?deflate/.test(coding)) {
              decoders.push(zlib.createInflate());
            } else if (coding === "br") {
              decoders.push(zlib.createBrotliDecompress());
            } else {
              decoders.length = 0;
              break;
            }
          }
        }
        resolve2({
          status,
          statusText,
          headersList: headers2[kHeadersList],
          body: decoders.length ? pipeline(this.body, ...decoders, () => {
          }) : this.body.on("error", () => {
          })
        });
        return true;
      },
      onData(chunk) {
        if (fetchParams.controller.dump) {
          return;
        }
        const bytes = chunk;
        timingInfo.encodedBodySize += bytes.byteLength;
        return this.body.push(bytes);
      },
      onComplete() {
        if (this.abort) {
          fetchParams.controller.off("terminated", this.abort);
        }
        fetchParams.controller.ended = true;
        this.body.push(null);
      },
      onError(error2) {
        if (this.abort) {
          fetchParams.controller.off("terminated", this.abort);
        }
        this.body?.destroy(error2);
        fetchParams.controller.terminate(error2);
        reject(error2);
      }
    }));
  }
}
var fetch_1 = fetch$1;
var Request2;
var Response2;
var Headers2;
var fetch2;
var Dispatcher = dispatcher;
var errors = errors$1;
var util = util$h;
var { InvalidArgumentError } = errors;
var api = api$1;
var { getGlobalDispatcher, setGlobalDispatcher } = global2;
var nodeVersion = process.versions.node.split(".");
var nodeMajor = Number(nodeVersion[0]);
var nodeMinor = Number(nodeVersion[1]);
Object.assign(Dispatcher.prototype, api);
function makeDispatcher(fn) {
  return (url, opts, handler) => {
    if (typeof opts === "function") {
      handler = opts;
      opts = null;
    }
    if (!url || typeof url !== "string" && typeof url !== "object" && !(url instanceof URL)) {
      throw new InvalidArgumentError("invalid url");
    }
    if (opts != null && typeof opts !== "object") {
      throw new InvalidArgumentError("invalid opts");
    }
    if (opts && opts.path != null) {
      if (typeof opts.path !== "string") {
        throw new InvalidArgumentError("invalid opts.path");
      }
      url = new URL(opts.path, util.parseOrigin(url));
    } else {
      if (!opts) {
        opts = typeof url === "object" ? url : {};
      }
      url = util.parseURL(url);
    }
    const { agent: agent2, dispatcher: dispatcher2 = getGlobalDispatcher() } = opts;
    if (agent2) {
      throw new InvalidArgumentError("unsupported opts.agent. Did you mean opts.client?");
    }
    return fn.call(dispatcher2, {
      ...opts,
      origin: url.origin,
      path: url.search ? `${url.pathname}${url.search}` : url.pathname,
      method: opts.method || (opts.body ? "PUT" : "GET")
    }, handler);
  };
}
if (nodeMajor > 16 || nodeMajor === 16 && nodeMinor >= 5) {
  let fetchImpl = null;
  fetch2 = async function fetch3(resource) {
    if (!fetchImpl) {
      fetchImpl = fetch_1;
    }
    const dispatcher2 = arguments[1] && arguments[1].dispatcher || getGlobalDispatcher();
    return fetchImpl.apply(dispatcher2, arguments);
  };
  Headers2 = headers.Headers;
  Response2 = response.Response;
  Request2 = request.Request;
}
makeDispatcher(api.request);
makeDispatcher(api.stream);
makeDispatcher(api.pipeline);
makeDispatcher(api.connect);
makeDispatcher(api.upgrade);
var globals = {
  crypto: import_crypto.webcrypto,
  fetch: fetch2,
  Response: Response2,
  Request: Request2,
  Headers: Headers2,
  ReadableStream: import_web.ReadableStream,
  TransformStream: import_web.TransformStream,
  WritableStream: import_web.WritableStream
};
function installPolyfills() {
  for (const name in globals) {
    Object.defineProperty(globalThis, name, {
      enumerable: true,
      configurable: true,
      value: globals[name]
    });
  }
}

// .svelte-kit/vercel-tmp/serverless.js
init_node();

// .svelte-kit/output/server/index.js
init_index_c5e2452c();
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers2 = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers2.append(key2, value2);
        });
      } else {
        headers2.set(key2, value);
      }
    }
  }
  return headers2;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body2) {
  if (typeof body2 !== "object")
    return false;
  if (body2) {
    if (body2 instanceof Uint8Array)
      return false;
    if (body2 instanceof ReadableStream)
      return false;
    if (body2._readableState && typeof body2.pipe === "function") {
      throw new Error("Node streams are no longer supported \u2014 use a ReadableStream instead");
    }
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body2) {
  return new Response(body2, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
var bodyless_status_codes = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    const allowed = [];
    for (const method2 in ["get", "post", "put", "patch"]) {
      if (mod[method2])
        allowed.push(method2.toUpperCase());
    }
    if (mod.del)
      allowed.push("DELETE");
    if (mod.get || mod.head)
      allowed.push("HEAD");
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response(`${event.request.method} method not allowed`, {
      status: 405,
      headers: {
        allow: allowed.join(", ")
      }
    });
  }
  const response2 = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response2 !== "object") {
    return error(`${preface}: expected an object, got ${typeof response2}`);
  }
  if (response2.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body: body2 = {} } = response2;
  const headers2 = response2.headers instanceof Headers ? new Headers(response2.headers) : to_headers(response2.headers);
  const type = headers2.get("content-type");
  if (!is_text(type) && !(body2 instanceof Uint8Array || is_string(body2))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body2) && (!type || type.startsWith("application/json"))) {
    headers2.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body2);
  } else {
    normalized_body = body2;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers2.has("etag")) {
    const cache_control = headers2.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers2.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" && !bodyless_status_codes.has(status) ? normalized_body : void 0, {
    status,
    headers: headers2
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry8) {
    return entry8[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry8, i2) {
    names.set(entry8[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable2(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
var encoder2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i2 = 0; i2 < array2.length; i2 += 16) {
    const w = array2.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  #use_hashes;
  #dev;
  #script_needs_csp;
  #style_needs_csp;
  #directives;
  #script_src;
  #style_src;
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    this.#use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.#directives = dev ? { ...directives } : directives;
    this.#dev = dev;
    const d = this.#directives;
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${sha256(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${sha256(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
var LoadURL = class extends URL {
  get hash() {
    throw new Error("url.hash is inaccessible from load. Consider accessing hash from the page store within the script tag of your component.");
  }
};
var PrerenderingURL = class extends URL {
  get search() {
    throw new Error("Cannot access url.search on a page with prerendering enabled");
  }
  get searchParams() {
    throw new Error("Cannot access url.searchParams on a page with prerendering enabled");
  }
};
var updated = {
  ...readable2(false),
  check: () => false
};
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerendering) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let cache;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      cache = loaded == null ? void 0 : loaded.cache;
      is_private = (cache == null ? void 0 : cache.private) ?? uses_credentials;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: {
          ...session,
          subscribe: (fn) => {
            is_private = (cache == null ? void 0 : cache.private) ?? true;
            return session.subscribe(fn);
          }
        },
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerendering ? new PrerenderingURL(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body2 } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerendering,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body2);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [${branch.map(({ node }) => node.index).join(", ")}],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			addEventListener('load', () => {
				navigator.serviceWorker.register('${options.service_worker}');
			});
		}
	`;
  if (inlined_style) {
    const attributes = [];
    if (options.dev)
      attributes.push(" data-sveltekit");
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(inlined_style);
    head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
  }
  head += Array.from(stylesheets).map((dep) => {
    const attributes = [
      'rel="stylesheet"',
      `href="${options.prefix + dep}"`
    ];
    if (csp.style_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    if (styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    }
    return `
	<link ${attributes.join(" ")}>`;
  }).join("");
  if (page_config.router || page_config.hydrate) {
    head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body2 += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
    body2 += serialized_data.map(({ url, body: body22, response: response2 }) => render_json_payload_script({ type: "data", url, body: typeof body22 === "string" ? hash(body22) : void 0 }, response2)).join("\n	");
    if (shadow_props) {
      body2 += render_json_payload_script({ type: "props" }, shadow_props);
    }
  }
  if (options.service_worker) {
    csp.add_script(init_service_worker);
    head += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body: body2, assets: assets2, nonce: csp.nonce })
  });
  const headers2 = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (cache) {
    headers2.set("cache-control", `${is_private ? "private" : "public"}, max-age=${cache.maxage}`);
  }
  if (!options.floc) {
    headers2.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerendering) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers: headers2
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index8 = 0;
  while (index8 < str.length) {
    var eqIdx = str.indexOf("=", index8);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index8);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index8 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index8, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index8 = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode2;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode2(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie2 = { exports: {} };
var defaultParseOptions2 = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString2(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString2(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString2);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse2(input, options) {
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  if (!options.map) {
    return input.filter(isNonEmptyString2).map(function(str) {
      return parseString2(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString2).reduce(function(cookies2, str) {
      var cookie = parseString2(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString2(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie2.exports = parse2;
setCookie2.exports.parse = parse2;
var parseString_1 = setCookie2.exports.parseString = parseString2;
var splitCookiesString_12 = setCookie2.exports.splitCookiesString = splitCookiesString2;
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  if ("maxage" in loaded) {
    throw new Error("maxage should be replaced with cache: { maxage }");
  }
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      throw new Error('"redirect" property returned from load() must be accompanied by a 3xx status code');
    }
    if (typeof loaded.redirect !== "string") {
      throw new Error('"redirect" property returned from load() must be a string');
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      throw new Error('"dependencies" property returned from load() must be of type string[]');
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event.request.headers.get("cookie") || "");
  const new_cookies = [];
  let loaded;
  const should_prerender = node.module.prerender ?? options.prerender.default;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, should_prerender) : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerendering ? new PrerenderingURL(event.url) : new LoadURL(event.url),
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        if (node.module.prerender ?? options.prerender.default) {
          throw Error("Attempted to access session from a prerendered page. Session would never be populated.");
        }
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response2;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file2 = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response2 = new Response(options.read(file2), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response2 = await fetch(`${event.url.origin}/${file2}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const authorization = event.request.headers.get("authorization");
            const combined_cookies = { ...cookies };
            for (const cookie2 of new_cookies) {
              if (!domain_matches(event.url.hostname, cookie2.domain))
                continue;
              if (!path_matches(resolved, cookie2.path))
                continue;
              combined_cookies[cookie2.name] = cookie2.value;
            }
            const cookie = Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response2 = await respond(new Request(new URL(requested, event.url).href, { ...opts }), options, {
            ...state,
            initiator: route
          });
          if (state.prerendering) {
            dependency = { response: response2, body: null };
            state.prerendering.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          opts.headers.delete("connection");
          const external_request = new Request(requested, opts);
          response2 = await options.hooks.externalFetch.call(null, external_request);
        }
        const set_cookie = response2.headers.get("set-cookie");
        if (set_cookie) {
          new_cookies.push(...splitCookiesString_12(set_cookie).map((str) => parseString_1(str)));
        }
        const proxy = new Proxy(response2, {
          get(response22, key2, _receiver) {
            async function text() {
              const body2 = await response22.text();
              const headers2 = {};
              for (const [key3, value] of response22.headers) {
                if (key3 !== "set-cookie" && key3 !== "etag") {
                  headers2[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response22.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response22.status}" type: ${typeof response22.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response22.statusText,
                    headers: headers2,
                    body: body2
                  }
                });
              }
              if (dependency) {
                dependency.body = body2;
              }
              return body2;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response22.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response22, key2, response22);
          }
        });
        return proxy;
      },
      stuff: { ...stuff },
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerendering) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerendering.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const { name, value, ...options2 } = new_cookie;
      return serialize_1(name, value, options2);
    }),
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers: headers2, body: body2 } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers2);
      if (status >= 300 && status < 400) {
        data.redirect = headers2 instanceof Headers ? headers2.get("location") : headers2.location;
        return data;
      }
      data.body = body2;
    }
    const get = method === "head" && mod.head || mod.get;
    if (get) {
      const result = await get(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers: headers2, body: body2 } = validate_shadow_output(result);
      add_cookies(data.cookies, headers2);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers2 instanceof Headers ? headers2.get("location") : headers2.location;
        return data;
      }
      data.body = { ...body2, ...data.body };
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers2) {
  const cookies = headers2["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body: body2 = {} } = result;
  let headers2 = result.headers || {};
  if (headers2 instanceof Headers) {
    if (headers2.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers2 = lowercase_keys(headers2);
  }
  if (!is_pojo(body2)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers: headers2, body: body2 };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error2,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response({
      ...opts,
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    });
  }
  try {
    nodes = await Promise.all(route.a.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerendering) {
    const should_prerender = leaf.prerender ?? options.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr: {
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      let loaded;
      if (node) {
        try {
          loaded = await load_node({
            ...opts,
            node,
            stuff,
            is_error: false,
            is_leaf: i2 === nodes.length - 1
          });
          set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
          if (loaded.loaded.redirect) {
            return with_cookies(new Response(void 0, {
              status: loaded.loaded.status,
              headers: {
                location: loaded.loaded.redirect
              }
            }), set_cookie_headers);
          }
          if (loaded.loaded.error) {
            ({ status, error: error2 } = loaded.loaded);
          }
        } catch (err) {
          const e2 = coalesce_to_error(err);
          options.handle_error(e2, event);
          status = 500;
          error2 = e2;
        }
        if (loaded && !error2) {
          branch.push(loaded);
        }
        if (error2) {
          while (i2--) {
            if (route.b[i2]) {
              const index8 = route.b[i2];
              const error_node = await options.manifest._.nodes[index8]();
              let node_loaded;
              let j = i2;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                const error_loaded = await load_node({
                  ...opts,
                  node: error_node,
                  stuff: node_loaded.stuff,
                  is_error: true,
                  is_leaf: false,
                  status,
                  error: error2
                });
                if (error_loaded.loaded.error) {
                  continue;
                }
                page_config = get_page_config(error_node.module, options);
                branch = branch.slice(0, j + 1).concat(error_loaded);
                stuff = { ...node_loaded.stuff, ...error_loaded.stuff };
                break ssr;
              } catch (err) {
                const e2 = coalesce_to_error(err);
                options.handle_error(e2, event);
                continue;
              }
            }
          }
          return with_cookies(await respond_with_error({
            event,
            options,
            state,
            $session,
            status,
            error: error2,
            resolve_opts
          }), set_cookie_headers);
        }
      }
      if (loaded && loaded.loaded.stuff) {
        stuff = {
          ...stuff,
          ...loaded.loaded.stuff
        };
      }
    }
  }
  try {
    return with_cookies(await render_response({
      ...opts,
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response2, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response2.headers.append("set-cookie", value);
    });
  }
  return response2;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request2, options, state) {
  var _a, _b, _c, _d;
  let url = new URL(request2.url);
  const { parameter, allowed } = options.method_override;
  const method_override = (_a = url.searchParams.get(parameter)) == null ? void 0 : _a.toUpperCase();
  if (method_override) {
    if (request2.method === "POST") {
      if (allowed.includes(method_override)) {
        request2 = new Proxy(request2, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body2 = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body2, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded;
  try {
    decoded = decodeURI(url.pathname);
  } catch {
    return new Response("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerendering) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response("Not found", { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    const data_suffix_length = DATA_SUFFIX.length - (options.trailing_slash === "always" ? 1 : 0);
    decoded = decoded.slice(0, -data_suffix_length) || "/";
    url = new URL(url.origin + url.pathname.slice(0, -data_suffix_length) + url.search);
  }
  if (!((_c = state.prerendering) == null ? void 0 : _c.fallback)) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if (route) {
    if (route.type === "page") {
      const normalized = normalize_path(url.pathname, options.trailing_slash);
      if (normalized !== url.pathname && !((_d = state.prerendering) == null ? void 0 : _d.fallback)) {
        return new Response(void 0, {
          status: 301,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
          }
        });
      }
    } else if (is_data_request) {
      return new Response(void 0, {
        status: 404
      });
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request: request2,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response2 = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        var _a2;
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if ((_a2 = state.prerendering) == null ? void 0 : _a2.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: {
              ...resolve_opts,
              ssr: false
            }
          });
        }
        if (route) {
          let response22;
          if (is_data_request && route.type === "page" && route.shadow) {
            response22 = await render_endpoint(event2, await route.shadow());
            if (request2.headers.has("x-sveltekit-load")) {
              if (response22.status >= 300 && response22.status < 400) {
                const location = response22.headers.get("location");
                if (location) {
                  const headers2 = new Headers(response22.headers);
                  headers2.set("x-sveltekit-location", location);
                  response22 = new Response(void 0, {
                    status: 204,
                    headers: headers2
                  });
                }
              }
            }
          } else {
            response22 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response22) {
            if (response22.status === 200 && response22.headers.has("etag")) {
              let if_none_match_value = request2.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response22.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers2 = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response22.headers.get(key2);
                  if (value)
                    headers2.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers: headers2
                });
              }
            }
            return response22;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerendering) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request2);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response2 && !(response2 instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response2;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body: body2, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<meta name="theme-color" content="#5a9fbf" />\n		<title>Dinvite</title>\n		' + head + "\n	</head>\n	<body>\n		<div>" + body2 + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/immutable/",
      prerender: {
        default: false,
        enabled: true
      },
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request2, options = {}) {
    if (!(request2 instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(() => (init_hooks_1c45ba0b(), hooks_1c45ba0b_exports));
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module2.externalFetch || fetch
      };
    }
    return respond(request2, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "fonts/Cano.otf", "images/bg-wa-box.jpg", "images/dinvite.png", "images/hero.png"]),
  mimeTypes: { ".png": "image/png", ".otf": "font/otf", ".jpg": "image/jpeg" },
  _: {
    entry: { "file": "start-7274f6b4.js", "js": ["start-7274f6b4.js", "chunks/index-b83f0d2a.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        id: "blog",
        pattern: /^\/blog\/?$/,
        names: [],
        types: [],
        path: "/blog",
        shadow: null,
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        id: "harga",
        pattern: /^\/harga\/?$/,
        names: [],
        types: [],
        path: "/harga",
        shadow: null,
        a: [0, 4],
        b: [1]
      },
      {
        type: "page",
        id: "tema",
        pattern: /^\/tema\/?$/,
        names: [],
        types: [],
        path: "/tema",
        shadow: null,
        a: [0, 5],
        b: [1]
      },
      {
        type: "page",
        id: "tema/preview/001",
        pattern: /^\/tema\/preview\/001\/?$/,
        names: [],
        types: [],
        path: "/tema/preview/001",
        shadow: null,
        a: [0, 6],
        b: [1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/serverless.js
installPolyfills();
var server = new Server(manifest);
var serverless_default = async (req, res) => {
  let request2;
  try {
    request2 = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request2, {
    getClientAddress() {
      return request2.headers.get("x-forwarded-for");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * lightgallery | 2.5.0 | June 13th 2022
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
//# sourceMappingURL=index.js.map
