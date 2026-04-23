function switchTab(tabId, el) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tabs span").forEach(t => t.classList.remove("active"));
  
    document.getElementById(tabId).classList.add("active");
    el.classList.add("active");
  }
  
  function copyCode(codeId, btn) {
    const code = document.getElementById(codeId).innerText;
    navigator.clipboard.writeText(code).then(() => {
      const old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = old), 1000);
    });
  }