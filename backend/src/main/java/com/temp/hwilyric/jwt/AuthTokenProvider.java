package com.temp.hwilyric.jwt;

import com.temp.hwilyric.exception.TokenValidFailedException;
import com.temp.hwilyric.oauth.domain.PrincipalDetails;
import com.temp.hwilyric.user.domain.User;
import com.temp.hwilyric.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class AuthTokenProvider {
    private final Key key;
    private static final String AUTHORITIES_KEY = "role";
    private final UserRepository userRepository;


    /**
     * 객체 초기화
     *
     * @param secret         : jwt의 secret
     */
    public AuthTokenProvider(String secret, UserRepository userRepository) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.userRepository = userRepository;
    }

    public AuthToken createAuthToken(String id, Date expiry) {
        return new AuthToken(id, expiry, key, userRepository);
    }

    public AuthToken createAuthToken(Long id, String role, Date expiry) {
        return new AuthToken(id, role, expiry, key, userRepository);
    }

    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key, userRepository);
    }

    public Authentication getAuthentication(AuthToken authToken) {

        log.debug("getAuthentication 메서드로 들어왔당");
        if (authToken.validate()) {

            Claims claims = authToken.getTokenClaims();
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

            log.debug("claims subject := [{}]", claims.getSubject());

            PrincipalDetails principalDetails = new PrincipalDetails(userRepository.findById(Long.valueOf(String.valueOf(claims.get("id")))).orElse(null));
            return new UsernamePasswordAuthenticationToken(principalDetails, authToken, authorities);
        } else {
            throw new TokenValidFailedException();
        }
    }

}