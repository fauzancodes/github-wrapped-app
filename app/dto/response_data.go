package dto

type ResponseData struct {
	Repositories RepositoriesResponse `json:"repositories"`
	Followers    ListTotal            `json:"followers"`
	Followings   ListTotal            `json:"followings"`
	Unfollowers  ListTotal            `json:"unfollowers"`
	Unfollowings ListTotal            `json:"unfollowings"`
	Starreds     ListTotal            `json:"starreds"`
	Stargazers   ListTotal            `json:"startgazers"`
	Languages    []LanguageData       `json:"languages"`
}

type DetailRepository struct {
	Detail      []RepositoriesData `json:"detail"`
	Total       int                `json:"total"`
	TotalCommit int                `json:"total_commits"`
}

type ListTotal struct {
	Detail []string `json:"detail"`
	Total  int      `json:"total"`
}
