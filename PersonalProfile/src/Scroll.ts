class Scroll extends egret.DisplayObjectContainer {

    private logo:egret.Bitmap;
    

    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.imgLoadHandler,this);
        RES.loadConfig("resource/default.res.json","resource/");
        RES.loadGroup("scroll");
    }

    private imgLoadHandler(evt:egret.Event):void{
        var scroll:egret.gui.Scroller = new egret.gui.Scroller();
        scroll.width = 640;
        scroll.height = 1136;
        scroll.x = 0;
        scroll.y = 0;
        
        var stage = egret.MainContext.instance.stage;
        //this.logo = new egret.Bitmap();
        //this.logo.texture = RES.getRes("bg_scroll_jpg");
        //stage.addChild(this.logo);
        var bg:egret.gui.UIAsset = new egret.gui.UIAsset("resource/assets/bg_scroll.jpg");
        var bg2:egret.gui.UIAsset = new egret.gui.UIAsset("resource/assets/bg_scroll2.jpg");
        var bubble1:egret.gui.UIAsset = new egret.gui.UIAsset("resource/assets/bubble1.png");
        bubble1.alpha = 0;
        bubble1.x = -640;
        bubble1.y = 300;
        var bubble2:egret.gui.UIAsset = new egret.gui.UIAsset("resource/assets/bubble2.png");
        bubble2.alpha = 0;
        bubble2.x = -640;
        bubble2.y = 450;
        var bubble3:egret.gui.UIAsset = new egret.gui.UIAsset("resource/assets/bubble3.png");
        bubble3.alpha = 0;
        bubble3.x = -640;
        bubble3.y = 600;
        var title:egret.gui.UIAsset = new egret.gui.UIAsset("resource/assets/title.png");
        title.y = 100;

        var rect:egret.gui.Rect = new egret.gui.Rect();
        rect.fillAlpha = 0.5;
        rect.fillColor = 0x000000;
        rect.width = 640;
        rect.height = 200;
        rect.y = 100;

        var endText:egret.TextField = new egret.TextField();
        endText.text = "喵喵喵喵喵喵"
        endText.size = 32;
        endText.y = 500;
        this.addChild(endText);

        var mask:egret.Shape = new egret.Shape();
        mask.graphics.lineStyle( 0x000000 )
        mask.graphics.beginFill(0xffffff);
        mask.graphics.drawRect(0,0,640,100);
        mask.graphics.endFill();
        mask.y = 900;
        this.addChild(mask);
        mask.mask = endText;

        var text:egret.gui.TextBase = new egret.gui.TextBase();
        text.text = "滑动观看下一页\n\n          ﹀";
        text.size = 32;
        text.textColor = 0x000000;
        text.textAlign = egret.HorizontalAlign.LEFT;
        text.fontFamily = "微软雅黑";
        text.x = 200;
        text.y = 1000;
        text.height = 100;
        text.width = 640;

        var text_title:egret.gui.TextBase = new egret.gui.TextBase();
        text_title.text = "简要介绍";
        text_title.size = 52;
        text_title.textColor = 0x000000;
        text_title.textAlign = egret.HorizontalAlign.CENTER;
        text_title.fontFamily = "微软雅黑";
        //text_title.x = 200;
        text_title.y = 50;
        text_title.height = 100;
        text_title.width = 640;
        text_title.alpha = 0;
        text_title.visible = false;

        var text_intro:egret.gui.TextBase = new egret.gui.TextBase();
        text_intro.text = "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵\n喵喵喵喵喵喵喵喵喵喵喵喵";
        text_intro.size = 0;
        text_intro.textColor = 0x000000;
        text_intro.textAlign = egret.HorizontalAlign.CENTER;
        text_intro.anchorOffsetX = text_intro.width/2;
        text_intro.anchorOffsetY = text_intro.height/2;
        text_intro.fontFamily = "微软雅黑";
        text_intro.x = 0;
        text_intro.y = 180;
        text_intro.height = 100;
        text_intro.width = 640;
        text_intro.alpha = 0;
        text_intro.visible = false;

       
        var change:Function = function(){
        //alert("hello!");
        var tw = egret.Tween.get(text);
        tw.to({"alpha": 1}, 200);
        tw.wait(2000);
        tw.to({"alpha": 0}, 200);
        tw.call(change, self);
        }
        change();
        
        var group:egret.gui.Group = new egret.gui.Group();
        group.addElement(bg);
        group.addElement(text);
        group.addElement(rect);
        group.addElement(title);
        stage.addChild(group);

        var group2:egret.gui.Group = new egret.gui.Group();
        group2.addElement(bg2);
        group2.addElement(text_title);
        group2.addElement(text_intro);
        group2.addElement(bubble1);
        group2.addElement(bubble2);
        group2.addElement(bubble3);
        group2.y = 1136;
        stage.addChild(group2);
        
        
        var currentPage:number = 1;
        var totalPage:number = 2;
        var drag:boolean = false;
        var beginPoint:egret.Point = new egret.Point(0,0);
        var endPoint:egret.Point = new egret.Point(0,0);
        group.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{
            drag = true;
            beginPoint.y = e.stageY;
        },this);
        group.addEventListener(egret.TouchEvent.TOUCH_END,(e)=>{
            drag = false;
            endPoint.y = e.stageY;
            if(beginPoint.y-endPoint.y>=100 && currentPage < totalPage){
                egret.Tween.get(group).to({x:0,y:-1136*currentPage},1000,egret.Ease.sineIn);
                egret.Tween.get(group2).to({x:0,y:-1136*(currentPage-1)},1000,egret.Ease.sineIn);
                currentPage++;
               

                var change:Function = function(){
                //alert("hello!");               
                if(currentPage == 2){
                    text_title.visible = true;
                    text_intro.visible = true;  
                    var tw = egret.Tween.get(text_title);
                    tw.wait(1000);
                    tw.to({"alpha": 1}, 500,egret.Ease.sineInOut);
                    tw = egret.Tween.get(text_intro);
                    tw.wait(1200);
                    tw.to({"alpha":1},250,egret.Ease.sineInOut);
                    tw.to({"size":26},250,egret.Ease.sineInOut);
                    tw = egret.Tween.get(bubble1);
                    tw.wait(1700);
                    tw.to({"alpha":1},300,egret.Ease.backOut);
                    tw.to({"x":0},300,egret.Ease.backOut);
                    tw = egret.Tween.get(bubble2);
                    tw.wait(2200);
                    tw.to({"alpha":1},300,egret.Ease.backOut);
                    tw.to({"x":0},300,egret.Ease.backOut);
                    tw = egret.Tween.get(bubble3);
                    tw.wait(2700);
                    tw.to({"alpha":1},300,egret.Ease.backOut);
                    tw.to({"x":0},300,egret.Ease.backOut);
                }else{
                    text_title.visible = false;
                    text_intro.visible = false;
                }
                }
                change();

            }else if(beginPoint.y-endPoint.y<=-100 && currentPage > 1){
                egret.Tween.get(group).to({x:0,y:-1136*(currentPage-2)},1000,egret.Ease.sineIn);
                currentPage--;
            }
        },this);

        group2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{
            drag = true;
            beginPoint.y = e.stageY;
        },this);
        group2.addEventListener(egret.TouchEvent.TOUCH_END,(e)=>{
            drag = false;
            endPoint.y = e.stageY;
            if(beginPoint.y-endPoint.y<=-100 && currentPage > 1){
                egret.Tween.get(group).to({x:0,y:1136*(currentPage-2)},1000,egret.Ease.sineInOut);
                egret.Tween.get(group2).to({x:0,y:1136*(currentPage-1)},1000,egret.Ease.sineInOut);
                currentPage--;    
                egret.Tween.get(text_title).to({"alpha":0},200,egret.Ease.sineIn);   
                egret.Tween.get(text_intro).to({"size":0},200,egret.Ease.sineIn);   
                egret.Tween.get(bubble1).to({"alpha":0},300,egret.Ease.backIn);   
                egret.Tween.get(bubble1).to({"x":-640},300,egret.Ease.backIn);   
                egret.Tween.get(bubble2).to({"alpha":0},300,egret.Ease.backIn);   
                egret.Tween.get(bubble2).to({"x":-640},300,egret.Ease.backIn);   
                egret.Tween.get(bubble3).to({"alpha":0},300,egret.Ease.backIn);   
                egret.Tween.get(bubble3).to({"x":-640},300,egret.Ease.backIn);   
            }
        },this);      
        
    }
}