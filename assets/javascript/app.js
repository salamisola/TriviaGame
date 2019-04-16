//Array of Questions to display when game starts
var questions = [{
            ques: "Which is the only American state to begin with the letter 'p'?",
            options: ["Port-Harcourt", "Pennsylvania", "Plateau", "Puerto Rico"],
            name: "firstQuestion",
            correct: "Pennsylvania",
            divClass: ".firstQuestion"
        },
        {
            ques: "Name the world's biggest island.?",
            options: ["Iceland", "Greenland", "Graceland", "Netherland"],
            name: "secondQuestion",
            correct: "Greenland",
            divClass: ".secondQuestion"
        },
        {
            ques: "What is the world's longest river?",
            options: ["Ireland", "Nile", "Amazon", "Congo."],
            name: "thirdQuestion",
            correct: "Amazon",
            divClass: ".thirdQuestion"
        },
        {
            ques: "Name the world's largest ocean.",
            options: ["Atlantic", "Pacific", "India Ocean", "Eleko"],
            name: "fourthQusetion",
            correct: "Pacific",
            divClass: ".fourthQusetion"
        },
        {
            ques: "What is the diameter of Earth?",
            options: ["8,000 miles", "6,500 miles", "7,000 miles", "9,000 miles"],
            name: "fifthQuestion",
            correct: "8,000 miles",
            divClass: ".fifthQuestion"
        },
        {
            ques: "Where would you find the world's most ancient forest?",
            options: ["England", "Daintree Forest north of Cairns, Australia.", "Thailand", "South China"],
            name: "sixthQuestion",
            correct: "Daintree Forest north of Cairns, Australia.",
            divClass: ".sixthQuestion"
        },
        {
            ques: "Which four British cities have underground rail systems?",
            options: ["Nothingham, North Hampton, Oxford, Reading", "Liverpool, Glasgow, Newcastle and London.", "New Castle, Leisterster, Thames, Essex", "Derby, Ripley,Warwick,Birmingham"],
            name: "seventhQuestion",
            correct: "Liverpool, Glasgow, Newcastle and London.",
            divClass: ".seventhQuestion"
        },
        {
            ques: "What is the capital city of Spain?",
            options: ["Madrid", " Monticarlo", "Barcelona", "Dartford"],
            name: "eigthQuestion",
            correct: "Madrid",
            divClass: ".eigthQuestion"
        },
        {
            ques: "Which country is Prague in?",
            options: ["Czech Republic", "New York", "South Africa", "France"],
            name: "ninthQuestion",
            correct: "Czech Republic",
            divClass: ".ninthQuestion"
        },
        {
            ques: "Which English town was a forerunner of the Parks Movement and the first city in Europe to have a street tram system?",
            options: ["Birkenhead", "Bristol", "Whales", "Belfast"],
            name: "tenthQuestion",
            correct: "Birkenhead",
            divClass: ".tenthQuestion"
        }
    ] // end questions array

var labels = ["first", "second", "third", "forth"];
$("#reset").hide();

// click to start then display quesions
var startGame = $("#start-game").on('click', function() {
    $(this).parent().hide();
    $('.questionContainer').show();
    countdown(60);
    questionDisplay();
});

// function for displaying questions
var questionDisplay = function() {
    $(".questions :not('#submit-button')").empty();
    // loops through the 10 questions 
    for (var j = 0; j < 10; j++) {
        $('.questions').prepend('<div class="' + questions[j].name + '"></div>');
        $(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
        // loops through answers for each radio button
        for (var i = 0; i <= 3; i++) {
            $(questions[j].divClass).append('<input type="radio"  name="' + questions[j].name + '" value="' + questions[j].options[i] + '"/><label for="' + labels[i] + '">' + questions[j].options[i] + '</label>');
        }
        $('.questions').prepend('<hr />');
    }
}


// function for countdown timer
var countdown = function(seconds) {

    var timer = setInterval(function() {
        seconds = seconds - 1;
        $("#timeRemain").html(seconds);

        if (seconds <= 0) {
            $('.questionContainer').fadeOut(500);
            var correctAnswers = 0;
            var wrongAnswers = 0;
            var unAnsweredQuestions = 0;

            // loop through correctArray & radioName to match html elements & answers
            for (var i = 0; i < 10; i++) {

                if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

                    correctAnswers++;
                    console.log("this is correct! number:" + i)
                } else {
                    wrongAnswers++;
                    console.log("this is wrong! number:" + i)
                };
            }
            $('#correctAnswersGameOver').append(correctAnswers);
            // display wrongAnswers
            $('#wrongAnswerGameOver').append(wrongAnswers);
            $('#gameOver').fadeIn(1000).show();

            // alert("Times Up!");
            clearInterval(timer);
            return;
        }
    }, 1000);

    // click event for submit button to stop timer
    $('#submit-button').on('click', function() {
        clearInterval(timer);
    })
}; // end countdown


// function to calcuate scores after submit button is clicked
var scores = $('#submit-button').on('click', function() {

    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnsweredQuestions = 0;

    // loop through correctArray & radio button Name to match html elements & answers
    for (var i = 0; i < 10; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

            correctAnswers++;
        } else {
            wrongAnswers++;
        };
    };

    
    // stop timer after submission
    countdown();
    // hide question page after submission
    $('.questionContainer').fadeOut(500);
    // show answerScreen
    $('#answerPage').show();
    // display correctAnswers
    $('#correctAnswerPage').append(correctAnswers);
    // display wrongAnswers
    $('#wrongAnswerPage').append(wrongAnswers);
    // to reset game with a reference to the play again button - not working yet.
    $("#reset").show();
    

}); 

// end 