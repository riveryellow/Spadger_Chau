class GameMode{
    public static billingMode = 1;// 1:aa 2:房主
    public static type = 121;// 121:红中发财 122:前痞后赖 123 武汉晃晃
    public static winPoints = 1; //1 16 32 64
    public static limitPoints = 300; //300 500
    public static pointType = 131;// 131 132
    public static totalNum = 4;
    public static roomId;
    public static wechatId;
    public static inRoom = false;
    public static playerList = [];
    public static isDiscard = false;
    public static joker = []; //赖子
    public static jokerPi = []; //皮
    public static bgmSwitch = false;
    public static soundEffectSwitch = true; 
    public static pos = '';
    public static draw = -1; //出的牌
    public static isSP = false; // 只有特殊操作的时候才可以选中多张
    public static gangNum = -1;
    public static chiNum = -1;
    public static canChowChoice = [[]];
    public static option = [];
    public static currentPlayer = '';
    public static upList = [];
    public static userInfo = {};
    public static startGame = false;
}