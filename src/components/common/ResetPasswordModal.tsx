import { useState } from "react";
import Modal from "../../components/common/Modal";
import type { AdminUser } from "../../types/adminUser";

interface Props {
  open: boolean;
  user: AdminUser | null;
  onClose: () => void;
  onSubmit: (userId: number, password: string) => Promise<void>;
}

export default function ResetPasswordModal({
  open,
  user,
  onClose,
  onSubmit,
}: Props) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!password) {
      setError("Please enter new password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await onSubmit(user!.id, password);

      setPassword("");
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Reset Password">
      <div className="space-y-4">
        <p className="text-gray-600">
          Reset password for <b>{user?.name}</b>
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#8BAD13] text-white rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
