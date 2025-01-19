package service

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"strconv"

	"github.com/fauzancodes/github-wrapped-app/app/dto"
	"github.com/fauzancodes/github-wrapped-app/app/models"
	"github.com/fauzancodes/github-wrapped-app/app/pkg/utils"
	"github.com/fauzancodes/github-wrapped-app/app/repository"
	"github.com/google/go-github/v68/github"
)

func GetRepositories(client *github.Client, username, startDate, endDate string, data models.GWAResult) (repositoriesOwned, repositoriesForked, repositoriesContributed []dto.RepositoriesData, err error) {
	options := &github.RepositoryListByAuthenticatedUserOptions{
		ListOptions: github.ListOptions{PerPage: 10},
	}

	var totalPage int
	currentPage := 1
	percentageOffset := 1
	targetPercentage := 30

	for {
		var repos []*github.Repository
		var resp *github.Response
		repos, resp, err = client.Repositories.ListByAuthenticatedUser(context.Background(), options)
		if err != nil {
			err = errors.New("error fetching repositories: " + err.Error())
			return
		}
		totalPage = resp.LastPage

		for _, repo := range repos {
			repoDate := repo.CreatedAt.Time
			isCounted := utils.CountDetermination(repoDate, "", endDate)

			if !isCounted {
				continue
			}

			repoName := *repo.Name
			repoOwner := *repo.Owner.Login
			var totalCommits int
			totalCommits, err = CountCommitsInRepo(client, username, repoOwner, repoName, startDate, endDate)
			if err != nil {
				return
			}

			if *repo.Fork {
				repositoriesForked = append(repositoriesForked, dto.RepositoriesData{
					Name:         repoName,
					TotalCommits: totalCommits,
					CreatedAt:    repoDate,
				})
			} else {
				repoOwner := *repo.Owner.Login
				if repoOwner == username {
					repositoriesOwned = append(repositoriesOwned, dto.RepositoriesData{
						Name:         repoName,
						TotalCommits: totalCommits,
						CreatedAt:    repoDate,
					})
				} else {
					repositoriesContributed = append(repositoriesContributed, dto.RepositoriesData{
						Name:         repoName,
						TotalCommits: totalCommits,
						CreatedAt:    repoDate,
					})
				}
			}
		}

		if resp.NextPage == 0 {
			break
		}

		data.Progress = strconv.Itoa(utils.CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage)) + "%"
		repository.UpdateData(data)
		currentPage++

		options.Page = resp.NextPage
	}

	return
}

func CountCommitsInRepo(client *github.Client, username, repoOwner, repoName, startDate, endDate string) (total int, err error) {
	options := &github.CommitsListOptions{
		SHA:    "",
		Author: username,
	}

	for {
		var commits []*github.RepositoryCommit
		var resp *github.Response
		commits, resp, err = client.Repositories.ListCommits(context.Background(), repoOwner, repoName, options)
		if err != nil {
			err = errors.New("error fetching commits: " + err.Error() + ". Repository: " + repoName)
			return
		}

		for _, commit := range commits {
			commitDate := commit.Commit.Author.Date.Time
			isCounted := utils.CountDetermination(commitDate, startDate, endDate)

			if !isCounted {
				continue
			}

			total++
		}

		if resp.NextPage == 0 {
			break
		}

		options.Page = resp.NextPage
	}

	return
}

func GetRepositoriesStarred(client *github.Client, startDate, endDate string, data models.GWAResult) (allRepos []string, totalRepositoriesStarred int, err error) {
	options := &github.ActivityListStarredOptions{
		ListOptions: github.ListOptions{
			PerPage: 10,
		},
	}

	var totalPage int
	currentPage := 1
	percentageOffset := 30
	targetPercentage := 40

	for {
		var repos []*github.StarredRepository
		var resp *github.Response
		repos, resp, err = client.Activity.ListStarred(context.Background(), "", options)
		if err != nil {
			err = errors.New("error fetching repositories starred: " + err.Error())
			return
		}
		totalPage = resp.LastPage
		fmt.Println("resp.LastPage:", resp.LastPage)

		for _, repo := range repos {
			starredDate := repo.StarredAt.Time
			isCounted := utils.CountDetermination(starredDate, startDate, endDate)

			if !isCounted {
				continue
			}

			allRepos = append(allRepos, *repo.Repository.Name)
		}

		if resp.NextPage == 0 {
			break
		}

		data.Progress = strconv.Itoa(utils.CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage)) + "%"
		repository.UpdateData(data)
		currentPage++

		options.Page = resp.NextPage
	}

	totalRepositoriesStarred = len(allRepos)

	return
}

func GetStargazers(client *github.Client, username, startDate, endDate string, repos []dto.RepositoriesData, data models.GWAResult) (allStargazers []string, totalStarEarned int, err error) {
	totalPage := len(repos)
	currentPage := 1
	percentageOffset := 40
	targetPercentage := 50

	for _, repo := range repos {
		options := &github.ListOptions{
			PerPage: 10,
		}

		for {
			var stargazers []*github.Stargazer
			var resp *github.Response
			stargazers, resp, err = client.Activity.ListStargazers(context.Background(), username, repo.Name, options)
			if err != nil {
				err = errors.New("error fetching stargazer: " + err.Error())
				return
			}

			for _, stargazer := range stargazers {
				startgazerDate := stargazer.StarredAt.Time
				isCounted := utils.CountDetermination(startgazerDate, startDate, endDate)

				if !isCounted {
					continue
				}

				allStargazers = append(allStargazers, fmt.Sprintf("%s | %s", repo.Name, *stargazer.User.Login))
			}

			if resp.NextPage == 0 {
				break
			}

			options.Page = resp.NextPage
		}

		data.Progress = strconv.Itoa(utils.CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage)) + "%"
		repository.UpdateData(data)
		currentPage++

		totalStarEarned = len(allStargazers)
	}

	return
}

func GetFavoriteLanguages(client *github.Client, username, endDate string, repos []dto.RepositoriesData, data models.GWAResult) (languages []dto.LanguageData, err error) {
	totalPage := len(repos)
	currentPage := 1
	percentageOffset := 50
	targetPercentage := 60

	languagesData := make(map[string]int)

	for _, repo := range repos {
		isCounted := utils.CountDetermination(repo.CreatedAt, "", endDate)

		if !isCounted {
			continue
		}

		var langs map[string]int
		langs, _, err = client.Repositories.ListLanguages(context.Background(), username, repo.Name)
		if err != nil {
			err = errors.New("error fetching languages: " + err.Error())
			return
		}

		for key, value := range langs {
			languagesData[key] += value
		}

		data.Progress = strconv.Itoa(utils.CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage)) + "%"
		repository.UpdateData(data)
		currentPage++
	}

	for key, value := range languagesData {
		languages = append(languages, dto.LanguageData{
			Name:  key,
			Bytes: value,
		})
	}

	sort.Slice(languages, func(i, j int) bool {
		return languages[i].Bytes > languages[j].Bytes
	})

	return
}
