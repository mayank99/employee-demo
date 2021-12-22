import { DataGrid, GridInputSelectionModel } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import { SxProps } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import data from '../../mock-data.json';

export default function Employees() {
  const [selectionModel, setSelectionModel] = useState<GridInputSelectionModel>([]);
  const navigate = useNavigate();

  const columns = Object.keys(data[0])
    .filter((field) => ['name', 'role', 'department', 'city', 'country'].includes(field))
    .map((field) => ({
      field: field,
      headerName: `${field[0].toUpperCase()}${field.substring(1)}`,
      flex: 1,
    }));

  return (
    <PageWrapper>
      <div>Employees</div>
      <DataGridWrapper>
        <DataGrid
          columns={columns}
          rows={data}
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
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  justify-content: center;
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
