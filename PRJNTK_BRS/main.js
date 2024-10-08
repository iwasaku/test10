phina.globalize();

console.log = function () { };  // ログを出す時にはコメントアウトする
let isMUTEKI = false;           // true:当たり判定無し
let isNoSHOT = false;           // true:弾を撃たない
let dispCollision = false;      // true:コリジョンを表示する

// 表示プライオリティは 0：奥 → 9：手前 の順番
let group0 = null;  // BG
let group1 = null;  // BG
let group2 = null;  // フェード
let group3 = null;  // 雲
let group4 = null;  // boss, enemy, item
let group5 = null;  // bomb
let group6 = null;  // player
let group7 = null;  // en_shot
let group8 = null;  // pl_shot
let group9 = null;  // status

let nowScoreLabel = null;
let nowLifeLeftLabel = null;
let nowBombLeftLabel = null;
let ntkGaugeLabel = null;

let xButton = null;
let threadsButton = null;
let bskyButton = null;
let restartButton = null;
let bombButton = null;
let bombButtonStatus = BB_STATUS.WAIT;

let stageBG = [null, null];
let player = null;

var plBulletArray = [];
var plBombArray = [];
var enemyArray = [];
var enBulletArray = [];
var collisionArray = [];

let nowScore = 0;
let nowStageNum = 0;
let nowLoopCount = 0;
let isBOSSSRUSH = false;
let stageScrollFlag = [true, true];
let ctrlCounterFlag = true;
let ctrlCounter = 0;
let deadStatus = 0;

let stageNumLabelAlpha = true;  // true:加算 false:原産
let stageNumLabelTimer = 0;
let stageNumLabelCount = 0;
let warningLabelAlpha = true;  // true:加算 false:原産
let warningLabelTimer = 0;

let itemAppearCounter = 0;
let itemAppearKind = 0;
let itemAppearShootCounter = 1;
let itemAppearFairyCounter = 5;
let itemAppearBombCounter = 5;

let uidCounter = 0;

let randomSeed = 3557;
let randomMode = Boolean(0);

const SHOT_LV_MAX = 7;
const SPEED_MAX = 3;
const BOMB_LEFT_MAX = 10;
const LIFE_MAX = 10;
const SCORE_MAX = 999999999;
const STG_NUM_MAX = 1;

// 共有ボタン用
let postText = null;
const postURL = "https://iwasaku.github.io/test10/PRJNTK_BRS/";
const postTags = "#ネムレス #NEMLESSS";

// ローディング画面
phina.define('LoadingScene', {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit(options);
        // 背景色
        this.backgroundColor = 'black';
        var self = this;
        var loader = phina.asset.AssetLoader();

        // 明滅するラベル
        let label = phina.display.Label({
            text: "",
            fontSize: 64,
            fill: 'white',
        }).addChildTo(this).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);

        // ロードが進行したときの処理
        loader.onprogress = function (e) {
            // 進捗具合を％で表示する
            label.text = "{0}%".format((e.progress * 100).toFixed(0));
        };

        // ローダーによるロード完了ハンドラ
        loader.onload = function () {
            // Appコアにロード完了を伝える（==次のSceneへ移行）
            self.flare('loaded');
        };

        // ロード開始
        loader.load(options.assets);
    },

});

/*
 */
phina.define("InitScene", {
    // 継承
    superClass: 'DisplayScene',
    // 初期化
    init: function (option) {
        // 親クラス初期化
        this.superInit(option);
        this.font1 = false;
        this.font2 = false;
    },
    update: function (app) {
        // フォント読み込み待ち
        var self = this;
        document.fonts.load('10pt "misaki_gothic"').then(function () {
            self.font1 = true;
        });
        document.fonts.load('10pt "icomoon"').then(function () {
            self.font2 = true;
        });
        if (this.font1 && this.font2) {
            self.exit();
        }
    }
});
/*
 */
phina.define("TitleScene", {
    // 継承
    superClass: 'DisplayScene',
    // 初期化
    init: function (option) {
        // 親クラス初期化
        this.superInit(option);
        // 背景色
        this.backgroundColor = 'black';
        // ラベル
        Label({
            text: 'PROJECT\nN.T.K',
            fontSize: 160,
            fontFamily: "misaki_gothic",
            fill: 'white',
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
        Label({
            text: '- Ver.B.R.S. -',
            fontSize: 60,
            fontFamily: "misaki_gothic",
            fill: 'white',
        }).addChildTo(this).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y + SCREEN_HEIGHT * 1.1 / 8);
        Label({
            text: 'TAP TO START',
            fontSize: 80,
            fontFamily: "misaki_gothic",
            fill: 'white',
        }).addChildTo(this).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y + SCREEN_HEIGHT * 1 / 4);
    },
    // タッチで次のシーンへ
    onpointstart: function () {
        this.exit();
    },
});
/*
*/
phina.define('MainScene', {
    superClass: 'DisplayScene',

    init: function (option) {
        that = this;
        // 親クラス初期化
        this.superInit(option);
        // 背景色
        this.backgroundColor = 'black';//    this.backgroundColor = '#ffaaaa';

        if (!randomMode) randomSeed = 3557;

        group0 = DisplayElement().addChildTo(this);   // BG
        group1 = DisplayElement().addChildTo(this);   // BG
        group2 = DisplayElement().addChildTo(this);   // フェード
        group3 = DisplayElement().addChildTo(this);   // 雲
        group4 = DisplayElement().addChildTo(this);   // boss, enemy, item
        group5 = DisplayElement().addChildTo(this);   // bomb
        group6 = DisplayElement().addChildTo(this);   // player
        group7 = DisplayElement().addChildTo(this);   // en_bullet
        group8 = DisplayElement().addChildTo(this);   // pl_bullet
        group9 = DisplayElement().addChildTo(this);   // ステータス（score, left, bomb）

        clearArrays();
        player = PlayerSprite().addChildTo(group6);

        stageBG[0] = StageSprite("stg01", -SCREEN_HEIGHT * 1.5, 1600 * 5, 1.0).addChildTo(group0);
        stageBG[1] = StageSprite("stg02", -SCREEN_HEIGHT * 1.5, 1600 * 5, 0.0).addChildTo(group1);

        // ラベル設定
        nowScoreLabel = Label(
            {
                text: "0",
                fontSize: 80,
                //fontWeight: "bold",
                fontFamily: "misaki_gothic",
                align: "right",
                //baseline: "bottom",
                //lineHeight: 3,

                //padding: 20,
                //backgroundColor: "lightgreen",
                fill: "white",
                stroke: "blue",
                strokeWidth: 10,
                shadow: "black",
                shadowBlur: 10,
            }
        ).addChildTo(group9).setPosition(SCREEN_WIDTH - 16, 60);

        nowLifeLeftLabel = Label(
            {
                text: "♥♥♥",
                fontSize: 40,
                fontFamily: "misaki_gothic",
                align: "left",

                fill: "red",
                shadowColor: "black",
                shadowBlur: 10,
            }
        ).addChildTo(group9).setPosition(0 + 16, 60);
        nowBombLeftLabel = Label(
            {
                text: "夏夏夏",
                fontSize: 40,
                fontFamily: "misaki_gothic",
                align: "left",

                fill: "lightskyblue",
                stroke: "blue",
                strokeWidth: 10,
                shadow: "white",
                shadowBlur: 10,
            }
        ).addChildTo(group9).setPosition(0 + 16, 115);

        ntkGaugeLabel = Label(
            {
                text: "",
                fontSize: 80,
                fontFamily: "misaki_gothic",
                align: "center",

                fill: "lightskyblue",
                stroke: "blue",
                strokeWidth: 10,
                shadow: "black",
                shadowBlur: 10,
            }
        ).addChildTo(group9).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y + SCREEN_HEIGHT / 8);

        stageNumLabel = Label(
            {
                text: "",
                fontSize: 150,
                fontFamily: "misaki_gothic",
                align: "center",

                fill: "white",
                stroke: "blue",
                strokeWidth: 10,
                shadow: "black",
                shadowBlur: 10,
            }
        ).addChildTo(group9).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);

        warningLabel = Label(
            {
                text: "",
                fontSize: 160,
                fontFamily: "misaki_gothic",
                align: "center",

                fill: "yellow",
                stroke: "black",
                strokeWidth: 10,
                shadow: "black",
                shadowBlur: 10,
            }
        ).addChildTo(group9).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y - SCREEN_HEIGHT * 1 / 8);

        bombButtonStatus = BB_STATUS.WAIT;
        bombButton = prjButton("夏").addChildTo(group9)
            .setPosition(SCREEN_CENTER_X + SCREEN_WIDTH / 4, SCREEN_CENTER_Y + SCREEN_HEIGHT / 4);
        bombButton.alpha = 0.5;
        // タッチ有効
        bombButton.setInteractive(true);
        // タッチ時の処理
        //        bombButton.onpush = function ();
        bombButton.onpointstart = function () {
            if (bombButtonStatus !== BB_STATUS.WAIT) {
                return;
            }
            bombButtonStatus = BB_STATUS.CHARGE;
        }
        bombButton.onpointmove = function () {
        }
        bombButton.onpointend = function () {
            if (bombButtonStatus !== BB_STATUS.CHARGE) {
                return;
            }
            // bomb発射
            bombButtonStatus = BB_STATUS.SHOOT;
        };
        bombButton.update = function () {
        };

        player.status = PL_STATUS.START;
        player.onenterframe = function (e) {
            if (!this.status.isAccKey) return;

            // ポインター（マウスやタッチ）
            let pointer = e.app.pointer;

            // 移動量×感度を自機の位置に足す
            if (pointer.getPointing()) {
                let oldX = this.x;
                let oldY = this.y;
                this.position.add(pointer.deltaPosition.mul(this.spd));

                // 画面外チェック
                if ((this.x <= 0 + 64) || (this.x >= SCREEN_WIDTH - 64)) {
                    this.x = oldX;
                }
                if ((this.y <= 0 + 128) || (this.y >= SCREEN_HEIGHT - 64)) {
                    this.y = oldY;
                }
            }
        };

        nowScore = 0;
        nowStageNum = 0;
        nowLoopCount = 0;
        isBOSSSRUSH = false;
        stageScrollFlag[0] = true;
        stageScrollFlag[1] = false;
        ctrlCounterFlag = true;
        ctrlCounter = 0;
        totalFrame = 0;
        uidCounter = 0;
        deadStatus = 0;
        stageNumLabelAlpha = true;
        stageNumLabelTimer = 0;
        warningLabelAlpha = true;
        warningLabelTimer = 0;
        itemAppearCounter = 0;
        itemAppearKind = 0;
        itemAppearShootCounter = 1;
        itemAppearFairyCounter = 5;
        itemAppearBombCounter = 5;
        xButton = null;
        threadsButton = null;
        bskyButton = null;
        restartButton = null;
    },
    update: function (app) {
        if (!player.status.isDead) {
            if (player.status.isStarted) {
                totalFrame++;
                totalSec = Math.floor(totalFrame / app.fps);
                // NTKゲージ管理
                ntkGaugeLabel.text = "";
                bombButton.scaleX = 1.0;
                bombButton.scaleY = 1.0;
                switch (bombButtonStatus) {
                    case BB_STATUS.WAIT:
                        break;
                    case BB_STATUS.CHARGE:
                        if ((player.bombLeft <= 0) || (plBombArray.length > 0)) {
                            bombButtonStatus = BB_STATUS.WAIT;
                            player.bombStatus = 0;
                            break;
                        }
                        bombButton.scaleX = 1.25;
                        bombButton.scaleY = 1.25;
                        if ((player.bombStatus != 0) && (player.bombStatus != 1)) break;
                        if (player.bombStatus === 0) {
                            player.bombStatus = 1;
                            player.bombLv = 0;
                            player.bombGauge = 0;
                        }
                        // Lvアップ
                        player.bombGauge += 3;
                        if (player.bombGauge >= 100) {
                            if (++player.bombLv >= 9) {
                                player.bombLv = 9;
                                player.bombGauge = 100;
                            } else {
                                player.bombGauge = 0;
                            }
                        }
                        ntkGaugeLabel.text = "N.T.K. Lv." + (player.bombLv + 1) + "\n" + player.bombGauge + "%";
                        break;
                    case BB_STATUS.SHOOT:
                        bombButtonStatus = BB_STATUS.WAIT;
                        player.bombStatus = 0;
                        if (player.bombLeft <= 0) break;
                        let tmp = bombTable[player.bombLv];
                        for (let ii = 0; ii < tmp.num; ii++) {
                            let xPos = getRandomInt(SCREEN_WIDTH - 64) + 64;
                            let yPos = getRandomInt(SCREEN_HEIGHT - 64) + 64;
                            let bomb = tmp.bomb[getRandomInt(tmp.bomb.length)];
                            let bombSpr = PlBombSprite(++uidCounter, bomb, xPos, yPos).addChildTo(group8);
                            plBombArray.push(bombSpr);
                        }
                        if (--player.bombLeft <= 0) {
                            player.bombLeft = 0;
                        }
                        break;
                }

                // テーブルから該当する行を読み込む
                let ctrlArray = ctrlTable[nowStageNum];
                for (let ii = 0; ii < ctrlArray.length; ii++) {
                    let ctrl = ctrlArray[ii];
                    if (ctrlCounter === ctrl.count) {
                        //                        let sn = "undef";
                        //                        if (ctrl.param.define !== undefined) {
                        //                            sn = ctrl.param.define.sprName;
                        //                        }
                        //                        console.log("" + ctrl.count + ":" + ctrl.cmd.value + ":" + sn);
                        switch (ctrl.cmd) {
                            case CMD.SET_ENEMY:
                                {
                                    // ctrl.param.loopで出現可能な周回かチェックする
                                    if (ctrl.param.loop !== undefined) {
                                        if (ctrl.param.loop > nowLoopCount) {
                                            break;
                                        }
                                    }
                                    let enemy = EnemySprite(++uidCounter, ctrl.param, ctrl.count).addChildTo(group4);
                                    enemyArray.push(enemy);
                                    if (dispCollision) {
                                        for (let ii = 0; ii < ctrl.param.define.colliData.length; ii++) {
                                            let colliData = ctrl.param.define.colliData[ii];
                                            if (!colliData.attr.body) continue; // 機体との当たり判定用データではない
                                            prjCircleShape(uidCounter, enemy.x, enemy.y, colliData).addChildTo(group9);
                                        }
                                    }
                                }
                                break;
                            case CMD.STOP_CTRL_COUNTER:
                                // 止めることはできるけど、再度動かすのは外部（ボスとか）から行う事になる
                                ctrlCounterFlag = false;
                                break;
                            case CMD.SET_CTRL_COUNTER:
                                ctrlCounter = ctrl.param.cnt;
                                break;
                            case CMD.SET_SCROLL_DATA:
                                if (stageBG[getNextIdx()] != null) {
                                    stageBG[getNextIdx()].remove();
                                }
                                if (getNextIdx() == 0) {
                                    stageBG[getNextIdx()] = StageSprite(ctrl.param.sprName, ctrl.param.yPos, ctrl.param.ySize, ctrl.param.alpha).addChildTo(group0);
                                } else {
                                    stageBG[getNextIdx()] = StageSprite(ctrl.param.sprName, ctrl.param.yPos, ctrl.param.ySize, ctrl.param.alpha).addChildTo(group1);
                                }
                                break;
                            case CMD.START_SCROLL_CURRENT:
                                stageScrollFlag[getCurrentIdx()] = true;
                                break;
                            case CMD.START_SCROLL_NEXT:
                                stageScrollFlag[getNextIdx()] = true;
                                break;
                            case CMD.STOP_SCROLL_CURRENT:
                                stageScrollFlag[getCurrentIdx()] = false;
                                break;
                            case CMD.STOP_SCROLL_NEXT:
                                stageScrollFlag[getNextIdx()] = false;
                                break;
                            case CMD.SET_SCROLL_YPOS:
                                stageBG[ctrl.param.idx].y = ctrl.param.ypos;
                                break;
                            case CMD.SET_BOSSSRUSH:
                                isBOSSSRUSH = true;
                                break;
                            case CMD.RESET_BOSSSRUSH:
                                isBOSSSRUSH = false;
                                break;
                            case CMD.FADE_IN:
                                if ((nowLoopCount !== 0) || (nowStageNum !== 0)) {
                                    stageBG[getCurrentIdx()].alphaFlag = 1;
                                }
                                break;
                            case CMD.FADE_OUT:
                                if ((nowLoopCount !== 0) || (nowStageNum !== 0)) {
                                    stageBG[getNextIdx()].alphaFlag = -1;
                                }
                                break;
                            case CMD.CLEAR_ENEMY_ARRAYS:
                                clearEnemyArrays();
                                break;
                            case CMD.DISP_STAGE_NUM:
                                stageNumLabel.text = getStageStr(true);
                                stageNumLabel.alpha = 0;
                                stageNumLabelTimer = 60;
                                break;
                            case CMD.DISP_WARNING:
                                warningLabel.x = SCREEN_WIDTH + 290;
                                warningLabel.text = "WARNING";
                                warningLabel.alpha = 0;
                                warningLabelAlpha = true;
                                warningLabelTimer = 3 * 60;
                                break;
                            default:
                        }
                    }
                }

                if (ctrlCounterFlag) ctrlCounter++
                for (let ii = 0; ii < 2; ii++) {
                    if (stageScrollFlag[ii]) {
                        stageBG[ii].y += 2;
                    }
                }
            }

            // 当たり判定
            checkEnemyPosition();
            checkPlayerBombToEnemy();
            checkPlayerBombToEnemyBullet();
            checkPlayerBulletToEnemy();
            checkEnemyBulletToPlayer();
            checkPlayerToEnemy();
            clearDeadPlayerBombArrays();
            clearDeadEnemyArrays();

            if (nowScore > SCORE_MAX) nowScore = SCORE_MAX;
            nowScoreLabel.text = nowScore;

            let tmpLife = "";
            for (let ii = 0; ii < player.lifeMax; ii++) {
                if (ii < player.lifeLeft) tmpLife += "♥";
                else tmpLife += "♡";
            }
            for (let ii = 0; ii < player.lifeParts; ii++) {
                tmpLife += ".";
            }
            nowLifeLeftLabel.text = tmpLife;

            let tmpBomb = "";
            for (let ii = 0; ii < player.bombLeft; ii++) {
                tmpBomb += "夏";
            }
            nowBombLeftLabel.text = tmpBomb;

            if (stageNumLabelTimer > 0) {
                if (--stageNumLabelTimer === 0) {
                    stageNumLabel.text = "";
                    stageNumLabel.alpha = 0;
                } else {
                    if (stageNumLabelTimer > 45) {
                        stageNumLabel.alpha += 0.066;
                    } else if (stageNumLabelTimer > 15) {
                        stageNumLabel.alpha = 1.0;
                    } else {
                        stageNumLabel.alpha -= 0.066;
                    }
                }
            }

            if (warningLabelTimer > 0) {
                if (--warningLabelTimer === 0) {
                    warningLabel.text = "";
                    warningLabel.alpha = 0;
                } else {
                    if (warningLabelAlpha) {
                        if (warningLabel.alpha < 1) {
                            warningLabel.alpha += 0.05;
                        } else {
                            warningLabel.alpha = 1.0;
                            warningLabelAlpha = false;
                        }
                    } else {
                        if (warningLabel.alpha > 0.2) {
                            warningLabel.alpha -= 0.05;
                        } else {
                            warningLabel.alpha = 0.2;
                            warningLabelAlpha = true;
                        }
                    }
                    if (warningLabel.x > -270) {
                        warningLabel.x -= 25;
                    } else {
                        warningLabel.x = SCREEN_WIDTH + 290;
                    }
                }
            }
        } else {
            // 死亡
            if (deadStatus === 0) {
                deadStatus = 1;
                bombButton.x = SCREEN_CENTER_X;
                bombButton.y = SCREEN_CENTER_Y;

                postText = "PROJECT N.T.K. Ver.B.R.S. ";
                postText += "(" + getStageStr(false) + ")\n";
                postText += "スコア: " + nowScore;

                // X
                xButton = Button(
                    {
                        text: String.fromCharCode(0xe902),
                        fontSize: 80,
                        fontFamily: "icomoon",
                        fill: "#7575EF",  // ボタン色
                        stroke: '#DEE3FF',         // 枠色
                        strokeWidth: 5,         // 枠太さ
                        cornerRadius: 8,
                        width: 96,
                        height: 150,
                    }
                ).addChildTo(group4).setPosition(SCREEN_CENTER_X - (SCREEN_CENTER_X / 2) - 128, SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2)).onclick = function () {
                    // https://developer.x.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
                    let shareURL = "https://x.com/intent/tweet?text=" + encodeURIComponent(postText + "\n" + postTags + "\n") + "&url=" + encodeURIComponent(postURL);
                    window.open(shareURL);
                };
                // threads
                threadsButton = Button(
                    {
                        text: String.fromCharCode(0xe901),
                        fontSize: 80,
                        fontFamily: "icomoon",
                        fill: "#7575EF",  // ボタン色
                        stroke: '#DEE3FF',         // 枠色
                        strokeWidth: 5,         // 枠太さ
                        cornerRadius: 8,
                        width: 96,
                        height: 150,
                    }
                ).addChildTo(group4).setPosition(SCREEN_CENTER_X - (SCREEN_CENTER_X / 2), SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2)).onclick = function () {
                    // https://developers.facebook.com/docs/threads/threads-web-intents/
                    // web intentでのハッシュタグの扱いが環境（ブラウザ、iOS、Android）によって違いすぎるので『#』を削って通常の文字列にしておく
                    let shareURL = "https://www.threads.net/intent/post?text=" + encodeURIComponent(postText + "\n\n" + postTags.replace(/#/g, "")) + "&url=" + encodeURIComponent(postURL);
                    window.open(shareURL);
                };
                // Bluesky
                bskyButton = Button(
                    {
                        text: String.fromCharCode(0xe900),
                        fontSize: 80,
                        fontFamily: "icomoon",
                        fill: "#7575EF",  // ボタン色
                        stroke: '#DEE3FF',         // 枠色
                        strokeWidth: 5,         // 枠太さ
                        cornerRadius: 8,
                        width: 96,
                        height: 150,
                    }
                ).addChildTo(group4).setPosition(SCREEN_CENTER_X - (SCREEN_CENTER_X / 2) + 128, SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2)).onclick = function () {
                    // https://docs.bsky.app/docs/advanced-guides/intent-links
                    let shareURL = "https://bsky.app/intent/compose?text=" + encodeURIComponent(postText + "\n" + postTags + "\n" + postURL);
                    window.open(shareURL);
                };

                restartButton = Button(
                    {
                        text: "RESTART",
                        fontSize: 80,
                        fontFamily: "misaki_gothic",
                        align: "center",
                        baseline: "middle",
                        width: 300,
                        height: 150,
                        fill: "rgba(0, 0, 0, 1.0)",    // ボタン色
                        stroke: '#DEE3FF',         // 枠色
                        strokeWidth: 5,         // 枠太さ
                        cornerRadius: 8,
                    }
                ).addChildTo(this).setPosition(SCREEN_CENTER_X + (SCREEN_CENTER_X / 2), SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2)).onpush = function () {
                    that.exit();
                };
                bombButton.hide();
            }
            stageNumLabel.text = "";
            warningLabel.text = "";
        }
    }
});

