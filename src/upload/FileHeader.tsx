import { Button, Grid } from '@material-ui/core';

export interface FileHeaderProps {
    file: File;
    onDelete: (file: File) => void;
}


export const FileHeader = ({ file, onDelete }: FileHeaderProps) => {
    return (
        <Grid container justify="space-between" alignItems='center'>
            <Grid item> {file.name}</Grid>
            <Grid item> 
                <Button size="small" onClick={() => onDelete(file)}>
                    Delete
                </Button>
            </Grid>
        </Grid>
    )
}