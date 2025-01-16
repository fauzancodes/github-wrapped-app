package dto

import "time"

type RepositoriesResponse struct {
	RepositoriesOwned       DetailRepository `json:"repository_owned"`
	RepositoriesForked      DetailRepository `json:"repository_forked"`
	RepositoriesContributed DetailRepository `json:"repository_contributed"`
	Total                   int              `json:"total"`
	TotalCommit             int              `json:"total_commits"`
}

type RepositoriesData struct {
	Name         string    `json:"name"`
	TotalCommits int       `json:"total_commits"`
	CreatedAt    time.Time `json:"-"`
}

type LanguageData struct {
	Name  string `json:"name"`
	Bytes int    `json:"byte_of_codes"`
}
