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
    </div>
  );
}

export default ResumePreview;
