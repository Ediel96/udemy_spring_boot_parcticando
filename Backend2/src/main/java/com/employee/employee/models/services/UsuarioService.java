package com.employee.employee.models.services;

import com.employee.employee.models.dao.IUsuarioDao;
import com.employee.employee.models.entity.Role;
import com.employee.employee.models.entity.Usuario;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UsuarioService implements IUsuarioService, UserDetailsService {

    private Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    @Autowired
    private IUsuarioDao useriIUsuarioDao;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = useriIUsuarioDao.findAllByUsername(username);

        if( usuario ==null){
            logger.error("error en el login el usuario no existe");
            throw new UsernameNotFoundException("error en el login el usuario no existe");
        }

        List<GrantedAuthority> authorities = usuario.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getNombre()))
                .peek(authority -> logger.info("Role: " + authority.getAuthority()))
                .collect(Collectors.toList());

        return new User(usuario.getUsername(),  usuario.getPassword(), usuario.getEnabled(), true,true,true,authorities);
    }

    @Override
    public Usuario findByUsername(String username) {
        return useriIUsuarioDao.findAllByUsername(username);
    }
}
