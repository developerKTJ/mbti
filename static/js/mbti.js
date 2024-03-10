//MBIT 질문 배열
const EIQ = ["주기적으로 새로운 친구를 만든다.",
            "관심이 가는 사람에게 다가가서 대화를 시작하기가 어렵지 않다.",
            "다른 사람에게 자신이 어떤 사람으로 보일지 걱정하지 않는 편이다.",
            "단체 활동에 참여하는 일을 즐긴다.",
            "단체에서 지도자 역할을 맡는 일은 가능한 피하고 싶다."
            ];

const SNQ = ["자유 시간 중 상당 부분을 다양한 관심사를 탐구하는 데 할애한다.",
            "예술 작품의 다양한 해석에 대해 토론하는 일에는 크게 관심이 없다.",
            "결말을 자신의 방식으로 해석할 수 있는 책과 영화를 좋아한다.",
            "관심사가 너무 많아 다음에 어떤 일을 해야 할지 모를 때가 있다.",
            "자신에게 예술적 성향이 거의 없다고 생각한다."
            ];

const TFQ = ["다른 사람이 울고 있는 모습을 보면 자신도 울고 싶어질 때가 많다.",
            "압박감이 심한 환경에서도 평정심을 유지하는 편이다.",
            "매우 감상적인 편이다.",
            "작은 실수로도 자신의 능력이나 지식을 의심하곤 한다.",
            "감정보다는 이성을 따르는 편이다."
            ];

const JPQ = ["일이 잘못될 때를 대비해 여러 대비책을 세우는 편이다.",
            "하나의 프로젝트를 완전히 완료한 후 다른 프로젝트를 시작하는 편이다.",
            "일정이나 목록으로 계획을 세우는 일을 좋아한다.",
            "휴식을 취하기 전에 집안일을 먼저 끝내기를 원한다.",
            "일이 잘못될까봐 자주 걱정하는 편이다."
            ];

//전체 질문 배열
const allQ = [EIQ,SNQ,TFQ,JPQ];

//MBTI 체크 배열
let EIList;
let SNList;
let TFList;
let JPList;

//전체 체크 배열
const allList = [EIList,SNList,TFList,JPList];

//체크 배열 초기화
for(let i = 0; i < allList.length; i++){
  allList[i] = new Array(0,0,0,0,0);
}

//유형 배열
let mbtiType = ['E',"I","S","N","T","F","J","P"];

//결과 변수
let mbtiResult = '';

//필수 요소 변수 선언 및 초기화
var qText = document.querySelector('.qText');//현재 질문
var btn_prev = document.querySelector('.btn--prev');//뒤로가기 버튼
var btn_next = document.querySelector('.btn--next');//앞으로가기 버튼
var btn_yes = document.querySelector('.btn--yes');//앞으로가기 버튼
var btn_no = document.querySelector('.btn--no');//앞으로가기 버튼
var btn_result = document.querySelector('.btn--result');//검사결과 버튼
var menu_result = document.querySelector('.menu li:last-child');
var curArr;//현재 질문의 행 인덱스
var curIdx;//현재 질문의 열 인덱스
var qList_li = document.querySelectorAll('.q-list li');//체크 리스트
const QCHECK = '<span class="material-symbols-outlined yes">radio_button_unchecked</span>'
              +'<span class="material-symbols-outlined no">radio_button_unchecked</span>';
var li_num = 1;

//q-list의 li태그 넘버링 및 초기화
qList_li.forEach(function(i){
  let num_str = String(li_num);
  num_str = "<span>" + String(li_num) + "</span>";
  i.innerHTML = num_str + " " + QCHECK;
  li_num++;
});

qText.textContent = allQ[0][0];//질문 초기화

//토글
var modeToggle = document.querySelector('.toggle-label');
var modeCheck = document.querySelector('#modeToggle');

if(localStorage.getItem('mode') === null){
  localStorage.setItem('mode', false);
}
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

//이동확인 함수
const pageConfirm = document.querySelector('.confirm');
pageConfirm.addEventListener('click',function(e){
  e.preventDefault();
  let result = confirm('진행 중인 내용이 저장되지 않습니다. 계속 진행하시겠습니까?');
  if(result){
    location.href = 'type.html';
  }
})

//현재 질문의 위치 함수
function curQ(){
  var curText = qText.textContent;

  for(var i = 0; i < allQ.length; i++){
    if(allQ[i].includes(curText)){
      curArr = i;
      break;
    }
  }

  curIdx = allQ[curArr].indexOf(curText);
}

//현재 질문 리스트에서의 위치 함수
function curL(){
  qList_li.forEach((li) => {
    if(li.classList.contains('cur')){
      li.classList.remove('cur');
    }
  })

  curQ();
  let nthUl = document.querySelectorAll("ul.q-type")[curArr];
  let nthLi = nthUl.querySelectorAll("li")[curIdx];
  nthLi.classList.add('cur');
}

//결과 저장 함수
function result(){
  if(mbtiResult.length != 0){
    mbtiResult = '';
  }
  
  for(let i = 0; i < allList.length; i++){
    let sum = 0;

    for(let j = 0; j < allList[i].length; j++){
      sum += allList[i][j];
    }

    if(sum > 0){
      mbtiResult += mbtiType[i*2][0];
    }else{
      mbtiResult += mbtiType[i*2+1][0];
    }

    console.log(mbtiResult);
  }
}

