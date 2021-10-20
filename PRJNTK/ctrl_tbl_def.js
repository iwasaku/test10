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
});
// 管理テーブル
// トランジション用に先頭へ１面追加する場合はSET_SCROLL_DATAとSTOP_SCROLLを調整する
// 周回するときのBG処理の関係上ステージ数は偶数にする
const ctrlTable = [
    //    [
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

        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_0, xPos: SCREEN_WIDTH - 128 * 2, yPos: 0 - 64 - (128 + 32) * 3 } },

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

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 0, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 1, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 2, yPos: 0 - 64 - (128 + 32) * 0 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 3, yPos: 0 - 64 - (128 + 32) * 0 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 2.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 1.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 0.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 1.5, yPos: 0 - 64 - (128 + 32) * 1 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 2.5, yPos: 0 - 64 - (128 + 32) * 1 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 0, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 1, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 2, yPos: 0 - 64 - (128 + 32) * 2 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 3, yPos: 0 - 64 - (128 + 32) * 2 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 2.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 1.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 0.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 0.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 1.5, yPos: 0 - 64 - (128 + 32) * 3 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 2.5, yPos: 0 - 64 - (128 + 32) * 3 } },

        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 3, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X - 120 * 1, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 0, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 1, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 2, yPos: 0 - 64 - (128 + 32) * 4 } },
        { count: 2000, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY00_2, xPos: SCREEN_CENTER_X + 120 * 3, yPos: 0 - 64 - (128 + 32) * 4 } },

        { count: 800 * 4, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },

        { count: 3200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG2
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 2" } },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 0 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 1 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg03", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

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
        { count: 800 * 4, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },

        // ボス
        { count: 3200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS02, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },

    ],
    // STG3
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 3" } },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 0 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 1 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 1, sprName: "stg04", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },


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
        { count: 800 * 4, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },

        // ボス
        { count: 3200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS03, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG4
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 4" } },

        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.FADE_IN, param: { idx: 1 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.FADE_OUT, param: { idx: 0 } },

        // １画面分スクロールした辺りで次の面の準備
        { count: 900, cmd: CMD.STOP_SCROLL, param: { idx: 0 } },
        { count: 900, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg04", yPos: -SCREEN_HEIGHT * 1.5, ySize: 1600 * 5, alpha: 0.0 } },

        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS04, xPos: SCREEN_CENTER_X, yPos: -128 } },

        // ボス前
        { count: 800 * 4, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },

        // ボス
        { count: 3200, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS04, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 3200 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },

    ],
    // STG5
    // 宇宙→亜空間へのトランジション用に先頭へ１面追加する？
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 5" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg05", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },

        // 無限に雑魚を出現させる
        { count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 128 + 128 * 0, yPos: -64 } },
        { count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 128 + 128 * 1, yPos: -64 * 5 } },
        { count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 128 + 128 * 2, yPos: -64 * 3 } },
        { count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 128 + 128 * 3, yPos: -64 * 9 } },
        { count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 128 + 128 * 4, yPos: -64 * 11 } },
        { count: 3200 + 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01_1, xPos: 128 + 128 * 5, yPos: -64 * 7 } },

        { count: 3200 + 60 * 5, cmd: CMD.SET_CTRL_COUNTER, param: { cnt: 3200 + 59 } },
    ],
    // STG6
    // 亜空間→宇宙へのトランジション用に先頭へ１面追加する？
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 6" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg06", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 60 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 120 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 240 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 300 } },
        //        { count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS06, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG7
    // 宇宙→基地へのトランジション用に先頭へ１面追加する？
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 7" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg07", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 0 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO01, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 0 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 90 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 180 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS_ZAKO02, xPos: SCREEN_CENTER_X, yPos: -128, deg: 270 } },
        //{ count: 60, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS07, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 60 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },
    ],
    // STG8
    [
        { count: 0, cmd: CMD.DISP_STAGE_NUM, param: { str: "STAGE 8" } },
        { count: 0, cmd: CMD.SET_SCROLL_DATA, param: { idx: 0, sprName: "stg08", yPos: -SCREEN_HEIGHT * 2.5, ySize: 1600 * 5 } },
        { count: 0, cmd: CMD.START_SCROLL, param: { idx: 1 } },
        { count: 0, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },
        { count: 10, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.ENEMY01, xPos: 0, yPos: 0 } },

        { count: 800 * 5, cmd: CMD.STOP_SCROLL, param: { idx: 1 } },
        { count: 90, cmd: CMD.SET_BOSSSRUSH, param: {} },
        { count: 90, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS01, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 90 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },

        { count: 120, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS02, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 120 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },

        { count: 150, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS03, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 150 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },

        { count: 180, cmd: CMD.RESET_BOSSSRUSH, param: {} },
        { count: 180, cmd: CMD.SET_ENEMY, param: { loop: 0, define: EN_DEF.BOSS04, xPos: SCREEN_CENTER_X, yPos: -128 } },
        { count: 180 + 1, cmd: CMD.STOP_CTRL_COUNTER, param: {} },

    ],
];
