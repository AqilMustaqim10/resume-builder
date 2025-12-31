// ResumePreview.jsx
import React from "react";

function ResumePreview({ resume, mode }) {
  // Styles for each mode
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

  const sectionStyle = {
    marginBottom: "15px",
  };

  const headingStyle = {
    marginBottom: "5px",
    borderBottom: mode === "Design" ? "2px solid #ff69b4" : "1px solid #000",
  };

  return (
    <div style={containerStyle}>
      {/* Personal Info */}
      <h1 style={{ margin: 0 }}>{resume.personal.fullName || "Your Name"}</h1>
      <p style={{ margin: "5px 0" }}>
        {resume.personal.email || "email@example.com"} |{" "}
        {resume.personal.phone || "123-456-7890"}
      </p>
      <hr />

      {/* Professional Summary */}
      {resume.personal.summary && (
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Professional Summary</h2>
          <p>{resume.personal.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills && (
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Skills</h2>
          <p>{resume.skills}</p>
        </section>
      )}

      {/* Experience */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Experience</h2>
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

      {/* Education */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Education</h2>
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
