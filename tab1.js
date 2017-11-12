/**
 * Created by Administrator on 2017/5/8.
 */

//面向对象
function tab(id){
    var _this = this;

    var oOuter = document.getElementById(id);

    this.oLi = oOuter.getElementsByTagName('li');
    this.oDiv = oOuter.getElementsByTagName('div')[0].getElementsByTagName('div');

    for(var i=0;i<this.oLi.length;i++){
        this.oLi[i].index = i;
        this.oLi[i].onclick = function(){
            _this.change(this);
        }
     }
}

tab.prototype.change = function(li){
    for(var j=0;j<this.oLi.length;j++){
        this.oDiv[j].style.display = "none";
        this.oLi[j].className = "";
    }
    this.oDiv[li.index].style.display = "block";
    li.className = "actived";
}

window.onload = function(){
    new tab("outer");
};