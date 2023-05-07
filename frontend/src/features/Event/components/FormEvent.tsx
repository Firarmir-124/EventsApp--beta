import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
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
import { selectCreateEventLoading, selectEventError } from '../eventSlice';
import TitleIcon from '@mui/icons-material/Title';
import { green } from '@mui/material/colors';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';
import SettingsIcon from '@mui/icons-material/Settings';
import AddLocationIcon from '@mui/icons-material/AddLocation';

interface Props {
  onSubmit: (event: EventMutation) => void;
  event?: EventMutation;
}

const FormEvent: React.FC<Props> = ({ onSubmit, event }) => {
  const dispatch = useAppDispatch();
  const [speaker, setSpeaker] = useState(
    event
      ? event.speaker.map((item) => {
          return { name: item.name };
        })
      : [{ name: '' }],
  );
  const [eventType, setEventType] = useState(
    event || {
      title: '',
      description: '',
      image: null,
      hashtag: '',
      time: '',
      speaker,
      address: '',
    },
  );
  const hashtags = useAppSelector(selectHashtagList);
  const loadingHashtag = useAppSelector(selectHashtagListLoading);
  const error = useAppSelector(selectEventError);
  const createLoading = useAppSelector(selectCreateEventLoading);

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

    const obj: EventMutation = {
      ...eventType,
      speaker: JSON.stringify([...speaker]) as never,
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

  const options = useMemo(() => {
    return {
      spellChecker: false,
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autoSave: {
        enabled: true,
        delay: 1000,
      },
    };
  }, []);

  return (
    <Box component="form" sx={{ mt: 3, width: '100%' }} onSubmit={onFormSubmit}>
      <Grid container sx={{ flexDirection: 'column' }} spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
            <Avatar sx={{ bgcolor: green[500], mr: 3, mb: 'auto' }}>
              <TitleIcon />
            </Avatar>
            <TextField
              label="Название мероприятие"
              name="title"
              type="text"
              autoComplete="current-password"
              fullWidth
              variant="standard"
              value={eventType.title}
              onChange={onChange}
              required
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Avatar sx={{ bgcolor: green[500], mr: 3, mb: 'auto' }}>
              <SubtitlesIcon />
            </Avatar>
            <SimpleMdeReact
              options={options}
              style={{ width: '100%' }}
              value={eventType.description}
              onChange={onChangeDescription}
            />
          </Box>
        </Grid>
        <Grid item xs={12} display="flex">
          <Avatar sx={{ bgcolor: green[500], mr: 3, mb: 'auto' }}>
            <AddLocationIcon />
          </Avatar>
          <TextField
            label="Адресс мероприятие"
            name="address"
            type="text"
            autoComplete="current-password"
            fullWidth
            value={eventType.address}
            onChange={onChange}
            required
            error={Boolean(getFieldError('address'))}
            helperText={getFieldError('address')}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
            <Avatar sx={{ bgcolor: green[500], mr: 3, mb: 'auto' }}>
              <SpeakerGroupIcon />
            </Avatar>
            <Paper sx={{ p: 1 }} elevation={3}>
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
                <Alert severity="info">Добавьте организаторов !</Alert>
              )}
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} display="flex" marginBottom="20px">
          <Avatar sx={{ bgcolor: green[500], mr: 3, mb: 'auto' }}>
            <SettingsIcon />
          </Avatar>
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
      <Button disabled={createLoading} type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        {!createLoading ? 'Создать' : <CircularProgress />}
      </Button>
    </Box>
  );
};

export default FormEvent;
