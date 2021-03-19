package com.employee.employee.models.dao;

import com.employee.employee.models.entity.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface ICLienteDao extends CrudRepository<Cliente  , Long> {
}
