package pw.react.backend.reactbackend.service;

import pw.react.backend.reactbackend.model.Company;

/** Created by Pawel Gawedzki on 05-Oct-2019. */
public interface CompanyService {
    Company updateCompany(Long id, Company updatedCompany);
    boolean deleteCompany(Long companyId);
}
