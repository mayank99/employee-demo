import * as React from 'react';
import styled from '@emotion/styled';
import invariant from 'tiny-invariant';
import { Avatar, Dialog, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, deleteEmployee, EmployeeData, getEmployee, updateEmployee } from '../api';
import SvgClose from '@mui/icons-material/Close';
import SvgEdit from '@mui/icons-material/Edit';
import SvgSave from '@mui/icons-material/Save';
import SvgDelete from '@mui/icons-material/Delete';

const PROFILE_FIELDS = ['role', 'department', 'dob', 'gender', 'email', 'phone', 'city', 'state', 'country'] as const;
const FORM_FIELDS = ['name', 'avatar', ...PROFILE_FIELDS] as const;

const EmployeeContext = React.createContext<
  | {
      employee: EmployeeData;
      setEmployee: React.Dispatch<React.SetStateAction<EmployeeData>>;
    }
  | undefined
>(undefined);

export default function Employee({ operation = 'view' }: { operation?: 'view' | 'create' | 'edit' }) {
  const { employeeId } = useParams();
  const [employee, setEmployee] = React.useState<EmployeeData>({});

  React.useEffect(() => {
    if (operation === 'view' || operation === 'edit') {
      (async () => {
        if (employeeId && parseInt(employeeId)) {
          const _employee = await getEmployee(parseInt(employeeId));
          _employee && setEmployee(_employee);
        }
      })();
    }
  }, [operation, employeeId]);

  const navigate = useNavigate();

  return (
    <Dialog open maxWidth={false} onClose={() => navigate('/')}>
      <ContentWrapper>
        <ActionIcons>
          {operation === 'view' && (
            <IconButton aria-label='Edit' onClick={() => navigate('edit')}>
              <SvgEdit />
            </IconButton>
          )}
          {operation === 'view' && (
            <IconButton
              aria-label='Delete'
              onClick={async () => {
                invariant(employee.id, 'Employee ID is undefined');
                await deleteEmployee(employee.id);
                navigate('/');
              }}
            >
              <SvgDelete />
            </IconButton>
          )}
          {operation !== 'view' && (
            <IconButton
              aria-label='Save'
              disabled={!employee?.name}
              onClick={async () => {
                if (employee.id !== undefined) {
                  await updateEmployee(employee.id, employee);
                } else {
                  await addEmployee(employee);
                }
                navigate('/');
              }}
            >
              <SvgSave />
            </IconButton>
          )}
          <IconButton aria-label='Close' onClick={() => navigate('/')}>
            <SvgClose />
          </IconButton>
        </ActionIcons>

        <EmployeeContext.Provider value={{ employee, setEmployee }}>
          {operation === 'view' ? <EmployeeProfile /> : <EmployeeForm />}
        </EmployeeContext.Provider>
      </ContentWrapper>
    </Dialog>
  );
}

const EmployeeProfile = () => {
  const context = React.useContext(EmployeeContext);
  invariant(context, 'EmployeeContext not found');
  const { employee } = context;

  return (
    <>
      <Avatar alt='' src={employee?.avatar} sx={{ width: 64, height: 64, border: '1px solid' }} />
      <Typography variant='h5'>{employee?.name}</Typography>

      <Divider variant='middle' sx={{ justifySelf: 'stretch' }} />

      {PROFILE_FIELDS.map((field) => {
        const value = employee?.[field];
        if (!value) {
          return null;
        }
        return (
          <KeyValuePair key={field}>
            <Typography variant='overline' component='div'>
              {field}
            </Typography>
            <Typography variant='body1' component='div'>
              {value}
            </Typography>
          </KeyValuePair>
        );
      })}
    </>
  );
};

const EmployeeForm = () => {
  const context = React.useContext(EmployeeContext);
  invariant(context, 'EmployeeContext not found');
  const { employee, setEmployee } = context;

  return (
    <>
      {FORM_FIELDS.map((field) => (
        <KeyValuePair key={field}>
          <Typography variant='overline' component='label' htmlFor={field}>
            {field}
          </Typography>
          <TextField
            id={field}
            name={field}
            size='small'
            variant='standard'
            sx={{ width: '40%' }}
            required={['name', 'role', 'department', 'city', 'country'].includes(field)}
            value={employee?.[field] ?? ''}
            onChange={({ target: { value } }) => {
              setEmployee((old) => ({ ...old, [field]: value }));
            }}
          />
        </KeyValuePair>
      ))}
    </>
  );
};

const ContentWrapper = styled.div`
  width: min(600px, 80vw);
  min-height: 550px;
  overflow-y: auto;
  overflow-y: overlay;
  display: grid;
  justify-items: center;
  align-content: start;
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
    width: 35%;
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
