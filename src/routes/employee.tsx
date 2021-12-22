import { useParams } from 'react-router-dom';

export default function Employee() {
  const { employeeId } = useParams();

  if (employeeId === undefined) {
    return <>Not a valid employee ID</>;
  }

  return <span>Hi {employeeId}</span>;
}
