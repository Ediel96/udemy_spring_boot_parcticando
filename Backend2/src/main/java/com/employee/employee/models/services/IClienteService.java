package com.employee.employee.models.services;

import com.employee.employee.models.entity.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IClienteService {
    public List<Cliente> findAll();

    public Page<Cliente> findAll(Pageable pageable);

    public Cliente findById(long id);

    public Cliente save (Cliente cliente);

    public void delete (long id);
}