phina.main(function () {
    var app = GameApp({
        startLabel: 'init',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
        backgroundColor: 'black',

        // シーンのリストを引数で渡す
        scenes: [
            {
                className: 'InitScene',
                label: 'init',
                nextLabel: 'title',
            },

            {
                className: 'TitleScene',
                label: 'title',
                nextLabel: 'main',
            },
            {
                className: 'MainScene',
                label: 'main',
                nextLabel: 'main',
            },
        ]
    });

    // iOSなどでユーザー操作がないと音がならない仕様対策
    // 起動後初めて画面をタッチした時に『無音』を鳴らす
    app.domElement.addEventListener('touchend', function dummy() {
        var s = phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });

    app.run();
});

/**
 * ボタン
 */
phina.define('prjButton', {
    superClass: 'RectangleShape',
    init: function (txt) {
        this.superInit({
            width: 96,
            height: 96,
            cornerRadius: 10,
            fill: 'lightskyblue',
            stroke: 'blue',
        });
        this.label = Label({
            text: txt + "",
            fontSize: 96 * 0.8,
            fontFamily: "misaki_gothic",
            fill: 'blue',
        }).addChildTo(this);
        // 見た目の位置合わせ
        this.label.x += 5;
        this.label.y += 4;
    },
    setSize: function (width, height) {
        this.width = width;
        this.height = height;
    }
});

/**
 * 
 */
phina.define('prjCircleShape', {
    superClass: 'CircleShape',
    init: function (pUid, xPos, yPos, colliData) {
        let strokeColor = "blue";
        if (!colliData.attr.body) {
            strokeColor = "red";
        }
        this.superInit({
            radius: colliData.radius,
            fill: "transparent",
            stroke: strokeColor,
            strokeWidth: 8,
            shadowBlur: 1
        });
        this.setPosition(xPos + colliData.ofs.x, yPos + colliData.ofs.y);
        this.xOfs = colliData.ofs.x;
        this.yOfs = colliData.ofs.y;
        this.pUid = pUid;
    },

    update: function (app) {
        for (let ii = 0; ii < enemyArray.length; ii++) {
            if (enemyArray[ii].uid === this.pUid) {
                this.x = enemyArray[ii].x + this.xOfs;
                this.y = enemyArray[ii].y + this.yOfs;
                return;
            }
        }
        // 親が見つからなければ自分を削除
        this.remove();
    },
});

/*
 * Stge
 */
phina.define("StageSprite", {
    superClass: 'Sprite',

    init: function (sprname, ypos, ysize, alphaVal) {
        this.superInit(sprname);
        this.direct = '';
        this.zRot = 0;
        this.setPosition(SCREEN_CENTER_X, ypos);
        this.setScale(1, 1);
        this.setSize(900, ysize);

        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;

        this.alphaFlag = 0;
        this.alpha = alphaVal;
    },

    update: function (app) {
        if (player.status.isDead) return;
        switch (this.alphaFlag) {
            case 0:
                // 現状維持
                break;
            case 1:
                // FADE_IN
                this.alpha += 1 / 60;
                if (this.alpha >= 1.0) {
                    this.alpha = 1.0;
                    this.alphaFlag = 0;
                }
                break;
            case -1:
                // FADE_OUT
                this.alpha -= 1 / 60;
                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.alphaFlag = 0;
                }
                break;
        }
    },
});

/*
 * Player
 */
phina.define("PlayerSprite", {
    superClass: 'Sprite',

    init: function () {
        this.superInit("player");
        this.direct = '';
        this.zRot = 0;
        this.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y * 1.5).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;

        this.status = PL_STATUS.INIT;
        this.spd = 1.0;
        this.bombLeft = 3;
        this.bombStatus = 0;
        this.bombLv = 0;
        this.bombGauge = 0;
        this.shotIntvlTimer = 0;
        this.shotLv = 7;

        this.lifeLeft = 3;
        this.lifeMax = 3;
        this.lifeParts = 0;
        this.invincivleTimer = 15;
    },

    update: function (app) {
        if (this.status === PL_STATUS.INIT) {
            this.status = PL_STATUS.START;
        };
        if (this.status === PL_STATUS.DEAD_INIT) {
            this.status = PL_STATUS.DEAD;
        }
        if (this.status === PL_STATUS.DEAD) {
            this.alpha = 1.0;
            return;
        }
        if (--this.invincivleTimer < 0) this.invincivleTimer = 0;
        if (isMUTEKI) this.invincivleTimer = 10;
        if (this.invincivleTimer % 2 === 0) {
            this.alpha = 1.0;
        } else {
            this.alpha = 0.0;
        }

        if (--this.shotIntvlTimer <= 0) {
            if (isNoSHOT) return;
            this.shotIntvlTimer = -1;

            switch (this.shotLv) {
                case 7:
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x + 32, this.y + 32, 0, +16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x - 32, this.y + 32, 0, +16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    if (this.shotIntvlTimer === -1) this.shotIntvlTimer = 7;
                // THRU
                case 6:
                    let plBullet = PlBulletSprite(++uidCounter, this.x, this.y + 64, 0, +16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                    if (this.shotIntvlTimer === -1) this.shotIntvlTimer = 7;
                // THRU
                case 5:
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x + 32, this.y - 32 + 32, +16, 0).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x + 32, this.y - 32 - 32, +16, 0).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x - 32, this.y - 32 + 32, -16, 0).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x - 32, this.y - 32 - 32, -16, 0).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    if (this.shotIntvlTimer === -1) this.shotIntvlTimer = 7;
                // THRU
                case 4:
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x + 64, this.y - 32, +16, 0).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x - 64, this.y - 32, -16, 0).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    if (this.shotIntvlTimer === -1) this.shotIntvlTimer = 7;
                // THRU
                case 3:
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x + 0, this.y - 64, +8, -16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x - 0, this.y - 64, -8, -16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    if (this.shotIntvlTimer === -1) this.shotIntvlTimer = 7;
                // THRU
                case 2:
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x + 32, this.y - 32, +8, -16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x - 32, this.y - 32, -8, -16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    if (this.shotIntvlTimer === -1) this.shotIntvlTimer = 8;
                // THRU
                case 1:
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x + 32, this.y - 32, 0, -16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x - 32, this.y - 32, 0, -16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    if (this.shotIntvlTimer === -1) this.shotIntvlTimer = 9;
                // THRU
                case 0:
                    {
                        let plBullet = PlBulletSprite(++uidCounter, this.x, this.y - 64, 0, -16).addChildTo(group8);
                        plBulletArray.push(plBullet);
                    }
                    if (this.shotIntvlTimer === -1) this.shotIntvlTimer = 10;
                // THRU
                default:
                    break;
            }
            SoundManager.play("shot");
        }

    },
});

/*
 * Enemy
 */
phina.define("EnemySprite", {
    superClass: 'Sprite',

    init: function (uid, param, ctrlCount) {
        //        console.log(">>>>" + ctrlCount + ":" + param.define + ":" + param.xPos + ":" + param.yPos)
        this.uid = uid;
        this.param = param;
        this.define = param.define;
        this.superInit(this.define.sprName);
        this.setSize(this.define.sprSize.x, this.define.sprSize.y);
        this.setScale(1, 1);
        this.direct = '';
        this.spd = Vector2(0, this.define.spd);
        this.spdOld = this.spd;
        this.zRot = 0;
        this.setPosition(param.xPos, param.yPos);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.status = EN_STATUS.INIT;
        this.collisionEnable = false;
        this.localCounter = 0;
        this.localRadian = 0;
        if (param.define.attr.isBossZako) {
            this.localRadian = param.deg.toRadian();
        }
        this.localStatus = 0;
        this.localStatusOld = 0;
        this.localTimer = 0;
        this.shotIntervalTimer = 0;
        this.shotBurstCounter = 0;
        this.shotBurstTimer = 0;
        this.shotTarget = Vector2(player.x, player.y);
        if (this.define.attr.isBoss) {
            this.life = Math.round(this.define.life * (1.1 ** nowLoopCount));
        } else if (this.define.attr.isBossZako) {
            this.life = this.define.life + nowLoopCount * 5;
        } else {
            this.life = this.define.life + nowLoopCount * 2;
        }
        //        this.life = 10;
        this.defineLife = this.life;
        this.isReady = false;
    },

    update: function (app) {
        if (player.status.isDead) return;
        switch (this.define) {
            case EN_DEF.ENEMY00_0:
            case EN_DEF.ENEMY00_1:
            case EN_DEF.ENEMY00_2_N:
            case EN_DEF.ENEMY00_2_H:
            case EN_DEF.ENEMY00_3_LEFT:
            case EN_DEF.ENEMY00_3_RIGHT:
                // 直進
                enemy00Move(this, true);
                break;
            case EN_DEF.ENEMY01_0:
            case EN_DEF.ENEMY01_1:
                // 斜め
                enemy01Move(this);
                break;
            case EN_DEF.ENEMY02_0:
            case EN_DEF.ENEMY02_1:
            case EN_DEF.ENEMY02_2:
                // 軸が合うと自機側へ直角に曲がる
                enemy02Move(this);
                break;
            case EN_DEF.ENEMY03_0:
            case EN_DEF.ENEMY03_1:
                // 自機の近くまで来たら反転
                enemy03Move(this, false);
                break;
            case EN_DEF.ENEMY04_0:
            case EN_DEF.ENEMY04_1:
                // 自機に接近したら自機の方向へ進路変更
                enemy04Move(this);
                break;
            case EN_DEF.ENEMY05:
                enemy05Move(this);
                break;
            case EN_DEF.ENEMY06:
                enemy06Move(this);
                break;
            case EN_DEF.ENEMY07:
                enemy07Move(this);
                break;
            // 以下未実装
            case EN_DEF.ENEMY08:
            case EN_DEF.ENEMY09:
            case EN_DEF.ENEMY10:
                enemy00Move(this, true);
                break;

            case EN_DEF.BOSS_ZAKO01_0:
            case EN_DEF.BOSS_ZAKO01_1:
            case EN_DEF.BOSS_ZAKO01_2:
                bossZako01Move(this, true);
                break;
            case EN_DEF.BOSS_ZAKO02_0:
            case EN_DEF.BOSS_ZAKO02_1:
            case EN_DEF.BOSS_ZAKO02_2:
                bossZako01Move(this, false);
                break;

            case EN_DEF.BOSS01:
                boss01Move(this);
                break;
            case EN_DEF.BOSS01MOD:
                boss01ModMove(this);
                break;
            case EN_DEF.BOSS02:
                boss02Move(this);
                break;
            case EN_DEF.BOSS02MOD:
                boss02ModMove(this);
                break;
            case EN_DEF.BOSS03MOD:
                boss03ModMove(this);
                break;
            case EN_DEF.BOSS04:
                boss04Move(this);
                break;

            case EN_DEF.ITEM_SHOT:
            case EN_DEF.ITEM_SPEED:
            case EN_DEF.ITEM_BOMB:
            case EN_DEF.ITEM_LIFE:
            case EN_DEF.ITEM_FAIRY:
                item00Move(this);
                break;
            default:
        }
        if (this.status === EN_STATUS.START) {
            this.x += this.spd.x;
            this.y += this.spd.y;
        }
        this.localTimer++;
        this.shotIntervalTimer++;
    },
});


/*
 * Enemy
 */
phina.define("CollisionSprite", {
    superClass: 'Sprite',

    init: function (uid, param, ctrlCount) {
        this.uid = uid;
        this.param = param;
        this.define = param.define;
        this.superInit(this.define.sprName);
        this.setSize(this.define.sprSize.x, this.define.sprSize.y);
        this.setScale(1, 1);
        this.direct = '';
        this.spd = Vector2(0, this.define.spd);
        this.spdOld = this.spd;
        this.zRot = 0;
        this.setPosition(param.xPos, param.yPos);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.status = EN_STATUS.INIT;
        this.collisionEnable = false;
        this.localCounter = 0;
        this.localRadian = 0;
        if (param.define.attr.isBossZako) {
            this.localRadian = param.deg.toRadian();
        }
        this.localStatus = 0;
        this.localStatusOld = 0;
        this.localTimer = 0;
        this.shotIntervalTimer = 0;
        this.shotBurstCounter = 0;
        this.shotBurstTimer = 0;
        this.shotTarget = Vector2(player.x, player.y);
        this.life = 0;
        this.isReady = false;
    },

    update: function (app) {
    },
});

/**
 * 直進
 * @param {*} tmpEne 
 */
