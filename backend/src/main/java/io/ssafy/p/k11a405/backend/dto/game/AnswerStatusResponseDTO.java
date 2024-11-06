package io.ssafy.p.k11a405.backend.dto.game;

import lombok.Builder;

@Builder
public record AnswerStatusResponseDTO(
        String userId,
        String nickname,
        boolean isCorrect,
        String drawSrc,
        String avatarsImgSrc
) {
}