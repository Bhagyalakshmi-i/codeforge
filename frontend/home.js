document.addEventListener("DOMContentLoaded", () => {
    const exploreBtn = document.getElementById("exploreBtn");
    const submitBtn = document.getElementById("submitBtn");
    const getStartedBtn = document.getElementById("getStartedBtn");
  
    const browseSection = document.getElementById("browse");
    const submitSection = document.getElementById("submit");
  
    function smoothScroll(target) {
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  
    exploreBtn?.addEventListener("click", () => smoothScroll(browseSection));
    submitBtn?.addEventListener("click", () => {
        if (localStorage.getItem("cf_signedIn") === "true") {
          window.location.href = "submit.html";
        } else {
          window.location.href = "index.html";
        }
      });
    getStartedBtn?.addEventListener("click", () => smoothScroll(submitSection));
  
    document.querySelectorAll(".ticker span").forEach((chip) => {
      chip.addEventListener("mouseenter", () => {
        chip.style.borderColor = "#3a3a3a";
        chip.style.color = "#fff";
      });
  
      chip.addEventListener("mouseleave", () => {
        chip.style.borderColor = "#2a2a2a";
        chip.style.color = "#b5b5b5";
      });
    });
  });
  const track = document.getElementById("tickerTrack");

// duplicate content for seamless loop
track.innerHTML += track.innerHTML;