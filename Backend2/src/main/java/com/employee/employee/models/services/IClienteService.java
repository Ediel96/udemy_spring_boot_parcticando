package com.employee.employee.models.services;

import com.employee.employee.models.entity.Cliente;

import java.util.List;

public interface IClienteService {
    public List<Cliente> findAll();

    public Cliente findById(long id);

    public Cliente save (Cliente cliente);

    public void delete (long id);
}
