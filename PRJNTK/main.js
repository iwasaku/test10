phina.globalize();
//console.log = function () { };  // ログを出す時にはコメントアウトする

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
let ntkGaugeLabel = null;
let nowNtkLeftLabel = null;

let tweetButton = null;
let restartButton = null;
let bombButton = null;
let bombButtonStatus = BB_STATUS.INIT;

let stageBG = [null, null];
let player = null;

var plBulletArray = [];
var plBombArray = [];
var enemyArray = [];
var enBulletArray = [];

let nowScore = 0;
let nowStageNum = 0;
let stageScrollFlag = [true, true];
let ctrlCounterFlag = true;
let ctrlCounter = 0;
let deadStatus = 0;

let uidCounter = 0;

let randomSeed = 3557;
let randomMode = Boolean(0);

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
        // 背景色
        this.backgroundColor = 'black';
        // ラベル
        Label({
            text: '',
            fontSize: 48,
            fill: 'yellow',
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    },
    update: function (app) {
        this.exit();
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
            text: 'PROJRCT\nN.T.K\n1',
            fontSize: 160,
            fontFamily: "misaki_gothic",
            fill: 'white',
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
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

        stageBG[0] = StageSprite("stg01", -SCREEN_HEIGHT * 1.5, 1600 * 5).addChildTo(group0);
        stageBG[1] = StageSprite("stg02", -SCREEN_HEIGHT * 2.5, 1600 * 5).addChildTo(group1);

        // ラベル設定
        nowScoreLabel = Label(
            {
                text: "0",
                fontSize: 80,
                //            fontWeight: "bold",
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

        ntkGaugeLabel = Label(
            {
                text: "",
                fontSize: 80,
                fontFamily: "misaki_gothic",
                align: "center",

                fill: "white",
                stroke: "blue",
                strokeWidth: 10,
                shadow: "black",
                shadowBlur: 10,
            }
        ).addChildTo(group9).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);

        bombButtonStatus = BB_STATUS.INIT;
        bombButton = prjButton("B").addChildTo(group9)
            .setPosition(SCREEN_CENTER_X + SCREEN_WIDTH / 4, SCREEN_CENTER_Y + SCREEN_HEIGHT / 4);
        bombButton.alpha = 0.5;
        // タッチ有効
        bombButton.setInteractive(true);
        // タッチ時の処理
        //        bombButton.onpush = function ();
        bombButton.onpointstart = function () {
            console.log("onpointstart");
            bombButtonStatus = BB_STATUS.START;
            bombButton.scaleX = 1.25;
            bombButton.scaleY = 1.25;
        }
        bombButton.onpointmove = function () {
        }
        bombButton.onpointend = function () {
            // bomb発射
            console.log("onpointend");
            bombButtonStatus = BB_STATUS.END;
            bombButton.scaleX = 1.0;
            bombButton.scaleY = 1.0;
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
                if ((this.y <= 0 + 64) || (this.y >= SCREEN_HEIGHT - 64)) {
                    this.y = oldY;
                }
            }
        };

        nowScore = 0;
        nowStageNum = 0;
        stageScrollFlag[0] = true;
        stageScrollFlag[1] = false;
        ctrlCounterFlag = true;
        ctrlCounter = 0;
        totalFrame = 0;
        uidCounter = 0;
        deadStatus = 0;
        tweetButton = null;
        restartButton = null;
    },
    update: function (app) {
        if (!player.status.isDead) {
            if (player.status.isStarted) {
                totalFrame++;
                totalSec = Math.floor(totalFrame / app.fps);
                // NTKゲージ管理
                ntkGaugeLabel.text = "";
                switch (bombButtonStatus) {
                    case BB_STATUS.WAIT:
                        break;
                    case BB_STATUS.START:
                        console.log("sw onpointstart");
                        if (player.bombLeft <= 0) {
                            bombButtonStatus = BB_STATUS.WAIT;
                            player.bombStatus = 0;
                            break;
                        }
                        if ((player.bombStatus != 0) && (player.bombStatus != 1)) break;
                        if (plBombArray.length > 0) break;
                        if (player.bombStatus === 0) {
                            player.bombStatus = 1;
                            player.bombLv = 0;
                            player.bombGauge = 0;
                        }
                        // Lvアップ
                        if (++player.bombGauge >= 100) {
                            if (++player.bombLv >= 9) {
                                player.bombLv = 9;
                                player.bombGauge = 100;
                            } else {
                                player.bombGauge = 0;
                            }
                        }
                        ntkGaugeLabel.text = "N.T.K. Lv." + (player.bombLv + 1) + "\n" + player.bombGauge + "%";
                        break;
                    case BB_STATUS.END:
                        bombButtonStatus = BB_STATUS.WAIT;
                        player.bombStatus = 0;
                        if (player.bombLeft <= 0) break;
                        let tmp = bombTable[player.bombLv];
                        for (let ii = 0; ii < tmp.num; ii++) {
                            let xPos = getRandomInt(SCREEN_WIDTH - 64) + 64;
                            let yPos = getRandomInt(SCREEN_HEIGHT - 64) + 64;
                            let bomb = PlBombSprite(++uidCounter, tmp.bomb, xPos, yPos).addChildTo(group8);
                            plBombArray.push(bomb);
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
                        switch (ctrl.cmd) {
                            case CMD.SET_ENEMY:
                                {
                                    // ctrl.param.loopで出現可能な周回かチェックする
                                    let enemy = EnemySprite(++uidCounter, ctrl.param).addChildTo(group6);
                                    enemyArray.push(enemy);
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
                                if (stageBG[ctrl.param.idx] != null) {
                                    stageBG[ctrl.param.idx].remove();
                                }
                                if (ctrl.param.idx == 0) {
                                    stageBG[ctrl.param.idx] = StageSprite(ctrl.param.sprName, ctrl.param.yPos, ctrl.param.ySize).addChildTo(group0);
                                } else {
                                    stageBG[ctrl.param.idx] = StageSprite(ctrl.param.sprName, ctrl.param.yPos, ctrl.param.ySize).addChildTo(group1);
                                }
                                break;
                            case CMD.START_SCROLL:
                                stageScrollFlag[ctrl.param.idx] = true;
                                break;
                            case CMD.STOP_SCROLL:
                                stageScrollFlag[ctrl.param.idx] = false;
                                break;
                            case CMD.SET_SCROLL_YPOS:
                                stageBG[ctrl.param.idx].y = ctrl.param.ypos;
                                break;
                            case CMD.FADE_IN:
                                break;
                            case CMD.FADE_NOW:
                                break;
                            case CMD.FADE_OUT:
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
            clearPlayerBombArrays();

            nowScoreLabel.text = nowScore; // カンスト：999999999

            let tmpLife = "";   // カンスト：♥♥♥♥♥♥♥♥♥♥
            for (let ii = 0; ii < player.lifeMax; ii++) {
                if (ii < player.lifeLeft) tmpLife += "♥";
                else tmpLife += "♡";
            }
            nowLifeLeftLabel.text = tmpLife;
        } else {
            // 死亡
            if (deadStatus === 0) {
                deadStatus = 1;
                bombButton.x = SCREEN_CENTER_X;
                bombButton.y = SCREEN_CENTER_Y;
                tweetButton = Button(
                    {
                        text: "TWEET",
                        fontSize: 80,
                        fontFamily: "misaki_gothic",
                        align: "center",
                        baseline: "middle",
                        width: 300,
                        height: 150,
                    }
                ).addChildTo(this).setPosition(SCREEN_CENTER_X - (SCREEN_CENTER_X / 2), SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2)).onpush = function () {
                    var twitterURL = phina.social.Twitter.createURL({
                        text: "PROJECT N.T.K. スコア: " + nowScore,
                        hashtags: ["ネムレス", "NEMLESSS"],
                        url: "https://iwasaku.github.io/test10/PRJNTK/",
                    });
                    window.open(twitterURL);
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
                    }
                ).addChildTo(this).setPosition(SCREEN_CENTER_X + (SCREEN_CENTER_X / 2), SCREEN_CENTER_Y + (SCREEN_CENTER_Y / 2)).onpush = function () {
                    that.exit();
                };

                bombButton.hide();
            }
        }
    }
});

phina.main(function () {
    var app = GameApp({
        startLabel: 'init',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
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

    app.domElement.addEventListener(event, (function () {
        return function f() {
            var context = phina.asset.Sound.getAudioContext();
            var buf = context.createBuffer(1, 1, 22050);
            var src = context.createBufferSource();
            src.buffer = buf;
            src.connect(context.destination);
            src.start(0);

            dom.removeEventListener(event, f, false)
        }
    }()), false);

    app.run();
});

/*
 * ピースクラス
 * 数字当て問題の選択肢。角丸Rectに数字を貼り付けたもの
 */
phina.define('prjButton', {
    superClass: 'RectangleShape',
    init: function (txt) {
        this.superInit({
            width: 96,
            height: 96,
            cornerRadius: 10,
            fill: 'red',
            stroke: 'white',
        });
        this.label = Label({
            text: txt + "",
            fontSize: 96 * 0.8,
            fontFamily: "misaki_gothic",
            fill: 'white',
        }).addChildTo(this);
        this.label.y += 8;  // 見た目の位置合わせ
    },
    setSize: function (width, height) {
        this.width = width;
        this.height = height;
    }
});

/*
 * Stge
 */
phina.define("StageSprite", {
    superClass: 'Sprite',

    init: function (sprname, ypos, ysize) {
        this.superInit(sprname);
        this.direct = '';
        this.zRot = 0;
        this.setPosition(SCREEN_CENTER_X, ypos);
        this.setScale(1, 1);
        this.setSize(900, ysize);

        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
    },

    update: function (app) {
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
        this.shotLv = 0;

        this.lifeLeft = 3;
        this.lifeMax = 3;
        this.invincivleTimer = 15;
    },

    update: function (app) {
        if (this.status === PL_STATUS.INIT) {
            this.status = PL_STATUS.START;
        };
        if (this.status === PL_STATUS.DEAD) {
            //            this.setAlpha(1.0);
            return;
        }
        if (--this.invincivleTimer < 0) this.invincivleTimer = 0;
        if (this.invincivleTimer % 2 === 0) {
            //            this.setAlpha(1.0);
            this.alpha = 1.0;
        } else {
            //            this.setAlpha(0.0);
            this.alpha = 0.0;
        }

        if (--this.shotIntvlTimer <= 0) {
            //            player.gotoAndPlay("shot");
            //            this.shotLv = -1;
            // lv.0
            if (this.shotLv >= 0) {
                let plBullet = PlBulletSprite(++uidCounter, this.x, this.y - 64, 0, -16).addChildTo(group8);
                plBulletArray.push(plBullet);
                this.shotIntvlTimer = 16;
            }
            // lv.1
            if (this.shotLv >= 1) {
                {
                    let plBullet = PlBulletSprite(++uidCounter, this.x + 32, this.y - 32, 0, -16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                {
                    let plBullet = PlBulletSprite(++uidCounter, this.x - 32, this.y - 32, 0, -16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                this.shotIntvlTimer = 14;
            }
            // lv.2
            if (this.shotLv >= 2) {
                {
                    let plBullet = PlBulletSprite(++uidCounter, this.x + 32, this.y - 32, +8, -16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                {
                    let plBullet = PlBulletSprite(++uidCounter, this.x - 32, this.y - 32, -8, -16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                this.shotIntvlTimer = 12;
            }
            // lv.3
            if (this.shotLv >= 3) {
                {
                    let plBullet = PlBulletSprite(++uidCounter, this.x + 32, this.y - 32, +16, 0).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                {
                    let plBullet = PlBulletSprite(++uidCounter, this.x - 32, this.y - 32, -16, 0).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                this.shotIntvlTimer = 10;
            }
            // lv.4
            if (this.shotLv >= 4) {
                let plBullet = PlBulletSprite(++uidCounter, this.x, this.y + 64, 0, +16).addChildTo(group8);
                plBulletArray.push(plBullet);
                this.shotIntvlTimer = 8;
            }
        }

    },
});

/*
 * Enemy
 */
phina.define("EnemySprite", {
    superClass: 'Sprite',

    init: function (uid, param) {
        this.uid = uid;
        this.define = param.ene;
        this.superInit(param.ene.sprName);
        this.setSize(param.ene.sprSize.x, param.ene.sprSize.y);
        this.setScale(1, 1);
        this.direct = '';
        this.xSpd = param.xSpd;
        this.ySpd = param.ySpd;
        this.zRot = 0;
        this.setPosition(param.xPos, param.yPos);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.status = EN_STATUS.INIT;
        this.collisionEnable = false;
        this.localCounter = 0;
        this.localStatus = 0;
        this.life = param.ene.life;
        this.invincivleTimer = 15;
        this.isReady = false;
    },

    update: function (app) {
        if (player.status.isDead) return;
        switch (this.define) {
            case EN_DEF.ENEMY01:
            case EN_DEF.ENEMY02:
                enemy01(this);
                break;

            case EN_DEF.BOSS01:
            case EN_DEF.BOSS02:
            case EN_DEF.BOSS03:
            case EN_DEF.BOSS04:
            case EN_DEF.BOSS05:
            case EN_DEF.BOSS06:
            case EN_DEF.BOSS07:
            case EN_DEF.BOSS08:
                boss01(this);
                break;

            case EN_DEF.ITEM_SHOT:
            case EN_DEF.ITEM_SPEED:
            case EN_DEF.ITEM_BOMB:
            case EN_DEF.ITEM_LIFE:
            case EN_DEF.ITEM_LIFE_MAX:
                enemy01(this);
                break;
            default:
        }
        if (this.status === EN_STATUS.START) {
            if (--this.invincivleTimer < 0) this.invincivleTimer = 0;
            this.x += this.xSpd;
            this.y += this.ySpd;
        }
    },
});

/**
 * 
 */
function enemy01(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
        // THRU
        case EN_STATUS.START:
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

function enemy02(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = true;
            tmpEne.xSpd = +8;
        // THRU
        case EN_STATUS.START:
            if (tmpEne.x < 0 + 8) {
                tmpEne.xSpd = +8;
            } else if (tmpEne.x > SCREEN_WIDTH - 8) {
                tmpEne.xSpd = -8;
            }
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
}

/**
 */
function boss01(tmpEne) {
    switch (tmpEne.status) {
        case EN_STATUS.INIT:
            tmpEne.localCounter = 0;
            tmpEne.localStatus = 0;
            tmpEne.ySpd = 8
            tmpEne.status = EN_STATUS.START;
            tmpEne.collisionEnable = false;
        // THRU
        case EN_STATUS.START:
            switch (tmpEne.localStatus) {
                case 0:
                    // 出現
                    if (tmpEne.y >= 256) {
                        tmpEne.localStatus = 1;
                        tmpEne.collisionEnable = true;
                    }
                    break;
                case 1:
                    // 停止
                    tmpEne.ySpd = 0
                    tmpEne.localStatus = 2;
                case 2:
                    // 弾を撃つ
                    let enBullet = EnBulletSprite(++uidCounter, BULLET_DEF.EN_B_24, tmpEne.x - 32, tmpEne.y - 32, -16, 0).addChildTo(group7);
                    enBulletArray.push(enBullet);
                    tmpEne.status = EN_STATUS.DEAD_INIT;
                    break;
                default:
            }
            tmpEne.localCounter++;
            break;
        case EN_STATUS.DEAD_INIT:
            tmpEne.status = EN_STATUS.DEAD;
            tmpEne.localCounter = 0;
            nowStageNum++;
            // 次の面へ
            ctrlCounter = 0;
            ctrlCounterFlag = true;
        // THRU
        case EN_STATUS.DEAD:
            break;
    }
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
        this.xSpd = xSpd;
        this.ySpd = ySpd;
        this.zRot = 0;
        this.setPosition(xPos, yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.isDead = false;
    },

    update: function (app) {
        this.zRot += 20;
        this.rotation = this.zRot;
        this.x += this.xSpd;
        this.y += this.ySpd;
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
        this.xSpd = xSpd;
        this.ySpd = ySpd;
        this.zRot = 0;
        this.setPosition(xPos, yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.status = EN_STATUS.INIT;
    },

    update: function (app) {
        this.zRot += 20;
        this.rotation = this.zRot;
        this.x += this.xSpd;
        this.y += this.ySpd;
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

        //        this.blendMode = 'lighter';

        this.x = xpos;
        this.y = ypos;

        // 参照用
        this.anim = anim;
    },
    // 毎フレーム処理
    update: function () {
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
        if (tmpEne.invincivleTimer > 0) continue; // 無敵中

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

            if (tmpEne.define.attr === EN_ATTR.ENEMY) {
                // 当たったのが敵の場合

                // プレイヤー処理
                if (--player.lifeLeft >= 1) {
                    // 残ライフが1以上
                    player.invincivleTimer = 60;
                } else {
                    // 死亡
                    player.status = PL_STATUS.DEAD_INIT;
                }

                // 敵処理
                if (--tmpEne.life >= 1) {
                    // 残ライフが1以上
                    tmpEne.invincivleTimer = 15;
                } else {
                    tmpEne.status = EN_STATUS.DEAD;
                    deadEnemyArray.push(tmpEne);
                    // 爆破パターンのセット
                    Explosion(tmpEne.x, tmpEne.y).addChildTo(group8);
                    SoundManager.play("explosion");
                }
            } else {
                // 当たったのがアイテムの場合
                switch (tmpEne.define) {
                    case EN_DEF.ITEM_SHOT:
                        if (++player.shotLv >= 4) {
                            player.shotLv = 4;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_SPEED:
                        player.spd += 0.2;
                        if (player.spd >= 2.0) {
                            player.spd = 2.0;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_BOMB:
                        if (++player.bombLeft >= 10) {
                            player.bombLeft = 10;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_LIFE_MAX:
                        if (++player.lifeMax >= 10) {
                            player.lifeMax = 10;
                            nowScore += 1000;
                        }
                        player.lifeLeft = player.lifeMax;
                        break;
                    case EN_DEF.ITEM_LIFE:
                        if (++player.lifeLeft >= player.lifeMax) {
                            player.lifeLeft = player.lifeMax;
                            nowScore += 1000;
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
                tmpEne.status = EN_STATUS.DEAD;
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
            (tmpBlt.xy > SCREEN_HEIGHT + 8)
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
            if (tmpEne.invincivleTimer > 0) continue; // 無敵中
            if (tmpEne.define.attr === EN_ATTR.ITEM) continue; // アイテム

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
                    tmpEne.invincivleTimer = 15;
                    continue;
                }
                tmpEne.status = EN_STATUS.DEAD;
                deadEnemyArray.push(tmpEne);
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
        let tmpBlt = self.plBombArray[ii];
        // 敵との当たり判定
        for (var jj = 0; jj < self.enemyArray.length; jj++) {
            if (tmpBlt.isDead) continue;
            var tmpEne = self.enemyArray[jj];

            if (!tmpEne.isReady) continue; // 入場前
            if (tmpEne.status.isDead) continue; // 既に死亡済み
            if (tmpEne.invincivleTimer > 0) continue; // 無敵中
            if (tmpEne.define.attr === EN_ATTR.ITEM) continue; // アイテム

            for (let ii = 0; ii < tmpEne.define.colliData.length; ii++) {
                let colliData = tmpEne.define.colliData[ii];
                if (!colliData.attr.bullet) continue; // 弾との当たり判定用データではない
                if (64 * tmpBlt.bombScale < 0.1) continue;  // あまりに小さいと何も無いのに敵が死んだように見えるので
                if (chkCollisionCircleOfs(
                    tmpBlt.x, tmpBlt.y,
                    0, 0,
                    64 * tmpBlt.bombScale,
                    tmpEne.x, tmpEne.y,
                    colliData.ofs.x, colliData.ofs.y,
                    colliData.radius
                ) == false) continue;   // 当たっていない

                tmpBlt.isDead = true;
                deadPlBombArray.push(tmpBlt);

                // 爆発

                // 敵処理
                if (--tmpEne.life >= 1) {
                    // 残ライフが1以上
                    tmpEne.invincivleTimer = 15;
                    continue;
                }
                tmpEne.status = EN_STATUS.DEAD;
                deadEnemyArray.push(tmpEne);
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
        let tmpBlt = self.plBombArray[ii];
        // 敵弾との当たり判定
        for (var jj = 0; jj < self.enBulletArray.length; jj++) {
            if (tmpBlt.isDead) continue;
            var tmpEne = self.enBulletArray[jj];

            // そもそも画面外では当たらない
            if (
                (tmpEne.x < 0 - tmpEne.define.sprSize.x / 2) ||
                (tmpEne.x > SCREEN_WIDTH + tmpEne.define.sprSize.x / 2) ||
                (tmpEne.y < 0 - tmpEne.define.sprSize.y / 2) ||
                (tmpEne.y > SCREEN_HEIGHT + tmpEne.define.sprSize.y / 2)
            ) continue;

            if (tmpEne.status.isDead) continue; // 既に死亡済み

            if (chkCollisionCircleOfs(
                tmpBlt.x, tmpBlt.y,
                0, 0,
                8,
                tmpEne.x, tmpEne.y,
                0, 0,
                colliData.radius
            ) == false) continue;   // 当たっていない
            tmpEne.status = EN_STATUS.DEAD;
            deadEneBulletArray.push(tmpEne);
        }
    }

    // 削除対象のプレイヤー弾を削除
    for (var ii = 0; ii < deadPlBombArray.length; ii++) {
        if (deadPlBombArray[ii].parent == null) console.log("NULL!!");
        else deadPlBombArray[ii].remove();
        self.plBombArray.erase(deadPlBombArray[ii]);
    }

    // 削除対象の敵を削除
    for (var ii = 0; ii < deadEneBulletArray.length; ii++) {

        if (deadEnemyArray[ii].parent == null) console.log("NULL!!");
        else deadEnemyArray[ii].remove();
        self.enemyArray.erase(deadEnemyArray[ii]);
    }
}

// 敵弾とプレイヤーとの当たり判定
function checkEnemyBulletToPlayer() {
    if (player.status.isDead) return;
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

        let tmpEneBullet = self.enBulletArray[ii];
        // 判定
        if (chkCollisionCircle(
            player.xPos, player.yPos,
            4,
            tmpEneBullet.xPos, tmpEneBullet.yPos,
            tmpEneBullet.define.radius)) {

            player.status = PL_STATUS.DEAD;
            break;
        }
    }

    // 削除対象の敵弾を削除
    for (var ii = 0; ii < deadEneBulletArray.length; ii++) {
        if (deadEneBulletArray[ii].parent == null) console.log("NULL!!");
        else deadEneBulletArray[ii].remove();
        self.enBulletArray.erase(deadEneBulletArray[ii]);
    }
}

function clearPlayerBombArrays() {
    var self = this;

    for (let ii = self.plBombArray.length - 1; ii >= 0; ii--) {
        let tmp = self.plBombArray[ii];
        if (!tmp.isDead) continue;
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.plBombArray.erase(tmp);
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

// 矩形当たり判定
// https://yttm-work.jp/collision/collision_0005.html
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

// 円当たり判定
function chkCollisionCircle(a_x, a_y, a_r, b_x, b_y, b_r) {
    const x = (a_x - b_x) ** 2
    const y = (a_y - b_y) ** 2
    const r = (a_r + b_r) ** 2
    if (x + y <= r) {
        return true;
    }
    return false;
}
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
