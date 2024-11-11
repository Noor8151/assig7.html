$(document).ready(function () {
  let questions = [];
  let userAnswers = [];

  const apiKey = "YOUR_API_KEY"; // Replace this with your actual API key

  // Function to fetch quiz questions from QuizAPI
  function fetchQuizQuestions(category) {
    const url = `https://cors-anywhere.herokuapp.com/https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=10&category=${category}`;

    console.log(`Fetching data from: ${url}`); // Log the URL for debugging

    $.get(url, function (data) {
      console.log("API Response:", data); // Log the API response

      if (data && data.length > 0) {
        questions = data;
        displayQuestions();
      } else {
        alert("No questions found.");
      }
    }).fail(function (xhr, status, error) {
      console.error("API request failed:", error); // Log the error details
      alert("Failed to fetch quiz questions. Please try again.");
    });
  }

  // Function to display quiz questions and options
  function displayQuestions() {
    $("#quiz-container").empty(); // Clear the container before adding new questions

    questions.forEach((question, index) => {
      let options = [...question.incorrect_answers];
      options.push(question.correct_answer); // Add the correct answer to the options array
      options = shuffle(options); // Shuffle options to randomize their order

      let questionHTML = `
                <div class="question" data-index="${index}">
                    <h3>${question.question}</h3>
                    <div class="options">
            `;

      options.forEach((option) => {
        questionHTML += `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label><br>
                `;
      });

      questionHTML += `</div></div>`;
      $("#quiz-container").append(questionHTML); // Append the question HTML to the container
    });

    $("#submit-quiz").show(); // Show the submit button after questions are displayed
  }

  // Function to shuffle options
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5); // Randomize the array
  }

  // Start quiz button event
  $("#start-quiz").click(function () {
    const category = $("#category").val(); // Get selected category

    if (!category) {
      alert("Please select a category!"); // Ensure a category is selected
      return;
    }

    fetchQuizQuestions(category); // Fetch questions based on selected category
    $("#start-quiz").hide(); // Hide the start button after quiz starts
  });

  // Submit quiz button event
  $("#submit-quiz").click(function () {
    let score = 0;

    // Check answers
    questions.forEach((question, index) => {
      const selectedAnswer = $(`input[name="question${index}"]:checked`).val(); // Get selected answer
      if (selectedAnswer === question.correct_answer) {
        score++; // Increment score for correct answers
      }
    });

    // Show the score
    $("#score-value").text(score);
    $("#score").show();
    $("#submit-quiz").hide(); // Hide the submit button after submission
  });
});
