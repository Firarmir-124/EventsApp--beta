import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import SimpleMdeReact from 'react-simplemde-editor';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FileInput from '../../../../components/FileInput/FileInput';

const FormEvent = () => {
  const [speaker, setSpeaker] = useState([{ name: '' }]);
  const [time, setTime] = React.useState<Dayjs | null>(null);
  const [eventType, setEventType] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [fileDataURL, setFileDataURL] = useState<string | null>(null);

  useEffect(() => {
    if (!eventType.image) return;
    const reader = new FileReader();
    reader.readAsDataURL(eventType.image);
    reader.onload = () => {
      setFileDataURL(reader.result as string);
    };
  }, [eventType.image]);

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
      time: dayjs(time).format('MMMM D, YYYY h:mm A'),
      speaker,
    };

    console.log(obj);
  };

  const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setEventType((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
  };

  return (
    <Box component="form" sx={{ mt: 3, width: '50%' }} onSubmit={onFormSubmit}>
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
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleMdeReact value={eventType.description} onChange={onChangeDescription} />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              value={time}
              onChange={(newValue) => setTime(newValue)}
              defaultValue={dayjs('2022-04-17T15:30')}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <IconButton onClick={addIngredient} aria-label="delete">
            <AddCircleIcon color="warning" sx={{ fontSize: '40px' }} />
            <Typography sx={{ ml: '10px' }} component="p">
              Добавить спикера
            </Typography>
          </IconButton>
          <Paper sx={{ p: 1 }} elevation={3}>
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
        <Grid item xs={12}>
          <FileInput onChange={fileInputChange} name="image" label="Выбрать шаблон" />

          <Paper sx={{ p: 1 }} elevation={3}>
            <img width="500px" height="auto" src={fileDataURL || ''} alt="" />
          </Paper>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Создать
      </Button>
    </Box>
  );
};

export default FormEvent;
