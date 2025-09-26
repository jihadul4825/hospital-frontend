const handleLogout = () => {
    const token = localStorage.getItem("token");
    fetch("https://jsonplaceholder.typicode.com/patient/logout", {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            window.location.href = "index.html";
        });
}