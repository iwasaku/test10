//console.log = function () { };  // ログを出す時にはコメントアウトする

const SCREEN_WIDTH = 900;             // スクリーン幅
const SCREEN_HEIGHT = 1600;                 // スクリーン高さ
/*
1画面約13.3秒＝800フレーム
1600/800＝2dot/フレーム
1ステージ60秒＝4+1画面＝2436*(4+1)

※道中4画面、ボス1画面
背景画像90x160x5とか？
*/
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const FPS = 60; // 60フレ
const LIFE_MAX = 10;    // パワーアップ時間
const INVINCIBLE_TIME = 1 * FPS;    // パワーアップ時間

const FONT_FAMILY = "'misaki_gothic','Meiryo',sans-serif";
const ASSETS = {
    "player": "./resource/squid.png",

    "enemy01": "./resource/enemy/ice.png",

    "boss01": "./resource/boss/boss.png",
    "boss02": "./resource/boss/boss.png",
    "boss03": "./resource/boss/boss.png",
    "boss04": "./resource/boss/boss.png",
    "boss05": "./resource/boss/boss.png",
    "boss06": "./resource/boss/boss.png",
    "boss07": "./resource/boss/boss.png",
    "boss08": "./resource/boss/boss.png",

    "pl_blt": "./resource/bullet/pb_o_16.png",

    "en_blt_r_16": "./resource/bullet/eb_r_16.png",
    "en_blt_o_16": "./resource/bullet/eb_o_16.png",
    "en_blt_y_16": "./resource/bullet/eb_y_16.png",
    "en_blt_g_16": "./resource/bullet/eb_g_16.png",
    "en_blt_b_16": "./resource/bullet/eb_b_16.png",
    "en_blt_p_16": "./resource/bullet/eb_p_16.png",
    "en_blt_m_16": "./resource/bullet/eb_m_16.png",

    "en_blt_r_24": "./resource/bullet/eb_r_24.png",
    "en_blt_o_24": "./resource/bullet/eb_o_24.png",
    "en_blt_y_24": "./resource/bullet/eb_y_24.png",
    "en_blt_g_24": "./resource/bullet/eb_g_24.png",
    "en_blt_b_24": "./resource/bullet/eb_b_24.png",
    "en_blt_p_24": "./resource/bullet/eb_p_24.png",
    "en_blt_m_24": "./resource/bullet/eb_m_24.png",

    "en_blt_r_48": "./resource/bullet/eb_r_48.png",
    "en_blt_o_48": "./resource/bullet/eb_o_48.png",
    "en_blt_y_48": "./resource/bullet/eb_y_48.png",
    "en_blt_g_48": "./resource/bullet/eb_g_48.png",
    "en_blt_b_48": "./resource/bullet/eb_b_48.png",
    "en_blt_p_48": "./resource/bullet/eb_p_48.png",
    "en_blt_m_48": "./resource/bullet/eb_m_48.png",

    "bomb01": "./resource/bomb/NTK_01.png",
    "bomb02": "./resource/bomb/NTK_02.png",
    "bomb03": "./resource/bomb/NTK_03.png",
    "bomb04": "./resource/bomb/NTK_04.png",
    "bomb05": "./resource/bomb/NTK_05.png",
    "bomb06": "./resource/bomb/NTK_06.png",
    "bomb07": "./resource/bomb/NTK_07.png",
    "bomb08": "./resource/bomb/NTK_08.png",
    "bomb09": "./resource/bomb/NTK_09.png",
    "bomb10": "./resource/bomb/NTK_10.png",

    "stg01": "./resource/stage/stg1.png?1",
    "stg02": "./resource/stage/stg2.png?1",
    "stg03": "./resource/stage/stg1.png?1",
    "stg04": "./resource/stage/stg2.png?1",
    "stg05": "./resource/stage/stg1.png?1",
    "stg06": "./resource/stage/stg2.png?1",
    "stg07": "./resource/stage/stg1.png?1",
    "stg08": "./resource/stage/stg2.png?1",
};
const fallSE = new Howl({
    src: 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/fall.mp3?20200708'
});
const coinSE = new Howl({
    src: 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/coin05.mp3'
});
const explosion0SE = new Howl({
    src: 'https://iwasaku.github.io/test8/COKS/resource/explosion_0.mp3'
});
const shotSE = new Howl({
    src: 'https://iwasaku.github.io/test10/NTK/resource/se/laser2.mp3'
});

