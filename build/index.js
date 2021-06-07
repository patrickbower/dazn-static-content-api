var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("api", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var prams = {
        country: undefined,
        rail_id: undefined,
        image_id: undefined
    };
    var railsSchema = function (country) {
        return "https://rails.discovery.indazn.com/ca/v8/rails?country=" + country + "&groupId=home";
    };
    var rail = function (rail_id, country) {
        return "https://rail.discovery.indazn.com/eu/v3/Rail?id=" + rail_id + "&country=" + country + "&languageCode=en&params=PageType:Home;ContentType:None";
    };
    var image = function (image_id, image_quality, image_width, image_height, image_format) {
        return "https://image.discovery.indazn.com/eu/v2/eu/image/?id=" + image_id + "&quality=" + image_quality + "&width=" + image_width + "&height=" + image_height + "&resizeAction=fill&verticalAlignment=top&format=" + image_format;
    };
    exports["default"] = { prams: prams, railsSchema: railsSchema, rail: rail, image: image };
});
define("extract", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var extract = function (rawData) {
        var data = [];
        rawData.forEach(function (rawRail) {
            var rail = {};
            rail.id = rawRail.Id;
            rail.title = rawRail.Title;
            rail.tiles = [];
            rawRail.Tiles.forEach(function (rawTile) {
                var tile = {};
                tile.id = rawTile.Id;
                tile.title = rawTile.Title;
                tile.image = rawTile.Image.Id;
                rail.tiles.push(tile);
            });
            data.push(rail);
        });
        return data;
    };
    exports["default"] = extract;
});
define("index", ["require", "exports", "api", "extract"], function (require, exports, api_js_1, extract_js_1) {
    "use strict";
    exports.__esModule = true;
    var handleRequest = function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4, response.json()];
                case 2:
                    data = _a.sent();
                    return [2, data];
            }
        });
    }); };
    var handleRailsData = function (railsSchema, prams) { return __awaiter(void 0, void 0, void 0, function () {
        var getRailData, railsData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getRailData = railsSchema.map(function (rail) { return __awaiter(void 0, void 0, void 0, function () {
                        var railsUrl, railData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    railsUrl = api_js_1["default"].rail(rail.Id, prams.country);
                                    return [4, handleRequest(railsUrl).then(function (data) { return data; })];
                                case 1:
                                    railData = _a.sent();
                                    return [2, railData];
                            }
                        });
                    }); });
                    return [4, Promise.all(getRailData)];
                case 1:
                    railsData = _a.sent();
                    return [2, railsData];
            }
        });
    }); };
    var getData = function (prams) { return __awaiter(void 0, void 0, void 0, function () {
        var railsUrl, railsSchema, railsData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    railsUrl = api_js_1["default"].railsSchema(prams.country);
                    return [4, handleRequest(railsUrl).then(function (data) { return data.Rails; })];
                case 1:
                    railsSchema = _a.sent();
                    return [4, handleRailsData(railsSchema, prams)];
                case 2:
                    railsData = _a.sent();
                    return [2, railsData];
            }
        });
    }); };
    var addImages = function (data, prams) {
        data.forEach(function (rail) {
            rail.tiles.forEach(function (tile) {
                var id = tile.image;
                var image_quality = prams.image_quality, image_width = prams.image_width, image_height = prams.image_height, image_format = prams.image_format;
                tile.image = api_js_1["default"].image(id, image_quality, image_width, image_height, image_format);
            });
        });
        return data;
    };
    var processRequest = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var prams, rawData, basicData, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    prams = handleForm(event.target);
                    return [4, getData(prams)];
                case 1:
                    rawData = _a.sent();
                    basicData = extract_js_1["default"](rawData);
                    data = addImages(basicData, prams);
                    print(data);
                    return [2];
            }
        });
    }); };
    var handleForm = function (form) {
        var formData = new FormData(form);
        var formVales = Object.fromEntries(formData);
        var prams = __assign(__assign({}, api_js_1["default"].prams), formVales);
        return prams;
    };
    var form = document.querySelector("#form");
    form.addEventListener("submit", processRequest, false);
});
//# sourceMappingURL=index.js.map