package io.ssafy.p.k11a405.backend.service;

import io.ssafy.p.k11a405.backend.dto.FindAvatarsInfoResponseDTO;
import io.ssafy.p.k11a405.backend.dto.UserResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {

    private final StringRedisTemplate stringRedisTemplate;
    private final AvatarService avatarService;

    public UserResponseDTO createUser(String nickname, Integer avatarId) {
        // 고유한 UUID 생성
        String userId = UUID.randomUUID().toString();
        // Redis 해시에 유저 정보 저장
        String userKey = "user:" + userId;
        FindAvatarsInfoResponseDTO avatarInfo = avatarService.findAvatarInfo(avatarId);
        // Redis에 유저 데이터 저장
        stringRedisTemplate.opsForHash().put(userKey, "id", userId);
        stringRedisTemplate.opsForHash().put(userKey, "nickname", nickname);
        stringRedisTemplate.opsForHash().put(userKey, "avatarId", String.valueOf(avatarId)); // 아바타 id 저장
        stringRedisTemplate.opsForHash().put(userKey, "avatarProfileImg", avatarInfo.profileImg());

        return new UserResponseDTO(userId, nickname, avatarInfo.profileImg()); // 생성된 유저 ID 반환
    }

    public UserResponseDTO updateNickname(String nickname, String userId) {
        String userKey = generateUserKey(userId);
        stringRedisTemplate.opsForHash().put(userKey, "nickname", nickname);
        return getUserInfoByUserId(userId);
    }

    private UserResponseDTO getUserInfoByUserId(String userId) {
        String userKey = generateUserKey(userId);
        String nickname = String.valueOf(stringRedisTemplate.opsForHash().get(userKey, "nickname"));
        String profileImg = String.valueOf(stringRedisTemplate.opsForHash().get(userKey, "avatarProfileImg"));
        return new UserResponseDTO(userId, nickname, profileImg);
    }

    public String generateUserKey(String userId) {
        return "user:" + userId;
    }
}