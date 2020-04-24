/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Enemy {\n  constructor(ctx, canvas, word) {\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.word = word;\n    this.length = this.word.length;\n    this.y = this.spawnY();\n    this.x = 800;\n    this.image = new Image();\n    this.image.src = \"./images/enemy.png\";\n    this.shift = 0;\n    this.explosion = new Image();\n    this.explosion.src = \"./images/explosion.png\";\n  }\n\n  spawnY() {\n    let num = Math.random() * this.canvas.height;\n\n    if (num > 350 && num) {\n      num -= 80;\n    } else if (num < 20) {\n      num += 50;\n    }\n\n    return num;\n  }\n\n  drawWord() {\n    this.x -= 1;\n    this.ctx.fillStyle = \"purple\";\n    this.ctx.font = \"16px Arial\";\n    this.ctx.fillText(this.word, this.x, this.y);\n    this.ctx.beginPath();\n    this.ctx.stroke();\n  }\n\n  drawEnemy() {\n    this.ctx.drawImage(this.image, this.shift, 100, 50, 100, this.x + 10, this.y, 30, 45);\n  }\n\n  changeFrames() {\n    this.shift += 80;\n\n    if (this.shift > 200) {\n      this.shift = 0;\n    }\n  }\n\n  draw() {\n    this.drawWord();\n    this.drawEnemy();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Enemy); // width: 910 / 12 \n// height: 415 / 4\n//\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/explosion.js":
/*!**************************!*\
  !*** ./src/explosion.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Explosion {\n  constructor(ctx, canvas, x, y) {\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.x = x;\n    this.y = y;\n    this.shift = 0;\n    this.explosion = new Image();\n    this.explosion.src = \"./images/explosion.png\";\n    this.finished = false;\n  }\n\n  drawExplosion() {\n    this.ctx.drawImage(this.explosion, this.shift, 0, 128, 128, this.x - 10, this.y - 10, 128, 128);\n  }\n\n  changeFrames() {\n    this.shift += 128;\n\n    if (this.shift > 1500) {\n      this.shift = 0;\n      this.finished = true;\n    }\n  }\n\n  draw() {\n    this.drawExplosion();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Explosion);\n\n//# sourceURL=webpack:///./src/explosion.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _words__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./words */ \"./src/words.js\");\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\n/* harmony import */ var _mage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mage */ \"./src/mage.js\");\n/* harmony import */ var _explosion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./explosion */ \"./src/explosion.js\");\n\n\n\n\n\nclass Game {\n  constructor(ctx, canvas, input) {\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.input = input;\n    this.gameOver = false;\n    this.enemies = [];\n    this.explosion = [];\n    this.words = new _words__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.health = 3;\n    this.heart = new Image();\n    this.player = new _mage__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx, this.canvas);\n    this.heart.src = \"./images/heart.png\";\n    this.startGame = this.startGame.bind(this);\n    this.background = new Image();\n    this.background.src = \"./images/background.png\";\n    this.wave = 1;\n    this.wpmTime = new Date();\n    this.wordsEntered = 0;\n    this.wpm = 0;\n    this.timer = 0;\n  }\n\n  startGame() {\n    this.canvas.removeEventListener(\"click\", this.startGame);\n    let input = document.getElementById(\"user-input\");\n    input.classList.toggle(\"hide\");\n    this.currentFrame = new Date();\n    this.explosionFrame = new Date();\n    this.animate();\n    this.input.focus();\n  }\n\n  spawnEnemy() {\n    if (this.timer % 100 === 0) {\n      this.enemies.push(new _enemy__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx, this.canvas, this.words.newWord()));\n    }\n  }\n\n  animate() {\n    this.render = requestAnimationFrame(this.animate.bind(this));\n    let timer = setInterval(() => {\n      this.timer += 1, 10;\n    });\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.drawBG();\n    this.drawEnemies();\n    this.drawExplosions();\n    this.checkOOB();\n    this.checkInput();\n    this.showHealth();\n    this.drawMenu();\n    this.drawWPM();\n    this.spawnEnemy();\n    this.player.draw(); // if (this.health <= 0) {\n    //     cancelAnimationFrame(this.render)\n    // }\n  }\n\n  drawEnemies() {\n    let now = new Date();\n    let step = now - this.currentFrame;\n\n    for (let i = 0; i < this.enemies.length; i++) {\n      this.enemies[i].draw();\n\n      if (step > 200) {\n        this.enemies[i].changeFrames();\n        this.currentFrame = new Date();\n      }\n    }\n  }\n\n  drawExplosions() {\n    let now = new Date();\n    let step = now - this.explosionFrame;\n\n    for (let i = 0; i < this.explosion.length; i++) {\n      this.explosion[i].draw();\n\n      if (step > 200) {\n        this.explosion[i].changeFrames();\n        this.currentFrame = new Date();\n      }\n\n      if (this.explosion[i].finished) {\n        this.explosion.splice(i, 1);\n      }\n    }\n  }\n\n  checkOOB() {\n    for (let i = 0; i < this.enemies.length; i++) {\n      if (this.enemies[i].x < 100) {\n        this.enemies.splice(i, 1);\n        this.health -= 1;\n      }\n    }\n  }\n\n  checkInput() {\n    for (let i = 0; i < this.enemies.length; i++) {\n      if (this.input.value.toUpperCase() === this.enemies[i].word) {\n        this.explosion.push(new _explosion__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.ctx, this.canvas, this.enemies[i].x, this.enemies[i].y));\n        this.enemies.splice(i, 1);\n        this.input.value = \"\";\n        this.wordsEntered += 1;\n      }\n    }\n  }\n\n  showHealth() {\n    let x = 480;\n\n    for (let i = 0; i < this.health; i++) {\n      // debugger\n      this.ctx.drawImage(this.heart, x, 5, 20, 20);\n      x += 35;\n    }\n  }\n\n  drawMenu() {\n    this.ctx.beginPath();\n    this.ctx.moveTo(90, 0);\n    this.ctx.lineTo(70, 20);\n    this.ctx.lineTo(80, 0);\n    this.ctx.closePath();\n    this.ctx.lineWidth = 1;\n    this.ctx.strokeStyle = '#666';\n    this.ctx.stroke();\n    this.ctx.fillText(`Kills: ${this.wordsEntered}`, 600, 20);\n    this.ctx.fillStyle = \"#666\";\n    this.ctx.fill();\n  }\n\n  drawWPM() {\n    let now = new Date();\n    const diff = now - this.wpmTime;\n    this.wpm = Math.floor(this.wordsEntered / (diff / 1000 / 60));\n    this.ctx.stroke();\n    this.ctx.fillText(`WPM: ${this.wpm}`, 600, 40);\n    this.ctx.fill();\n  }\n\n  drawBG() {\n    this.ctx.drawImage(this.background, 0, 0, this.background.width, this.background.height, 0, 0, this.canvas.width, this.canvas.height);\n  }\n\n  gameOver() {}\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _splash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./splash */ \"./src/splash.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"game-canvas\");\n  const ctx = canvas.getContext(\"2d\");\n  const input = document.getElementById(\"user-input\");\n  document.fonts.ready;\n  const splash = new _splash__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ctx, canvas);\n  const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvas, input);\n  canvas.addEventListener(\"click\", game.startGame);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mage.js":
/*!*********************!*\
  !*** ./src/mage.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Mage {\n  constructor(ctx, canvas) {\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.y = 250;\n    this.x = 5;\n    this.image = new Image();\n    this.image.src = \"./images/mage.png\";\n    this.shift = 190;\n  }\n\n  drawMage() {\n    this.ctx.drawImage(this.image, this.shift, 0, 100, 50, this.x, this.y, 100, 60);\n  }\n\n  changeFrames() {\n    this.shift += 80;\n\n    if (this.shift > 200) {\n      this.shift = 0;\n    }\n  }\n\n  draw() {\n    this.drawMage();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Mage);\n\n//# sourceURL=webpack:///./src/mage.js?");

/***/ }),

