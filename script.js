// =============================================
//  Unit 3 Assignment - Students Dashboard
//  Topic  : React JS - Component Based UI
//  Name   : [Ashutosh Pandey]
//  Roll No: [2501060207]
//  Date   : April 2026
// =============================================

// ---- Sample student data ----
const initialStudents = [
  { id: 1, name: "Aarav Sharma",   subject: "Mathematics", marks: 88, grade: "A", attendance: 92 },
  { id: 2, name: "Priya Verma",    subject: "Physics",     marks: 75, grade: "B", attendance: 85 },
  { id: 3, name: "Rohit Singh",    subject: "Chemistry",   marks: 65, grade: "C", attendance: 78 },
  { id: 4, name: "Sneha Gupta",    subject: "Biology",     marks: 91, grade: "A", attendance: 97 },
  { id: 5, name: "Karan Mehta",    subject: "English",     marks: 55, grade: "D", attendance: 60 },
];

// ---- Navbar Component ----
function Navbar() {
  return (
    <nav className="navbar">
      <h1>📚 Student Dashboard</h1>
      <span>Unit 3 - React Assignment</span>
    </nav>
  );
}

function WelcomeBanner() {
  return (
    <div className="welcome-banner">
      <h2>Welcome, Professor! 👋</h2>
      <p>Here is the overview of all registered students for this semester.</p>
    </div>
  );
}
function StatCard({ icon, value, label }) {
  return (
    <div className="stat-card">
      <div className="icon">{icon}</div>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

function StatsSection({ students }) {
  // Calculate stats from student data
  const total      = students.length;
  const avgMarks   = total === 0 ? 0 : Math.round(students.reduce((s, st) => s + st.marks, 0) / total);
  const avgAtt     = total === 0 ? 0 : Math.round(students.reduce((s, st) => s + st.attendance, 0) / total);
  const toppers    = students.filter(st => st.grade === "A").length;

  return (
    <div className="stats-grid">
      <StatCard icon="🎓" value={total}      label="Total Students" />
      <StatCard icon="📊" value={avgMarks + "%"} label="Average Marks" />
      <StatCard icon="📅" value={avgAtt + "%"}   label="Avg Attendance" />
      <StatCard icon="🏆" value={toppers}    label="Grade A Students" />
    </div>
  );
}

function GradeBadge({ grade }) {
  return <span className={`badge badge-${grade}`}>{grade}</span>;
}

function AttendanceBar({ value }) {
  return (
    <div className="bar-bg">
      <div className="bar-fill" style={{ width: value + "%" }}></div>
    </div>
  );
}

function StudentTable({ students, onDelete }) {
  if (students.length === 0) {
    return <p style={{ textAlign: "center", color: "#aaa", padding: "20px" }}>No students found.</p>;
  }

  return (
    <div className="table-wrapper">
      <p className="section-title">📋 Student Records</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Attendance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.subject}</td>
              <td>{student.marks}</td>
              <td><GradeBadge grade={student.grade} /></td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <AttendanceBar value={student.attendance} />
                  <span style={{ fontSize: "12px", whiteSpace: "nowrap" }}>{student.attendance}%</span>
                </div>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => onDelete(student.id)}>
                  🗑 Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getGrade(marks) {
  if (marks >= 85) return "A";
  if (marks >= 70) return "B";
  if (marks >= 55) return "C";
  return "D";
}

function AddStudentForm({ onAdd }) {
  // State for form inputs
  const [name,       setName]       = React.useState("");
  const [subject,    setSubject]    = React.useState("");
  const [marks,      setMarks]      = React.useState("");
  const [attendance, setAttendance] = React.useState("");

  function handleSubmit() {
    // Basic validation
    if (!name || !subject || !marks || !attendance) {
      alert("Please fill in all fields!");
      return;
    }

    const newStudent = {
      id         : Date.now(),               
      name       : name,
      subject    : subject,
      marks      : Number(marks),
      grade      : getGrade(Number(marks)),
      attendance : Number(attendance),
    };

    onAdd(newStudent);

    setName("");
    setSubject("");
    setMarks("");
    setAttendance("");
  }

  return (
    <div className="form-box">
      <p className="section-title">➕ Add New Student</p>
      <div className="form-row">
        <div>
          <label>Student Name</label>
          <input
            type="text"
            placeholder="e.g. Anjali Rao"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            placeholder="e.g. Mathematics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label>Marks (out of 100)</label>
          <input
            type="number"
            placeholder="e.g. 78"
            min="0"
            max="100"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </div>
        <div>
          <label>Attendance (%)</label>
          <input
            type="number"
            placeholder="e.g. 85"
            min="0"
            max="100"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        ✅ Add Student
      </button>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>Unit 3 Assignment | Students Dashboard using React | [Your Name] | [Your College Name]</p>
    </div>
  );
}


function App() {
  const [students, setStudents] = React.useState(initialStudents);

  function handleAddStudent(newStudent) {
    setStudents([...students, newStudent]);
  }

  
  function handleDeleteStudent(id) {
    const updated = students.filter((st) => st.id !== id);
    setStudents(updated);
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <WelcomeBanner />

        <StatsSection students={students} />

        <AddStudentForm onAdd={handleAddStudent} />

        <StudentTable students={students} onDelete={handleDeleteStudent} />
      </div>

      <Footer />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