function enemy00Move(tmpEne, shotFlag) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            if (tmpEne.x <= 0) {
                // 左から
                tmpEne.spd = Vector2(tmpEne.define.spd, 0);
            } else if (tmpEne.x >= SCREEN_WIDTH) {
                // 右から
                tmpEne.spd = Vector2(-tmpEne.define.spd, 0);
            } else if (tmpEne.y <= 0) {
                // 上から
                tmpEne.spd = Vector2(0, tmpEne.define.spd);
            } else {
                // 下から
                tmpEne.spd = Vector2(0, -tmpEne.define.spd);
            }
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
        // THRU
        case EN_STATUS.START:
            if (shotFlag) {
                enemyShotCommon(tmpEne);
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * 斜め
 * @param {*} tmpEne 
 */
function enemy01Move(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            let deg;
            if (tmpEne.x <= 0) {
                if (tmpEne.y <= SCREEN_CENTER_Y) {
                    // 左上から
                    deg = 90 - 30;
                } else {
                    // 左下から
                    deg = 270 + 30;
                }
            } else if (tmpEne.x >= SCREEN_WIDTH) {
                if (tmpEne.y <= SCREEN_CENTER_Y) {
                    // 右上から
                    deg = 90 + 30;
                } else {
                    // 右下から
                    deg = 270 - 30;
                }
            } else if (tmpEne.y <= 0) {
                if (tmpEne.x <= SCREEN_CENTER_X) {
                    // 左上から
                    deg = 90 - 30;
                } else {
                    // 右上から
                    deg = 90 + 30;
                }
            } else if (tmpEne.y >= SCREEN_HEIGHT) {
                if (tmpEne.x <= SCREEN_CENTER_X) {
                    // 左下から
                    deg = 270 + 30;
                } else {
                    // 右下から
                    deg = 270 - 30;
                }
            }
            tmpEne.spd = fromDegreeToVec(deg, tmpEne.define.spd);
            tmpEne.localStatus = 0;
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
        // THRU
        case EN_STATUS.START:
            enemyShotCommon(tmpEne);
            if (tmpEne.define !== EN_DEF.ENEMY01_0) {
                switch (tmpEne.localStatus) {
                    case 0:
                        if (tmpEne.x < 0 + 64) break;
                        if (tmpEne.x > SCREEN_WIDTH - 64) break;
                        if (tmpEne.y < 0 + 64) break;
                        if (tmpEne.y > SCREEN_HEIGHT - 64) break;
                        tmpEne.localStatus = 1;
                    // THRU
                    case 1:
                        let absSpdX = Math.abs(tmpEne.spd.x);
                        if (tmpEne.x < 0 + absSpdX) {
                            tmpEne.spd.x *= -1;
                            shotSectorDeg(tmpEne, SHOT_TYPE.SECTOR_RIGHT_N.cnt, SHOT_TYPE.SECTOR_RIGHT_N.spd, SHOT_TYPE.SECTOR_RIGHT_N.bullet);
                            enemyShot(tmpEne);
                        } else if (tmpEne.x > SCREEN_WIDTH - absSpdX) {
                            tmpEne.spd.x *= -1;
                            shotSectorDeg(tmpEne, SHOT_TYPE.SECTOR_LEFT_N.cnt, SHOT_TYPE.SECTOR_RIGHT_N.spd, SHOT_TYPE.SECTOR_RIGHT_N.bullet);
                        }
                        break;
                }
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * 軸が合うと自機側へ直角に曲がる
 * @param {*} tmpEne 
 */
function enemy02Move(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            if (tmpEne.x <= 0) {
                // 左から
                tmpEne.spd = Vector2(tmpEne.define.spd, 0);
            } else if (tmpEne.x >= SCREEN_WIDTH) {
                // 右から
                tmpEne.spd = Vector2(-tmpEne.define.spd, 0);
            } else if (tmpEne.y <= 0) {
                // 上から
                tmpEne.spd = Vector2(0, tmpEne.define.spd);
            } else {
                // 下から
                tmpEne.spd = Vector2(0, -tmpEne.define.spd);
            }
            if (tmpEne.spd.x !== 0) {
                tmpEne.localStatus = 1;
            } else {
                tmpEne.localStatus = 0;
            }
            tmpEne.localCounter = tmpEne.define.turn;
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    if (((tmpEne.spd.y > 0) && (player.y < tmpEne.y)) || ((tmpEne.spd.y < 0) && (player.y >= tmpEne.y))) {
                        let absSpdX = Math.abs(tmpEne.spd.y);
                        tmpEne.spd.y = 0;
                        if (player.x < tmpEne.x) {
                            tmpEne.spd.x = -absSpdX;
                        } else {
                            tmpEne.spd.x = absSpdX;
                        }
                        if (--tmpEne.localCounter === 0) {
                            tmpEne.localStatus = 2;
                        } else {
                            tmpEne.localStatus = 1;
                        }
                        enemyShot(tmpEne);
                    }
                    break;
                case 1:
                    if (((tmpEne.spd.x > 0) && (player.x < tmpEne.x)) || ((tmpEne.spd.x < 0) && (player.x >= tmpEne.x))) {
                        let absSpdY = Math.abs(tmpEne.spd.x);
                        tmpEne.spd.x = 0;
                        if (player.y > tmpEne.y) {
                            tmpEne.spd.y = absSpdY;
                        } else {
                            tmpEne.spd.y = -absSpdY;
                        }
                        if (--tmpEne.localCounter === 0) {
                            tmpEne.localStatus = 2;
                        } else {
                            tmpEne.localStatus = 0;
                        }
                        enemyShot(tmpEne);
                    }
                    break;
                case 2:
                    enemyShotCommon(tmpEne);
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * 自機の近くまで来たら反転
 * @param {*} tmpEne 
 */
function enemy03Move(tmpEne, isRapidFire) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            if (tmpEne.x <= 0) {
                // 左から
                tmpEne.spd = Vector2(tmpEne.define.spd, 0);
            } else if (tmpEne.x >= SCREEN_WIDTH) {
                // 右から
                tmpEne.spd = Vector2(-tmpEne.define.spd, 0);
            } else if (tmpEne.y <= 0) {
                // 上から
                tmpEne.spd = Vector2(0, tmpEne.define.spd);
            } else {
                // 下から
                tmpEne.spd = Vector2(0, -tmpEne.define.spd);
            }
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
            tmpEne.localStatus = 0;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    if (tmpEne.define === EN_DEF.ENEMY03_0) {
                        // 軸でチェック
                        if (tmpEne.spd.x === 0) {
                            if (tmpEne.spd.y >= 0) {
                                // 上から
                                if (tmpEne.y + 256 > player.y) {
                                    tmpEne.localStatus = 1;
                                }
                            } else {
                                // 下から
                                if (tmpEne.y - 256 < player.y) {
                                    tmpEne.localStatus = 1;
                                }
                            }
                        } else {
                            if (tmpEne.spd.x >= 0) {
                                // 右から
                                if (tmpEne.x + 256 > player.x) {
                                    tmpEne.localStatus = 1;
                                }
                            } else {
                                // 左から
                                if (tmpEne.x - 256 < player.x) {
                                    tmpEne.localStatus = 1;
                                }
                            }
                        }
                    } else {
                        // 円コリジョンでチェック
                        if (chkCollisionCircle(player.x, player.y, 0, tmpEne.x, tmpEne.y, 256)) {
                            tmpEne.localStatus = 1;
                        }
                    }
                    break;
                case 1:
                    // 停止
                    tmpEne.spdOld = tmpEne.spd;
                    tmpEne.spd = Vector2(0, 0);

                    tmpEne.localStatus = 2;
                    tmpEne.localCounter = 0;
                // THRU
                case 2:
                    if (++tmpEne.localCounter >= 6) {
                        // 反転
                        tmpEne.spd.x = -tmpEne.spdOld.x * 1.5;
                        tmpEne.spd.y = -tmpEne.spdOld.y * 1.5;

                        tmpEne.localStatus = 3;
                        if (!isRapidFire) {
                            enemyShot(tmpEne);
                        }
                    }
                    break;
                case 3:
                    if (isRapidFire) {
                        enemyShotCommon(tmpEne);
                    }
                    break;
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * 自機の近くまで来たら自機の方向へ進行方向を変える
 * @param {*} tmpEne 
 */
function enemy04Move(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            if (tmpEne.x <= 0) {
                // 左から
                tmpEne.spd = Vector2(tmpEne.define.spd, 0);
            } else if (tmpEne.x >= SCREEN_WIDTH) {
                // 右から
                tmpEne.spd = Vector2(-tmpEne.define.spd, 0);
            } else if (tmpEne.y <= 0) {
                // 上から
                tmpEne.spd = Vector2(0, tmpEne.define.spd);
            } else {
                // 下から
                tmpEne.spd = Vector2(0, -tmpEne.define.spd);
            }
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
            tmpEne.localStatus = 0;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    if (tmpEne.define === EN_DEF.ENEMY04_0) {
                        // 軸でチェック
                        if (tmpEne.spd.x === 0) {
                            if (tmpEne.spd.y >= 0) {
                                // 上から
                                if (tmpEne.y + 384 > player.y) {
                                    tmpEne.localStatus = 1;
                                }
                            } else {
                                // 下から
                                if (tmpEne.y - 384 < player.y) {
                                    tmpEne.localStatus = 1;
                                }
                            }
                        } else {
                            if (tmpEne.spd.x >= 0) {
                                // 右から
                                if (tmpEne.x + 384 > player.x) {
                                    tmpEne.localStatus = 1;
                                }
                            } else {
                                // 左から
                                if (tmpEne.x - 384 < player.x) {
                                    tmpEne.localStatus = 1;
                                }
                            }
                        }
                    } else {
                        // 円コリジョンでチェック
                        if (chkCollisionCircle(player.x, player.y, 0, tmpEne.x, tmpEne.y, 384)) {
                            tmpEne.localStatus = 1;
                        }
                    }
                    break;
                case 1:
                    // 停止
                    tmpEne.spdOld = tmpEne.spd;
                    tmpEne.spd = Vector2(0, 0);

                    tmpEne.localStatus = 2;
                    tmpEne.localCounter = 0;
                // THRU
                case 2:
                    if (++tmpEne.localCounter >= 6) {
                        // 方向転換
                        let from = Vector2(tmpEne.x, tmpEne.y);
                        let to = Vector2(player.x, player.y);
                        tmpEne.spd = Vector2.sub(to, from).normalize().mul(tmpEne.define.spd * 1.5);

                        tmpEne.localStatus = 3;
                    }
                    break;
                case 3:
                    enemyShotCommon(tmpEne);
                    break;
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 *　高速で画面内に入って来て低速で弾を打ちながら進む
 * @param {*} tmpEne 
 */
function enemy05Move(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.localStatus = 0;
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    if (tmpEne.y < SCREEN_HEIGHT / 4) break;
                    tmpEne.localStatus = 1;
                    tmpEne.spd = Vector2(0, 4);
                // THRU
                case 1:
                    enemyShotCommon(tmpEne);
                    break;
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * 自機の近くまで来たら弾を撃って消える
 * @param {*} tmpEne 
 */
function enemy06Move(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            if (tmpEne.x <= 0) {
                // 左から
                tmpEne.spd = Vector2(tmpEne.define.spd, 0);
            } else if (tmpEne.x >= SCREEN_WIDTH) {
                // 右から
                tmpEne.spd = Vector2(-tmpEne.define.spd, 0);
            } else if (tmpEne.y <= 0) {
                // 上から
                tmpEne.spd = Vector2(0, tmpEne.define.spd);
            } else {
                // 下から
                tmpEne.spd = Vector2(0, -tmpEne.define.spd);
            }
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
            tmpEne.localStatus = 0;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    if (tmpEne.define === EN_DEF.ENEMY03_0) {
                        // 軸でチェック
                        if (tmpEne.spd.x === 0) {
                            if (tmpEne.spd.y >= 0) {
                                // 上から
                                if (tmpEne.y + 256 > player.y) {
                                    tmpEne.localStatus = 1;
                                }
                            } else {
                                // 下から
                                if (tmpEne.y - 256 < player.y) {
                                    tmpEne.localStatus = 1;
                                }
                            }
                        } else {
                            if (tmpEne.spd.x >= 0) {
                                // 右から
                                if (tmpEne.x + 256 > player.x) {
                                    tmpEne.localStatus = 1;
                                }
                            } else {
                                // 左から
                                if (tmpEne.x - 256 < player.x) {
                                    tmpEne.localStatus = 1;
                                }
                            }
                        }
                    } else {
                        // 円コリジョンでチェック
                        if (chkCollisionCircle(player.x, player.y, 0, tmpEne.x, tmpEne.y, 256)) {
                            tmpEne.localStatus = 1;
                        }
                    }
                    break;
                case 1:
                    // 停止
                    tmpEne.spdOld = tmpEne.spd;
                    tmpEne.spd = Vector2(0, 0);
                    tmpEne.localStatus = 2;
                // THRU
                case 2:
                    tmpEne.status = EN_STATUS.DEAD_INIT;
                    enemyShotCommon(tmpEne);
                    break;
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * 自機と反対側の前方から死出現して自機と軸があったら方向転換して逃げる
 * @param {*} tmpEne 
 */
function enemy07Move(tmpEne, shotFlag) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            // 
            tmpEne.x = -player.x + SCREEN_CENTER_X * 2;
            if (tmpEne.x < SCREEN_CENTER_X) {
                tmpEne.spd = Vector2(0.5, 1).normalize().mul(tmpEne.define.spd);
            } else {
                tmpEne.spd = Vector2(-0.5, 1).normalize().mul(tmpEne.define.spd);
            }
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
            tmpEne.localStatus = 0;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    if (tmpEne.spd.x >= 0) {
                        if (tmpEne.x >= player.x) {
                            tmpEne.spd = Vector2(-1, 1).normalize().mul(tmpEne.define.spd * 2);
                            tmpEne.localStatus = 1;
                        }
                    } else {
                        if (tmpEne.x <= player.x) {
                            tmpEne.spd = Vector2(1, 1).normalize().mul(tmpEne.define.spd * 2);
                            tmpEne.localStatus = 1;
                        }
                    }
                    break;
                case 1:
                    enemyShotCommon(tmpEne);
                    break;
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * ボス02（チヌ）
 * 上から出現
 * 左右に正弦波で動く
 * 
 * @param {*} tmpEne 
 */
function boss02Move(tmpEne) {
    let lifeStep;
    if (tmpEne.life > tmpEne.defineLife * (3 / 4)) {
        //1~3/4
        lifeStep = 0;
    } else if (tmpEne.life > tmpEne.defineLife * (2 / 4)) {
        // 4/3~2/4
        lifeStep = 1;
    } else if (tmpEne.life > tmpEne.defineLife * (1 / 4)) {
        // 2/4~1/4
        lifeStep = 2;
    } else {
        // 1/4~0
        lifeStep = 3;
    }
    let sign = 1;
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.localCounter = 0;
            tmpEne.localStatus = 0;
            tmpEne.spd = Vector2(0, 8);
            tmpEne.setScale(-1, 1); // 右向き
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    // 出現
                    if (tmpEne.y >= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                        tmpEne.collisionEnable = true;
                    }
                    break;
                case 1:
                    // 0.5秒待って右へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(8, 0); // 右へ移動
                        tmpEne.setScale(-1, 1); // 右向き
                        tmpEne.localStatus = 2;
                    } else {
                        boss01Shot(tmpEne, lifeStep, true);
                    }
                    sign = 1;
                    break;
                case 2:
                    // 右端へ来たら停止
                    if (tmpEne.x >= SCREEN_WIDTH - (128 + 64)) {
                        tmpEne.x = SCREEN_WIDTH - (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localCounter = 0;
                        tmpEne.localStatus = 3;
                    }
                    sign = 1;
                    break;
                case 3:
                    // 0.5秒待って左へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(-8, 0); // 左へ移動
                        tmpEne.setScale(1, 1);  //左向き

                        tmpEne.localStatus = 4;
                    } else {
                        boss01Shot(tmpEne, lifeStep, true);
                    }
                    sign = -1;
                    break;
                case 4:
                    // 中央に来たら停止
                    if (tmpEne.x <= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 5;
                        if (lifeStep !== 0) {
                            // チヌカッター発射
                        }
                    }
                    sign = -1;
                    break;
                case 5:
                    // 0.5秒待って左へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(-8, 0); // 左へ移動
                        tmpEne.setScale(1, 1); // 左向き
                        tmpEne.localStatus = 6;
                    } else {
                        boss01Shot(tmpEne, lifeStep, true);
                    }
                    sign = -1;
                    break;
                case 6:
                    // 左端に来たら停止
                    if (tmpEne.x <= 0 + (128 + 64)) {
                        tmpEne.x = 0 + (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 7;
                    }
                    sign = -1;
                    break;
                case 7:
                    // 0.5秒待って右へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(8, 0); // 右へ移動
                        tmpEne.setScale(-1, 1); // 右向き
                        tmpEne.localStatus = 8;
                    } else {
                        boss01Shot(tmpEne, lifeStep, true);
                    }
                    sign = 1;
                    break;
                case 8:
                    // 中央に来たら停止
                    if (tmpEne.x >= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                    }
                    sign = 1;
                    break;
                default:
            }
            if (tmpEne.localStatus !== 0) {
                //移動範囲
                let RANGE = SCREEN_WIDTH - (128 + 64) * 2
                //xPosが0オリジンになるようにする
                let nowX = tmpEne.x - (128 + 64)
                //現在の角度
                let rad = 2 * Math.PI * (nowX / RANGE)
                // Yオフセット
                let yOfs = Math.sin(rad) * 128 * sign;
                tmpEne.y = yOfs + 256 + 64;
            }
            if (tmpEne.localStatus === 0) {
            } else if (lifeStep === 0) {
                if (tmpEne.localTimer % 60 === 0) {
                    // チヌカッター発射
                    shotChinuCutter(tmpEne, Vector2(+8.0, -8.0));
                    shotChinuCutter(tmpEne, Vector2(-8.0, -8.0));
                    if (nowLoopCount >= 1) shotChinuCutter(tmpEne, Vector2(0.0, -8.0));
                    if (nowLoopCount >= 2) {
                        shotChinuCutter(tmpEne, Vector2(+16.0, -8.0));
                        shotChinuCutter(tmpEne, Vector2(-16.0, -8.0));
                    }
                }
            } else if (lifeStep === 1) {
                if (tmpEne.localTimer % 50 === 0) {
                    // チヌカッター発射
                    shotChinuCutter(tmpEne, Vector2(+8.0, -8.0));
                    shotChinuCutter(tmpEne, Vector2(-8.0, -8.0));
                    if (nowLoopCount >= 1) shotChinuCutter(tmpEne, Vector2(0.0, -8.0));
                    if (nowLoopCount >= 2) {
                        shotChinuCutter(tmpEne, Vector2(+16.0, -8.0));
                        shotChinuCutter(tmpEne, Vector2(-16.0, -8.0));
                    }
                }
            } else {
                if (tmpEne.localTimer % 40 === 0) {
                    // チヌカッター発射
                    shotChinuCutter(tmpEne, Vector2(+8.0, -8.0));
                    shotChinuCutter(tmpEne, Vector2(-8.0, -8.0));
                    if (nowLoopCount >= 1) shotChinuCutter(tmpEne, Vector2(0.0, -8.0));
                    if (nowLoopCount >= 2) {
                        shotChinuCutter(tmpEne, Vector2(+16.0, -8.0));
                        shotChinuCutter(tmpEne, Vector2(-16.0, -8.0));
                    }
                }
            }

            tmpEne.localCounter++;
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
            tmpEne.localCounter = 0;
            nowScore += tmpEne.define.pts;
            if (isBOSSSRUSH) {
                ctrlCounter++;
            } else {
                // 次の面へ
                if (++nowStageNum >= STG_NUM_MAX) {
                    nowStageNum = 0;
                    nowLoopCount++;
                    nowScore++;
                }
                ctrlCounter = 0;
            }
            ctrlCounterFlag = true;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}
/**
 * ボス02改（トミー）
 * 上から出てきて左右に正弦波で動く
 * 周囲にザコが発生
 * ボスを中心に円軌道で移動
 * ザコが全滅するまでボスのライフは1/10までしか減らない
 * @param {*} tmpEne 
 */
function boss02ModMove(tmpEne) {
    let lifeStep;
    if (tmpEne.life > tmpEne.defineLife * (3 / 4)) {
        //1~3/4
        lifeStep = 0;
    } else if (tmpEne.life > tmpEne.defineLife * (2 / 4)) {
        // 4/3~2/4
        lifeStep = 1;
    } else if (tmpEne.life > tmpEne.defineLife * (1 / 4)) {
        // 2/4~1/4
        lifeStep = 2;
    } else {
        // 1/4~0
        lifeStep = 3;
    }

    // ザコチェック
    if (tmpEne.status != EN_STATUS.INIT) {
        var self = this;
        //  ザコの存在チェック
        let zakoCnt = 0;
        for (let jj = 0; jj < self.enemyArray.length; jj++) {
            let zako = self.enemyArray[jj];
            if (zako.define.attr.isBossZako) {
                zakoCnt++;
            }
        }
        if (zakoCnt != 0) {
            //ザコが残っていたらボスのライフは3/10以下にならない
            if (tmpEne.life < tmpEne.defineLife * (3 / 10)) {
                tmpEne.life = tmpEne.defineLife * (3 / 10);
            }
        }
    }
    let sign = 1;
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.localCounter = 0;
            tmpEne.localStatus = 0;
            tmpEne.spd = Vector2(0, 8);
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    // 出現
                    if (tmpEne.y >= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                    }
                    break;
                case 1:
                    // n秒待って右へ移動
                    if (lifeStep === 0) {
                        if (++tmpEne.localCounter > 30) {
                            tmpEne.spd = Vector2(8, 0); // 右へ移動
                            tmpEne.localStatus = 2;
                        } else {
                            boss01Shot(tmpEne, lifeStep, true);
                        }
                    } else {
                        if (++tmpEne.localCounter > 120) {
                            tmpEne.spd = Vector2(8, 0); // 右へ移動
                            tmpEne.localStatus = 2;
                        } else {
                            if (tmpEne.localCounter < 30) {
                                shotByDegree(tmpEne, tmpEne.localCounter * 6, 8, BULLET_DEF.EN_B_48);
                                if (nowLoopCount >= 2) shotByDegree(tmpEne, 180 - (tmpEne.localCounter * 6), 8, BULLET_DEF.EN_B_48);
                            } else if (tmpEne.localCounter < 60) {
                                shotByDegree(tmpEne, 180 - ((tmpEne.localCounter - 30) * 6), 8, BULLET_DEF.EN_B_48);
                                if (nowLoopCount >= 2) shotByDegree(tmpEne, (tmpEne.localCounter - 30) * 6, 8, BULLET_DEF.EN_B_48);
                            } else if (tmpEne.localCounter < 90) {
                                shotByDegree(tmpEne, (tmpEne.localCounter - 60) * 6, 8, BULLET_DEF.EN_B_48);
                                if (nowLoopCount >= 2) shotByDegree(tmpEne, 180 - ((tmpEne.localCounter - 60) * 6), 8, BULLET_DEF.EN_B_48);
                            } else {
                                shotByDegree(tmpEne, 180 - ((tmpEne.localCounter - 90) * 6), 8, BULLET_DEF.EN_B_48);
                                if (nowLoopCount >= 2) shotByDegree(tmpEne, (tmpEne.localCounter - 90) * 6, 8, BULLET_DEF.EN_B_48);
                                boss01Shot(tmpEne, lifeStep, false);
                            }
                        }
                    }
                    sign = 1;
                    break;
                case 2:
                    // 右端へ来たら停止
                    if (tmpEne.x >= SCREEN_WIDTH - (128 + 64)) {
                        tmpEne.x = SCREEN_WIDTH - (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 3;
                    }
                    sign = 1;
                    break;
                case 3:
                    // 0.5秒待って左へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(-8, 0); // 左へ移動

                        tmpEne.localStatus = 4;
                    } else {
                        boss01Shot(tmpEne, lifeStep, true);
                    }
                    sign = -1;
                    break;
                case 4:
                    // 中央に来たら停止
                    if (tmpEne.x <= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 5;
                    }
                    sign = -1;
                    break;
                case 5:
                    // n秒待って左へ移動
                    if (lifeStep === 0) {
                        if (++tmpEne.localCounter > 30) {
                            tmpEne.spd = Vector2(-8, 0); // 左へ移動
                            tmpEne.localStatus = 6;
                        } else {
                            boss01Shot(tmpEne, lifeStep, true);
                        }
                    } else {
                        if (++tmpEne.localCounter > 120) {
                            tmpEne.spd = Vector2(-8, 0); // 左へ移動
                            tmpEne.localStatus = 6;
                        } else {
                            if (tmpEne.localCounter < 30) {
                                shotByDegree(tmpEne, tmpEne.localCounter * 6, 8, BULLET_DEF.EN_B_48);
                                if (nowLoopCount >= 2) shotByDegree(tmpEne, 180 - (tmpEne.localCounter * 6), 8, BULLET_DEF.EN_B_48);
                            } else if (tmpEne.localCounter < 60) {
                                shotByDegree(tmpEne, 180 - ((tmpEne.localCounter - 30) * 6), 8, BULLET_DEF.EN_B_48);
                                if (nowLoopCount >= 2) shotByDegree(tmpEne, (tmpEne.localCounter - 30) * 6, 8, BULLET_DEF.EN_B_48);
                            } else if (tmpEne.localCounter < 90) {
                                shotByDegree(tmpEne, (tmpEne.localCounter - 60) * 6, 8, BULLET_DEF.EN_B_48);
                                if (nowLoopCount >= 2) shotByDegree(tmpEne, 180 - ((tmpEne.localCounter - 60) * 6), 8, BULLET_DEF.EN_B_48);
                            } else {
                                shotByDegree(tmpEne, 180 - ((tmpEne.localCounter - 90) * 6), 8, BULLET_DEF.EN_B_48);
                                if (nowLoopCount >= 2) shotByDegree(tmpEne, (tmpEne.localCounter - 90) * 6, 8, BULLET_DEF.EN_B_48);
                                boss01Shot(tmpEne, lifeStep, false);
                            }
                        }
                    }
                    sign = -1;
                    break;
                case 6:
                    // 左端に来たら停止
                    if (tmpEne.x <= 0 + (128 + 64)) {
                        tmpEne.x = 0 + (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 7;
                    }
                    sign = -1;
                    break;
                case 7:
                    // 0.5秒待って右へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(8, 0); // 右へ移動
                        tmpEne.localStatus = 8;
                    } else {
                        boss01Shot(tmpEne, lifeStep, true);
                    }
                    sign = 1;
                    break;
                case 8:
                    // 中央に来たら停止
                    if (tmpEne.x >= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                    }
                    sign = 1;
                    break;
                default:
            }
            if (tmpEne.localStatus !== 0) {
                //移動範囲
                let RANGE = SCREEN_WIDTH - (128 + 64) * 2
                //xPosが0オリジンになるようにする
                let nowX = tmpEne.x - (128 + 64)
                //現在の角度
                let rad = 2 * Math.PI * (nowX / RANGE)
                // Yオフセット
                let yOfs = Math.sin(rad) * 128 * sign;
                tmpEne.y = yOfs + 256 + 64;
            }
            tmpEne.localCounter++;
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
            tmpEne.localCounter = 0;
            nowScore += tmpEne.define.pts;
            if (isBOSSSRUSH) {
                ctrlCounter++;
            } else {
                // 次の面へ
                if (++nowStageNum >= STG_NUM_MAX) {
                    nowStageNum = 0;
                    nowLoopCount++;
                    nowScore++;
                }
                ctrlCounter = 0;
            }
            ctrlCounterFlag = true;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}
function boss01Shot(tmpEne, lifeStep, execSnipe) {
    switch (lifeStep) {
        case 0:
        case 1:
            if (tmpEne.shotIntervalTimer % 2 === 0) {
                if (execSnipe) {
                    shotSnipe(tmpEne, SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                    if (nowLoopCount >= 1) shotSnipe(tmpEne, SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    if (nowLoopCount >= 2) shotSnipe(tmpEne, SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                }
            }
            break;
        case 2:
            boss01Shot01(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L, 10, 4);
            break;
        case 3:
            if (boss01Shot01(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L, 2, 8)) {
                if (execSnipe) {
                    shotSnipeOfs(tmpEne, Vector2(+64, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-64, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                }
            }
            break;
        default:
    }
}
function boss01Shot01(tmpEne, shotType, interval, shotBurst) {
    if (tmpEne.shotIntervalTimer % interval === 0) {
        if (--tmpEne.shotBurstTimer <= 0) {
            shotSemicircle(tmpEne, shotType.cnt, shotType.spd, shotType.bullet);
            if (nowLoopCount >= 1) shotSemicircle(tmpEne, shotType.cnt, shotType.spd - 4, shotType.bullet);
            if (nowLoopCount >= 2) shotSemicircle(tmpEne, shotType.cnt, shotType.spd + 4, shotType.bullet);
            tmpEne.shotBurstTimer = 2;
            if (++tmpEne.shotBurstCounter >= shotBurst) {
                tmpEne.shotBurstCounter = 0;
            } else {
                tmpEne.shotIntervalTimer--;
            }
            return true;
        } else {
            tmpEne.shotIntervalTimer--;
        }
    }
    return false;
}

/**
 * ボス01
 * 上から出現
 * 左右に直線で動く
 * 
 * @param {*} tmpEne 
 */
function boss01Move(tmpEne) {
    let lifeStep;
    if (tmpEne.life > tmpEne.defineLife * (3 / 4)) {
        //1~3/4
        lifeStep = 0;
    } else if (tmpEne.life > tmpEne.defineLife * (2 / 4)) {
        // 4/3~2/4
        lifeStep = 1;
    } else if (tmpEne.life > tmpEne.defineLife * (1 / 4)) {
        // 2/4~1/4
        lifeStep = 2;
    } else {
        // 1/4~0
        lifeStep = 3;
    }
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.localCounter = 0;
            tmpEne.localStatus = 0;
            tmpEne.spd = Vector2(0, 8);
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    // 出現
                    if (tmpEne.y >= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                        tmpEne.collisionEnable = true;
                    }
                    break;
                case 1:
                    tmpEne.spd = Vector2(8, 0); // 右へ移動
                    tmpEne.localStatus = 2;
                    break;
                case 2:
                    // 右端へ来たら停止
                    if (tmpEne.x >= SCREEN_WIDTH - (128 + 64)) {
                        tmpEne.x = SCREEN_WIDTH - (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 3;
                        if (lifeStep === 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_N.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                            if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                        }
                    }
                    boss02Shot(tmpEne, lifeStep);
                    break;
                case 3:
                    tmpEne.spd = Vector2(-8, 0); // 左へ移動
                    tmpEne.localStatus = 4;
                    break;
                case 4:
                    // 中央に来たら停止
                    if (tmpEne.x <= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 5;
                        if (lifeStep === 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_N.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                            if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                        }
                    }
                    boss02Shot(tmpEne, lifeStep);
                    break;
                case 5:
                    tmpEne.spd = Vector2(-8, 0); // 左へ移動
                    tmpEne.localStatus = 6;
                    break;
                case 6:
                    // 左端に来たら停止
                    if (tmpEne.x <= 0 + (128 + 64)) {
                        tmpEne.x = 0 + (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 7;
                        if (lifeStep === 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_N.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                            if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                        }
                    }
                    boss02Shot(tmpEne, lifeStep);
                    break;
                case 7:
                    tmpEne.spd = Vector2(8, 0); // 右へ移動
                    tmpEne.localStatus = 8;
                    break;
                case 8:
                    // 中央に来たら停止
                    if (tmpEne.x >= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                        if (lifeStep === 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_N.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                            if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                        }
                    }
                    boss02Shot(tmpEne, lifeStep);
                    break;
                default:
            }
            tmpEne.localCounter++;
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
            tmpEne.localCounter = 0;
            nowScore += tmpEne.define.pts;
            if (isBOSSSRUSH) {
                ctrlCounter++;
            } else {
                // 次の面へ
                if (++nowStageNum >= STG_NUM_MAX) {
                    nowStageNum = 0;
                    nowLoopCount++;
                    nowScore++;
                }
                ctrlCounter = 0;
            }
            ctrlCounterFlag = true;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}
/**
 * ボス01改（軍艦巻き）
 * 上から出現
 * 左右に直線で動く
 * 周囲にザコが発生
 * ボスを中心に円軌道で移動
 * ザコが全滅するまでボスのライフは1/10までしか減らない
 */
function boss01ModMove(tmpEne) {
    let lifeStep;
    if (tmpEne.life > tmpEne.defineLife * (3 / 4)) {
        //1~3/4
        lifeStep = 0;
    } else if (tmpEne.life > tmpEne.defineLife * (2 / 4)) {
        // 4/3~2/4
        lifeStep = 1;
    } else if (tmpEne.life > tmpEne.defineLife * (1 / 4)) {
        // 2/4~1/4
        lifeStep = 2;
    } else {
        // 1/4~0
        lifeStep = 3;
    }

    // ザコチェック
    if (tmpEne.status != EN_STATUS.INIT) {
        var self = this;
        //  ザコの存在チェック
        let zakoCnt = 0;
        for (let jj = 0; jj < self.enemyArray.length; jj++) {
            let zako = self.enemyArray[jj];
            if (zako.define.attr.isBossZako) {
                zakoCnt++;
            }
        }
        if (zakoCnt != 0) {
            //ザコが残っていたらボスのライフは1/10以下にならない
            if (tmpEne.life < tmpEne.defineLife * (1 / 10)) {
                tmpEne.life = tmpEne.defineLife * (1 / 10);
            }
        }
    }

    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.localCounter = 0;
            tmpEne.localStatus = 0;
            tmpEne.spd = Vector2(0, 8);
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    // 出現
                    if (tmpEne.y >= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.localStatus = 1;
                        tmpEne.collisionEnable = true;
                    }
                    break;
                case 1:
                    tmpEne.spd = Vector2(8, 0); // 右へ移動
                    tmpEne.localStatus = 2;
                    break;
                case 2:
                    // 右端へ来たら停止
                    if (tmpEne.x >= SCREEN_WIDTH - (128 + 64)) {
                        tmpEne.x = SCREEN_WIDTH - (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 3;
                        if (lifeStep === 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_N.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                        }
                    }
                    boss02Shot(tmpEne, lifeStep);
                    break;
                case 3:
                    tmpEne.spd = Vector2(-8, 0); // 左へ移動
                    tmpEne.localStatus = 4;
                    break;
                case 4:
                    // 中央に来たら停止
                    if (tmpEne.x <= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 5;
                        if (lifeStep >= 2) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                            if (nowLoopCount >= 1) {
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_N.bullet);
                            }
                            if (nowLoopCount >= 2) {
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd + 2, SHOT_TYPE.SEMICIRCLE_DOWN_N.bullet);
                            }
                        }
                        if (lifeStep >= 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd - 1, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd - 2, SHOT_TYPE.SEMICIRCLE_DOWN_XL.bullet);
                            if (nowLoopCount >= 1) {
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_N.bullet);
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt + 45, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_N.bullet);
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt - 45, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_N.bullet);
                            }
                            if (nowLoopCount >= 2) {
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd + 2, SHOT_TYPE.SEMICIRCLE_DOWN_N.bullet);
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt + 45, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd + 2, SHOT_TYPE.SEMICIRCLE_DOWN_N.bullet);
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt - 45, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd + 2, SHOT_TYPE.SEMICIRCLE_DOWN_N.bullet);
                            }
                        }
                    }
                    boss02Shot(tmpEne, lifeStep);
                    break;
                case 5:
                    tmpEne.spd = Vector2(-8, 0); // 左へ移動
                    tmpEne.localStatus = 6;
                    break;
                case 6:
                    // 左端に来たら停止
                    if (tmpEne.x <= 0 + (128 + 64)) {
                        tmpEne.x = 0 + (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 7;
                        if (lifeStep === 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_N.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                        }
                    }
                    boss02Shot(tmpEne, lifeStep);
                    break;
                case 7:
                    tmpEne.spd = Vector2(8, 0); // 右へ移動
                    tmpEne.localStatus = 8;
                    break;
                case 8:
                    // 中央に来たら停止
                    if (tmpEne.x >= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                        if (lifeStep === 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_L.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_N.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_N.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                            if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_XL.cnt, SHOT_TYPE.SEMICIRCLE_DOWN_XL.spd, SHOT_TYPE.SEMICIRCLE_DOWN_L.bullet);
                        }
                    }
                    boss02Shot(tmpEne, lifeStep);
                    break;
                default:
            }
            tmpEne.localCounter++;
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
            tmpEne.localCounter = 0;
            nowScore += tmpEne.define.pts;
            if (isBOSSSRUSH) {
                ctrlCounter++;
            } else {
                // 次の面へ
                if (++nowStageNum >= STG_NUM_MAX) {
                    nowStageNum = 0;
                    nowLoopCount++;
                    nowScore++;
                }
                ctrlCounter = 0;
            }
            ctrlCounterFlag = true;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}
