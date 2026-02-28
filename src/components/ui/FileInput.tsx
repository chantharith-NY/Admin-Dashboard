import React, { useRef, useState } from 'react';

interface FileInputProps {
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    onChange: (files: FileList | null) => void;
    label?: string;
    placeholder?: string;
    className?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
    accept,
    multiple = false,
    disabled = false,
    onChange,
    label,
    placeholder = 'Choose file...',
    className = '',
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFileName(multiple ? `${files.length} files selected` : files[0]?.name || '');
            onChange(files);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={className}>
            {label && <label className="block mb-2 font-medium">{label}</label>}
            <button
                type="button"
                onClick={handleClick}
                disabled={disabled}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {fileName || placeholder}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default FileInput;