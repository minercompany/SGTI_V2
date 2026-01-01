package py.com.cooperativa.reducto.sgti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import py.com.cooperativa.reducto.sgti.entity.Task;
import java.util.UUID;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByAssignedToId(UUID userId);

    List<Task> findByStatus(String status);
}
