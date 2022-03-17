import { Button, Grid } from '@material-ui/core';

export interface FileHeaderProps {
    file: File;
    onDelete: (file: File) => void;
}


export const FileHeader = ({ file }: FileHeaderProps) => {
    return (
        <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item> {file.name}</Grid>
            <Grid item> <Button size="small">Delete</Button></Grid>
        </Grid>
    )
}