// 定義
const PL_STATUS = defineEnum({
    INIT: {
        value: 0,
        isStarted: Boolean(0),      // スタートしてない
        isDead: Boolean(0),         // 死んでない
        isAccKey: Boolean(0),       // キー入力を受け付けない
        isCollision: Boolean(0),    // 当たり判定無し
        string: 'init'
    },
    START: {
        value: 1,
        isStarted: Boolean(1),      // スタート済み
        isDead: Boolean(0),         // 死んでない
        isAccKey: Boolean(1),       // キー入力を受け付ける
        isCollision: Boolean(1),    // 無敵モードOFF
        string: 'start'
    },
    INVINCIBLE: {
        value: 2,
        isStarted: Boolean(1),      // スタート済み
        isDead: Boolean(0),         // 死んでない
        isAccKey: Boolean(1),       // キー入力を受け付ける
        isCollision: Boolean(0),    // 当たり判定無し
        string: 'invincble'
    },
    DEAD_INIT: {
        value: 3,
        isStarted: Boolean(0),      // スタートしてない
        isDead: Boolean(1),         // 死んだ
        isAccKey: Boolean(0),       // キー入力を受け付けない
        isCollision: Boolean(0),    // 当たり判定無し
        string: 'dead_init'
    },
    DEAD: {
        value: 4,
        isStarted: Boolean(0),      // スタートしてない
        isDead: Boolean(1),         // 死んだ
        isAccKey: Boolean(0),       // キー入力を受け付けない
        isCollision: Boolean(0),    // 当たり判定無し
        string: 'dead'
    },
});

const EN_STATUS = defineEnum({
    INIT: {
        value: 0,
        isStarted: Boolean(0),      // スタートしてない
        isDead: Boolean(0),         // 死んでない
        isCollision: Boolean(0),    // 当たり判定無し
        string: 'init'
    },
    START: {
        value: 1,
        isStarted: Boolean(1),      // スタート済み
        isDead: Boolean(0),         // 死んでない
        isCollision: Boolean(1),    // 当たり判定有り
        string: 'start'
    },
    DEAD_INIT: {
        value: 3,
        isStarted: Boolean(0),      // スタートしてない
        isDead: Boolean(1),         // 死んだ
        isCollision: Boolean(0),    // 当たり判定無し
        string: 'dead_init'
    },
    DEAD: {
        value: 4,
        isStarted: Boolean(0),      // スタートしてない
        isDead: Boolean(1),         // 死んだ
        isCollision: Boolean(0),    // 当たり判定無し
        string: 'dead'
    },
});

const EN_ATTR = defineEnum({
    ENEMY: {
        value: 0,
    },
    ITEM: {
        value: 1,
    },
});
const COLLI_ATTR = defineEnum({
    BULLET: {
        bullet: Boolean(1), // 弾に当たる
        body: Boolean(0),   // 機体に当たらない
    },
    BODY: {
        bullet: Boolean(0), // 弾に当たらない
        body: Boolean(1),   // 機体に当たる
    },
    BOTH: {
        bullet: Boolean(1), // 弾に当たる
        body: Boolean(1),   // 機体に当たる
    },
});

