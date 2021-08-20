//console.log = function () { };  // ログを出す時にはコメントアウトする

const SCREEN_WIDTH = 900;             // スクリーン幅
const SCREEN_HEIGHT = 1600;                 // スクリーン高さ
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const FPS = 60; // 60フレ

const FONT_FAMILY = "'misaki_gothic','Meiryo',sans-serif";
const ASSETS = {
    "ntk01": "./resource/bomb/NTK_01.png",
    "ntk02": "./resource/bomb/NTK_02.png",
    "ntk03": "./resource/bomb/NTK_03.png",
    "ntk04": "./resource/bomb/NTK_04.png",
    "ntk05": "./resource/bomb/NTK_05.png",
    "ntk06": "./resource/bomb/NTK_06.png",
    "ntk07": "./resource/bomb/NTK_07.png",
    "ntk08": "./resource/bomb/NTK_08.png",
    "ntk09": "./resource/bomb/NTK_09.png",
    "ntk10": "./resource/bomb/NTK_10.png",
};

const BOMB_DEF = defineEnum({
    BOMB_LV_0: {
        sprName: "ntk01",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 1,
    },
    BOMB_LV_1: {
        sprName: "ntk02",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_2: {
        sprName: "ntk03",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_3: {
        sprName: "ntk04",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_4: {
        sprName: "ntk05",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_5: {
        sprName: "ntk06",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_6: {
        sprName: "ntk07",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_7: {
        sprName: "ntk08",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_8: {
        sprName: "ntk09",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_9: {
        sprName: "ntk10",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
});

const bombTable = [
    { bomb: BOMB_DEF.BOMB_LV_0, num: 10 },
    { bomb: BOMB_DEF.BOMB_LV_1, num: 20 },
    { bomb: BOMB_DEF.BOMB_LV_2, num: 30 },
    { bomb: BOMB_DEF.BOMB_LV_3, num: 40 },
    { bomb: BOMB_DEF.BOMB_LV_4, num: 50 },
    { bomb: BOMB_DEF.BOMB_LV_5, num: 60 },
    { bomb: BOMB_DEF.BOMB_LV_6, num: 70 },
    { bomb: BOMB_DEF.BOMB_LV_7, num: 80 },
    { bomb: BOMB_DEF.BOMB_LV_8, num: 90 },
    { bomb: BOMB_DEF.BOMB_LV_9, num: 100 },
];

// 表示プライオリティは 0：奥 → 9：手前 の順番
let group0 = null;  // BG

var plBombArray = [];
var uidCounter = 0;

let isStart = false;

let randomSeed = 3557;
let randomMode = Boolean(0);

tm.main(function () {
    // アプリケーションクラスを生成
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);    // サイズ(解像度)設定
    app.canvas.imageSmoothingEnabled = false;   // アンチエイリアシングOFF
    app.fitWindow();                            // 自動フィッティング有効
    app.background = "rgba(77, 136, 255, 1.0)"; // 背景色
    app.fps = FPS;                              // フレーム数

    var loading = tm.ui.LoadingScene({
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });

    // 読み込み完了後に呼ばれるメソッドを登録
    loading.onload = function () {
        app.replaceScene(LogoScene());
    };

    // ローディングシーンに入れ替える
    app.replaceScene(loading);

    // 実行
    app.run();
});

/*
 * ロゴ
 */
tm.define("LogoScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        this.fromJSON({
            children: [
                {
                    type: "Label", name: "titleLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fillStyle: "#fff",
                    fontSize: 160,
                    fontFamily: FONT_FAMILY,
                    text: "Happy\nBirth\nDay",
                    align: "center",
                },
            ]
        });
        this.localTimer = 0;
        if (!randomMode) randomSeed = 3557;
        clearArrays();

        group0 = tm.display.CanvasElement().addChildTo(this);   // BG
        isStart = false;

        var self = this;
    },

    onpointingstart: function () {
        isStart = true;
    },

    update: function (app) {
        app.background = "rgba(0, 0, 0, 1.0)"; // 背景色
        if (!isStart) return;
        for (let ii = 0; ii < 100 - plBombArray.length; ii++) {
            let xPos = getRandomInt(SCREEN_WIDTH - 64) + 64;
            let yPos = getRandomInt(SCREEN_HEIGHT - 64) + 64;
            let bomb = PlBombSprite(++uidCounter, bombTable[getRandomInt(10)].bomb, xPos, yPos).addChildTo(group0);
            plBombArray.push(bomb);
        }

        let deadPlBulletArray = [];
        for (let ii = 0; ii < plBombArray.length; ii++) {
            let tmpBomb = plBombArray[ii];
            if (tmpBomb.status !== 3) continue;
            deadPlBulletArray.push(tmpBomb);
        }

        for (var ii = 0; ii < deadPlBulletArray.length; ii++) {
            if (deadPlBulletArray[ii].parent == null) console.log("NULL!!");
            else deadPlBulletArray[ii].remove();
            plBombArray.erase(deadPlBulletArray[ii]);
        }
    }
});

tm.define("PlBombSprite", {
    superClass: "tm.app.Sprite",

    init: function (uid, bombdef, xPos, yPos) {
        this.uid = uid;
        this.define = bombdef;
        this.superInit(bombdef.sprName, bombdef.sprSize.x, bombdef.sprSize.y);
        this.direct = '';
        this.zRot = getRandomInt(360);
        this.bombScale = 0;
        this.setPosition(xPos, yPos).setScale(0, 0);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.status = 0;
        this.timer = getRandomInt(150);
    },

    update: function (app) {
        switch (this.status) {
            case 0:
                if (--this.timer <= 0) {
                    this.timer = 180;
                    this.status = 1;
                }
                break;
            case 1:
                this.bombScale += 1 / 60;
                if (--this.timer <= 0) {
                    this.timer = 180;
                    this.bombScale = 3;
                    this.status = 2;
                }
                break;
            case 2:
                this.bombScale -= 1 / 60;
                if (--this.timer <= 0) {
                    this.timer = 180;
                    this.bombScale = 0;
                    this.status = 3;
                }
                break;
            default:
        }

        this.zRot += 5;
        this.rotation = this.zRot;
        this.setScale(this.bombScale, this.bombScale);
    },
});

// 配列クリア
function clearArrays() {
    var self = this;

    for (let ii = self.plBombArray.length - 1; ii >= 0; ii--) {
        let tmp = self.plBombArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.plBombArray.erase(tmp);
    }
}

// 指定の範囲で乱数を求める
// ※start < end
// ※startとendを含む
function myRandom(start, end) {
    if (randomMode) {
        let max = (end - start) + 1;
        return Math.floor(Math.random() * Math.floor(max)) + start;
    } else {
        let mod = (end - start) + 1;
        randomSeed = (randomSeed * 5) + 1;
        for (; ;) {
            if (randomSeed < 2147483647) break;
            randomSeed -= 2147483647;
        }
        return (randomSeed % mod) + start;
    }
}
// 0~max（※maxは含まない）
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
