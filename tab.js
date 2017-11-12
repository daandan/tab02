/**
 * Created by Administrator on 2017/5/8.
 */

//面向过程
window.onload = function(){
    var oLi = document.getElementsByTagName("li");
    var oDiv = document.getElementById("inner").getElementsByTagName("div");

    for(var i=0;i<oLi.length;i++){
        oLi[i].index = i;
        oLi[i].onclick = function(){
            for(var j=0;j<oLi.length;j++){
                oDiv[j].style.display = "none";
                oLi[j].className = "";
            }
            oDiv[this.index].style.display = "block";
            oLi[this.index].className = "actived";
        }
    }
};