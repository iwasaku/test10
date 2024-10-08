var ASSETS = {
    font: {
        misaki_gothic: "https://cdn.leafscape.be/misaki/misaki_gothic_web.woff2"
    },
    image: {
        "player": "./resource/squid.png",

        "enemy01": "./resource/enemy/enemy_a.png",
        "enemy02": "./resource/enemy/enemy_b.png",
        "enemy03": "./resource/enemy/enemy_c.png",
        "enemy04": "./resource/enemy/enemy_d.png",
        "enemy05": "./resource/enemy/enemy_e.png",
        "enemy06": "./resource/enemy/enemy_f.png",
        "enemy07": "./resource/enemy/enemy_g.png",
        "enemy08": "./resource/enemy/enemy_h.png",

        "boss01": "./resource/boss/boss_1.png",
        "boss02": "./resource/boss/boss_2.png",
        "boss03": "./resource/boss/boss_3.png",
        "boss04": "./resource/boss/boss_4.png",
        "boss05": "./resource/boss/boss_5.png",
        "boss06": "./resource/boss/boss_6.png",

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

        "en_blt_chinu": "./resource/bullet/chinu.png",

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

        "stg01": "./resource/stage/stg_2.png?2",
        "stg02": "./resource/stage/stg_3.png?2",
        "stg03": "./resource/stage/stg_4.png?2",
        "stg04": "./resource/stage/stg_5.png?2",
        "stg05": "./resource/stage/stg_6.png?2",
        "stg06": "./resource/stage/stg_7.png?2",

        "item_shot": "./resource/item/item_shot.png?2",
        "item_speed": "./resource/item/item_speed.png?2",
        "item_bomb": "./resource/item/item_ntk.png?2",
        "item_life": "./resource/item/item_life.png?2",
        "item_fairy": "./resource/item/fairly.png?2",

        "explosion": "./resource/expl/expl_48.png",
    },
    spritesheet: {
        "explosion_ss":
        {
            // フレーム情報
            "frame": {
                "width": 48, // 1フレームの画像サイズ（横）
                "height": 48, // 1フレームの画像サイズ（縦）
                "cols": 11, // フレーム数（横）
                "rows": 1, // フレーム数（縦）
            },
            // アニメーション情報
            "animations": {
                "start": { // アニメーション名
                    "frames": Array.range(11), // フレーム番号範囲[0,1,2]の形式でもOK
                    "next": "", // 次のアニメーション。空文字列なら終了。同じアニメーション名ならループ
                    "frequency": 1, // アニメーション間隔
                },
            }
        },
    },
    sound: {
        "explosion": "https://iwasaku.github.io/test10/PRJNTK/resource/se/se_explode08.mp3",
        "shot": "https://iwasaku.github.io/test10/PRJNTK/resource/se/laser2.mp3",
        "item": "https://iwasaku.github.io/test7/NEMLESSSTER/resource/coin05.mp3",
    },
};
