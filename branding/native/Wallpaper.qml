import QtQuick 2.15
Canvas {
    id:wall
    property string variant: Style.wallpaper
    property real cornerRadius: 0
    antialiasing:true
    onWidthChanged:requestPaint()
    onHeightChanged:requestPaint()
    onVariantChanged:requestPaint()
    onCornerRadiusChanged:requestPaint()
    Connections { target:Style;function onLightChanged(){wall.requestPaint();} }
    onPaint: {
        var c=getContext("2d"), w=width, h=height, r=cornerRadius;
        c.reset();c.save();
        if(r>0){c.beginPath();c.moveTo(r,0);c.lineTo(w-r,0);c.quadraticCurveTo(w,0,w,r);c.lineTo(w,h-r);c.quadraticCurveTo(w,h,w-r,h);c.lineTo(r,h);c.quadraticCurveTo(0,h,0,h-r);c.lineTo(0,r);c.quadraticCurveTo(0,0,r,0);c.closePath();c.clip();}
        var light=Style.light;
        if(variant==="ossidiana"){c.fillStyle=Style.bg;c.fillRect(0,0,w,h);c.restore();return;}
        var sky=c.createLinearGradient(0,0,0,h);
        sky.addColorStop(0,light?"#F5F4F0":"#0B0C10");sky.addColorStop(.42,light?"#F3ECE3":"#15161C");sky.addColorStop(.66,light?"#FAD9BF":"#3A2622");sky.addColorStop(.78,light?"#F7A877":"#C4623A");
        c.fillStyle=sky;c.fillRect(0,0,w,h);
        var cy=variant==="foschia"?h:h*.78, edge=light?"#FFC59A":"#F5834A", core=light?"#FFF6EC":"#FFB27A";
        var glow=c.createRadialGradient(w/2,cy,0,w/2,cy,w*.9);
        glow.addColorStop(0,light?"#80FFC59A":"#80F5834A");glow.addColorStop(.7,"transparent");
        c.fillStyle=glow;c.fillRect(0,0,w,h);
        if(variant!=="foschia"){
            var sr=w*.43;
            var sun=c.createRadialGradient(w/2,cy-sr*.4,0,w/2,cy,sr*1.4);sun.addColorStop(0,core);sun.addColorStop(1,edge);
            c.fillStyle=sun;c.beginPath();c.arc(w/2,cy,sr,0,Math.PI*2);c.fill();
            var ground=c.createLinearGradient(0,cy,0,h);ground.addColorStop(0,light?"#EDE9E1":"#0D0E11");ground.addColorStop(1,Style.bg);
            c.fillStyle=ground;c.fillRect(0,cy,w,h-cy);c.fillStyle=light?"#80FFF6EC":"#80FFB27A";c.fillRect(0,cy,w,1);
        }
        c.restore();
    }
}
