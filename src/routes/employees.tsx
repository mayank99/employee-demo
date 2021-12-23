import * as React from 'react';
import { DataGrid, GridInputSelectionModel } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import { IconButton, SxProps, TextField, Typography, useMediaQuery } from '@mui/material';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { EmployeeData, getEmployees } from '../api';
import SvgSearch from '@mui/icons-material/Search';
import SvgClear from '@mui/icons-material/Clear';

const BASIC_COLUMNS = ['name', 'role'] as const;
const ALL_COLUMNS = [...BASIC_COLUMNS, 'department', 'city', 'country'] as const;

export default function Employees() {
  const [data, setData] = React.useState<EmployeeData[]>([]); // full data
  const [rows, setRows] = React.useState<EmployeeData[]>([]); // visible rows (filtered)

  const params = useParams();

  // Load fresh data on every navigation
  React.useEffect(() => {
    (async () => {
      const _data = await getEmployees();
      setData(_data);
      setRows(_data);
    })();
  }, [params]);

  const [searchValue, setSearchValue] = React.useState('');
  const [selectionModel, setSelectionModel] = React.useState<GridInputSelectionModel>([]);

  const navigate = useNavigate();

  const isMobile = useMediaQuery(`(max-width: 550px)`);

  const doSearch = (searchTerm: string) => {
    setSearchValue(searchTerm);
    const filteredRows = data.filter((row) =>
      Object.entries(row).some(
        ([field, value]) =>
          ALL_COLUMNS.find((column) => column === field) &&
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setRows(filteredRows);
  };

  const columns = React.useMemo(
    () =>
      (isMobile ? BASIC_COLUMNS : ALL_COLUMNS).map((field) => ({
        field: field,
        headerName: `${field[0].toUpperCase()}${field.substring(1)}`,
        flex: 1,
      })),
    [isMobile]
  );

  return (
    <PageWrapper>
      <Header>
        <Typography variant='h5' component='div' sx={{ flex: 1 }}>
          Employees
        </Typography>
        <TextField
          variant='outlined'
          size='small'
          placeholder='Search…'
          value={searchValue}
          onChange={({ target: { value } }) => doSearch(value)}
          InputProps={{
            startAdornment: <SvgSearch sx={{ marginRight: '8px' }} fontSize='small' />,
            endAdornment: (
              <IconButton
                aria-label='Clear'
                size='small'
                style={{ visibility: searchValue ? 'visible' : 'hidden' }}
                onClick={() => doSearch('')}
              >
                <SvgClear fontSize='small' />
              </IconButton>
            ),
          }}
          sx={{ flex: 1, minWidth: 300, maxWidth: 500 }}
        />
      </Header>
      <DataGridWrapper>
        <DataGrid
          columns={columns}
          rows={rows}
          sx={tableStyles}
          showColumnRightBorder={false}
          selectionModel={selectionModel}
          onSelectionModelChange={(selection) => {
            setSelectionModel(selection);
            if (selection.length > 0) {
              navigate(`employee/${selection[0]}`);
            }
          }}
        />
      </DataGridWrapper>
      <Outlet />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  padding: 16px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 16px;
  justify-content: center;
`;

const Header = styled.div`
  width: min(90vw, 1500px);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: baseline;
  justify-content: space-between;
`;

const DataGridWrapper = styled.div`
  width: min(90vw, 1500px);
`;

const tableStyles: SxProps = {
  '& .MuiDataGrid-virtualScroller': {
    overflow: 'overlay',
  },
  '& .MuiDataGrid-cell': {
    cursor: 'pointer',

    '&:focus:not(:focus-visible)': {
      outline: 'none',
    },
  },
};
