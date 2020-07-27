package com.bolsadeideas.spring.backend.apirest.models.services;

import java.util.List;

import com.bolsadeideas.spring.backend.apirest.models.entity.Cliente;


public interface IClienteService {
    public List<Cliente>  findAll();
}
