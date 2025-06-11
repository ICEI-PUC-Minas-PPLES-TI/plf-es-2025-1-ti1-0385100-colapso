let user = {
    name: "",
    points: 0,
    level: 1,
    badges: 0
};

function login() {
    const username = document.getElementById('username').value.trim();
    if (username === "") {
        alert("Digite seu nome.");
        return;
    }
    const stored = localStorage.getItem(username);
    if (stored) {
        user = JSON.parse(stored);
    } else {
        user.name = username;
    }
    updateUI();
    document.getElementById('loginScreen').style.display = "none";
    document.getElementById('dashboard').style.display = "block";
}

function addPoints() {
    user.points += 10;
    user.level = Math.floor(user.points / 100) + 1;
    user.badges = Math.floor(user.level / 3);
    save();
    updateUI();
}

function updateUI() {
    document.getElementById('displayName').textContent = user.name;
    document.getElementById('points').textContent = user.points;
    document.getElementById('level').textContent = user.level;
    document.getElementById('badges').textContent = "🏅".repeat(user.badges);
}

function save() {
    localStorage.setItem(user.name, JSON.stringify(user));
}

function reset() {
    document.getElementById('dashboard').style.display = "none";
    document.getElementById('loginScreen').style.display = "block";
}
