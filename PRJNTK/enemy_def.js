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
