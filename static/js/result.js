document.addEventListener('DOMContentLoaded', function () {
  //결과 출력
  var mbtiResult = document.querySelector('script').getAttribute('mbtiResult');
  // const mbtiResult = localStorage.getItem('mbtiResult');
  // if (mbtiResult) {
  //   document.querySelector('.test').innerHTML = mbtiResult;
  // }
  console.log(mbtiResult);
  var contents = document.querySelectorAll('.content');
  contents.forEach((content) => {
    if(content.dataset.mbti === mbtiResult){
      content.classList.add('active');
    }else{
      content.classList.remove('active');
    }
  })

  //토글
  var modeToggle = document.querySelector('.toggle-label');
  var modeCheck = document.querySelector('#modeToggle');
  var mode = localStorage.getItem('mode');
  console.log(mode);
  
  modeToggle.addEventListener('click',() => {
    if(!modeCheck.checked){
      document.querySelector('body').classList.add('light');
      localStorage.setItem('mode', true);
      mode = localStorage.getItem('mode');
    }else{
      document.querySelector('body').classList.remove('light');
      localStorage.setItem('mode', false);
      mode = localStorage.getItem('mode');
    }
  })

  if(mode === 'true'){
    modeToggle.click();
  }

  //active 내용
  var activeEl = null;
  var contents = document.querySelectorAll('.content');
    
  contents.forEach((content) => {
    if (content.classList.contains('active')) {
      activeEl = content;
    }
  });

  var activeCnt = activeEl ? activeEl.innerHTML : '';

  //name에 value할당
  var activeV = document.querySelector('.activeV');
  var mbtiV = document.querySelector('.mbtiV');

  activeV.value = activeCnt;
  mbtiV.value = mbtiResult;

  console.log(activeV.value);
  console.log(mbtiV.value);

});