function boss02Shot(tmpEne, lifeStep) {
    switch (lifeStep) {
        case 0:
            if (tmpEne.shotIntervalTimer % 12 === 0) {
                shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 1) {
                    shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                }
                if (nowLoopCount >= 2) {
                    shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                }
            }
            break;
        case 1:
            if (tmpEne.shotIntervalTimer % 10 === 0) {
                shotSnipeOfs(tmpEne, Vector2(+64, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(-64, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 1) {
                    shotSnipeOfs(tmpEne, Vector2(+64, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.Nullet);
                    shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-64, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                }
                if (nowLoopCount >= 2) {
                    shotSnipeOfs(tmpEne, Vector2(+64, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.Nullet);
                    shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-64, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                }
            }
            break;
        case 2:
        case 3:
            if (tmpEne.shotIntervalTimer % 8 === 0) {
                shotSnipeOfs(tmpEne, Vector2(+96, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(+64, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(-64, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(-96, 0), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 1) {
                    shotSnipeOfs(tmpEne, Vector2(+96, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(+64, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-64, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-96, 0), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                }
                if (nowLoopCount >= 2) {
                    shotSnipeOfs(tmpEne, Vector2(+96, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(+64, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(+32, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(0, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-32, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-64, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                    shotSnipeOfs(tmpEne, Vector2(-96, 0), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                }
            }
            break;
        default:
    }
}

/**
 * ボス03改（ゾンビメイジ）
 * 上から出現
 * ４辺に沿って移動する
 * ４隅で一旦停止して弾を撃つ
 * 周囲にザコが発生
 * ボスを中心に円軌道で移動
 * 右回りと左回り
 * ザコが全滅するまでボスのライフは1/10までしか減らない
 * 徐々に加速する
 * 
 * @param {*} tmpEne 
 */
function boss03ModMove(tmpEne) {
    let lifeStep;
    let spd;
    if (tmpEne.life > tmpEne.defineLife * (3 / 4)) {
        //1~3/4
        lifeStep = 0;
        spd = 8 * 2;
    } else if (tmpEne.life > tmpEne.defineLife * (2 / 4)) {
        // 4/3~2/4
        lifeStep = 1;
        spd = 8 * 3;
    } else if (tmpEne.life > tmpEne.defineLife * (1 / 4)) {
        // 2/4~1/4
        lifeStep = 2;
        spd = 8 * 4;
    } else {
        // 1/4~0
        lifeStep = 3;
        spd = 8 * 5;
    }

    // ザコチェック
    let zakoCnt = 0;
    if (tmpEne.status != EN_STATUS.INIT) {
        var self = this;
        //  ザコの存在チェック
        for (let jj = 0; jj < self.enemyArray.length; jj++) {
            let zako = self.enemyArray[jj];
            if (zako.define.attr.isBossZako) {
                zakoCnt++;
            }
        }
        if (zakoCnt != 0) {
            //ザコが残っていたらボスのライフは5/10以下にならない
            if (tmpEne.life < tmpEne.defineLife * (5 / 10)) {
                tmpEne.life = tmpEne.defineLife * (5 / 10);
            }
        }
    }

    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.localCounter = 0;
            tmpEne.localStatus = 0;
            tmpEne.spd = Vector2(0, 8);
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    // 出現
                    if (tmpEne.y >= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                        tmpEne.collisionEnable = true;
                    }
                    break;
                case 1:
                    // 0.5秒待って右へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(spd, 0); // 右へ移動
                        tmpEne.localStatus = 2;
                    } else {
                        boss03Shot(tmpEne, lifeStep);
                    }
                    break;
                case 2:
                    // 右端へ来たら停止
                    if (tmpEne.x >= SCREEN_WIDTH - (128 + 64)) {
                        tmpEne.x = SCREEN_WIDTH - (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 3;
                    }
                    break;
                case 3:
                    // 0.5秒待って下へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(0, spd); // 下へ移動

                        tmpEne.localStatus = 4;
                    } else {
                        boss03Shot(tmpEne, lifeStep);
                    }
                    break;
                case 4:
                    // 下端に来たら停止
                    if (tmpEne.y >= SCREEN_HEIGHT - (128 + 64)) {
                        tmpEne.y = SCREEN_HEIGHT - (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 5;
                    }
                    break;
                case 5:
                    // 0.5秒待って左へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(-spd, 0); // 左へ移動
                        tmpEne.localStatus = 6;
                    } else {
                        boss03Shot(tmpEne, lifeStep);
                    }
                    break;
                case 6:
                    // 左端に来たら停止
                    if (tmpEne.x <= 0 + (128 + 64)) {
                        tmpEne.x = 0 + (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 7;
                    }
                    break;
                case 7:
                    // 0.5秒待って上へ移動
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.spd = Vector2(0, -spd); // 上へ移動
                        tmpEne.localStatus = 8;
                    } else {
                        boss03Shot(tmpEne, lifeStep);
                    }
                    break;
                case 8:
                    // 上端に来たら停止
                    if (tmpEne.y <= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        if (zakoCnt !== 0) {
                            tmpEne.localStatus = 1;
                        } else {
                            tmpEne.localStatus = 9;
                            tmpEne.collisionEnable = false;
                        }
                    }
                    break;
                case 9:
                    // 0.5秒で消えてから中央へ移動
                    if (++tmpEne.localCounter > 60) {
                        // 中央へ瞬間移動
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.y = SCREEN_CENTER_Y;
                        tmpEne.alpha = 0.0;
                        tmpEne.localCounter = 0;
                        tmpEne.localStatus = 10;
                    } else {
                        if (tmpEne.localCounter > 30) {
                            tmpEne.alpha = 1.0 - ((tmpEne.localCounter - 30) / 30.0);
                        } else {
                            boss03Shot(tmpEne, lifeStep);
                        }
                    }
                    break;
                case 10:
                    // 0.5秒で出現
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.alpha = 1.0;
                        tmpEne.localCounter = 0;
                        tmpEne.localStatus = 11;
                        tmpEne.collisionEnable = true;
                    } else {
                        tmpEne.alpha = tmpEne.localCounter / 30.0;
                    }
                    break;
                case 11:
                    // 2秒間攻撃
                    if (++tmpEne.localCounter > 2 * 60) {
                        tmpEne.localCounter = 0;
                        tmpEne.localStatus = 12;
                        tmpEne.collisionEnable = false;
                    } else {
                        shotSpiralOfs(tmpEne, Vector2(-158, -128), -16, -90, SHOT_TYPE.SPIRAL_LEFT_XL.spd, SHOT_TYPE.SPIRAL_LEFT_XL.bullet);
                        shotSpiralOfs(tmpEne, Vector2(-158, -128), 16, -90, SHOT_TYPE.SPIRAL_RIGHT_XL.spd, SHOT_TYPE.SPIRAL_RIGHT_XL.bullet);
                    }
                    break;
                case 12:
                    // 0.5秒で消えてから右上へ移動
                    if (++tmpEne.localCounter > 30) {
                        // 中央へ瞬間移動
                        tmpEne.x = SCREEN_WIDTH - (128 + 64);
                        tmpEne.y = 256 + 64;
                        tmpEne.alpha = 0.0;
                        tmpEne.localCounter = 0;
                        tmpEne.localStatus = 13;
                    } else {
                        tmpEne.alpha = 1.0 - (tmpEne.localCounter / 30.0);
                    }
                    break;
                case 13:
                    // 0.5秒で出現
                    if (++tmpEne.localCounter > 30) {
                        tmpEne.alpha = 1.0;
                        tmpEne.localCounter = 0;
                        tmpEne.localStatus = 2;
                        tmpEne.collisionEnable = true;
                    } else {
                        tmpEne.alpha = tmpEne.localCounter / 30.0;
                    }
                    break
                default:
            }
            tmpEne.localCounter++;
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
            tmpEne.localCounter = 0;
            nowScore += tmpEne.define.pts;
            if (isBOSSSRUSH) {
                ctrlCounter++;
            } else {
                // 次の面へ
                if (++nowStageNum >= STG_NUM_MAX) {
                    nowStageNum = 0;
                    nowLoopCount++;
                    nowScore++;
                }
                ctrlCounter = 0;
            }
            ctrlCounterFlag = true;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

function boss03Shot(tmpEne, lifeStep) {
    let shotType;
    switch (tmpEne.localStatus) {
        case 1:
        case 9:
            shotType = SHOT_TYPE.SEMICIRCLE_DOWN_RIGHT_L;
            break;
        case 3:
            shotType = SHOT_TYPE.SEMICIRCLE_DOWN_LEFT_L;
            break;
        case 5:
            shotType = SHOT_TYPE.SEMICIRCLE_UP_LEFT_L;
            break;
        case 7:
            shotType = SHOT_TYPE.SEMICIRCLE_UP_RIGHT_L;
            break;
    }
    /**
     * tmpEne.localStatus
     */
    switch (lifeStep) {
        case 0:
            if (tmpEne.shotIntervalTimer % 2 === 0) {
                shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 1) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 2) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
            }
            break;
        case 1:
            if (tmpEne.shotIntervalTimer % 2 === 0) {
                let orgTarget = tmpEne.shotTarget;
                tmpEne.shotTarget = Vector2(orgTarget.x + 128, orgTarget.y + 128);
                shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 1) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 2) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                tmpEne.shotTarget = Vector2(orgTarget.x - 128, orgTarget.y + 128);
                shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 1) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 2) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                tmpEne.shotTarget = Vector2(orgTarget.x + 128, orgTarget.y - 128);
                shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 1) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 2) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                tmpEne.shotTarget = Vector2(orgTarget.x - 128, orgTarget.y - 128);
                shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 1) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_N.spd, SHOT_TYPE.SNIPE_H.bullet);
                if (nowLoopCount >= 2) shotSnipeOfs(tmpEne, Vector2(-158, -128), SHOT_TYPE.SNIPE_L.spd, SHOT_TYPE.SNIPE_H.bullet);
                tmpEne.shotTarget = orgTarget;
            }
            break;
        case 2:
            if (shotType !== undefined) {
                boss03Shot01(tmpEne, shotType, 10, 4);
            } else {
                console.log("boss03Shot02 is null");
            }
            break;
        case 3:
            if (shotType !== undefined) {
                boss03Shot01(tmpEne, shotType, 2, 8);
            }
            break;
        default:
    }
}
function boss03Shot01(tmpEne, shotType, interval, shotBurst) {
    if (tmpEne.shotIntervalTimer % interval === 0) {
        if (--tmpEne.shotBurstTimer <= 0) {
            shotSemicircleOfs(tmpEne, Vector2(-158, -128), shotType.cnt, shotType.spd, shotType.bullet);
            if (nowLoopCount >= 1) shotSemicircleOfs(tmpEne, Vector2(-158, -128), shotType.cnt + 22, shotType.spd + 2, shotType.bullet);
            if (nowLoopCount >= 2) shotSemicircleOfs(tmpEne, Vector2(-158, -128), shotType.cnt - 22, shotType.spd + 2, shotType.bullet);
            tmpEne.shotBurstTimer = 2;
            if (++tmpEne.shotBurstCounter >= shotBurst) {
                tmpEne.shotBurstCounter = 0;
            } else {
                tmpEne.shotIntervalTimer--;
            }
            return true;
        } else {
            tmpEne.shotIntervalTimer--;
        }
    }
    return false;
}


/**
 * ボス04（UFO）
 * 上から出現
 * 左右に直線で動く
 * 周囲にザコが発生
 * ボスを中心に円軌道で移動
 * ザコが全滅するまでボスのライフは減らない
 * ザコが全滅すると左右に移動しつつまれに体当たり（上下移動）を行う
 * 下限到達時にN方向へ弾を撃つ
 * 徐々に加速する
 * 徐々に弾の数が増える
 * @param {*} tmpEne 
 */
function boss04Move(tmpEne) {
    let lifeStep;
    //横移動の途中で一旦停止してから縦移動へ
    //戻ったら元の横移動を継続する
    if (tmpEne.life > tmpEne.defineLife * (3 / 4)) {
        //1~3/4
        lifeStep = 0;
    } else if (tmpEne.life > tmpEne.defineLife * (2 / 4)) {
        // 4/3~2/4
        lifeStep = 1;
    } else if (tmpEne.life > tmpEne.defineLife * (1 / 4)) {
        // 2/4~1/4
        lifeStep = 2;
    } else {
        // 1/4~0
        lifeStep = 3;
    }

    // ザコチェック
    let zakoCnt = 0;
    if (tmpEne.status != EN_STATUS.INIT) {
        var self = this;
        //  ザコの存在チェック
        for (let jj = 0; jj < self.enemyArray.length; jj++) {
            let zako = self.enemyArray[jj];
            if (zako.define.attr.isBossZako) {
                zakoCnt++;
            }
        }
        if (zakoCnt != 0) {
            //ザコが残っていたらボスのライフは減らない
            tmpEne.life = tmpEne.defineLife;
        }
    }

    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.localCounter = 0;
            tmpEne.localStatus = 0;
            tmpEne.spd = Vector2(0, 8);
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    // 出現
                    if (tmpEne.y >= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                        tmpEne.collisionEnable = true;
                    }
                    break;
                case 1:
                    // 0.5秒待って右へ移動
                    if (++tmpEne.localCounter > 30) {
                        if ((zakoCnt == 0) && (player.x >= SCREEN_CENTER_X - (SCREEN_CENTER_X / 2)) && (player.x <= SCREEN_CENTER_X + (SCREEN_CENTER_X / 2))) {
                            tmpEne.spd = Vector2(0, 32); // 下へ移動
                            tmpEne.localStatus = 9;
                        } else {
                            // n秒待って右へ移動
                            if (lifeStep === 0) {
                                if (++tmpEne.localCounter > 30) {
                                    tmpEne.spd = Vector2(8, 0); // 右へ移動
                                    tmpEne.localStatus = 2;
                                } else {
                                    boss01Shot(tmpEne, lifeStep, true);
                                }
                            } else {
                                if (++tmpEne.localCounter > 240) {
                                    tmpEne.spd = Vector2(8, 0); // 右へ移動
                                    tmpEne.localStatus = 2;
                                } else {
                                    if (tmpEne.localCounter < 30) {
                                        shotByDegreeOfs(tmpEne, Vector2(0, 160), tmpEne.localCounter * 6, 8, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 1) shotByDegreeOfs(tmpEne, Vector2(0, 160), tmpEne.localCounter * 6, 10, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 2) shotByDegreeOfs(tmpEne, Vector2(0, 160), tmpEne.localCounter * 6, 6, BULLET_DEF.EN_B_48);
                                    } else if (tmpEne.localCounter < 60) {
                                        shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - ((tmpEne.localCounter - 30) * 6), 8, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 1) shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - ((tmpEne.localCounter - 30) * 6), 10, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 2) shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - ((tmpEne.localCounter - 30) * 6), 6, BULLET_DEF.EN_B_48);
                                    } else if (tmpEne.localCounter < 90) {
                                        shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 60) * 6, 8, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 1) shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 60) * 6, 10, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 2) shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 60) * 6, 6, BULLET_DEF.EN_B_48);
                                    } else if (tmpEne.localCounter < 120) {
                                        shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - (tmpEne.localCounter - 90) * 6, 8, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 1) shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - (tmpEne.localCounter - 90) * 6, 10, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 2) shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - (tmpEne.localCounter - 90) * 6, 6, BULLET_DEF.EN_B_48);
                                    } else if (tmpEne.localCounter < 150) {
                                        shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 120) * 6, 8, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 1) shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 120) * 6, 10, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 2) shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 120) * 6, 6, BULLET_DEF.EN_B_48);
                                    } else if (tmpEne.localCounter < 180) {
                                        shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - (tmpEne.localCounter - 150) * 6, 8, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 1) shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - (tmpEne.localCounter - 150) * 6, 10, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 2) shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - (tmpEne.localCounter - 150) * 6, 6, BULLET_DEF.EN_B_48);
                                    } else if (tmpEne.localCounter < 210) {
                                        shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 180) * 6, 8, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 1) shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 180) * 6, 10, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 2) shotByDegreeOfs(tmpEne, Vector2(0, 160), (tmpEne.localCounter - 180) * 6, 6, BULLET_DEF.EN_B_48);
                                    } else {
                                        shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - ((tmpEne.localCounter - 210) * 6), 8, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 1) shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - ((tmpEne.localCounter - 210) * 6), 10, BULLET_DEF.EN_B_48);
                                        if (nowLoopCount >= 2) shotByDegreeOfs(tmpEne, Vector2(0, 160), 180 - ((tmpEne.localCounter - 210) * 6), 6, BULLET_DEF.EN_B_48);
                                        boss01Shot(tmpEne, lifeStep, false);
                                    }
                                }
                            }
                        }
                    } else {
                        boss04Shot(tmpEne, lifeStep);
                    }
                    break;
                case 9:
                    // 下端へ来たら即上昇
                    if (tmpEne.y >= SCREEN_HEIGHT - 64) {
                        tmpEne.y = SCREEN_HEIGHT - 64;
                        tmpEne.spd = Vector2(0, -8);
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 10;
                        shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_L.cnt, SHOT_TYPE.SEMICIRCLE_UP_L.spd, SHOT_TYPE.SEMICIRCLE_UP_L.bullet);
                        if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_L.cnt, SHOT_TYPE.SEMICIRCLE_UP_L.spd + 2, SHOT_TYPE.SEMICIRCLE_UP_L.bullet);
                        if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_L.cnt, SHOT_TYPE.SEMICIRCLE_UP_L.spd + 4, SHOT_TYPE.SEMICIRCLE_UP_L.bullet);
                    }
                    break;
                case 10:
                    // 上端へ来たら即右移動
                    if (tmpEne.y <= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(8, 0);
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 2;
                    }
                    break;
                case 2:
                    // 右端へ来たら停止
                    if (tmpEne.x >= SCREEN_WIDTH - (128 + 64)) {
                        tmpEne.x = SCREEN_WIDTH - (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 3;
                    }
                    break;
                case 3:
                    // 0.5秒待って左へ移動
                    if (++tmpEne.localCounter > 30) {
                        if ((zakoCnt == 0) && (player.x >= SCREEN_CENTER_X + (SCREEN_CENTER_X / 2))) {
                            tmpEne.spd = Vector2(0, 32); // 下へ移動
                            tmpEne.localStatus = 11;
                        } else {
                            tmpEne.spd = Vector2(-8, 0); // 左へ移動
                            tmpEne.localStatus = 4;
                        }
                    } else {
                        boss04Shot(tmpEne, lifeStep);
                    }
                    break;
                case 11:
                    // 下端へ来たら即上昇
                    if (tmpEne.y >= SCREEN_HEIGHT - 64) {
                        tmpEne.y = SCREEN_HEIGHT - 64;
                        tmpEne.spd = Vector2(0, -8);
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 12;
                        shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_L.cnt, SHOT_TYPE.SEMICIRCLE_UP_L.spd, SHOT_TYPE.SEMICIRCLE_UP_L.bullet);
                        if (nowLoopCount >= 1) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_L.cnt, SHOT_TYPE.SEMICIRCLE_UP_L.spd + 2, SHOT_TYPE.SEMICIRCLE_UP_L.bullet);
                        if (nowLoopCount >= 2) shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_L.cnt, SHOT_TYPE.SEMICIRCLE_UP_L.spd + 4, SHOT_TYPE.SEMICIRCLE_UP_L.bullet);
                    }
                    break;
                case 12:
                    // 上端へ来たら即左移動
                    if (tmpEne.y <= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(-8, 0);
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 4;
                    }
                    break;
                case 4:
                    // 中央に来たら停止
                    if (tmpEne.x <= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 5;
                    }
                    break;
                case 5:
                    // 0.5秒待って左へ移動
                    if (++tmpEne.localCounter > 30) {
                        if ((zakoCnt == 0) && (player.x >= SCREEN_CENTER_X - (SCREEN_CENTER_X / 2)) && (player.x <= SCREEN_CENTER_X + (SCREEN_CENTER_X / 2))) {
                            tmpEne.spd = Vector2(0, 32); // 下へ移動
                            tmpEne.localStatus = 13;
                        } else {
                            //tmpEne.spd = Vector2(-8, 0); // 左へ移動
                            //tmpEne.localStatus = 6;
                            // n秒待って右へ移動
                            if (lifeStep === 0) {
                                if (++tmpEne.localCounter > 30) {
                                    tmpEne.spd = Vector2(-8, 0); // 左へ移動
                                    tmpEne.localStatus = 6;
                                } else {
                                    boss01Shot(tmpEne, lifeStep, true);
                                }
                            } else {
                                if (++tmpEne.localCounter > 240) {
                                    tmpEne.spd = Vector2(-8, 0); // 左へ移動
                                    tmpEne.localStatus = 6;
                                } else {
                                    shotSpiralOfs(tmpEne, Vector2(0, 160), -16, 90, SHOT_TYPE.SPIRAL_LEFT_XL.spd, SHOT_TYPE.SPIRAL_LEFT_XL.bullet);
                                    if (nowLoopCount >= 1) shotSpiralOfs(tmpEne, Vector2(0, 160), -16, 90, SHOT_TYPE.SPIRAL_LEFT_XL.spd + 4, SHOT_TYPE.SPIRAL_LEFT_XL.bullet);
                                    if (nowLoopCount >= 2) shotSpiralOfs(tmpEne, Vector2(0, 160), -16, 90, SHOT_TYPE.SPIRAL_LEFT_XL.spd - 4, SHOT_TYPE.SPIRAL_LEFT_XL.bullet);
                                    shotSpiralOfs(tmpEne, Vector2(0, 160), 16, 90, SHOT_TYPE.SPIRAL_RIGHT_XL.spd, SHOT_TYPE.SPIRAL_RIGHT_XL.bullet);
                                    if (nowLoopCount >= 1) shotSpiralOfs(tmpEne, Vector2(0, 160), 16, 90, SHOT_TYPE.SPIRAL_RIGHT_XL.spd + 4, SHOT_TYPE.SPIRAL_RIGHT_XL.bullet);
                                    if (nowLoopCount >= 2) shotSpiralOfs(tmpEne, Vector2(0, 160), 16, 90, SHOT_TYPE.SPIRAL_RIGHT_XL.spd - 4, SHOT_TYPE.SPIRAL_RIGHT_XL.bullet);
                                }
                            }

                        }
                    } else {
                        boss04Shot(tmpEne, lifeStep);
                    }
                    break;
                case 13:
                    // 下端へ来たら即上昇
                    if (tmpEne.y >= SCREEN_HEIGHT - 64) {
                        tmpEne.y = SCREEN_HEIGHT - 64;
                        tmpEne.spd = Vector2(0, -8);
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 14;
                        shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_L.cnt, SHOT_TYPE.SEMICIRCLE_UP_L.spd, SHOT_TYPE.SEMICIRCLE_UP_L.bullet);
                        if (lifeStep >= 2) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt, SHOT_TYPE.SEMICIRCLE_UP_XL.spd, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                        }
                        if (lifeStep >= 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt, SHOT_TYPE.SEMICIRCLE_UP_XL.spd - 1, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt, SHOT_TYPE.SEMICIRCLE_UP_XL.spd - 2, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                            if (nowLoopCount >= 2) {
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt + 11, SHOT_TYPE.SEMICIRCLE_UP_XL.spd, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt - 11, SHOT_TYPE.SEMICIRCLE_UP_XL.spd, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                            }
                        }
                    }
                    break;
                case 14:
                    // 上端へ来たら即左移動
                    if (tmpEne.y <= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(-8, 0);
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 6;
                    }
                    break;
                case 6:
                    // 左端に来たら停止
                    if (tmpEne.x <= 0 + (128 + 64)) {
                        tmpEne.x = 0 + (128 + 64);
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 7;
                    }
                    break;
                case 7:
                    // 0.5秒待って右へ移動
                    if (++tmpEne.localCounter > 30) {
                        if ((zakoCnt == 0) && (player.x <= SCREEN_CENTER_X - (SCREEN_CENTER_X / 2))) {
                            tmpEne.spd = Vector2(0, 32); // 下へ移動
                            tmpEne.localStatus = 15;
                        } else {
                            tmpEne.spd = Vector2(8, 0); // 右へ移動
                            tmpEne.localStatus = 8;
                        }
                    } else {
                        boss04Shot(tmpEne, lifeStep);
                    }
                    break;
                case 15:
                    // 下端へ来たら即上昇
                    if (tmpEne.y >= SCREEN_HEIGHT - 64) {
                        tmpEne.y = SCREEN_HEIGHT - 64;
                        tmpEne.spd = Vector2(0, -8);
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 16;
                        shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_L.cnt, SHOT_TYPE.SEMICIRCLE_UP_L.spd, SHOT_TYPE.SEMICIRCLE_UP_L.bullet);
                        if (lifeStep >= 2) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt, SHOT_TYPE.SEMICIRCLE_UP_XL.spd, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                        }
                        if (lifeStep >= 3) {
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt, SHOT_TYPE.SEMICIRCLE_UP_XL.spd - 1, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                            shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt, SHOT_TYPE.SEMICIRCLE_UP_XL.spd - 2, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                            if (nowLoopCount >= 2) {
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt + 11, SHOT_TYPE.SEMICIRCLE_UP_XL.spd, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                                shotSemicircle(tmpEne, SHOT_TYPE.SEMICIRCLE_UP_XL.cnt - 11, SHOT_TYPE.SEMICIRCLE_UP_XL.spd, SHOT_TYPE.SEMICIRCLE_UP_XL.bullet);
                            }
                        }
                    }
                    break;
                case 16:
                    // 上端へ来たら即右移動
                    if (tmpEne.y <= 256 + 64) {
                        tmpEne.y = 256 + 64;
                        tmpEne.spd = Vector2(8, 0);
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 8;
                    }
                    break;
                case 8:
                    // 中央に来たら停止
                    if (tmpEne.x >= SCREEN_CENTER_X) {
                        tmpEne.x = SCREEN_CENTER_X;
                        tmpEne.spd = Vector2(0, 0); // 停止
                        tmpEne.shotIntervalTimer = 0;
                        tmpEne.shotBurstCounter = 0;
                        tmpEne.shotBurstTimer = 0;
                        tmpEne.localCounter = 0;
                        tmpEne.shotTarget = Vector2(player.x, player.y);
                        tmpEne.localStatus = 1;
                    }
                    break;
                default:
            }

            if (tmpEne.localStatus === 0) {
            } else if (lifeStep === 0) {
                if (tmpEne.localTimer % 60 === 0) {
                    // チヌカッター発射
                    shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(+8.0, -8.0));
                    shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(-8.0, -8.0));
                    if (nowLoopCount >= 1) {
                        shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(-8.0, -8.0));
                        shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(+8.0, -8.0));
                    }
                    if (nowLoopCount >= 2) {
                        shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(.0, -8.0));
                        shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(-0.0, -8.0));
                    }
                }
            } else if (lifeStep === 1) {
                if (tmpEne.localTimer % 50 === 0) {
                    // チヌカッター発射
                    shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(+8.0, -8.0));
                    shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(-8.0, -8.0));
                    if (nowLoopCount >= 1) {
                        shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(-8.0, -8.0));
                        shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(+8.0, -8.0));
                    }
                    if (nowLoopCount >= 2) {
                        shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(.0, -8.0));
                        shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(-0.0, -8.0));
                    }
                }
            } else {
                if (tmpEne.localTimer % 40 === 0) {
                    // チヌカッター発射
                    shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(+8.0, -8.0));
                    shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(-8.0, -8.0));
                    if (nowLoopCount >= 1) {
                        shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(-8.0, -8.0));
                        shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(+8.0, -8.0));
                    }
                    if (nowLoopCount >= 2) {
                        shotChinuCutterOfs(tmpEne, Vector2(128 + 16 + 4, -256 + 112), Vector2(.0, -8.0));
                        shotChinuCutterOfs(tmpEne, Vector2(-128 - 16, -256 + 104), Vector2(-0.0, -8.0));
                    }
                }
            }

            tmpEne.localCounter++;
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
            tmpEne.localCounter = 0;
            nowScore += tmpEne.define.pts;
            if (isBOSSSRUSH) {
                ctrlCounter++;
            } else {
                // 次の面へ
                if (++nowStageNum >= STG_NUM_MAX) {
                    nowStageNum = 0;
                    nowLoopCount++;
                    nowScore++;
                }
                ctrlCounter = 0;
            }
            ctrlCounterFlag = true;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}
