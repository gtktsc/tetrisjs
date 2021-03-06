 "use strict";
(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    var canvasWidth = document.getElementById('canvas-wrapper').offsetWidth;
    var canvasHeight = document.getElementById('canvas-wrapper').offsetHeight;
    var tetrimino =[];
    var tilesInRow=[];
    var backgroundTile=[];
    var tileOccupied=[];
    var tileSize = Math.floor(canvasWidth/30);
    var rotation=0;
    var direction="none";
    var color;
    var moveable=true;
    var backgroundColor = "white";
    var backgroundLine = tileSize/3;
    var backgroundLineColor = "#505A69";
    var shape;
    var animation;
    var restartTimer;
    var sumX = (Math.floor(canvasWidth / tileSize)%2==0?sumX = Math.floor(canvasWidth / tileSize) : sumX = Math.floor(canvasWidth / tileSize)-1);
    var sumY =Math.floor(canvasHeight  / tileSize);
    
    function restart(){
        clearInterval(animation);
        clearTimeout(restartTimer);
        var nr=0;
        tileOccupied=[];
        for(var nrX=0;nrX<sumX;nrX++){
            tilesInRow[nrX]=0;
            for(var nrY=0;nrY<sumY;nrY++){
            backgroundTile[nr]= new Rectangle (tileSize*nrX,tileSize*nrY,backgroundColor,nr);
            backgroundTile[nr].direction="none";
            backgroundTile[nr].line=nrY;
            nr++;
            };
        };
        setShape();
        context.clearRect(0 , 0 , canvasWidth , canvasHeight);
        drawBackground();
        restartTimer=setTimeout(function(){         
            tileOccupied.length = 0;
            animation = setInterval(draw , 200); }, 500);
    };
    function setShape(){
        shape=Math.floor(Math.random() * (5));
        switch(Math.floor(Math.random() * (5))){
            case 0:
                color = "#FA575C";
            break;
            case 1:
                color = "#47ADA0";
            break;
            case 2:
                color = "#8F63BF";
            break;
            case 3:
                color = "#FFC90A";
            break;
            case 4:
                color = "#FF823B";
            break;
        };
        tetrimino=[];
        var centerX= (Math.floor(sumX/2)-1) * tileSize;
        switch(shape){
            case 0:
            // xx
            //  xx
                tetrimino[0] = new Rectangle ( centerX ,-tileSize,color ,-1);
                tetrimino[1] = new Rectangle ( centerX +tileSize,-tileSize,color ,-1);
                tetrimino[2] = new Rectangle ( centerX +tileSize,0,color ,-1);
                tetrimino[3] = new Rectangle ( centerX +tileSize*2,0,color ,-1);
                break;
            case 1:
            // xxxx
                tetrimino[0] = new Rectangle ( centerX ,-tileSize,color ,-1);
                tetrimino[1] = new Rectangle ( centerX +tileSize,-tileSize,color ,-1);
                tetrimino[2] = new Rectangle ( centerX + tileSize*2,-tileSize,color ,-1);
                tetrimino[3] = new Rectangle ( centerX + tileSize*3,-tileSize,color ,-1);
            break;
            case 2:
            // xxx
            // x
                tetrimino[0] = new Rectangle ( centerX ,-tileSize,color ,tileSize ,-1);
                tetrimino[1] = new Rectangle ( centerX +tileSize, -tileSize,color ,tileSize ,-1);
                tetrimino[2] = new Rectangle ( centerX + tileSize*2,-tileSize,color ,tileSize ,-1);
                tetrimino[3] = new Rectangle ( centerX ,0,color ,tileSize ,-1);
                break;
            case 3:
            // xxx
            //  x
                tetrimino[0] = new Rectangle ( centerX ,-tileSize,color ,tileSize ,-1);
                tetrimino[1] = new Rectangle ( centerX +tileSize,-tileSize,color ,tileSize ,-1);
                tetrimino[2] = new Rectangle ( centerX + tileSize*2,-tileSize,color ,-1);
                tetrimino[3] = new Rectangle ( centerX +tileSize,0,color ,-1);
                break;
            case 4:
            // xx
            // xx
                tetrimino[0] = new Rectangle ( centerX ,-tileSize,color ,-1);
                tetrimino[1] = new Rectangle ( centerX +tileSize,-tileSize, color ,-1);
                tetrimino[2] = new Rectangle ( centerX , 0,color ,-1);
                tetrimino[3] = new Rectangle ( centerX +tileSize,0,color ,-1);
                break;
        };
        for(var tile in tetrimino){
            tetrimino[tile].who="tetrimino";
        };
    };
    function resizeCanvas() {
        canvasWidth = document.getElementById('canvas-wrapper').offsetWidth;
        canvasHeight = document.getElementById('canvas-wrapper').offsetHeight;
        sumX = (Math.floor(canvasWidth / tileSize)%2==0?sumX = Math.floor(canvasWidth / tileSize) : sumX = Math.floor(canvasWidth / tileSize)-1);
        sumY =Math.floor(canvasHeight / tileSize);
        canvas.width = sumX * tileSize;
        canvas.height = sumY * tileSize;
        restart();
    };
    function drawBackground(){
        for(var nr=0;nr<backgroundTile.length;nr++){
            backgroundTile[nr].draw();
        };
    }
    function draw() {
        context.beginPath();
        context.clearRect(0 , 0 , canvasWidth , canvasHeight);
        context.rect(0 , 0 , canvasWidth , canvasHeight);
        context.fillStyle = backgroundColor;
        context.fill();
        context.closePath();
        drawBackground();
        for(var tile in tetrimino){
            if(tetrimino[tile]!=undefined && (tetrimino[tile].y > canvasHeight-tileSize * 2 || touchingBottom(tetrimino[tile])  )){
                stop();
            };
        }
        for(var tile in tileOccupied){
            tileOccupied[tile].draw();
        };
        for(var tile in tetrimino){
            tetrimino[tile].draw();
        };

    };
    function rotate(){
        rotation===270?rotation=0:rotation+=90
        switch(shape){
            case 0:
                switch(rotation){
                    case 0:
                        tetrimino[1].x=tetrimino[0].x+tileSize;
                        tetrimino[1].y=tetrimino[0].y; 
                        tetrimino[2].x=tetrimino[1].x;
                        tetrimino[2].y=tetrimino[1].y+tileSize; 
                        tetrimino[3].x=tetrimino[1].x+tileSize;
                        tetrimino[3].y=tetrimino[1].y+tileSize; 
                    break;
                    case 90:
                        tetrimino[1].x=tetrimino[0].x;
                        tetrimino[1].y=tetrimino[0].y+tileSize; 
                        tetrimino[2].x=tetrimino[1].x-tileSize;
                        tetrimino[2].y=tetrimino[1].y; 
                        tetrimino[3].x=tetrimino[1].x-tileSize;
                        tetrimino[3].y=tetrimino[1].y+tileSize; 
                    break;
                    case 180:
                        tetrimino[1].x=tetrimino[0].x-tileSize;
                        tetrimino[1].y=tetrimino[0].y; 
                        tetrimino[2].x=tetrimino[1].x;
                        tetrimino[2].y=tetrimino[1].y-tileSize; 
                        tetrimino[3].x=tetrimino[1].x-tileSize;
                        tetrimino[3].y=tetrimino[1].y-tileSize; 
                    break;
                    case 270:
                        tetrimino[1].x=tetrimino[0].x;
                        tetrimino[1].y=tetrimino[0].y-tileSize; 
                        tetrimino[2].x=tetrimino[1].x+tileSize;
                        tetrimino[2].y=tetrimino[1].y; 
                        tetrimino[3].x=tetrimino[2].x;
                        tetrimino[3].y=tetrimino[1].y-tileSize; 
                    break;
                };
            break;
            case 1:
                switch(rotation){
                    case 0:
                        tetrimino[1].x=tetrimino[0].x+tileSize;
                        tetrimino[1].y=tetrimino[0].y; 
                        tetrimino[2].x=tetrimino[0].x+tileSize*2;
                        tetrimino[2].y=tetrimino[0].y; 
                        tetrimino[3].x=tetrimino[0].x+tileSize*3;
                        tetrimino[3].y=tetrimino[0].y; 
                    break;
                    case 90:
                        tetrimino[1].x=tetrimino[0].x;
                        tetrimino[1].y=tetrimino[0].y-tileSize; 
                        tetrimino[2].x=tetrimino[0].x;
                        tetrimino[2].y=tetrimino[0].y-tileSize*2; 
                        tetrimino[3].x=tetrimino[0].x;
                        tetrimino[3].y=tetrimino[0].y-tileSize*3; 
                    break;
                    case 180:
                        tetrimino[1].x=tetrimino[0].x+tileSize;
                        tetrimino[1].y=tetrimino[0].y; 
                        tetrimino[2].x=tetrimino[0].x+tileSize*2;
                        tetrimino[2].y=tetrimino[0].y; 
                        tetrimino[3].x=tetrimino[0].x+tileSize*3;
                        tetrimino[3].y=tetrimino[0].y; 
                    break;
                    case 270:
                        tetrimino[1].x=tetrimino[0].x;
                        tetrimino[1].y=tetrimino[0].y-tileSize; 
                        tetrimino[2].x=tetrimino[0].x;
                        tetrimino[2].y=tetrimino[0].y-tileSize*2; 
                        tetrimino[3].x=tetrimino[0].x;
                        tetrimino[3].y=tetrimino[0].y-tileSize*3; 
                    break;
                };
                break;
                case 2:
                switch(rotation){
                    case 0:
                        tetrimino[1].x=tetrimino[0].x+tileSize;
                        tetrimino[1].y=tetrimino[0].y; 
                        tetrimino[2].x=tetrimino[0].x+tileSize*2;
                        tetrimino[2].y=tetrimino[0].y; 
                        tetrimino[3].x=tetrimino[0].x;
                        tetrimino[3].y=tetrimino[0].y+tileSize; 
                    break;
                    case 90:
                        tetrimino[1].x=tetrimino[0].x;
                        tetrimino[1].y=tetrimino[0].y+tileSize; 
                        tetrimino[2].x=tetrimino[0].x;
                        tetrimino[2].y=tetrimino[0].y+tileSize*2; 
                        tetrimino[3].x=tetrimino[0].x-tileSize;
                        tetrimino[3].y=tetrimino[0].y; 
                    break;
                    case 180:
                        tetrimino[1].x=tetrimino[0].x-tileSize;
                        tetrimino[1].y=tetrimino[0].y; 
                        tetrimino[2].x=tetrimino[0].x-tileSize*2;
                        tetrimino[2].y=tetrimino[0].y; 
                        tetrimino[3].x=tetrimino[0].x;
                        tetrimino[3].y=tetrimino[0].y-tileSize; 
                    break;
                    case 270:
                        tetrimino[1].x=tetrimino[0].x;
                        tetrimino[1].y=tetrimino[0].y-tileSize; 
                        tetrimino[2].x=tetrimino[0].x;
                        tetrimino[2].y=tetrimino[0].y-tileSize*2; 
                        tetrimino[3].x=tetrimino[0].x+tileSize;
                        tetrimino[3].y=tetrimino[0].y; 
                    break;
                };
            break;
            case 3:
                switch(rotation){
                    case 0:
                        tetrimino[1].x=tetrimino[0].x+tileSize;
                        tetrimino[1].y=tetrimino[0].y; 
                        tetrimino[2].x=tetrimino[0].x+tileSize*2;
                        tetrimino[2].y=tetrimino[0].y; 
                        tetrimino[3].x=tetrimino[0].x+tileSize;
                        tetrimino[3].y=tetrimino[0].y+tileSize; 
                    break;
                    case 90:
                        tetrimino[1].x=tetrimino[0].x;
                        tetrimino[1].y=tetrimino[0].y-tileSize; 
                        tetrimino[2].x=tetrimino[0].x;
                        tetrimino[2].y=tetrimino[0].y-tileSize*2; 
                        tetrimino[3].x=tetrimino[0].x-tileSize;
                        tetrimino[3].y=tetrimino[0].y-tileSize; 
                    break;
                    case 180:
                        tetrimino[1].x=tetrimino[0].x-tileSize;
                        tetrimino[1].y=tetrimino[0].y; 
                        tetrimino[2].x=tetrimino[0].x-tileSize*2;
                        tetrimino[2].y=tetrimino[0].y; 
                        tetrimino[3].x=tetrimino[0].x-tileSize;
                        tetrimino[3].y=tetrimino[0].y-tileSize; 
                    break;
                    case 270:
                        tetrimino[1].x=tetrimino[0].x;
                        tetrimino[1].y=tetrimino[0].y-tileSize; 
                        tetrimino[2].x=tetrimino[0].x;
                        tetrimino[2].y=tetrimino[0].y-tileSize*2; 
                        tetrimino[3].x=tetrimino[0].x+tileSize;
                        tetrimino[3].y=tetrimino[0].y-tileSize; 
                    break;
                };
            break;
            case 4:
            break;
        };
    };
    function stop(){
        rotation=0;
        for(var tile in tetrimino){
            for(var nr=0;nr<backgroundTile.length;nr++){
                if(backgroundTile[nr].x==tetrimino[tile].x&&backgroundTile[nr].y==tetrimino[tile].y){
                    tileOccupied[tileOccupied.length]=new Rectangle (backgroundTile[nr].x , backgroundTile[nr].y , tetrimino[tile].color , tileOccupied.length);
                    tileOccupied[tileOccupied.length-1].line=backgroundTile[nr].line;
                    tileOccupied[tileOccupied.length-1].direction="none";
                    tileOccupied[tileOccupied.length-1].who="tileOccupied";
                    tilesInRow[backgroundTile[nr].line]++;
                    if(backgroundTile[nr].y==tileSize){
                        restart();
                    };
                };
            };
        };
        checkLine();
        setShape();
    };
    function checkLine(){
        for(var line in tilesInRow){
            if(tilesInRow[line]==sumX){
                tilesInRow[line]=0;
                renum();
                for(var tile in tileOccupied){
                    tileOccupied[tile].y+=tileSize;
                    tileOccupied[tile].line--;
                };
            };
        };
    };
    function renum(){
        for(var nr=sumY;nr>=0;nr--){
            tilesInRow[nr]=tilesInRow[nr-1];
        };
    }
    function touchingBottom(who){
        for(var nr=0;nr<tileOccupied.length;nr++){
            if(tileOccupied[nr].x==who.x && tileOccupied[nr].y==who.y+tileSize){
                return true;
            };
        };
        return false;
    };
    function touchingSide(){
        if(direction === "left"){
            for(var tile in tetrimino){
                if (tetrimino[tile].x === 0) return moveable=false;
                for(var nr=0;nr<tileOccupied.length;nr++){
                    if(( tileOccupied[nr].x==tetrimino[tile].x-tileSize && tileOccupied[nr].y==tetrimino[tile].y) ){
                        return moveable=false;
                    }
                };
            };
        }else if(direction === "right"){
            for(var tile in tetrimino){
                if (tetrimino[tile].x=== sumX * tileSize-tileSize) return moveable=false;
                for(var nr=0;nr<tileOccupied.length;nr++){
                    if((tileOccupied[nr].x==tetrimino[tile].x+tileSize && tileOccupied[nr].y==tetrimino[tile].y )){
                        return moveable=false;
                    }
                };
            };
        }

        for(var tile in tetrimino){
            tetrimino[tile].direction=direction;
        };
        return moveable=true;
    };
    function touchingBottom(who){
        for(var nr=0;nr<tileOccupied.length;nr++){
            if(tileOccupied[nr].x==who.x && tileOccupied[nr].y==who.y+tileSize){
                return true;
            };
        };
        return false;
    };
    function Rectangle(x , y , color , number){
        this.rotation=0;
        this.x = x;
        this.y = y;
        this.shape = 0;
        this.direction = "down";
        this.number = number;
        this.color = color;
        this.line=-1;
        this.who="backgroundTile";
        this.draw = function() {
            context.beginPath();
            context.fillStyle = this.color;
            if(this.who==="tetrimino"){
                if(this.direction ==="down"){
                    this.y = this.y + tileSize;
                };
                switch(this.direction){
                case "left":
                    if(this.x> 0 && moveable){
                        this.x = this.x - tileSize;
                    };
                    this.direction="down";
                break;
                case "right":
                    if(this.x< sumX * tileSize-tileSize && moveable){
                        this.x = this.x + tileSize;
                    };
                    this.direction="down";
                break;
                };
                context.rect(this.x , this.y , tileSize , tileSize);
            } else if(this.who==="backgroundTile"){
                context.fillStyle = backgroundLineColor;
                context.rect(this.x+backgroundLine , this.y+backgroundLine , tileSize-backgroundLine*2 , tileSize-backgroundLine*2);
            }else{
                context.rect(this.x , this.y , tileSize , tileSize);
            };
            context.fill();
            context.closePath();
        };
    };
    window.addEventListener('resize' , resizeCanvas , false);
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 68: // D
            case 39: // down
                direction = "right";
                touchingSide();
            break;
            case 65: // A
            case 37: // left
                direction = "left";
                touchingSide();
            break;
            case 83: // S
            case 40: // down
            case 87: // W
            case 38: // up
            rotate();
            break;
        };
    });
    resizeCanvas();
    restart(); 
})();