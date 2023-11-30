const quizData = [
  {
    question: 'Whats the name of the town in Halloweentown?',
    options: ['Halloweentown', 'SpookyVille', 'Ghost town', 'up town fright '],
    answer: 'Halloweentown',
  },
  {
    question: "Which birthday does Marnie celebrate during the film?",
    options: ['11th', '14th', '13th', '16th'],
    answer: '13th',
  },
  {
    question: 'What are the Cromwell family?',
    options: ['ghosts', 'witches', 'were-spiders', 'vampires'],
    answer: 'witches',
  },
  {
    question: 'Who is Benny?',
    options: ['a skellington taxi driver', 'a werewolf butcher', 'a spider teacher', 'a zombie singer'],
    answer: 'a skellington taxi driver',
  },
  {
    question: "Who is Kalabar?",
    options: [ 'the mayor','the dentist','the train conductor', 'the postman' ],
    answer: 'the mayor',
  },
  {
    question: 'Which of these is NOT an ingredient in the potion?',
    options: ['The sweat of a ghost ', 'a vampires fang', 'a newts eye', 'the hair of a werewolf'],
    answer: 'a newts eye ',
  },
  {
    question: 'How does Grandma Aggie arrive?',
    options: ['by bus', 'by train','by broom', 'by car'],
    answer: 'by bus',
  },
  {
    question: 'What does Aggie do at the end?',
    options: ['stays in halloween', 'Goes home to the mortal realm', 'spain', 'turns into a wicked witch'],
    answer: 'Goes home to the mortal realm',
  },
  {
    question: 'Which was not a name of one of the Sinister sisters?',
    options: ['sapphire','splendora','sage','scarlett'],
    answer: 'splendora',
  },
  {
    question: 'What did Splendora give to Marnie to take back to the present?',
    options: ['locket', 'box', 'necklace', 'key'],
    answer: 'key',
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