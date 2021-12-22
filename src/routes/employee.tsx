import { useParams } from 'react-router-dom';

import data from '../../mock-data.json';

export default function Employee() {
  const { employeeId } = useParams();

  if (employeeId === undefined) {
    return <>Not a valid employee ID</>;
  }

  const employee = data.find(({ id }) => id === parseInt(employeeId));

  return <span>Hi {employee?.name}</span>;
}
