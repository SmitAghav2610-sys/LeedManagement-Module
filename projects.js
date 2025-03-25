document.addEventListener("DOMContentLoaded", () => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const projectsTableBody = document.getElementById("projectsTableBody");

    // Populate projects table
    function populateProjectsTable() {
        projectsTableBody.innerHTML = "";
        projects.forEach((project, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${project.name}</td>
                <td>${project.manager}</td>
                <td>${project.startDate}</td>
                <td>${project.endDate}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProject(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProject(${index})">Delete</button>
                </td>
            `;
            projectsTableBody.appendChild(row);
        });
    }

    // Save project
    document.getElementById("projectForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const project = {
            name: document.getElementById("projectName").value,
            manager: document.getElementById("projectManager").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            description: document.getElementById("projectDescription").value,
        };
        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));
        populateProjectsTable();
        document.getElementById("projectForm").reset();
    });

    // Edit project
    window.editProject = (index) => {
        const project = projects[index];
        document.getElementById("projectName").value = project.name;
        document.getElementById("projectManager").value = project.manager;
        document.getElementById("startDate").value = project.startDate;
        document.getElementById("endDate").value = project.endDate;
        document.getElementById("projectDescription").value = project.description;
        projects.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
        populateProjectsTable();
    };

    // Delete project
    window.deleteProject = (index) => {
        projects.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
        populateProjectsTable();
    };

    populateProjectsTable();
});