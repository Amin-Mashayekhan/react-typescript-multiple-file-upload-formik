import { FileError, FileRejection, useDropzone } from "react-dropzone"
import React, { useCallback, useEffect, useState } from "react"

import { Grid } from "@material-ui/core";
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress";
import { UploadError } from './UploadError';
import { string } from "yup";
import { useField } from "formik";

export interface UploadableFile {
    file: File;
    errors: FileError[];
    url?: string;
}

export const MultipleFileUploadField = ({ name }: { name: string }) => {
    const [_, __, helpers] = useField(name);
    const [files, setFiles] = useState<UploadableFile[]>([]);
    const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
        const mappedAcc = accFiles.map(file => ({ file, errors: [] }));
        setFiles(curr => [...curr, ...mappedAcc, ...rejFiles]);
    }, [])


    useEffect(() => {
        helpers.setValue(files);
        helpers.setTouched(true);
    }, [files]);


    const onDelete = (file: File) => {
        setFiles(curr => {
            return curr.filter(fileWrapper => fileWrapper.file !== file);
        })
    }


    const onUpload = (file: File, url: string) => {
        setFiles(curr => {
            return curr.map(fileWrapper => {
                if (fileWrapper.file === file) {
                    return { ...fileWrapper, url };
                }
                return fileWrapper;
            });
        })
    }


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ['video/*', 'image/*', '.pdf'],
        maxSize: 1024 * 1024 // 1MB
    });

    return (
        <React.Fragment>
            <Grid item>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files.</p>
                </div>
            </Grid>

            {JSON.stringify(files)}

            {files.map((fileWrapper, idx) => (
                <SingleFileUploadWithProgress
                    onDelete={onDelete}
                    onUpload={onUpload}
                    key={idx}
                    file={fileWrapper.file}

                />
            ))}

            {files.map((fileWrapper, idx) => {
                <Grid item>
                    {
                        fileWrapper.errors.length ? (
                            <UploadError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete} />
                        ) : (
                            <SingleFileUploadWithProgress
                                onDelete={onDelete}
                                onUpload={onUpload}
                                key={idx}
                                file={fileWrapper.file}

                            />
                        )
                    }
                </Grid>
            })}
        </React.Fragment>
    )
}