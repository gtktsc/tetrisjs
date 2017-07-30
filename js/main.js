 "use strict";
(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    var head =[];
    var rotation=0;
    var tilesInRow=[];
    var color = "#"+((1<<24)*Math.random()|0).toString(16);
    var backgroundColor = "silver";
    var shape;
    var tileX=[];
    var tileOccupied=[];
    var animation;
    var snakeSize = 40;
    var canvasWidth = document.getElementById('canvas-wrapper').offsetWidth;
    var canvasHeight = document.getElementById('canvas-wrapper').offsetHeight;
    var sumX =Math.floor(canvasWidth / snakeSize);
    var sumY =Math.floor(canvasHeight  / snakeSize);
    function restart(){
        clearInterval(animation);
        tileOccupied=[];
        setShape();
        var nr=0;
        for(var nrX=0;nrX<sumX;nrX++){
            tilesInRow[nrX]=0;
            for(var nrY=0;nrY<sumY;nrY++){
            tileX[nr]= new Rectangle (snakeSize*nrX,
                                        snakeSize*nrY,
                                        backgroundColor,
                                        snakeSize,
                                        nr);
            tileX[nr].direction="none";
            tileX[nr].line=nrY;
            nr++;
            };
        };

        animation = setInterval(draw , 200);
    };
    function setShape(){
        shape=Math.floor(Math.random() * (5));
        shape=1;
        color = "#"+((1<<24)*Math.random()|0).toString(16);
        switch(shape){
            case 0:
                head=[];
                head[0] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize ,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                head[3] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize*2,
                +snakeSize,
                color ,
                snakeSize ,
                -1);
                break;
            case 1:
                head=[];
                head[0] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize ,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize + snakeSize*2,
                0,
                color ,
                snakeSize ,
                -1);
            break;
            case 2:
                head=[];
                head[0] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize ,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize + snakeSize*2,
                0,
                color ,
                snakeSize ,
                -1);
                head[3] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize ,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                break;
            case 3:
                head=[];
                head[0] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize ,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize + snakeSize*2,
                0,
                color ,
                snakeSize ,
                -1);
                head[3] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                break;
            case 4:
                head=[];
                head[0] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize ,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize ,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                head[3] = new Rectangle ( (Math.floor(canvasWidth / snakeSize)/2) * snakeSize +snakeSize,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                break;
        };
    };
    function resizeCanvas() {
        sumX =Math.floor(canvasWidth / snakeSize);
        sumY =Math.floor(canvasHeight / snakeSize);
        canvas.width = sumX * snakeSize;
        canvas.height = sumY * snakeSize;
    };
    function draw() {
        context.beginPath();
        context.clearRect(0 , 0 , canvasWidth , canvasHeight);
        context.rect(0 , 0 , canvasWidth , canvasHeight);
        context.fillStyle = backgroundColor;
        context.fill();
        context.closePath();
        for(var nr=0;nr<tileX.length;nr++){
            tileX[nr].draw();
        };
        for(var tile in head){
            if(head[tile]!=undefined && (head[tile].y > canvasHeight-head[tile].size * 2 || touching(head[tile])  )){
                stop();
            };
        }
        for(var tile in head){
            head[tile].draw();
        };
        for(var tile in tileOccupied){
            tileOccupied[tile].draw();
        };
    };
    window.addEventListener('resize' , resizeCanvas , false);
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 68: // D
            case 39: // down
                for(var tile in head){
                    head[tile].direction !== "left" ? head[tile].direction = "right" : head[tile].directory=head[tile].directory;
                };
            break;
            case 65: // A
            case 37: // left
            for(var tile in head){
                    head[tile].direction !== "right" ? head[tile].direction = "left" : head[tile].directory=head[tile].directory;
            };
            break;
            case 83: // S
            case 40: // down
            rotate();
            break;
        };
    });
    function rotate(){
        //to jest żart, należy to poprawić
        rotation+=90;
        if(rotation==360){
            rotation=0;
        };
        switch(shape){
            case 0:
                switch(rotation){
                    case 0:
                        head[1].x=head[0].x+snakeSize;
                        head[1].y=head[0].y; 
                        head[2].x=head[1].x;
                        head[2].y=head[1].y+snakeSize; 
                        head[3].x=head[1].x+snakeSize;
                        head[3].y=head[1].y+snakeSize; 
                    break;
                    case 90:
                        head[1].x=head[0].x;
                        head[1].y=head[0].y+snakeSize; 
                        head[2].x=head[1].x-snakeSize;
                        head[2].y=head[1].y; 
                        head[3].x=head[1].x-snakeSize;
                        head[3].y=head[1].y+snakeSize; 
                    break;
                    case 180:
                        head[1].x=head[0].x-snakeSize;
                        head[1].y=head[0].y; 
                        head[2].x=head[1].x;
                        head[2].y=head[1].y-snakeSize; 
                        head[3].x=head[1].x-snakeSize;
                        head[3].y=head[1].y-snakeSize; 
                    break;
                    case 270:
                        head[1].x=head[0].x;
                        head[1].y=head[0].y-snakeSize; 
                        head[2].x=head[1].x+snakeSize;
                        head[2].y=head[1].y; 
                        head[3].x=head[2].x;
                        head[3].y=head[1].y-snakeSize; 
                    break;
                };
            break;
            case 1:
                switch(rotation){
                    case 0:
                        head[1].x=head[0].x+snakeSize;
                        head[1].y=head[0].y; 
                        head[2].x=head[0].x+snakeSize*2;
                        head[2].y=head[0].y; 
                    break;
                    case 90:
                        head[1].x=head[0].x;
                        head[1].y=head[0].y-snakeSize; 
                        head[2].x=head[0].x;
                        head[2].y=head[0].y-snakeSize*2; 
                    break;
                    case 180:
                        head[1].x=head[0].x+snakeSize;
                        head[1].y=head[0].y; 
                        head[2].x=head[0].x+snakeSize*2;
                        head[2].y=head[0].y; 
                    break;
                    case 270:
                        head[1].x=head[0].x;
                        head[1].y=head[0].y-snakeSize; 
                        head[2].x=head[0].x;
                        head[2].y=head[0].y-snakeSize*2; 
                    break;
                };
                break;
                case 2:
                switch(rotation){
                    case 0:
                        head[1].x=head[0].x+snakeSize;
                        head[1].y=head[0].y; 
                        head[2].x=head[0].x+snakeSize*2;
                        head[2].y=head[0].y; 
                        head[3].x=head[0].x;
                        head[3].y=head[0].y+snakeSize; 
                    break;
                    case 90:
                        head[1].x=head[0].x;
                        head[1].y=head[0].y+snakeSize; 
                        head[2].x=head[0].x;
                        head[2].y=head[0].y+snakeSize*2; 
                        head[3].x=head[0].x-snakeSize;
                        head[3].y=head[0].y; 
                    break;
                    case 180:
                        head[1].x=head[0].x-snakeSize;
                        head[1].y=head[0].y; 
                        head[2].x=head[0].x-snakeSize*2;
                        head[2].y=head[0].y; 
                        head[3].x=head[0].x;
                        head[3].y=head[0].y-snakeSize; 
                    break;
                    case 270:
                        head[1].x=head[0].x;
                        head[1].y=head[0].y-snakeSize; 
                        head[2].x=head[0].x;
                        head[2].y=head[0].y-snakeSize*2; 
                        head[3].x=head[0].x+snakeSize;
                        head[3].y=head[0].y; 
                    break;
                };
            break;
            case 3:
                switch(rotation){
                    case 0:
                        head[1].x=head[0].x+snakeSize;
                        head[1].y=head[0].y; 
                        head[2].x=head[0].x+snakeSize*2;
                        head[2].y=head[0].y; 
                        head[3].x=head[0].x+snakeSize;
                        head[3].y=head[0].y+snakeSize; 
                    break;
                    case 90:
                        head[1].x=head[0].x;
                        head[1].y=head[0].y-snakeSize; 
                        head[2].x=head[0].x;
                        head[2].y=head[0].y-snakeSize*2; 
                        head[3].x=head[0].x-snakeSize;
                        head[3].y=head[0].y-snakeSize; 
                    break;
                    case 180:
                        head[1].x=head[0].x-snakeSize;
                        head[1].y=head[0].y; 
                        head[2].x=head[0].x-snakeSize*2;
                        head[2].y=head[0].y; 
                        head[3].x=head[0].x-snakeSize;
                        head[3].y=head[0].y-snakeSize; 
                    break;
                    case 270:
                        head[1].x=head[0].x;
                        head[1].y=head[0].y-snakeSize; 
                        head[2].x=head[0].x;
                        head[2].y=head[0].y-snakeSize*2; 
                        head[3].x=head[0].x+snakeSize;
                        head[3].y=head[0].y-snakeSize; 
                    break;
                };
            break;
            case 4:
            break;
            //kiedyś
        };
    };
    function stop(){
        rotation=0;
        for(var tile in head){
            for(var nr=0;nr<tileX.length;nr++){
                if(tileX[nr].x==head[tile].x&&tileX[nr].y==head[tile].y){
                    tileOccupied[tileOccupied.length]=new Rectangle (tileX[nr].x , tileX[nr].y , head[tile].color , snakeSize , tileOccupied.length);
                    tileOccupied[tileOccupied.length-1].line=tileX[nr].line;
                    tileOccupied[tileOccupied.length-1].direction="none";
                    tilesInRow[tileX[nr].line]++;
                    if(tileX[nr].y==snakeSize){
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
                    tileOccupied[tile].y+=snakeSize;
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
    function touching(who){
        for(var nr=0;nr<tileOccupied.length;nr++){
            if(tileOccupied[nr].x==who.x && tileOccupied[nr].y==who.y+who.size){
                return true;
            };
        };
        return false;
    };
    function Rectangle(x , y , color , size , number){
        this.rotation=0;
        this.x = x;
        this.y = y;
        this.shape = 0;
        this.direction = "down";
        this.number = number;
        this.size = size;
        this.color = color;
        this.line=-1;
        this.draw = function() {
            if(this.direction!="none"){
                switch(this.direction){
                    case "down":
                        this.y = this.y + this.size;
                    break;
                    case "left":
                    
                        if(this.x> 0){
                            this.x = this.x - this.size;
                        };
                        this.direction="down";
                    break;
                    case "right":
                        if(this.x< sumX * snakeSize-this.size){
                            this.x = this.x + this.size;
                        };
                        this.direction="down";
                    break;
                };
            };
            context.beginPath();
            context.fillStyle = this.color;
            context.save();
            context.translate(head[0].x,head[0].y);
            context.rotate(this.rotation* Math.PI/180);
            context.translate(-head[0].x,-head[0].y);
            context.rect(this.x , this.y , this.size , this.size);
            context.restore();
            context.fill();
            context.closePath();
        };
    };
    resizeCanvas();
    restart(); 
})();