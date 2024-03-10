document.addEventListener('DOMContentLoaded', function () {
  const mbtiResult = localStorage.getItem('mbtiResult');
  if(mbtiResult){
  }

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

  //탭메뉴
  const menuTitles = document.querySelectorAll('.type .title');
  const menus = document.querySelectorAll('.type .menu');

  menuTitles.forEach((title, index) => {
    title.addEventListener('click', function () {
      //active 전체삭제
      var already = menus[index].classList.contains('active');
      menus.forEach(menu => {
        menu.classList.remove('active');
      });

      //active가 있지 않으면 
      if(!already){
        menus[index].classList.add('active');
      }
    });
  });

  const menuItems = document.querySelectorAll('.type .menu li');
  const contentItems = document.querySelectorAll('.type .content');

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      const mbtiType = this.getAttribute('data-mbti');

      //active 전체삭제
      contentItems.forEach(content => {
        content.classList.remove('active');
      });

      //현재 data-mbti값이 같으면
      const relatedContent = document.querySelector(`.content[data-mbti="${mbtiType}"]`);
      relatedContent.classList.add('active');
    });
  });
});
