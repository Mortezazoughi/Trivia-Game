$(document).ready(function () {
    var options = [
        {
            question: "What is the smallest bone in the body?", 
            choice: ["Hamate", "Ear", "Trapezium", "Lumate"],
            answer: 1,
            photo: "assets/images/earbone.jpg"
         },
         {
             question: "Which is the only mammal that can’t jump?", 
            choice: ["Elephant", "Red Panda", "Polar Bear", "Opossum"],
            answer: 0,
            photo: "assets/images/Elephant.jpg"
         }, 
         {
             question: "What nationality was Chopin?", 
            choice: ["German", "Russian", "Polish", "Italian" ],
            answer: 2,
            photo: "assets/images/Chopin.jpg"
        }, 
        {
            question: "How many dots are there on two dice?", 
            choice: ["40", "45", "42", "38" ],
            answer: 2,
            photo: "assets/images/Dice.jpg"
        }, 
        {
            question: "How many items are there in a Bakers' Dozen?", 
            choice: ["12", "6", "24", "13" ],
            answer: 3,
            photo: "assets/images/dozen.jpg"
        }, 
        {
            question: "What is the most widely eaten fish in the world?", 
            choice: ["Tilapia", "Herring", "Sardine", "Tuna" ],
            answer: 1,
            photo: "assets/images/herring.jpg"
        }, 
        {
            question: "Which fruit does not ripen once it has been picked?", 
            choice: ["Banana", "Lemon", "Mango", "Apple" ],
            answer: 1,
            photo: "assets/images/lemon.gif"
        }, 
        {
            question: "How many children has Queen Elizabeth the Second got?", 
            choice: ["4", "6", "3", "1" ],
            answer: 0,
            photo: "assets/images/queenelizabeth.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it to check the answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })