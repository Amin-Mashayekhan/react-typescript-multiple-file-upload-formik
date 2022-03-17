import { LinearProgress, Typography, createStyles, withStyles } from "@material-ui/core";

import { FileError } from 'react-dropzone';
import { FileHeader } from "./FileHeader"
import React from "react";

export interface UploadErrorProps{
    file: File;
    onDelete: (file: File) => void;
    errors: FileError[];
}

const ErrorLinearProgress = withStyles((theme) =>{
    createStyles({
        bar: {
            backgroundColor: theme.palette.error.main,
        }
    })
})(LinearProgress);
 
export const UploadError = ({file, onDelete, errors}: UploadErrorProps)  => {
    return (
        <React.Fragment>
            <FileHeader file={file} onDelete={onDelete} />
            <ErrorLinearProgress variant="determinate" value={100} />
            {errors.map(error => (
                <Typography color="error" ><div>{error.message} {error.code}</div></Typography>
            ))}
        </React.Fragment>
    )
}