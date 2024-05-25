const apiUrl = 'https://back-end-web-development-task3-part1-api.onrender.com';
// const apiUrl = 'http://localhost:3000';

function addWorkExperience(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const workExperienceData = {
        companyname: formData.get('companyname'),
        jobtitle: formData.get('jobtitle'),
        location: formData.get('location'),
        startdate: formData.get('startdate'),
        enddate: formData.get('enddate'),
        description: formData.get('description')
    };

    fetch(`${apiUrl}/workexperience`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workExperienceData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => { throw new Error(error.message); });
        }
        return response.json();
    })
    .then(() => {
        window.location.href = 'index.html';
    })
    .catch(error => {
        const errorMessagesDiv = document.getElementById('errorMessages');
        errorMessagesDiv.textContent = error.message;
    });
}

document.getElementById('addWorkExperienceForm').addEventListener('submit', addWorkExperience);
