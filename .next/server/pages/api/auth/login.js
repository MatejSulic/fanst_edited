"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/login";
exports.ids = ["pages/api/auth/login"];
exports.modules = {

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "(api)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   jwtPrivateKey: () => (/* binding */ jwtPrivateKey),\n/* harmony export */   jwtPublicKey: () => (/* binding */ jwtPublicKey)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nconst jwtPrivateKey = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(\"./jwtRS256.key\");\nconst jwtPublicKey = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(\"./jwtRS256.key.pub\");\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQW9CO0FBRWIsTUFBTUMsZ0JBQWdCRCxzREFBZUUsQ0FBQyxrQkFBa0I7QUFDeEQsTUFBTUMsZUFBZUgsc0RBQWVFLENBQUMsc0JBQXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFuc3QvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcblxuZXhwb3J0IGNvbnN0IGp3dFByaXZhdGVLZXkgPSBmcy5yZWFkRmlsZVN5bmMoXCIuL2p3dFJTMjU2LmtleVwiKTtcbmV4cG9ydCBjb25zdCBqd3RQdWJsaWNLZXkgPSBmcy5yZWFkRmlsZVN5bmMoXCIuL2p3dFJTMjU2LmtleS5wdWJcIik7XG4iXSwibmFtZXMiOlsiZnMiLCJqd3RQcml2YXRlS2V5IiwicmVhZEZpbGVTeW5jIiwiand0UHVibGljS2V5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/auth.ts\n");

/***/ }),

/***/ "(api)/./lib/db/models/User.ts":
/*!*******************************!*\
  !*** ./lib/db/models/User.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    email: {\n        type: String,\n        required: [\n            true,\n            \"Please provide an Email\"\n        ]\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a password\"\n        ],\n        unique: false\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZGIvbW9kZWxzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTRDO0FBRzVDLE1BQU1FLGFBQWEsSUFBSUQsNENBQU1BLENBQVc7SUFDdENFLE9BQU87UUFDTEMsTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBMEI7SUFDN0M7SUFDQUMsVUFBVTtRQUNSSCxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUE0QjtRQUM3Q0UsUUFBUTtJQUNWO0FBQ0Y7QUFFQSxpRUFBZVIsd0RBQWVTLENBQUNDLFFBQVFWLHFEQUFjVyxDQUFDLFFBQVFULFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW5zdC8uL2xpYi9kYi9tb2RlbHMvVXNlci50cz82MTZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tIFwibW9uZ29vc2VcIjtcbmltcG9ydCB7IFVzZXJUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGVzL3VzZXJcIjtcblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8VXNlclR5cGU+KHtcbiAgZW1haWw6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IFt0cnVlLCBcIlBsZWFzZSBwcm92aWRlIGFuIEVtYWlsXCJdLFxuICB9LFxuICBwYXNzd29yZDoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIHByb3ZpZGUgYSBwYXNzd29yZFwiXSxcbiAgICB1bmlxdWU6IGZhbHNlLFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsKFwiVXNlclwiLCBVc2VyU2NoZW1hKTtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsIlVzZXJTY2hlbWEiLCJlbWFpbCIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInBhc3N3b3JkIiwidW5pcXVlIiwibW9kZWxzIiwiVXNlciIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/db/models/User.ts\n");

/***/ }),

