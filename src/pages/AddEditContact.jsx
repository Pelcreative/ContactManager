import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

export default function AddEditContact(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (id) {
      // fetch contact and populate
      API.get("/contacts").then(res => {
        const c = res.data.find(x => x._id === id);
        if (c) {
          setName(c.name || "");
          setPhone(c.phone || "");
          setEmail(c.email || "");
          setNotes(c.notes || "");
        }
      }).catch(console.error);
    }
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/contacts/${id}`, { name, phone, email, notes });
      } else {
        await API.post("/contacts", { name, phone, email, notes });
      }
      navigate("/contacts");
    } catch (err) {
      console.error(err);
      alert("Failed to save contact");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">{id ? "Edit Contact" : "Add Contact"}</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="w-full border rounded p-2" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <textarea className="w-full border rounded p-2" placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} />
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white p-2 rounded">{id ? "Save" : "Add"}</button>
          <button type="button" onClick={()=>navigate("/contacts")} className="flex-1 border p-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