/***/ "./src/splash.js":
/*!***********************!*\
  !*** ./src/splash.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Splash {\n  constructor(ctx, canvas) {\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.drawSplash();\n  }\n\n  drawSplash() {\n    this.ctx.fillStyle = \"black\";\n    this.ctx.font = '30px Tangerine';\n    this.ctx.alignText = \"left\";\n    this.ctx.fillText(\"Typing of the Wizard\", this.canvas.width / 2, this.canvas.height / 2);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Splash);\n\n//# sourceURL=webpack:///./src/splash.js?");

/***/ }),

/***/ "./src/words.js":
/*!**********************!*\
  !*** ./src/words.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Words {\n  constructor() {\n    this.words = ['ACCOUNT', 'ACCURATE', 'ACRES', 'ACROSS', 'ACT', 'ACTION', 'ACTIVE', 'ACTIVITY', 'ACTUAL', 'ACTUALLY', 'ADD', 'ADDITION', 'ADDITIONAL', 'ADJECTIVE', 'ADULT', 'ADVENTURE', 'ADVICE', 'AFFECT', 'AFRAID', 'AFTER', 'AFTERNOON', 'AGAIN', 'AGAINST', 'AGE', 'AGO', 'AGREE', 'AHEAD', 'AID', 'AIR', 'AIRPLANE', 'ALIKE', 'ALIVE', 'ALL', 'ALLOW', 'ALMOST', 'ALONE', 'ALONG', 'ALOUD', 'ALPHABET', 'ALREADY', 'ALSO', 'ALTHOUGH', 'AM', 'AMONG', 'AMOUNT', 'ANCIENT', 'ANGLE', 'ANGRY', 'ANIMAL', 'ANNOUNCED', 'ANOTHER', 'ANSWER', 'ANTS', 'ANY', 'ANYBODY', 'ANYONE', 'ANYTHING', 'ANYWAY', 'ANYWHERE', 'APART', 'APARTMENT', 'APPEARANCE', 'APPLE', 'APPLIED', 'APPROPRIATE', 'ARE', 'AREA', 'ARM', 'ARMY', 'AROUND', 'ARRANGE', 'ARRANGEMENT', 'ARRIVE', 'ARROW', 'ART', 'ARTICLE', 'AS', 'ASIDE', 'ASK', 'ASLEEP', 'AT', 'ATE', 'ATMOSPHERE', 'ATOM', 'ATOMIC', 'ATTACHED', 'ATTACK', 'ATTEMPT', 'ATTENTION', 'AUDIENCE', 'AUTHOR', 'AUTOMOBILE', 'AVAILABLE', 'AVERAGE', 'AVOID', 'AWARE', 'AWAY', 'BABY', 'BACK', 'BAD', 'BADLY', 'BAG', 'BALANCE', 'BALL', 'BALLOON', 'BAND', 'BANK', 'BAR', 'BARE', 'BARK', 'BARN', 'BASE', 'BASEBALL', 'BASIC', 'BASIS', 'BASKET', 'BAT', 'BATTLE', 'BE', 'BEAN', 'BEAR', 'BEAT', 'BEAUTIFUL', 'BEAUTY', 'BECAME', 'BECAUSE', 'BECOME', 'BECOMING', 'BEE', 'BEEN', 'BEFORE', 'BEGAN', 'BEGINNING', 'BEGUN', 'BEHAVIOR', 'BEHIND', 'BEING', 'BELIEVED', 'BELL', 'BELONG', 'BELOW', 'BELT', 'BEND', 'BENEATH', 'BENT', 'BESIDE', 'BEST', 'BET', 'BETTER', 'BETWEEN', 'BEYOND', 'BICYCLE', 'BIGGER', 'BIGGEST', 'BILL', 'BIRDS', 'BIRTH', 'BIRTHDAY', 'BIT', 'BITE', 'BLACK', 'BLANK', 'BLANKET', 'BLEW', 'BLIND', 'BLOCK', 'BLOOD', 'BLOW', 'BLUE', 'BOARD', 'BOAT', 'BODY', 'BONE', 'BOOK', 'BORDER', 'BORN', 'BOTH', 'BOTTLE', 'BOTTOM', 'BOUND', 'BOW', 'BOWL', 'BOX', 'BOY', 'BRAIN', 'BRANCH', 'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREAKFAST', 'BREATH', 'BREATHE', 'BREATHING', 'BREEZE', 'BRICK', 'BRIDGE', 'BRIEF', 'BRIGHT', 'BRING', 'BROAD', 'BROKE', 'BROKEN', 'BROTHER', 'BROUGHT', 'BROWN', 'BRUSH', 'BUFFALO', 'BUILD', 'BUILDING', 'BUILT', 'BURIED', 'BURN', 'BURST', 'BUS', 'BUSH', 'BUSINESS', 'BUSY', 'BUT', 'BUTTER', 'BUY', 'BY', 'CABIN', 'CAGE', 'CAKE', 'CALL', 'CALM', 'CAME', 'CAMERA', 'CAMP', 'CAN', 'CANAL', 'CANNOT', 'CAP', 'CAPITAL', 'CAPTAIN', 'CAPTURED', 'CAR', 'CARBON', 'CARD', 'CARE', 'CAREFUL', 'CAREFULLY', 'CARRIED', 'CARRY', 'CASE', 'CAST', 'CASTLE', 'CAT', 'CATCH', 'CATTLE', 'CAUGHT', 'CAUSE', 'CAVE', 'CELL', 'CENT', 'CENTER', 'CENTRAL', 'CENTURY', 'CERTAIN', 'CERTAINLY', 'CHAIN', 'CHAIR', 'CHAMBER', 'CHANCE', 'CHANGE', 'CHANGING', 'CHAPTER', 'CHARACTER', 'CHARACTERISTIC', 'CHARGE', 'CHART', 'CHECK', 'CHEESE', 'CHEMICAL', 'CHEST', 'CHICKEN', 'CHIEF', 'CHILD', 'CHILDREN', 'CHOICE', 'CHOOSE', 'CHOSE', 'CHOSEN', 'CHURCH', 'CIRCLE', 'CIRCUS', 'CITIZEN', 'CITY', 'CLASS', 'CLASSROOM', 'CLAWS', 'CLAY', 'CLEAN', 'CLEAR', 'CLEARLY', 'CLIMATE', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOSET', 'CLOSELY', 'CLOSER', 'CLOTH', 'CLOTHES', 'CLOTHING', 'CLOUD', 'CLUB', 'COACH', 'COAL', 'COAST', 'COAT', 'CODEPEN', 'COFFEE', 'COLD', 'COLLECT', 'COLLEGE', 'COLONY', 'COLOR', 'COLUMN', 'COMBINATION', 'COMBINE', 'COME', 'COMFORTABLE', 'COMING', 'COMMAND', 'COMMON', 'COMMUNITY', 'COMPANY', 'COMPARE', 'COMPASS', 'COMPLETE', 'COMPLETELY', 'COMPLEX', 'COMPOSED', 'COMPOSITION', 'COMPOUND', 'CONCERNED', 'CONDITION', 'CONGRESS', 'CONNECTED', 'CONSIDER', 'CONSIST', 'CONSONANT', 'CONSTANTLY', 'CONSTRUCTION', 'CONTAIN', 'CONTINENT', 'CONTINUED', 'CONTRAST', 'CONTROL', 'CONVERSATION', 'COOK', 'COOKIES', 'COOL', 'COPPER', 'COPY', 'CORN', 'CORNER', 'CORRECT', 'CORRECTLY', 'COST', 'COTTON', 'COULD', 'COUNT', 'COUNTRY', 'COUPLE', 'COURAGE', 'COURSE', 'COURT', 'COVER', 'COW', 'COWBOY', 'CRACK', 'CREAM', 'CREATE', 'CREATURE', 'CREW', 'CROP', 'CROSS', 'CROWD', 'CRY', 'CUP', 'CURIOUS', 'CURRENT', 'CURVE', 'CUSTOMS', 'CUT', 'CUTTING', 'DAILY', 'DAMAGE', 'DANCE', 'DANGER', 'DANGEROUS', 'DARK', 'DARKNESS', 'DATE', 'DAUGHTER', 'DAWN', 'DAY', 'DEAD', 'DEAL', 'DEAR', 'DEATH', 'DECIDE', 'DECLARED', 'DEEP', 'DEEPLY', 'DEER', 'DEFINITION', 'DEGREE', 'DEPEND', 'DEPTH', 'DESCRIBE', 'DESERT', 'DESIGN', 'DESK', 'DETAIL', 'DETERMINE', 'DEVELOP', 'DEVELOPMENT', 'DIAGRAM', 'DIAMETER', 'DID', 'DIE', 'DIFFER', 'DIFFERENCE', 'DIFFERENT', 'DIFFICULT', 'DIFFICULTY', 'DIG', 'DINNER', 'DIRECT', 'DIRECTION', 'DIRECTLY', 'DIRT', 'DIRTY', 'DISAPPEAR', 'DISCOVER', 'DISCOVERY', 'DISCUSS', 'DISCUSSION', 'DISEASE', 'DISH', 'DISTANCE', 'DISTANT', 'DIVIDE', 'DIVISION', 'DO', 'DOCTOR', 'DOES', 'DOG', 'DOING', 'DOLL', 'DOLLAR', 'DONE', 'DONKEY', 'DOOR', 'DOT', 'DOUBLE', 'DOUBT', 'DOWN', 'DOZEN', 'DRAW', 'DRAWN', 'DREAM', 'DRESS', 'DREW', 'DRIED', 'DRINK', 'DRIVE', 'DRIVEN', 'DRIVER', 'DRIVING', 'DROP', 'DROPPED', 'DROVE', 'DRY', 'DUCK', 'DUE', 'DUG', 'DULL', 'DURING', 'DUST', 'DUTY', 'EACH', 'EAGER', 'EAR', 'EARLIER', 'EARLY', 'EARN', 'EARTH', 'EASIER', 'EASILY', 'EAST', 'EASY', 'EAT', 'EATEN', 'EDGE', 'EDUCATION', 'EFFECT', 'EFFORT', 'EGG', 'EIGHT', 'EITHER', 'ELECTRIC', 'ELECTRICITY', 'ELEMENT', 'ELEPHANT', 'ELEVEN', 'ELSE', 'EMPTY', 'END', 'ENEMY', 'ENERGY', 'ENGINE', 'ENGINEER', 'ENJOY', 'ENOUGH', 'ENTER', 'ENTIRE', 'ENTIRELY', 'ENVIRONMENT', 'EQUAL', 'EQUALLY', 'EQUATOR', 'EQUIPMENT', 'ESCAPE', 'ESPECIALLY', 'ESSENTIAL', 'ESTABLISH', 'EVEN', 'EVENING', 'EVENT', 'EVENTUALLY', 'EVER', 'EVERY', 'EVERYBODY', 'EVERYONE', 'EVERYTHING', 'EVERYWHERE', 'EVIDENCE', 'EXACT', 'EXACTLY', 'EXAMINE', 'EXAMPLE', 'EXCELLENT', 'EXCEPT', 'EXCHANGE', 'EXCITED', 'EXCITEMENT', 'EXCITING', 'EXCLAIMED', 'EXERCISE', 'EXIST', 'EXPECT', 'EXPERIENCE', 'EXPERIMENT', 'EXPLAIN', 'EXPLANATION', 'EXPLORE', 'EXPRESS', 'EXPRESSION', 'EXTRA', 'EYE', 'FACE', 'FACING', 'FACT', 'FACTOR', 'FACTORY', 'FAILED', 'FAIR', 'FAIRLY', 'FALL', 'FALLEN', 'FAMILIAR', 'FAMILY', 'FAMOUS', 'FAR', 'FARM', 'FARMER', 'FARTHER', 'FAST', 'FASTENED', 'FASTER', 'FAT', 'FATHER', 'FAVORITE', 'FEAR', 'FEATHERS', 'FEATURE', 'FED', 'FEED', 'FEEL', 'FEET', 'FELL', 'FELLOW', 'FELT', 'FENCE', 'FEW', 'FEWER', 'FIELD', 'FIERCE', 'FIFTEEN', 'FIFTH', 'FIFTY', 'FIGHT', 'FIGHTING', 'FIGURE', 'FILL', 'FILM', 'FINAL', 'FINALLY', 'FIND', 'FINE', 'FINEST', 'FINGER', 'FINISH', 'FIRE', 'FIREPLACE', 'FIRM', 'FIRST', 'FISH', 'FIVE', 'FIX', 'FLAG', 'FLAME', 'FLAT', 'FLEW', 'FLIES', 'FLIGHT', 'FLOATING', 'FLOOR', 'FLOW', 'FLOWER', 'FLY', 'FOG', 'FOLKS', 'FOLLOW', 'FOOD', 'FOOT', 'FOOTBALL', 'FOR', 'FORCE', 'FOREIGN', 'FOREST', 'FORGET', 'FORGOT', 'FORGOTTEN', 'FORM', 'FORMER', 'FORT', 'FORTH', 'FORTY', 'FORWARD', 'FOUGHT', 'FOUND', 'FOUR', 'FOURTH', 'FOX', 'FRAME', 'FREE', 'FREEDOM', 'FREQUENTLY', 'FRESH', 'FRIEND', 'FRIENDLY', 'FRIGHTEN', 'FROG', 'FROM', 'FRONT', 'FROZEN', 'FRUIT', 'FUEL', 'FULL', 'FULLY', 'FUN', 'FUNCTION', 'FUNNY', 'FUR', 'FURNITURE', 'FURTHER', 'FUTURE', 'GAIN', 'GAME', 'GARAGE', 'GARDEN', 'GAS', 'GASOLINE', 'GATE', 'GATHER', 'GAVE', 'GENERAL', 'GENERALLY', 'GENTLE', 'GENTLY', 'GET', 'GETTING', 'GIANT', 'GIFT', 'GIRL', 'GIVE', 'GIVEN', 'GIVING', 'GLAD', 'GLASS', 'GLOBE', 'GO', 'GOES', 'GOLD', 'GOLDEN', 'GONE', 'GOOD', 'GOOSE', 'GOT', 'GOVERNMENT', 'GRABBED', 'GRADE', 'GRADUALLY', 'GRAIN', 'GRANDFATHER', 'GRANDMOTHER', 'GRAPH', 'GRASS', 'GRAVITY', 'GRAY', 'GREAT', 'GREATER', 'GREATEST', 'GREATLY', 'GREEN', 'GREW', 'GROUND', 'GROUP', 'GROW', 'GROWN', 'GROWTH', 'GUARD', 'GUESS', 'GUIDE', 'GULF', 'GUN', 'HABIT', 'HAD', 'HAIR', 'HALF', 'HALFWAY', 'HALL', 'HAND', 'HANDLE', 'HANDSOME', 'HANG', 'HAPPEN', 'HAPPENED', 'HAPPILY', 'HAPPY', 'HARBOR', 'HARD', 'HARDER', 'HARDLY', 'HAS', 'HAT', 'HAVE', 'HAVING', 'HAY', 'HE', 'HEADED', 'HEADING', 'HEALTH', 'HEARD', 'HEARING', 'HEART', 'HEAT', 'HEAVY', 'HEIGHT', 'HELD', 'HELLO', 'HELP', 'HELPFUL', 'HER', 'HERD', 'HERE', 'HERSELF', 'HIDDEN', 'HIDE', 'HIGH', 'HIGHER', 'HIGHEST', 'HIGHWAY', 'HILL', 'HIM', 'HIMSELF', 'HIS', 'HISTORY', 'HIT', 'HOLD', 'HOLE', 'HOLLOW', 'HOME', 'HONOR', 'HOPE', 'HORN', 'HORSE', 'HOSPITAL', 'HOT', 'HOUR', 'HOUSE', 'HOW', 'HOWEVER', 'HUGE', 'HUMAN', 'HUNDRED', 'HUNG', 'HUNGRY', 'HUNT', 'HUNTER', 'HURRIED', 'HURRY', 'HURT', 'HUSBAND', 'ICE', 'IDEA', 'IDENTITY', 'IF', 'ILL', 'IMAGE', 'IMAGINE', 'IMMEDIATELY', 'IMPORTANCE', 'IMPORTANT', 'IMPOSSIBLE', 'IMPROVE', 'IN', 'INCH', 'INCLUDE', 'INCLUDING', 'INCOME', 'INCREASE', 'INDEED', 'INDEPENDENT', 'INDICATE', 'INDIVIDUAL', 'INDUSTRIAL', 'INDUSTRY', 'INFLUENCE', 'INFORMATION', 'INSIDE', 'INSTANCE', 'INSTANT', 'INSTEAD', 'INSTRUMENT', 'INTEREST', 'INTERIOR', 'INTO', 'INTRODUCED', 'INVENTED', 'INVOLVED', 'IRON', 'IS', 'ISLAND', 'IT', 'ITS', 'ITSELF', 'JACK', 'JAR', 'JET', 'JOB', 'JOIN', 'JOINED', 'JOURNEY', 'JOY', 'JUDGE', 'JUMP', 'JUNGLE', 'JUST', 'KEEP', 'KEPT', 'KEY', 'KIDS', 'KILL', 'KIND', 'KITCHEN', 'KNEW', 'KNIFE', 'KNOW', 'KNOWLEDGE', 'KNOWN', 'LABEL', 'LABOR', 'LACK', 'LADY', 'LAID', 'LAKE', 'LAMP', 'LAND', 'LANGUAGE', 'LARGE', 'LARGER', 'LARGEST', 'LAST', 'LATE', 'LATER', 'LAUGH', 'LAW', 'LAY', 'LAYERS', 'LEAD', 'LEADER', 'LEAF', 'LEARN', 'LEAST', 'LEATHER', 'LEAVE', 'LEAVING', 'LED', 'LEFT', 'LEG', 'LENGTH', 'LESSON', 'LET', 'LETTER', 'LEVEL', 'LIBRARY', 'LIE', 'LIFE', 'LIFT', 'LIGHT', 'LIKE', 'LIKELY', 'LIMITED', 'LINE', 'LION', 'LIPS', 'LIQUID', 'LIST', 'LISTEN', 'LITTLE', 'LIVE', 'LIVING', 'LOAD', 'LOCAL', 'LOCATE', 'LOCATION', 'LOG', 'LONELY', 'LONG', 'LONGER', 'LOOK', 'LOOSE', 'LOSE', 'LOSS', 'LOST', 'LOT', 'LOUD', 'LOVE', 'LOVELY', 'LOW', 'LOWER', 'LUCK', 'LUCKY', 'LUNCH', 'LUNGS', 'LYING', 'MACHINE', 'MACHINERY', 'MAD', 'MADE', 'MAGIC', 'MAGNET', 'MAIL', 'MAIN', 'MAINLY', 'MAJOR', 'MAKE', 'MAKING', 'MAN', 'MANAGED', 'MANNER', 'MANUFACTURING', 'MANY', 'MAP', 'MARK', 'MARKET', 'MARRIED', 'MASS', 'MASSAGE', 'MASTER', 'MATERIAL', 'MATHEMATICS', 'MATTER', 'MAY', 'MAYBE', 'ME', 'MEAL', 'MEAN', 'MEANS', 'MEANT', 'MEASURE', 'MEAT', 'MEDICINE', 'MEET', 'MELTED', 'MEMBER', 'MEMORY', 'MEN', 'MENTAL', 'MERELY', 'MET', 'METAL', 'METHOD', 'MICE', 'MIDDLE', 'MIGHT', 'MIGHTY', 'MILE', 'MILITARY', 'MILK', 'MILL', 'MIND', 'MINE', 'MINERALS', 'MINUTE', 'MIRROR', 'MISSING', 'MISSION', 'MISTAKE', 'MIX', 'MIXTURE', 'MODEL', 'MODERN', 'MOLECULAR', 'MOMENT', 'MONEY', 'MONKEY', 'MONTH', 'MOOD', 'MOON', 'MORE', 'MORNING', 'MOST', 'MOSTLY', 'MOTHER', 'MOTION', 'MOTOR', 'MOUNTAIN', 'MOUSE', 'MOUTH', 'MOVE', 'MOVEMENT', 'MOVIE', 'MOVING', 'MUD', 'MUSCLE', 'MUSIC', 'MUSICAL', 'MUST', 'MY', 'MYSELF', 'MYSTERIOUS', 'NAILS', 'NAME', 'NATION', 'NATIONAL', 'NATIVE', 'NATURAL', 'NATURALLY', 'NATURE', 'NEAR', 'NEARBY', 'NEARER', 'NEAREST', 'NEARLY', 'NECESSARY', 'NECK', 'NEEDED', 'NEEDLE', 'NEEDS', 'NEGATIVE', 'NEIGHBOR', 'NEIGHBORHOOD', 'NERVOUS', 'NEST', 'NEVER', 'NEW', 'NEWS', 'NEWSPAPER', 'NEXT', 'NICE', 'NIGHT', 'NINE', 'NO', 'NOBODY', 'NODDED', 'NOISE', 'NONE', 'NOON', 'NOR', 'NORTH', 'NOSE', 'NOT', 'NOTE', 'NOTED', 'NOTHING', 'NOTICE', 'NOUN', 'NOW', 'NUMBER', 'NUMERAL', 'NUTS', 'OBJECT', 'OBSERVE', 'OBTAIN', 'OCCASIONALLY', 'OCCUR', 'OCEAN', 'OF', 'OFF', 'OFFER', 'OFFICE', 'OFFICER', 'OFFICIAL', 'OIL', 'OLD', 'OLDER', 'OLDEST', 'ON', 'ONCE', 'ONE', 'ONLY', 'ONTO', 'OPEN', 'OPERATION', 'OPINION', 'OPPORTUNITY', 'OPPOSITE', 'OR', 'ORANGE', 'ORBIT', 'ORDER', 'ORDINARY', 'ORGANIZATION', 'ORGANIZED', 'ORIGIN', 'ORIGINAL', 'OTHER', 'OUGHT', 'OUR', 'OURSELVES', 'OUT', 'OUTER', 'OUTLINE', 'OUTSIDE', 'OVER', 'OWN', 'OWNER', 'OXYGEN', 'PACK', 'PACKAGE', 'PAGE', 'PAID', 'PAIN', 'PAINT', 'PAIR', 'PALACE', 'PALE', 'PAN', 'PAPER', 'PARAGRAPH', 'PARALLEL', 'PARENT', 'PARK', 'PART', 'PARTICLES', 'PARTICULAR', 'PARTICULARLY', 'PARTLY', 'PARTS', 'PARTY', 'PASS', 'PASSAGE', 'PAST', 'PATH', 'PATTERN', 'PAY', 'PEACE', 'PEN', 'PENCIL', 'PEOPLE', 'PER', 'PERCENT', 'PERFECT', 'PERFECTLY', 'PERHAPS', 'PERIOD', 'PERSON', 'PERSONAL', 'PET', 'PHRASE', 'PHYSICAL', 'PIANO', 'PICK', 'PICTURE', 'PICTURED', 'PIE', 'PIECE', 'PIG', 'PILE', 'PILOT', 'PINE', 'PINK', 'PIPE', 'PITCH', 'PLACE', 'PLAIN', 'PLAN', 'PLANE', 'PLANET', 'PLANNED', 'PLANNING', 'PLANT', 'PLASTIC', 'PLATE', 'PLATES', 'PLAY', 'PLEASANT', 'PLEASE', 'PLEASURE', 'PLENTY', 'PLURAL', 'PLUS', 'POCKET', 'POEM', 'POET', 'POETRY', 'POINT', 'POLE', 'POLICE', 'POLICEMAN', 'POLITICAL', 'POND', 'PONY', 'POOL', 'POOR', 'POPULAR', 'POPULATION', 'PORCH', 'PORT', 'POSITION', 'POSITIVE', 'POSSIBLE', 'POSSIBLY', 'POST', 'POT', 'POTATOES', 'POUND', 'POUR', 'POWDER', 'POWER', 'POWERFUL', 'PRACTICAL', 'PRACTICE', 'PREPARE', 'PRESENT', 'PRESIDENT', 'PRESS', 'PRESSURE', 'PRETTY', 'PREVENT', 'PREVIOUS', 'PRICE', 'PRIDE', 'PRIMITIVE', 'PRINCIPAL', 'PRINCIPLE', 'PRINTED', 'PRIVATE', 'PRIZE', 'PROBABLY', 'PROBLEM', 'PROCESS', 'PRODUCE', 'PRODUCT', 'PRODUCTION', 'PROGRAM', 'PROGRESS', 'PROMISED', 'PROPER', 'PROPERLY', 'PROPERTY', 'PROTECTION', 'PROUD', 'PROVE', 'PROVIDE', 'PUBLIC', 'PULL', 'PUPIL', 'PURE', 'PURPLE', 'PURPOSE', 'PUSH', 'PUT', 'PUTTING', 'QUARTER', 'QUEEN', 'QUESTION', 'QUICK', 'QUICKLY', 'QUIET', 'QUIETLY', 'QUITE', 'RABBIT', 'RACE', 'RADIO', 'RAILROAD', 'RAIN', 'RAISE', 'RAN', 'RANCH', 'RANGE', 'RAPIDLY', 'RATE', 'RATHER', 'RAW', 'RAYS', 'REACH', 'READ', 'READER', 'READY', 'REAL', 'REALIZE', 'REAR', 'REASON', 'RECALL', 'RECEIVE', 'RECENT', 'RECENTLY', 'RECOGNIZE', 'RECORD', 'RED', 'REFER', 'REFUSED', 'REGION', 'REGULAR', 'RELATED', 'RELATIONSHIP', 'RELIGIOUS', 'REMAIN', 'REMARKABLE', 'REMEMBER', 'REMOVE', 'REPEAT', 'REPLACE', 'REPLIED', 'REPORT', 'REPRESENT', 'REQUIRE', 'RESEARCH', 'RESPECT', 'REST', 'RESULT', 'RETURN', 'REVIEW', 'RHYME', 'RHYTHM', 'RICE', 'RICH', 'RIDE', 'RIDING', 'RIGHT', 'RING', 'RISE', 'RISING', 'RIVER', 'ROAD', 'ROAR', 'ROCK', 'ROCKET', 'ROCKY', 'ROD', 'ROLL', 'ROOF', 'ROOM', 'ROOT', 'ROPE', 'ROSE', 'ROUGH', 'ROUND', 'ROUTE', 'ROW', 'RUBBED', 'RUBBER', 'RULE', 'RULER', 'RUN', 'RUNNING', 'RUSH', 'SAD', 'SADDLE', 'SAFE', 'SAFETY', 'SAID', 'SAIL', 'SALE', 'SALMON', 'SALT', 'SAME', 'SAND', 'SANG', 'SAT', 'SATELLITES', 'SATISFIED', 'SAVE', 'SAVED', 'SAW', 'SAY', 'SCALE', 'SCARED', 'SCENE', 'SCHOOL', 'SCIENCE', 'SCIENTIFIC', 'SCIENTIST', 'SCORE', 'SCREEN', 'SEA', 'SEARCH', 'SEASON', 'SEAT', 'SECOND', 'SECRET', 'SECTION', 'SEE', 'SEED', 'SEEING', 'SEEMS', 'SEEN', 'SELDOM', 'SELECT', 'SELECTION', 'SELL', 'SEND', 'SENSE', 'SENT', 'SENTENCE', 'SEPARATE', 'SERIES', 'SERIOUS', 'SERVE', 'SERVICE', 'SETS', 'SETTING', 'SETTLE', 'SETTLERS', 'SEVEN', 'SEVERAL', 'SHADE', 'SHADOW', 'SHAKE', 'SHAKING', 'SHALL', 'SHALLOW', 'SHAPE', 'SHARE', 'SHARP', 'SHE', 'SHEEP', 'SHEET', 'SHELF', 'SHELLS', 'SHELTER', 'SHINE', 'SHINNING', 'SHIP', 'SHIRT', 'SHOE', 'SHOOT', 'SHOP', 'SHORE', 'SHORT', 'SHORTER', 'SHOT', 'SHOULD', 'SHOULDER', 'SHOUT', 'SHOW', 'SHOWN', 'SHUT', 'SICK', 'SIDES', 'SIGHT', 'SIGN', 'SIGNAL', 'SILENCE', 'SILENT', 'SILK', 'SILLY', 'SILVER', 'SIMILAR', 'SIMPLE', 'SIMPLEST', 'SIMPLY', 'SINCE', 'SING', 'SINGLE', 'SINK', 'SISTER', 'SIT', 'SITTING', 'SITUATION', 'SIX', 'SIZE', 'SKILL', 'SKIN', 'SKY', 'SLABS', 'SLAVE', 'SLEEP', 'SLEPT', 'SLIDE', 'SLIGHT', 'SLIGHTLY', 'SLIP', 'SLIPPED', 'SLOPE', 'SLOW', 'SLOWLY', 'SMALL', 'SMALLER', 'SMALLEST', 'SMELL', 'SMILE', 'SMOKE', 'SMOOTH', 'SNAKE', 'SNOW', 'SO', 'SOAP', 'SOCIAL', 'SOCIETY', 'SOFT', 'SOFTLY', 'SOIL', 'SOLAR', 'SOLD', 'SOLDIER', 'SOLID', 'SOLUTION', 'SOLVE', 'SOME', 'SOMEBODY', 'SOMEHOW', 'SOMEONE', 'SOMETHING', 'SOMETIME', 'SOMEWHERE', 'SON', 'SONG', 'SOON', 'SORT', 'SOUND', 'SOURCE', 'SOUTH', 'SOUTHERN', 'SPACE', 'SPEAK', 'SPECIAL', 'SPECIES', 'SPECIFIC', 'SPEECH', 'SPEED', 'SPELL', 'SPEND', 'SPENT', 'SPIDER', 'SPIN', 'SPIRIT', 'SPITE', 'SPLIT', 'SPOKEN', 'SPORT', 'SPREAD', 'SPRING', 'SQUARE', 'STAGE', 'STAIRS', 'STAND', 'STANDARD', 'STAR', 'STARED', 'START', 'STATE', 'STATEMENT', 'STATION', 'STAY', 'STEADY', 'STEAM', 'STEEL', 'STEEP', 'STEMS', 'STEP', 'STEPPED', 'STICK', 'STIFF', 'STILL', 'STOCK', 'STOMACH', 'STONE', 'STOOD', 'STOP', 'STOPPED', 'STORE', 'STORM', 'STORY', 'STOVE', 'STRAIGHT', 'STRANGE', 'STRANGER', 'STRAW', 'STREAM', 'STREET', 'STRENGTH', 'STRETCH', 'STRIKE', 'STRING', 'STRIP', 'STRONG', 'STRONGER', 'STRUCK', 'STRUCTURE', 'STRUGGLE', 'STUCK', 'STUDENT', 'STUDIED', 'STUDYING', 'SUBJECT', 'SUBSTANCE', 'SUCCESS', 'SUCCESSFUL', 'SUCH', 'SUDDEN', 'SUDDENLY', 'SUGAR', 'SUGGEST', 'SUIT', 'SUM', 'SUMMER', 'SUN', 'SUNLIGHT', 'SUPPER', 'SUPPLY', 'SUPPORT', 'SUPPOSE', 'SURE', 'SURFACE', 'SURPRISE', 'SURROUNDED', 'SWAM', 'SWEET', 'SWEPT', 'SWIM', 'SWIMMING', 'SWING', 'SWUNG', 'SYLLABLE', 'SYMBOL', 'SYSTEM', 'TABLE', 'TAIL', 'TAKE', 'TAKEN', 'TALES', 'TALK', 'TALL', 'TANK', 'TAPE', 'TASK', 'TASTE', 'TAUGHT', 'TAX', 'TEA', 'TEACH', 'TEACHER', 'TEAM', 'TEARS', 'TEETH', 'TELEPHONE', 'TELEVISION', 'TELL', 'TEMPERATURE', 'TEN', 'TENT', 'TERM', 'TERRIBLE', 'TEST', 'THAN', 'THANK', 'THAT', 'THEE', 'THEM', 'THEMSELVES', 'THEN', 'THEORY', 'THERE', 'THEREFORE', 'THESE', 'THEY', 'THICK', 'THIN', 'THING', 'THINK', 'THIRD', 'THIRTY', 'THIS', 'THOSE', 'THOU', 'THOUGH', 'THOUGHT', 'THOUSAND', 'THREAD', 'THREE', 'THREW', 'THROAT', 'THROUGH', 'THROUGHOUT', 'THROW', 'THROWN', 'THUMB', 'THUS', 'THY', 'TIDE', 'TIE', 'TIGHT', 'TIGHTLY', 'TILL', 'TIME', 'TIN', 'TINY', 'TIP', 'TIRED', 'TITLE', 'TO', 'TOBACCO', 'TODAY', 'TOGETHER', 'TOLD', 'TOMORROW', 'TONE', 'TONGUE', 'TONIGHT', 'TOO', 'TOOK', 'TOOL', 'TOP', 'TOPIC', 'TORN', 'TOTAL', 'TOUCH', 'TOWARD', 'TOWER', 'TOWN', 'TOY', 'TRACE', 'TRACK', 'TRADE', 'TRAFFIC', 'TRAIL', 'TRAIN', 'TRANSPORTATION', 'TRAP', 'TRAVEL', 'TREATED', 'TREE', 'TRIANGLE', 'TRIBE', 'TRICK', 'TRIED', 'TRIP', 'TROOPS', 'TROPICAL', 'TROUBLE', 'TRUCK', 'TRUNK', 'TRUTH', 'TRY', 'TUBE', 'TUNE', 'TURN', 'TWELVE', 'TWENTY', 'TWICE', 'TWO', 'TYPE', 'TYPICAL', 'UNCLE', 'UNDER', 'UNDERLINE', 'UNDERSTANDING', 'UNHAPPY', 'UNION', 'UNIT', 'UNIVERSE', 'UNKNOWN', 'UNLESS', 'UNTIL', 'UNUSUAL', 'UP', 'UPON', 'UPPER', 'UPWARD', 'US', 'USE', 'USEFUL', 'USING', 'USUAL', 'USUALLY', 'VALLEY', 'VALUABLE', 'VALUE', 'VAPOR', 'VARIETY', 'VARIOUS', 'VAST', 'VEGETABLE', 'VERB', 'VERTICAL', 'VERY', 'VESSELS', 'VICTORY', 'VIEW', 'VILLAGE', 'VISIT', 'VISITOR', 'VOICE', 'VOLUME', 'VOTE', 'VOWEL', 'VOYAGE', 'WAGON', 'WAIT', 'WALK', 'WALL', 'WANT', 'WAR', 'WARM', 'WARN', 'WAS', 'WASH', 'WASTE', 'WATCH', 'WATER', 'WAVE', 'WAY', 'WE', 'WEAK', 'WEALTH', 'WEAR', 'WEATHER', 'WEEK', 'WEIGH', 'WEIGHT', 'WELCOME', 'WELL', 'WENT', 'WERE', 'WEST', 'WESTERN', 'WET', 'WHALE', 'WHAT', 'WHATEVER', 'WHEAT', 'WHEEL', 'WHEN', 'WHENEVER', 'WHERE', 'WHEREVER', 'WHETHER', 'WHICH', 'WHILE', 'WHISPERED', 'WHISTLE', 'WHITE', 'WHO', 'WHOLE', 'WHOM', 'WHOSE', 'WHY', 'WIDE', 'WIDELY', 'WIFE', 'WILD', 'WILL', 'WILLING', 'WIN', 'WIND', 'WINDOW', 'WING', 'WINTER', 'WIRE', 'WISE', 'WISH', 'WITH', 'WITHIN', 'WITHOUT', 'WOLF', 'WOMEN', 'WON', 'WONDER', 'WONDERFUL', 'WOOD', 'WOODEN', 'WOOL', 'WORD', 'WORE', 'WORK', 'WORKER', 'WORLD', 'WORRIED', 'WORRY', 'WORSE', 'WORTH', 'WOULD', 'WRAPPED', 'WRITE', 'WRITER', 'WRITING', 'WRITTEN', 'WRONG', 'WROTE', 'YARD', 'YEAR', 'YELLOW', 'YES', 'YESTERDAY', 'YET', 'YOU', 'YOUNG', 'YOUNGER', 'YOUR', 'YOURSELF', 'YOUTH', 'ZERO', 'ZOO'];\n    this.length = this.words.length;\n  }\n\n  newWord() {\n    let randNum = Math.floor(Math.random() * this.length);\n    let randWord = this.words[randNum];\n    return randWord;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Words);\n\n//# sourceURL=webpack:///./src/words.js?");

/***/ })

/******/ });