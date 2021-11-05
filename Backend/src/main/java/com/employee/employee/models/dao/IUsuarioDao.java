package com.employee.employee.models.dao;

import com.employee.employee.models.entity.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IUsuarioDao extends CrudRepository <Usuario, Long> {

    public Usuario findAllByUsername(String username);

    @Query("select u from Usuario  u where u.username=?1" )
    public Usuario findAllByUsername2(String username);

}
