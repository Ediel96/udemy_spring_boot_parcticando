package com.employee.employee.models.dao;

import com.employee.employee.models.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ICLienteDao extends JpaRepository<Cliente  , Long> {

}
