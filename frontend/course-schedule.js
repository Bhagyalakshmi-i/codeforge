function setActiveTab(tabId) {
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.remove("active");
    });
  
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
  
    document.getElementById(tabId).classList.add("active");
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add("active");
  }
  
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.tab);
    });
  });
  
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.querySelector(btn.dataset.copy);
      if (!target) return;
  
      try {
        await navigator.clipboard.writeText(target.innerText);
        const oldText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = oldText;
        }, 1200);
      } catch (error) {
        alert("Copy failed");
      }
    });
  });