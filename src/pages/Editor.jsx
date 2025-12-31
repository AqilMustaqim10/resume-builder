// Editor.jsx
// Resume editor page (form-based)

import { useState } from "react";

function Editor() {
  // Resume state
  const [resume, setResume] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      summary: "",
    },
    skills: "",
  });

  return (
    <div>
      <h1>Resume Editor</h1>
      <p>Start building your resume</p>

      {/* Personal Information Section */}
      <section>
        <h2>Personal Information</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={resume.personal.fullName}
          onChange={(e) =>
            setResume({
              ...resume,
              personal: {
                ...resume.personal,
                fullName: e.target.value,
              },
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
              personal: {
                ...resume.personal,
                email: e.target.value,
              },
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
              personal: {
                ...resume.personal,
                phone: e.target.value,
              },
            })
          }
        />

        <textarea
          placeholder="Professional Summary"
          value={resume.personal.summary}
          onChange={(e) =>
            setResume({
              ...resume,
              personal: {
                ...resume.personal,
                summary: e.target.value,
              },
            })
          }
        />
      </section>

      {/* Skills Section */}
      <section>
        <h2>Skills</h2>

        <textarea
          placeholder="e.g. React, JavaScript, CSS"
          value={resume.skills}
          onChange={(e) =>
            setResume({
              ...resume,
              skills: e.target.value,
            })
          }
        />
      </section>
    </div>
  );
}

export default Editor;
