// ResumePreview.jsx
// Displays resume content in ATS-friendly format

function ResumePreview({ resume }) {
  return (
    <div>
      <h1>{resume.personal.fullName || "Your Name"}</h1>
      <p>
        {resume.personal.email} | {resume.personal.phone}
      </p>

      <hr />

      <section>
        <h2>Professional Summary</h2>
        <p>{resume.personal.summary}</p>
      </section>

      <section>
        <h2>Skills</h2>
        <p>{resume.skills}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {resume.experience.length === 0 && <p>No experience added.</p>}
        {resume.experience.map((exp, idx) => (
          <div key={idx}>
            <p>
              <strong>{exp.role}</strong> at {exp.company} ({exp.start} -{" "}
              {exp.end})
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {resume.education.length === 0 && <p>No education added.</p>}
        {resume.education.map((edu, idx) => (
          <div key={idx}>
            <p>
              <strong>{edu.degree}</strong> at {edu.school} ({edu.start} -{" "}
              {edu.end})
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ResumePreview;
