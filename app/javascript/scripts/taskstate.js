document.addEventListener("turbolinks:load", function () {
  if (document.getElementById('Ninja')) {
    const ninjaState = document.getElementById('Ninja')
    const taskStratTime = Date.parse(ninjaState.getAttribute('data-task-start'))
    const taskEndTime = Date.parse(ninjaState.getAttribute('data-task-end'))
    const taskTimeNow = Date.parse(ninjaState.getAttribute('data-time-now'))
    const taskStateNow = taskTimeNow - taskStratTime
    const judgmentTaskState = (taskEndTime - taskStratTime)/4
    // 上面抓時間元素判斷進度條
    // 下面抓圖示元素改變圖示裝態
    const stateOne = document.getElementById('state-1')
    const stateTwo = document.getElementById('state-2')
    const stateThree = document.getElementById('state-3')
    const stateFour = document.getElementById('state-4')
    const stateText = document.getElementById('task-state')
    //開始波動拳
    if (taskStateNow < 0 ) {
      stateText.innerHTML = "忍者尚未啟動!"
    } else if (taskStateNow <= judgmentTaskState) {
      stateOne.classList.add('animate-bounce')
      stateText.innerHTML = "忍者才剛開始跑!"
    } else if (taskStateNow <= (2 * judgmentTaskState)) {
      stateOne.classList.add('animate-bounce')
      stateTwo.classList.add('animate-bounce')
      stateText.innerHTML = "忍者快到一半了!"
    } else if (taskStateNow <= (3 * judgmentTaskState)) {
      stateOne.classList.add('animate-bounce')
      stateTwo.classList.add('animate-bounce')
      stateThree.classList.add('animate-bounce')
      stateText.innerHTML = "忍者努力衝刺!"
    } else if (taskStateNow > (3 * judgmentTaskState) && taskStateNow <= (4 * judgmentTaskState)) {
      stateOne.classList.add('animate-bounce')
      stateTwo.classList.add('animate-bounce')
      stateThree.classList.add('animate-bounce')
      stateFour.classList.add('animate-bounce')
      stateText.innerHTML = "忍者準備要埋伏了!"
    } else if (taskStateNow > (4 * judgmentTaskState)){
      stateOne.classList.add('animate-bounce')
      stateTwo.classList.add('animate-bounce')
      stateThree.classList.add('animate-bounce')
      stateFour.classList.add('animate-bounce')
      stateText.innerHTML = "忍者等超過一小時就不等了!"
    }
  }
})