'use strict';

{
  const random = Math.floor(Math.random() * 100) + 1;  // 1から100までのランダムな数
  let questionCount = 0;
  let timeLeft = 90;  //残り時間
  let timerId;

  //カウントタイムタイマー
  function startTimer() {
    timerId = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerId);
        const open = document.getElementById('open');
        const modal = document.getElementById('modal');
        const mask = document.getElementById('mask');
    
        modal.classList.remove('hidden');  //hiddenを消すことで逆にmodalを表示
        mask.classList.remove('hidden');
        document.getElementById('result').textContent = `記録 : 失敗!!(-_-;)`;
        disableGame(); // ゲームを終了する関数を呼び出す
      }
    }, 1000); //1000ミリ秒 = 1秒
  }

  function disableGame() {
    // ボタンを無効にする
    document.querySelector('.question-container button').disabled = true;
    document.querySelector('.correct-container button').disabled = true;
  }

  function ableGame() {
    // ボタンを無効にする
    document.querySelector('.question-container button').disabled = false;
    document.querySelector('.correct-container button').disabled = false;
  }

  //button(質問する)がクリックされたら
  function showAnswer() {
    const selectedQuestion = document.querySelector('input[name="question"]:checked');
    const answerElement = document.querySelector('#answer');
    const countParagraph = document.querySelector('.question-container p:nth-of-type(2)');

    if (selectedQuestion && timeLeft > 0) {
      questionCount++;
      countParagraph.textContent = `質問カウント数 : ${questionCount}`;

      switch (selectedQuestion.value) {
        case '1':
          answerElement.textContent = (random % 2 === 0) ? '偶数です' : '偶数ではありません(奇数です)';
          break;
        case '2':
          answerElement.textContent = (random % 3 === 0) ? '3で割り切れます' : '3で割り切れません';
          break;
        case '3':
          answerElement.textContent = (random % 5 === 0) ? '5で割り切れます' : '5で割り切れません';
          break;
        case '4':
          answerElement.textContent = (random >= 50) ? '50以上です' : '50以上ではありません(50未満)';
          break;
        case '5':
          answerElement.textContent = (random > 25) ? '25より大きいです' : '25より大きくありません';
          break;
        case '6':
          answerElement.textContent = (random > 75) ? '75より大きいです' : '75より大きくありません';
          break;
        default:
          answerElement.textContent = '解答が存在しません';
          break;
      }
    } else if (timeLeft <= 0) {
      answerElement.textContent = '時間切れです。ゲームオーバー。';
    } else {
      answerElement.textContent = '質問を選択してください。';
    }
  }

  function showNumberAnswer() {
    const selectedNumber = document.querySelector('.number');
    const documentNumberAnswer = document.querySelector('#numberAnswer');

    if (timeLeft > 0 && selectedNumber.value !== "" && random == selectedNumber.value) {
      documentNumberAnswer.textContent = '正解です!!!';
      clearInterval(timerId);
      disableGame();
      const open = document.getElementById('open');
      const modal = document.getElementById('modal');
      const mask = document.getElementById('mask');
  
      modal.classList.remove('hidden');  //hiddenを消すことで逆にmodalを表示
      mask.classList.remove('hidden');
      let result = 90-timeLeft;
      document.getElementById('result').textContent = `congratulations!!!\n記録 : ${result}秒`;
    } else if (timeLeft > 0) {
      documentNumberAnswer.textContent = '不正解です';
    } else {
      documentNumberAnswer.textContent = '時間切れです。ゲームオーバー。';
    }
  }

  const questionButton = document.querySelector('.question-container button');
  questionButton.addEventListener('click', showAnswer);  //クリックしたら、showanswer関数を実行する

  const numberButton = document.querySelector('.correct-container button');
  numberButton.addEventListener('click', showNumberAnswer);

  // クリックしたらタイマーを開始する
  const start = document.querySelector('.start-button button');

  start.addEventListener('click', () => {
    startTimer();   //タイマーを開始
    ableGame();
  })

  disableGame();

  //モーダルウィンドウを作る
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');

  close.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click', () => {
    // modal.classList.add('hidden');
    // mask.classList.add('hidden');
    close.click();
  });
}