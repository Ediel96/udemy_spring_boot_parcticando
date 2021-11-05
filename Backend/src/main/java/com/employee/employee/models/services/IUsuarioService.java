package com.employee.employee.models.services;

import com.employee.employee.models.entity.Usuario;

public interface IUsuarioService {

    public Usuario findByUsername(String username);
}
