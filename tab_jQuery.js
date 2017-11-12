
//自执行的tab类
;(function($){
    var Tab=function(tab){
        var _this = this;      //在调用函数是使用
        this.tab = tab;

        this.config ={      //设置默认参数
            triggerType:"mouseover",
            effect:"default",
            invoke:1,
            auto:false
        }

        if(this.getConfig()&&this.getConfig()!=""){
            $.extend(this.config,this.getConfig()); //扩展默认参数
        }

        this.navItem = this.tab.find("ul.nav li");
        this.imgItem = this.tab.find("div.inner div.img-item");

        var config = this.config; //只要有一个点就会有查找的链式，为要避免这种消耗内存的情况将this.config保存起来

        //绑定事件
        if(config.triggerType === "click"){ //是否可以使用 ==
           /* this.navItem.bind(config.triggerType,function(){*/    //按照老师的代码写的，回报错
            this.navItem.bind(config.triggerType,function(){
                _this.invoke($(this));
            });
        }else {
            this.navItem.bind("mouseover",function(){
                _this.invoke($(this));
            });
        }

        //执行自动切换
        if(config.auto){
            this.timer = null;   //定时器
            this.loop = 0;   //计数器
            this.autoPlay();
        }

        //自动显示第几个
        if(config.invoke>1){
            this.invoke(this.navItem.eq(config.invoke-1));
        }
    }

    Tab.prototype = {

        //切换效果
        invoke:function(currentTab){

            var _this = this;

            var index = currentTab.index();
            _this.loop = index;
            currentTab.addClass("actived").siblings().removeClass("actived");

            var effect = this.config.effect;
            if(effect ==="fade"){
                _this.imgItem.eq(index).fadeIn().siblings().fadeOut(); //用eq()取到对应的图片
            }else{
                _this.imgItem.eq(index).addClass("current").siblings().removeClass("current");
            }



        },

        //获取用户指定参数
        getConfig:function(){
            var config = this.tab.attr("data-config");

            if(config&&config!=null){
               return $.parseJSON(config);
            }else{
                return null;
            }
        },

        //自动切换
        autoPlay:function(){
            var _this = this;
            var navItem = this.navItem;
            var navLength = navItem.length;
            var config = this.config;

            this.timer = window.setInterval(function(){
                _this.loop++;
                if(_this.loop>=navLength){
                    _this.loop = 0;
                }
                navItem.eq(_this.loop).trigger(config.triggerType);
            },config.auto);
        }
    }

    Tab.init = function(tabs){
        var _this = this;
        tabs.each(function(){
            new _this($(this));
        })
    }

    $.fn.extend({
        tab:function(){
            this.each(function(){
                new Tab($(this));
            })
            return this;

        }

    })
    window.Tab= Tab;

})(jQuery);