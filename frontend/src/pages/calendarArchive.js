import * as React from 'react';
import { useEffect } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createTheme, ThemeProvider } from '@mui/material';


import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";

const theme = createTheme({
  palette: {
    primary: { main: '#B56576' },
    secondary: { main: '#B56576' }, // Sekundärfarbe
    error: { main: '#B56576' }, // Fehlerfarbe
    warning: { main: '#B56576' }, // Warnungsfarbe
    info: { main: '#B56576' }, // Infofarbe
    success: { main: '#B56576' }, // Erfolgsfarbe
    background: { default: '#B56576' }, // Hintergrundfarbe
    text: { primary: '#355070' }, // Textfarbe
    textInContainer: { primary: '#000000' }, // Textfarbe
  },
  typography: {
    fontFamily: 'var(--fontFamily)', // Schriftfamilie
    fontSize: 20, // Schriftgröße
    fontWeightLight: 300, // Leichtes Schriftgewicht
    fontWeightRegular: 400, // Normales Schriftgewicht
    fontWeightMedium: 500, // Mittleres Schriftgewicht
    fontWeightBold: 700, // Fettes Schriftgewicht
  },
  spacing: 8, // Basisabstand
});

export default function CalendarArchive() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

  return (
    <div>
    <Title>
    Calendar
    <br />
    Archive
  </Title>

    <MainContainer>

    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar fixedWeekNumber={5}
      style={{
        backgroundColor: 'var(--goodThingContainer)',
      borderRadius: '15px',
      padding: '10px',
      margin: '10px',
      width: '100%',
      height: "auto",
      

      }}
      />
    </LocalizationProvider>
    </ThemeProvider>
  

        </MainContainer>
        </div>
);
}