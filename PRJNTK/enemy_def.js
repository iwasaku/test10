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
    },
    SNIPE_N: {
        spd: 16,
    },
    SNIPE_H: {
        spd: 24,
    },
    WAY_OF_4_N: {
        spd: 16,
        cnt: 4,
    },
    WAY_OF_8_N: {
        spd: 16,
        cnt: 8,
    },
    WAY_OF_16_N: {
        spd: 16,
        cnt: 16,
    },
    WAY_OF_32_N: {
        spd: 16,
        cnt: 32,
    },
    SECTOR_UP_N: {
        spd: 16,
        cnt: 270 - 45,
    },
    SECTOR_DOWN_N: {
        spd: 16,
        cnt: 90 - 45,
    },
    SECTOR_LEFT_N: {
        spd: 16,
        cnt: 180 - 45,
    },
    SECTOR_RIGHT_N: {
        spd: 16,
        cnt: 0 - 45,
    },
    SECTOR_DIR_N: {
        spd: 16,
    },
    SEMICIRCLE_UP_N: {
        spd: 16,
        cnt: 270 - 90,
    },
    SEMICIRCLE_DOWN_N: {
        spd: 12,
        cnt: 90 - 90,
    },
    SEMICIRCLE_LEFT_N: {
        spd: 16,
        cnt: 180 - 90,
    },
    SEMICIRCLE_RIGHT_N: {
        spd: 16,
        cnt: 0 - 90,
    },
    SPIRAL_LEFT_N: {
        spd: 16,
        cnt: -4,
    },
    SPIRAL_RIGHT_N: {
        spd: 16,
        cnt: 4,
    },
    DEGREE_N: {
        spd: 16,
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

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 90,
        shotBurst: 5,
    },
    /**
     * 直進
     * ゆっくり
     * 硬い
     * 初期位置で進行方向が決まる
     */
    ENEMY00_1: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 4,
        life: 10,
        pts: 10,

        shotType: SHOT_TYPE.WAY_OF_8_N,
        shotInterval: 60,
        shotBurst: 1,
    },
    /**
     * 直進
     * 軟い
     * 弾を撃たない
     * 初期位置で進行方向が決まる
     */
    ENEMY00_2: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 2,
        pts: 10,

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
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 2,
        pts: 10,

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
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 2,
        pts: 10,

        shotType: SHOT_TYPE.SPIRAL_RIGHT_N,
        shotInterval: 3,
        shotBurst: 0,
    },

    /**
     * 斜め
     * 初期位置で進行方向が決まる
     */
    ENEMY01_0: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 2,
        pts: 20,

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
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 60,
        shotBurst: 1,
    },
    /**
     * 追尾
     * １回曲がる
     */
    ENEMY02_0: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,

        turn: 1,
    },
    /**
     * 追尾
     * ２回曲がる
     */
    ENEMY02_1: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,

        shotType: SHOT_TYPE.WAY_OF_16_N,
        shotInterval: 5,
        shotBurst: 1,

        turn: 2,
    },
    /**
     * 自機の近くで反転
     * 軸で距離を判定
     * 反転時に弾を撃つ
     */
    ENEMY03_0: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,

        shotType: SHOT_TYPE.SECTOR_DOWN_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    /**
     * 自機の近くで反転
     * 円で距離を判定
     * 反転時に弾を撃つ
     */
    ENEMY03_1: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,
    },
    /**
     * 自機に接近したら自機の方向へ進路変更
     * 軸で距離を判定
     * 一時停止時に弾を撃つ
     */
    ENEMY04_0: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,

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
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ENEMY,
        spd: 8,
        life: 3,
        pts: 30,

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

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 5,
        shotBurst: 1,
    },

    // ボス用ザコ
    BOSS_ZAKO01: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.BOSS_ZAKO,
        isBossZako: true,
        spd: 8,
        life: 3,
        pts: 30,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 30,
        shotBurst: 1,
    },
    BOSS_ZAKO02: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.BOSS_ZAKO,
        isBossZako: true,
        spd: 8,
        life: 3,
        pts: 30,

        shotType: SHOT_TYPE.SNIPE_N,
        shotInterval: 30,
        shotBurst: 1,
    },

    // ボス
    BOSS01: {
        sprName: "boss01",
        sprSize: { x: 256, y: 256 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 2,
        pts: 20000,
    },
    BOSS01MOD: {
        sprName: "boss04",
        sprSize: { x: 384, y: 384 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
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
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 2,
        pts: 20000,
    },
    BOSS02MOD: {
        sprName: "boss06",
        sprSize: { x: 512, y: 512 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
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
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 2,
        pts: 20000,
    },
    BOSS03MOD: {
        sprName: "boss07",
        sprSize: { x: 640, y: 640 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 100,
        pts: 20000,
    },
    BOSS04: {
        sprName: "boss05",
        sprSize: { x: 512, y: 512 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: -128, y: -128 }, radius: 128 },
            { attr: COLLI_ATTR.BOTH, ofs: { x: 128, y: 128 }, radius: 128 },
        ],
        attr: EN_ATTR.BOSS,
        spd: 8,
        life: 2,
        pts: 20000,
    },

    // アイテム
    ITEM_SHOT: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
    },
    ITEM_SPEED: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
    },
    ITEM_BOMB: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
    },
    ITEM_LIFE: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
    },
    ITEM_LIFE_MAX: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
    },
    ITEM_FAIRY: {
        sprName: "enemy01",
        sprSize: { x: 128, y: 128 },
        colliData: [
            { attr: COLLI_ATTR.BOTH, ofs: { x: 0, y: 0 }, radius: 64 },
        ],
        attr: EN_ATTR.ITEM,
        spd: 8,
        life: 0,
        pts: 0,
    },
});
