package pw.react.backend.reactbackend.service;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
class SecurityServiceImpl implements SecurityService {

    private static final String SECURITY_HEADER = "security-header";
    private final String SECURITY_HEADER_VALUE = "secureMe";

    @Override
    public boolean isAuthenticated(HttpHeaders headers) {
        return true;
//        if (headers == null) {
//            return false;
//        }
//        return headers.containsKey(SECURITY_HEADER) && SECURITY_HEADER_VALUE.equals(headers.getFirst(SECURITY_HEADER));
    }

    @Override
    public boolean isAuthorized(HttpHeaders headers) {

        return true;
        //return isAuthenticated(headers);
    }
}
