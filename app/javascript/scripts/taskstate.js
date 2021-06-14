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
      stateText.innerHTML = "任務開始時間未到!"
    } else if (taskStateNow <= judgmentTaskState) {
      stateOne.classList.add('animate-bounce')
      stateText.innerHTML = "任務剛開始!"
    } else if (taskStateNow <= (2 * judgmentTaskState)) {
      stateOne.classList.add('animate-bounce')
      setTimeout(() => {
        stateTwo.classList.add('animate-bounce')
      }, 400);
      stateText.innerHTML = "任務時間快過一半!"
    } else if (taskStateNow <= (3 * judgmentTaskState)) {
      stateOne.classList.add('animate-bounce')
      setTimeout(() => {
        stateTwo.classList.add('animate-bounce')
      }, 400);
      setTimeout(() => {
        stateThree.classList.add('animate-bounce')
      }, 900);
      stateText.innerHTML = "任務接近結束!"
    } else if (taskStateNow > (3 * judgmentTaskState) && taskStateNow <= (4 * judgmentTaskState)) {
      stateOne.classList.add('animate-bounce')
      setTimeout(() => {
        stateTwo.classList.add('animate-bounce')
      }, 400);
      setTimeout(() => {
        stateThree.classList.add('animate-bounce')
      }, 900);
      setTimeout(() => {
        stateFour.classList.add('animate-bounce')
      }, 1400);
      stateText.innerHTML = "請準備交接!"
    } else if (taskStateNow > (4 * judgmentTaskState)){
      stateOne.classList.add('animate-bounce')
      setTimeout(() => {
        stateTwo.classList.add('animate-bounce')
      }, 400);
      setTimeout(() => {
        stateThree.classList.add('animate-bounce')
      }, 900);
      setTimeout(() => {
        stateFour.classList.add('animate-bounce')
      }, 1400);
      stateText.innerHTML = "任務已經超時!"
    }
  }
})