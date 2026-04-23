import { useEffect, useState } from "react";
import api from "../../services/api";
import { useMessage } from "../../components/ui/MessageProvider";
import { usePermission } from "../../hooks/usePermission";
import type { Role } from "../../types/role";
import type { Permission } from "../../types/permission";
import { Navigate } from "react-router-dom";
// import DynamicFormModal from "../../components/dynamic/DynamicFormModal";
// import ConfirmModal from "../../components/common/ConfirmModal";
// import { formSchemaService } from "../../services/formSchema.service";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const { showMessage } = useMessage();
  const { hasPermission } = usePermission();

  if (!hasPermission("role.view")) {
    <Navigate to="/admin" replace />;
  }

  const formatPermission = (name: string) => {
    return name.replace(".", " ").toUpperCase();
  };

  const fetchRoles = async () => {
    const res = await api.get("/roles");
    setRoles(res.data.data);
  };

  const fetchPermissions = async () => {
    const res = await api.get("/permissions");
    setPermissions(res.data.data);
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const handleSelectRole = async (role: Role) => {
    setSelectedRole(role);

    const res = await api.get(`/roles/${role.id}/permissions`);
    setSelectedPermissions(res.data.data.map((p: any) => p.name ?? p));
  };

  const togglePermission = (name: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  const handleSave = async () => {
    if (!selectedRole) return;

    try {
      await api.post(`/roles/${selectedRole.id}/permissions`, {
        permissions: selectedPermissions,
      });

      showMessage("success", "បានរក្សាទុកដោយជោគជ័យ");
    } catch {
      showMessage("error", "មានបញ្ហា");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT: ROLES */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Roles</h2>

        <ul className="space-y-2">
          {roles.map((role) => (
            <li
              key={role.id}
              onClick={() => handleSelectRole(role)}
              className={`p-3 rounded cursor-pointer border ${
                selectedRole?.id === role.id
                  ? "bg-[#8BAD13] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {role.name}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT: PERMISSIONS */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          Permissions {selectedRole && `(${selectedRole.name})`}
        </h2>

        {selectedRole ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              {permissions.map((p) => (
                <label key={p.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled={!hasPermission("role.update")}
                    checked={selectedPermissions.includes(p.name)}
                    onChange={() => togglePermission(p.name)}
                  />
                  {formatPermission(p.name)}
                </label>
              ))}
            </div>

            {hasPermission("role.update") && (
              <button
                onClick={handleSave}
                className="mt-4 bg-[#8BAD13] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-400">Select a role</p>
        )}
      </div>
    </div>
  );
}
