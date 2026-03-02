import "../styles/global.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} AQI Monitoring System • DBMS & QP Lab Project</p>
    </footer>
  );
}