//검사 완료 확인 함수
function inspection(){
  let check = true;

  for(let i = 0; i < allList.length; i++){
    for(let j = 0; j < allList[i].length; j++){
      if(allList[i][j] == 0){
        check = false;
        i = allList.length;
        break;
      }
    }
  }

  if(check){
    btn_result.classList.remove('block');
    result();
    btn_result.href = `/result?mbtiResult=${mbtiResult}`;
    menu_result.classList.remove('block');
  }else{
    btn_result.classList.add('block');
    btn_result.href = '#';
    menu_result.classList.add('block');
  }
}

//이동 버튼 함수
function dirQ(dir){  
  curQ();

  if(dir == 'next'){//앞으로가기 버튼 클릭시 수행
    if(!(curArr == allQ.length - 1 && curIdx == allQ[curArr].length - 1)){
      btn_prev.classList.remove('block');
      if(curIdx != allQ[curArr].length - 1){
        qText.textContent = allQ[curArr][curIdx + 1];
      }else{
        qText.textContent = allQ[curArr + 1][0];
      }
    }
  }else if(dir == 'prev'){//뒤로가기 버튼 클릭시 수행
    if(!(curArr == 0 && curIdx == 0)){
      btn_next.classList.remove('block');
      if(curIdx != 0){
        qText.textContent = allQ[curArr][curIdx - 1];
      }else{
        qText.textContent = allQ[curArr - 1][allQ[curArr].length - 1];
      }
    }
  }

  //처음 문항 뒤로가기 버튼 비활성화
  if(qText.textContent === allQ[0][0]){
    btn_prev.classList.add('block');
  }

  //마지막 문항 앞으로가기 버튼 비활성화
  if(qText.textContent === allQ[allQ.length - 1][allQ[curArr].length - 1]){
    btn_next.classList.add('block');
  }
}

//선택된 버튼에 check 클래스 추가
function checkedBtn() { 
  curQ();
  
  if (allList[curArr][curIdx] == 1) {
    btn_yes.classList.add('check');
    btn_no.classList.remove('check');
  } else if (allList[curArr][curIdx] == -1) {
    btn_no.classList.add('check');
    btn_yes.classList.remove('check');
  } else {
    btn_yes.classList.remove('check');
    btn_no.classList.remove('check');
  }
}

//next버튼 클릭이벤트
btn_next.addEventListener('click',function(){
  dirQ('next');
  checkedBtn();
  curL();
  inspection();
});

//prev버튼 클릭이벤트
btn_prev.addEventListener('click',function(){
  dirQ('prev');
  checkedBtn();
  curL();
  inspection();
});

//yes, no버튼 클릭 함수
function answer(yn){
  curQ();

  let nthUl = document.querySelectorAll("ul.q-type")[curArr];
  let nthLi = nthUl.querySelectorAll("li")[curIdx];
  let yesSp = nthLi.querySelector(".yes");
  let noSp = nthLi.querySelector(".no");

  if(yn == 'yes'){
    if(allList[curArr][curIdx] == 0){
      allList[curArr][curIdx] = 1;  
      yesSp.textContent = 'radio_button_checked';
    }else if(allList[curArr][curIdx] == 1){
      allList[curArr][curIdx] = 0;  
      yesSp.textContent = 'radio_button_unchecked';
    }else{
      allList[curArr][curIdx] = 1;  
      yesSp.textContent = 'radio_button_checked';
      noSp.textContent = 'radio_button_unchecked';
    }
  }else if(yn == 'no'){
    if(allList[curArr][curIdx] == 0){
      allList[curArr][curIdx] = -1;  
      noSp.textContent = 'radio_button_checked';
    }else if(allList[curArr][curIdx] == -1){
      allList[curArr][curIdx] = 0;  
      noSp.textContent = 'radio_button_unchecked';
    }else{
      allList[curArr][curIdx] = -1;
      noSp.textContent = 'radio_button_checked';
      yesSp.textContent = 'radio_button_unchecked';
    }
  }

  console.log(`allList[${curArr}][${curIdx}] : ${allList[curArr][curIdx]}`);
}

//yes버튼 클릭이벤트
btn_yes.addEventListener('click',function(){
  answer('yes');
  checkedBtn();
  inspection();
})

//no버튼 클릭이벤트
btn_no.addEventListener('click',function(){
  answer('no');
  checkedBtn();
  inspection();
})

qList_li.forEach(function(li){
  li.addEventListener('click',function(e){
    let clickedLi = e.currentTarget;
    let clickedUl = clickedLi.parentElement.closest('.q-type');
    let ulIdx = Array.from(clickedUl.parentNode.children).indexOf(clickedUl) / 2;
    let liIdx = Array.from(clickedUl.children).indexOf(clickedLi);
    console.log(`[${ulIdx}][${liIdx}]`);
    
    qText.textContent = allQ[ulIdx][liIdx];

    if(qText.textContent === allQ[0][0]){
      btn_prev.classList.add('block');
      btn_next.classList.remove('block');
    }else if(qText.textContent === allQ[allQ.length - 1][allQ[ulIdx].length - 1]){
      btn_next.classList.add('block');
      btn_prev.classList.remove('block');
    }else{
      btn_prev.classList.remove('block');
      btn_next.classList.remove('block');
    }

    checkedBtn();
    curL();
    inspection();
  });
});

$(function(){
  $(document).on('mousemove',function(e){
    let pointerArea = $('.question .content');
    if((e.pageX > pointerArea.offset().left && e.pageX < pointerArea.offset().left + 900) 
      && (e.pageY > pointerArea.offset().top && e.pageY < pointerArea.offset().top + 400)){
      $('.pointer').addClass('active').css({
        'top':(e.pageY - pointerArea.offset().top - 15),
        'left':(e.pageX - pointerArea.offset().left - 15),
        'pointer-events': 'none'
      });
    }else{
      $('.pointer').removeClass('active');
    }
  })

})




