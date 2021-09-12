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

        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 30, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 90, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },

        //{ count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        //{ count: 30, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ITEM_LIFE, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        //{ count: 90, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ITEM_LIFE_MAX, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },
        //{ count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ITEM_SPEED, xPos: SCREEN_CENTER_X, yPos: -64, xSpd: 0, ySpd: 8 } },

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
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg03", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },

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
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg04", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
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
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg05", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
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
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg06", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
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
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg07", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
    ],
    // STG8
    // 基地
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 8" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg08", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, ene: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
    ],
];