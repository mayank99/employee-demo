import styled from '@emotion/styled';
import { Avatar, Dialog, Divider, IconButton, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SvgClose from '@mui/icons-material/Close';
import SvgEdit from '@mui/icons-material/Edit';

import data from '../../mock-data.json';

type EmployeeData = typeof data[0];

export default function Employee({ operation = 'view' }: { operation?: 'view' | 'create' | 'edit' }) {
  const [employee, setEmployee] = useState<EmployeeData>();
  const { employeeId } = useParams();

  useEffect(() => {
    if (operation === 'view') {
      if (employeeId && parseInt(employeeId)) {
        setEmployee(data.find(({ id }) => id === parseInt(employeeId)));
      }
    }
  }, [operation]);

  const navigate = useNavigate();

  return (
    <Dialog open maxWidth={false} onClose={() => navigate('/')}>
      <ContentWrapper>
        <ActionIcons>
          {employee && (
            <IconButton onClick={() => navigate('edit')}>
              <SvgEdit />
            </IconButton>
          )}
          <IconButton onClick={() => navigate('/')}>
            <SvgClose />
          </IconButton>
        </ActionIcons>

        {employee && <EmployeeProfile employee={employee} />}
      </ContentWrapper>
    </Dialog>
  );
}

const EmployeeProfile = ({ employee }: { employee: EmployeeData }) => {
  return (
    <>
      <Avatar alt='' src={employee.avatar} sx={{ width: 64, height: 64, border: '1px solid' }} />
      <Typography variant='h5'>{employee.name}</Typography>

      <Divider variant='middle' sx={{ justifySelf: 'stretch' }} />

      {(
        ['role', 'department', 'dob', 'gender', 'email', 'phone', 'city', 'state', 'country', 'time_zone'] as const
      ).map((field) => {
        const label = field.split('_').join(' ');
        const value = employee[field];
        if (!value) {
          return null;
        }
        return (
          <KeyValuePair key={field}>
            <Typography variant='overline'>{label}</Typography>
            <Typography variant='body1'>{value}</Typography>
          </KeyValuePair>
        );
      })}
    </>
  );
};

const ContentWrapper = styled.div`
  width: min(600px, 80vw);
  display: grid;
  justify-items: center;
  gap: 16px;
  padding: 24px;
  position: relative;
`;

const KeyValuePair = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  gap: 12px;

  & > :first-child {
    width: 40%;
    text-align: end;
    line-height: normal;
  }
`;

const ActionIcons = styled.div`
  position: absolute;
  right: 0;
  margin: 8px;
  display: flex;
`;
