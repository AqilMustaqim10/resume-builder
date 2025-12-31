// Editor.jsx
// Resume Editor Page with live preview

import { useState } from "react";
import ResumePreview from "../components/ResumePreview";

function Editor() {
  // Main resume state
  const [resume, setResume] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      summary: "",
    },
    skills: "",
    experience: [],
    education: [],
  });

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      {/* Left Column: Form */}
      <div style={{ width: "50%" }}>
        <h1>Resume Editor</h1>

        {/* Personal Information */}
        <section>
          <h2>Personal Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={resume.personal.fullName}
            onChange={(e) =>
              setResume({
                ...resume,
                personal: { ...resume.personal, fullName: e.target.value },
              })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={resume.personal.email}
            onChange={(e) =>
              setResume({
                ...resume,
                personal: { ...resume.personal, email: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Phone"
            value={resume.personal.phone}
            onChange={(e) =>
              setResume({
                ...resume,
                personal: { ...resume.personal, phone: e.target.value },
              })
            }
          />
          <textarea
            placeholder="Professional Summary"
            value={resume.personal.summary}
            onChange={(e) =>
              setResume({
                ...resume,
                personal: { ...resume.personal, summary: e.target.value },
              })
            }
          />
        </section>

        {/* Skills */}
        <section>
          <h2>Skills</h2>
          <textarea
            placeholder="e.g. React, JavaScript, CSS"
            value={resume.skills}
            onChange={(e) => setResume({ ...resume, skills: e.target.value })}
          />
        </section>

        {/* Experience */}
        <section>
          <h2>Experience</h2>
          {resume.experience.map((exp, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].company = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].role = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="Start Year"
                value={exp.start}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].start = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="End Year"
                value={exp.end}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].end = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].description = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <button
                onClick={() => {
                  const newExp = resume.experience.filter((_, i) => i !== idx);
                  setResume({ ...resume, experience: newExp });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setResume({
                ...resume,
                experience: [
                  ...resume.experience,
                  {
                    company: "",
                    role: "",
                    start: "",
                    end: "",
                    description: "",
                  },
                ],
              })
            }
          >
            Add Experience
          </button>
        </section>

        {/* Education */}
        <section>
          <h2>Education</h2>
          {resume.education.map((edu, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <input
                type="text"
                placeholder="School / University"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = [...resume.education];
                  newEdu[idx].school = e.target.value;
                  setResume({ ...resume, education: newEdu });
                }}
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...resume.education];
                  newEdu[idx].degree = e.target.value;
                  setResume({ ...resume, education: newEdu });
                }}
              />
              <input
                type="text"
                placeholder="Start Year"
                value={edu.start}
                onChange={(e) => {
                  const newEdu = [...resume.education];
                  newEdu[idx].start = e.target.value;
                  setResume({ ...resume, education: newEdu });
                }}
              />
              <input
                type="text"
                placeholder="End Year"
                value={edu.end}
                onChange={(e) => {
                  const newEdu = [...resume.education];
                  newEdu[idx].end = e.target.value;
                  setResume({ ...resume, education: newEdu });
                }}
              />
              <button
                onClick={() => {
                  const newEdu = resume.education.filter((_, i) => i !== idx);
                  setResume({ ...resume, education: newEdu });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setResume({
                ...resume,
                education: [
                  ...resume.education,
                  { school: "", degree: "", start: "", end: "" },
                ],
              })
            }
          >
            Add Education
          </button>
        </section>
      </div>

      {/* Right Column: Live Preview */}
      <div style={{ width: "50%", background: "#fff", padding: "20px" }}>
        <ResumePreview resume={resume} />
      </div>
    </div>
  );
}

export default Editor;
