import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import SimpleMdeReact from 'react-simplemde-editor';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FileInput from '../../../components/FileInput/FileInput';
import { EventMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchHashtagList } from '../../Hashtag/hashtagThunk';
import { selectHashtagList, selectHashtagListLoading } from '../../Hashtag/hashtagSlice';
import Divider from '@mui/material/Divider';
import { selectEventError } from '../eventSlice';

interface Props {
  onSubmit: (event: EventMutation) => void;
}

const FormEvent: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const [speaker, setSpeaker] = useState([{ name: '' }]);
  const [eventType, setEventType] = useState({
    title: '',
    description: '',
    image: null,
    hashtag: '',
    time: '',
  });
  const hashtags = useAppSelector(selectHashtagList);
  const loadingHashtag = useAppSelector(selectHashtagListLoading);
  const error = useAppSelector(selectEventError);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  const addIngredient = () => {
    setSpeaker((prev) => [...prev, { name: '' }]);
  };

  const removeIngredient = (index: number) => {
    setSpeaker((prev) => prev.filter((_, i) => i !== index));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEventType((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeDescription = useCallback((value: string) => {
    setEventType((prev) => ({ ...prev, description: value }));
  }, []);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const obj = {
      ...eventType,
      speaker: JSON.stringify(speaker),
    };

    onSubmit(obj);
  };

  const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setEventType((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Box component="form" sx={{ mt: 3, width: '100%' }} onSubmit={onFormSubmit}>
      <Grid container sx={{ flexDirection: 'column' }} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Название мероприятие"
            name="title"
            type="text"
            autoComplete="current-password"
            fullWidth
            value={eventType.title}
            onChange={onChange}
            required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid item xs={12} display="flex">
          <SimpleMdeReact style={{ width: '100%' }} value={eventType.description} onChange={onChangeDescription} />
          <Paper sx={{ p: 1, width: '40%' }} elevation={3}>
            <IconButton onClick={addIngredient} aria-label="delete">
              <AddCircleIcon color="warning" sx={{ fontSize: '40px' }} />
              <Typography sx={{ ml: '10px' }} component="p">
                Добавить спикера
              </Typography>
            </IconButton>

            {speaker.length !== 0 ? (
              speaker.map((item, index) => (
                <Paper key={index} sx={{ p: 1, mb: 2 }} elevation={3}>
                  <TextField
                    name="name"
                    label="Имя спикера"
                    sx={{ mr: 1 }}
                    value={speaker[index].name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSpeaker((prevArr) => {
                        const result = [...prevArr];

                        result[index].name = e.target.value;
                        return result;
                      });
                    }}
                    required
                    error={Boolean(getFieldError('name'))}
                    helperText={getFieldError('name')}
                  />
                  <IconButton onClick={() => removeIngredient(index)} aria-label="delete">
                    <RemoveCircleIcon color="warning" sx={{ fontSize: '40px' }} />
                  </IconButton>
                </Paper>
              ))
            ) : (
              <Alert severity="info">Добавьте ингридиент !</Alert>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} display="flex" marginBottom="20px">
          <TextField
            name="time"
            value={eventType.time}
            onChange={onChange}
            id="datetime-local"
            label="Выбрать дату и время"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mr: '10px' }}
            required
            error={Boolean(getFieldError('time'))}
            helperText={getFieldError('time')}
          />

          <TextField
            name="hashtag"
            value={eventType.hashtag}
            onChange={onChange}
            select
            label="Выбрать хэштег"
            required
            sx={{ width: '200px', mr: '10px' }}
            error={Boolean(getFieldError('hashtag'))}
            helperText={getFieldError('hashtag')}
          >
            <MenuItem value="" disabled>
              Выберите хэштег:
            </MenuItem>
            {!loadingHashtag ? (
              hashtags.length !== 0 ? (
                hashtags.map((hashtag) => (
                  <MenuItem key={hashtag._id} value={hashtag._id}>
                    {hashtag.name}
                  </MenuItem>
                ))
              ) : (
                <Alert severity="info">Список пуст</Alert>
              )
            ) : (
              <CircularProgress />
            )}
          </TextField>

          <FileInput onChange={fileInputChange} name="image" label="Выбрать шаблон" />
        </Grid>
      </Grid>
      <Divider />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Создать
      </Button>
    </Box>
  );
};

export default FormEvent;
