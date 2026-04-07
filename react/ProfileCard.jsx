function ProfileCard({ name, title, bio, color, skills }) {
  return (
    <article
      style={{
        maxWidth: "320px",
        margin: "0 auto",
        padding: "24px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        textAlign: "center",
        backgroundColor: "#fff"
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: color || "#6c63ff",
          margin: "0 auto 16px"
        }}
      ></div>

      <h2 style={{ marginBottom: "8px" }}>{name || "Your Name"}</h2>
      <p style={{ marginBottom: "8px" }}>{title || "Your Job Title"}</p>
      <p style={{ marginBottom: "12px" }}>
        {bio || "Your bio will appear here."}
      </p>

      <div>
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                margin: "4px",
                padding: "4px 10px",
                borderRadius: "20px",
                backgroundColor: "#f1f1f1",
                fontSize: "12px"
              }}
            >
              {skill}
            </span>
          ))
        ) : (
          <span>No skills selected</span>
        )}
      </div>
    </article>
  );
}

export default ProfileCard;