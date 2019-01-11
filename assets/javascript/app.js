$(document).ready(function () {
    // Array of objects containing a question, answer array and correct answer
    var triviaQuestions = [{
        question: "https://i.imgur.com/JWJMiSC.jpg",
        answerList: ["a. James Kirk", "b. Jean Luc Picard", "c. Rachel Garret", "d. Christopher Pike"],
        answer: 1
    }, {
        question: "Today is a good day to die! A popular saying by the _________ ?",
        answerList: ["a. Klingons", "b. Humans", "c. Romulans", "d. Vulcans"],
        answer: 0
    }, {
        question: "Live Long and _________.",
        answerList: ["a. Party", "b. Buy Property", "c. Prosper", "d. Peacfull"],
        answer: 2
    }, {
        question: "Spock is half Vulcan, half ________ ?",
        answerList: ["a. Human", "b. Klingon", "c. Romulan", "d. Andorian"],
        answer: 0
    }, {
        question: "Terok Nor is the Cardassian name for this Space Station",
        answerList: ["a. Starbase 47", "b. Deep Space Station K-7", "c. Jupiter Station", "d. Deep Space Nine"],
        answer: 3
    }, {
        question: "First Contact was made with this alien species",
        answerList: ["a. Romulan", "b. Klingon", "c. Ferengi", "d. Vulcans"],
        answer: 3
    }, {
        question: "Starfleet Headquarters are located in this city",
        answerList: ["a. San Francisco", "b. Paris", "c. Munich", "d. London"],
        answer: 0
    }, {
        question: "How many Star Trek movies have there been all together?",
        answerList: ["a. 10", "b. 15", "c. 13", "d. 8"],
        answer: 2
    }];

    // Declare global variables
    var correctAnswer;
    var incorrectAnswer;
    var answered;
    var unanswered;
    var time;
    var seconds;
    var playerChoice;
    var currentQuestion;
    var messages = {
        correct: "That's Correct!",
        incorrect: "Sorry, Incorrect",
        outOfTime: "No Time Left",
        complete: "Computing your results",
    }

    // Hides the borders of the current, answer and score div
    $(".current").hide();
    $(".answer").hide();
    $(".score").hide();

    // Start Button
    $("#startBtn").on("click", function () {
        $(this).hide();
        newGame();
    });

    // Restart Button
    $("#startOverBtn").on("click", function () {
        $(this).hide();
        newGame();
    });

    // Sets up a new game
    function newGame() {
        $(".current").show();
        $("#finalMessage").empty();
        $("#correctAnswers").empty();
        $("#incorrectAnswers").empty();
        $("#unanswered").empty();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
    }

    // Sets up a new question
    function newQuestion() {
        $(".answer").hide();
        $(".score").hide();
        $("#message").empty();
        $("#correctedAnswer").empty();
        answered = true;
        // Displays current question number out of total question number "
        $("#currentQuestion").html("Question #" + (currentQuestion + 1) + "/" + triviaQuestions.length);
        // Displays question
        $(".question").html("<img src="+ triviaQuestions[currentQuestion].question);
        // Loop through answer array, creates a div for each answer and assigns attr of data index and a class of thischoice
        for (var i = 0; i < 4; i++) {
            var choices = $("<div>");
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({
                "data-index": i
            });
            choices.addClass("thisChoice");
            $(".answerList").append(choices);
        }
        countdown();
        // Gets player answer
        $(".thisChoice").on("click", function () {
            playerChoice = $(this).data("index");
            clearInterval(time);
            answerPage();
        });
    }

    // Countdown Timer
    function countdown() {
        seconds = 10;
        answered = true;
        $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
        time = setInterval(showCountdown, 1000);
    }
    function showCountdown() {
        seconds--;
        $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
        if (seconds === 0) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    // Check Answer Function
    function answerPage() {
        $(".answer").show();
        $("#currentQuestion").empty();
        $(".thisChoice").empty();
        $(".question").empty();

        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

        if ((playerChoice == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $("#message").html(messages.correct);
        } else if ((playerChoice != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $("#message").html(messages.incorrect);
            $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
        } else {
            unanswered++;
            $("#message").html(messages.endTime);
            $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
            answered = true;
        }

        if (currentQuestion == (triviaQuestions.length - 1)) {
            setTimeout(scoreboard, 2500)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 3000);
        }
    }

    // Results Function
    function scoreboard() {
        $(".score").show();
        $(".current").hide();
        $(".answer").hide();
        $("#timeLeft").empty();
        $("#message").empty();
        $("#correctedAnswer").empty();
        $("#finalMessage").html(messages.finished);
        $("#correctAnswers").html("Correct Answers: " + correctAnswer);
        $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
        $("#unanswered").html("Unanswered: " + unanswered);
        $("#startOverBtn").addClass('reset');
        $("#startOverBtn").show();
    }
});