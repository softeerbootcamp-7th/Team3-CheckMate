package com.checkmate.backend.global.client.llm;

import jakarta.annotation.PostConstruct;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

@Component
@Slf4j
public class PromptProvider {

    private final Map<PromptType, String> promptCache = new ConcurrentHashMap<>();

    public enum PromptType {
        DAILY_REPORT("prompts/daily-report.txt"),
        MONTHLY_REPORT("prompts/monthly-report.txt"),
        CHATBOT("prompts/chatbot.txt"),
        MENU_INGREDIENTS("prompts/menu-ingredients.txt");

        private final String path;

        PromptType(String path) {
            this.path = path;
        }
    }

    @PostConstruct
    public void init() {
        for (PromptType type : PromptType.values()) {
            try {
                ClassPathResource resource = new ClassPathResource(type.path);

                if (!resource.exists()) {
                    log.error("프롬프트 파일을 찾을 수 없습니다: {}", type.path);
                    throw new FileNotFoundException("Prompt file not found: " + type.path);
                }

                try (InputStream is = resource.getInputStream()) {
                    String content = StreamUtils.copyToString(is, StandardCharsets.UTF_8);

                    // 앞뒤 불필요한 공백 제거 후 캐싱
                    promptCache.put(type, content.trim());
                    log.info("프롬프트 로드 성공: {} ({} bytes)", type.name(), content.length());
                }
            } catch (IOException e) {
                // 초기화 실패 시 애플리케이션 실행을 멈추거나 런타임 예외로 전환
                throw new RuntimeException("프롬프트 초기화 중 치명적 오류 발생: " + type.name(), e);
            }
        }
    }

    public String getPrompt(PromptType type) {
        return promptCache.get(type);
    }
}