/***/ "(api)/./lib/db/mongooseDb.ts":
/*!******************************!*\
  !*** ./lib/db/mongooseDb.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\n/**\n * Global is used here to maintain a cached connection across hot reloads\n * in development. This prevents connections growing exponentially\n * during API Route usage.\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZGIvbW9uZ29vc2VEYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0MsUUFBUUMsSUFBSUY7QUFFaEMsSUFBSSxDQUFDQSxhQUFhO0lBQ2hCLE1BQU0sSUFBSUcsTUFDUjtBQUVKO0FBRUE7Ozs7Q0FJQyxHQUNELElBQUlDLFNBQVNDLE9BQU9OO0FBRXBCLElBQUksQ0FBQ0ssUUFBUTtJQUNYQSxTQUFTQyxPQUFPTixXQUFXO1FBQUVPLE1BQU07UUFBTUMsU0FBUztJQUFLO0FBQ3pEO0FBRUEsZUFBZUM7SUFDYixJQUFJSixPQUFPRSxNQUFNO1FBQ2YsT0FBT0YsT0FBT0U7SUFDaEI7SUFFQSxJQUFJLENBQUNGLE9BQU9HLFNBQVM7UUFDbkIsTUFBTUUsT0FBTztZQUNYQyxnQkFBZ0I7UUFDbEI7UUFFQU4sT0FBT0csVUFBVVIsdURBQWdCWSxDQUFDWCxhQUFjUyxNQUFNRyxLQUFLLENBQUNiO1lBQzFELE9BQU9BO1FBQ1Q7SUFDRjtJQUVBLElBQUk7UUFDRkssT0FBT0UsT0FBTyxNQUFNRixPQUFPRztJQUM3QixFQUFFLE9BQU9NLEdBQUc7UUFDVlQsT0FBT0csVUFBVTtRQUNqQixNQUFNTTtJQUNSO0lBRUEsT0FBT1QsT0FBT0U7QUFDaEI7QUFFQSxpRUFBZUUsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbnN0Ly4vbGliL2RiL21vbmdvb3NlRGIudHM/M2Q5MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XG5cbmlmICghTU9OR09EQl9VUkkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgIFwiUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaW5zaWRlIC5lbnYubG9jYWxcIlxuICApO1xufVxuXG4vKipcbiAqIEdsb2JhbCBpcyB1c2VkIGhlcmUgdG8gbWFpbnRhaW4gYSBjYWNoZWQgY29ubmVjdGlvbiBhY3Jvc3MgaG90IHJlbG9hZHNcbiAqIGluIGRldmVsb3BtZW50LiBUaGlzIHByZXZlbnRzIGNvbm5lY3Rpb25zIGdyb3dpbmcgZXhwb25lbnRpYWxseVxuICogZHVyaW5nIEFQSSBSb3V0ZSB1c2FnZS5cbiAqL1xubGV0IGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZTtcblxuaWYgKCFjYWNoZWQpIHtcbiAgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRiQ29ubmVjdCgpIHtcbiAgaWYgKGNhY2hlZC5jb25uKSB7XG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xuICB9XG5cbiAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXG4gICAgfTtcblxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSEsIG9wdHMpLnRoZW4oKG1vbmdvb3NlKSA9PiB7XG4gICAgICByZXR1cm4gbW9uZ29vc2U7XG4gICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG51bGw7XG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIHJldHVybiBjYWNoZWQuY29ubjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGJDb25uZWN0O1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJjYWNoZWQiLCJnbG9iYWwiLCJjb25uIiwicHJvbWlzZSIsImRiQ29ubmVjdCIsIm9wdHMiLCJidWZmZXJDb21tYW5kcyIsImNvbm5lY3QiLCJ0aGVuIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/db/mongooseDb.ts\n");

/***/ }),

