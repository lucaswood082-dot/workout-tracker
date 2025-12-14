const user = "demo";

async function addWorkout() {
  const workout = {
    user,
    exercise: exercise.value,
    sets: sets.value,
    reps: reps.value,
    weight: weight.value
  };

  await fetch("/api/workouts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workout)
  });

  loadWorkouts();
}

async function loadWorkouts() {
  const res = await fetch(`/api/workouts/${user}`);
  const data = await res.json();

  workoutList.innerHTML = "";
  data.forEach(w => {
    workoutList.innerHTML += `
      <li>${w.exercise} – ${w.weight}kg (${w.sets}x${w.reps})</li>
    `;
  });
}

loadWorkouts();
