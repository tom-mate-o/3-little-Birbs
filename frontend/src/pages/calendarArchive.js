import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";

export default function CalendarArchive() {
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

  return (
    <div>
    <Title>
    Calendar
    <br />
    Archive
  </Title>

    <MainContainer>


    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6}
      style={{
        backgroundColor: 'var(--goodThingContainer)',
      borderRadius: '15px',
      padding: '10px',
      margin: '10px',
      width: '100%',
      height: "auto",
      fontFamily: "var(--fontFamily)",

      }}
      />
    </LocalizationProvider>
  

        </MainContainer>
        </div>
);
}