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
  const [exporting, setExporting] = useState(false);

  // Professional colors
  const colors = {
    primary: "#1F3B4D",
    secondary: "#4A90E2",
    bgForm: "#F5F6F7",
    inputBorder: "#D1D5DB",
    buttonText: "#FFFFFF",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    margin: "5px 0 10px 0",
    borderRadius: "6px",
    border: `1px solid ${colors.inputBorder}`,
    backgroundColor: "#fff",
    outline: "none",
    transition: "border 0.2s ease",
  };

  const sectionStyle = {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: colors.bgForm,
    borderRadius: "8px",
  };

  const buttonStyle = {
    backgroundColor: colors.primary,
    color: colors.buttonText,
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "all 0.2s ease",
  };

  const cardStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: `1px solid ${colors.inputBorder}`,
    borderRadius: "6px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

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
    setExporting(true);
    const input = document.getElementById("resume-preview");
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.personal.fullName || "resume"}.pdf`);
      setExporting(false);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        padding: "20px",
        backgroundColor: "#E5E7EB",
        flexWrap: "wrap",
      }}
    >
      {/* Left Column: Form */}
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <h1 style={{ color: colors.primary }}>Resume Editor</h1>

        {/* Mode Toggle & Export */}
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setMode("ATS")}
            style={{
              ...buttonStyle,
              backgroundColor:
                mode === "ATS" ? colors.primary : colors.secondary,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.secondary)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                mode === "ATS" ? colors.primary : colors.secondary)
            }
          >
            ATS Mode
          </button>
          <button
            onClick={() => setMode("Design")}
            style={{
              ...buttonStyle,
              backgroundColor:
                mode === "Design" ? colors.primary : colors.secondary,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.secondary)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                mode === "Design" ? colors.primary : colors.secondary)
            }
          >
            Design Mode
          </button>
          <button onClick={exportPDF} style={buttonStyle} disabled={exporting}>
            {exporting ? "Generating PDF..." : "Export as PDF"}
          </button>
        </div>

        {/* Saved resumes list */}
        {resumesList.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2>Your Resumes</h2>
            {resumesList.map((r) => (
              <button
                key={r.id}
                onClick={() => loadResume(r)}
                style={{
                  ...buttonStyle,
                  marginBottom: "5px",
                  backgroundColor: colors.secondary,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.primary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.secondary)
                }
              >
                {r.title || "Untitled Resume"}
              </button>
            ))}
          </div>
        )}

        {/* Sections */}
        <section style={sectionStyle}>
          <h2>Personal Information</h2>
          <input
            style={inputStyle}
            type="text"
            placeholder="Full Name"
            value={resume.personal.fullName}
            onChange={(e) =>
              setResume({
                ...resume,
                personal: { ...resume.personal, fullName: e.target.value },
              })
            }
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = colors.secondary)
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = colors.inputBorder)
            }
          />
          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            value={resume.personal.email}
            onChange={(e) =>
              setResume({
                ...resume,
                personal: { ...resume.personal, email: e.target.value },
              })
            }
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = colors.secondary)
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = colors.inputBorder)
            }
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Phone"
            value={resume.personal.phone}
            onChange={(e) =>
              setResume({
                ...resume,
                personal: { ...resume.personal, phone: e.target.value },
              })
            }
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = colors.secondary)
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = colors.inputBorder)
            }
          />
          <textarea
            style={inputStyle}
            placeholder="Professional Summary"
            value={resume.personal.summary}
            onChange={(e) =>
              setResume({
                ...resume,
                personal: { ...resume.personal, summary: e.target.value },
              })
            }
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = colors.secondary)
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = colors.inputBorder)
            }
          />
        </section>

        <section style={sectionStyle}>
          <h2>Skills</h2>
          <textarea
            style={inputStyle}
            placeholder="e.g. React, JavaScript, CSS"
            value={resume.skills}
            onChange={(e) => setResume({ ...resume, skills: e.target.value })}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = colors.secondary)
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = colors.inputBorder)
            }
          />
        </section>

        <section style={sectionStyle}>
          <h2>Experience</h2>
          {resume.experience.map((exp, idx) => (
            <div
              key={idx}
              style={cardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <input
                style={inputStyle}
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].company = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <input
                style={inputStyle}
                placeholder="Role"
                value={exp.role}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].role = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <input
                style={inputStyle}
                placeholder="Start Year"
                value={exp.start}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].start = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <input
                style={inputStyle}
                placeholder="End Year"
                value={exp.end}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].end = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <textarea
                style={inputStyle}
                placeholder="Description"
                value={exp.description}
                onChange={(e) => {
                  const newExp = [...resume.experience];
                  newExp[idx].description = e.target.value;
                  setResume({ ...resume, experience: newExp });
                }}
              />
              <button
                style={{ ...buttonStyle, backgroundColor: colors.secondary }}
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
            style={{ ...buttonStyle, backgroundColor: colors.secondary }}
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

        <section style={sectionStyle}>
          <h2>Education</h2>
          {resume.education.map((edu, idx) => (
            <div
              key={idx}
              style={cardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <input
                style={inputStyle}
                placeholder="School / University"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = [...resume.education];
                  newEdu[idx].school = e.target.value;
                  setResume({ ...resume, education: newEdu });
                }}
              />
              <input
                style={inputStyle}
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...resume.education];
                  newEdu[idx].degree = e.target.value;
                  setResume({ ...resume, education: newEdu });
                }}
              />
              <input
                style={inputStyle}
                placeholder="Start Year"
                value={edu.start}
                onChange={(e) => {
                  const newEdu = [...resume.education];
                  newEdu[idx].start = e.target.value;
                  setResume({ ...resume, education: newEdu });
                }}
              />
              <input
                style={inputStyle}
                placeholder="End Year"
                value={edu.end}
                onChange={(e) => {
                  const newEdu = [...resume.education];
                  newEdu[idx].end = e.target.value;
                  setResume({ ...resume, education: newEdu });
                }}
              />
              <button
                style={{ ...buttonStyle, backgroundColor: colors.secondary }}
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
            style={{ ...buttonStyle, backgroundColor: colors.secondary }}
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
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          marginTop: "20px",
          backgroundColor: "#FFFFFF",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <ResumePreview resume={resume} mode={mode} />
      </div>
    </div>
  );
}

export default Editor;
