import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchEventList, fetchEventListFilter, fetchEventTitle } from '../eventThunk';
import { selectEventTitle, selectEventTitleLoading } from '../eventSlice';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TitleEventsType, Filter, FilterMutation } from '../../../types';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Divider from '@mui/material/Divider';
import { selectHashtagList } from '../../Hashtag/hashtagSlice';
import { fetchHashtagList } from '../../Hashtag/hashtagThunk';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FilterCard = () => {
  const filter = localStorage.getItem('filter' || null);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Filter>({
    titleEvent: [],
    titleHashtag: '',
    dateTimeEvent: '',
  });
  const hashtags = useAppSelector(selectHashtagList);
  const titleEvent = useAppSelector(selectEventTitle);
  const loadingEventTitle = useAppSelector(selectEventTitleLoading);

  useEffect(() => {
    dispatch(fetchEventTitle());
    dispatch(fetchHashtagList());
  }, [dispatch]);

  const titleEventOnChange = (event: React.ChangeEvent<any>, newValue: TitleEventsType[]) => {
    setValue((prev) => ({ ...prev, titleEvent: newValue }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const obj: FilterMutation = {
      title: value.titleEvent.length > 0 ? { $in: value.titleEvent.map((item) => item.title) } : null,
      hashtag: value.titleHashtag.length > 0 ? value.titleHashtag : null,
      time: value.dateTimeEvent.length > 0 ? value.dateTimeEvent : null,
    };

    const keys = Object.keys(obj) as (keyof FilterMutation)[];

    keys.forEach((item) => {
      if (obj[item] === null) {
        delete obj[item];
      }
    });

    await dispatch(fetchEventListFilter(obj));
  };

  const resetFilter = async () => {
    localStorage.removeItem('filter');
    await dispatch(fetchEventList({ page: 0, perPage: 0 }));
    setValue({
      titleEvent: [],
      titleHashtag: '',
      dateTimeEvent: '',
    });
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ width: '300px' }}>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <Typography component="p" variant="h5">
            Искать по названию
          </Typography>
          <Divider sx={{ my: 2 }} />
          {!loadingEventTitle ? (
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={titleEvent}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option._id}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.title}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Искать по названию" placeholder="Favorites" />}
              onChange={titleEventOnChange}
              value={value.titleEvent}
            />
          ) : (
            <Skeleton variant="rounded" width="100%" height={60} />
          )}
        </Grid>

        <Grid xs={12} item>
          <Typography component="p" variant="h5">
            Искать по хэштегам
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            value={value.titleHashtag}
            onChange={onChange}
            fullWidth
            name="titleHashtag"
            select
            label="Выбрать хэштег"
          >
            <MenuItem value="" disabled>
              Выберите хэштег:
            </MenuItem>
            {hashtags.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid xs={12} item>
          <Typography component="p" variant="h5">
            Искать по дате
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            name="dateTimeEvent"
            id="datetime-local"
            label="Выбрать дату и время"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={value.dateTimeEvent}
            onChange={onChange}
          />
        </Grid>

        <Grid xs={12} item>
          <Button type="submit" variant="outlined">
            Фильтровать
          </Button>
          {filter && (
            <IconButton onClick={resetFilter} aria-label="delete">
              <RestartAltIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterCard;
