 "use strict";

(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    var head;
    var tileX=[];
    var tileOccupied=[];
    var animation;
    var snakeSize = 40;
    var sumX =Math.floor(window.innerWidth / snakeSize);
    var sumY =Math.floor(window.innerHeight / snakeSize);
    
    function restart(){
        head = new Rectangle ( (Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2,
         0,
          "silver" ,
           snakeSize ,
            -1,
            Math.floor(Math.random() * (4)));

        var nr=0;
        for(var nrX=0;nrX<sumX;nrX++){
            for(var nrY=0;nrY<sumY;nrY++){
            tileX[nr]= new Rectangle (snakeSize*nrX,
                                        snakeSize*nrY,
                                        "white",
                                        snakeSize,
                                        nr,
                                        0);
            tileX[nr].direction="none";
            nr++;
            };
        };


        clearInterval(animation);
        animation = setInterval(draw , 400);
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
        context.fillStyle = 'white';
        context.fill();
        context.closePath();

        for(var nr=0;nr<tileX.length;nr++){
            tileX[nr].draw();
        };

        head.draw();
    };
    window.addEventListener('resize' , resizeCanvas , false);
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 68: // D
            case 39: // down
                head.direction !== "left" ? head.direction = "right" : head.directory=head.directory;
            break;
            case 65: // A
            case 37: // left
                head.direction !== "right" ? head.direction = "left" : head.directory=head.directory;
            break;
            case 83: // S
            case 40: // down
                head.direction !== "up" ? head.direction = "down" : head.directory=head.directory;
            break;
        };
    });

    function stop(){
        head.direction="none";
        for(var nr=0;nr<tileX.length;nr++){
            if(tileX[nr].x==head.x&&tileX[nr].y==head.y){
                tileOccupied[tileOccupied.length] = tileX[nr];
                tileX[nr].color=head.color;
                head.color = "#"+((1<<24)*Math.random()|0).toString(16);
                head.x=(Math.floor(window.innerWidth / snakeSize)/2) * snakeSize -snakeSize/2;
                head.y= 0;
                head.shape=Math.floor(Math.random() * (4));
                head.direction = "down";
            };
        };
    };

    function touching(){
        for(var nr=0;nr<tileOccupied.length;nr++){
            switch(head.shape){
                case 0:
                    //x
                    if(tileOccupied[nr].x==head.x && tileOccupied[nr].y==head.y+head.size){
                        return true;
                    };
                    break;
                case 1:
                    //xxx
                    if(tileOccupied[nr].x==head.x||tileOccupied[nr].x==head.x+head.size||tileOccupied[nr].x==head.x+head.size*2 
                        && tileOccupied[nr].y==head.y+head.size){
                        return true;
                    };
                break;
                case 2:
                    //xxx
                    // x

                break;
                case 3:
                    //xxx
                    //x

                break;
                case 4:
                    //xx
                    //xx

                break;
            };
        };
        return false;
    };

    function Rectangle(x , y , color , size , number, shape){
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.direction = "down";
        this.number = number;
        this.size = size;
        this.color = color;
        this.draw = function() {
            if(this.number<0){
                if(this.y > window.innerHeight-this.size * 2 || touching()  ){
                    stop();
                };
            };

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
            switch(this.shape){
                case 0:
                    //x
                    context.rect(this.x , this.y , this.size , this.size);
                break;
                case 1:
                    //xxx
                    context.rect(this.x , this.y , this.size , this.size);
                    context.rect(this.x +this.size, this.y , this.size , this.size);
                    context.rect(this.x +this.size*2, this.y , this.size , this.size);
                break;
                case 2:
                    //xxx
                    // x
                    context.rect(this.x , this.y , this.size , this.size);
                    context.rect(this.x + this.size, this.y , this.size , this.size);
                    context.rect(this.x+ this.size*2, this.y , this.size , this.size);
                    context.rect(this.x+ this.size, this.y +this.size, this.size , this.size);
                break;
                case 3:
                    //xxx
                    //x
                    context.rect(this.x, this.y , this.size , this.size);
                    context.rect(this.x+ this.size, this.y , this.size , this.size);
                    context.rect(this.x+ this.size*2, this.y , this.size , this.size);
                    context.rect(this.x, this.y + this.size, this.size , this.size);
                break;
                case 4:
                    //xx
                    //xx
                    context.rect(this.x, this.y , this.size , this.size);
                    context.rect(this.x, this.y + this.size, this.size , this.size);
                    context.rect(this.x + this.size, this.y , this.size , this.size);
                    context.rect(this.x + this.size, this.y + this.size, this.size , this.size);
                break;
            };
            context.fill();
            context.closePath();
        };
    };


    resizeCanvas();
    restart();
    
})();