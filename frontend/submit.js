const form = document.getElementById("submitForm");
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://codeforge-backend-1zsy.onrender.com";

console.log("submit.js loaded");
form.addEventListener("submit", async (e) => {

  e.preventDefault();
  console.log("form submitted");
  const title =
    document.getElementById("title").value;

  const description =
    document.getElementById("description").value;

  const difficulty =
    document.getElementById("difficulty").value;

  const topic =
    document.getElementById("topic").value;

  const language =
    document.getElementById("language").value;

  const solution =
    document.getElementById("solution").value;

  const explanation =
    document.getElementById("explanation").value;

  const youtube =
    document.getElementById("youtube").value;

  const tags =
    document.getElementById("tags").value;

  try {

    const response = await fetch(`${API_BASE}/api/problems`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title,
          description,
          difficulty,
          topic,
          language,
          solution,
          explanation,
          youtube,
          tags
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Problem uploaded successfully!");

    form.reset();

  } catch (error) {

    console.log(error);

    alert("Upload failed");

  }

});