const target = new Date("2026-08-19T12:30:00+03:00");

function pad(n){ return String(n).padStart(2, "0"); }

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value;
}

function updateCountdown(){
  let diff = target - new Date();

  if(diff <= 0){
    document.querySelectorAll(".hero-timer, .timer").forEach(t => {
      t.innerHTML = '<div class="today"><b>♡</b><span>мы женимся сегодня</span></div>';
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  setText("days", days);
  setText("hours", pad(hours));
  setText("minutes", pad(minutes));
  setText("seconds", pad(seconds));

  setText("daysHero", days);
  setText("hoursHero", pad(hours));
  setText("minutesHero", pad(minutes));
  setText("secondsHero", pad(seconds));
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("rsvpForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const answer = document.querySelector('input[name="answer"]:checked')?.value || "";
  const drinks = [...document.querySelectorAll('input[name="drink"]:checked')].map(i => i.value).join(", ");
  const comment = document.getElementById("comment").value.trim();

  document.getElementById("formResult").textContent = name + ", спасибо! Ваш ответ принят.";
  this.reset();

  // Для Google Таблицы сюда позже добавим WEB_APP_URL.
});
