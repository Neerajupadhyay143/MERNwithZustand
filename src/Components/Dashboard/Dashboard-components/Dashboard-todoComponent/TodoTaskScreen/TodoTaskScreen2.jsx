import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    useMediaQuery,
    Card,
    Typography,
    CardContent,
    CardActionArea,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';

import { OpenTodo, TodoStore, ToggleTheme } from '../../../../../store/useStore';
import { addTodoToFirebase, deleteTodosFromFirebase, fetchTodosFromFirebase } from '../../../../../Firebase-auth/firebase-todoConfig';
import { v4 as uuid } from 'uuid';
import { getThemeComponents } from '../../../../Global-Theme/getThemeComponents.js';
import "../TodoHomepage/TodoHomepage.css";

function TodoTaskScreen2() {
    const [inputTitle, setInputTitle] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const { todos, setTodo, addTodo, RemoveTodo, UpdateTodo, editingTodo, setEditingTodo } = TodoStore();
    const { themes } = ToggleTheme();
    const { Todois, openTodo, closeTodo } = OpenTodo();


    const muiTheme = useMuiTheme();
    const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

    const { base, btn, input: inputStyle } = getThemeComponents(themes);

    useEffect(() => {
        (async () => {
            const data = await fetchTodosFromFirebase();
            setTodo(data);
        })();
    }, [setTodo]);

    useEffect(() => {
        if (editingTodo) {
            setInputTitle(editingTodo.title);
            setInputDesc(editingTodo.description);
            openTodo();
        }
    }, [editingTodo]);

    console.log("check  dialgo state :", Todois);


    const handleAdd = async () => {
        if (!inputTitle.trim()) return;

        if (editingTodo) {
            // UPDATE MODE
            UpdateTodo(editingTodo.id, {
                title: inputTitle,
                description: inputDesc,
            });

            setEditingTodo(null); // clear editing state
        } else {
            // ADD MODE
            const todo = {
                id: uuid(),
                title: inputTitle,
                description: inputDesc,
                completed: false,
            };

            const firebaseTodo = await addTodoToFirebase(todo);
            addTodo(firebaseTodo);
        }

        setInputTitle('');
        setInputDesc('');
        closeTodo();
    };


    const handleDelete = async (id) => {
        await deleteTodosFromFirebase(id);
        return RemoveTodo(id);

    }

    const cutOut = (text) => {
        if (text.length > 17) {
            return text.slice(0, 17) + "...";
        }
        return text;
    };

    return (
        <div
            className="d-flex flex-column justify-content-between px-4 w-100 "
            style={{ backgroundColor: base.mainBackground }}
        >
            {/* Header */}
            <div className="d-flex flex-row justify-content-between align-items-center py-4 mb-4  ">
                <h2 style={{ color: base.txtColor }}>To-Do List</h2>
                <div className="d-flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        className="todo-buttons"
                        onClick={openTodo}
                    >
                        <AddIcon
                            sx={{
                                fontSize: 45,
                                mt: '-10px',
                                color: btn.txtColor,
                                background: btn.backgroundcolor,
                                borderRadius: '50px',
                                padding: '5px',
                                boxShadow: btn.boxShadow,
                            }}
                        />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        className="todo-buttons"
                    >
                        <DoneIcon
                            sx={{
                                fontSize: 45,
                                mt: '-10px',
                                color: btn.txtColor,
                                background: btn.backgroundcolor,
                                borderRadius: '50px',
                                padding: '5px',
                                boxShadow: btn.boxShadow,
                            }}
                        />
                    </motion.button>
                </div>
            </div>

            {/* No Todo Message */}
            {
                todos.length === 0 && (
                    <div
                        className="d-flex justify-content-center align-items-center flex-grow-1"
                        style={{ minHeight: 'calc(100vh - 300px)' }}
                    >
                        <h2 style={{ color: base.txtColor }}>No ToDo added</h2>
                    </div>
                )
            }


            <motion.div layout className='overflow-auto row ' style={{ height: todos.length === 0 ? "0" : "650px", scrollbarWidth: 'none' }}>
                <div className='col-md-5 col-sm-6 col-lg-3 '>
                    <AnimatePresence mode="popLayout">
                        {todos.map((val, index) => (
                            <motion.div
                                key={val.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className='w-100'
                            >
                                <Card
                                    sx={{
                                        boxShadow: base.boxShadow,
                                        background: base.backgroundcolor,
                                        color: btn.txtColor,
                                        marginBottom: '1rem',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div>
                                            <Typography sx={{ color: btn.txtColor }} variant="h5" component="div">
                                                {cutOut(val.title)}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: btn.subTxt }}>
                                                {cutOut(val.description)}
                                            </Typography>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <EditIcon
                                                sx={{
                                                    color: btn.txtColor,
                                                    cursor: 'pointer',
                                                    '&:hover': { color: '#00bcd4' },
                                                }}
                                                onClick={() => { setEditingTodo(val); openTodo() }}
                                            />
                                            <DeleteIcon
                                                sx={{
                                                    color: btn.txtColor,
                                                    cursor: 'pointer',
                                                    '&:hover': { color: '#f44336' },
                                                }}
                                                onClick={() => handleDelete(val.id)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>



            {/* Add Todo Dialog */}
            <Dialog
                open={Todois}
                fullScreen={fullScreen}
                PaperProps={{
                    style: {
                        borderRadius: '17px',
                        backgroundColor: base.mainBackground,
                        padding: '20px',
                        boxShadow: themes === 'Dark'
                            ? '0 4px 20px rgba(255, 255, 255, 0.1)' // light white shadow for dark bg
                            : '0 4px 20px rgba(0, 0, 0, 0.2)'     // darker shadow for light bg
                    },
                }}
            >
                <DialogTitle style={{ color: base.txtColor }}>
                    <span style={{ marginRight: '10px' }} onClick={closeTodo}>
                        <ArrowBackIosIcon />
                    </span> Add New Task
                </DialogTitle>

                <DialogContent>
                    <TextField
                        label="Task Title"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        sx={{
                            input: { color: base.txtColor },
                            label: { color: base.txtColor },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: base.txtColor,
                                },
                                '&:hover fieldset': {
                                    borderColor: base.txtColor,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: btn.backgroundcolor,
                                },
                            },
                        }}
                    />

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="dense"
                        value={inputDesc}
                        onChange={(e) => setInputDesc(e.target.value)}
                        sx={{
                            textarea: { color: base.txtColor },
                            label: { color: base.txtColor },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: base.txtColor,
                                },
                                '&:hover fieldset': {
                                    borderColor: btn.backgroundcolor,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: btn.backgroundcolor
                                },
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleAdd}
                        sx={{
                            mt: 2,
                            backgroundColor: btn.backgroundcolor,
                            color: btn.txtColor,
                            boxShadow: themes === 'Dark'
                                ? '0 4px 10px rgba(255,255,255,0.2)'
                                : '0 4px 10px rgba(0,0,0,0.3)',
                            '&:hover': {
                                backgroundColor: btn.backgroundcolor,
                            },
                        }}
                    >
                        Add Task
                    </Button>
                </DialogContent>
            </Dialog>

        </div >
    );
}

export default TodoTaskScreen2;
