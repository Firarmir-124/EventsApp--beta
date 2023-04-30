import React, { useEffect, useState } from 'react';
import { Datepicker, DatepickerEvent } from '@meinefinsternis/react-horizontal-date-picker';
import { useAppDispatch } from '../../../app/hooks';
import { ru } from 'date-fns/esm/locale';
import { addTimeToFilterObj } from '../eventSlice';

const FilterUser = () => {
  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;
  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });
  const dispatch = useAppDispatch();

  const handleChange = (d: DatepickerEvent) => {
    const [startValue, endValue, rangeDates] = d;
    setDate((prev) => ({ ...prev, endValue, startValue, rangeDates }));
  };

  useEffect(() => {
    const newAry: Date[] = [];

    if (date.startValue !== null) {
      newAry.push(date.startValue);
    }

    if (date.rangeDates !== null) {
      newAry.pop();
      newAry.push(...date.rangeDates);
    }

    const obj = {
      date: {
        $in: newAry.map((item) => `${item.getDate().toString()} ${item.getMonth().toString()}`),
      },
    };

    if (obj.date.$in.length > 0) {
      dispatch(addTimeToFilterObj(obj.date));
    }
  }, [date, dispatch]);

  return (
    <>
      <Datepicker onChange={handleChange} locale={ru} startValue={date.startValue} endValue={date.endValue} />
    </>
  );
};

export default FilterUser;
