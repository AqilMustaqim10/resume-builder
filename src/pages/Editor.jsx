// Editor.jsx
import { useState, useEffect } from "react";
import ResumePreview from "../components/ResumePreview";
import { useAuth } from "../context/AuthContext";
import { saveResume, getResumes } from "../supabase/resume";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Editor() {
  const { user } = useAuth();
  const [resume, setResume] = useState({
    personal: { fullName: "", email: "", phone: "", summary: "" },
    skills: "",
    experience: [],
    education: [],
  });
  const [resumesList, setResumesList] = useState([]);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [mode, setMode] = useState("ATS"); // 'ATS' or 'Design'

  // Load user's resumes
  useEffect(() => {
    if (!user) return;
    async function fetchResumes() {
      const { data, error } = await getResumes(user.id);
      if (!error) setResumesList(data);
    }
    fetchResumes();
  }, [user]);

  // Auto-save
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      saveResume(user.id, "Untitled Resume", resume, currentResumeId)
        .then(() => console.log("Saved"))
        .catch((err) => console.error(err));
    }, 1000);
    return () => clearTimeout(timer);
  }, [resume]);

  // Load selected resume
  const loadResume = (r) => {
    setResume(r.data);
    setCurrentResumeId(r.id);
  };

  // Export to PDF
  const exportPDF = () => {
    const input = document.getElementById("resume-preview");
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.personal.fullName || "resume"}.pdf`);
    });
  };

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      {/* Left Column: Form */}
      <div style={{ width: "50%" }}>
        <h1>Resume Editor</h1>

        {/* Mode Toggle & Export */}
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setMode("ATS")}
            style={{ fontWeight: mode === "ATS" ? "bold" : "normal" }}
          >
            ATS Mode
          </button>
          <button
            onClick={() => setMode("Design")}
            style={{
              fontWeight: mode === "Design" ? "bold" : "normal",
              marginLeft: "10px",
            }}
          >
            Design Mode
          </button>
          <button
            onClick={exportPDF}
            style={{ marginLeft: "20px", background: "#ff69b4", color: "#fff" }}
          >
            Export as PDF
          </button>
        </div>

        {/* Saved resumes list */}
        {resumesList.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2>Your Resumes</h2>
            {resumesList.map((r) => (
              <button key={r.id} onClick={() => loadResume(r)}>
                {r.title || "Untitled Resume"}
              </button>
            ))}
          </div>
        )}

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
        <ResumePreview resume={resume} mode={mode} />
      </div>
    </div>
  );
}

export default Editor;
