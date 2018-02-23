class MainUI extends eui.Component {
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_main/skins/mainSkin.exml";
    }

    uiCompHandler() {
        // header
        this._headui = new HeadUI();

        // _friendListIR
        /// 填充数据
        var dsListFriend:Array<Object> = [
            { icon: "head-i-2_png", name: "伊文捷琳", count: "评价：樱桃小丸子"}
            , { icon: "head-i-2_png", name: "亚特伍德", count: "评价：离了我你不行的" }
            , { icon: "head-i-2_png", name: "伊妮德", count: "评价：猴子请来的逗比"}
            , { icon: "head-i-2_png", name: "鲁宾", count: "评价：我勒个去" }
            , { icon: "head-i-2_png", name: "威弗列德", count: "评价：这货碉堡了" }
            , { icon: "head-i-2_png", name: "史帝文", count: "评价：咖啡不加糖" }
            , { icon: "head-i-2_png", name: "哈瑞斯", count: "评价：猪一样的队友" }
        ];
        this.listFriend.dataProvider = new eui.ArrayCollection( dsListFriend );

        this.listFriend.itemRenderer = FriendIRUI;
        //需要在scroller添加到舞台上面之后再访问verticalScrollBar
        this.addChildAt( this._headui, this.getChildIndex( this.imgBg ) + 1 );

        // 绑定按钮
        this.createRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, this.sendCreateRoom, this );
        this.myRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this );
        this.enterRoom.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );

        // dialog点击
        this._myI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._toolsI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._zhanjiI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._newsI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._playI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );
        this._setI.addEventListener( egret.TouchEvent.TOUCH_TAP, this.dialogHandler, this );

    }

    private sendCreateRoom(evt) {
        var params = JSON.stringify({billingMode:GameMode.billingMode,type:GameMode.type,winPoints:GameMode.winPoints,limitPoints:GameMode.limitPoints});
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(encodeURI(`http://101.37.151.85:8080/socket/create?param=${params}`),egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(evt)=>{
            var response = <egret.HttpRequest>evt.currentTarget;
            var res = JSON.parse(response.response);
            if (res.code == 1) {
                GameMode.roomId = res.result.roomId;
                MessageCenter.getInstance().sendMessage( GameEvents.WS_ENTER_ROOM, {type:GamePages.CREATE_ROOM});
            } else {
                alert('创建房间失败')
            }
        },this);
    }
    private mbtnHandler( evt ):void{
        switch ( evt.currentTarget ){
            case this.createRoom:
                this._pageFocused = GamePages.CREATE_ROOM;
                break;
            case this.enterRoom:
                this._pageFocused = GamePages.ENTER_ROOM ;
                break;
            case this.myRoom:
                this._pageFocused = GamePages.MY_ROOM ;
                break;
        }
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:this._pageFocused});
    }

    private dialogHandler( evt:egret.TouchEvent ):void{
        switch ( evt.currentTarget ){
            case this._myI:
                this._dialogType = DialogTypes.MY;
                break;
            case this._toolsI:
                this._dialogType = DialogTypes.TOOLS ;
                break;
            case this._zhanjiI:
                this._dialogType = DialogTypes.ZHANJI ;
                break;
            case this._newsI:
                this._dialogType = DialogTypes.NEWS;
                break;
            case this._playI:
                this._dialogType = DialogTypes.PLAY ;
                break;
            case this._setI:
                this._dialogType = DialogTypes.SET ;
            case this.enterRoom:
                this._dialogType = DialogTypes.ENTERROOM;
                break;
        }
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_SHOW_DIALOG, {type:this._dialogType,data:{}});
    }

    protected createChildren():void {
        super.createChildren();
    }
    private imgBg;
    private _headui:HeadUI;
    private listFriend:eui.List;
    private createRoom:eui.Button;
    private enterRoom:eui.Button;
    private myRoom:eui.Button;
    private _pageFocused:string;

    private _myI:eui.Button;
    private _toolsI:eui.Button;
    private _zhanjiI:eui.Button;
    private _newsI:eui.Button;
    private _playI:eui.Button;
    private _setI:eui.Button;
    private _dialogType:string;
}
class FriendIRUI extends eui.ItemRenderer {

    private cb:eui.CheckBox;

    constructor() {
        super();
        this.skinName = "friendIRSkin";
    }

    protected createChildren():void {
        super.createChildren();
    }

}
