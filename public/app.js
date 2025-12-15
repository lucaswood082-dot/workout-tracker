const userForm = document.getElementById("userForm");
const workoutForm = document.getElementById("workoutForm");
const workoutsList = document.getElementById("workouts");

const API = "/api";

/* Create / login user */
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;

  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  });

  const data = await res.json();
  localStorage.setItem("userId", data._id);

  loadWorkouts();
});

/* Add workout */
workoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const workout = {
    name: document.getElementById("name").value,
    sets: document.getElementById("sets").value,
    reps: document.getElementById("reps").value,
    weight: document.getElementById("weight").value,
    userId: localStorage.getItem("userId")
  };

  await fetch(`${API}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workout)
  });

  workoutForm.reset();
  loadWorkouts();
});

/* Load workouts */
async function loadWorkouts() {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const res = await fetch(`${API}/workouts/${userId}`);
  const workouts = await res.json();

  workoutsList.innerHTML = "";

  workouts.forEach(w => {
    const li = document.createElement("li");
    li.textContent = `${w.name} - ${w.sets}x${w.reps} @ ${w.weight}kg`;
    workoutsList.appendChild(li);
  });
}

/* Auto load workouts on refresh */
loadWorkouts();
