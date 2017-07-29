 "use strict";

(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    var head =[];
    var color = Math.floor(Math.random() * (4));
    var backgroundColor = "silver";
    var shape;
    var tileX=[];
    var tileOccupied=[];
    var animation;
    var snakeSize = 40;
    var sumX =Math.floor(window.innerWidth / snakeSize);
    var sumY =Math.floor(window.innerHeight / snakeSize);
    
    function restart(){
        setShape();



        var nr=0;
        for(var nrX=0;nrX<sumX;nrX++){
            for(var nrY=0;nrY<sumY;nrY++){
            tileX[nr]= new Rectangle (snakeSize*nrX,
                                        snakeSize*nrY,
                                        backgroundColor,
                                        snakeSize,
                                        nr);
            tileX[nr].direction="none";
            nr++;
            };
        };

        clearInterval(animation);
        animation = setInterval(draw , 400);
    };

    function setShape(){
        shape=Math.floor(Math.random() * (4));
        color = "#"+((1<<24)*Math.random()|0).toString(16);
        switch(shape){
            case 0:
                head=[];
                head[0] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                head[3] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize*2,
                +snakeSize,
                color ,
                snakeSize ,
                -1);
                break;
            case 1:
                head=[];
                head[0] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+ snakeSize*2,
                0,
                color ,
                snakeSize ,
                -1);
            break;
            case 2:
                head=[];
                head[0] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+ snakeSize*2,
                0,
                color ,
                snakeSize ,
                -1);
                head[3] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                break;
            case 3:
                head=[];
                head[0] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+ snakeSize*2,
                0,
                color ,
                snakeSize ,
                -1);
                head[3] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                break;
            case 4:
                head=[];
                head[0] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2,
                0,
                color ,
                snakeSize ,
                -1);
                head[1] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize,
                0,
                color ,
                snakeSize ,
                -1);
                head[2] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                head[3] = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2+snakeSize,
                snakeSize,
                color ,
                snakeSize ,
                -1);
                break;
        };
    };



    function resizeCanvas() {
        sumX =Math.floor(window.innerWidth / snakeSize);
        sumY =Math.floor(window.innerHeight / snakeSize);
        canvas.width = sumX * snakeSize;
        canvas.height = sumY * snakeSize;
    };

    function draw() {
        context.beginPath();
        context.clearRect(0 , 0 , window.innerWidth , window.innerHeight);
        context.rect(0 , 0 , window.innerWidth , window.innerHeight);
        context.fillStyle = backgroundColor;
        context.fill();
        context.closePath();




        for(var nr=0;nr<tileX.length;nr++){
            tileX[nr].draw();
        };
        for(var tile in head){
            if(head[tile]!=undefined && (head[tile].y > window.innerHeight-head[tile].size * 2 || touching(head[tile])  )){
                stop();
            };
        }
        for(var tile in head){
            head[tile].draw();
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
            for(var tile in head){
                head[tile].direction !== "up" ? head[tile].direction = "down" : head[tile].directory=head[tile].directory;
            };
            break;
        };
    });

    function stop(){

        for(var tile in head){
            for(var nr=0;nr<tileX.length;nr++){
                if(tileX[nr].x==head[tile].x&&tileX[nr].y==head[tile].y){
                    tileX[nr].color=head[tile].color;
                    tileOccupied[tileOccupied.length] = tileX[nr];
                };
            };
        };
        setShape();
    };

    function touching(who){
        for(var nr=0;nr<tileOccupied.length;nr++){
            if(tileOccupied[nr].x==who.x && tileOccupied[nr].y==who.y+who.size){
                return true;
            };
        };
        return false;
    };

    function Rectangle(x , y , color , size , number){
        this.x = x;
        this.y = y;
        this.shape = 0;
        this.direction = "down";
        this.number = number;
        this.size = size;
        this.color = color;
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
            context.rect(this.x , this.y , this.size , this.size);
            context.fill();
            context.closePath();
        };
    };


    resizeCanvas();
    restart();
    
})();