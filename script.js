const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyio2RlkDJ0748bj0mx87p6_XMRaOFSSjncxa3H4dS-XUFQUVG1PwXbMZTvsGIycduc/exec";

const target = new Date("2026-08-19T12:30:00+03:00");

function pad(n){
  return String(n).padStart(2, "0");
}

function updateCountdown(){
  const diff = target - new Date();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if(!daysEl || !hoursEl || !minutesEl || !secondsEl){
    return;
  }

  if(diff <= 0){
    const timer = document.querySelector(".timer");
    if(timer){
      timer.innerHTML = '<div style="grid-column:1 / -1"><b>♡</b><span>мы женимся сегодня</span></div>';
    }
    return;
  }

  daysEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
  hoursEl.textContent = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
  minutesEl.textContent = pad(Math.floor((diff / (1000 * 60)) % 60));
  secondsEl.textContent = pad(Math.floor((diff / 1000) % 60));
}

updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.getElementById("rsvpForm");

if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("guestName")?.value.trim() || "";
    const answer = document.querySelector('input[name="answer"]:checked')?.value || "";
    const drinks = [...document.querySelectorAll('input[name="drink"]:checked')]
      .map(i => i.value)
      .join(", ");
    const comment = document.getElementById("comment")?.value.trim() || "";
    const result = document.getElementById("formResult");

    if(result){
      result.textContent = "Отправляем...";
    }

    fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        name,
        answer,
        drinks,
        comment
      })
    });

    if(result){
      result.textContent = name + ", спасибо! Ваш ответ отправлен.";
    }

    form.reset();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal, .reveal-section");

  const show = el => el.classList.add("visible");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        show(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  items.forEach(item => observer.observe(item));

  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => show(el), 150 + i * 150);
  });
});
