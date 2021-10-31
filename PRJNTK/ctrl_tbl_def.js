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
    START_SCROLL: {
        // ボス前でスクロールを止める
        value: 3,
    },
    STOP_SCROLL: {
        // ボス前でスクロールを止める
        value: 4,
    },
    SET_SCROLL_YPOS: {
        // スクロールY座標をセット
        value: 5,
    },
    SET_SCROLL_DATA: {
        // スクロールデータを設定する
        value: 6,
    },
    SET_BOSSSRUSH: {
        // スクロールデータを設定する
        value: 7,
    },
    RESET_BOSSSRUSH: {
        // スクロールデータを設定する
        value: 8,
    },
    FADE_IN: {
        // フェード・イン
        value: 9,
    },
    FADE_OUT: {
        // フェード・アウト
        value: 10,
    },
    DISP_STAGE_NUM: {
        // ステージ数表示
        value: 11,
    },
    CLEAR_ENEMY_ARRAYS: {
        // 敵の配列を掃除
        value: 12,
    },
});
// 管理テーブル
// トランジション用に先頭へ１面追加する場合はSET_SCROLL_DATAとSTOP_SCROLLを調整する
// 周回するときのBG処理の関係上ステージ数は偶数にする
const ctrlTable = [
    //    [
    //
    //        { count: 800 * 4, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },
    //
    //        { count: 3200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01, xPos: SCREEN_CENTER_X, yPos: -128 } },
    //        { count: 3200 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    //
    //        // ENEMY00_2を
    //        // count: 1700 + 120 * 0 で1-6
    //        // count: 1700 + 120 * 4 で1-6
    //        // とするといい感じでつながる
    //
    //        // 無限に雑魚を出現させる場合はSTOP_CTRL_COUNTERの代わりにコッチを使う
    //        //{ count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: 128 + 128 * 0, yPos: -64 } },
    //        //{ count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: 128 + 128 * 1, yPos: -64 * 5 } },
    //        //{ count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: 128 + 128 * 2, yPos: -64 * 3 } },
    //        //{ count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: 128 + 128 * 3, yPos: -64 * 9 } },
    //        //{ count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: 128 + 128 * 4, yPos: -64 * 11 } },
    //        //{ count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: 128 + 128 * 5, yPos: -64 * 7 } },
    //        //{ count: 3200 + 60 * 5, cmd: CMD.SET_CTRL_COUNTER, param: { cnt: 3200 + 59 } },
    //    ],
    // STG1
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 1" } },

        { count: 0, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 0 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 1 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 1, sprName: "stg02", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

        // ザコ
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 1, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 2, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 1, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 2, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 5 } },

        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 7 } },

        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH - 128 * 1.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH - 128 * 2.5, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 + 128 * 1.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 + 128 * 2.5, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1320, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1320, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1320, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1320, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: SCREEN_CENTER_X, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 + 128 * 3, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1940, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1940, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1940, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1940, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH - 128 * 3, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 2.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 1.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 1.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 2.5, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 0, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 2.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 1.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 0.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 0.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 1.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 2.5, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 3, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X - 120 * 1, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 0, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 1, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_N, xPos: SCREEN_CENTER_X + 120 * 3, yPos: 0 - 64 - (128 + 32) * 4 } },

        // ボス前
        { count: 3200 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 3200, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },

        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG2
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 2" } },

        { count: 0, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 0 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 1 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg03", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

        // ザコ
        // wave 0
        { count: 60 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 300 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 300 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 300 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 300 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },

        { count: 460 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 460 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 460 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 460 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },
        { count: 460 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 460 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 460 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 460 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },

        { count: 700 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: 0 + 128 * 3 } },
        { count: 700 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: 0 + 128 * 3 } },
        { count: 700 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: 0 + 128 * 3 } },
        { count: 700 + 800 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: 0 + 128 * 3 } },

        // wave 1
        { count: 60 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 60 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 60 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 60 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },
        { count: 60 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 60 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 60 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 60 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },

        { count: 300 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: 0 + 128 * 2 } },
        { count: 300 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: 0 + 128 * 2 } },
        { count: 300 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: 0 + 128 * 2 } },
        { count: 300 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: 0 + 128 * 2 } },
        { count: 300 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 2 } },

        { count: 460 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 460 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 460 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 460 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 460 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 460 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 460 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 460 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 700 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: 0 + 128 * 3 } },
        { count: 700 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: 0 + 128 * 3 } },
        { count: 700 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: 0 + 128 * 3 } },
        { count: 700 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: 0 + 128 * 3 } },
        { count: 700 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 700 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 700 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 700 + 800 * 1, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },

        // wave 2
        { count: 60 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 60 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 60 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 60 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },

        { count: 300 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: SCREEN_HEIGHT - 128 * 2 } },

        { count: 460 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 460 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 460 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 460 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },
        { count: 460 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 460 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 460 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 460 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 700 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: 0 + 128 * 2 } },
        { count: 700 + 800 * 2, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: 0 + 128 * 2 } },

        // wave 3
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 60 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },

        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: 0 + 128 * 2 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: 0 + 128 * 2 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: 0 + 128 * 2 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: 0 + 128 * 2 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: 0 + 128 * 3 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: 0 + 128 * 3 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: 0 + 128 * 3 } },
        { count: 300 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: 0 + 128 * 3 } },

        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },

        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: 0 + 128 * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: 0 + 128 * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: 0 + 128 * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: 0 + 128 * 2 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 0, yPos: 0 + 128 * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 1, yPos: 0 + 128 * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 2, yPos: 0 + 128 * 3 } },
        { count: 460 + 800 * 3, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 128 * 3, yPos: 0 + 128 * 3 } },

        // ボス前
        { count: 3200 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 3200, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },

        // ボス
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS02, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },

    ],
    // STG3
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 3" } },

        { count: 0, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 0 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 1 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 1, sprName: "stg04", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

        // ザコ
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 5 } },

        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 5 } },

        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 240, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 5 } },

        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 330, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 5 } },

        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 8 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 8 } },

        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 1.0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 0.0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 1.0, yPos: 0 - 64 - (128 + 32) * 0 } },

        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 1.0, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 0.0, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 1.0, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },

        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_CENTER_Y - 128 * 1.0 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_CENTER_Y - 128 * 0.5 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_CENTER_Y - 128 * 0.0 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_CENTER_Y + 128 * 0.5 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_CENTER_Y + 128 * 1.0 } },

        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_CENTER_Y - 128 * 1.0 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1, yPos: SCREEN_CENTER_Y - 128 * 0.5 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_CENTER_Y - 128 * 0.0 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1, yPos: SCREEN_CENTER_Y + 128 * 0.5 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_CENTER_Y + 128 * 1.0 } },

        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 1.0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 0.0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 1.0, yPos: 0 - 64 - (128 + 32) * 0 } },

        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 1.0, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 0.0, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 1.0, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },

        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_CENTER_Y - 128 * 1.0 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_CENTER_Y - 128 * 0.5 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_CENTER_Y - 128 * 0.0 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_CENTER_Y + 128 * 0.5 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_CENTER_Y + 128 * 1.0 } },

        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_CENTER_Y - 128 * 1.0 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1, yPos: SCREEN_CENTER_Y - 128 * 0.5 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_CENTER_Y - 128 * 0.0 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1, yPos: SCREEN_CENTER_Y + 128 * 0.5 } },
        { count: 1080, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_CENTER_Y + 128 * 1.0 } },

        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: 0 + 128 * 3 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: 0 + 128 * 3 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: 0 + 128 * 3 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: 0 + 128 * 3 } },

        { count: 1320, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1320, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1320, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1320, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },

        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: 0 + 128 * 3 } },
        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1, yPos: 0 + 128 * 3 } },
        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 2, yPos: 0 + 128 * 3 } },
        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 3, yPos: 0 + 128 * 3 } },

        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },

        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: 0 + 128 * 3 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: 0 + 128 * 3 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: 0 + 128 * 3 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: 0 + 128 * 3 } },

        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },

        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: 0 + 128 * 3 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1, yPos: 0 + 128 * 3 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 2, yPos: 0 + 128 * 3 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 3, yPos: 0 + 128 * 3 } },

        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 1, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 2, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },

        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: 0 + 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1.5, yPos: 0 + 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: 0 + 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1.5, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: 0 + 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1.5, yPos: 0 + 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 3, yPos: 0 + 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1.5, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 1940 + 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },

        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1.5 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 1.5 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1.5 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1.5 } },
        { count: 2060 + 180 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },

        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: 0 + 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1.5, yPos: 0 + 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: 0 + 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1.5, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 0, yPos: 0 + 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 1.5, yPos: 0 + 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH + 64 + (128 + 32) * 3, yPos: 0 + 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 0, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 1.5, yPos: SCREEN_HEIGHT - 128 * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 - 64 - (128 + 32) * 3, yPos: SCREEN_HEIGHT - 128 * 3 } },

        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 1.5 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 1.5 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1.5 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 0 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 1.5 } },
        { count: 2300 + 180 + 120 + 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: 0 + 128, yPos: SCREEN_HEIGHT + 64 + (128 + 32) * 3 } },

        // ボス前
        { count: 3200 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 3200, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },

        // ボス
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01MOD, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG4
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 4" } },

        { count: 0, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 1 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 0 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg05", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

        // ザコ
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 4 } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 5 } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 6 } },

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 7 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 7 } },

        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) } },
        { count: 360, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) } },

        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 480, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 720, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 840, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 7 } },

        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 7 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 7 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 1200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 7 } },

        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 2.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 1.5, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1460, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 1.5, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 2.5, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 1.5, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1700, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 2.5, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 4.5 } },
        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 5.5 } },
        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 6.5 } },
        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 4.5 } },
        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 5.5 } },
        { count: 1700 + 120 * -4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 6.5 } },

        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 0.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 2.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 3.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 4.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 5.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 6.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 0.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 2.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 3.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 4.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 5.5 } },
        { count: 1700 + 120 * 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 6.5 } },

        { count: 1700 + 120 * 4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1.5 } },
        { count: 1700 + 120 * 4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1700 + 120 * 4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1700 + 120 * 4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2_H, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1.5 } },

        { count: 2080 + 60 * 4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2080 + 60 * 4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2080 + 60 * 4, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2080 + 60 * 5, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2080 + 60 * 5, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2080 + 60 * 5, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2080 + 60 * 6, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2080 + 60 * 6, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2080 + 60 * 6, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2080 + 60 * 7, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2080 + 60 * 7, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2080 + 60 * 7, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2080 + 60 * 8, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2080 + 60 * 8, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2080 + 60 * 8, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2080 + 60 * 9, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2080 + 60 * 9, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2080 + 60 * 9, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2080 + 60 * 10, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2080 + 60 * 10, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2080 + 60 * 10, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2080 + 60 * 11, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2080 + 60 * 11, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2080 + 60 * 11, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        // ボス前
        { count: 3200 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 3200, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },

        // ボス
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 60 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 120 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 240 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 300 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS02MOD, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG5
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 5" } },

        { count: 0, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 0 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 1 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 1, sprName: "stg06", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

        // ザコ
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 0, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 300, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 300, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 300, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 300, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 300, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 300, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 300, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 300, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 420, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 420, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 420, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 420, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 420, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 420, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 420, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 420, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_CENTER_X - 128 * 0, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },

        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 660, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY03_0, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },

        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 8 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 10 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 12 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 14 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 16 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 18 } },

        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 8 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 10 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 12 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 14 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 16 } },
        { count: 540, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 18 } },

        { count: 780, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 780, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 780, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: SCREEN_CENTER_X + 128 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 780, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 780, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 1020, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_1, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1020, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_1, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1020, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_1, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 1020, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_1, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 1020, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_1, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 8 } },
        { count: 1020, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_1, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 10 } },

        { count: 1260, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_2, xPos: SCREEN_CENTER_X + 128 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1260, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_2, xPos: SCREEN_CENTER_X - 128 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1260, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_2, xPos: SCREEN_CENTER_X + 128 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 1260, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_2, xPos: SCREEN_CENTER_X - 128 * 2, yPos: 0 - 64 - (128 + 32) * 6 } },
        { count: 1260, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_2, xPos: SCREEN_CENTER_X + 128 * 1, yPos: 0 - 64 - (128 + 32) * 8 } },
        { count: 1260, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY02_2, xPos: SCREEN_CENTER_X - 128 * 1, yPos: 0 - 64 - (128 + 32) * 10 } },

        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_LEFT, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 5 } },
        { count: 1620, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_3_RIGHT, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 5 } },

        { count: 1960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_WIDTH + 128, yPos: SCREEN_CENTER_Y - 128 * 2 } },
        { count: 1960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_WIDTH + 128, yPos: SCREEN_CENTER_Y - 128 * 1 } },
        { count: 1960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_WIDTH + 128, yPos: SCREEN_CENTER_Y + 128 * 1 } },
        { count: 1960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_WIDTH + 128, yPos: SCREEN_CENTER_Y + 128 * 2 } },
        { count: 1960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 0 - 128, yPos: SCREEN_CENTER_Y - 128 * 2 } },
        { count: 1960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 0 - 128, yPos: SCREEN_CENTER_Y - 128 * 1 } },
        { count: 1960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 0 - 128, yPos: SCREEN_CENTER_Y + 128 * 1 } },
        { count: 1960, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 0 - 128, yPos: SCREEN_CENTER_Y + 128 * 2 } },

        { count: 2100, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 1.5, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2100, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2100, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2100, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 1.5, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2100, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 1.5, yPos: SCREEN_HEIGHT - 128 * 0 } },
        { count: 2100, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X - 128 * 0.5, yPos: SCREEN_HEIGHT - 128 * 0 } },
        { count: 2100, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 0.5, yPos: SCREEN_HEIGHT - 128 * 0 } },
        { count: 2100, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: SCREEN_CENTER_X + 128 * 1.5, yPos: SCREEN_HEIGHT - 128 * 0 } },

        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: SCREEN_HEIGHT + 128 * 0 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: SCREEN_HEIGHT + 128 * 1 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: SCREEN_HEIGHT + 128 * 2 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: SCREEN_HEIGHT + 128 * 3 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 2, yPos: SCREEN_HEIGHT + 128 * 0 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 2, yPos: SCREEN_HEIGHT + 128 * 1 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 2, yPos: SCREEN_HEIGHT + 128 * 2 } },
        { count: 2340, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 2, yPos: SCREEN_HEIGHT + 128 * 3 } },

        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: SCREEN_HEIGHT + 128 * 0 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: SCREEN_HEIGHT + 128 * 1 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: SCREEN_HEIGHT + 128 * 2 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: SCREEN_HEIGHT + 128 * 3 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 128 * 0 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 128 * 1 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 128 * 2 } },
        { count: 2580, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: SCREEN_HEIGHT + 128 * 3 } },

        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: SCREEN_HEIGHT + 128 * 0 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: SCREEN_HEIGHT + 128 * 1 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: SCREEN_HEIGHT + 128 * 2 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: SCREEN_HEIGHT + 128 * 3 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: 0 + 128 * 1, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: SCREEN_HEIGHT + 128 * 0 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: SCREEN_HEIGHT + 128 * 1 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: SCREEN_HEIGHT + 128 * 2 } },
        { count: 2820, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY04_0, xPos: SCREEN_WIDTH - 128 * 1, yPos: SCREEN_HEIGHT + 128 * 3 } },

        // ボス前
        { count: 3200 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 3200, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },

        // ボス
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        { count: 3200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS03MOD, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG6
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "FINAL STAGE" } },

        { count: 0, cmd: CMD.CLEAR_ENEMY_ARRAYS, param: {} },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 1 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 0 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg01", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

        // ザコ出現

        // ボスラッシュ開始
        { count: 120 - 60, cmd: CMD.SET_BOSSSRUSH, param: {} },

        // STG1ボス前
        { count: 120 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 120, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        // STG1ボス
        { count: 120 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 120 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 120 + 2 * 60 + 2, cmd: CMD.START_SCROLL, param: { idx: 1 } },

        // STG2ボス前
        { count: 480 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 480, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        // STG2ボス
        { count: 480 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS02, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 480 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 480 + 2 * 60 + 2, cmd: CMD.START_SCROLL, param: { idx: 1 } },

        // STG3ボス前
        { count: 720 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 720, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        // STG3ボス
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        { count: 720 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01MOD, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 720 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 720 + 2 * 60 + 2, cmd: CMD.START_SCROLL, param: { idx: 1 } },

        // STG4ボス前
        { count: 960 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 960, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        // STG4ボス
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 60 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 120 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 240 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_0, xPos: SCREEN_CENTER_X, yPos: -128, deg: 300 } },
        { count: 960 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS02MOD, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 960 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 960 + 2 * 60 + 2, cmd: CMD.START_SCROLL, param: { idx: 1 } },

        // STG5ボス前
        { count: 1200 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 1200, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        // STG5ボス
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_1, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        { count: 1200 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS03MOD, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 1200 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
        { count: 1200 + 2 * 60 + 2, cmd: CMD.START_SCROLL, param: { idx: 1 } },

        // ボスラッシュ終了
        { count: 1440 - 60, cmd: CMD.RESET_BOSSSRUSH, param: {} },

        // STG6ボス前
        { count: 1440 - 60, cmd: CMD.DISP_WARNING, param: {} },
        { count: 1440, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        // STG7ボス
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 60 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 120 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 240 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 300 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 60 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 120 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 240 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02_2, xPos: SCREEN_CENTER_X, yPos: -128, deg: 300 } },
        { count: 1440 + 2 * 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS04, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 1440 + 2 * 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
];
