import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function Contacts(){
  const [contacts, setContacts] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ fetchContacts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this contact?")) return;
    await API.delete(`/contacts/${id}`);
    fetchContacts();
  };

  const filtered = contacts.filter(c => 
    [c.name, c.email, c.phone].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-white p-2 rounded shadow">
          <FiSearch className="mr-2" />
          <input className="outline-none" placeholder="Search contacts" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <Link to="/contacts/new" className="flex items-center bg-blue-600 text-white px-3 py-2 rounded">
          <FiPlus className="mr-2" /> Add
        </Link>
      </div>

      {loading ? <div className="text-center py-8">Loading...</div> : (
        filtered.length === 0 ? <div className="text-center py-8">No contacts</div> : (
          <div className="space-y-3">
            {filtered.map(c => (
              <div key={c._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-600">{c.phone} {c.email && `• ${c.email}`}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/contacts/${c._id}/edit`} className="p-2 hover:bg-gray-100 rounded">
                    <FiEdit />
                  </Link>
                  <button onClick={()=>handleDelete(c._id)} className="p-2 hover:bg-gray-100 rounded">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
