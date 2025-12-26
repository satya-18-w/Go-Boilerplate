package config

import (
	"os"
	"strings"

	"github.com/go-playground/validator/v10"
	_ "github.com/joho/godotenv/autoload"
	"github.com/knadh/koanf/providers/env"

	"github.com/knadh/koanf/v2"
	"github.com/rs/zerolog"
)

// Store all the go struct env variables.
type Config struct {
	Primary       Primary              `koanf:"primary" validate:"required"`
	Server        ServerConfig         `koanf:"server" validate:"required"`
	Database      DatabaseConfig       `koanf:"database" validate:"required"`
	Auth          AuthConfig           `koanf:"auth" validate:"required"`
	Redis         RedisConfig          `koanf:"redis" validate:"required"`
	Observability *ObservabilityConfig `koanf:"observability"`
	Integration   IntegrationConfig    `koanf:"integration" validate:"required"`
	AWS           AWSConfig            `koanf:"aws" validate:"required"`
	Cron          *CronConfig          `koanf:"cron"`
}
type AWSConfig struct {
	Region          string `koanf:"region" validate:"required"`
	AccessKeyID     string `koanf:"access_key_id" validate:"required"`
	SecretAccessKey string `koanf:"secret_access_key" validate:"required"`
	UploadBucket    string `koanf:"upload_bucket" validate:"required"`
	EndpointURL     string `koanf:"endpoint_url"`
}

type Primary struct {
	Env string `koanf:"env" validate:"required"`
}

type IntegrationConfig struct {
	ResendAPIKey string `koanf:"resend_api_key" validate:"required"`
	SenderEmail  string `koanf:"sender_email" validate:"required"`
}

type ServerConfig struct {
	Port             string   `koanf:"port" validate:"required"`
	ReadTimeout      int      `koanf:"write_timeout" validate:"required"`
	WriteTimeout     int      `koanf:"write_timeout" validate:"required"`
	IdleTimeout      int      `koanf:"idle_timeout" validate:"required"`
	CORSAllowOrigins []string `koanf:"cors_allowed_origins" validate:"required"`
}

type DatabaseConfig struct {
	Host            string `koanf:"host" validate:"required"`
	Port            int    `koanf:"port" validate:"required"`
	User            string `koanf:"user" validate:"required"`
	Password        string `koanf:"password" validate:"required"`
	Name            string `koanf:"name" validate:"required"`
	SSLMode         string `koanf:"ssl_mode" validate:"required"`
	MaxOpenConns    int    `koanf:"max_open_conns" validate:"required"`
	MaxIdleConns    int    `koanf:"max_idle_conns" validate:"required"`
	ConnMaxLifetime int    `koanf:"conn_max_lifetime" validate:"required"`
	ConnMaxIdleTime int    `koanf:"conn_max_idle_time" validate:"required"`
}

type RedisConfig struct {
	Address  string `koanf:"address" validate:"required"`
	Password string `koanf:"password"`
	DB       int    `koanf:"db"`
}

type AuthConfig struct {
	SecretKey string `koanf:"secret_key" validate:"required"`
}

type CronConfig struct {
	ArchiveDaysThreshold        int `koanf:"archive_days_threshold"`
	BatchSize                   int `koanf:"batch_size"`
	ReminderHours               int `koanf:"reminder_hours"`
	MaxTodosPerUserNotification int `koanf:"max_todo_per_user_notification"`
}

func DefaultCronConfig() *CronConfig {
	return &CronConfig{
		ArchiveDaysThreshold:        30,
		BatchSize:                   100,
		ReminderHours:               24,
		MaxTodosPerUserNotification: 10,
	}
}

// func LoadConfig() (*Config, error) {
// 	logger := zerolog.New(zerolog.ConsoleWriter{Out: os.Stderr}).With().Timestamp().Logger()
// 	k := koanf.New(".")
// 	err := k.Load(env.Provider("TODO_TASKER_", ".", func(s string) string {
// 		return strings.ToLower(strings.TrimPrefix(s, "TODO_TASKER_"))
// 	}), nil)
// 	if err != nil {
// 		logger.Fatal().Err(err).Msg("Could not load initial env variables")
// 	}
// 	mainconfig := &Config{}
// 	err = k.Unmarshal("", mainconfig)
// 	if err != nil {
// 		logger.Fatal().Err(err).Msg("Could not unmarshal main config")
// 	}
// 	validate := validator.New()
// 	err = validate.Struct(mainconfig)
// 	if err != nil {
// 		logger.Fatal().Err(err).Msg("Config validation Failed")
// 	}

