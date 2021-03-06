const BULLET_DEF = defineEnum({
    // プレイヤー弾
    PL_O_16: {
        sprName: "pl_blt",
        sprSize: { x: 16, y: 16 },
        radius: 7,
        lv: 99,
    },

    // 敵弾
    // 小
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

    // 中
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

    // 大
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

    // 特殊
    EN_CHINU_CUTTER: {
        sprName: "en_blt_chinu",
        sprSize: { x: 64, y: 64 },
        radius: 64,
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
    { bomb: [BOMB_DEF.BOMB_LV_0], num: 10 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1], num: 40 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1, BOMB_DEF.BOMB_LV_2], num: 60 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1, BOMB_DEF.BOMB_LV_2, BOMB_DEF.BOMB_LV_3], num: 80 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1, BOMB_DEF.BOMB_LV_2, BOMB_DEF.BOMB_LV_3, BOMB_DEF.BOMB_LV_4], num: 100 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1, BOMB_DEF.BOMB_LV_2, BOMB_DEF.BOMB_LV_3, BOMB_DEF.BOMB_LV_4, BOMB_DEF.BOMB_LV_5], num: 120 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1, BOMB_DEF.BOMB_LV_2, BOMB_DEF.BOMB_LV_3, BOMB_DEF.BOMB_LV_4, BOMB_DEF.BOMB_LV_5, BOMB_DEF.BOMB_LV_6], num: 140 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1, BOMB_DEF.BOMB_LV_2, BOMB_DEF.BOMB_LV_3, BOMB_DEF.BOMB_LV_4, BOMB_DEF.BOMB_LV_5, BOMB_DEF.BOMB_LV_6, BOMB_DEF.BOMB_LV_7], num: 160 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1, BOMB_DEF.BOMB_LV_2, BOMB_DEF.BOMB_LV_3, BOMB_DEF.BOMB_LV_4, BOMB_DEF.BOMB_LV_5, BOMB_DEF.BOMB_LV_6, BOMB_DEF.BOMB_LV_7, BOMB_DEF.BOMB_LV_8], num: 180 },
    { bomb: [BOMB_DEF.BOMB_LV_0, BOMB_DEF.BOMB_LV_1, BOMB_DEF.BOMB_LV_2, BOMB_DEF.BOMB_LV_3, BOMB_DEF.BOMB_LV_4, BOMB_DEF.BOMB_LV_5, BOMB_DEF.BOMB_LV_6, BOMB_DEF.BOMB_LV_7, BOMB_DEF.BOMB_LV_8, BOMB_DEF.BOMB_LV_9], num: 200 },
];