class Scroll extends egret.DisplayObjectContainer {

    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.imgLoadHandler,this);
        RES.loadConfig("resource/default.res.json","resource/");
        RES.loadGroup("scroll");
    }

    private imgLoadHandler(evt:egret.Event):void{  //加载并显示界面
        var scroll:egret.gui.Scroller = new egret.gui.Scroller();
        scroll.width = 640;
        scroll.height = 1136;
        scroll.x = 0;
        scroll.y = 0;
        
        var stage = egret.MainContext.instance.stage;
        //this.logo = new egret.Bitmap();
        //this.logo.texture = RES.getRes("bg_scroll_jpg");
        //stage.addChild(this.logo);
        var bg:egret.gui.UIAsset = new egret.gui.UIAsset("resource/assets/bg_scroll.jpg");  //获取资源
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

        var rect:egret.gui.Rect = new egret.gui.Rect();  //定义各种图形与文字
        rect.fillAlpha = 0.5;
        rect.fillColor = 0x000000;
        rect.width = 640;
        rect.height = 200;
        rect.y = 100;

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

        var text_back:egret.gui.TextBase = new egret.gui.TextBase();
        text_back.text = "向上滑动返回";
        text_back.size = 26;
        text_back.textColor = 0x000000;
        text_back.textAlign = egret.HorizontalAlign.CENTER;
        text_back.fontFamily = "微软雅黑";
        text_back.y = 1080;
        text_back.height = 100;
        text_back.width = 640;
        text_back.alpha = 0;

        var text_title:egret.gui.TextBase = new egret.gui.TextBase();
        text_title.text = "简要介绍";
        text_title.size = 52;
        text_title.textColor = 0x000000;
        text_title.textAlign = egret.HorizontalAlign.CENTER;
        text_title.fontFamily = "微软雅黑";
        text_title.y = 50;
        text_title.height = 100;
        text_title.width = 640;
        text_title.alpha = 0;

        var text_intro:egret.gui.TextBase = new egret.gui.TextBase();
        text_intro.text = "北京工业大学_软件学院_数字媒体技术_大三狗\n性格温和，三观基本正，有时会逗比";
        text_intro.lineSpacing = 20;
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

        var text_end:egret.gui.TextBase = new egret.gui.TextBase();
        text_end.text = "相信作为第九艺术的电子游戏，最大的作用是打动人心。\n愿望是让自己的分身真真切切活在我所期望的世界中。\n日语n2，备战12月n1，正在做自己喜欢的游戏翻译。\n希望能鼓起勇气，去见更大的世界。";
        text_end.lineSpacing = 22;
        text_end.size = 22;
        text_end.textColor = 0x000000;
        text_end.textAlign = egret.HorizontalAlign.CENTER;
        text_end.anchorOffsetX = text_intro.width/2;
        text_end.anchorOffsetY = text_intro.height/2;
        text_end.fontFamily = "微软雅黑";
        text_end.x = 320;
        text_end.y = 1200;
        text_end.height = 600;
        text_end.width = 640;
        text_end.alpha = 0;
       
        var change:Function = function(){
        //alert("hello!");
        var tw = egret.Tween.get(text);
        tw.to({"alpha": 1}, 200);
        tw.wait(2000);
        tw.to({"alpha": 0}, 200);
        tw.call(change, self);
        }
        change();
        
        var group:egret.gui.Group = new egret.gui.Group();  //每个页面的元素归为一组
        group.addElement(bg);
        group.addElement(text);
        group.addElement(rect);
        group.addElement(title);
        stage.addChild(group);

        var group2:egret.gui.Group = new egret.gui.Group();
        group2.addElement(bg2);
        group2.addElement(text_back);
        group2.addElement(text_title);
        group2.addElement(text_intro);
        group2.addElement(bubble1);
        group2.addElement(bubble2);
        group2.addElement(bubble3);
        group2.addElement(text_end);
        group2.y = 1136;
        stage.addChild(group2);       
        
        var currentPage:number = 1;
        var totalPage:number = 2;
        var drag:boolean = false;
        var beginPoint:egret.Point = new egret.Point(0,0);
        var endPoint:egret.Point = new egret.Point(0,0);

        group.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{  //给两个组加上事件侦听
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
                    tw.to({"alpha":1},300,egret.Ease.sineInOut);
                    tw.to({"x":0},300,egret.Ease.backOut);
                    tw = egret.Tween.get(bubble2);
                    tw.wait(2200);
                    tw.to({"alpha":1},300,egret.Ease.sineInOut);
                    tw.to({"x":0},300,egret.Ease.backOut);
                    tw = egret.Tween.get(bubble3);
                    tw.wait(2700);
                    tw.to({"alpha":1},300,egret.Ease.sineInOut);
                    tw.to({"x":0},300,egret.Ease.backOut);
                    tw = egret.Tween.get(text_end);
                    tw.wait(3200);
                    tw.to({"alpha":1},300,egret.Ease.sineOut);
                    tw.to({"y":920},300,egret.Ease.backOut);
                    tw = egret.Tween.get(text_back);
                    tw.wait(3700);
                    tw.to({"alpha": 1}, 500,egret.Ease.sineInOut);
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
                egret.Tween.get(text_back).to({"alpha":0},200,egret.Ease.sineIn); 
                egret.Tween.get(text_title).to({"alpha":0},200,egret.Ease.sineIn);   
                egret.Tween.get(text_intro).to({"size":0},200,egret.Ease.sineIn);   
                egret.Tween.get(bubble1).to({"alpha":0},300,egret.Ease.backIn);   
                egret.Tween.get(bubble1).to({"x":-640},300,egret.Ease.backIn);   
                egret.Tween.get(bubble2).to({"alpha":0},300,egret.Ease.backIn);   
                egret.Tween.get(bubble2).to({"x":-640},300,egret.Ease.backIn);   
                egret.Tween.get(bubble3).to({"alpha":0},300,egret.Ease.backIn);   
                egret.Tween.get(bubble3).to({"x":-640},300,egret.Ease.backIn); 
                egret.Tween.get(text_end).to({"y":1200},300,egret.Ease.backIn);    
            }
        },this);              
    }
}