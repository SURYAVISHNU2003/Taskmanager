fetch("./User.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error fetching user data:", error.message);
    });

const Login = async (username, password) => {
    try {
        let users = await fetch("./User.json").then((response) => {
            return response.json();
        });
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Array.isArray(users.User)) {
                    let user = users.User.find(
                        (user) => user.username === username && user.password === password
                    );
                    if (user) {
                        resolve(user);
                    } else {
                        reject(new Error("Invalid credentials"));
                    }
                } else {
                    reject(new Error("User data is not an array"));
                }
            }, 1000);
        });
    } catch (error) {
        console.error("Login error:", error.message);
    }
};

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    try {
        let user = await Login(username, password);
        console.log("User logged in:", user);
    } catch (error) {
        console.error("Login error:", error.message);
    }
});
