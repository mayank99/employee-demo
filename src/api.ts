import data from '../mock-data.json';
import invariant from 'tiny-invariant';

export type EmployeeData = Partial<typeof data[0]>;

let employees: EmployeeData[] = data;

export const getEmployees = async () => {
  return [...employees].reverse();
};

export const getEmployee = async (employeeId: number) => {
  return employees.find(({ id }) => id === employeeId);
};

export const addEmployee = async (employeeData: EmployeeData) => {
  if (!employeeData.name) {
    throw new Error('Name is required');
  }
  const id = employees[employees.length - 1].id;
  invariant(id, 'An existing record is missing an id');

  employees = [...employees, { ...employeeData, id: id + 1 }];
  return (id + 1);
};

export const updateEmployee = async (employeeId: number, employeeData: EmployeeData) => {
  const index = employees.findIndex(({ id }) => id === employeeId);
  if (index === -1) {
    throw new Error('Employee not found')
  }

  const mutatedEmployees = [...employees];
  mutatedEmployees[index] = { ...employees[index], ...employeeData, id: employeeId };

  employees = mutatedEmployees;
};

export const deleteEmployee = async (employeeId: number) => {
  employees = employees.filter(({ id }) => id !== employeeId);
};