function boss04Shot(tmpEne, lifeStep) {
    switch (lifeStep) {
        case 0:
        case 1:
            if (tmpEne.shotIntervalTimer % 2 === 0) {
                shotSnipeOfs(tmpEne, Vector2(0, 160), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
            }
            break;
        case 2:
            boss01Shot01(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L, 10, 4);
            break;
        case 3:
            if (boss01Shot01(tmpEne, SHOT_TYPE.SEMICIRCLE_DOWN_L, 2, 8)) {
                shotSnipeOfs(tmpEne, Vector2(+128, 160), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(0, 160), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
                shotSnipeOfs(tmpEne, Vector2(-128, 160), SHOT_TYPE.SNIPE_H.spd, SHOT_TYPE.SNIPE_H.bullet);
            }
            break;
        default:
    }
}


/**
 * ボス用ザコ
 * ボスを中心に円軌道で移動
 * @param {*} tmpEne 
 */
function bossZako01Move(tmpEne, rotateRight) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.spd = Vector2(0, 0);
            tmpEne.status = EN_STATUS.START;
            tmpEne.localStatus = 0;
            tmpEne.collisionEnable = true;
            break;
        case EN_STATUS.START:
            // bossを探す
            var self = this;
            let boss = null;
            for (let jj = 0; jj < self.enemyArray.length; jj++) {
                tmp = self.enemyArray[jj];
                if (tmp.define.attr.isBoss) {
                    boss = tmp;
                    break;
                }
            }
            if (boss === null) break;
            // ボスの座標を中心に円軌道
            let rad = (2 * Math.PI * ((tmpEne.localTimer / 120))) + tmpEne.localRadian;
            let radius = (tmpEne.define.sprSize.x / 2) + (boss.define.sprSize.x / 2);
            if (rotateRight) {
                tmpEne.x = boss.x + (Math.cos(rad) * radius);
                tmpEne.y = boss.y + (Math.sin(rad) * radius);
            } else {
                tmpEne.x = boss.x + (Math.sin(rad) * radius);
                tmpEne.y = boss.y + (Math.cos(rad) * radius);
            }
            enemyShotCommon(tmpEne);
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * 8面ボス
 * 下から出現
 * 
 * @param {*} tmpEne 
 */
function boss08Move(tmpEne) {
}

/**
 * アイテムの移動
 * @param {*} tmpEne 
 */
function item00Move(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            let deg;
            let rand = myRandom(0, 3);
            switch (rand) {
                case 0:
                    deg = 0 + 30;
                    break;
                case 1:
                    deg = 90 + 30;
                    break;
                case 2:
                    deg = 180 + 30;
                    break;
                case 3:
                    deg = 270 + 30;
                    break;
            }
            tmpEne.spd = fromDegreeToVec(deg, tmpEne.define.spd);
            tmpEne.status = EN_STATUS.START;
            tmpEne.localCounter = 0;
            tmpEne.collisionEnable = true;
        // THRU
        case EN_STATUS.START:
            if (tmpEne.localCounter >= 5) {
                break;
            }
            let absSpdX = Math.abs(tmpEne.spd.x);
            let absSpdY = Math.abs(tmpEne.spd.y);
            if (tmpEne.x < 0 + absSpdX) {
                tmpEne.spd.x *= -1;
                tmpEne.localCounter++;
            } else if (tmpEne.x > SCREEN_WIDTH - absSpdX) {
                tmpEne.spd.x *= -1;
                tmpEne.localCounter++;
            }
            if (tmpEne.y < 0 + absSpdY) {
                tmpEne.spd.y *= -1;
                tmpEne.localCounter++;
            } else if (tmpEne.y > SCREEN_HEIGHT - absSpdY) {
                tmpEne.spd.y *= -1;
                tmpEne.localCounter++;
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 * EN_DEFで指定した弾を撃つ処理
 * @param {\} tmpEne 
 */
function enemyShot(tmpEne) {
    switch (tmpEne.define.shotType) {
        case SHOT_TYPE.NONE:
            break;
        case SHOT_TYPE.SNIPE_L:
        case SHOT_TYPE.SNIPE_N:
        case SHOT_TYPE.SNIPE_H:
            shotSnipe(tmpEne, tmpEne.define.shotType.spd, tmpEne.define.shotType.bullet);
            break;
        case SHOT_TYPE.WAY_OF_4_N:
        case SHOT_TYPE.WAY_OF_8_N:
        case SHOT_TYPE.WAY_OF_16_N:
        case SHOT_TYPE.WAY_OF_32_N:
            shotNWay(tmpEne, tmpEne.define.shotType.cnt, tmpEne.define.shotType.spd, tmpEne.define.shotType.bullet);
            break;
        case SHOT_TYPE.SECTOR_L:
        case SHOT_TYPE.SECTOR_N:
            shotSector(tmpEne, tmpEne.define.shotType.spd, tmpEne.define.shotType.bullet);
            break;
        case SHOT_TYPE.SECTOR_UP_L:
        case SHOT_TYPE.SECTOR_DOWN_L:
        case SHOT_TYPE.SECTOR_LEFT_L:
        case SHOT_TYPE.SECTOR_RIGHT_L:
        case SHOT_TYPE.SECTOR_UP_N:
        case SHOT_TYPE.SECTOR_DOWN_N:
        case SHOT_TYPE.SECTOR_LEFT_N:
        case SHOT_TYPE.SECTOR_RIGHT_N:
            shotSectorDeg(tmpEne, tmpEne.define.shotType.cnt, tmpEne.define.shotType.spd, tmpEne.define.shotType.bullet);
            break;
        case SHOT_TYPE.SEMICIRCLE_UP_L:
        case SHOT_TYPE.SEMICIRCLE_UP_RIGHT_L:
        case SHOT_TYPE.SEMICIRCLE_RIGHT_L:
        case SHOT_TYPE.SEMICIRCLE_DOWN_RIGHT_L:
        case SHOT_TYPE.SEMICIRCLE_DOWN_L:
        case SHOT_TYPE.SEMICIRCLE_DOWN_LEFT_L:
        case SHOT_TYPE.SEMICIRCLE_LEFT_L:
        case SHOT_TYPE.SEMICIRCLE_UP_LEFT_L:
        case SHOT_TYPE.SEMICIRCLE_UP_N:
        case SHOT_TYPE.SEMICIRCLE_UP_RIGHT_N:
        case SHOT_TYPE.SEMICIRCLE_RIGHT_N:
        case SHOT_TYPE.SEMICIRCLE_DOWN_RIGHT_N:
        case SHOT_TYPE.SEMICIRCLE_DOWN_N:
        case SHOT_TYPE.SEMICIRCLE_DOWN_LEFT_N:
        case SHOT_TYPE.SEMICIRCLE_LEFT_N:
        case SHOT_TYPE.SEMICIRCLE_UP_LEFT_N:
            shotSemicircle(tmpEne, tmpEne.define.shotType.cnt, tmpEne.define.shotType.spd, tmpEne.define.shotType.bullet);
            break;
        case SHOT_TYPE.SPIRAL_LEFT_L:
        case SHOT_TYPE.SPIRAL_RIGHT_L:
        case SHOT_TYPE.SPIRAL_LEFT_N:
        case SHOT_TYPE.SPIRAL_RIGHT_N:
            shotSpiral(tmpEne, tmpEne.define.shotType.cnt, tmpEne.define.shotType.spd, tmpEne.define.shotType.bullet);
            break;
    }
}

/**
 * 間隔とかをいい感じに調整してEN_DEFで指定した弾を撃つ処理
 * @param {*} tmpEne 
 */
function enemyShotCommon(tmpEne) {
    if (tmpEne.shotIntervalTimer % tmpEne.define.shotInterval === 0) {
        if (--tmpEne.shotBurstTimer <= 0) {
            enemyShot(tmpEne);
            tmpEne.shotBurstTimer = 2;
            if (++tmpEne.shotBurstCounter >= tmpEne.define.shotBurst) {
                tmpEne.shotBurstCounter = 0;
            } else {
                tmpEne.shotIntervalTimer--;
            }
        } else {
            tmpEne.shotIntervalTimer--;
        }
    } else {
        tmpEne.shotTarget = Vector2(player.x, player.y);
    }
}

/**
 * 自機をめがけて射撃
 * @param {*} tmpEne 
 */
function shotSnipe(tmpEne, spd, bulletDefine) {
    shotSnipeOfs(tmpEne, Vector2(0, 0), spd, bulletDefine);
}
/**
 * 自機をめがけて射撃
 * オフセット有り
 * @param {*} tmpEne 
 * @param {*} ofs 
 * @param {*} spd 
 */
function shotSnipeOfs(tmpEne, ofs, spd, bulletDefine) {
    let from = Vector2(tmpEne.x + ofs.x, tmpEne.y + ofs.y);
    let to = tmpEne.shotTarget;
    let vec = Vector2.sub(to, from).normalize().mul(spd);
    let enBullet = EnBulletSprite(++uidCounter, bulletDefine, tmpEne.x + ofs.x, tmpEne.y + ofs.y, vec.x, vec.y).addChildTo(group7);
    enBulletArray.push(enBullet);
}
/**
 * 指定の角度で射撃
 * @param {*} tmpEne 
 * @param {*} degree 
 */
function shotByDegree(tmpEne, degree, spd, bulletDefine) {
    shotByDegreeOfs(tmpEne, Vector2(0, 0), degree, spd, bulletDefine);
}
/**
 * 指定の角度で射撃
 * オフセット有り
 * @param {*} tmpEne 
 * @param {*} ofs 
 * @param {*} degree 
 * @param {*} spd 
 */
function shotByDegreeOfs(tmpEne, ofs, degree, spd, bulletDefine) {
    let vec = fromDegreeToVec(degree, spd);
    let enBullet = EnBulletSprite(++uidCounter, bulletDefine, tmpEne.x + ofs.x, tmpEne.y + ofs.y, vec.x, vec.y).addChildTo(group7);
    enBulletArray.push(enBullet);
}
/**
 * 360°をn分割した方向に射撃
 * @param {*} tmpEne 
 * @param {*} n 
 */
function shotNWay(tmpEne, n, spd, bulletDefine) {
    shotNWayOfs(tmpEne, Vector2(0, 0), n, spd, bulletDefine);
}
/**
 * 360°をn分割した方向に射撃
 * オフセット有り
 * @param {*} tmpEne 
 * @param {*} ofs 
 * @param {*} n 
 * @param {*} spd 
 */
function shotNWayOfs(tmpEne, ofs, n, spd, bulletDefine) {
    for (let ii = 0; ii < n; ii++) {
        shotByDegreeOfs(tmpEne, ofs, (360 / n) * ii, spd, bulletDefine);
    }
}

function shotChinuCutter(tmpEne, spd) {
    shotChinuCutterOfs(tmpEne, Vector2(0, 0), spd);
}
/**
 * 
 * @param {*} tmpEne 
 * @param {*} ofs 
 * @param {*} spd 
 */
function shotChinuCutterOfs(tmpEne, ofs, spd) {
    let enBullet = EnBulletSprite(++uidCounter, BULLET_DEF.EN_CHINU_CUTTER, tmpEne.x + ofs.x, tmpEne.y + ofs.y, spd.x, spd.y).addChildTo(group7);
    enBulletArray.push(enBullet);
}

/**
 * 
 * @param {*} tmpEne 
 * @param {*} spd 
 */
function shotSector(tmpEne, spd, bulletDefine) {
    const deg = fromVecToDegree(tmpEne.spd);
    let cnt = 0;
    if ((deg <= 45) && (deg >= -45)) {
        cnt = SHOT_TYPE.SECTOR_LEFT_N.cnt;
    } else if ((deg >= 45) && (deg <= 135)) {
        cnt = SHOT_TYPE.SECTOR_UP_N.cnt;
    } else if ((deg <= -45) && (deg >= -135)) {
        cnt = SHOT_TYPE.SECTOR_DOWN_N.cnt;
    } else {
        cnt = SHOT_TYPE.SECTOR_RIGHT_N.cnt;
    }
    shotSectorDeg(tmpEne, cnt, spd, bulletDefine);
}
/**
 * 扇形に射撃
 * 0,90,180,270とか
 * @param {*} tmpEne 
 * @param {*} deg 
 */
function shotSectorDeg(tmpEne, deg, spd, bulletDefine) {
    shotSectorDegOfs(tmpEne, Vector2(0, 0), deg, spd, bulletDefine);
}
/**
 * 扇形に射撃
 * オフセット有り
 * @param {*} tmpEne 
 * @param {*} ofs 
 * @param {*} deg 
 * @param {*} spd 
 */
function shotSectorDegOfs(tmpEne, ofs, deg, spd, bulletDefine) {
    for (let ii = 0; ii < 9; ii++) {
        shotByDegreeOfs(tmpEne, ofs, (10 * ii) + deg, spd, bulletDefine);
    }
}
/**
 * 半円に射撃
 * 180°を18分割して指定した角度から射撃
 * 0,90,180,270とか
 * @param {*} tmpEne 
 * @param {*} deg 
 */
function shotSemicircle(tmpEne, deg, spd, bulletDefine) {
    shotSemicircleOfs(tmpEne, Vector2(0, 0), deg, spd, bulletDefine);
}
/**
 * 半円に射撃
 * オフセット有り
 * @param {*} tmpEne 
 * @param {*} ofs 
 * @param {*} deg 
 * @param {*} spd 
 */
function shotSemicircleOfs(tmpEne, ofs, deg, spd, bulletDefine) {
    for (let ii = 0; ii <= 18; ii++) {
        shotByDegreeOfs(tmpEne, ofs, (10 * ii) + deg, spd, bulletDefine);
    }
}
/**
 * 
 * @param {*} tmpEne 
 * @param {*} deg 
 * @param {*} spd 
 * @param {*} bulletDefine 
 */
function shotSpiral(tmpEne, deg, spd, bulletDefine) {
    shotSpiralOfs(tmpEne, Vector2(0, 0), deg, 0, spd, bulletDefine);
}
/**
 * 
 * @param {*} tmpEne 
 * @param {*} ofs 
 * @param {*} deg 
 * @param {*} spd 
 * @param {*} bulletDefine 
 */
function shotSpiralOfs(tmpEne, ofsPos, deg, ofsDeg, spd, bulletDefine) {
    shotByDegreeOfs(tmpEne, ofsPos, (tmpEne.localTimer * deg) + ofsDeg, spd, bulletDefine);
}

/*
 * PlayerBullet
 */
phina.define("PlBulletSprite", {
    superClass: 'Sprite',

    init: function (uid, xPos, yPos, xSpd, ySpd) {
        this.uid = uid;
        this.superInit(BULLET_DEF.PL_O_16.sprName, BULLET_DEF.PL_O_16.sprSize.x, BULLET_DEF.PL_O_16.sprSize.y);
        this.direct = '';
        this.spd = Vector2(xSpd, ySpd);
        this.zRot = 0;
        this.setPosition(xPos, yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.isDead = false;
    },

    update: function (app) {
        if (player.status.isDead) return;
        this.zRot += 20;
        this.rotation = this.zRot;
        this.x += this.spd.x;
        this.y += this.spd.y;
    },
});

/*
 * PlayerBomb
 */
phina.define("PlBombSprite", {
    superClass: 'Sprite',

    // コンストラクタ
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
        this.timer = getRandomInt(30);
        this.isDead = false;
    },

    update: function (app) {
        if (player.status.isDead) return;
        switch (this.status) {
            case 0:
                // 開始待ち
                if (--this.timer <= 0) {
                    this.timer = 60;
                    this.status = 1;
                }
                break;
            case 1:
                // 拡大
                this.bombScale += 3 / 60;
                if (--this.timer <= 0) {
                    this.timer = 60;
                    this.bombScale = 3;
                    this.status = 2;
                }
                break;
            case 2:
                // 縮小
                this.bombScale -= 3 / 60;
                if (--this.timer <= 0) {
                    this.timer = 60;
                    this.bombScale = 0;
                    this.status = 3;
                    this.isDead = true;
                }
            default:
        }

        this.zRot += 5;
        this.rotation = this.zRot;
        this.setScale(this.bombScale, this.bombScale);
    },
});

/*
 * EnemyBullet
 */
phina.define("EnBulletSprite", {
    superClass: 'Sprite',

    // コンストラクタ
    init: function (uid, ebdef, xPos, yPos, xSpd, ySpd) {
        this.uid = uid;
        this.define = ebdef;
        this.superInit(ebdef.sprName, ebdef.sprSize.x, ebdef.sprSize.y);
        this.direct = '';
        this.spd = Vector2(xSpd, ySpd);
        this.spdScalar = 8;
        this.zRot = 0;
        this.setPosition(xPos, yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.localTimer = 0;
        this.localCounter = 0;
        this.localStatus = 0;
        this.status = EN_STATUS.INIT;
    },

    update: function (app) {
        if (player.status.isDead) return;
        if (this.define === BULLET_DEF.EN_CHINU_CUTTER) {
            switch (this.localStatus) {
                case 0:
                    // しばらく初期速度で移動
                    if (++this.localCounter > 30) {
                        this.localCounter = 0;
                        this.localStatus = 1;
                        let from = Vector2(this.x, this.y);
                        let to = Vector2(player.x, player.y);
                        this.spd = Vector2.sub(to, from).normalize().mul(this.spdScalar);
                    }
                    let tmpScale = 0.5 + this.localCounter * 2 / 30;
                    this.setScale(tmpScale, tmpScale);
                    this.zRot += 8;
                    break;
                case 1:
                    // 加速
                    this.spdScalar *= 1.5;
                    if (this.spdScalar > 24) this.spdScalar = 24;
                    this.spd = this.spd.normalize().mul(this.spdScalar);
                    this.setScale(2, 2);
                    this.zRot += 20;
                    break;
                default:
            }
        } else {
            this.zRot += 20;
        }
        this.rotation = this.zRot;
        this.x += this.spd.x;
        this.y += this.spd.y;
    },
});

// 爆発クラス
phina.define("Explosion", {
    // Spriteを継承
    superClass: 'Sprite',
    // 初期化
    init: function (xpos, ypos) {
        // 親クラスの初期化
        this.superInit('explosion', 48, 48);
        // SpriteSheetをスプライトにアタッチ
        var anim = FrameAnimation('explosion_ss').attachTo(this);
        // スプライトシートのサイズにフィットさせない
        anim.fit = false;
        //アニメーションを再生する
        anim.gotoAndPlay('start');
        // サイズ変更
        this.setSize(128, 128);

        this.x = xpos;
        this.y = ypos;

        // 参照用
        this.anim = anim;
    },
    // 毎フレーム処理
    update: function () {
        if (player.status.isDead) return;
        // アニメーションが終わったら自身を消去
        if (this.anim.finished) {
            this.remove();
        }
    },
});

// 敵の入場退場処理
function checkEnemyPosition() {
    if (player.status.isDead) return;

    let deadEnemyArray = [];

    for (let jj = 0; jj < self.enemyArray.length; jj++) {
        let tmpEne = self.enemyArray[jj];
        if (!tmpEne.isReady) {
            // 入場チェック
            if (
                (tmpEne.x > 0 - tmpEne.define.sprSize.x / 2) &&
                (tmpEne.x < SCREEN_WIDTH + tmpEne.define.sprSize.x / 2) &&
                (tmpEne.y > 0 - tmpEne.define.sprSize.y / 2) &&
                (tmpEne.y < SCREEN_HEIGHT + tmpEne.define.sprSize.y / 2)
            ) {
                tmpEne.isReady = true;
            }
        } else {
            // 退場チェック
            // BossZakoは退場チェックしない
            if (!tmpEne.define.attr.isBossZako) {
                if (
                    (tmpEne.x < 0 - tmpEne.define.sprSize.x / 2) ||
                    (tmpEne.x > SCREEN_WIDTH + tmpEne.define.sprSize.x / 2) ||
                    (tmpEne.y < 0 - tmpEne.define.sprSize.y / 2) ||
                    (tmpEne.y > SCREEN_HEIGHT + tmpEne.define.sprSize.y / 2)
                ) {
                    tmpEne.isReady = false;
                    deadEnemyArray.push(tmpEne);
                }
            }
        }
    }

    // 削除対象の敵を削除
    for (var ii = 0; ii < deadEnemyArray.length; ii++) {
        deadEnemyArray[ii].remove();
        self.enemyArray.erase(deadEnemyArray[ii]);
    }
}

// プレイヤーと敵との当たり判定
function checkPlayerToEnemy() {
    if (player.status.isDead) return;

    var self = this;
    let deadEnemyArray = [];

    // 敵との当たり判定
    for (let jj = 0; jj < self.enemyArray.length; jj++) {
        let tmpEne = self.enemyArray[jj];

        if (!tmpEne.isReady) continue; // 入場前
        if (tmpEne.status.isDead) continue; // 既に死亡済み

        for (let ii = 0; ii < tmpEne.define.colliData.length; ii++) {
            let colliData = tmpEne.define.colliData[ii];
            if (!colliData.attr.body) continue; // 機体との当たり判定用データではない
            if (chkCollisionCircleOfs(
                player.x, player.y,
                0, 0,
                4,
                tmpEne.x, tmpEne.y,
                colliData.ofs.x, colliData.ofs.y,
                colliData.radius
            ) == false) continue;   // 当たっていない

            if (tmpEne.define.attr.isEnemy) {
                // 当たったのが敵の場合
                // プレイヤー処理
                if (player.invincivleTimer <= 0) {
                    // 無敵時間外
                    if (--player.lifeLeft >= 1) {
                        // 残ライフが1以上
                        player.lifeParts = 0;

                        player.shotLv -= 2;
                        if (player.shotLv < 0) {
                            player.shotLv = 0;
                        }

                        player.spd -= 0.4;
                        if (player.spd < 1.0) {
                            player.spd = 1.0;
                        }

                        player.invincivleTimer = 60;
                    } else {
                        // 死亡
                        player.status = PL_STATUS.DEAD_INIT;
                    }

                    // 敵処理
                    if (--tmpEne.life >= 1) {
                        // 残ライフが1以上
                    } else {
                        tmpEne.status = EN_STATUS.DEAD_INIT;
                        if (!tmpEne.define.attr.isBoss) {
                            // ボスはここでは処理しない
                            deadEnemyArray.push(tmpEne);
                        }

                        // アイテム出現
                        itemAppear(tmpEne);

                        // 爆破パターンのセット
                        Explosion(tmpEne.x, tmpEne.y).addChildTo(group8);
                        SoundManager.play("explosion");
                    }
                }
            } else {
                // 当たったのがアイテムの場合
                switch (tmpEne.define) {
                    case EN_DEF.ITEM_SHOT:
                        if (++player.shotLv >= SHOT_LV_MAX) {
                            player.shotLv = SHOT_LV_MAX;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_SPEED:
                        player.spd += 0.2;
                        if (player.spd >= SPEED_MAX) {
                            player.spd = SPEED_MAX;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_BOMB:
                        if (++player.bombLeft >= BOMB_LEFT_MAX) {
                            player.bombLeft = BOMB_LEFT_MAX;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_LIFE:
                        if (player.lifeMax >= LIFE_MAX) {
                            player.lifeMax = LIFE_MAX;
                            nowScore += 1000;
                            break;
                        }
                        if (++player.lifeParts >= 4) {
                            player.lifeParts = 0;
                            player.lifeMax++;
                        }
                        break;
                    case EN_DEF.ITEM_FAIRY:
                        if (player.lifeLeft < player.lifeMax) {
                            player.lifeLeft = player.lifeMax;
                        } else {
                            nowScore += 1000;
                        }
                        break;
                    default:
                }
                tmpEne.status = EN_STATUS.DEAD_INIT;
                deadEnemyArray.push(tmpEne);
                SoundManager.play("item");
            }
            break;
        }
    }

    // 削除対象の敵を削除
    for (var ii = 0; ii < deadEnemyArray.length; ii++) {
        nowScore += deadEnemyArray[ii].define.pts;
        deadEnemyArray[ii].remove();
        self.enemyArray.erase(deadEnemyArray[ii]);
    }
}

function itemAppear(tmpEne) {
    // アイテム出現
    if (tmpEne.define.item) {
        if (++itemAppearCounter >= 5 + nowLoopCount) {
            itemAppearCounter = 0;
            let itemDefine;
            switch (itemAppearKind) {
                case 0:
                case 3:
                case 6:
                case 9:
                case 13:
                    if (++itemAppearShootCounter > 2) {
                        itemAppearShootCounter = 0;
                        itemDefine = EN_DEF.ITEM_SHOT;
                    } else {
                        itemDefine = null;
                    }
                    break;
                case 1:
                case 4:
                case 7:
                case 10:
                case 14:
                    itemDefine = EN_DEF.ITEM_SPEED;
                    break;
                case 2:
                case 5:
                case 8:
                case 11:
                case 15:
                    itemDefine = EN_DEF.ITEM_LIFE;
                    break;
                case 12:
                    if (++itemAppearFairyCounter > 5) {
                        itemAppearFairyCounter = 0;
                        itemDefine = EN_DEF.ITEM_FAIRY;
                    } else {
                        itemDefine = null;
                    }
                    break;
                case 16:
                    if (++itemAppearBombCounter > 5) {
                        itemAppearBombCounter = 0;
                        itemDefine = EN_DEF.ITEM_BOMB;
                    } else {
                        itemDefine = null;
                    }
                    break;
            }
            if (++itemAppearKind >= 17) itemAppearKind = 0;
            if (itemDefine !== null) {
                let tmpItem = EnemySprite(++uidCounter, { loop: 0, define: itemDefine, xPos: tmpEne.x, yPos: tmpEne.y }, 0).addChildTo(group6);
                enemyArray.push(tmpItem);
            }
        }
    }

}
// プレイヤー弾と敵との当たり判定
function checkPlayerBulletToEnemy() {
    if (player.status.isDead) return;

    let self = this;
    let deadPlBulletArray = [];
    let deadEnemyArray = [];

    for (let ii = 0; ii < self.plBulletArray.length; ii++) {
        let tmpBlt = self.plBulletArray[ii];
        // 画面から出た？
        if (
            (tmpBlt.x < 0 - 8) ||
            (tmpBlt.x > SCREEN_WIDTH + 8) ||
            (tmpBlt.y < 0 - 8) ||
            (tmpBlt.y > SCREEN_HEIGHT + 8)
        ) {
            deadPlBulletArray.push(tmpBlt);
            continue;
        }

        // 敵との当たり判定
        for (var jj = 0; jj < self.enemyArray.length; jj++) {
            if (tmpBlt.isDead) continue;

            var tmpEne = self.enemyArray[jj];
            if (!tmpEne.isReady) continue; // 入場前
            if (tmpEne.status.isDead) continue; // 既に死亡済み
            if (tmpEne.define.attr.isItem) continue; // アイテム

            for (let ii = 0; ii < tmpEne.define.colliData.length; ii++) {
                let colliData = tmpEne.define.colliData[ii];
                if (!colliData.attr.bullet) continue; // 弾との当たり判定用データではない
                if (chkCollisionCircleOfs(
                    tmpBlt.x, tmpBlt.y,
                    0, 0,
                    8,
                    tmpEne.x, tmpEne.y,
                    colliData.ofs.x, colliData.ofs.y,
                    colliData.radius
                ) == false) continue;   // 当たっていない

                tmpBlt.isDead = true;
                deadPlBulletArray.push(tmpBlt);

                // 敵処理
                if (--tmpEne.life >= 1) {
                    // 残ライフが1以上
                    continue;
                }
                tmpEne.status = EN_STATUS.DEAD_INIT;
                if (!tmpEne.define.attr.isBoss) {
                    // ボスはここでは処理しない
                    deadEnemyArray.push(tmpEne);
                }

                // アイテム出現
                itemAppear(tmpEne);

                // 爆破パターンのセット
                Explosion(tmpEne.x, tmpEne.y).addChildTo(group8);
                SoundManager.play("explosion");
                break;
            }
        }
    }

    // 削除対象のプレイヤー弾を削除
    for (var ii = 0; ii < deadPlBulletArray.length; ii++) {
        if (deadPlBulletArray[ii].parent == null) console.log("NULL!!");
        else deadPlBulletArray[ii].remove();
        self.plBulletArray.erase(deadPlBulletArray[ii]);
    }

    // 削除対象の敵を削除
    for (var ii = 0; ii < deadEnemyArray.length; ii++) {
        nowScore += deadEnemyArray[ii].define.pts;

        if (deadEnemyArray[ii].parent == null) console.log("NULL!!");
        else deadEnemyArray[ii].remove();
        self.enemyArray.erase(deadEnemyArray[ii]);
    }
}

function checkPlayerBombToEnemy() {
    if (player.status.isDead) return;

    let self = this;
    let deadPlBombArray = [];
    let deadEnemyArray = [];

    for (let ii = 0; ii < self.plBombArray.length; ii++) {
        let tmpBomb = self.plBombArray[ii];
        // 敵との当たり判定
        for (var jj = 0; jj < self.enemyArray.length; jj++) {
            if (tmpBomb.isDead) continue;
            var tmpEne = self.enemyArray[jj];

            if (!tmpEne.isReady) continue; // 入場前
            if (tmpEne.status.isDead) continue; // 既に死亡済み
            if (tmpEne.define.attr.isItem) continue; // アイテムにボムは効かない
            if (tmpEne.define.attr.isBoss) continue; // ボスにボムは効かない

            for (let ii = 0; ii < tmpEne.define.colliData.length; ii++) {
                let colliData = tmpEne.define.colliData[ii];
                if (!colliData.attr.bullet) continue; // 弾との当たり判定用データではない
                if (64 * tmpBomb.bombScale < 0.1) continue;  // あまりに小さいと何も無いのに敵が死んだように見えるので
                if (chkCollisionCircleOfs(
                    tmpBomb.x, tmpBomb.y,
                    0, 0,
                    64 * tmpBomb.bombScale,
                    tmpEne.x, tmpEne.y,
                    colliData.ofs.x, colliData.ofs.y,
                    colliData.radius
                ) == false) continue;   // 当たっていない

                tmpBomb.isDead = true;
                deadPlBombArray.push(tmpBomb);

                // 敵処理
                if (tmpEne.define.isBoss) {
                    tmpEne.life -= 1;
                } else {
                    tmpEne.life -= 100;
                }
                if (tmpEne.life >= 1) {
                    // 残ライフが1以上
                    continue;
                }
                tmpEne.status = EN_STATUS.DEAD_INIT;
                if (!tmpEne.define.attr.isBoss) {
                    // ボスはここでは処理しない
                    deadEnemyArray.push(tmpEne);
                }

                // アイテム出現
                itemAppear(tmpEne);

                // 爆破パターンのセット
                Explosion(tmpEne.x, tmpEne.y).addChildTo(group8);
                SoundManager.play("explosion");
                break;
            }
        }
    }

    // 削除対象のプレイヤー弾を削除
    for (var ii = 0; ii < deadPlBombArray.length; ii++) {
        if (deadPlBombArray[ii].parent == null) console.log("NULL!!");
        else deadPlBombArray[ii].remove();
        self.plBombArray.erase(deadPlBombArray[ii]);
    }

    // 削除対象の敵を削除
    for (var ii = 0; ii < deadEnemyArray.length; ii++) {
        nowScore += deadEnemyArray[ii].define.pts;

        if (deadEnemyArray[ii].parent == null) console.log("NULL!!");
        else deadEnemyArray[ii].remove();
        self.enemyArray.erase(deadEnemyArray[ii]);
    }
}

function checkPlayerBombToEnemyBullet() {
    if (player.status.isDead) return;

    let self = this;
    let deadPlBombArray = [];
    let deadEneBulletArray = [];

    for (let ii = 0; ii < self.plBombArray.length; ii++) {
        let tmpBomb = self.plBombArray[ii];
        // 敵弾との当たり判定
        for (var jj = 0; jj < self.enBulletArray.length; jj++) {
            if (tmpBomb.status.isDead) continue;
            var tmpEneBlt = self.enBulletArray[jj];

            // そもそも画面外では当たらない
            if (
                (tmpEneBlt.x < 0 - tmpEneBlt.define.sprSize.x / 2) ||
                (tmpEneBlt.x > SCREEN_WIDTH + tmpEneBlt.define.sprSize.x / 2) ||
                (tmpEneBlt.y < 0 - tmpEneBlt.define.sprSize.y / 2) ||
                (tmpEneBlt.y > SCREEN_HEIGHT + tmpEneBlt.define.sprSize.y / 2)
            ) continue;

            if (tmpEneBlt.status.isDead) continue; // 既に死亡済み

            if (chkCollisionCircleOfs(
                tmpBomb.x, tmpBomb.y,
                0, 0,
                8,
                tmpEneBlt.x, tmpEneBlt.y,
                0, 0,
                tmpEneBlt.define.radius
            ) == false) continue;   // 当たっていない
            tmpEneBlt.status = EN_STATUS.DEAD_INIT;
            deadEneBulletArray.push(tmpEneBlt);
        }
    }

    // 削除対象のボムを削除
    for (var ii = 0; ii < deadPlBombArray.length; ii++) {
        if (deadPlBombArray[ii].parent == null) console.log("NULL!!");
        else deadPlBombArray[ii].remove();
        self.plBombArray.erase(deadPlBombArray[ii]);
    }

    // 削除対象の敵を削除
    for (var ii = 0; ii < deadEneBulletArray.length; ii++) {
        if (deadEneBulletArray[ii].parent == null) console.log("NULL!!");
        else deadEneBulletArray[ii].remove();
        self.enBulletArray.erase(deadEneBulletArray[ii]);
    }
}

// 敵弾とプレイヤーとの当たり判定
function checkEnemyBulletToPlayer() {
    if (player.status.isDead) return;
    if (player.invincivleTimer > 0) return;

    let deadEneBulletArray = [];

    var self = this;
    for (let ii = 0; ii < self.enBulletArray.length; ii++) {
        let tmpBlt = self.enBulletArray[ii];
        // 画面から出た？
        let tmpRadius = tmpBlt.define.radius;
        if (
            (tmpBlt.x < 0 - tmpRadius) ||
            (tmpBlt.x > SCREEN_WIDTH + tmpRadius) ||
            (tmpBlt.y < 0 - tmpRadius) ||
            (tmpBlt.xy > SCREEN_HEIGHT + tmpRadius)
        ) {
            deadEneBulletArray.push(tmpBlt);
            continue;
        }

        // 判定
        if (player.invincivleTimer <= 0) {
            if (chkCollisionCircle(
                player.x, player.y,
                4,
                tmpBlt.x, tmpBlt.y,
                tmpBlt.define.radius)) {

                if (--player.lifeLeft >= 1) {
                    // 残ライフが1以上

                    player.lifeParts = 0;

                    player.shotLv -= 2;
                    if (player.shotLv < 0) {
                        player.shotLv = 0;
                    }

                    player.spd -= 0.4;
                    if (player.spd < 1.0) {
                        player.spd = 1.0;
                    }

                    player.invincivleTimer = 60;
                } else {
                    // 死亡
                    player.status = PL_STATUS.DEAD_INIT;
                }
                deadEneBulletArray.push(tmpBlt);
            }
        }
    }

    // 削除対象の敵弾を削除
    for (var ii = 0; ii < deadEneBulletArray.length; ii++) {
        if (deadEneBulletArray[ii].parent == null) console.log("NULL!!");
        else deadEneBulletArray[ii].remove();
        self.enBulletArray.erase(deadEneBulletArray[ii]);
    }
}

function clearDeadPlayerBombArrays() {
    var self = this;

    for (let ii = self.plBombArray.length - 1; ii >= 0; ii--) {
        let tmp = self.plBombArray[ii];
        if (!tmp.isDead) continue;
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.plBombArray.erase(tmp);
    }
}
function clearDeadEnemyArrays() {
    var self = this;

    for (let ii = self.enemyArray.length - 1; ii >= 0; ii--) {
        let tmp = self.enemyArray[ii];
        if (tmp.status !== EN_STATUS.DEAD) continue;
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.enemyArray.erase(tmp);
    }

}
function clearEnemyArrays() {
    var self = this;

    for (let ii = self.enemyArray.length - 1; ii >= 0; ii--) {
        let tmp = self.enemyArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.enemyArray.erase(tmp);
    }

    for (let ii = self.enBulletArray.length - 1; ii >= 0; ii--) {
        let tmp = self.enBulletArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.enBulletArray.erase(tmp);
    }
}

// 配列クリア
function clearArrays() {
    var self = this;

    for (let ii = self.plBulletArray.length - 1; ii >= 0; ii--) {
        let tmp = self.plBulletArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.plBulletArray.erase(tmp);
    }

    for (let ii = self.plBombArray.length - 1; ii >= 0; ii--) {
        let tmp = self.plBombtArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.plBombArray.erase(tmp);
    }

    for (let ii = self.enemyArray.length - 1; ii >= 0; ii--) {
        let tmp = self.enemyArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.enemyArray.erase(tmp);
    }

    for (let ii = self.enBulletArray.length - 1; ii >= 0; ii--) {
        let tmp = self.enBulletArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.enBulletArray.erase(tmp);
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

/**
 * 矩形当たり判定
 * https://yttm-work.jp/collision/collision_0005.html
 * @param {*} rect_a_x 
 * @param {*} rect_a_y 
 * @param {*} rect_a_w 
 * @param {*} rect_a_h 
 * @param {*} rect_b_x 
 * @param {*} rect_b_y 
 * @param {*} rect_b_w 
 * @param {*} rect_b_h 
 * @returns 
 */
function chkCollisionRect(rect_a_x, rect_a_y, rect_a_w, rect_a_h, rect_b_x, rect_b_y, rect_b_w, rect_b_h) {
    // X軸、Y軸の距離
    distance_x = abs(rect_a_x - rect_b_x);
    distance_y = abs(rect_a_y - rect_b_y);

    // ２つの矩形のX軸、Y軸のサイズの和を算出する
    size_sum_x = (rect_a_w + rect_b_w) / 2.0;
    size_sum_y = (rect_a_h + rect_b_h) / 2.0;

    // サイズの和と距離を比較する
    if ((distance_x < size_sum_x) && (distance_y < size_sum_y)) {
        return true;
    }
    return false;
}
function chkCollisionRectOfs(rect_a_x, rect_a_y, rect_a_x_ofs, rect_a_y_ofs, rect_a_w, rect_a_h, rect_b_x, rect_b_y, rect_b_x_ofs, rect_b_y_ofs, rect_b_w, rect_b_h) {
    return chkCollisionRect(rect_a_x + rect_a_x_ofs, rect_a_y + rect_a_y_ofs, rect_a_w, rect_a_h, rect_b_x + rect_b_x_ofs, rect_b_y + rect_b_y_ofs, rect_b_w, rect_b_h);
}

/**
 * 円当たり判定
 * @param {*} a_x 
 * @param {*} a_y 
 * @param {*} a_r 
 * @param {*} b_x 
 * @param {*} b_y 
 * @param {*} b_r 
 * @returns 
 */
function chkCollisionCircle(a_x, a_y, a_r, b_x, b_y, b_r) {
    const x = (a_x - b_x) ** 2
    const y = (a_y - b_y) ** 2
    const r = (a_r + b_r) ** 2
    if (x + y <= r) {
        return true;
    }
    return false;
}

/**
 * 円当たり判定
 * @param {*} a_x 
 * @param {*} a_y 
 * @param {*} a_x_ofs 
 * @param {*} a_y_ofs 
 * @param {*} a_r 
 * @param {*} b_x 
 * @param {*} b_y 
 * @param {*} b_x_ofs 
 * @param {*} b_y_ofs 
 * @param {*} b_r 
 * @returns 
 */
function chkCollisionCircleOfs(a_x, a_y, a_x_ofs, a_y_ofs, a_r, b_x, b_y, b_x_ofs, b_y_ofs, b_r) {
    return chkCollisionCircle(
        a_x + a_x_ofs,
        a_y + a_y_ofs,
        a_r,
        b_x + b_x_ofs,
        b_y + b_y_ofs,
        b_r
    );
}

/**
 * 
 * @param {*} rad 
 * @param {*} len 
 * @returns 
 */
function fromRadianToVec(rad, len) {
    let ret = Vector2(0, 0);
    len = len || 1;
    ret.x = Math.cos(rad) * len;
    ret.y = Math.sin(rad) * len;
    return ret;
}

/**
 * 右　＝0
 * 右下＝45
 * 下　＝90
 * 左下＝135
 * 左　＝180
 * 左上＝225
 * 上　＝270
 * 右上＝315
 * @param {*} deg 
 * @param {*} len 
 * @returns 
 */
function fromDegreeToVec(deg, len) {
    return fromRadianToVec(deg.toRadian(), len);
}

function fromVecToDegree(vec) {
    return fromVecToRadian(vec) * (180 / Math.PI);
}
function fromVecToRadian(vec) {
    var rad = Math.atan2(vec.y, vec.x);
    return rad;
}

function getCurrentIdx() {
    return nowLoopCount % 2;
}
function getNextIdx() {
    if (getCurrentIdx() === 0) return 1;
    else return 0;
}
function getStageStr(flag) {
    if (nowLoopCount === 0) {
        return "TYO";
    }
    if (nowLoopCount === 1) {
        return "OSK";
    }
    if (nowLoopCount === 2) {
        if (flag) return "OSK_VERY\nHARD";
        return "OSK_VERY HARD";
    }
    if ((nowLoopCount - 1) <= 9) {
        if (flag) return "OSK\nVERYx" + (nowLoopCount - 1) + " HARD";
        return "OSK VERYx" + (nowLoopCount - 1) + " HARD";
    }
    if (flag) return "OSK\nVERYx" + (nowLoopCount - 1) + "\nHARD";
    return "OSK VERYx" + (nowLoopCount - 1) + " HARD";
}
