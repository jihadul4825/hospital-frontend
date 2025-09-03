const loadServices = () => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(res=>res.json())
    .then((data)=> displayServices(data))
    .catch((err)=>console.log(err));
};



const displayServices = (services) => {
    services.forEach((service) => {
        const parent = document.getElementById("service-container");
        const li = document.createElement("li");
        li.innerHTML  = `<div class="card shadow h-100">
                            <div class="ratio ratio-16x9">
                                <img src="./images/card-2.jpg" class="card-img-top" loading="lazy" alt="...">
                            </div>
                            <div class="card-body p-3 p-xl-5">
                                <h3 class="card-title h5">${service.title}</h3>
                                <p class="card-text">${service.body}</p>
                                <a href="#" class="btn btn-primary">Read More</a>
                            </div>
                        </div>`;
        parent.appendChild(li);
    });
};



const loadDoctors = (search) => {
    document.getElementById("doctors").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    fetch(`https://jsonplaceholder.typicode.com/users?_limit=5/?search=${search?search:""}`)
    .then(res=>res.json())
    .then((data)=>{
        if(data.results.length > 0){
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "none";
            displayDoctors(data?.results);
        }
        else{
             document.getElementById("doctors").innerHTML = "";   
             document.getElementById("nodata").style.display = "none";
             document.getElementById("nodata").style.display = "block";
        }
    });

    
};

const displayDoctors = (doctors) => {
    doctors?.forEach((doctor) => {
        const parent = document.getElementById("doctors");
        const div = document.createElement("div");
        div.classList.add("doc-card");
        div.innerHTML  = `
                        <img class="doc-img" src=${doctor.image} alt="">
                        <h4>${doctor?.full_name}</h4>
                        <h6>${doctor?.designation[0]}</h6>
                        <h6>${doctor.phone}</h6>
                        
                        <p>
                        ${doctor?.specialization?.map((item)=> {
                            return `<button>${item}</button>`;
                        })}
                        </p>
                            
                        <button>Details</button>
                    `;
        parent.appendChild(div);
    });
};


const loadDesignation=()=> {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
    .then(res=>res.json())
    .then((data) => {
        data.forEach((item)=>{
            const parent = document.getElementById("drop-deg");
            const li = document.createElement("li");
            li.classList.add("dropdown-item");
            li.innerHTML = item?.name;
            parent.appendChild(li);
        });
    });
};


const loadSpecialization=()=> {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
    .then(res=>res.json())
    .then((data) => {
        data.forEach((item)=>{
            const parent = document.getElementById("drop-spec");
            const li = document.createElement("li");
            li.classList.add("dropdown-item");
            li.innerHTML = `
            <li onclick="loadDoctors('${item?.name}')">${item?.name}</li>
            `
            parent.appendChild(li);
        });
    });
};


const handleSearch = () => {
    const value = document.getElementById("search").value;
    loadDoctors(value);
}


const loadReview = () => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=5")
    .then(res => res.json())
    .then((data) => displayReview(data));
}

const displayReview = (reviews) => {
    reviews.forEach((review) => {
        const parent = document.getElementById("review-container");
        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
                    <img id="review-img" src="/images/girl.jpg" alt="">
                    <h4>${review.reviewer}</h4>
                    <p>${review.body.slice(0, 100)}</p>
                    <h6>${review.rating}</h6>
        `;
        parent.appendChild(div);
    })
}


loadServices();
loadDoctors();
loadDesignation();
loadSpecialization();
loadReview();

