import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://192.168.56.108:9090/";

class EmployeeService {

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL+"employList");
    };

    getLogin(login){
        return axios.post(EMPLOYEE_API_BASE_URL+"empLogin",login);
    }

    register(login){
        return axios.post(EMPLOYEE_API_BASE_URL+"empRigister",login);
    }

}       
export default new EmployeeService()
