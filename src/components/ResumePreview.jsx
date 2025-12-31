// ResumePreview.jsx
import React from "react";

function ResumePreview({ resume, mode }) {
  const containerStyle =
    mode === "Design"
      ? {
          fontFamily: "Arial, sans-serif",
          color: "#333",
          padding: "20px",
          lineHeight: "1.5",
          backgroundColor: "#fdf6f0",
          borderRadius: "8px",
        }
      : {
          fontFamily: "Times New Roman, serif",
          color: "#000",
          padding: "15px",
          lineHeight: "1.3",
          backgroundColor: "#fff",
        };

  return (
    <div id="resume-preview" style={containerStyle}>
      <h1 style={{ margin: 0 }}>{resume.personal.fullName || "Your Name"}</h1>
      <p style={{ margin: "5px 0" }}>
        {resume.personal.email || "email@example.com"} |{" "}
        {resume.personal.phone || "123-456-7890"}
      </p>
      <hr />

      {resume.personal.summary && (
        <section style={{ marginBottom: "15px" }}>
          <h2>Professional Summary</h2>
          <p>{resume.personal.summary}</p>
        </section>
      )}

      {resume.skills && (
        <section style={{ marginBottom: "15px" }}>
          <h2>Skills</h2>
          <p>{resume.skills}</p>
        </section>
      )}

      <section style={{ marginBottom: "15px" }}>
        <h2>Experience</h2>
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

      <section style={{ marginBottom: "15px" }}>
        <h2>Education</h2>
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