/***/ "(api)/./pages/api/auth/login.ts":
/*!*********************************!*\
  !*** ./pages/api/auth/login.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_db_models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/db/models/User */ \"(api)/./lib/db/models/User.ts\");\n/* harmony import */ var _lib_db_mongooseDb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/db/mongooseDb */ \"(api)/./lib/db/mongooseDb.ts\");\n/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/auth */ \"(api)/./utils/auth.ts\");\n\n\n\n\n\nasync function handler(req, res) {\n    await (0,_lib_db_mongooseDb__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    if (req.method === \"POST\") {\n        const reqBody = req.body;\n        try {\n            const user = await _lib_db_models_User__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({\n                email: reqBody.email\n            });\n            if (user) {\n                const passwordMatch = await bcrypt__WEBPACK_IMPORTED_MODULE_0___default().compare(reqBody.password, user.password);\n                if (!passwordMatch) {\n                    res.status(400).json({\n                        success: false,\n                        data: \"Wrong password\"\n                    });\n                }\n                const token = (0,_utils_auth__WEBPACK_IMPORTED_MODULE_4__.generateAccessToken)(user._id.toString(), user.email);\n                const refreshToken = (0,_utils_auth__WEBPACK_IMPORTED_MODULE_4__.generateRefreshToken)(user._id.toString(), user.email);\n                res.status(200).setHeader(\"Set-Cookie\", cookie__WEBPACK_IMPORTED_MODULE_1___default().serialize(\"accessToken\", token, {\n                    httpOnly: true,\n                    path: \"/\"\n                })).json({\n                    success: true,\n                    data: {\n                        user: {\n                            email: user.email\n                        },\n                        token: token\n                    }\n                });\n            } else {\n                res.status(401).json({\n                    success: false,\n                    data: \"Email not found\"\n                });\n            }\n        } catch (e) {\n            res.status(500).json({\n                success: false,\n                data: \"Error logging user\"\n            });\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9sb2dpbi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE0QjtBQUNBO0FBRW1CO0FBQ0k7QUFDNkI7QUFFakUsZUFBZU0sUUFDNUJDLEdBQW1CLEVBQ25CQyxHQUFvQjtJQUVwQixNQUFNTCw4REFBU0E7SUFFZixJQUFJSSxJQUFJRSxXQUFXLFFBQVE7UUFDekIsTUFBTUMsVUFBVUgsSUFBSUk7UUFDcEIsSUFBSTtZQUNGLE1BQU1DLE9BQU8sTUFBTVYsbUVBQVlXLENBQUM7Z0JBQUVDLE9BQU9KLFFBQVFJO1lBQU07WUFDdkQsSUFBSUYsTUFBTTtnQkFDUixNQUFNRyxnQkFBZ0IsTUFBTWYscURBQWNnQixDQUN4Q04sUUFBUU8sVUFDUkwsS0FBS0s7Z0JBRVAsSUFBSSxDQUFDRixlQUFlO29CQUNsQlAsSUFBSVUsT0FBTyxLQUFLQyxLQUFLO3dCQUFFQyxTQUFTO3dCQUFPQyxNQUFNO29CQUFpQjtnQkFDaEU7Z0JBRUEsTUFBTUMsUUFBUWxCLGdFQUFtQkEsQ0FBQ1EsS0FBS1csSUFBSUMsWUFBWVosS0FBS0U7Z0JBQzVELE1BQU1XLGVBQWVwQixpRUFBb0JBLENBQ3ZDTyxLQUFLVyxJQUFJQyxZQUNUWixLQUFLRTtnQkFHUE4sSUFDR1UsT0FBTyxLQUNQUSxVQUNDLGNBQ0F6Qix1REFBZ0IwQixDQUFDLGVBQWVMLE9BQU87b0JBQ3JDTSxVQUFVO29CQUNWQyxNQUFNO2dCQUNSLElBRURWLEtBQUs7b0JBQ0pDLFNBQVM7b0JBQ1RDLE1BQU07d0JBQUVULE1BQU07NEJBQUVFLE9BQU9GLEtBQUtFO3dCQUFNO3dCQUFHUSxPQUFPQTtvQkFBTTtnQkFDcEQ7WUFDSixPQUFPO2dCQUNMZCxJQUFJVSxPQUFPLEtBQUtDLEtBQUs7b0JBQUVDLFNBQVM7b0JBQU9DLE1BQU07Z0JBQWtCO1lBQ2pFO1FBQ0YsRUFBRSxPQUFPUyxHQUFHO1lBQ1Z0QixJQUFJVSxPQUFPLEtBQUtDLEtBQUs7Z0JBQUVDLFNBQVM7Z0JBQU9DLE1BQU07WUFBcUI7UUFDcEU7SUFDRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFuc3QvLi9wYWdlcy9hcGkvYXV0aC9sb2dpbi50cz83NDRkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xuaW1wb3J0IGNvb2tpZSBmcm9tIFwiY29va2llXCI7XG5pbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi8uLi9saWIvZGIvbW9kZWxzL1VzZXJcIjtcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSBcIi4uLy4uLy4uL2xpYi9kYi9tb25nb29zZURiXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUFjY2Vzc1Rva2VuLCBnZW5lcmF0ZVJlZnJlc2hUb2tlbiB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9hdXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pIHtcbiAgYXdhaXQgZGJDb25uZWN0KCk7XG5cbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgY29uc3QgcmVxQm9keSA9IHJlcS5ib2R5O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IHJlcUJvZHkuZW1haWwgfSk7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICBjb25zdCBwYXNzd29yZE1hdGNoID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXG4gICAgICAgICAgcmVxQm9keS5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkXG4gICAgICAgICk7XG4gICAgICAgIGlmICghcGFzc3dvcmRNYXRjaCkge1xuICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGRhdGE6IFwiV3JvbmcgcGFzc3dvcmRcIiB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRva2VuID0gZ2VuZXJhdGVBY2Nlc3NUb2tlbih1c2VyLl9pZC50b1N0cmluZygpLCB1c2VyLmVtYWlsKTtcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuID0gZ2VuZXJhdGVSZWZyZXNoVG9rZW4oXG4gICAgICAgICAgdXNlci5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICB1c2VyLmVtYWlsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmVzXG4gICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgLnNldEhlYWRlcihcbiAgICAgICAgICAgIFwiU2V0LUNvb2tpZVwiLFxuICAgICAgICAgICAgY29va2llLnNlcmlhbGl6ZShcImFjY2Vzc1Rva2VuXCIsIHRva2VuLCB7XG4gICAgICAgICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBkYXRhOiB7IHVzZXI6IHsgZW1haWw6IHVzZXIuZW1haWwgfSwgdG9rZW46IHRva2VuIH0sXG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBkYXRhOiBcIkVtYWlsIG5vdCBmb3VuZFwiIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGRhdGE6IFwiRXJyb3IgbG9nZ2luZyB1c2VyXCIgfSk7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiYmNyeXB0IiwiY29va2llIiwiVXNlciIsImRiQ29ubmVjdCIsImdlbmVyYXRlQWNjZXNzVG9rZW4iLCJnZW5lcmF0ZVJlZnJlc2hUb2tlbiIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJyZXFCb2R5IiwiYm9keSIsInVzZXIiLCJmaW5kT25lIiwiZW1haWwiLCJwYXNzd29yZE1hdGNoIiwiY29tcGFyZSIsInBhc3N3b3JkIiwic3RhdHVzIiwianNvbiIsInN1Y2Nlc3MiLCJkYXRhIiwidG9rZW4iLCJfaWQiLCJ0b1N0cmluZyIsInJlZnJlc2hUb2tlbiIsInNldEhlYWRlciIsInNlcmlhbGl6ZSIsImh0dHBPbmx5IiwicGF0aCIsImUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/login.ts\n");