const EN_DEF = defineEnum({
    ENEMY01: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 1,
        pts: 10,
    },
    ENEMY02: {
        sprName: "enemy01",
        sprSize: { x: 256, y: 256 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 2,
        pts: 20,
    },

    BOSS01: {
        sprName: "boss01",
        sprSize: { x: 256, y: 256 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 100,
        pts: 20000,
    },
    BOSS02: {
        sprName: "boss02",
        sprSize: { x: 256, y: 256 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 100,
        pts: 20000,
    },
    BOSS03: {
        sprName: "boss03",
        sprSize: { x: 384, y: 384 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 100,
        pts: 20000,
    },
    BOSS04: {
        sprName: "boss04",
        sprSize: { x: 384, y: 384 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 100,
        pts: 20000,
    },
    BOSS05: {
        sprName: "boss05",
        sprSize: { x: 512, y: 512 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 100,
        pts: 20000,
    },
    BOSS06: {
        sprName: "boss06",
        sprSize: { x: 512, y: 512 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 100,
        pts: 20000,
    },
    BOSS07: {
        sprName: "boss07",
        sprSize: { x: 640, y: 640 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 100,
        pts: 20000,
    },
    BOSS08: {
        sprName: "boss08",
        sprSize: { x: 768, y: 768 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        life: 100,
        pts: 20000,
    },

    ITEM_SHOT: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BODY, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        life: 0,
        pts: 0,
    },
    ITEM_SPEED: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BODY, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        life: 0,
        pts: 0,
    },
    ITEM_BOMB: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BODY, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        life: 0,
        pts: 0,
    },
    ITEM_LIFE: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BODY, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        life: 0,
        pts: 0,
    },
    ITEM_LIFE_MAX: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BODY, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        life: 0,
        pts: 0,
    },
    ITEM_FAIRY: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BODY, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        life: 0,
        pts: 0,
    },
});

const BULLET_DEF = defineEnum({
    PL_O_16: {
        sprName: "pl_blt",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 99,
    },

    EN_R_16: {
        sprName: "en_blt_r_16",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 1,
    },
    EN_O_16: {
        sprName: "en_blt_o_16",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 1,
    },
    EN_Y_16: {
        sprName: "en_blt_y_16",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 1,
    },
    EN_G_16: {
        sprName: "en_blt_g_16",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 1,
    },
    EN_B_16: {
        sprName: "en_blt_b_16",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 1,
    },
    EN_P_16: {
        sprName: "en_blt_p_16",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 1,
    },
    EN_M_16: {
        sprName: "en_blt_m_16",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 1,
    },

    EN_R_24: {
        sprName: "en_blt_r_24",
        sprSize: { x: 24, y: 24 },
        radius: 11,
        lv: 3,
    },
    EN_O_24: {
        sprName: "en_blt_o_24",
        sprSize: { x: 24, y: 24 },
        radius: 11,
        lv: 3,
    },
    EN_Y_24: {
        sprName: "en_blt_y_24",
        sprSize: { x: 24, y: 24 },
        radius: 11,
        lv: 3,
    },
    EN_G_24: {
        sprName: "en_blt_g_24",
        sprSize: { x: 24, y: 24 },
        radius: 11,
        lv: 3,
    },
    EN_B_24: {
        sprName: "en_blt_b_24",
        sprSize: { x: 24, y: 24 },
        radius: 11,
        lv: 3,
    },
    EN_P_24: {
        sprName: "en_blt_p_24",
        sprSize: { x: 24, y: 24 },
        radius: 11,
        lv: 3,
    },
    EN_M_24: {
        sprName: "en_blt_m_24",
        sprSize: { x: 24, y: 24 },
        radius: 11,
        lv: 3,
    },

    EN_R_48: {
        sprName: "en_blt_r_48",
        sprSize: { x: 48, y: 48 },
        radius: 23,
        lv: 5,
    },
    EN_O_48: {
        sprName: "en_blt_o_48",
        sprSize: { x: 48, y: 48 },
        radius: 23,
        lv: 5,
    },
    EN_Y_48: {
        sprName: "en_blt_y_48",
        sprSize: { x: 48, y: 48 },
        radius: 23,
        lv: 5,
    },
    EN_G_48: {
        sprName: "en_blt_g_48",
        sprSize: { x: 48, y: 48 },
        radius: 23,
        lv: 5,
    },
    EN_B_48: {
        sprName: "en_blt_b_48",
        sprSize: { x: 48, y: 48 },
        radius: 23,
        lv: 5,
    },
    EN_P_48: {
        sprName: "en_blt_p_48",
        sprSize: { x: 48, y: 48 },
        radius: 23,
        lv: 5,
    },
    EN_M_48: {
        sprName: "en_blt_m_48",
        sprSize: { x: 48, y: 48 },
        radius: 23,
        lv: 5,
    },
});

const BOMB_DEF = defineEnum({
    BOMB_LV_0: {
        sprName: "bomb01",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 1,
    },
    BOMB_LV_1: {
        sprName: "bomb02",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_2: {
        sprName: "bomb03",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_3: {
        sprName: "bomb04",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_4: {
        sprName: "bomb05",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_5: {
        sprName: "bomb06",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_6: {
        sprName: "bomb07",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_7: {
        sprName: "bomb08",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_8: {
        sprName: "bomb09",
        sprSize: { x: 128, y: 128 },
        radius: 128,
        lv: 0,
    },
    BOMB_LV_9: {
        sprName: "bomb10",
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

const DIR_KEY_DEF = defineEnum({
    UP: {
        addX: 0,
        addY: -1,
    },
    UP_LEFT: {
        addX: -1,
        addY: -1,
    },
    LEFT: {
        addX: -1,
        addY: 0,
    },
    DOWN_LEFT: {
        addX: -1,
        addY: 1,
    },
    DOWN: {
        addX: 0,
        addY: 1,
    },
    DOWN_RIGHT: {
        addX: 1,
        addY: 1,
    },
    RIGHT: {
        addX: 1,
        addY: 0,
    },
    UP_RIGHT: {
        addX: 1,
        addY: -1,
    },
});


const CMD = defineEnum({
    SET_ENEMY: {
        // 敵の配置
        value: 0,
    },
    STOP_CTRL_COUNTER: {
        // コントロールカウンターを止める
        value: 0,
    },
    SET_CTRL_COUNTER: {
        // コントロールカウンターの値をセットする
        value: 0,
    },
    START_SCROLL: {
        // ボス前でスクロールを止める
        value: 0,
    },
    STOP_SCROLL: {
        // ボス前でスクロールを止める
        value: 0,
    },
    SET_SCROLL_YPOS: {
        // スクロールY座標をセット
        value: 0,
    },
    SET_SCROLL_DATA: {
        // スクロールデータを設定する
        value: 0,
    },
    FADE_IN: {
        // フェード・イン
        value: 0,
    },
    FADE_NOW: {
        // フェード中
        value: 0,
    },
    FADE_OUT: {
        // フェード・アウト
        value: 0,
    },
    DISP_STAGE_NUM: {
        // ステージ数表示
        value: 0,
    },
});

// 管理テーブル
// トランジション用に先頭へ１面追加する場合はSET_SCROLL_DATAとSTOP_SCROLLを調整する
// 周回するときのBG処理の関係上ステージ数は偶数にする
const ctrlTable = [
    // STG1
    // 地上
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 1" } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },

        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 0, yPos: -64, xSpd: 0, ySpd: 8 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 1, yPos: -64, xSpd: 0, ySpd: 8 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 2, yPos: -64, xSpd: 0, ySpd: 8 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 3, yPos: -64, xSpd: 0, ySpd: 8 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 4, yPos: -64, xSpd: 0, ySpd: 8 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 5, yPos: -64, xSpd: 0, ySpd: 8 } },

        //        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        //        { count: 1260, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        //        { count: 1860, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        //        { count: 2460, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        //        { count: 3060, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },

        { count: 800 * 4, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },

        { count: 3660, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.BOSS01, xPos: SCREEN_CENTER_X, yPos: -128, xSpd: 0, ySpd: 8 } },

        // 万が一オーバーフローするとめんどくさいので
        { count: 3661, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG2
    // 地上
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 2" } },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg03", ypos: -SCREEN_HEIGHT * 2.5 } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 1260, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 1860, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 2460, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 3060, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 3660, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },

        // ボス前
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        { count: 4260, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.BOSS02, xPos: 0, yPos: 0 } },

        // 無限に雑魚を出現させる
        { count: 4260 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 0, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 4260 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 1, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 4260 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 2, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 4260 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 3, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 4260 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 4, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 4260 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 128 + 128 * 5, yPos: -64, xSpd: 0, ySpd: 8 } },

        { count: 4260 + 60 * 2, cmd: CMD.SET_CTRL_COUNTER, param: { cnt: 4260 + 59 } },
    ],
    // STG3
    // 上空
    // 地上→上空へのトランジション用に先頭へ１面追加する？
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 3" } },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },

        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
    ],
    // STG4
    // 宇宙
    // 上空→宇宙へのトランジション用に先頭へ１面追加する？
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 4" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg04", ypos: -SCREEN_HEIGHT * 2.5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
    ],
    // STG5
    // 亜空間
    // 宇宙→亜空間へのトランジション用に先頭へ１面追加する？
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 5" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg05", ypos: -SCREEN_HEIGHT * 2.5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
    ],
    // STG6
    // 宇宙
    // 亜空間→宇宙へのトランジション用に先頭へ１面追加する？
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 6" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg06", ypos: -SCREEN_HEIGHT * 2.5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
    ],
    // STG7
    // 基地
    // 宇宙→基地へのトランジション用に先頭へ１面追加する？
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 7" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg07", ypos: -SCREEN_HEIGHT * 2.5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
    ],
    // STG8
    // 基地
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 8" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg08", ypos: -SCREEN_HEIGHT * 2.5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
    ],
];

