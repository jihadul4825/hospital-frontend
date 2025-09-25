const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`)
    .then(res => res.json())
    .then((data) => {
        const parent = document.getElementById("user-details-container");
        const div=document.createElement("user-all");
        div.classList.add("user-all");
        div.innerHTML = `
            <div class="user-img">
                <img src=${data.image} alt="">
            </div>
            <div class="user-info">
                <h1>${data.username}</h1>
                <h3>${data.first_name + data.last_name}</h3>
                <h3>${data.email}</h3>
            </div>
        `;
        parent.appendChild(div);
    });
}

loadUserDetails();