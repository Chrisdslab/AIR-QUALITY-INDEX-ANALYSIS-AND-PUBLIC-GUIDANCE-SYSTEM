import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function GuidelineList() {
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/guidelines").then((res) => {
      setGuidelines(res.data);
    });
  }, []);

  return (
    <div className="card">
      <h2>Health Guidelines</h2>

      {guidelines.length === 0 && <p>No guidelines available.</p>}

      {guidelines.map((g) => (
        <div key={g.guideline_id} className="list-item">
          <b style={{ color: g.color_code }}>
            {g.aqi_category} ({g.min_aqi} - {g.max_aqi})
          </b>
          <br />
          <b>Impact:</b> {g.health_impact}
          <br />
          <b>Recommendations:</b> {g.recommendations}
          <br />
          <b>Sensitive Groups:</b> {g.sensitive_groups}
        </div>
      ))}
    </div>
  );
}
