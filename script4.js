const quizData = [
  {
    question: 'Victor Van Dort is the son of wealthy what?',
    options: ['Butchers', 'Carpenters', 'Fishmongers', 'cheesemongers '],
    answer: 'Fishmongers',
  },
  {
    question: "What is Victor doing when he wakes Emily from the dead?",
    options: ['Practicing his wedding vows', 'Running from a skeleton dog', 'Running away from his arranged marriage', 'playing wake the dead'],
    answer: 'Practicing his wedding vows',
  },
  {
    question: 'Who killed emily?',
    options: ['victor', 'Emily', 'victoria', 'Barkis'],
    answer: 'Barkis',
  },
  {
    question: 'Victoria Everglot is the daughter of what?',
    options: ['Penniless aristocrats', 'A wealthy duchess', 'Extravagant Landlords', 'santa claus'],
    answer: 'Penniless aristocrats',
  },
  {
    question: "Which character serves as the antagonist in the movie, seeking to marry Victoria for her familys wealth?",
    options: [ 'Lord Barkis ','Victor Van Dort','Bonejangles', 'the toothfairy' ],
    answer: 'Lord Barkis ',
  },
  {
    question: 'Where does victor accidentially prepose to Emily',
    options: ['in the woods ', 'on the bridge', 'in the church', 'in the cemitory'],
    answer: 'in the woods ',
  },
  {
    question: 'What is Victor doing when he wakes Emily from the dead?',
    options: ['Practicing his wedding vows', 'Running from a skeleton dog','Running away from his arranged marriage', 'dancing because he is excited to marry victoria'],
    answer: 'Practicing his wedding vows',
  },
  {
    question: 'Who arranged Victor and Victorias marriage?',
    options: [' Their parents', 'Themselves', 'Elder Gutknecht ', 'bonejangles'],
    answer: 'Goes home to the mortal realm',
  },
  {
    question: ' Who is the leader of the skeleton music band?',
    options: ['Bonejangles','Mrs. Plum','Barkis Bittern','Lady Everglot'],
    answer: 'Bonejangles',
  },
  {
    question: 'Corpse Brides plot is based upon what?',
    options: ['tim burtons poem', 'A Russian Folktale', 'A German folklore', 'A Scottish folklore'],
    answer: 'A Russian Folktale',
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