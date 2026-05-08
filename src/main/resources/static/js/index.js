// Load users when page loads
window.addEventListener("load", loadAndDisplayUsers);

function loadAndDisplayUsers() {

    // Check if user is logged in
    const connectedUser = localStorage.getItem('connectedUser');
    if (!connectedUser) {
        window.location.href = 'login.html';
        return;
    }

    const userListElement = document.getElementById("userList");

    // Safety check (prevents crash)
    if (!userListElement) {
        console.error("userList element not found");
        return;
    }

    userListElement.innerHTML = "Loading...";

    // Fetch users from backend
    fetch('http://localhost:8080/api/v1/users')
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json();
        })
        .then(data => {
            console.log("Users:", data);

            // If no users found
            if (!data || data.length === 0) {
                userListElement.innerHTML = "No users found";
                return;
            }

            displayUsers(data, userListElement);
        })
        .catch(error => {
            console.error("Error:", error);
            userListElement.innerHTML = "Error loading users";
        });
}

// Display users
function displayUsers(userList, userListElement) {
    userListElement.innerHTML = "";

    userList.forEach(user => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div>
                <i class="fa fa-user-circle"></i>
                ${user.username || "Unknown"} 
                <i class="user-email">(${user.email || "No Email"})</i>
            </div>
            <i class="fa fa-lightbulb-o ${
                user.status && user.status.toLowerCase() === "online" 
                ? "online" 
                : "offline"
            }"></i>
        `;

        userListElement.appendChild(listItem);
    });
}

// Logout function
function handleLogout() {
    fetch('http://localhost:8080/api/v1/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.parse(localStorage.getItem('connectedUser')))
    })
    .then(() => {
        localStorage.removeItem('connectedUser');
        window.location.href = "login.html";
    })
    .catch(error => {
        console.error("Logout error:", error);
    });
}

// Safe event listeners
document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", handleLogout);
    }

    const newMeetingBtn = document.getElementById("newMeetingBtn");
    if (newMeetingBtn) {
        newMeetingBtn.addEventListener("click", handleNewMeeting);
    }

    const newMeetingBtn2 = document.getElementById("newMeetingBtn2");
    if (newMeetingBtn2) {
        newMeetingBtn2.addEventListener("click", newMeeting);
    }

    const joinMeetingBtn = document.getElementById("joinMeetingBtn");
    if (joinMeetingBtn) {
        joinMeetingBtn.addEventListener("click", handleJoinMeeting);
    }
});

// Create new meeting (original)
function handleNewMeeting() {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    if (!connectedUser) {
        alert("User not found");
        return;
    }

    window.open(`videocall.html?username=${connectedUser.username}`, "_blank");
}

// NEW function: newMeeting()
function newMeeting() {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    if (!connectedUser) {
        alert("Please login to start a meeting");
        return;
    }

    // Generate a unique meeting ID
    const meetingID = Math.random().toString(36).substring(2, 8); // 6-char random ID
    const url = `videocall.html?roomID=${meetingID}&username=${connectedUser.username}`;

    // Open meeting in new tab
    window.open(url, "_blank");
    alert(`Your new meeting ID is: ${meetingID}`);
}

// Join meeting
function handleJoinMeeting() {
    // Added requested constant for the button
    const joinMeetingBtn = document.getElementById("joinMeetingBtn");

    // Optional: disable button while processing
    if (joinMeetingBtn) {
        joinMeetingBtn.disabled = true;
    }

    const roomId = document.getElementById("meetingName")?.value;
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    if (!roomId) {
        alert("Please enter Meeting ID");
        if (joinMeetingBtn) joinMeetingBtn.disabled = false; // re-enable
        return;
    }

    if (!connectedUser) {
        alert("User not found");
        if (joinMeetingBtn) joinMeetingBtn.disabled = false; // re-enable
        return;
    }

    const url = `videocall.html?roomID=${roomId}&username=${connectedUser.username}`;
    window.open(url, "_blank");

    // Re-enable button after opening
    if (joinMeetingBtn) joinMeetingBtn.disabled = false;
}