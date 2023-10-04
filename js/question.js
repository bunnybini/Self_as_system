document.addEventListener("DOMContentLoaded", function () {
  // Define the questions and answers
  var questions = [
    {
      question: "When should I wake up?",
      options: [
        { text: "8:00 AM", percentage: 100 },
        { text: "11:00 AM", percentage: 85 },
        { text: "01:00 PM", percentage: 60 },
      ],
    },
    {
      question: "My brain is awake, but not my body. What should I do?",
      options: [
        { text: "Play with the phone", percentage: 30 },
        {
          text: "Get up",
          percentage: 90,
        },
      ],
    },
    {
      question: "I'm out of my bed. What should I do first?",
      options: [
        { text: "Prepare breakfast", percentage: 50 },
        { text: "Remove makeup", percentage: 20 },
      ],
    },
    {
      question: "While I'm eating breakfast, what should I do?",
      options: [
        { text: "Animation(20 mins)", percentage: 50 },
        { text: "Netflix (50 mins)", percentage: 90 },
        { text: "Review homework", percentage: 40 },
      ],
    },
    {
      question: "The weather is fantastic today, should I go outside?",
      options: [
        { text: "YAY let's chill!", percentage: 50 },
        { text: "Sure,but with computer", percentage: 20 },
        { text: "NO!", percentage: 0 },
      ],
    },
    {
      question: "What kind of song should I listen to while making 3D models?",
      options: [
        { text: "K-pop", percentage: 0 },
        { text: "Pop", percentage: 0 },
        { text: "J-pop", percentage: 0 },
      ],
    },
    {
      question: "It's almost 8:00 PM, but I'm craving food",
      options: [
        { text: "It's too late", percentage: 90 },
        { text: "Spicy food", percentage: 0 },
        { text: "Dessert", percentage: 0 },
      ],
    },
    {
      question: "Oh my gosh..I forgot to do my landruy",
      options: [
        { text: "Do it right now", percentage: 90 },
        { text: "Homework first", percentage: 50 },
      ],
    },
    {
      question: "It's 10:00PM, am I focusing on my work?",
      options: [
        {
          text: "Yes, you are into it",
          percentage: 5,
        },
        { text: "Give me your phone", percentage: 5 },
      ],
    },
    {
      question: "It's 11:59pm. Have I successfully submit my homework?",
      options: [
        { text: "Yes!! Well done", percentage: 1 },
        { text: "Dont know", percentage: 50 },
      ],
    },
  ];

  var contexts = [
    "You woke up feeling refreshed and ready to start your day.",
    "You're lying in bed with your brain buzzing, but your body is still asleep.",
    "You woke up feeling refreshed and ready to start your day.",
    "You're lying in bed with your brain buzzing, but your body is still asleep.",
    "You woke up feeling refreshed and ready to start your day.",
    "You're lying in bed with your brain buzzing, but your body is still asleep.",
    "You woke up feeling refreshed and ready to start your day.",
    "You're lying in bed with your brain buzzing, but your body is still asleep.",
    "You woke up feeling refreshed and ready to start your day.",
    "You're lying in bed with your brain buzzing, but your body is still asleep.",
  ];

  var currentQuestionIndex = 0;
  var score = 0;
  var isAnswerSelected = false;

  var contextTextElement = document.getElementById("contexts");

  // Get HTML elements
  var questionElement = document.getElementById("question");
  var optionsElement = document.getElementById("answers");
  var nextButton = document.getElementById("next-btn");
  var resultElement = document.getElementById("result");

  // Get HTML elements for the guess page
  var guessContainer = document.getElementById("guess-container");
  var guessInput = document.getElementById("guess-input");
  var guessButton = document.getElementById("guess-btn");

  // Declare resultContainer here so it's accessible in the event listener
  var resultContainer = document.getElementById("result-container");

  // Show the first question
  showQuestion();

  // Call displayContext when the page loads
  // displayContext();

  function displayContext() {
    // Display the context
    contextTextElement.textContent = contexts[currentQuestionIndex];
  }
  // Function to display the current question and options
  function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    // Display the question
    questionElement.textContent = currentQuestion.question;

    // Clear any existing answer options
    optionsElement.innerHTML = "";

    for (var i = 0; i < currentQuestion.options.length; i++) {
      var option = currentQuestion.options[i];
      var button = document.createElement("button");
      button.textContent = option.text;
      button.classList.add("btn", "top_ani"); // Add "top_ani" class to each button
      button.addEventListener("click", createOptionClickListener(option));

      optionsElement.appendChild(button);
    }

    function createOptionClickListener(option) {
      return function () {
        // Check if the selected answer is correct
        if (!isAnswerSelected) {
          var percentage = option.percentage; // Get the percentage value from the option

          // Update the score
          score += percentage;

          isAnswerSelected = true;

          // Disable all answer options
          disableOptions();

          // Show the next button
          nextButton.style.display = "block";

          // Remove the "btn-answer-selected" class from all buttons
          var answerButtons = document.getElementsByClassName("answer");
          for (var j = 0; j < answerButtons.length; j++) {
            answerButtons[j].classList.remove("btn-answer-selected");
          }

          // Add the "btn-answer-selected" class to the clicked button
          this.classList.add("btn-answer-selected");
        }
      };
    }

    // Display the context if there are more questions to show
    if (currentQuestionIndex < questions.length) {
      displayContext();
    } else {
      // Hide the context when you reach the last question
      contextTextElement.textContent = "";
    }
  }

  // Function to disable all answer options
  function disableOptions() {
    var options = document.getElementsByClassName("answer");
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = true;
    }
  }

  // Event listener for the next button
  nextButton.addEventListener("click", function () {
    // Hide the next button
    nextButton.style.display = "none";

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
      isAnswerSelected = false;
      // Show the next question

      showQuestion();
    } else {
      // Show the guess page when all questions are answered
      showGuessPage();
      // Show the final result
    }
  });

  // Function to display the final result
  function showResult() {
    // Hide the quiz container
    var quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";

    // Show the result container
    var resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";

    // Calculate the stress level percentage based on the score
    var stressLevelPercentage = (score / (questions.length * 100)) * 100;

    // Display the stress level percentage
    resultElement.textContent =
      "My stress level: " + stressLevelPercentage.toFixed(2) + "%";

    // Add text based on the stress level percentage
    var textElement = document.createElement("p");

    if (stressLevelPercentage < 30) {
      textElement.textContent =
        "Wow, congratulations! My stress level is miraculously low. How impressive that you seem to know me so well!! Feel free to click on 'more detail' if you're dying to know how I managed to create this masterpiece with my data!";
    } else if (stressLevelPercentage < 70) {
      textElement.textContent =
        "Hmm, not too shabby... Let's hope we get to know each other even better. Don't hesitate to click on 'more detail' if you're curious about the intriguing story behind how I crafted this game with my data!";
    } else {
      textElement.textContent =
        "Oh, I'm practically on the brink of death thanks to the stress you've generously gifted me! We definitely need to have a chat soon... If you dare, click on 'more detail' to discover the thrilling secrets about yours truly.";

      // Set the background image if needed
      document.body.style.backgroundImage = 'url("./Image/pawSAD.jpg")';
    }

    resultContainer.appendChild(textElement);

    // Show the endingBox
    var endingBox = document.querySelector(".endingBox");
    endingBox.style.display = "flex";
  }

  // Show the guess page when all questions are answered
  function showGuessPage() {
    // Hide the quiz container and result container
    var quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";
    var resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "none";

    var contextContainer = document.querySelector(".contextcontainer");
    contextContainer.style.display = "none";

    // Show the guess container
    guessContainer.style.display = "block";
  }

  // Event listener for the guess button
  guessButton.addEventListener("click", function () {
    var userGuess = parseFloat(guessInput.value);

    // Validate the user's guess
    if (!isNaN(userGuess) && userGuess >= 0 && userGuess <= 100) {
      // Calculate the absolute difference between user's guess and actual stress level
      var actualStressLevel = (score / (questions.length * 100)) * 100;
      var difference = Math.abs(userGuess - actualStressLevel);

      // Provide feedback based on the difference
      var feedback = "";
      if (difference <= 10) {
        feedback = "You are very close to the actual stress level!";
      } else if (difference <= 20) {
        feedback = "You are close to the actual stress level.";
      } else {
        feedback = "You are quite far from the actual stress level.";
      }

      // Display the feedback
      resultElement.textContent = feedback;
      guessContainer.style.display = "none";
      resultContainer.style.display = "block";

      // Call showResult after providing feedback
      showResult();
    } else {
      // Invalid input, show an error message
      alert("Please enter a valid guess between 0 and 100.");
    }
  });

  // Disable the guess button initially
  guessButton.disabled = true;

  // Enable the guess button when there's input in the guess field
  guessInput.addEventListener("input", function () {
    if (guessInput.value.trim() !== "") {
      guessButton.disabled = false;
    } else {
      guessButton.disabled = true;
    }
  });
});
