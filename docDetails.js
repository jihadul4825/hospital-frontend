const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("doctorId");
    loadTime(param);
    fetch(`https://jsonplaceholder.typicode.com/doctor/list/${param}`)
    .then(res => res.json())
    .then((data) => displayDetails(data));


    fetch(`https://jsonplaceholder.typicode.com/doctor/review/?doctor_id${param}`)
    .then(res => res.json())
    .then((data) => doctorReview(data));

};

const doctorReview = (reviews) => {
    reviews.forEach((review) => {
        const parent = document.getElementById("doc-details-review");
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
};



const displayDetails = (doctor) => {
    const parent = document.getElementById("doc-details");
    const div=document.createElement("div");
    div.classList.add("doc-details-containter");
    div.innerHTML = `
        <div class="doctor-img">
            <img src=${doctor.image} alt="">
        </div>
        <div class="doc-info">
            <h1>${doctor.full_name}</h1>
            ${
                doctor.specialization.map((item) => {
                    return `<button class="doc-detail-btn">${item}</button>`;
                })
            }
            ${
                doctor.designation.map((item) => {
                    return `<h4>${item}</h4>`;
                })
            }
            <p class="w-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, laudantium. Esse laudantium dolorum corporis tempora!</p>
            <h4>Fees: ${doctor.fee}</h4>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Take Appointment
            </button>
        </div>
        `;
    parent.appendChild(div);
};


const loadTime =()=>{
    fetch(`https://jsonplaceholder.typicode.com/doctor/availabletime/?doctor_id=${id}`)
    .then(res => res.json())
    .then((data)=> {
        data.forEach((item)=>{
            const parent=document.getElementById("time-container");
            const option = document.createElement("option");
            option.value= item.id;
            option.innerHTML=item.name;
            parent.appendChild(option);
        })
    })
}


const handleAppointment = () => {
    const param = new URLSearchParams(window.location.search).get("doctorId");

    const status = document.getElementsByName("status");

    const selected = Array.from(status).find((button) => button.checked);
    const symptom = document.getElementById("symptom").value;
    const time = document.getElementById("time-container");
    const selectedTime = time.options[time.selectedIndex];
    const patient_id = localStorage.getItem("patient_id");
    const info = {
        appointment_type: selected.value,
        appointment_status: "Pending",
        time: selectedTime.value,
        symptom: symptom,
        cancel: false,
        patient: patient_id,
        doctor: param,
    };
    fetch("https://jsonplaceholder.typicode.com/appointment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
};


const loadPatientId = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://jsonplaceholder.typicode.com/patient/list/?user_id=${user_id})`)
    .then(res => res.json())
    .then((data) => {
        localStorage.setItem("patient_id", data[0].id);
    });
}


const handlePdf = () => {
    const doctor_id = new URLSearchParams(window.location.search).get("doctorId");
    const user_id = localStorage.getItem("user_id");
    fetch(`https://jsonplaceholder.typicode.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${user_id})`)
            .then(res => res.json())
            .then((pdData) => {
            const newData = [data, pdData];
            const parent = document.getElementById("pdf-container");
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="pd d-flex justify-content-around align-items-center p-5">
                    <div class="patient doctor p-5">
                        <h2>${newData[1].username}</h2>
                        <h3>${newData[1].first_name} ${newData[1].last_name}</h3>
                        <h3>${newData[1].email}</h3>
                    </div>
                    <div class="doctor p-5">
                        <img class="w-25 border-rounded-2" src=${newData[0].image} alt=""/>
                        <h2 class="doc-name">Name: ${newData[0].full_name}</h2>
                        <h3>designation: ${
                            newData[0].designation.map((item) => {
                                return `${item}`;
                            })
                        }</h3>
                        <h5>specialization: ${
                            newData[0].specialization.map((item) => {
                                return `${item}`;
                            })
                        }</h5>
                    </div>
                </div>
                <input id="pdf-symptom" class="symtom" type="text">
                <h1 id="pdf-fees" class="text-center p-2 mt-3">Fees: ${newData[0].fee} BDT</h1>
            `

            parent.appendChild(div);
        });
    });

    
    

};



loadPatientId();
getparams();
loadTime();
handlePdf();
