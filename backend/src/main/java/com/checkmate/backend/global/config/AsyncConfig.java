package com.checkmate.backend.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
@Slf4j
public class AsyncConfig {
    @Bean(name = "orderEventExecutor")
    public Executor orderEventExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("order-event-");

        executor.setRejectedExecutionHandler((r, e) -> {
            log.warn(
                    "[OrderEventExecutor][Task rejected. poolSize={}, active={}, queueSize={}]",
                    e.getPoolSize(),
                    e.getActiveCount(),
                    e.getQueue().size()
            );
        });

        executor.initialize();
        return executor;
    }
}
