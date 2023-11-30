document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const ageInput = document.getElementById("age");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const zipInput = document.getElementById("zip");
  const entries = document.getElementById("entries");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const age = ageInput.value.trim();
    const address = addressInput.value.trim();
    const city = cityInput.value.trim();
    const zip = zipInput.value.trim();

    // Check if required fields are not empty
    if (firstName === "" || lastName === "" || age === "" || address === "" || city === "" || zip === "") {
      console.error("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, age, address, city, zip }),
      });

      if (!response.ok) {
        throw new Error("Failed to add entry");
      }

      const data = await response.json();
      console.log("Added entry:", data);

      // Clear form inputs
      firstNameInput.value = "";
      lastNameInput.value = "";
      ageInput.value = "";
      addressInput.value = "";
      cityInput.value = "";
      zipInput.value = "";

      await displayEntries();
    } catch (error) {
      console.error(error);
    }
  });

  async function displayEntries() {
    try {
      const response = await fetch("http://localhost:8001/items");
      if (!response.ok) {
        throw new Error("Failed to fetch entries.");
      }

      const data = await response.json();

      // Clear existing entries
      entries.innerHTML = "";

      data.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.innerHTML = `<div class="entry">
                                <div><label>ID:</label> ${entry.id}</div>
                                <div><label>First Name:</label> ${entry.firstname}</div>
                                <div><label>Last Name:</label> ${entry.lastname}</div>
                                <div><label>Age:</label> ${entry.age}</div>
                                <div><label>Address:</label> ${entry.address}</div>
                                <div><label>City:</label> ${entry.city}</div>
                                <div><label>ZIP:</label> ${entry.zip}</div>
                                <div><label>Created At:</label> ${entry.created_at}</div>
                                <div><label>Updated At:</label> ${entry.updated_at}</div>
                              </div>`;
        entries.appendChild(entryDiv);
      });
    } catch (error) {
      console.error(error);
    }
  }

  displayEntries();
});
