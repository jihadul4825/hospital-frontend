const loadAllAppointment = () => {
    const patient_id = localStorage.getItem("patient_id");
    fetch(`https://jsonplaceholder.typicode.com/appointment/?patient_id=${patient_id}`)
    .then(res => res.json())
    .then((data) => {
        data.forEach((item) => {
            const parent = document.getElementById("table-body");
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.symptom}</td>
                <td>${item.appointment_type}</td>
                <td>${item.appointment_status}</td>
                <td>${item.doctor}</td>
                <td>$ 1200 BDT</td>
                ${
                    item.appointment_status === "Pending" ? `<td class="text-danger">x</td>` : `<td>x</td>`
                }
            `;
            parent.appendChild(tr);
        });
    });
}

loadAllAppointment();