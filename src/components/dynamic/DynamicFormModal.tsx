import { useState } from "react";

import { entityService } from "../../services/entity.service";
import type { EntitySchema } from "../../types/entity";

import Select from "../ui/Select";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import RadioGroup from "../ui/RadioGroup";
import PasswordInput from "../ui/PasswordInput";
import EmailInput from "../ui/EmailInput";
import FileInput from "../ui/FileInput";

interface Props {
  schema: EntitySchema;
  entity: string;
  data: any;
  onClose: () => void;
  onSuccess: (isEdit: boolean) => void;
}

export default function DynamicFormModal({
  schema,
  data,
  onClose,
  onSuccess,
}: Props) {
  const getFileName = (path?: string) => {
    if (!path) return null;
    return path.split("/").pop();
  };

  const [form, setForm] = useState<any>(() => {
    if (!data) return {};

    const internal = data.sources?.find(
      (s: any) => s.source_type === "internal",
    );

    return {
      ...data,
      model_file_name: getFileName(internal?.endpoint),
    };
  });

  const [activeSourceTab, setActiveSourceTab] = useState<"api" | "internal">(
    "api",
  );

  const handleSubmit = async () => {
    try {
      if (form.id) {
        if (!schema.api.update) return;

        // const endpoint = schema.api.update.replace("{id}", form.id);

        const formData = new FormData();

        // 🔥 Clean sources BEFORE sending
        const cleanSources = (form.sources || []).map((s: any) => ({
          source_type: s.source_type,
          is_active: Boolean(s.is_active),
          endpoint: s.source_type === "api" ? s.endpoint || null : null,
        }));

        // ✅ IMPORTANT: stringify
        formData.append("sources", JSON.stringify(cleanSources));

        // other fields
        formData.append("model_name", form.model_name);
        formData.append("model_type", form.model_type);

        if (form.description) {
          formData.append("description", form.description);
        }

        // file
        if (form.model_file) {
          formData.append("model_file", form.model_file);
        }

        // Laravel PUT support
        formData.append("_method", "PUT");

        await entityService.create(`/models/${form.id}`, formData);

        onSuccess(true);
      } else {
        if (!schema.api.create) return;

        await entityService.create(schema.api.create, form);

        onSuccess(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isVisible = (field: any) => {
    if (!field.visible_if) return true;
    return form[field.visible_if.field] === field.visible_if.equals;
  };

  // const handleToggleSource = async (source: any) => {
  //   try {
  //     await entityService.patch(`/model-sources/${source.id}/status`, {
  //       is_active: !source.is_active,
  //     });

  //     // update UI immediately
  //     setForm((prev: any) => ({
  //       ...prev,
  //       sources: prev.sources.map((s: any) =>
  //         s.id === source.id ? { ...s, is_active: !s.is_active } : s,
  //       ),
  //     }));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">
        <p className="text-xl font-moul">{schema.page_title}</p>

        {schema.form?.fields?.map((field: any) => {
          if (!isVisible(field)) return null;

          switch (field.type) {
            case "email":
              return (
                <EmailInput
                  key={field.name}
                  placeholder={field.label}
                  value={form[field.name]}
                  required={field.required}
                  onChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                />
              );

            case "password":
              return (
                <PasswordInput
                  key={field.name}
                  placeholder={field.label}
                  value={form[field.name]}
                  required={field.required}
                  minLength={field.min_length}
                  onChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                />
              );

            case "text":
              return (
                <Input
                  key={field.name}
                  placeholder={field.label}
                  value={form[field.name] || ""}
                  required={field.required}
                  onChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                />
              );

            case "textarea":
              return (
                <Textarea
                  key={field.name}
                  placeholder={field.label}
                  value={form[field.name] || ""}
                  onChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                />
              );

            case "select":
              return (
                <Select
                  key={field.name}
                  value={
                    field.options.find((o: any) => o.value === form[field.name])
                      ?.label
                  }
                  options={field.options.map((o: any) => o.label)}
                  onChange={(label: string) => {
                    const selected = field.options.find(
                      (o: any) => o.label === label,
                    );
                    if (!selected) return;
                    setForm({ ...form, [field.name]: selected.value });
                  }}
                />
              );

            case "radio":
              return (
                <RadioGroup
                  key={field.name}
                  value={form[field.name]}
                  options={field.options}
                  onChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                />
              );

            case "file":
              return (
                <FileInput
                  placeholder="Upload model file"
                  onChange={(files) => {
                    const file = files?.[0] ?? null;

                    setForm((prev: any) => ({
                      ...prev,
                      model_file: file,
                    }));

                    updateSource({
                      ...current,
                      endpoint: null,
                    });
                  }}
                />
              );

            case "switch":
              return (
                <input
                  key={field.name}
                  type="checkbox"
                  checked={Boolean(form[field.name] ?? field.default ?? false)}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [field.name]: e.target.checked,
                    })
                  }
                />
              );

            case "sources":
              const activeTab = activeSourceTab;
              const setActiveTab = setActiveSourceTab;

              const getFileName = (path?: string) => {
                if (!path) return null;
                return path.split("/").pop();
              };

              // ✅ Always return FULL structure
              const getSource = (type: string) => {
                const found = form.sources?.find(
                  (s: any) => s.source_type === type,
                );

                return (
                  found || {
                    source_type: type,
                    endpoint: null,
                    is_active: false,
                  }
                );
              };

              // ✅ Always enforce valid structure
              const updateSource = (updated: any) => {
                setForm((prev: any) => {
                  const sources = prev.sources || [];

                  const cleanUpdated = {
                    source_type: updated.source_type,
                    is_active: Boolean(updated.is_active),
                    endpoint:
                      updated.source_type === "api"
                        ? updated.endpoint || null
                        : null, // 🔥 NEVER allow file/object here
                  };

                  const filtered = sources.filter(
                    (s: any) => s.source_type !== cleanUpdated.source_type,
                  );
                  console.log("FORM STATE:", form);

                  return {
                    ...prev,
                    sources: [...filtered, cleanUpdated],
                  };
                });
              };

              const current = getSource(activeTab);

              return (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Sources</p>

                  {/* Tabs */}
                  <div className="flex gap-2">
                    {["api", "internal"].map((tab) => (
                      <button
                        key={`tab-${tab}`}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-3 py-1 rounded-full text-sm border ${
                          activeTab === tab
                            ? "bg-green-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {tab.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="border rounded-lg p-3 space-y-3">
                    {/* Toggle */}
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={current.is_active}
                        onChange={(e) =>
                          updateSource({
                            ...current,
                            source_type: activeTab, // 🔥 ensure always present
                            is_active: e.target.checked,
                          })
                        }
                      />
                      Active
                    </label>

                    {/* API INPUT */}
                    {activeTab === "api" && (
                      <Input
                        placeholder="API URL"
                        value={current.endpoint || ""}
                        onChange={(value) =>
                          updateSource({
                            ...current,
                            source_type: "api",
                            endpoint: value || null,
                          })
                        }
                      />
                    )}

                    {/* INTERNAL FILE */}
                    {activeTab === "internal" && (
                      <div className="space-y-2">
                        <FileInput
                          placeholder="Upload model file"
                          onChange={(files) => {
                            const file = files?.[0] ?? null;

                            setForm((prev: any) => ({
                              ...prev,
                              model_file: file,
                              model_file_name:
                                file?.name || prev.model_file_name,
                            }));

                            updateSource({
                              ...current,
                              source_type: "internal",
                              endpoint: null,
                            });
                          }}
                        />

                        {/* ✅ SINGLE SOURCE OF TRUTH */}
                        {form.model_file_name && (
                          <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
                            📄 {form.model_file?.name || form.model_file_name}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            បោះបង់
          </Button>

          <Button onClick={handleSubmit}>រក្សាទុក</Button>
        </div>
      </div>
    </div>
  );
}
