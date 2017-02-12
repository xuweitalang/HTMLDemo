/**
 * js原型的使用：给已有的js中的类添加行的属性或方法,调用 类.prototype，类似于java中在某类的父类中
 * 添加新的方法或属性
 *
 *给String添加一个新功能，去掉字符串两边的空白
 * Created by xuwei on 2016/10/29.
 */

//String.prototype index = 4; //给字符串的原型添加了一个属性index，值为4；

/*String.prototype.trims = function () {  //给字符串String的原型添加新的方法trims
    var start = 0;
    var end = this.length - 1;
    while (start <= end && this.charAt(start) == " ") {
        start ++;
    }
    while (start <= end && this.charAt(end)==" ") {
        end--;
    }
    return this.substring(start, end);
};*/
