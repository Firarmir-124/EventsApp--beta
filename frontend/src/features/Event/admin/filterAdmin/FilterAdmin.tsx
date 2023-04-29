import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Checkbox, Grid, MenuItem, Skeleton, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchEventList, fetchEventsAll } from '../../eventThunk';
import {
  closeDrawer,
  closeModal,
  resetFilterType,
  selectEventsAll,
  selectSettingsLocalLoading,
} from '../../eventSlice';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { selectHashtagList } from '../../../Hashtag/hashtagSlice';
import { fetchHashtagList } from '../../../Hashtag/hashtagThunk';
import { Filter, FilterMutation, Option } from '../../../../types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FilterAdmin = () => {
  const dispatch = useAppDispatch();
  const eventsAll = useAppSelector(selectEventsAll);
  const [value, setValue] = useState<Filter>({
    titleEvent: [],
    titleHashtag: '',
    dateTimeEvent: '',
  });
  const hashtags = useAppSelector(selectHashtagList);
  const eventsAllLoading = useAppSelector(selectSettingsLocalLoading);

  useEffect(() => {
    dispatch(fetchEventsAll());
    dispatch(fetchHashtagList());
  }, [dispatch]);

  const titleEventOnChange = (event: React.ChangeEvent<any>, newValue: Option[]) => {
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

    await dispatch(fetchEventList({ page: 0, perPage: 0, filter: JSON.stringify(obj) })).unwrap();
    dispatch(closeModal());
    dispatch(resetFilterType(true));
    dispatch(closeDrawer());
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ width: '300px' }}>
      <Grid spacing={3} container>
        <Grid xs={12} item>
          {!eventsAllLoading ? (
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={eventsAll}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterAdmin;
