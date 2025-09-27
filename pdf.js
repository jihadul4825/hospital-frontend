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
            downloadPdf();
        });
        
    });
};


const downloadPdf = () => {
    const element = document.getElementById("pdf-container");

    // Define the options for html2pdf
    const options = {
        margin: 1,
        filename: 'report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // use html2pdf to generate the pdf
    html2pdf(element, options);
}


handlePdf();
