document.addEventListener("DOMContentLoaded", function () {
    const habitForm = document.getElementById("habitTracker");
    const habitStats = document.querySelector(".habit-stats");

    const habits = [];

    habitForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const habitName = document.getElementById("habitName").value;
        const habitProgress = parseInt(document.getElementById("habitProgress").value);

        if (habitName && !isNaN(habitProgress) && habitProgress >= 0) {
            const newHabit = {
                name: habitName,
                progress: habitProgress,
                timestamp: new Date().toLocaleString(),
            };

            habits.push(newHabit);

            // Clear form inputs
            document.getElementById("habitName").value = "";
            document.getElementById("habitProgress").value = "";

            updateHabitStats();
        }
    });

    function updateHabitStats() {
        habitStats.innerHTML = "";

        habits.forEach((habit, index) => {
            const habitEntry = document.createElement("div");
            habitEntry.classList.add("habit-entry");

            habitEntry.innerHTML = `
                <p><strong>${habit.name}</strong> (${habit.progress} units) - ${habit.timestamp}</p>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;

            habitStats.appendChild(habitEntry);
        });

        addDeleteListeners();
    }

    function addDeleteListeners() {
        const deleteButtons = document.querySelectorAll(".delete-button");

        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(button.getAttribute("data-index"));
                if (!isNaN(index) && index >= 0 && index < habits.length) {
                    habits.splice(index, 1);
                    updateHabitStats();
                }
            });
        });
    }
});