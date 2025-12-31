// ResumePreview.jsx
import React from "react";

function ResumePreview({ resume, mode }) {
  const containerStyle = {
    fontFamily:
      mode === "Design" ? "Arial, sans-serif" : "Times New Roman, serif",
    color: "#111827",
    padding: "20px",
    lineHeight: "1.5",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
  };

  const headingStyle = { margin: "5px 0", color: "#1F3B4D" };
  const subHeadingStyle = { margin: "3px 0", color: "#4A90E2" };
  const sectionStyle = { marginBottom: "15px" };

  return (
    <div id="resume-preview" style={containerStyle}>
      <h1 style={headingStyle}>{resume.personal.fullName || "Your Name"}</h1>
      <p style={{ margin: "5px 0" }}>
        {resume.personal.email || "email@example.com"} |{" "}
        {resume.personal.phone || "123-456-7890"}
      </p>
      <hr />

      {resume.personal.summary && (
        <section style={sectionStyle}>
          <h2 style={subHeadingStyle}>Professional Summary</h2>
          <p>{resume.personal.summary}</p>
        </section>
      )}

      {resume.skills && (
        <section style={sectionStyle}>
          <h2 style={subHeadingStyle}>Skills</h2>
          <p>{resume.skills}</p>
        </section>
      )}

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Experience</h2>
        {resume.experience.length === 0 ? (
          <p>No experience added.</p>
        ) : (
          resume.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <p>
                <strong>{exp.role || "Role"}</strong> at{" "}
                {exp.company || "Company"} ({exp.start || "-"} -{" "}
                {exp.end || "-"})
              </p>
              <p>{exp.description}</p>
            </div>
          ))
        )}
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Education</h2>
        {resume.education.length === 0 ? (
          <p>No education added.</p>
        ) : (
          resume.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <p>
                <strong>{edu.degree || "Degree"}</strong> at{" "}
                {edu.school || "School"} ({edu.start || "-"} - {edu.end || "-"})
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default ResumePreview;
