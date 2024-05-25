const apiUrl = 'https://back-end-web-development-task3-part1-api.onrender.com';
// const apiUrl = 'http://localhost:3000';

function fetchWorkExperienceDetails(id) {
    fetch(`${apiUrl}/workexperience/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch work experience details');
            }
            return response.json();
        })
        .then(workExperience => {
            document.getElementById('companyname').value = workExperience.companyname;
            document.getElementById('jobtitle').value = workExperience.jobtitle;
            document.getElementById('location').value = workExperience.location;
            
            // Format dates to "yyyy-MM-dd" format
            document.getElementById('startdate').value = formatDate(workExperience.startdate);
            document.getElementById('enddate').value = formatDate(workExperience.enddate);
            
            document.getElementById('description').value = workExperience.description;
        })
        .catch(error => console.error('Error fetching work experience details:', error));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function updateWorkExperience(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const workExperienceId = new URLSearchParams(window.location.search).get('id');

    fetch(`${apiUrl}/workexperience/${workExperienceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => { throw new Error(error.message); });
        }
        window.location.href = 'index.html';
    })
    .catch(error => {
        const errorMessagesDiv = document.getElementById('errorMessages');
        errorMessagesDiv.textContent = error.message;
    });
}

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workExperienceId = urlParams.get('id');
    if (workExperienceId) {
        fetchWorkExperienceDetails(workExperienceId);
    }
});

document.getElementById('updateWorkExperienceForm').addEventListener('submit', updateWorkExperience);
