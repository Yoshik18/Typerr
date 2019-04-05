document.querySelector("#start").addEventListener("click",init);const level={easy:8,medium:5,hard:3,extreme:2};let isPlaying,high,currentLevel=level.easy,time=currentLevel,score=0;const seconds=document.querySelector("#seconds"),currentWord=document.querySelector("#current-word"),wordInput=document.querySelector("#word-input"),message=document.querySelector("#message"),timeDisplay=document.querySelector("#time"),scoreDisplay=document.querySelector("#score");function init(){showWord(words),wordInput.focus(),wordInput.addEventListener("input",startMatch),setInterval(countDown,1e3),setInterval(checkStatus,50),document.querySelector("#start").style="display: none"}function startMatch(){matchWord()&&(isPlaying=!0,time=currentLevel,showWord(words),wordInput.value="",score++,highScore()),scoreDisplay.innerHTML=-1===score?0:score,score>9&&(currentLevel=level.medium,seconds.innerHTML=4),score>19&&(currentLevel=level.hard,seconds.innerHTML=2),score>34&&(currentLevel=level.extreme,seconds.innerHTML=1)}function matchWord(){return wordInput.value===currentWord.innerHTML?(message.innerHTML="Correct!",message.style="color: #07ea07",wordInput.style="border-color: #07ea07",!0):(message.innerHTML="",!1)}function showWord(e){const r=Math.floor(Math.random()*e.length);currentWord.innerHTML=e[r]}function countDown(){time>0?time--:0===time&&(isPlaying=!1),timeDisplay.innerHTML=time}function checkStatus(){isPlaying||0!==time||(score>0?(document.querySelector("#high-score").style="display: block",message.innerHTML="Game Over!! Please reload the page to start a new game.",message.style="color: red",wordInput.style="border-color: red",score=-1,currentLevel=level.easy,seconds.innerHTML=7,wordInput.disabled=!0):0===score&&(message.innerHTML="Game Over!! Please reload the page to start a new game.",message.style="color: red",wordInput.style="border-color: red",score=-1,currentLevel=level.easy,seconds.innerHTML=7,wordInput.disabled=!0,document.querySelector("#high-score").style="display: none"))}function highScore(){let e;null===localStorage.getItem("scores")?e=[]:(e=JSON.parse(localStorage.getItem("scores")),high=Math.max(...e)),e.push(score),localStorage.setItem("scores",JSON.stringify(e)),document.querySelector("#high-score").addEventListener("click",function(){swal("Good job typer!",`Your High Score Is ${high}`,"success",{button:"Ohh Yeaahh!!"})})}seconds.innerHTML=7;