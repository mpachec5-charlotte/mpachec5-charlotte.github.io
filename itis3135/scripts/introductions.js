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
        <input type="text" name="dept-${id}" placeholder="4-digit department code" value="ITCS" required><br>

        <label>Course Number:</label><br>
        <input type="text" name="number-${id}" placeholder="4-digit course number" value="4230" required><br>

        <label>Course Name:</label><br>
        <input type="text" name="name-${id}" placeholder="Course name" value="Intro to Game Design" required><br>

        <label>Reason for Taking:</label><br>
        <input name="reason-${id}" type="text" placeholder="Why are you taking this course?" value="I am interested in the designing of games.">
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
    acknowledgementStatement: get("acknowledgementStatement"),
    acknowledgementDate: get("acknowledgementDate"),
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
    other: get("other"),
    webpages: get("webpages"),
    github: get("github"),
    githubIo: get("githubIo"),
    freeCodeCamp: get("freeCodeCamp"),
    codecademy: get("codecademy"),
    linkedIn: get("linkedIn")
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

  const fullName = [data.firstName, data.middleName, data.lastName]
    .filter(Boolean)
    .join(" ");

  const main = document.querySelector("main");
  main.innerHTML = `
    <div class="spacer"></div>
    <h2>${fullName} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}</h2>
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
    <nav>
      <a href="${data.webpages}" target="_blank">Charlotte.edu</a> ${data.divider}
      <a href="${data.github}" target="_blank">GitHub</a> ${data.divider}
      <a href="${data.githubIo}" target="_blank">GitHub.io</a> ${data.divider}
      <a href="${data.freeCodeCamp}" target="_blank">FreeCodeCamp</a> ${data.divider}
      <a href="${data.codecademy}" target="_blank">Codecademy</a> ${data.divider}
      <a href="${data.linkedIn}" target="_blank">LinkedIn</a>
    </nav>
    <div class="spacer"></div>
    <p><small>${data.acknowledgementStatement}</small></p>
    <p><small>Date: <i>${data.acknowledgementDate}</i></small></p>
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