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

  const [form, setForm] = useState<any>(data || {});

  const handleSubmit = async () => {
    try {
      if (form.id) {
        if (!schema.api.update) return;

        const endpoint = schema.api.update.replace("{id}", form.id);
        await entityService.update(endpoint, form);

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
                  key={field.name}
                  placeholder={field.label}
                  onChange={(files) => {
                    console.log("Selected file:", files?.[0]);
                    console.log("Is File?", files?.[0] instanceof File);

                    setForm((prev: Record<string, any>) => ({
                      ...prev,
                      [field.name]: files?.[0] ?? null,
                    }));
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