//
class CharaStatus {
    constructor() {
        this.lv = 1;
        this.gavasss = 0;
    }
    initPlayer() {
    }
}

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

let stageBG = [null, null];
let player = null;
var plBulletArray = [];
var plBombArray = [];
var enemyArray = [];
var enBulletArray = [];
let nowScore = 0;
let bombLeft = 1;
let bombStatus = 0;
let bombLv = 0;
let bombGauge = 0;
let shotIntvlTimer = 0;
let shotLv = 0;
let nowStageNum = 0;
let stageScrollFlag = [true, true];
let ctrlCounterFlag = true;
let ctrlCounter = 0;
var uidCounter = 0;


let totalFrame = 0;
let totalSec = 0;
let fitWindowTimer = 0;

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
                    type: "Label", name: "logoLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fillStyle: "#888",
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "UNOFFICIAL GAME",
                    align: "center",
                },
            ]
        });
        this.localTimer = 0;
    },

    update: function (app) {
        // 時間が来たらタイトルへ
        //if (++this.localTimer >= 5 * app.fps)
        this.app.replaceScene(TitleScene());
    }
});

/*
 * タイトル
 */
tm.define("TitleScene", {
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
                    text: "N.T.K.",
                    align: "center",
                },
                {
                    type: "FlatButton", name: "startButton",
                    init: [
                        {
                            text: "START",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 512,
                            height: 160,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y + 320,
                },
            ]
        });
        this.localTimer = 0;

        var self = this;
        this.startButton.onpointingstart = function () {
            self.app.replaceScene(GameScene());
        };
    },

    update: function (app) {
        app.background = "rgba(0, 0, 0, 1.0)"; // 背景色
    }
});

/*
 * ゲーム
 */
