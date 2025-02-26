import React, { useState } from "react";

const StudentDocument = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Student Documents</h1>
      <div style={{ marginTop: "20px" }}>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label
          htmlFor="fileInput"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "inline-block",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#38A169")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#4CAF50")
          }
        >
          {selectedFile
            ? `Selected File: ${selectedFile.name}`
            : "Upload Document"}
        </label>
      </div>
      {selectedFile && (
        <div style={{ marginTop: "10px" }}>
          Selected File: {selectedFile.name}
        </div>
      )}
      {selectedFile && (
        <button
          onClick={() => setSelectedFile(null)}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "inline-block",
            marginTop: "10px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#d32f2f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f44336")
          }
        >
          Clear Selection
        </button>
      )}
      {selectedFile && (
        <>
          <button
            onClick={() => {
              /* TODO: Implement send functionality */
            }}
            style={{
              backgroundColor: "#2196f3",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              display: "inline-block",
              marginTop: "10px",
              marginRight: "10px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1976d2")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2196f3")
            }
          >
            Send
          </button>
          <button
            onClick={() => {
              /* TODO: Implement verify functionality */
            }}
            style={{
              backgroundColor: "#ff9800",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              display: "inline-block",
              marginTop: "10px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f57c00")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff9800")
            }
          >
            Verify
          </button>
        </>
      )}
    </div>
  );
};

export default StudentDocument;
