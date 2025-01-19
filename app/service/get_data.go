package service

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/fauzancodes/github-wrapped-app/app/dto"
	"github.com/fauzancodes/github-wrapped-app/app/models"
	"github.com/fauzancodes/github-wrapped-app/app/repository"
	"github.com/google/go-github/v68/github"
	"github.com/google/uuid"
)

func GenerateData(personalAccessToken, startDate, endDate string) (response models.GWAResult, err error) {
	client := github.NewClient(nil).WithAuthToken(personalAccessToken)

	user, _, err := client.Users.Get(context.Background(), "")
	if err != nil {
		err = errors.New("failed to login to github: " + err.Error())
		return
	}

	response, err = repository.CreateData(models.GWAResult{
		Username: *user.Login,
		Progress: "0%",
		StarDate: startDate,
		EndDate:  endDate,
		Message:  "Initializing . . . . . Please wait until the progress is 100%",
	})
	if err != nil {
		err = errors.New("failed to initiate data: " + err.Error())
		return
	}

	go ProcessData(client, user, startDate, endDate, response.ID)

	return
}

func ProcessData(client *github.Client, user *github.User, startDate, endDate string, id uuid.UUID) {
	data, _ := repository.GetDataByID(id)
	data.Progress = "1%"
	data.Message = "Calculating all repositories . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	var response dto.ResponseData

	var (
		repositoriesOwned       []dto.RepositoriesData
		repositoriesForked      []dto.RepositoriesData
		repositoriesContributed []dto.RepositoriesData
		starred                 []string
		totalStarred            int
		followers               []string
		totalFollowers          int
		followings              []string
		totalFollowings         int
		unfollowers             []string
		totalUnfollwers         int
		unfollowings            []string
		totalUnfollowings       int
		stargazers              []string
		totalStargazers         int
		languages               []dto.LanguageData
	)

	var err error

	startTime := time.Now()

	repositoriesOwned, repositoriesForked, repositoriesContributed, err = GetRepositories(client, *user.Login, startDate, endDate, data)
	if err != nil {
		data.Message = err.Error()
		repository.UpdateData(data)
		return
	}
	data.Progress = "30%"
	data.Message = "Calculating all starred repositories . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	starred, totalStarred, err = GetRepositoriesStarred(client, startDate, endDate, data)
	if err != nil {
		data.Message = err.Error()
		repository.UpdateData(data)
		return
	}
	data.Progress = "40%"
	data.Message = "Calculating all stargazers . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	stargazers, totalStargazers, err = GetStargazers(client, *user.Login, startDate, endDate, repositoriesOwned, data)
	if err != nil {
		data.Message = err.Error()
		repository.UpdateData(data)
		return
	}
	data.Progress = "50%"
	data.Message = "Calculating all languages . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	languages, err = GetFavoriteLanguages(client, *user.Login, endDate, repositoriesOwned, data)
	if err != nil {
		data.Message = err.Error()
		repository.UpdateData(data)
		return
	}
	data.Progress = "60%"
	data.Message = "Calculating all followers . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	followers, totalFollowers, err = GetFollowers(client, data)
	if err != nil {
		data.Message = err.Error()
		repository.UpdateData(data)
		return
	}
	data.Progress = "70%"
	data.Message = "Calculating all followings . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	followings, totalFollowings, err = GetFollowings(client, data)
	if err != nil {
		data.Message = err.Error()
		repository.UpdateData(data)
		return
	}
	data.Progress = "80%"
	data.Message = "Calculating all unfollowers . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	unfollowers = CalculateUnfollowers(followings, followers, data)
	totalUnfollwers = len(unfollowers)
	data.Progress = "90%"
	data.Message = "Calculating all unfollowings . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	unfollowings = CalculateUnfollowings(followers, followings, data)
	totalUnfollowings = len(unfollowings)
	data.Progress = "99%"
	data.Message = "Finalizing results . . . . . Please wait until the progress is 100%"
	repository.UpdateData(data)

	response.Repositories = dto.RepositoriesResponse{
		RepositoriesOwned: dto.DetailRepository{
			Detail: repositoriesOwned,
			Total:  len(repositoriesOwned),
		},
		RepositoriesForked: dto.DetailRepository{
			Detail: repositoriesForked,
			Total:  len(repositoriesForked),
		},
		RepositoriesContributed: dto.DetailRepository{
			Detail: repositoriesContributed,
			Total:  len(repositoriesContributed),
		},
	}

	response.Repositories.Total = response.Repositories.RepositoriesOwned.Total + response.Repositories.RepositoriesForked.Total + response.Repositories.RepositoriesContributed.Total

	for _, detail := range response.Repositories.RepositoriesOwned.Detail {
		response.Repositories.RepositoriesOwned.TotalCommit += detail.TotalCommits
	}
	for _, detail := range response.Repositories.RepositoriesForked.Detail {
		response.Repositories.RepositoriesForked.TotalCommit += detail.TotalCommits
	}
	for _, detail := range response.Repositories.RepositoriesContributed.Detail {
		response.Repositories.RepositoriesContributed.TotalCommit += detail.TotalCommits
	}

	response.Repositories.TotalCommit = response.Repositories.RepositoriesOwned.TotalCommit + response.Repositories.RepositoriesForked.TotalCommit + response.Repositories.RepositoriesContributed.TotalCommit

	response.Starreds = dto.ListTotal{
		Detail: starred,
		Total:  totalStarred,
	}

	response.Stargazers = dto.ListTotal{
		Detail: stargazers,
		Total:  totalStargazers,
	}

	response.Languages = languages

	response.Followers = dto.ListTotal{
		Detail: followers,
		Total:  totalFollowers,
	}

	response.Followings = dto.ListTotal{
		Detail: followings,
		Total:  totalFollowings,
	}

	response.Unfollowers = dto.ListTotal{
		Detail: unfollowers,
		Total:  totalUnfollwers,
	}

	response.Unfollowings = dto.ListTotal{
		Detail: unfollowings,
		Total:  totalUnfollowings,
	}

	endTime := time.Now()
	duration := endTime.Sub(startTime)
	hours := int(duration.Hours())
	minutes := int(duration.Minutes()) % 60
	seconds := int(duration.Seconds()) % 60
	latency := fmt.Sprintf("%02d hours %02d minutes %02d seconds", hours, minutes, seconds)

	dataJson, err := json.Marshal(response)
	if err != nil {
		data.Message = "failed to convert result to json: " + err.Error()
		repository.UpdateData(data)
		return
	}
	data.Latency = latency
	data.Data = string(dataJson)
	data.Progress = "100%"
	data.Message = "Success to generate data"
	repository.UpdateData(data)
}
