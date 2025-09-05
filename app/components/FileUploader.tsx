import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full rounded-2xl border-2 border-[#FF6767] p-4 bg-white hover:bg-[#FF6767]/10 transition cursor-pointer">
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="space-y-4">
                    {file ? (
                        <div className="flex items-center justify-between bg-[#FF6767]/10 rounded-xl p-3">
                            <div className="flex items-center gap-3">
                                <img src="/images/pdf.png" alt="pdf" className="w-10 h-10" />
                                <div>
                                    <p className="text-sm font-medium text-[#FF6767] truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-[#FF6767]/80">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="p-2 rounded-full bg-[#FF6767] hover:bg-[#FF4C4C] transition"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onFileSelect?.(null)
                                }}
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center text-[#FF6767]/80">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className="w-16 h-16" />
                            </div>
                            <p className="text-lg">
                                <span className="font-semibold text-[#FF6767]">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-sm text-[#FF6767]/60">PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader
