const quizData = [
  {
    question: 'What does Santa do to Halloween Town?',
    options: ['makes it snow', 'give them candy', 'give them cole', 'calls the police on jack'],
    answer: 'makes it snow',
  },
  {
    question: "What is jack's dog called",
    options: ['Zero', 'uno', 'snowy', 'milkis'],
    answer: 'Zero',
  },
  {
    question: 'What ingredient was not added to Dr. Finklesteins Worms Wort soup?',
    options: ['Worms Wort', 'Deadly Nightshade', 'Finger nail powder', 'eyeball shavings'],
    answer: 'Worms Wort',
  },
  {
    question: 'What does Jack call Santa Claus?',
    options: ['Mr. claws', 'Sandy Claus', 'Sandy Claws', 'mr.Red'],
    answer: 'Sandy Claus',
  },
  {
    question: "What does the Mayor use for his tie?",
    options: [ 'Bat','spider','Black Roses', 'that she wants to become a clown', ],
    answer: 'spider',
  },
  {
    question: 'What does Oogie Boogie have as his tongue?',
    options: ['Worm', 'cobwebs', 'Snake', 'qesos'],
    answer: 'cara mia',
  },
  {
    question: 'What door does jack go through in the forest?',
    options: ['the christmas tree', 'the turkey','the clover', 'the bunny rabbit '],
    answer: 'the christmas tree',
  },
  {
    question: 'Which song plays after entering Halloween Town for the first time?',
    options: ['The Halloween Song', 'Jack’s Obsession', 'Poor Jack', 'oggie boggie song'],
    answer: 'The Halloween Song',
  },
  {
    question: ' What are the names of Oogie Boogie’s henchmen?',
    options: ['Larry, Curly and M','Tom and Jerry','Lock, Shock and Barrel','thing one and thing two',],
    answer: 'Lock, Shock and Barrel',
  },
  {
    question: 'What is Sally?',
    options: ['a rag doll', 'a zombie', 'a creation from dr. frankinstine', 'jacks wife'],
    answer: 'a rag doll',
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