const CMD = defineEnum({
    SET_ENEMY: {
        // 敵の配置
        value: 0,
    },
    STOP_CTRL_COUNTER: {
        // コントロールカウンターを止める
        value: 1,
    },
    SET_CTRL_COUNTER: {
        // コントロールカウンターの値をセットする
        value: 2,
    },
    START_SCROLL_CURRENT: {
        // 今のステージのスクロールを動かす
        value: 3,
    },
    START_SCROLL_NEXT: {
        // 次のステージのスクロールを動かす
        value: 4,
    },
    STOP_SCROLL_CURRENT: {
        // ボス前でスクロールを止める
        value: 5,
    },
    STOP_SCROLL_NEXT: {
        // ボス前でスクロールを止める
        value: 6,
    },
    SET_SCROLL_YPOS: {
        // スクロールY座標をセット
        value: 7,
    },
    SET_SCROLL_DATA: {
        // スクロールデータを設定する
        // NEXTのみ
        value: 8,
    },
    SET_BOSSSRUSH: {
        // ボスラッシュを開始
        value: 9,
    },
    RESET_BOSSSRUSH: {
        // ボスラッシュ終了
        value: 10,
    },
    FADE_IN: {
        // フェード・イン
        // CURRENTのみ
        value: 11,
    },
    FADE_OUT: {
        // フェード・アウト
        // NEXTのみ
        value: 12,
    },
    DISP_STAGE_NUM: {
        // ステージ数表示
        value: 13,
    },
    CLEAR_ENEMY_ARRAYS: {
        // 敵の配列を掃除
        value: 14,
    },
});
// 管理テーブル
// トランジション用に先頭へ１面追加する場合はSET_SCROLL_DATAとSTOP_SCROLLを調整する
// 周回するときのBG処理の関係上ステージ数は偶数にする
const ctrlTable = [
    // STG6
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: {} },

        { count: 0, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },

        { count: 0, cmd: CMD.START_SCROLL_CURRENT, param: {} },
        { count: 0, cmd: CMD.FADE_IN, param: {} },
        { count: 0, cmd: CMD.START_SCROLL_NEXT, param: {} },
        { count: 0, cmd: CMD.FADE_OUT, param: {} },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL_NEXT, param: {} },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { sprName: "stg01", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

        // ボスラッシュ開始
        { count: 120 - 60, cmd: CMD.SET_BOSSSRUSH, param: {} },

        // STG1ボス前
        { count: 120 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 120, cmd: CMD.STOP_SCROLL_CURRENT, param: {} },
        // STG1ボス
        { count: 120 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 120 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 120 + 2 * 60 + 2, cmd: CMD.START_SCROLL_CURRENT, param: {} },

        // STG2ボス前
        { count: 480 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 480, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },
        { count: 480, cmd: CMD.STOP_SCROLL_CURRENT, param: {} },
        // STG2ボス
        { count: 480 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS02, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 480 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 480 + 2 * 60 + 2, cmd: CMD.START_SCROLL_CURRENT, param: {} },

        // STG3ボス前
        { count: 720 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 720, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },
        { count: 720, cmd: CMD.STOP_SCROLL_CURRENT, param: {} },
        // STG3ボス
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 0 } },
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 90 } },
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 180 } },
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 270 } },
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01MOD, xPos: SCREEN_CENTER_X, yPos: -128 - 192 } },
        { count: 720 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 720 + 2 * 60 + 2, cmd: CMD.START_SCROLL_CURRENT, param: {} },

        // STG4ボス前
        { count: 960 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 960, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },
        { count: 960, cmd: CMD.STOP_SCROLL_CURRENT, param: {} },
        // STG4ボス
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 0 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 60 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 120 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 180 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 240 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128 - 192, deg: 300 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS02MOD, xPos: SCREEN_CENTER_X, yPos: -128 - 192 } },
        { count: 960 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 960 + 2 * 60 + 2, cmd: CMD.START_SCROLL_CURRENT, param: {} },

        // STG5ボス前
        { count: 1200 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 1200, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },
        { count: 1200, cmd: CMD.STOP_SCROLL_CURRENT, param: {} },
        // STG5ボス
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 0 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 90 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 180 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 270 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 0 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 90 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 180 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 270 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS03MOD, xPos: SCREEN_CENTER_X, yPos: -128 - 256 } },
        { count: 1200 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 1200 + 2 * 60 + 2, cmd: CMD.START_SCROLL_CURRENT, param: {} },

        // ボスラッシュ終了
        { count: 1440 - 60, cmd: CMD.RESET_BOSSSRUSH, param: {} },

        // STG6ボス前
        { count: 1440 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 1440, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },
        { count: 1440, cmd: CMD.STOP_SCROLL_CURRENT, param: {} },
        // STG6ボス
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 0 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 60 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 120 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 180 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 240 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 300 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 0 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 60 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 120 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 180 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 240 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128 - 256, deg: 300 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS04, xPos: SCREEN_CENTER_X, yPos: -128 - 256 } },
        { count: 1440 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
];
