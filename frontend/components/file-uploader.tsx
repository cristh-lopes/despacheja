"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FileUploaderProps = {
  onChange: (files: File[]) => void;
  value?: File[];
  maxFiles?: number;
  maxSize?: number; // bytes
};

export function FileUploader({
  onChange,
  value = [],
  maxFiles = 5,
  maxSize = 4 * 1024 * 1024,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const valid: File[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > maxSize) return;
      if (value.length + valid.length >= maxFiles) return;

      valid.push(file);
    });

    const newFiles = [...value, ...valid];
    onChange(newFiles);

    valid.forEach((f) => {
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 12;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
        }
        setProgress((prev) => ({ ...prev, [f.name]: p }));
      }, 250);
    });
  };

  return (
    <>
      {/* --- DROPZONE (mesmo visual do seu template) --- */}
      <div
        className="border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileSelect(e.dataTransfer.files);
        }}
      >
        <div className="mb-2 bg-muted rounded-full p-3">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">
          Arraste e solte seu documento aqui
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ou{" "}
          <span className="text-primary font-medium cursor-pointer">
            clique para navegar pelos arquivos
          </span>{" "}
          (max. 4MB)
        </p>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {/* --- LISTA (mesmo visual preservado) --- */}
      <div className={cn("space-y-3 mt-4", value.length > 0 ? "" : "hidden")}>
        {value.map((file) => {
          const src = URL.createObjectURL(file);
          const pct = progress[file.name] || 0;

          return (
            <div
              key={file.name}
              className="border border-border rounded-lg p-2 flex flex-col"
            >
              <div className="flex items-center gap-2">
                <div className="w-18 h-14 bg-muted rounded-sm overflow-hidden">
                  <Image
                    width={18}
                    height={14}
                    alt={file.name}
                    src={src}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 pr-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(file.size / 1024)} KB
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8"
                      onClick={() =>
                        onChange(value.filter((f) => f.name !== file.name))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden flex-1">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs">{Math.round(pct)}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