// 	if mainconfig.Observability == nil {
// 		mainconfig.Observability = DefaultObservabilityConfig()
// 	}
// 	mainconfig.Observability.ServiceName = "TODO_TASKER"
// 	mainconfig.Observability.Environment = mainconfig.Primary.Env

// 	if err := mainconfig.Observability.Validate(); err != nil {
// 		logger.Fatal().Err(err).Msg("Observability config validation failed")
// 	}

// 	if mainconfig.CRON == nil {
// 		mainconfig.CRON = DefaultCronConfig()
// 	}
// 	return mainconfig, nil

// }

// Because sevalla returns a stringified object so we need to parse it
func parseMapString(value string) (map[string]string, bool) {
	if !strings.HasPrefix(value, "map[") || !strings.HasSuffix(value, "]") {
		return nil, false
	}

	content := strings.TrimPrefix(value, "map[")
	content = strings.TrimSuffix(content, "]")

	if content == "" {
		return make(map[string]string), true
	}

	result := make(map[string]string)

	i := 0
	for i < len(content) {
		keyStart := i
		for i < len(content) && content[i] != ':' {
			i++
		}
		if i >= len(content) {
			break
		}

		key := strings.TrimSpace(content[keyStart:i])
		i++

		valueStart := i
		if i+4 <= len(content) && content[i:i+4] == "map[" {
			bracketCount := 0
			for i < len(content) {
				if i+4 <= len(content) && content[i:i+4] == "map[" {
					bracketCount++
					i += 4
				} else if content[i] == ']' {
					bracketCount--
					i++
					if bracketCount == 0 {
						break
					}
				} else {
					i++
				}
			}
		} else {
			for i < len(content) && content[i] != ' ' {
				i++
			}
		}

		value := strings.TrimSpace(content[valueStart:i])

		if nestedMap, isNested := parseMapString(value); isNested {
			for nestedKey, nestedValue := range nestedMap {
				result[key+"."+nestedKey] = nestedValue
			}
		} else {
			result[key] = value
		}

		for i < len(content) && content[i] == ' ' {
			i++
		}
	}

	return result, true
}

func LoadConfig() (*Config, error) {
	logger := zerolog.New(zerolog.ConsoleWriter{Out: os.Stderr}).With().Timestamp().Logger()

	k := koanf.New(".")

	envVars := make(map[string]string)
	for _, env := range os.Environ() {
		parts := strings.SplitN(env, "=", 2)
		if len(parts) == 2 && strings.HasPrefix(parts[0], "TASKER_") {
			key := parts[0]
			value := parts[1]

			configKey := strings.ToLower(strings.TrimPrefix(key, "TASKER_"))

			if mapData, isMap := parseMapString(value); isMap {
				for mapKey, mapValue := range mapData {
					flatKey := configKey + "." + strings.ToLower(mapKey)
					envVars[flatKey] = mapValue
				}
			} else {
				envVars[configKey] = value
			}
		}
	}

	err := k.Load(env.ProviderWithValue("TASKER_", ".", func(key, value string) (string, any) {
		return strings.ToLower(strings.TrimPrefix(key, "TASKER_")), value
	}), nil)
	if err != nil {
		logger.Fatal().Err(err).Msg("could not load initial env variables")
	}

	for key, value := range envVars {
		k.Set(key, value)
	}

	mainConfig := &Config{}

	err = k.Unmarshal("", mainConfig)
	if err != nil {
		logger.Fatal().Err(err).Msg("could not unmarshal main config")
	}

	validate := validator.New()

	err = validate.Struct(mainConfig)
	if err != nil {
		logger.Fatal().Err(err).Msg("config validation failed")
	} else {
		logger.Info().Msg("config validation passed")
	}

	if mainConfig.Observability == nil {
		mainConfig.Observability = DefaultObservabilityConfig()
	}

	mainConfig.Observability.ServiceName = "tasker"
	mainConfig.Observability.Environment = mainConfig.Primary.Env

	if err := mainConfig.Observability.Validate(); err != nil {
		logger.Fatal().Err(err).Msg("invalid observability config")
	}

	if mainConfig.Cron == nil {
		mainConfig.Cron = DefaultCronConfig()
	}

	return mainConfig, nil
}
