var Tesseract = require('tesseract.js');

/*等图片加载完成后再执行（若图片没有加载完成，则不能正常进行图片处理）*/
var $ = require('jquery');


$(function() {
    /*创建画布*/
    var c = document.createElement('canvas');
    var login_user = document.getElementById('login_user');
    login_user.appendChild(c);
    c.width = 1000; //☜
    c.height = 500;
    c.style.backgroundColor = '#FFFFFF';
    c.style.display="none";

    // var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var image_data=document.getElementById("vcJpeg");
    ctx.drawImage(image_data,0,0);
    var imgData=ctx.getImageData(0,0,image_data.width,image_data.height);

    // 反转颜色
    for (var i=0;i<imgData.data.length;i+=4)
    {
        imgData.data[i]=255-imgData.data[i];
        imgData.data[i+1]=255-imgData.data[i+1];
        imgData.data[i+2]=255-imgData.data[i+2];
        imgData.data[i+3]=255;
    }
    //只留黑白两色
    for (var i=0;i<imgData.data.length;i+=4)
    {
        if(imgData.data[i]<220||imgData.data[i+1]<220&&imgData.data[i+2]<220){
            imgData.data[i]=imgData.data[i+1]=imgData.data[i+2]=0;
            imgData.data[i+3]=255;
        }
    }
    ctx.clearRect(0,0,ctx.width,ctx.height);
    ctx.putImageData(imgData,0,0);

    var imgData2=ctx.getImageData(4,4,image_data.width-8,image_data.height-8);
    ctx.putImageData(imgData2,4,250);

    //获取验证码
    var vc = 'abcd';
    Tesseract.recognize(imgData2, {
        lang: "eng",
        classify_bln_numeric_mode: 1
    }).then(function (result) {
        console.log(result.text);
        vc = result.text;
        $('#institute').val('00010000');
        $('#validateCode').val(vc);
        // console.table($(":submit"));
        $(":submit")[0].click(function(){

        });
    });





});




