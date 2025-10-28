const formElement = document.querySelector("form");
let courseCount = 0;

function addCourse() {
  const coursesList = document.getElementById("courseList");
  const id = ++courseCount;

  const li = document.createElement("li");
  li.className = "course-item";
  li.id = `course-${id}`;
  li.innerHTML = `
    <div class="course-inputs">
        <label>Department:</label><br>
        <input type="text" name="dept-${id}" placeholder="4-digit department code" required><br>

        <label>Course Number:</label><br>
        <input type="text" name="number-${id}" placeholder="4-digit course number" required><br>

        <label>Course Name:</label><br>
        <input type="text" name="name-${id}" placeholder="Course name" required><br>

        <label>Reason for Taking:</label><br>
        <input name="reason-${id}" type="text" placeholder="Why are you taking this course?" required>
        <div class="spacer"></div>
        <button type="button" class="remove-btn" onclick="removeCourse(${id})">Delete Course</button>
    </div><br>
  `;
  coursesList.appendChild(li);
}

function removeCourse(id) {
  const course = document.getElementById(`course-${id}`);
  if (course) {
    course.remove();
  }
}

function loadImage() {
  const imageInput = document.getElementById('introImage');
  if (imageInput.files && imageInput.files[0]) {
    const image = imageInput.files[0];
    const imageURL = URL.createObjectURL(image);
    document.getElementById('loadImage').innerHTML = `<img src="${imageURL}" >`;
  }
}

function resetForm() {
  location.reload();
}

function generateOutputPage() {
  const formData = new FormData(formElement);
  const get = (name) => formData.get(name);

  const data = {
    firstName: get("firstName"),
    middleName: get("middleName"),
    lastName: get("lastName"),
    preferred: get("preferred"),
    mascotAdjective: get("mascotAdjective"),
    mascotAnimal: get("mascotAnimal"),
    divider: get("divider"),
    imageCaption: get("imageCaption"),
    personalStatement: get("personalStatement"),
    personalBackground: get("personalBackground"),
    professionalBackground: get("professionalBackground"),
    academicBackground: get("academicBackground"),
    primaryComputer: get("primaryComputer"),
    quote: get("quote"),
    quoteAuthor: get("quoteAuthor"),
    funny: get("funny"),
    other: get("other")
  };

  const courses = Array.from({ length: courseCount }, (_, i) => {
    const id = i + 1;
    const dept = get(`dept-${id}`);
    const number = get(`number-${id}`);
    const name = get(`name-${id}`);
    const reason = get(`reason-${id}`);
    return dept && number && name ? { dept, number, name, reason } : null;
  }).filter(Boolean);

  const coursesHTML = courses.length
    ? courses
        .map(
          (c) =>
            `<li><span style="font-weight: bold">${c.dept} ${c.number}</span> - ${c.name}: ${c.reason}</li>`
        )
        .join("")
    : "";

  const imageElement = document.querySelector('#loadImage img');
  const imageSrc = imageElement ? imageElement.src : '';

  const fullName = data.preferred
    ? `${data.firstName} "${data.preferred}" ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`
    : [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ");


  const main = document.querySelector("main");
  main.innerHTML = `
    <h2>Introduction Form</h2>
    <h3>${fullName} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}</h3>
    <figure>
      ${imageSrc ? `<img src="${imageSrc}" alt="${data.imageCaption}">` : '<img src="images/intro_img.png" alt="Default profile">'}
      <figcaption>${data.imageCaption}</figcaption>
    </figure>
    <p>
      ${data.personalStatement}
    </p>
    <ul>
      <li><span style="font-weight: bold">Personal Background</span>: ${data.personalBackground}</li>
      <li><span style="font-weight: bold">Professional Background</span>: ${data.professionalBackground}</li>
      <li><span style="font-weight: bold">Academic Background</span>: ${data.academicBackground}</li>
      <li><span style="font-weight: bold">Primary Computer Platform</span>: ${data.primaryComputer}</li>
      <li><span style="font-weight: bold">Courses I'm Taking &amp; Why</span>:</li>
      <li class="invisible">
        <ul>
          ${coursesHTML}
        </ul>
      </li>
      ${data.funny ? `<li><span style="font-weight: bold">Funny/Interesting Thing to Remember me by</span>: ${data.funny}</li>` : ""}
      ${data.other ? `<li><span style="font-weight: bold">I'd also like to Share</span>: ${data.other}</li>` : ""}
    </ul>
    <p>
      "${data.quote}"<br>
      - <span style="font-style: italic">${data.quoteAuthor}</span>
    </p>
  `;
}

document
  .querySelector("#clear")
  .addEventListener("click", function (event) {
    Array.from(document.querySelectorAll("form input")).forEach((input) => {
      input.value = "";
    });
  });

formElement.addEventListener("submit", function(e) {
  e.preventDefault();
  
  if (courseCount === 0) {
    alert("Please add at least one course before submitting!");
    return;
  }
  
  const requiredFields = formElement.querySelectorAll('[required]');
  let allValid = true;
  
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      allValid = false;
      field.style.border = "2px solid red";
    } else {
      field.style.border = "";
    }
  });
  
  if (!allValid) {
    alert("Please fill in all required fields!");
    return;
  }
  
  generateOutputPage();
});

window.addEventListener('DOMContentLoaded', function() {
  addCourse();
  document.querySelector('input[name="dept-1"]').value = "ITCS";
  document.querySelector('input[name="number-1"]').value = "4230";
  document.querySelector('input[name="name-1"]').value = "Intro to Game Design";
  document.querySelector('input[name="reason-1"]').value = "I am interested in the designing of games.";
  
  addCourse();
  document.querySelector('input[name="dept-2"]').value = "ITIS";
  document.querySelector('input[name="number-2"]').value = "3135";
  document.querySelector('input[name="name-2"]').value = "Front-End Web App Development";
  document.querySelector('input[name="reason-2"]').value = "I need it to graduate..";
  
  addCourse();
  document.querySelector('input[name="dept-3"]').value = "ITSC";
  document.querySelector('input[name="number-3"]').value = "3610";
  document.querySelector('input[name="name-3"]').value = "Computing Leaders Seminar";
  document.querySelector('input[name="reason-3"]').value = "I am interested in leadership, and also computers.";
  
  addCourse();
  document.querySelector('input[name="dept-4"]').value = "ITCS";
  document.querySelector('input[name="number-4"]').value = "3153";
  document.querySelector('input[name="name-4"]').value = "Intro to Artificial Intelligence";
  document.querySelector('input[name="reason-4"]').value = "I am interested in AI and how it really works.";
  
  addCourse();
  document.querySelector('input[name="dept-5"]').value = "ITIS";
  document.querySelector('input[name="number-5"]').value = "3130";
  document.querySelector('input[name="name-5"]').value = "Human-Centered Computing";
  document.querySelector('input[name="reason-5"]').value = "I need it to graduate.";
});