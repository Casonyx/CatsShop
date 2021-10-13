import smoothscroll from 'smoothscroll-polyfill';


window.onload= function() {
  window.__forceSmoothScrollPolyfill__ = true; 
  smoothscroll.polyfill();
  // burger-menu animation

  const burger = document.getElementById('burger');
  const burgerMenu = document.getElementById('burger-menu');

  burger.addEventListener('click', function(e) {
    burgerMenu.classList.toggle('header__active')
  })

  // toast animation

  const favorites = document.querySelectorAll('.card__like');
  const alert = document.getElementById('alert');

  const queue = [];
  let intervalHandler;

  favorites.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', function () {
      const name = this.parentNode.parentNode.querySelector('.card__title').textContent;
      addToQueue(name);
    })
  })

  const clickedFunction = (value) => {
    alert.textContent = `${value} добавлен в избранное`;
    alert.classList.add('show')
    setTimeout(() => {
      alert.classList.remove('show')
    }, 2000)
  }

  const addToQueue = (value) => {
    queue.push(value);
    if (!intervalHandler) {
      queue.shift();
      clickedFunction(value);
      intervalHandler = setInterval(() => {
        if (!queue.length) {
          clearInterval(intervalHandler);
          intervalHandler = undefined;
          return;
        }
        const value = queue.shift();
        clickedFunction(value);
      }, 3000)
    }
  }

  // smooth scroll 

  document.querySelectorAll('a.anchor').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1);

      const scrollTarget = document.getElementById(href);

      const elementPosition = scrollTarget.getBoundingClientRect().top;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    })
  })

  // email validation

  const emailField = document.getElementById('email')
  const response = document.getElementById('footer-span')

  email.addEventListener('keyup', () => {
    const email = emailField.value;
    if(validateEmail(email)) {
      response.innerHTML = 'Email доступен'
    } else {
      response.innerHTML = 'Некорректный email'
    }
  })

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

