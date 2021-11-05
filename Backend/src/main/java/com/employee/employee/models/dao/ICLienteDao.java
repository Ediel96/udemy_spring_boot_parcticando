package com.employee.employee.models.dao;

import com.employee.employee.models.entity.Cliente;
import com.employee.employee.models.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ICLienteDao extends JpaRepository<Cliente  , Long> {

    @Query("from Region")
    public List<Region> findAllByRegiones();

}
