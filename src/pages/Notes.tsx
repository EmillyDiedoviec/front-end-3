import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, Box, Typography, IconButton, Fab } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import ModalInputs from '../components/ModalInput';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useState } from 'react';
import { deleteTask } from '../store/modules/UserLoggedSlice';
import NoteType from '../types/NoteType';
import ModalEdit from '../components/ModalEdit';
import AddIcon from '@mui/icons-material/Add';


const Notes: React.FC = () => {
    const [favorite, setFavorite] = useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openModalEdit, setOpenModalEdit] = React.useState(false);
    const listNotes = useAppSelector(state => state.userLogged.user.notes);
    const [noteEdit, setNoteEdit] = React.useState<NoteType>({} as NoteType);

    const dispatch = useAppDispatch();

    const listFavorites = listNotes.filter((item) => item.favorite === true);

    function page(){
        setFavorite(!favorite);
    }



    const handleClose = () => {
        setOpenAdd(false);
    };
    const addNotes = () => {
        setOpenAdd(false);
    };
    const openModalImput = () => {
        setOpenAdd(true);
    };

    const handleDelete = (item: NoteType) => {
        dispatch(deleteTask(item.id));
    };

    const handleEdit = (item: NoteType) => {
        setNoteEdit(item);
        setOpenModalEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };

    const addNotesEdit = () => {
        setOpenModalEdit(false);
    };

    return (
        <Grid container sx={{ width: '100%', height: '100vh' }}>
            <Box width="100%" paddingTop="1rem" bgcolor="#65864f">
                <Grid container width="100%">
                    {listNotes.map(note => (
                        <Grid item xs={12} sm={6} md={3} key={note?.id} display="flex" justifyContent='center' flexDirection="row">
                            <Card
                                sx={{
                                    width: '300px',
                                    height: '150px',
                                    marginY: '25px',
                                    marginX: '15px'
                                }}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {note.note}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {note.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: 'flex' }}>
                                    <IconButton aria-label="favorite">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton 
                                        aria-label="edit"
                                        onClick={() => handleEdit(note)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        aria-label="delete"
                                        onClick={() => handleDelete(note)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Box>

            <Fab
                onClick={openModalImput}
                color="info"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    bgcolor: '#222',
                    width: '80px',
                    height: '80px',
                    boxShadow:
                    '5px 10px 20px rgba(0, 0, 0, 0.301), 5px 10px 20px rgba(0, 0, 0, 0.301);'
                }}
            >
                { <AddIcon fontSize='large' /> }
            </Fab>
            {openModalEdit && (
                <ModalEdit
                    openModal={openModalEdit}
                    actionConfirm={addNotesEdit}
                    actionCancel={handleCloseEdit}
                    note={noteEdit}
                />
            )}
                    
            <ModalInputs
                openModal={openAdd}
                actionConfirm={addNotes}
                actionCancel={handleClose}
            />
        </Grid>
    );
};

export default Notes;