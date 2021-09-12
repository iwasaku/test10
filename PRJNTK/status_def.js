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

const BB_STATUS = defineEnum({
    WAIT: {
        value: 0,
        string: 'init'
    },
    START: {
        value: 1,
        string: 'start'
    },
    END: {
        value: 2,
        string: 'end'
    },
});
