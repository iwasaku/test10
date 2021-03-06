const EN_ATTR = defineEnum({
    ENEMY: {
        isEnemy: true,
        isBoss: false,
        isBossZako: false,
        isItem: false,
    },
    BOSS_ZAKO: {
        isEnemy: true,
        isBoss: false,
        isBossZako: true,
        isItem: false,
    },
    BOSS: {
        isEnemy: true,
        isBoss: true,
        isBossZako: false,
        isItem: false,
    },
    ITEM: {
        isEnemy: false,
        isBoss: false,
        isBossZako: false,
        isItem: true,
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
const SHOT_TYPE = defineEnum({
    NONE: {
        spd: 0,
        bullet: BULLET_DEF.EN_B_24,
    },

    //
    SNIPE_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_B_48,
    },
    SNIPE_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_B_24,
    },
    SNIPE_H: {
        spd: 24,
        bullet: BULLET_DEF.EN_B_24,
    },

    //
    WAY_OF_4_N: {
        spd: 16,
        cnt: 4,
        bullet: BULLET_DEF.EN_O_24,
    },
    WAY_OF_8_N: {
        spd: 16,
        cnt: 8,
        bullet: BULLET_DEF.EN_O_24,
    },
    WAY_OF_16_N: {
        spd: 16,
        cnt: 16,
        bullet: BULLET_DEF.EN_O_24,
    },
    WAY_OF_32_N: {
        spd: 16,
        cnt: 32,
        bullet: BULLET_DEF.EN_O_24,
    },

    // 
    SECTOR_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_P_48,
    },
    SECTOR_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_P_24,
    },
    SECTOR_UP_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_P_48,
        cnt: 270 - 45,
    },
    SECTOR_UP_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_P_24,
        cnt: 270 - 45,
    },
    SECTOR_DOWN_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_P_48,
        cnt: 90 - 45,
    },
    SECTOR_DOWN_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_P_24,
        cnt: 90 - 45,
    },
    SECTOR_LEFT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_P_48,
        cnt: 180 - 45,
    },
    SECTOR_LEFT_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_P_24,
        cnt: 180 - 45,
    },
    SECTOR_RIGHT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_P_48,
        cnt: 0 - 45,
    },
    SECTOR_RIGHT_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_P_24,
        cnt: 0 - 45,
    },
    SECTOR_DIR_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_P_48,
    },
    SECTOR_DIR_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_P_24,
    },

    //
    SEMICIRCLE_UP_XL: {
        spd: 8,
        bullet: BULLET_DEF.EN_R_48,
        cnt: 270 - 90,
    },
    SEMICIRCLE_UP_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_G_48,
        cnt: 270 - 90,
    },
    SEMICIRCLE_UP_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_G_24,
        cnt: 270 - 90,
    },
    SEMICIRCLE_UP_RIGHT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_G_48,
        cnt: 315 - 90,
    },
    SEMICIRCLE_UP_RIGHT__N: {
        spd: 16,
        bullet: BULLET_DEF.EN_G_24,
        cnt: 315 - 90,
    },
    SEMICIRCLE_RIGHT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_G_48,
        cnt: 0 - 90,
    },
    SEMICIRCLE_RIGHT_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_G_24,
        cnt: 0 - 90,
    },
    SEMICIRCLE_DOWN_RIGHT_XL: {
        spd: 8,
        bullet: BULLET_DEF.EN_R_48,
        cnt: 45 - 90,
    },
    SEMICIRCLE_DOWN_RIGHT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_G_48,
        cnt: 45 - 90,
    },
    SEMICIRCLE_DOWN_XL: {
        spd: 8,
        bullet: BULLET_DEF.EN_R_48,
        cnt: 90 - 90,
    },
    SEMICIRCLE_DOWN_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_G_48,
        cnt: 90 - 90,
    },
    SEMICIRCLE_DOWN_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_G_24,
        cnt: 90 - 90,
    },
    SEMICIRCLE_DOWN_LEFT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_G_48,
        cnt: 135 - 90,
    },
    SEMICIRCLE_DOWN_LEFT_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_G_24,
        cnt: 135 - 90,
    },
    SEMICIRCLE_LEFT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_G_48,
        cnt: 180 - 90,
    },
    SEMICIRCLE_LEFT_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_G_24,
        cnt: 180 - 90,
    },
    SEMICIRCLE_UP_LEFT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_G_48,
        cnt: 225 - 90,
    },
    SEMICIRCLE_UP_LEFT_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_G_24,
        cnt: 225 - 90,
    },

    // 
    SPIRAL_LEFT_XL: {
        spd: 10,
        bullet: BULLET_DEF.EN_R_48,
        cnt: -4,
    },
    SPIRAL_LEFT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_M_48,
        cnt: -4,
    },
    SPIRAL_LEFT_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_M_24,
        cnt: -4,
    },
    SPIRAL_RIGHT_XL: {
        spd: 12,
        bullet: BULLET_DEF.EN_R_48,
        cnt: 4,
    },
    SPIRAL_RIGHT_L: {
        spd: 12,
        bullet: BULLET_DEF.EN_M_48,
        cnt: 4,
    },
    SPIRAL_RIGHT_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_M_24,
        cnt: 4,
    },

    //
    DEGREE_N: {
        spd: 16,
        bullet: BULLET_DEF.EN_M_24,
        cnt: 4,
    },
});

