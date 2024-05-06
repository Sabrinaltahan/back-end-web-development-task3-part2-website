const apiUrl = 'https://back-end-web-development-task3-part1-api.onrender.com';

function fetchWorkExperiences() {
    fetch(`${apiUrl}/workexperience`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch work experiences');
            }
            return response.json();
        })
        .then(workExperiences => {
            const workExperienceList = document.getElementById('workExperienceList');
            workExperienceList.innerHTML = '';

            workExperiences.forEach(workExperience => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${workExperience.companyname}</td>
                    <td>${workExperience.jobtitle}</td>
                    <td>${workExperience.location}</td>
                    <td>${workExperience.startdate}</td>
                    <td>${workExperience.enddate}</td>
                    <td>${workExperience.description}</td>
                    <td>
                        <button onclick="goUpdateWorkExperience('${workExperience._id}')" class="update-button">Update</button>
                        <button onclick="deleteWorkExperience('${workExperience._id}')" class="delete-button">Delete</button>
                    </td>
                    
                `;
                workExperienceList.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching work experiences:', error));
}

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
            throw new Error('Failed to add work experience');
        }
        return response.json();
    })
    .then(() => {
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error adding work experience:', error));
}

function deleteWorkExperience(id) {
    fetch(`${apiUrl}/workexperience/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete work experience');
        }
        fetchWorkExperiences();
    })
    .catch(error => console.error('Error deleting work experience:', error));
}

function goUpdateWorkExperience(id) {
    window.location.href = `update.html?id=${id}`;
}

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


window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workExperienceId = urlParams.get('id');
    if (workExperienceId) {
        fetchWorkExperienceDetails(workExperienceId);
    }
});

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
            throw new Error('Failed to update work experience');
        }
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error updating work experience:', error));
}

// Fetch work experiences when the page loads
window.addEventListener('load', fetchWorkExperiences);
