import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, Box, Typography, IconButton, Fab } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import ModalInputs from '../components/ModalInput';
import { useAppSelector } from '../store/hooks';
import { SelectAllNotes } from '../store/modules/NoteSlice';

const Notes: React.FC = () => {
    const [openAdd, setOpenAdd] = React.useState(false);
    const listNotes = useAppSelector(SelectAllNotes);

    const handleClose = () => {
        setOpenAdd(false);
    };
    const addNotes = () => {
        console.log('funcionando');
        setOpenAdd(false);
    };
    const openModalImput = () => {
        setOpenAdd(true);
    };

    return (
        <Grid container sx={{ width: '100%', height: '100vh' }} bgcolor="#65864f">
            <Box width="100%" height="100%" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>
                        {listNotes.map(Notes => (
                            <Grid item key={Notes?.id}>
                                <Card
                                    sx={{
                                        maxWidth: 300,
                                        boxShadow:
                                            '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2);'
                                    }}
                                >
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {Notes.note}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            {Notes.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex' }}>
                                        <IconButton aria-label="favorite">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Box>

            <Fab
                onClick={openModalImput}
                color="info"
                aria-label="add"
                sx={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '20px',
                    bgcolor: '#222',
                }}
            >
                {/* <AddIcon /> */}
            </Fab>
            <ModalInputs
                title="Adicionar"
                description="Escreva o recado aqui bçabçla"
                openModal={openAdd}
                actionConfirm={addNotes}
                actionCancel={handleClose}
            />
        </Grid>
    );
};

export default Notes;