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
    const info = {
        appointment_type: selected.value,
        appointment_status: "Pending",
        time: selectedTime.value,
        symptom: symptom,
        cancel: false,
        patient: 1,
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


getparams();
loadTime();