const EN_DEF = defineEnum({
    /**
     * 直進
     * 初期位置で進行方向が決まる
     */
    ENEMY00_0: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 2,
        pts: 10,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 90,
        shotBurst: 5,
    },
    /**
     * 直進
     * ゆっくり
     * 硬い
     * 8方向へ弾を撃つ
     * 初期位置で進行方向が決まる
     */
    ENEMY00_1: {
        sprName: "enemy04",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 4,
        life: 10,
        pts: 10,
        item: true,

        shotType: SHOT_TYPE.WAY_OF_8_N,
        shotInterval: 60,
        shotBurst: 1,
    },
    /**
     * 直進
     * 硬い
     * 弾を撃たない
     * 初期位置で進行方向が決まる
     */
    ENEMY00_2_N: {
        sprName: "enemy07",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 2,
        life: 10,
        pts: 10,
        item: false,

        shotType: SHOT_TYPE.NONE,
        shotInterval: 90,
        shotBurst: 5,
    },
    /**
     * 直進
     * 事実上無敵
     * ボム以外では多分壊れない
     * 弾を撃たない
     * 初期位置で進行方向が決まる
     */
    ENEMY00_2_H: {
        sprName: "enemy07",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 65 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 2,
        life: 100,
        pts: 10,
        item: true,

        shotType: SHOT_TYPE.NONE,
        shotInterval: 90,
        shotBurst: 5,
    },
    /**
     * 直進
     * 左回りの螺旋状に弾を撃つ
     * 初期位置で進行方向が決まる
     */
    ENEMY00_3_LEFT: {
        sprName: "enemy02",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 16, y: -16 }, radius: 40 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -12, y: 20 }, radius: 40 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 2,
        pts: 10,
        item: true,

        shotType: SHOT_TYPE.SPIRAL_LEFT_N,
        shotInterval: 3,
        shotBurst: 0,
    },
    /**
     * 直進
     * 左回りの螺旋状に弾を撃つ
     * 初期位置で進行方向が決まる
     */
    ENEMY00_3_RIGHT: {
        sprName: "enemy02",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 16, y: -16 }, radius: 40 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -12, y: 20 }, radius: 40 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 2,
        pts: 10,
        item: true,

        shotType: SHOT_TYPE.SPIRAL_RIGHT_N,
        shotInterval: 3,
        shotBurst: 0,
    },

    /**
     * 斜め
     * 初期位置で進行方向が決まる
     */
    ENEMY01_0: {
        sprName: "enemy03",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -8, y: -40 }, radius: 24 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 24 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 32 }, radius: 24 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 2,
        pts: 20,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 60,
        shotBurst: 1,
    },
    /**
     * 斜め
     * 画面左右端で反射
     * 初期位置で進行方向が決まる
     */
    ENEMY01_1: {
        sprName: "enemy03",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -8, y: -40 }, radius: 24 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 24 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 32 }, radius: 24 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 60,
        shotBurst: 1,
    },
    /**
     * 追尾
     * １回曲がる
     */
    ENEMY02_0: {
        sprName: "enemy05",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -32, y: 16 }, radius: 28 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 38 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 32, y: -8 }, radius: 28 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 45,
        shotBurst: 1,

        turn: 1,
    },
    /**
     * 追尾
     * ２回曲がる
     */
    ENEMY02_1: {
        sprName: "enemy05",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -32, y: 16 }, radius: 28 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 38 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 32, y: -8 }, radius: 28 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.WAY_OF_8_N,
        shotInterval: 45,
        shotBurst: 1,

        turn: 2,
    },
    /**
     * 追尾
     * 4回曲がる
     */
    ENEMY02_2: {
        sprName: "enemy05",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -32, y: 16 }, radius: 28 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 38 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 32, y: -8 }, radius: 28 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.WAY_OF_16_N,
        shotInterval: 60,
        shotBurst: 2,

        turn: 4,
    },
    /**
     * 自機の近くで反転
     * 軸で距離を判定
     * 反転時に弾を撃つ
     */
    ENEMY03_0: {
        sprName: "enemy06",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SECTOR_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    /**
     * 自機の近くで反転
     * 円で距離を判定
     * 反転時に弾を撃つ
     */
    ENEMY03_1: {
        sprName: "enemy06",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SECTOR_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    /**
     * 自機に接近したら自機の方向へ進路変更
     * 軸で距離を判定
     * 一時停止時に弾を撃つ
     */
    ENEMY04_0: {
        sprName: "enemy08",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    /**
     * 自機に接近したら自機の方向へ進路変更
     * 円で距離を判定
     * 一時停止時に弾を撃つ
     */
    ENEMY04_1: {
        sprName: "enemy08",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    /**
     * 
     */
    ENEMY05: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 24,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SEMICIRCLE_DOWN_N,
        shotInterval: 10,
        shotBurst: 1,
    },
    ENEMY06: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.WAY_OF_32_N,
        shotInterval: 1,
        shotBurst: 1,
    },
    ENEMY07: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 2,
    },
    ENEMY08: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    ENEMY09: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    ENEMY10: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    ENEMY99: {
        sprName: "enemy01",
        sprSize: { x: 256, y: 256 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,
        item: true,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,
    },

    // ボス用ザコ
    BOSS_ZAKO01_0: {
        sprName: "enemy08",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.BOSS_ZAKO,
        isBossZako: true,
        spd: 8,
        life: 10,
        pts: 30,
        item: false,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 30,
        shotBurst: 1,
    },
    BOSS_ZAKO02_0: {
        sprName: "enemy08",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.BOSS_ZAKO,
        isBossZako: true,
        spd: 8,
        life: 10,
        pts: 30,
        item: false,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 30,
        shotBurst: 1,
    },

    BOSS_ZAKO01_1: {
        sprName: "enemy08",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.BOSS_ZAKO,
        isBossZako: true,
        spd: 8,
        life: 20,
        pts: 30,
        item: false,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 30,
        shotBurst: 2,
    },
    BOSS_ZAKO02_1: {
        sprName: "enemy08",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.BOSS_ZAKO,
        isBossZako: true,
        spd: 8,
        life: 20,
        pts: 30,
        item: false,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 30,
        shotBurst: 2,
    },

    BOSS_ZAKO01_2: {
        sprName: "enemy08",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.BOSS_ZAKO,
        isBossZako: true,
        spd: 8,
        life: 30,
        pts: 30,
        item: false,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 30,
        shotBurst: 3,
    },
    BOSS_ZAKO02_2: {
        sprName: "enemy08",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.BOSS_ZAKO,
        isBossZako: true,
        spd: 8,
        life: 30,
        pts: 30,
        item: false,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 30,
        shotBurst: 3,
    },

    // ボス
    BOSS01: {
        sprName: "boss01",
        sprSize: { x: 256, y: 256 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -40, y: 20 }, radius: 44 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 40 }, radius: 44 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 40, y: 20 }, radius: 44 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 100,
        pts: 1000,
        item: false,
    },
    BOSS02: {
        sprName: "boss02",
        sprSize: { x: 256, y: 256 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128 + 40, y: 0 }, radius: 40 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -16, y: -4 }, radius: 80 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 96, y: -4 }, radius: 48 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 500,
        pts: 2000,
        item: false,
    },
    BOSS01MOD: {
        sprName: "boss03",
        sprSize: { x: 384, y: 384 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -64, y: -64 }, radius: 96 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -48, y: 64 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 48, y: -64 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 80, y: 32 }, radius: 96 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 600,
        pts: 3000,
        item: false,
    },
    BOSS02MOD: {
        sprName: "boss04",
        sprSize: { x: 384, y: 384 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -48, y: 0 - 8 }, radius: 128 + 8 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 - 16 }, radius: 128 + 16 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 48, y: 0 - 24 }, radius: 128 + 8 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 700,
        pts: 4000,
        item: false,
    },
    BOSS03MOD: {
        sprName: "boss05",
        sprSize: { x: 512, y: 512 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 24, y: -128 + 16 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 128 - 16 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: 256 - 96 }, radius: 48 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -80 }, radius: 48 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 256 - 90 }, radius: 32 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 800,
        pts: 10000,
        item: false,
    },
    BOSS04: {
        sprName: "boss06",
        sprSize: { x: 512, y: 512 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 128 + 32 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128 + 16, y: 128 - 8 }, radius: 64 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 128 }, radius: 64 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128 - 16, y: 128 - 8 }, radius: 64 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128 - 56, y: 128 - 32 - 8 }, radius: 64 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128 + 56, y: 128 - 32 - 16 }, radius: 64 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128 - 16, y: -256 + 104 }, radius: 40 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128 + 16 + 4, y: -256 + 112 }, radius: 40 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 1000,
        pts: 20000,
        item: false,
    },

    // アイテム
    ITEM_SHOT: {
        sprName: "item_shot",
        sprSize: { x: 64, y: 64 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
        item: false,
    },
    ITEM_SPEED: {
        sprName: "item_speed",
        sprSize: { x: 64, y: 64 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
        item: false,
    },
    ITEM_BOMB: {
        sprName: "item_bomb",
        sprSize: { x: 64, y: 64 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
        item: false,
    },
    ITEM_LIFE: {
        sprName: "item_life",
        sprSize: { x: 64, y: 64 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
        item: false,
    },
    ITEM_FAIRY: {
        sprName: "item_fairy",
        sprSize: { x: 64, y: 64 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
        item: false,
    },
});
