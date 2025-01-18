package config

type Config struct {
	DatabaseUsername            string
	DatabasePassword            string
	DatabaseHost                string
	DatabasePort                string
	DatabaseName                string
	EnableDatabaseAutomigration bool
}

func LoadConfig() (config *Config) {
	// databaseUsername := os.Getenv("DATABASE_USERNAME")
	// databasePassword := os.Getenv("DATABASE_PASSWORD")
	// databaseHost := os.Getenv("DATABASE_HOST")
	// databasePort := os.Getenv("DATABASE_PORT")
	// databaseName := os.Getenv("DATABASE_NAME")
	// enableDatabaseAutomigration, _ := strconv.ParseBool(os.Getenv("ENABLE_DATABASE_AUTOMIGRATION"))

	return &Config{
		// DatabaseUsername:            databaseUsername,
		// DatabasePassword:            databasePassword,
		// DatabaseHost:                databaseHost,
		// DatabasePort:                databasePort,
		// DatabaseName:                databaseName,
		// EnableDatabaseAutomigration: enableDatabaseAutomigration,
	}
}
