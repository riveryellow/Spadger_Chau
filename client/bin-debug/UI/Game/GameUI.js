var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        _this.posSource1 = ['xi_zhongjian_png', 'bei_zhongjian_png', 'dong_zhongjian_png', 'nan_zhongjian_png'];
        _this.posSource2 = ['bei_zhongjian_png', 'dong_zhongjian_png', 'nan_zhongjian_png', 'xi_zhongjian_png'];
        _this.posSource3 = ['dong_zhongjian_png', 'nan_zhongjian_png', 'xi_zhongjian_png', 'bei_zhongjian_png'];
        _this.posSource4 = ['nan_zhongjian_png', 'xi_zhongjian_png', 'bei_zhongjian_png', 'dong_zhongjian_png'];
        _this.posbgSource1 = ['xi_zhongjian_select_png', 'bei_zhongjian_select_png', 'dong_zhongjian_select_png', 'nan_zhongjian_select_png'];
        _this.posbgSource2 = ['bei_zhongjian_select_png', 'dong_zhongjian_select_png', 'nan_zhongjian_select_png', 'xi_zhongjian_select_png'];
        _this.posbgSource3 = ['dong_zhongjian_select_png', 'nan_zhongjian_select_png', 'xi_zhongjian_select_png', 'bei_zhongjian_select_png'];
        _this.posbgSource4 = ['nan_zhongjian_select_png', 'xi_zhongjian_select_png', 'bei_zhongjian_select_png', 'dong_zhongjian_select_png'];
        _this._cardStatuslist = [];
        _this.startPosition = [
            { x: 158, y: 576 },
            { x: 158, y: 330 },
            { x: 563, y: 106 },
            { x: 892, y: 305 },
        ];
        _this._discardList0 = [];
        _this._discardList1 = [];
        _this._discardList2 = [];
        _this._discardList3 = [];
        _this._discardSPList0 = [];
        _this._discardSPList1 = [];
        _this._discardSPList2 = [];
        _this._discardSPList3 = [];
        _this.canDiscard = false;
        _this._joker = [];
        _this._jokerPi = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/eui_game/skins/gameSkin.exml";
        return _this;
    }
    GameUI.prototype.uiCompHandler = function () {
        // headIconList
        /// 填充数据
        this.initGameUI();
        this.createListener();
    };
    GameUI.prototype.createListener = function () {
        this._setting.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            MessageCenter.getInstance().sendMessage(GameEvents.TOGGLE_SETTING, null);
        }, this);
    };
    // 加入游戏
    GameUI.prototype.joinGame = function () {
        var _this = this;
        if (this.contains(this._gameOverUI)) {
            this.removeChild(this._gameOverUI);
        }
        console.log('joinGame', GameMode.playerList);
        var that = this;
        // if (this.contains(this._gameBox)){
        //     this.removeChild(this._gameBox);
        // }
        // this._gameBox = new eui.Component();
        this._gameBox.removeChildren();
        GameMode.playerList.map(function (v, k) {
            if (v) {
                _this["_icon" + k] = new FriendIcon(1, __assign({}, GameMode.playerList[k], _this.startPosition[k]));
                that._gameBox.addChild(_this["_icon" + k]);
            }
        });
        // this.addChild(this._gameBox);
    };
    GameUI.prototype.getdiscardSPs = function (evt) {
        var _this = this;
        console.log('getdiscardSPs', evt);
        var playsInfo = evt.data.playsInfo;
        playsInfo.map(function (v) {
            var pos = 0;
            GameMode.playerList.forEach(function (val, k) {
                if (val.wechatId == v.wechatId) {
                    pos = k;
                }
            });
            _this["_discardSPList" + pos] = v.actionCardList;
        }, this);
        // this[`_discardSPList${pos}`].push(actionResult);
        this.drawDiscardSPs();
        this.drawOtherCard(playsInfo);
    };
    // 画丢弃的牌
    GameUI.prototype.drawDiscardSPs = function () {
        var _this = this;
        // this.removeChild(this._discardSPsBox);
        // this._discardSPsBox = new eui.Component();
        // this.addChild(this._discardSPsBox);
        this._discardSPsBox.removeChildren();
        var sum0 = 0;
        var sum01 = 0;
        var sum1 = 0;
        var sum11 = 0;
        var sum2 = 0;
        var sum21 = 0;
        var sum3 = 0;
        var sum31 = 0;
        var scale = 0.4;
        var desy = 55;
        this._discardSPList0.filter(function (v) { return GameMode.jokerPi.indexOf(v[0]) == -1; }).forEach(function (value, key) {
            value.forEach(function (v, k) {
                var discardSP = new CardUI(1, v, 0, scale);
                discardSP.x = 1194 - (k + key * 0.1 + sum0) * 79 * scale;
                discardSP.y = 625;
                _this._discardSPsBox.addChild(discardSP);
            });
            sum0 += value.length;
        });
        // 0的皮上移
        this._discardSPList0.filter(function (v) { return GameMode.jokerPi.indexOf(v[0]) > -1; }).forEach(function (value, key) {
            value.forEach(function (v, k) {
                var discardSP = new CardUI(1, v, 0, scale);
                discardSP.x = 1194 - (k + key * 0.1 + sum01) * 79 * scale;
                discardSP.y = 625 - desy;
                _this._discardSPsBox.addChild(discardSP);
            });
            sum01 += value.length;
        });
        this._discardSPList3.filter(function (v) { return GameMode.jokerPi.indexOf(v[0]) == -1; }).forEach(function (value, key) {
            var arr = value.find(function (v) { return v == -1; }) ? [-1, -1, -1, -1] : value;
            arr.forEach(function (v, k) {
                var discardSP = new CardUI(1, v, 1, scale);
                discardSP.x = 195;
                discardSP.y = 562 - (k + key * 0.1 + sum1) * 79 * scale;
                _this._discardSPsBox.addChild(discardSP);
            });
            sum1 += value.length;
        });
        this._discardSPList3.filter(function (v) { return GameMode.jokerPi.indexOf(v[0]) > -1; }).forEach(function (value, key) {
            value.forEach(function (v, k) {
                var discardSP = new CardUI(1, v, 1, scale);
                discardSP.x = 195 + desy;
                discardSP.y = 562 - (k + key * 0.1 + sum11) * 79 * scale;
                _this._discardSPsBox.addChild(discardSP);
            });
            sum11 += value.length;
        });
        this._discardSPList2.filter(function (v) { return GameMode.jokerPi.indexOf(v[0]) == -1; }).forEach(function (value, key) {
            var arr = value.find(function (v) { return v == -1; }) ? [-1, -1, -1, -1] : value;
            arr.forEach(function (v, k) {
                var discardSP = new CardUI(1, v, 2, scale);
                discardSP.x = 1194 - (k + key * 0.1 + sum2) * 79 * scale;
                discardSP.y = 128;
                _this._discardSPsBox.addChild(discardSP);
            });
            sum2 += value.length;
        });
        this._discardSPList2.filter(function (v) { return GameMode.jokerPi.indexOf(v[0]) > -1; }).forEach(function (value, key) {
            value.forEach(function (v, k) {
                var discardSP = new CardUI(1, v, 2, scale);
                discardSP.x = 1194 - (k + key * 0.1 + sum21) * 79 * scale;
                discardSP.y = 128 + desy;
                _this._discardSPsBox.addChild(discardSP);
            });
            sum21 += value.length;
        });
        this._discardSPList1.filter(function (v) { return GameMode.jokerPi.indexOf(v[0]) == -1; }).forEach(function (value, key) {
            var arr = value.find(function (v) { return v == -1; }) ? [-1, -1, -1, -1] : value;
            arr.forEach(function (v, k) {
                var discardSP = new CardUI(1, v, 3, scale);
                discardSP.x = 1150;
                discardSP.y = 554 - (k + key * 0.1 + sum3) * 79 * scale;
                _this._discardSPsBox.addChild(discardSP);
            });
            sum3 += value.length;
        });
        this._discardSPList1.filter(function (v) { return GameMode.jokerPi.indexOf(v[0]) > -1; }).forEach(function (value, key) {
            value.forEach(function (v, k) {
                var discardSP = new CardUI(1, v, 3, scale);
                discardSP.x = 1150 - desy;
                discardSP.y = 554 - (k + key * 0.1 + sum31) * 79 * scale;
                _this._discardSPsBox.addChild(discardSP);
            });
            sum31 += value.length;
        });
    };
    GameUI.prototype.getCard = function (evt) {
        var _this = this;
        console.log('getCard', evt);
        // 画牌  
        var cards = this.getCards(evt.data.cards);
        var discardList = evt.data.discard;
        this._gameBox.removeChild(this.cardsBox);
        this.cardsBox = new eui.Component();
        this.drawCard(cards);
        this._gameBox.addChild(this.cardsBox);
        // 弃牌
        this.discardBox.removeChildren();
        discardList.map(function (v) {
            var pos = 0;
            GameMode.playerList.forEach(function (val, k) {
                if (v.wechatId == val.wechatId) {
                    pos = k;
                }
            });
            _this["_discardList" + pos] = v.disCardsNum;
            _this.drawDiscard(_this["_discardList" + pos], pos);
            // this._gameBox.addChild(this.discardBox);
        });
        // if (evt.data.discard && evt.data.discard>0){
        //     var discard = evt.data.discard;
        //     // this._gameBox.removeChild(this.discardBox);
        //     var posName = evt.data.prevailing;
        //     var pos = 0;
        //     GameMode.playerList.forEach((v,k)=>{
        //         if (v.wechatId == posName){
        //             pos = k;
        //         }
        //     });
        //     this[`_discardList${pos}`].push(discard);
        //     this.drawDiscard(this[`_discardList${pos}`],pos);
        //     // this._gameBox.addChild(this.discardBox);
        // }
        this.drawOtherCard(evt.data.discard);
    };
    GameUI.prototype.dropCard = function (pos, num) {
    };
    // 所有牌倒下
    GameUI.prototype.downCards = function (evt) {
        this.cardsBox.$children.forEach(function (v) {
            v.downCard();
        });
    };
    // 显示吃胡碰杠
    GameUI.prototype.showDiscardStatus = function (evt) {
        console.log('showDiscardStatus', evt);
        // 当可以吃多种牌的情况为sp
        GameMode.isSP = true;
        var option = evt.data.option;
        this._discardStatusUI = new DiscardStatusUI(option);
        this.addChild(this._discardStatusUI);
    };
    GameUI.prototype.chatBox = function () {
        this._chatUI = new ChatUI();
        this.addChild(this._chatUI);
    };
    GameUI.prototype.sendMsg = function (info, name) {
        this._chatUI.sendMsg(info);
    };
    GameUI.prototype.hideDiscardsp = function (evt) {
        // 关闭状态
        console.log('hideDiscardsp');
        if (this.contains(this._discardStatusUI)) {
            this.removeChild(this._discardStatusUI);
        }
    };
    GameUI.prototype.initGameUI = function () {
        var _this = this;
        GameMode.startGame = true;
        this._gameBox = new eui.Component();
        this._discardSPsBox = new eui.Component();
        this._otherCardBox = new eui.Component();
        this.discardBox = new eui.Component();
        this.addChild(this._otherCardBox);
        this.addChild(this._gameBox);
        this.addChild(this._discardSPsBox);
        this.addChild(this.discardBox);
        this._roomId.text = GameMode.roomId;
        this._total.text = GameMode.totalCard;
        var that = this;
        console.log('dslist', GameMode.playerList);
        this._gameinfo.text = GameMode.gameInfo;
        GameMode.playerList.map(function (v, k) {
            if (v) {
                _this["_icon" + k] = new FriendIcon(1, __assign({}, GameMode.playerList[k], _this.startPosition[k]));
                that._gameBox.addChild(_this["_icon" + k]);
            }
        });
        this._start.enabled = false;
        //聊天框
        this.chatBox();
        this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleStart, this);
        this._ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleReady, this);
        this._invest.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { alert("\u623F\u95F4\u53F7\u4E3A" + GameMode.roomId); }, this);
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHome, this);
        this._chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this._chatUI.toggleVisible, this._chatUI);
        this._useTool.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            MessageCenter.getInstance().sendMessage(GameEvents.TOGGLE_USETOOL, null);
            console.log('start');
        }, this);
        // 开始游戏  分享
        this.addEventListener(GameEvents.EVT_LOAD_PAGE, this.startGameUI, this);
    };
    GameUI.prototype.backHome = function (e) {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, { type: GamePages.BACK_HOME });
    };
    GameUI.prototype.setZj = function (pos) {
        console.log('setzj', pos);
        var posNum = pos - 1;
        this["_zjbg1"].source = this.posSource1[posNum];
        this["_zjbg2"].source = this.posSource2[posNum];
        this["_zjbg3"].source = this.posSource3[posNum];
        this["_zjbg4"].source = this.posSource4[posNum];
        this["_zj1"].source = this.posbgSource1[posNum];
        this["_zj2"].source = this.posbgSource2[posNum];
        this["_zj3"].source = this.posbgSource3[posNum];
        this["_zj4"].source = this.posbgSource4[posNum];
    };
    // 显示中间的方向
    GameUI.prototype.showZj = function (num) {
        console.log('showzj', num);
        this["_zj1"].visible = false;
        this["_zj2"].visible = false;
        this["_zj3"].visible = false;
        this["_zj4"].visible = false;
        var shownum = num;
        if (num == 2) {
            shownum = 4;
        }
        if (num == 4) {
            shownum = 2;
        }
        this["_zj" + shownum].visible = true;
        this._total.text = "" + GameMode.totalCard;
    };
    GameUI.prototype.sendCardStatus = function (evt) {
        console.log('cardStatus', evt);
        this.showDiscardStatus(evt.data.option);
    };
    GameUI.prototype.startGameUI = function (evt) {
        console.log('startGameUI', evt.data, GameMode.playerList);
        this.joinGame();
        if (GameMode.option.length > 0) {
            // 断线重连
            MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDSTATUS, { option: GameMode.option });
        }
        if (GameMode.currentPlayer) {
            MessageCenter.getInstance().sendMessage(GameEvents.WS_GET_DISCARDPOS, { pos: GameMode.currentPlayer });
        }
        this.setZj(evt.data.model.pos);
        this.showZj(evt.data.model.pos);
        if (evt.data.model.pos == 1) {
            GameMode.isDiscard = true;
        }
        // 画赖子
        var jokerDisplay = new CardUI(2, GameMode.joker[0]);
        jokerDisplay.x = 1222;
        jokerDisplay.y = 445;
        jokerDisplay.scaleX = 0.7;
        jokerDisplay.scaleY = 0.7;
        this.addChild(jokerDisplay);
        // 倒数计时
        // this.count();
        var position = [
            { x: 60, y: 597 },
            { x: 60, y: 293 },
            { x: 206, y: 50 },
            { x: 1209, y: 295 },
        ];
        this._icon0.changeSkin(position[0]);
        this._icon1.changeSkin(position[3]);
        this._icon2.changeSkin(position[2]);
        this._icon3.changeSkin(position[1]);
        var models = evt.data.model.cards;
        var cards = this.getCards(models);
        // 移除按钮
        this.removeChild(this._ready);
        this.removeChild(this._start);
        this.removeChild(this._invest);
        // 画牌
        this.cardsBox = new eui.Component();
        console.log(cards);
        this.drawCard(cards);
        this._gameBox.addChild(this.cardsBox);
        // 画其他三家
        this.drawOtherCard(evt.data.discard);
        // 弃牌
        // this._gameBox.addChild(this.discardBox);
    };
    //获取当前出牌人位置
    GameUI.prototype.getdiscardPos = function (evt) {
        console.log('getdiscardPos', evt);
        // 重新定位后重新计时
        // this.count();
        var pos = 1;
        GameMode.playerList.forEach(function (v, k) {
            if (v.wechatId == evt.data.pos) {
                switch (k) {
                    case 0:
                        pos = 1;
                        GameMode.isDiscard = true;
                        break;
                    case 1:
                        pos = 4;
                        break;
                    case 2:
                        pos = 3;
                        break;
                    case 3:
                        pos = 2;
                        break;
                }
            }
        });
        this.showZj(pos);
    };
    // 倒计时 自动出牌
    GameUI.prototype.count = function () {
        var _this = this;
        var num = 30;
        if (this.countlistener) {
            clearInterval(this.countlistener);
        }
        this.countlistener = setInterval(function () {
            // console.log('num',num)
            if (num < 1 && GameMode.isDiscard) {
                MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_CARD, { discardNum: GameMode.draw });
            }
            else {
                _this._count.text = "" + num--;
            }
        }, 1000);
    };
    // 获取
    GameUI.prototype.getCards = function (arr) {
        var res = [];
        // if ((!GameMode.draw || GameMode.draw==-1)&& GameMode.isDiscard&& GameMode.startGame) {
        //     arr.forEach((v,k)=>{
        //         if (v>0){
        //             GameMode.draw = k;
        //         }
        //     });
        //     GameMode.startGame = false;
        // }
        // 如果是要出的牌剔除
        arr = arr.map(function (v, k) {
            if (k == GameMode.draw) {
                return v - 1;
            }
            else {
                return v;
            }
        });
        arr.forEach(function (val, key) {
            while (val > 0) {
                res.push(key);
                val--;
            }
        });
        console.log(res);
        return res;
    };
    // 准备
    GameUI.prototype.changeReady = function (info) {
        if (info.readyNum >= GameMode.totalNum) {
            this._start.$children[0].source = 'yellow_btn_png';
            this._start.enabled = true;
        }
        if (GameMode.wechatId == info.player) {
            this._ready.$children[0].source = 'yellow_btn_down_png';
            this._ready.$children[1].text = "已准备";
            this._ready.enabled = false;
        }
    };
    // 游戏结束
    GameUI.prototype.gameOver = function (evt) {
        console.log('gameOver', evt);
        var info = evt.data.info;
        var point = info.model.filter(function (v) { return v.wechatId == GameMode.wechatId; })[0]['points'];
        var gameoverInfo = {
            status: parseInt(point),
            type: info.huType,
            result: info.model,
        };
        this._gameOverUI = new GameOverUI(gameoverInfo);
        this.addChild(this._gameOverUI);
    };
    GameUI.prototype.handleStart = function (e) {
        MessageCenter.getInstance().sendMessage(GameEvents.WS_START, { id: GameMode.roomId });
        window.setWxShare({
            title: "\u623F\u95F4\u53F7" + GameMode.roomId + ",\u8FDB\u5165\u6E38\u620F\u540E\u52A0\u5165\u623F\u95F4",
            img: 'http://game.goodluck78.com/wechat/content/images/img-logo.png',
        });
    };
    GameUI.prototype.handleReady = function (e) {
        MessageCenter.getInstance().sendMessage(GameEvents.WS_READY, { id: GameMode.roomId });
    };
    GameUI.prototype.drawCard = function (cards) {
        var _this = this;
        var des = 80;
        // joker
        this._joker = [];
        this._jokerPi = [];
        var isShowDraw = false;
        this.hideChowChoice();
        //画pi
        cards.filter(function (value, key) {
            if (GameMode.joker.length > 0 && GameMode.joker.indexOf(value) >= 0) {
                _this._joker.push(value);
            }
            else if (GameMode.jokerPi.length > 0 && GameMode.jokerPi.indexOf(value) >= 0) {
                _this._jokerPi.push(value);
            }
            return GameMode.joker.length > 0 && GameMode.joker.indexOf(value) >= 0;
        }).forEach(function (value, key) {
            var card = new CardUI(2, value);
            var scale = 0.9;
            card.scaleX = scale;
            card.scaleY = scale;
            card.x = 159 + key * des * scale;
            card.y = 591;
            _this.cardsBox.addChild(card);
        });
        // jokerpi
        this._jokerPi.forEach(function (value, key) {
            var card = new CardUI(2, value);
            var scale = 0.9;
            card.scaleX = scale;
            card.scaleY = scale;
            card.x = 159 + (key + _this._joker.length) * des * scale;
            card.y = 591;
            _this.cardsBox.addChild(card);
        });
        if (GameMode.draw > 0) {
            var card = new CardUI(2, GameMode.draw);
        }
        console.log('joker', this._joker, this._jokerPi, cards);
        // 普通牌
        cards.filter(function (value) {
            return (GameMode.jokerPi.indexOf(value) < 0 && GameMode.joker.indexOf(value) < 0);
        }).forEach(function (value, key) {
            var card = new CardUI(2, value);
            var scale = 0.9;
            card.scaleX = scale;
            card.scaleY = scale;
            card.x = 159 + (key + _this._jokerPi.length + _this._joker.length) * des * scale;
            card.y = 591;
            _this.cardsBox.addChild(card);
            // 吃的时候弹起
            // if (GameMode.canChowChoice[0].indexOf(value)>-1){
            // GameMode.canChowChoice.forEach((arr)=>{
            //     if ((arr.indexOf(value)>-1)&&(value!=GameMode.actionCard)){
            //         console.log('upcard')
            //         card.upCard();
            //     }
            // })
            // console.log(GameMode.canKongChoice, value)
            // if (GameMode.canKongChoice.indexOf(value)>-1) {
            //     console.log('upcard')
            //     card.upCard();
            // }
            // }
        });
        // 画弹起的吃的牌
        this.showChowChoice();
        // 出牌
        console.log('draw', GameMode.draw);
        if (GameMode.draw > -1) {
            var card = new CardUI(2, GameMode.draw);
            var scale = 0.9;
            card.scaleX = scale;
            card.scaleY = scale;
            card.x = 169 + cards.length * des * scale;
            card.y = 591;
            if (GameMode.canKongChoice.indexOf(GameMode.draw) > -1) {
                console.log('upcard');
                card.upCard();
            }
            this.cardsBox.addChild(card);
        }
    };
    GameUI.prototype.hideChowChoice = function () {
        if (this.contains(this.chowContainer)) {
            this.removeChild(this.chowContainer);
        }
    };
    GameUI.prototype.showChowChoice = function () {
        var _this = this;
        var des = 80;
        this.chowContainer = new eui.Component();
        if (this.contains(this.chowContainer)) {
            this.removeChild(this.chowContainer);
        }
        this.addChild(this.chowContainer);
        if (GameMode.canChowChoice.length > 0) {
            GameMode.canChowChoice.forEach(function (arr, arrkey) {
                arr.map(function (v, k) {
                    var card = new CardUI(2, v);
                    _this.chowContainer.addChild(card);
                    var scale = 0.7;
                    card.scaleX = scale;
                    card.scaleY = scale;
                    card.x = 159 + k * des * scale + arrkey * 20 + arrkey * 3 * des * scale;
                    card.y = 495;
                    card.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        GameMode.chiNum = arrkey;
                        MessageCenter.getInstance().sendMessage(GameEvents.WS_SEND_DISCARDSTATUS, { type: GameEvents.WS_CHI });
                        GameMode.isSP = false;
                        MessageCenter.getInstance().sendMessage(GameEvents.HIDE_DISCARDSP, null);
                    }, _this);
                });
            });
        }
    };
    // 画弃牌
    GameUI.prototype.drawDiscard = function (discards, pos) {
        var _this = this;
        console.log('discardspos=>', pos);
        var desx, desy, startx, starty, type, drection, anchorOffsetX, anchorOffsetY;
        desx = 35;
        desy = 55;
        type = 2;
        switch (pos) {
            case 0:
                startx = 554;
                starty = 424;
                break;
            case 1:
                startx = 776;
                starty = 385;
                break;
            case 2:
                startx = 770;
                starty = 250;
                break;
            case 3:
                startx = 520;
                starty = 256;
                break;
        }
        discards.forEach(function (value, key) {
            var scale = 0.45;
            var showPos = pos;
            if (pos == 1) {
                showPos = 3;
            }
            if (pos == 3) {
                showPos = 1;
            }
            var card = new CardUI(type, value, showPos, scale);
            switch (showPos) {
                case 0:
                    card.x = startx + (key % 8) * desx;
                    card.y = starty + parseInt("" + key / 8) * desy;
                    break;
                case 1:
                    card.x = startx - parseInt("" + key / 5) * desy;
                    card.y = starty + (key % 5) * desx;
                    break;
                case 2:
                    card.x = startx - (key % 8) * desx;
                    card.y = starty - parseInt("" + key / 8) * desy;
                    break;
                case 3:
                    card.x = startx + parseInt("" + key / 5) * desy;
                    card.y = starty - (key % 5) * desx;
                    break;
            }
            _this.discardBox.addChild(card);
        });
    };
    GameUI.prototype.drawOtherCard = function (discardList) {
        // this.removeChild(this._otherCardBox);
        // this._otherCardBox = new eui.Component();
        this._otherCardBox.removeChildren();
        var desX = 29;
        var desY = 52;
        var sumObj = {
            sum1: 0,
            sum2: 0,
            sum3: 0
        };
        // var sum1=0;
        // var sum2=0;
        // var sum3=0;
        discardList.map(function (v) {
            var pos = 0;
            GameMode.playerList.forEach(function (val, k) {
                if (val.wechatId == v.wechatId) {
                    pos = k;
                }
                sumObj["sum" + pos] = v.cardsNum;
            });
        }, this);
        console.log(1111, sumObj);
        for (var cardLength = 0; cardLength < 15; cardLength++) {
            // // 左边
            // this._discardSPList1.forEach((v)=>{
            //     sum3+=v.length;
            // });
            // this._discardSPList2.forEach((v)=>{
            //     sum2+=v.length;
            // });
            // this._discardSPList3.forEach((v)=>{
            //     sum1+=v.length;
            // });
            if (cardLength < sumObj.sum1) {
                var letfCard = new CardUI(5, null);
                letfCard.x = 145;
                letfCard.y = 128 + cardLength * desX;
                this._otherCardBox.addChild(letfCard);
            }
            // 右边
            if (cardLength < sumObj.sum3) {
                var rightCard = new CardUI(5, null);
                rightCard.x = 1168;
                rightCard.y = 128 + cardLength * desX;
                this._otherCardBox.addChild(rightCard);
            }
            // 上面
            if (cardLength < sumObj.sum2) {
                var letfCard = new CardUI(4, null);
                letfCard.x = 322 + cardLength * desY;
                letfCard.y = 53;
                this._otherCardBox.addChild(letfCard);
            }
            // this.addChild(this._otherCardBox);
        }
    };
    GameUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return GameUI;
}(eui.Component));
__reflect(GameUI.prototype, "GameUI");
