const apiUrl = 'https://back-end-web-development-task3-part1-api.onrender.com';
// const apiUrl = 'http://localhost:3000';
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

// Fetch work experiences when the page loads
window.addEventListener('load', fetchWorkExperiences);
