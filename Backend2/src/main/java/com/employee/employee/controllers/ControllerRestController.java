package com.employee.employee.controllers;


import com.employee.employee.models.entity.Cliente;
import com.employee.employee.models.services.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ControllerRestController {
    @Autowired
    private IClienteService clienteService;

    @GetMapping("/clientes")
    public List<Cliente> index(){
        return clienteService.findAll();
    }

    @GetMapping("/clientes/pages/{page}")
    public Page<Cliente> index(@PathVariable Integer page){
        Pageable pegeable = PageRequest.of(page , 4);
        return clienteService.findAll(pegeable);
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<?> show(@PathVariable Long id){

        Cliente cliente = null;
        Map<String , Object > response  = new HashMap<>();

        try {
            cliente = clienteService.findById(id);
        } catch (DataAccessException e) {
             response.put("mensaje" , "Error al realizar la  cconsulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if(cliente == null){
            response.put("mensaje" , "El cliente id: " .concat(id.toString().concat("no existe")));
            return  new ResponseEntity<Map<String , Object>>( response, HttpStatus.NOT_FOUND);
        }
        return  new ResponseEntity<Cliente>(cliente , HttpStatus.OK);
    }

    @PostMapping("/clientes")
    public  ResponseEntity<?> create(@Valid @RequestBody Cliente cliente, BindingResult result){

        Map<String, Object> response = new HashMap<>();
        Cliente clienteNew = null;

        if(result.hasErrors()){
            //Manejo de errores en java 11
            List<String> errros = new ArrayList<>();

            for(FieldError err: result.getFieldErrors()){
                errros.add("El campo " + err.getField()+ "' " + err.getDefaultMessage());
            }

            response.put("errors", errros);
           return  new ResponseEntity<Map <String, Object>>(response, HttpStatus.BAD_REQUEST);

        }

        try {
            clienteNew = clienteService.save(cliente);
        }catch (DataAccessException e){
            response.put("mensaje" , "Error al realizar la  consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente ha sido creado el insert en la base de datos");
        response.put("cliente", clienteNew);
        return new ResponseEntity<Map <String, Object> >(response, HttpStatus.CREATED);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Cliente cliente, BindingResult result , @PathVariable Long id){
        Cliente clienteActual = clienteService.findById(id);
        Map<String, Object> response = new HashMap<>();

        if(result.hasErrors()){
            //Manejo de errores en java 11
            List<String> errros = new ArrayList<>();

            for(FieldError err: result.getFieldErrors()){
                errros.add("El campo " + err.getField()+ "' " + err.getDefaultMessage());
            }

            response.put("errors", errros);
            return  new ResponseEntity<Map <String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if(clienteActual == null){
            response.put("mensaje", "Error: no pudo editar, el ciente ID : " .concat(id.toString().concat(" no existe en la base de datos")));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.NOT_FOUND);
        }

        Cliente clienteUpdate = null;

        try {
            clienteActual.setNombre(cliente.getNombre());
            clienteActual.setApellido(cliente.getApellido());
            clienteActual.setEmail(cliente.getEmail());
            clienteActual.setCreateAt(cliente.getCreateAt());

            clienteUpdate = clienteService.save(clienteActual);

        }catch (DataAccessException e){
            response.put("mensaje" , "Error al actualizar la base de datos");
            response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity <Map <String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El cliente ha sido actualizado con exito");
        response.put("cliente", clienteUpdate);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<?> delete(@PathVariable long id){
        Map<String, Object> response = new HashMap<>();

        try {
            clienteService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje" , "Error al eliminar en la base de datos ");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "se eliminado correctamente el cliente");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }
}
