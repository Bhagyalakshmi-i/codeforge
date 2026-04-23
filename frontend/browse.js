let problems = [
  {
    title: "Course Schedule II",
    difficulty: "Hard",
    topic: "Graphs",
    tags: ["Topological Sort", "BFS", "Kahn's"],
    description:
      "Return the ordering of courses to finish all numCourses. Return an empty array if it is impossible to finish.",
    time: "O(V+E)",
    space: "O(V+E)",
    author: "graph_guru",
    initials: "GG",
    age: "1 week ago",
    views: 14500,
    solutions: 31,
    upvotes: 2103,
    trending: true,
  },

  {
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Linked Lists",
    tags: ["Min-Heap", "Priority Queue", "O(N log k)"],
    description:
      "You are given an array of k linked-lists, each sorted in ascending order. Merge all into one sorted linked-list.",
    time: "O(N log k)",
    space: "O(k)",
    author: "heap_master",
    initials: "HM",
    age: "4 days ago",
    views: 10200,
    solutions: 27,
    upvotes: 1567,
    trending: true,
  },

  {
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Hashing",
    tags: ["HashMap", "O(n)", "Classic"],
    description:
      "Given an array of integers nums and a target, return indices of the two numbers such that they add up to target.",
    time: "O(n)",
    space: "O(n)",
    author: "aria_dev",
    initials: "AD",
    age: "2 days ago",
    views: 9310,
    solutions: 23,
    upvotes: 1284,
    trending: true,
  }
];

const difficultyItems = [
  "All",
  "Easy",
  "Medium",
  "Hard"
];

const topicItems = [
  "All",
  "Arrays",
  "Strings",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Sorting",
  "Math",
  "Recursion",
  "Hashing",
  "Binary Search",
  "Linked Lists"
];

const state = {
  difficulty: "All",
  topic: "All",
  sort: "recent",
  search: "",
};

// ======================================
// FETCH PROBLEMS FROM BACKEND
// ======================================
async function fetchProblems() {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/api/problems"
    );

    const backendProblems =
      await response.json();

    console.log(backendProblems);

    // ADD BACKEND PROBLEMS
    problems.push(...backendProblems);

    renderFeed();

  } catch (error) {

    console.log(error);

  }

}

// ======================================
// DOM LOADED
// ======================================
document.addEventListener("DOMContentLoaded", () => {

  // LOGIN CHECK
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {

    window.location.href = "index.html";

    return;

  }

  // USER DATA
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // PROFILE NAME
  const profileName =
    document.querySelector(".profile-name");

  // PROFILE AVATAR
  const profileAvatar =
    document.querySelector(".profile-avatar");

  if (profileName && user) {

    profileName.textContent =
      user.username || "demo";

  }

  if (profileAvatar && user) {

    const name =
      user.username || "demo";

    const initials = name
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    profileAvatar.textContent =
      initials;

  }

  // INITIALIZE
  state.difficulty =
    getURLDifficulty();

  renderSidebarLists();

  setActiveButtons();

  bindEvents();

  // FETCH BACKEND PROBLEMS
  fetchProblems();

  renderFeed();

  document.getElementById(
    "solvedCount"
  ).textContent = "0";

  document.getElementById(
    "streakCount"
  ).textContent = "0";

});

// ======================================
// FUNCTIONS
// ======================================
function getURLDifficulty() {

  const params =
    new URLSearchParams(window.location.search);

  return params.get("difficulty") || "All";

}

function renderSidebarLists() {

  const difficultyList =
    document.getElementById("difficultyList");

  const topicList =
    document.getElementById("topicList");

  difficultyList.innerHTML =
    difficultyItems.map(item => `

      <button
        class="filter-item ${
          state.difficulty === item
            ? "active"
            : ""
        }"
        data-filter="difficulty"
        data-value="${item}"
      >
        ${item}
      </button>

    `).join("");

  topicList.innerHTML =
    topicItems.map(item => `

      <button
        class="filter-item ${
          state.topic === item
            ? "active"
            : ""
        }"
        data-filter="topic"
        data-value="${item}"
      >
        ${item}
      </button>

    `).join("");

}

function applyFilters() {

  let list = [...problems];

  if (state.difficulty !== "All") {

    list = list.filter(
      p => p.difficulty === state.difficulty
    );

  }

  if (state.topic !== "All") {

    list = list.filter(
      p => p.topic === state.topic
    );

  }

  if (state.search) {

    const q =
      state.search.toLowerCase();

    list = list.filter(p =>
      (
        p.title +
        p.description +
        p.topic
      )
      .toLowerCase()
      .includes(q)
    );

  }

  return list;

}

function renderFeed() {

  const feed =
    document.getElementById("browseFeed");

  const list =
    applyFilters();

  feed.innerHTML =
    list.map(p => `

      <article
        class="problem-card"
        onclick="openProblem('${p.title}')"
      >

        <h2>${p.title}</h2>

        <p>${p.description}</p>

        <span>
          ${p.difficulty}
          •
          ${p.topic}
        </span>

      </article>

    `).join("");

}

function setActiveButtons() {

  document
    .querySelectorAll(".filter-item")
    .forEach(btn => {

      btn.classList.toggle(
        "active",
        btn.dataset.value ===
        state[btn.dataset.filter]
      );

    });

}

function bindEvents() {

  document.addEventListener(
    "click",
    (e) => {

      const btn =
        e.target.closest(".filter-item");

      if (!btn) return;

      state[
        btn.dataset.filter
      ] = btn.dataset.value;

      renderSidebarLists();

      setActiveButtons();

      renderFeed();

    }
  );

  document
    .getElementById("searchInput")
    .addEventListener("input", e => {

      state.search =
        e.target.value;

      renderFeed();

    });

}

// ======================================
// ROUTING
// ======================================
function openProblem(title) {

  const routes = {

    "Binary Search":
      "binary-search.html",

    "Two Sum":
      "two-sum.html",

    "Climbing Stairs":
      "climbing-stairs.html",

    "Longest Palindromic Substring":
      "longest-palindrome.html",

    "Course Schedule II":
      "course-schedule.html",

    "Merge K Sorted Lists":
      "merge-k-lists.html"

  };

  if (routes[title]) {

    window.location.href =
      routes[title];

  } else {

    alert(
      "Dynamic problem page not created yet 🚧"
    );

  }

}
function logout() {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("isLoggedIn");

  window.location.href = "index.html";

}