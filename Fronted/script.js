const displaybtn = document.querySelector("#displayStudent");
const studentList = document.querySelector("#studentList");
const inputId = document.querySelector("#inputId");
const studentId = document.querySelector("#studentId");
const btnById = document.querySelector("#byId");
const form = document.querySelector("#studentForm");

displaybtn.addEventListener("click", displayStudents);
btnById.addEventListener("click", searchById);
form.addEventListener("submit", postStudent);
async function displayStudents() {
    try {
       const response = await fetch("http://localhost:3001/api/students");
        const students = await response.json();

        students.forEach(student => {
            const element = document.createElement("li");
            element.textContent = `Name: ${student.name}, Id: ${student.id}, Email: ${student.email}, Course: ${student.course}`;
            studentList.appendChild(element);
        });
    } catch (error) {
        console.error(error);
    }
}

async function searchById() {
    try {
        const id = inputId.value.trim();
        if (!id) {
            alert("Please enter ID");
            return;
        }

        const response = await fetch(`http://localhost:3001/api/students/${id}`);
        const student = await response.json();
        if (!response.ok) {
    studentId.innerHTML = `<li>${student.message}</li>`;
    return;
}
        const element = document.createElement('li');
        element.textContent = `Name: ${student.name}, Id: ${student.id}, Email: ${student.email}, Course: ${student.course}`;
        studentId.appendChild(element);
    } catch (error) {
        console.error(error);
    }
}

async function postStudent() {
    

    const student = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        course: document.querySelector("#course").value
    };

    try {
        const response = await fetch("http://localhost:3001/api/students", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(student)
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert("Student added successfully!");

        form.reset();

    } catch (error) {
        console.log("Error:", error);
    }
}