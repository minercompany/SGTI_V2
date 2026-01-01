package py.com.cooperativa.reducto.sgti.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import py.com.cooperativa.reducto.sgti.entity.*;
import py.com.cooperativa.reducto.sgti.repository.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ModulesController {

    private final TaskRepository taskRepository;
    private final SocioRepository socioRepository;
    private final KnowledgeBaseRepository knowledgeBaseRepository;

    // --- TASKS ---
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // --- SOCIOS ---
    @GetMapping("/socios")
    public List<Socio> getAllSocios() {
        return socioRepository.findAll();
    }

    @PostMapping("/socios")
    public Socio createSocio(@RequestBody Socio socio) {
        return socioRepository.save(socio);
    }

    // --- KNOWLEDGE BASE ---
    @GetMapping("/knowledge")
    public List<KnowledgeBase> getAllKnowledge() {
        return knowledgeBaseRepository.findAll();
    }

    @PostMapping("/knowledge")
    public KnowledgeBase createKnowledge(@RequestBody KnowledgeBase kb) {
        return knowledgeBaseRepository.save(kb);
    }
}
