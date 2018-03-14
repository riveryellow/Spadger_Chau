class GameOverUI extends eui.Component {
    constructor(result) {
        super();
        this._result = result;
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/gameOverSkin.exml";
    }

    uiCompHandler() {
        this._resultBox = new eui.Component();
        this.addChild(this._resultBox);
        this.renderItem();
        this.init();
        this._back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.backHome, this );
    }
    private backHome(e:egret.TouchEvent):void {
        MessageCenter.getInstance().sendMessage(MessageCenter.EVT_LOAD_PAGE, {type:GamePages.BACK_HOME});
    }
    private init(){
        switch (this._result.status) {
            case 0:
                this._bg.source = 'bai_gameover_bg_jpg';
                break;
            case 1:
                this._bg.source = 'ping_gameover_bg_jpg';
                break;
            case 2:
                this._bg.source = 'ying_gameover_bg_jpg';
                break;
        }
        switch (this._result.type) {
            case 121:
                this._title.text = '红中发财杠';
                break;
            case 122:
                this._title.text = '前痞后赖';
                break;
            case 123:
                this._title.text = '武汉晃晃';
                break;
        }
    }
    private renderItem(){
        this._result.result.forEach((v,k)=>{
            var resultItem = new ResultItem(v);
            resultItem.skinName = "resource/eui_game/skins/gameOverIRSkin.exml";
            resultItem.x = 529;
            resultItem.y = 215+ 109*k;
            this._resultBox.addChild(resultItem);
        })
    }

    protected createChildren():void {
        super.createChildren();
    }
    private _resultBox:eui.Component;
    private _result;
    private _bg;
    private _title;
    private _back;
    
}
class ResultItem extends eui.Component{
    constructor(item){
        super();
        this._item = item;
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/eui_game/skins/gameOverIRSkin.exml";
    }
    uiCompHandler() {
        // setTimeout(()=>{
            this._name.text = this._item.name;
            this._res.text = `x${this._item.fan}`;
            this._num.text = this._item.points;
            if (Number(`${this._item.points}`)<0){
                this._num.textColor = 0x5cb517;
            }
        // },10);
       
    }
    private _item;
    private _name:eui.Label;
    private _icon;
    private _res:eui.Label;
    private _num:eui.Label;
}