/***/ }),

/***/ "(api)/./utils/auth.ts":
/*!***********************!*\
  !*** ./utils/auth.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateAccessToken: () => (/* binding */ generateAccessToken),\n/* harmony export */   generateRefreshToken: () => (/* binding */ generateRefreshToken),\n/* harmony export */   parseAuthHeader: () => (/* binding */ parseAuthHeader),\n/* harmony export */   verifyAccessToken: () => (/* binding */ verifyAccessToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/auth */ \"(api)/./lib/auth.ts\");\n\n\nconst generateAccessToken = (userId, userEmail)=>{\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n        userId,\n        userEmail\n    }, _lib_auth__WEBPACK_IMPORTED_MODULE_1__.jwtPrivateKey, {\n        algorithm: \"RS256\"\n    });\n};\nconst parseAuthHeader = (authHeader)=>{\n    if (authHeader === undefined) {\n        return {};\n    }\n    const parsedAuthHeader = authHeader.split(\" \");\n    if (parsedAuthHeader[0] !== \"Bearer\") {\n        console.error(\"Invalid Authorization Header\");\n    }\n    return verifyAccessToken(parsedAuthHeader[1]);\n};\nconst verifyAccessToken = (token)=>{\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, _lib_auth__WEBPACK_IMPORTED_MODULE_1__.jwtPublicKey);\n    } catch (err) {\n        console.error(\"Invalid JWT\");\n    }\n};\nconst generateRefreshToken = (userId, userEmail)=>{\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n        userId,\n        userEmail\n    }, _lib_auth__WEBPACK_IMPORTED_MODULE_1__.jwtPrivateKey, {\n        expiresIn: \"30d\",\n        algorithm: \"RS256\"\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBK0I7QUFDMkI7QUFFbkQsTUFBTUcsc0JBQXNCLENBQUNDLFFBQWdCQztJQUNsRCxPQUFPTCx3REFBUU0sQ0FDYjtRQUNFRjtRQUNBQztJQUNGLEdBQ0FKLG9EQUFhQSxFQUNiO1FBQUVNLFdBQVc7SUFBUTtBQUV6QixFQUFFO0FBRUssTUFBTUMsa0JBQWtCLENBQUNDO0lBQzlCLElBQUlBLGVBQWVDLFdBQVc7UUFDNUIsT0FBTyxDQUFDO0lBQ1Y7SUFFQSxNQUFNQyxtQkFBbUJGLFdBQVdHLE1BQU07SUFFMUMsSUFBSUQsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLFVBQVU7UUFDcENFLFFBQVFDLE1BQU07SUFDaEI7SUFFQSxPQUFPQyxrQkFBa0JKLGdCQUFnQixDQUFDLEVBQUU7QUFDOUMsRUFBRTtBQUVLLE1BQU1JLG9CQUFvQixDQUFDQztJQUNoQyxJQUFJO1FBQ0YsT0FBT2hCLDBEQUFVaUIsQ0FBQ0QsT0FBT2QsbURBQVlBO0lBQ3ZDLEVBQUUsT0FBT2dCLEtBQUs7UUFDWkwsUUFBUUMsTUFBTTtJQUNoQjtBQUNGLEVBQUU7QUFFSyxNQUFNSyx1QkFBdUIsQ0FBQ2YsUUFBZ0JDO0lBQ25ELE9BQU9MLHdEQUFRTSxDQUNiO1FBQ0VGO1FBQ0FDO0lBQ0YsR0FDQUosb0RBQWFBLEVBQ2I7UUFDRW1CLFdBQVc7UUFDWGIsV0FBVztJQUNiO0FBRUosRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhbnN0Ly4vdXRpbHMvYXV0aC50cz9iMzhhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuaW1wb3J0IHsgand0UHJpdmF0ZUtleSwgand0UHVibGljS2V5IH0gZnJvbSBcIi4uL2xpYi9hdXRoXCI7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUFjY2Vzc1Rva2VuID0gKHVzZXJJZDogc3RyaW5nLCB1c2VyRW1haWw6IHN0cmluZykgPT4ge1xuICByZXR1cm4gand0LnNpZ24oXG4gICAge1xuICAgICAgdXNlcklkLFxuICAgICAgdXNlckVtYWlsLFxuICAgIH0sXG4gICAgand0UHJpdmF0ZUtleSxcbiAgICB7IGFsZ29yaXRobTogXCJSUzI1NlwiIH1cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJzZUF1dGhIZWFkZXIgPSAoYXV0aEhlYWRlcj86IHN0cmluZykgPT4ge1xuICBpZiAoYXV0aEhlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3QgcGFyc2VkQXV0aEhlYWRlciA9IGF1dGhIZWFkZXIuc3BsaXQoXCIgXCIpO1xuXG4gIGlmIChwYXJzZWRBdXRoSGVhZGVyWzBdICE9PSBcIkJlYXJlclwiKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgQXV0aG9yaXphdGlvbiBIZWFkZXJcIik7XG4gIH1cblxuICByZXR1cm4gdmVyaWZ5QWNjZXNzVG9rZW4ocGFyc2VkQXV0aEhlYWRlclsxXSk7XG59O1xuXG5leHBvcnQgY29uc3QgdmVyaWZ5QWNjZXNzVG9rZW4gPSAodG9rZW46IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBqd3QudmVyaWZ5KHRva2VuLCBqd3RQdWJsaWNLZXkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBKV1RcIik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVJlZnJlc2hUb2tlbiA9ICh1c2VySWQ6IHN0cmluZywgdXNlckVtYWlsOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIGp3dC5zaWduKFxuICAgIHtcbiAgICAgIHVzZXJJZCxcbiAgICAgIHVzZXJFbWFpbCxcbiAgICB9LFxuICAgIGp3dFByaXZhdGVLZXksXG4gICAge1xuICAgICAgZXhwaXJlc0luOiBcIjMwZFwiLFxuICAgICAgYWxnb3JpdGhtOiBcIlJTMjU2XCIsXG4gICAgfVxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJqd3QiLCJqd3RQcml2YXRlS2V5Iiwiand0UHVibGljS2V5IiwiZ2VuZXJhdGVBY2Nlc3NUb2tlbiIsInVzZXJJZCIsInVzZXJFbWFpbCIsInNpZ24iLCJhbGdvcml0aG0iLCJwYXJzZUF1dGhIZWFkZXIiLCJhdXRoSGVhZGVyIiwidW5kZWZpbmVkIiwicGFyc2VkQXV0aEhlYWRlciIsInNwbGl0IiwiY29uc29sZSIsImVycm9yIiwidmVyaWZ5QWNjZXNzVG9rZW4iLCJ0b2tlbiIsInZlcmlmeSIsImVyciIsImdlbmVyYXRlUmVmcmVzaFRva2VuIiwiZXhwaXJlc0luIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./utils/auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/login.ts"));
module.exports = __webpack_exports__;

})();