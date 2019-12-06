package pw.react.backend.reactbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.reactbackend.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
