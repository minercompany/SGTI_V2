package py.com.cooperativa.reducto.sgti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import py.com.cooperativa.reducto.sgti.entity.KnowledgeBase;
import java.util.UUID;
import java.util.List;

public interface KnowledgeBaseRepository extends JpaRepository<KnowledgeBase, UUID> {
    List<KnowledgeBase> findByCategory(String category);
}
