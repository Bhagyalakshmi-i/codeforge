const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value.trim();

  // VALIDATION
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {

    const response = await fetch("https://codeforge-backend-1zsy.onrender.com/api/auth/login", 
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    // SAVE LOGIN INFO
    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    alert("Login successful!");

    // REDIRECT
    window.location.href = "browse.html";

  } catch (error) {

    console.log(error);

    alert("Server error");

  }

});