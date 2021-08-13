// Taking reference all the elements

let upper = document.getElementById("upper");
let time = document.getElementById("time");
let mints = document.getElementById("mints");
let secs = document.getElementById("secs");
let sesion_break_heading = document.getElementById("sesion_break_heading");
let session_time_no = document.getElementById("session_time_no");
let break_time_no = document.getElementById("break_time_no");
let minus_session = document.getElementById("minus_session");
let plus_session = document.getElementById("plus_session");
let minus_break = document.getElementById("minus_break");
let plus_break = document.getElementById("plus_break");
let start = document.getElementById("start");
let reset = document.getElementById("reset");

let session_time = Number(session_time_no.innerText);
let break_time = Number(break_time_no.innerText);

check_for_val_zero();

if (session_time === 0) minus_session.disabled = true;
if (break_time === 0) minus_break.disabled = true;

minus_session.addEventListener("click", function () {
  session_time--;
  if (session_time === 0) {
    minus_session.disabled = true;
    session_time_no.innerText = session_time;
  }
  session_time_no.innerText = session_time;

  check_for_val_zero();
});

plus_session.addEventListener("click", function () {
  minus_session.disabled = false;
  session_time++;
  session_time_no.innerText = session_time;

  check_for_val_notzero();
});

minus_break.addEventListener("click", function () {
  break_time--;
  if (break_time === 0) {
    minus_break.disabled = true;
    break_time_no.innerText = break_time;
  }
  break_time_no.innerText = break_time;

  check_for_val_zero();
});

plus_break.addEventListener("click", function () {
  minus_break.disabled = false;
  break_time++;
  break_time_no.innerText = break_time;

  check_for_val_notzero();
});

let session_id_mints;
let session_id_secs;
let break_id_mints;
let break_id_secs;

start.addEventListener("click", function () {
  // Disabling the buttons
  minus_session.disabled = true;
  plus_session.disabled = true;
  minus_break.disabled = true;
  plus_break.disabled = true;

  time.style.color = "rgb(36, 168, 168)";
  upper.style.borderColor = "rgb(14, 133, 133)";

  let mints_time = session_time;

  mints_time--;

  if (mints_time < 10) mints.innerText = `0${mints_time}`;
  else mints.innerText = `${mints_time}`;

  // session time minutes

  session_id_mints = setInterval(() => {
    mints_time--;
    if (mints_time < 10) mints.innerText = `0${mints_time}`;
    else mints.innerText = `${mints_time}`;

    // checking when time become 0
    console.log(`in session_id_mints`);
    if (mints_time < 0) {
      clearInterval(session_id_mints);
      clearInterval(session_id_secs);
      sesion_break_heading.innerText = `Break!`;
      time.style.color = "coral";
      upper.style.borderColor = "coral";

      break_time--; //1

      if (break_time < 10) mints.innerText = `0${break_time}`;
      else mints.innerText = `${break_time}`;

      let temp = break_time; //2

      // break time minutes

      break_id_mints = setInterval(() => {
        break_time--; //0,-1
        if (break_time < 10 && break_time >= 0)
          mints.innerText = `0${break_time}`;
        else if (break_time > 10) mints.innerText = `${break_time}`;
        if (break_time < 0) {
          break_time = temp; //2
          mints_time.innerText = break_time;
        }
      }, 60000); // 1 minute = 60,000 miliseconds

      // break time seconds

      let sec = 60;
      secs.innerText = `60`;

      break_id_secs = setInterval(() => {
        sec--;
        if (sec < 10) secs.innerText = `0${sec}`;
        else secs.innerText = `${sec}`;
        if (sec <= 0) {
          sec = 60;
          console.log(`break_sec`);
        }
      }, 1000); // 1 sec =  1000 miliseconds
    }
  }, 60000); // 1 minute = 60,000 miliseconds

  let sec = 60;

  secs.innerText = `60`;

  // session time seconds

  session_id_secs = setInterval(() => {
    sec--;
    if (sec < 10) secs.innerText = `0${sec}`;
    else secs.innerText = sec;
    if (sec <= 0) sec = 60;
  }, 1000); // 1 sec = 1000 miliseconds
});

reset.addEventListener("click", function () {
  mints.innerText = "00";
  secs.innerText = "00";
  break_time_no.innerText = "0";
  session_time_no.innerText = "0";
  upper.style.borderColor = "darkgrey";
  time.style.color = "grey";
  plus_session.disabled = false;
  plus_break.disabled = false;
  minus_session.disabled = true;
  minus_break.disabled = true;

  session_time = 0;
  break_time = 0;

  time.style.color = "grey";
  sesion_break_heading.innerText = "Session 1";

  clearInterval(session_id_mints);
  // clearInterval(session_id_secs);
  clearInterval(break_id_mints);
  clearInterval(break_id_secs);
});

function check_for_val_notzero() {
  if (session_time !== 0 && break_time !== 0) {
    start.disabled = false;
    reset.disabled = false;
  }
}

function check_for_val_zero() {
  if (session_time === 0 && break_time === 0) {
    start.disabled = true;
    reset.disabled = true;
  }
}
