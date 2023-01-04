package com.example.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.exception.ResourceNotFoundException;
import com.example.springboot.model.Employee;
import com.example.springboot.repository.EmployeeRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	@Autowired
    private EmployeeRepository employeeRepository;
	
	//get all employee
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}
	
    //create employee rest api
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.saveAndFlush(employee);
	}
	//get employee by id rest api
	//@Pathvariable is used to map path with long id
	//ResponseEntity
	@GetMapping("/employees/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
		Optional<Employee> e=employeeRepository.findById(id);
//		if(!e.isEmpty()) {
//			Optional<String> name=Optional.ofNullable(e.get().getFirstName());
//			if(name.isPresent()) {
//				return new ResponseEntity<>(name.get().toUpperCase(),HttpStatus.OK);
//			}else {
//				return new ResponseEntity<>("Name is Null",HttpStatus.NOT_FOUND);
//			}
			
//			name.ifPresent(n->System.out.println("Name is present "+n.toUpperCase()));
//			name.ifPresentOrElse(n->System.out.println("Present"+n),()->System.out.println("Not"));
//		}else 
//			return new ResponseEntity<>("Sorry Employee with given ID is not present",HttpStatus.NOT_FOUND);
//			return null;
//		
		
		Employee employee=employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee Not exist with id:"+id));
		return ResponseEntity.ok(employee);
	}
	//update  
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
		Employee employee=employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee Not exist with id:" +id));
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmailId(employeeDetails.getEmailId());
		
		Employee updatedEmployee=employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	//delete employee
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
		Employee employee=employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Employee Not exist with id:" +id));
		employeeRepository.delete(employee);
		Map<String,Boolean> response=new HashMap<>();
		response.put("deleted", true);
		return ResponseEntity.ok(response);
	}
}
