const quizData = [
  {
    question: 'Where was Fester lost in ?',
    options: ['Bermuda Triangle', 'The north pole', 'idian ocean', 'Madrid'],
    answer: 'Bermuda Triangle',
  },
  {
    question: "What is the real first name of Dr. Pinder-Schlosss son whom Tully recruits into pretending to be Uncle Fester and swindle the Addamses?",
    options: ['Christopher', 'martin', 'Gordon', 'John'],
    answer: 'Gordon',
  },
  {
    question: 'What game did the family play at the end of the movie, on Halloween?',
    options: ['wake the dead', 'witches brooms', 'Murder trial', 'The murder night of october'],
    answer: 'wake the dead',
  },
  {
    question: 'Where did Gomez and Morticia meet?',
    options: ['at a wake', 'at a grave', 'at a crime scene', 'the dentail hygen isle in boots'],
    answer: 'at a grave',
  },
  {
    question: "What was Morticia's surprise for Gomez at the end of the movie?",
    options: [ 'she got a job','shes pregnant','shes devorcing him', 'that she wants to become a clown', ],
    answer: 'shes pregnant',
  },
  {
    question: 'what does Gomez call Morticia',
    options: ['cara mia', 'sugar plum fairy', 'Mon cher', 'Querida'],
    answer: 'cara mia',
  },
  {
    question: 'What did the judge give Gomez (in the courthouse)?',
    options: ['a finger trap', 'a rose','a fine', 'a golf ball'],
    answer: 'a golf ball',
  },
  {
    question: 'Who owed Mrs. Craven money?',
    options: ['Wednesday', 'Fester', 'Tully', 'Gomez'],
    answer: 'Tully',
  },
  {
    question: 'How long has the Mamushka been an Addams tradition?',
    options: ['since the begining of the movie','30 years','500 years','since God knows when',],
    answer: 'since God knows when',
  },
  {
    question: 'What does Morticia tell Wednesday to do at the breakfast table right before Mrs. Craven walks in?',
    options: ['torture her brother', 'cut her dolls head', 'drink the cyanide', 'play with her food'],
    answer: 'play with her food',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();