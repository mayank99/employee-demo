import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import Employee from './routes/employee';
import Employees from './routes/employees';

const globalStyles = css`
  body {
    display: grid;
    place-content: center;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(0deg 0% 25% / 0.5);
  }
`;

export default function App() {
  const app = useRoutes([
    {
      path: '/',
      element: <Employees />,
      children: [{ path: '/employee/:employeeId', element: <Employee /> }],
    },
  ]);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <CssBaseline enableColorScheme />
      {app}
    </ThemeProvider>
  );
}
