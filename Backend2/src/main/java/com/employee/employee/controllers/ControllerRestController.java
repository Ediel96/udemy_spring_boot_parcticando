package com.employee.employee.controllers;


import com.employee.employee.models.entity.Cliente;
import com.employee.employee.models.services.IClienteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ControllerRestController {
    @Autowired
    private IClienteService clienteService;

    private final Logger log = LoggerFactory.getLogger(ControllerRestController.class);


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
            Cliente cliente = clienteService.findById(id);

            //Elimino la imagen alterior
            String nombreFotoAnterior = cliente.getFoto();

            if(nombreFotoAnterior !=null && nombreFotoAnterior.length() > 0){
                Path rutaFotPathAnterior = Paths.get("uploads").resolve(nombreFotoAnterior).toAbsolutePath();
                File archivoFotoAnterior = rutaFotPathAnterior.toFile();
                if(archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()){
                    archivoFotoAnterior.delete();
                }
            }

            clienteService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje" , "Error al eliminar en la base de datos ");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "se eliminado correctamente el cliente");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PostMapping("/clientes/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo")MultipartFile archivo, @RequestParam("id") Long id){

        Map<String, Object> response = new HashMap<>();

        Cliente cliente = clienteService.findById(id);

        if(!archivo.isEmpty()){

            String nombreArchivo = UUID.randomUUID().toString()+"_"+ Objects.requireNonNull(archivo.getOriginalFilename()).replace(" " ,"");

            Path rutaArchivo = Paths.get("uploads").resolve(nombreArchivo).toAbsolutePath();
            log.info(rutaArchivo.toString());

            //Guardo la imagen
            try {
                Files.copy(archivo.getInputStream(), rutaArchivo);
            }catch (IOException e){
                response.put("mensaje" , "Error al subir la imagen del cliente");
                response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
                return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            //Elimino la imagen alterior
            String nombreFotoAnterior = cliente.getFoto();

            System.out.println(nombreFotoAnterior);

            if(nombreFotoAnterior !=null && nombreFotoAnterior.length() > 0){
                Path rutaFotPathAnterior = Paths.get("uploads").resolve(nombreFotoAnterior).toAbsolutePath();
                File archivoFotoAnterior = rutaFotPathAnterior.toFile();
                if(archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()){
                    archivoFotoAnterior.delete();
                }
            }

            cliente.setFoto(nombreArchivo);

            clienteService.save(cliente);

            response.put("cliente", cliente);
            response.put("mensaje" , "Has subido correctamente la imagen" + nombreArchivo);
        }
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @GetMapping("/uploads/img/{nombreFoto:.+}")
    public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto){

        Path rutaArchivo = Paths.get("uploads").resolve(nombreFoto).toAbsolutePath();
        log.info(rutaArchivo.toString());

        Resource recurso = null;

        try {
            recurso = new UrlResource(rutaArchivo.toUri());
        }catch ( MalformedURLException e){
            e.printStackTrace();
        }

        if(!recurso.exists() && !recurso.isReadable()){
            rutaArchivo = Paths.get("src/main/resources/static/img").resolve("not_user.png").toAbsolutePath();

            try {
                recurso = new UrlResource(rutaArchivo.toUri());
            }catch ( MalformedURLException e){
                e.printStackTrace();
            }
                log.error("Error no se pudo cagar la imagen" + nombreFoto);
        }

        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");

        return new ResponseEntity<Resource>(recurso,cabecera, HttpStatus.OK);
    }

    @GetMapping("img/not_user")
    public ResponseEntity<Resource> notUserImg(){

        String notUserImg = "not_user.png";

        Path rutaArchivo = Paths.get("src/main/resources/static/img").resolve(notUserImg).toAbsolutePath();
        log.info(rutaArchivo.toString());

        Resource recurso = null;

        try {
            recurso = new UrlResource(rutaArchivo.toUri());
        }catch ( MalformedURLException e){
            e.printStackTrace();
        }

        if(!recurso.exists() && !recurso.isReadable()){
            throw new RuntimeException("Error no se pudo cargar la imagen: " + notUserImg);
        }

        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");

        return new ResponseEntity<Resource>(recurso,cabecera, HttpStatus.OK);
    }
}
