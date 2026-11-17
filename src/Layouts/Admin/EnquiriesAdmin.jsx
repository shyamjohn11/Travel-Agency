import { useState } from "react";
import { Download, MessageCircle, Trash2 } from "lucide-react";
import { useCms } from "../../hooks/useCms";
import { deleteEnquiry, formatINR, updateEnquiry } from "../../services/db";
import { Badge } from "../../Components/Admin-Components/AdminUI";
import { useToast } from "../../hooks/useToast";

const STATUSES = ["new", "contacted", "quoted", "won", "lost"];
const csv = (rows) => rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");

export default function EnquiriesAdmin() {
  const { enquiries } = useCms();
  const [q, setQ] = useState("");
  const [st, setSt] = useState("all");
  const [type, setType] = useState("all");
  const [open, setOpen] = useState(null);
  const [toast, show] = useToast();

  const list = enquiries.filter((e) => (st === "all" || e.status === st) && (type === "all" || (type === "subscriber" ? e.type === "subscriber" : e.type !== "subscriber")) && `${e.name} ${e.phone} ${e.email} ${e.packageTitle}`.toLowerCase().includes(q.toLowerCase()));

  const exportCsv = () => {
    const rows = [["Date", "Type", "Name", "Phone", "Email", "Package", "Travel date", "Travellers", "Estimated total", "Status", "Source", "UTM source", "UTM campaign", "Message"],
      ...list.map((e) => [e.createdAt, e.type || "enquiry", e.name, e.phone, e.email, e.packageTitle, e.travelDate, e.travellers, e.selection?.total, e.status, e.source, e.utm?.utm_source, e.utm?.utm_campaign, e.message])];
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv(rows)], { type: "text/csv" }));
    a.download = `rj-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      {toast}
      <div className="ad-top"><div><h1>Enquiries & Leads</h1><p>Every form, popup and newsletter signup lands here.</p></div>
        <button className="ad-btn dark" onClick={exportCsv} disabled={!list.length}><Download size={15} /> Export CSV</button></div>
      <div className="ad-note">Leads are stored in <b>this browser</b> (the one the visitor used is a different browser, so on a live site they will not reach you until the backend step in the README is added). Until then, use the WhatsApp and phone buttons on the site for real-time leads.</div>
      <div className="ad-card">
        <div className="ad-filters">
          <input placeholder="Search name, phone, package" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
          <select value={st} onChange={(e) => setSt(e.target.value)} aria-label="Status"><option value="all">All status</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Type"><option value="all">Enquiries + subscribers</option><option value="enquiry">Enquiries only</option><option value="subscriber">Subscribers only</option></select>
        </div>
        <div className="ad-table-wrap"><table className="ad-table">
          <thead><tr><th>Date</th><th>Contact</th><th>Interest</th><th>Source</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {list.map((e) => (
              <>
                <tr key={e.id} onClick={() => setOpen(open === e.id ? null : e.id)} style={{ cursor: "pointer" }}>
                  <td>{new Date(e.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                  <td><b>{e.name}</b><br /><small>{e.phone} {e.email}</small></td>
                  <td>{e.type === "subscriber" ? <Badge>Subscriber</Badge> : <>{e.packageTitle || "General"}<br /><small>{e.travelDate && `${e.travelDate} - `}{e.travellers} traveller(s){e.selection?.total ? ` - ${formatINR(e.selection.total)}` : ""}</small></>}</td>
                  <td><Badge tone="blue">{e.source}</Badge>{e.utm?.utm_source && <small style={{ display: "block" }}>utm: {e.utm.utm_source}</small>}</td>
                  <td onClick={(ev) => ev.stopPropagation()}><select defaultValue={e.status} onChange={(ev) => updateEnquiry(e.id, { status: ev.target.value })} aria-label="Change status">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td>
                  <td onClick={(ev) => ev.stopPropagation()}><div className="ad-row-btns">
                    {e.phone && <a className="ad-btn sm ghost" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${e.phone.replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}`} title="WhatsApp"><MessageCircle size={14} /></a>}
                    <button className="ad-btn sm danger" onClick={() => { if (window.confirm("Delete this entry?")) show(deleteEnquiry(e.id).ok ? "Deleted" : "Failed", false); }}><Trash2 size={14} /></button></div></td>
                </tr>
                {open === e.id && (
                  <tr key={`${e.id}-d`}><td colSpan="6" style={{ background: "#faf8f5" }}>
                    {e.message && <p><b>Message:</b> {e.message}</p>}
                    {e.selection?.options?.length > 0 && <p><b>Chosen options:</b> {e.selection.options.map((o) => `${o.group}: ${o.label}`).join(" | ")} - {formatINR(e.selection.perPerson)} per person</p>}
                    {!e.message && !e.selection && <small>No extra details.</small>}
                  </td></tr>
                )}
              </>
            ))}
            {!list.length && <tr><td colSpan="6" style={{ textAlign: "center", padding: 40, color: "#777" }}>No entries yet.</td></tr>}
          </tbody></table></div>
      </div>
    </>
  );
}
