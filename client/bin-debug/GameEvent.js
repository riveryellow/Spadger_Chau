var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvents = (function () {
    function GameEvents() {
    }
    GameEvents.EVT_SHOW_DIALOG = "EVT_SHOW_DIALOG";
    GameEvents.EVT_LOAD_PAGE = "EVT_LOAD_PAGE";
    GameEvents.WS_ENTER_ROOM = "WS_ENTER_ROOM";
    GameEvents.WS_READY = "WS_READY";
    GameEvents.WS_START = "WS_START";
    GameEvents.pageReadyHandler = "pageReadyHandler";
    return GameEvents;
}());
__reflect(GameEvents.prototype, "GameEvents");