tm.define("GameScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        if (!randomMode) randomSeed = 3557;

        group0 = tm.display.CanvasElement().addChildTo(this);   // BG
        group1 = tm.display.CanvasElement().addChildTo(this);   // BG
        group2 = tm.display.CanvasElement().addChildTo(this);   // フェード
        group3 = tm.display.CanvasElement().addChildTo(this);   // 雲
        group4 = tm.display.CanvasElement().addChildTo(this);   // boss, enemy, item
        group5 = tm.display.CanvasElement().addChildTo(this);   // bomb
        group6 = tm.display.CanvasElement().addChildTo(this);   // player
        group7 = tm.display.CanvasElement().addChildTo(this);   // en_bullet
        group8 = tm.display.CanvasElement().addChildTo(this);   // pl_bullet
        group9 = tm.display.CanvasElement().addChildTo(this);   // ステータス（score, left, bomb）

        clearArrays();
        player = new PlayerSprite().addChildTo(group6);

        stageBG[0] = new StageSprite("stg01", -SCREEN_HEIGHT * 1.5).addChildTo(group0);
        stageBG[1] = new StageSprite("stg02", -SCREEN_HEIGHT * 2.5).addChildTo(group1);

        this.fromJSON({
            children: [
                {
                    type: "Label", name: "nowScoreLabel",
                    x: SCREEN_WIDTH - 16,
                    y: 60,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 80,
                    fontFamily: FONT_FAMILY,
                    text: "0",
                    align: "right",
                },
                {
                    type: "Label", name: "ntkGaugeLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 80,
                    fontFamily: FONT_FAMILY,
                    text: "",
                    align: "center",
                },
                {
                    type: "Label", name: "nowLifeLeftLabel",
                    x: 0 + 16,
                    y: 60,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 40,
                    fontFamily: FONT_FAMILY,
                    text: "♥♥♥♥♥♥♥♥♥♥",
                    align: "left",
                },
                {
                    type: "Label", name: "nowNtkLeftLabel",
                    x: SCREEN_WIDTH - 16,
                    y: SCREEN_HEIGHT - 32,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 80,
                    fontFamily: FONT_FAMILY,
                    text: "BBBBBBBBBB",
                    align: "right",
                },
                {
                    type: "FlatButton", name: "tweetButton",
                    init: [
                        {
                            text: "TWEET",
                            fontFamily: FONT_FAMILY,
                            fontSize: 32,
                            bgColor: "hsl(240, 80%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 160,
                    y: 580,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "restartButton",
                    init: [
                        {
                            text: "RESTART",
                            fontFamily: FONT_FAMILY,
                            fontSize: 32,
                            cornerRadius: 8,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X + 160,
                    y: 580,
                    alpha: 0.0,
                },

                {
                    type: "FlatButton", name: "keyUp",
                    init: [
                        {
                            text: "↑",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 216,
                    y: SCREEN_CENTER_Y + 700 - 96 - 96,
                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "keyUpLeft",
                    init: [
                        {
                            text: "",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 216 - 96,
                    y: SCREEN_CENTER_Y + 700 - 96 - 96,

                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "keyLeft",
                    init: [
                        {
                            text: "←",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 216 - 96,
                    y: SCREEN_CENTER_Y + 700 - 96,
                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "keyDownLeft",
                    init: [
                        {
                            text: "",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 216 - 96,
                    y: SCREEN_CENTER_Y + 700,
                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "keyDown",
                    init: [
                        {
                            text: "↓",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 216,
                    y: SCREEN_CENTER_Y + 700,
                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "keyDownRight",
                    init: [
                        {
                            text: "",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 216 + 96,
                    y: SCREEN_CENTER_Y + 700,
                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "keyRight",
                    init: [
                        {
                            text: "→",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 216 + 96,
                    y: SCREEN_CENTER_Y + 700 - 96,
                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "keyUpRight",
                    init: [
                        {
                            text: "",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 216 + 96,
                    y: SCREEN_CENTER_Y + 700 - 96 - 96,
                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "buttonA",
                    init: [
                        {
                            text: "A",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X + 200,
                    y: SCREEN_CENTER_Y + 600,
                    alpha: 0.25,
                },
                {
                    type: "FlatButton", name: "buttonB",
                    init: [
                        {
                            text: "B",
                            fontFamily: FONT_FAMILY,
                            fontSize: 72,
                            width: 96,
                            height: 96,
                            bgColor: "hsl(0, 100%, 50%)",
                        }
                    ],
                    x: SCREEN_CENTER_X + 350,
                    y: SCREEN_CENTER_Y + 600,
                    alpha: 0.25,
                },
            ]
        });

        //        this.bombLeftSprite = tm.display.Sprite("pl_bomb").addChildTo(group7);
        //        this.bombLeftSprite.setPosition(SCREEN_WIDTH - 128, 80);

        this.tweetButton.sleep();
        this.restartButton.sleep();

        var self = this;
        this.restartButton.onpointingstart = function () {
            self.app.replaceScene(GameScene());
        };

        // 上
        this.keyUp.sleep();
        this.keyUp.onpointingmove = function () {
            dirKeyProcMove(DIR_KEY_DEF.UP);
        };
        // 左上
        this.keyUpLeft.sleep();
        this.keyUpLeft.onpointingmove = function () {
            dirKeyProcMove(DIR_KEY_DEF.UP_LEFT);
        };
        // 左
        this.keyLeft.sleep();
        this.keyLeft.onpointingmove = function () {
            dirKeyProcMove(DIR_KEY_DEF.LEFT);
        };
        // 左下
        this.keyDownLeft.sleep();
        this.keyDownLeft.onpointingmove = function () {
            dirKeyProcMove(DIR_KEY_DEF.DOWN_LEFT);
        };
        // 下
        this.keyDown.sleep();
        this.keyDown.onpointingmove = function () {
            dirKeyProcMove(DIR_KEY_DEF.DOWN);
        };
        // 右下
        this.keyDownRight.sleep();
        this.keyDownRight.onpointingmove = function () {
            dirKeyProcMove(DIR_KEY_DEF.DOWN_RIGHT);
        };
        // 右
        this.keyRight.sleep();
        this.keyRight.onpointingmove = function () {
            dirKeyProcMove(DIR_KEY_DEF.RIGHT);
        };
        // 右上
        this.keyUpRight.sleep();
        this.keyUpRight.onpointingmove = function () {
            dirKeyProcMove(DIR_KEY_DEF.UP_RIGHT);
        };

        // A
        this.buttonA.sleep();
        this.buttonA.onpointingmove = function () {
            if (!player.status.isStarted) return;
            if (shotIntvlTimer > 0) return;
            //            player.gotoAndPlay("shot");
            // lv.0
            if (shotLv >= 0) {
                let plBullet = PlBulletSprite(++uidCounter, player.x, player.y - 64, 0, -16).addChildTo(group8);
                plBulletArray.push(plBullet);
                shotIntvlTimer = 16;
            }
            // lv.1
            if (shotLv >= 1) {
                {
                    let plBullet = PlBulletSprite(++uidCounter, player.x + 32, player.y - 32, 0, -16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                {
                    let plBullet = PlBulletSprite(++uidCounter, player.x - 32, player.y - 32, 0, -16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                shotIntvlTimer = 14;
            }
            // lv.2
            if (shotLv >= 2) {
                {
                    let plBullet = PlBulletSprite(++uidCounter, player.x + 32, player.y - 32, +8, -16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                {
                    let plBullet = PlBulletSprite(++uidCounter, player.x - 32, player.y - 32, -8, -16).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                shotIntvlTimer = 12;
            }
            // lv.3
            if (shotLv >= 3) {
                {
                    let plBullet = PlBulletSprite(++uidCounter, player.x + 32, player.y - 32, +16, 0).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                {
                    let plBullet = PlBulletSprite(++uidCounter, player.x - 32, player.y - 32, -16, 0).addChildTo(group8);
                    plBulletArray.push(plBullet);
                }
                shotIntvlTimer = 10;
            }
            // lv.4
            if (shotLv >= 4) {
                let plBullet = PlBulletSprite(++uidCounter, player.x, player.y + 64, 0, +16).addChildTo(group8);
                plBulletArray.push(plBullet);
                shotIntvlTimer = 8;
            }
        };
        // B
        /*
        0:入力待ち
        1:長押し中
        2:発射
        */
        this.buttonB.sleep();
        this.buttonB.onpointingmove = function () {
            if (bombLeft <= 0) return;
            if ((bombStatus != 0) && (bombStatus != 1)) return;
            if (plBombArray.length > 0) return;
            if (bombStatus === 0) {
                bombStatus = 1;
                bombLv = 0;
                bombGauge = 0;
            }
            // Lvアップ
            if (++bombGauge >= 100) {
                if (++bombLv >= 9) {
                    bombLv = 9;
                    bombGauge = 100;
                } else {
                    bombGauge = 0;
                }
            }
        };
        this.buttonB.onpointingend = function () {
            if (bombStatus != 1) return;
            // 発射
            let tmp = bombTable[bombLv];
            for (let ii = 0; ii < tmp.num; ii++) {
                let xPos = getRandomInt(SCREEN_WIDTH - 64) + 64;
                let yPos = getRandomInt(SCREEN_HEIGHT - 64) + 64;
                let bomb = PlBombSprite(++uidCounter, tmp.bomb, xPos, yPos).addChildTo(group8);
                plBombArray.push(bomb);
            }
            if (--bombLeft <= 0) {
                bombLeft = 0;
            }
            bombStatus = 0;
        };

        // 
        {
            this.keyUp.wakeUp();
            this.keyUp.setAlpha(0.25);
            this.keyUpLeft.wakeUp();
            this.keyUpLeft.setAlpha(0.25);
            this.keyLeft.wakeUp();
            this.keyLeft.setAlpha(0.25);
            this.keyDownLeft.wakeUp();
            this.keyDownLeft.setAlpha(0.25);
            this.keyDown.wakeUp();
            this.keyDown.setAlpha(0.25);
            this.keyDownRight.wakeUp();
            this.keyDownRight.setAlpha(0.25);
            this.keyRight.wakeUp();
            this.keyRight.setAlpha(0.25);
            this.keyUpRight.wakeUp();
            this.keyUpRight.setAlpha(0.25);

            this.buttonA.wakeUp();
            this.buttonA.setAlpha(0.25);
            this.buttonB.wakeUp();
            this.buttonB.setAlpha(0.25);

            player.status = PL_STATUS.START;
        }
        nowScore = 0;
        speed = 1;
        bombLeft = 1;
        bombStatus = 0;
        bombLv = 0;
        bombGauge = 0;
        nowStageNum = 0;
        stageScrollFlag[0] = true;
        stageScrollFlag[1] = false;
        ctrlCounterFlag = true;
        ctrlCounter = 0;
        totalFrame = 0;
        fitWindowTimer = 0;
        shotIntvlTimer = 0;
        shotLv = 0;
        uidCounter = 0;

        this.ntkGaugeLabel.setAlpha(0.0);
        this.frame = 0;
        this.stopBGM = false;
    },

    update: function (app) {
        if (++fitWindowTimer % 15 === 0) app.fitWindow(false);    // 手動フィッティング
        if (!player.status.isDead) {
            if (player.status.isStarted) {
                totalFrame++;
                totalSec = Math.floor(totalFrame / app.fps);

                if (shotIntvlTimer > 0) shotIntvlTimer--;

                if (bombStatus === 0) {
                    this.ntkGaugeLabel.setAlpha(0.0);
                } else {
                    this.ntkGaugeLabel.setAlpha(1.0);
                    this.ntkGaugeLabel.text = "N.T.K. Lv." + (bombLv + 1) + "\n" + bombGauge + "%";
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
                                    let enemy = new EnemySprite(++uidCounter, ctrl.param).addChildTo(group4);
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
                                    stageBG[ctrl.param.idx] = new StageSprite(ctrl.param.sprName, ctrl.param.yPos).addChildTo(group0);
                                } else {
                                    stageBG[ctrl.param.idx] = new StageSprite(ctrl.param.sprName, ctrl.param.yPos).addChildTo(group1);
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

            this.nowScoreLabel.text = nowScore; // カンスト：999999999

            let tmpLife = "";   // カンスト：♥♥♥♥♥♥♥♥♥♥
            for (let ii = 0; ii < player.lifeMax; ii++) {
                if (ii < player.lifeLeft) tmpLife += "♥";
                else tmpLife += "♡";
            }
            this.nowLifeLeftLabel.text = tmpLife;


            // 当たり判定
            checkPlayerToEnemy();
            checkPlayerBulletToEnemy();
            checkEnemyBulletToPlayer();
        } else {
            if (!this.stopBGM) {
                fallSE.play();
                this.stopBGM = true;

                var self = this;
                // tweet ボタン
                this.tweetButton.onclick = function () {
                    var twitterURL = tm.social.Twitter.createURL({
                        type: "tweet",
                        text: "N.T.K. スコア: " + self.nowScoreLabel.text,
                        hashtags: ["ネムレス", "NEMLESSS"],
                        url: "https://iwasaku.github.io/test10/NTK/",
                    });
                    window.open(twitterURL);
                };

                this.upButton.sleep();
                this.upLeftButton.sleep();
                this.leftButton.sleep();
                this.downLeftButton.sleep();
                this.downButton.sleep();
                this.downRightButton.sleep();
                this.rightButton.sleep();
                this.upRightButton.sleep();
                this.aButton.sleep();
                this.bButton.sleep();
            }
            this.buttonAlpha += 0.05;
            if (this.buttonAlpha > 1.0) {
                this.buttonAlpha = 1.0;
            }
            this.tweetButton.setAlpha(this.buttonAlpha);
            this.restartButton.setAlpha(this.buttonAlpha);
            if (this.buttonAlpha > 0.7) {
                this.tweetButton.wakeUp();
                this.restartButton.wakeUp();
            }
        }
    }
});

/*
 * Stge
 */
tm.define("StageSprite", {
    superClass: "tm.app.Sprite",

    init: function (sprname, ypos) {
        this.superInit(sprname, 900, 1600 * 5);
        this.direct = '';
        this.zRot = 0;
        this.setPosition(SCREEN_CENTER_X, ypos).setScale(1, 1);
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
tm.define("PlayerSprite", {
    superClass: "tm.app.Sprite",

    init: function () {
        this.superInit("player", 128, 128);
        this.direct = '';
        this.zRot = 0;
        this.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y * 1.5).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.status = PL_STATUS.INIT;

        this.lifeLeft = 3;
        this.lifeMax = 3;
        this.invincivleTimer = 15;
    },

    update: function (app) {
        if (this.status === PL_STATUS.INIT) {
            this.status === PL_STATUS.START;
        };
        if (this.status === PL_STATUS.DEAD) {
            this.setAlpha(1.0);
            return;
        }
        if (--this.invincivleTimer < 0) this.invincivleTimer = 0;
        if (this.invincivleTimer % 2 === 0) {
            this.setAlpha(1.0);
        } else {
            this.setAlpha(0.0);
        }
    },
});

/*
 * Enemy
 */
tm.define("EnemySprite", {
    superClass: "tm.app.Sprite",
    init: function (uid, param) {
        this.uid = uid;
        this.define = param.ene;
        this.superInit(param.ene.sprName, param.ene.sprSize.x, param.ene.sprSize.y);
        this.direct = '';
        this.xSpd = param.xSpd;
        this.ySpd = param.ySpd;
        this.zRot = 0;
        this.setPosition(param.xPos, param.yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("circle");
        this.radius = 0;
        this.status = EN_STATUS.INIT;
        this.collisionEnable = false;
        this.localCounter = 0;
        this.localStatus = 0;
        this.life = param.ene.life;
        this.invincivleTimer = 15;
    },

    update: function (app) {
        switch (this.define) {
            case EN_DEF.ENEMY01:
                {
                    switch (this.status) {
                        case EN_STATUS.INIT:
                            this.status = EN_STATUS.START;
                            this.collisionEnable = true;
                        // THRU
                        case EN_STATUS.START:
                            break;
                        case EN_STATUS.DEAD_INIT:
                            this.status = EN_STATUS.DEAD;
                        // THRU
                        case EN_STATUS.DEAD:
                            break;
                    }
                }
                break;

            case EN_DEF.BOSS01:
                {
                    switch (this.status) {
                        case EN_STATUS.INIT:
                            this.localCounter = 0;
                            this.localStatus = 0;
                            this.ySpd = 8
                            this.status = EN_STATUS.START;
                            this.collisionEnable = false;
                        // THRU
                        case EN_STATUS.START:
                            switch (this.localStatus) {
                                case 0:
                                    // 出現
                                    if (this.y >= 256) {
                                        this.localStatus = 1;
                                        this.collisionEnable = true;
                                    }
                                    break;
                                case 1:
                                    // 停止
                                    this.ySpd = 0
                                    this.localStatus = 2;
                                case 2:
                                    // 弾を撃つ
                                    let enBullet = EnBulletSprite(++uidCounter, BULLET_DEF.EN_B_24, this.x - 32, this.y - 32, -16, 0).addChildTo(group7);
                                    enBulletArray.push(enBullet);
                                    this.status = EN_STATUS.DEAD_INIT;
                                    break;
                                default:
                            }
                            this.localCounter++;
                            break;
                        case EN_STATUS.DEAD_INIT:
                            this.status = EN_STATUS.DEAD;
                            this.localCounter = 0;
                            nowStageNum++;
                            // 次の面へ
                            ctrlCounter = 0;
                            ctrlCounterFlag = true;
                        // THRU
                        case EN_STATUS.DEAD:
                            break;
                    }
                }
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

/*
 * PlayerBullet
 */
tm.define("PlBulletSprite", {
    superClass: "tm.app.Sprite",

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
        this.timer = getRandomInt(60);
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

/*
 * EnemyBullet
 */
tm.define("EnBulletSprite", {
    superClass: "tm.app.Sprite",

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

// 自キャラ移動
function dirKeyProcMove(dkDef) {
    if (!player.status.isAccKey) return;
    let oldX = player.x;
    let oldY = player.y;
    let addX = dkDef.addX * speed;
    let addY = dkDef.addY * speed;
    player.x += addX
    if ((player.x <= 0 + 64) || (player.x >= SCREEN_WIDTH - 64)) {
        player.x = oldX;
    }
    player.y += addY
    if ((player.y <= 0 + 64) || (player.y >= SCREEN_HEIGHT - 64)) {
        player.y = oldY;
    }
}

// プレイヤーと敵との当たり判定
function checkPlayerToEnemy() {
    if (player.status.isDead) return;

    var self = this;
    let deadEnemyArray = [];

    // 敵との当たり判定
    for (var jj = 0; jj < self.enemyArray.length; jj++) {
        var tmpEne = self.enemyArray[jj];

        // そもそも画面外では当たらない
        if (
            (tmpEne.x < 0 - tmpEne.define.sprSize.x / 2) ||
            (tmpEne.x > SCREEN_WIDTH + tmpEne.define.sprSize.x / 2) ||
            (tmpEne.y < 0 - tmpEne.define.sprSize.y / 2) ||
            (tmpEne.y > SCREEN_HEIGHT + tmpEne.define.sprSize.y / 2)
        ) continue;

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
                }

                // 敵処理
                if (--tmpEne.life >= 1) {
                    // 残ライフが1以上
                    tmpEne.invincivleTimer = 15;
                } else {
                    tmpEne.status = EN_STATUS.DEAD;
                    deadEnemyArray.push(tmpEne);
                }
                // 爆破パターンのセット
            } else {
                // 当たったのがアイテムの場合
                switch (tmpEne.define) {
                    case EN_DEF.ITEM_SHOT:
                        if (++shotLv >= 4) {
                            shotLv = 4;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_SPEED:
                        if (++speed >= 8) {
                            speed = 8;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_BOMB:
                        if (++bombLeft >= 10) {
                            speed = 10;
                            nowScore += 1000;
                        }
                        break;
                    case EN_DEF.ITEM_LIFE_MAX:
                        if (++player.lifeMax >= 10) {
                            player.lifeMax = 10;
                            nowScore += 1000;
                        }
                    // THRU
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

            // そもそも画面外では当たらない
            if (
                (tmpEne.x < 0 - tmpEne.define.sprSize.x / 2) ||
                (tmpEne.x > SCREEN_WIDTH + tmpEne.define.sprSize.x / 2) ||
                (tmpEne.y < 0 - tmpEne.define.sprSize.y / 2) ||
                (tmpEne.y > SCREEN_HEIGHT + tmpEne.define.sprSize.y / 2)
            ) continue;

            if (tmpEne.status.isDead) continue; // 既に死亡済み
            if (tmpEne.invincivleTimer > 0) continue; // 無敵中

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

// 配列クリア
function clearArrays() {
    var self = this;

    for (let ii = self.plBulletArray.length - 1; ii >= 0; ii--) {
        let tmp = self.plBulletArray[ii];
        if (tmp.parent == null) console.log("NULL!!");
        else tmp.remove();
        self.plBulletArray.erase(tmp);
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
