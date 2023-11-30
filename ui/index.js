document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const entries = document.getElementById("entries");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const age = ageInput.value.trim();

    // Check if name and age are not empty
    if (name === "" || age === "") {
      console.error("Name and age are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      if (!response.ok) {
        throw new Error("Failed to add entry");
      }

      const data = await response.json();
      console.log("Added entry:", data);

      // Clear form inputs
      nameInput.value = "";
      ageInput.value = "";

      await displayEntries();
    } catch (error) {
      console.error(error);
    }
  });

  async function displayEntries() {
    try {
      const response = await fetch("http://localhost:8000/items");
      if (!response.ok) {
        throw new Error("Failed to fetch entries.");
      }

      const data = await response.json();

      // Clear existing entries
      entries.innerHTML = "";

      data.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.innerHTML = `<div class="entry">
                                <div>ID: ${entry.id}</div>
                                <div>Name: ${entry.name}</div>
                                <div>Age: ${entry.age}</div>
                              </div>`;
        entries.appendChild(entryDiv);
      });
    } catch (error) {
      console.error(error);
    }
  }

  displayEntries();
});
