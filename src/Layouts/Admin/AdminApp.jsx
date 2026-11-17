import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import PackagesAdmin from "./PackagesAdmin";
import PackageEditor from "./PackageEditor";
import CategoriesAdmin from "./CategoriesAdmin";
import EnquiriesAdmin from "./EnquiriesAdmin";
import SettingsAdmin from "./SettingsAdmin";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="packages" element={<PackagesAdmin />} />
        <Route path="packages/new" element={<PackageEditor key="new" />} />
        <Route path="packages/:id" element={<PackageEditor />} />
        <Route path="categories" element={<CategoriesAdmin />} />
        <Route path="enquiries" element={<EnquiriesAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
