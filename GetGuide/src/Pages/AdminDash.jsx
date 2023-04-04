import { useRef } from "react";
import "./AdminDash.css";

export default function AdminDash() {
  return (
    <div>
      <div id="form">
        <input type="text" placeholder="Tour Name" />
        <textarea
          id="tour-info"
          name="tour-info"
          rows="10"
          cols="50"
        ></textarea>
        <button>Add Tour</button>
      </div>
    </div>
  );
}
