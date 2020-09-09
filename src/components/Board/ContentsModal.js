import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField, Typography } from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function ContentsModal({ isModalOpen, modalData, handleClose, handleModify }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [isModify, setIsModify] = useState(false);
    const [title, setTitle] = useState(modalData.title);
    const [contents, setContents] = useState(modalData.contents);

    const combineData = () => {
        return {
            title: title,
            contents: contents
        }
    }

    const read = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{modalData.title}</h2>
            <Typography variant="body1" gutterBottom>{modalData.contents}</Typography>
            <hr />
            <Typography variant="body2" gutterBottom>작성자 : {modalData.writer.accountId}</Typography>
            <Typography variant="body2" gutterBottom>작성일 : {modalData.createdAt}</Typography>
            <Button color="primary" onClick={() => setIsModify(true)}>Modify</Button>
            <Button onClick={() => {
                setIsModify(false);
                handleClose();
            }}>Close</Button>
        </div>
    );

    const modify = (
        <div style={modalStyle} className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={(event) => {
                event.preventDefault();
                var updatedData = combineData();
                handleModify(updatedData);
            }}>
                <TextField
                    id="outlined-full-width"
                    label="제목"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    defaultValue={modalData.title}
                    margin="normal"
                    onChange={event => setTitle(event.target.value)}
                    required
                />
                <TextField
                    id="outlined-multiline-static"
                    label="내용"
                    multiline
                    rows={4}
                    defaultValue={modalData.contents}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={event => setContents(event.target.value)}
                    required
                />
                <hr />
                <Typography variant="body2" gutterBottom>작성자 : {modalData.writer.accountId}</Typography>
                <Typography variant="body2" gutterBottom>작성일 : {modalData.createdAt}</Typography>
                <Button type="submit" color="primary" className={classes.submit}>Save</Button>
                <Button onClick={() => setIsModify(false)}>Back</Button>
                <Button onClick={() => {
                    setIsModify(false);
                    handleClose();
                }}>Close</Button>
            </form>
        </div>
    )


    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {isModify ? modify : read}
            </Modal>
        </div>
    );
}