window.onload = function() {
    // Define the canvas variable
    var canvas = document.getElementById('defaultCanvas');
    var ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, 600, 450);
    ctx.fillStyle = "black";
    var w = canvas.width;
    var h = canvas.height;
    var cw = 15; //cell width
    var d = "right"; //direction
    var food; //food
    var score = 0; //score
    var speed = 130;
    //snake array
    var snake_array;

    //initializer

    function init() {
        create_snake();
        create_food();
        score = 0;
        if (typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, speed);
        return ;  
    }
     
    init();

    function create_snake() {
        var length = 5;
        snake_array = [];
        for (var i = length - 1; i >= 0; i--) {
            snake_array.push({
                x: i,
                y: 0
            });
        }
    }

    function create_food() {
        food = {
            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw)
        };

    }

    function paint(){
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "white";
        ctx.strokeRect(0, 0, w, h);

        var nx = snake_array[0].x;
        var ny = snake_array[0].y;

        if(d == "right") nx++;
        else if(d == "left") nx--;
        else if(d == "up") ny--;
        else if(d == "down") ny++;

        //collide code
        if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx,ny,snake_array))
        {
            
            document.getElementById("final_score").innerHTML = score;
            document.getElementById("overlay").style.display = "block";
            clearInterval(game_loop);
            return ;
        }

        if(nx == food.x && ny == food.y)
        {
            var tail = {
                x: nx,
                y: ny
            };
            score++;
            create_food();
        }
        else
        {
            var tail = snake_array.pop();
            tail.x = nx;
            tail.y = ny;
        }

        snake_array.unshift(tail);

        for(var i=0;i<snake_array.length;i++)
        {
            console.log(snake_array.length)
            var c = snake_array[i];
            console.log(c);
            paint_cell(c.x,c.y);
        }

        paint_cell(food.x,food.y);
        
        document.onkeydown = function(event)
             {
        var key = event.which;
        if(key == "37" && d!= "right") d = "left";
        else if(key == "38" && d!= "down") d = "up";
        else if(key == "39" && d!= "left") d = "right";
        else if(key == "40" && d != "up") d = "down";
            }

    }

    function paint_cell(x,y)
    {
        ctx.fillStyle = "red";
        ctx.fillRect(x*cw,y*cw,cw,cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x*cw,y*cw,cw,cw);
    }

    function check_collision(x, y, array){
        for(var i = 0;i < array.length;i++){
            if(array[i].x == x && array[i].y ==y)
                return true;
        }
        return false;
    }

    

    
}
