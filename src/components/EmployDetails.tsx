import React, { useState, useEffect } from 'react';
import EmployService from '../services/EmployService';

interface Employee {
    empNo: string;
    name: string;
    gender: string;
    desig: string;
    dept: string;
    salary: number;
    status: string;
}

const EmployDetails: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [paginatedEmployees, setPaginatedEmployees] = useState<Employee[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await EmployService.getEmployees();
            setEmployees(response.data);
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedEmployees(employees.slice(startIndex, endIndex));
    }, [employees, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(employees.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    return (
    <div>
      <h2 className="text-center">Employees List</h2>
      <br />
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Employ ID</th>
              <th> Employ Name</th>
              <th> Gender</th>
              <th> Deisignation</th>
              <th> Department</th>
              <th> Salary</th>
              <th> Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map(employee => (
              <tr key={employee.empNo}>
                <td> {employee.empNo} </td>
                <td> {employee.name} </td>
                <td> {employee.gender} </td>
                <td> {employee.desig} </td>
                <td> {employee.dept} </td>
                <td> {employee.salary} </td>
                <td> {employee.status} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} 
        hidden={currentPage === 1}
        className="btn btn-outline-dark">Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className='btn-pagination'
          >
            {index + 1}
          </button>
        ))}
        <button 
        onClick={() => handlePageChange(currentPage + 1)}
        hidden={currentPage === totalPages || totalPages===1 }
        className="btn btn-outline-dark">Next</button>
      </div>
      <br></br>
      <br></br>
    </div>
    
  );
};

export default EmployDetails;