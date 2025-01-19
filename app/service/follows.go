package service

import (
	"context"
	"errors"
	"strconv"

	"github.com/fauzancodes/github-wrapped-app/app/models"
	"github.com/fauzancodes/github-wrapped-app/app/pkg/utils"
	"github.com/fauzancodes/github-wrapped-app/app/repository"
	"github.com/google/go-github/v68/github"
)

func GetFollowers(client *github.Client, data models.GWAResult) (allFollowers []string, totalFollowers int, err error) {
	options := &github.ListOptions{
		PerPage: 10,
	}

	var totalPage int
	currentPage := 1
	percentageOffset := 60
	targetPercentage := 70

	for {
		var followers []*github.User
		var resp *github.Response
		followers, resp, err = client.Users.ListFollowers(context.Background(), "", options)
		if err != nil {
			err = errors.New("error fetching followers: " + err.Error())
			return
		}
		totalPage = resp.LastPage

		for _, follower := range followers {
			allFollowers = append(allFollowers, *follower.Login)
		}

		if resp.NextPage == 0 {
			break
		}

		data.Progress = strconv.Itoa(utils.CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage)) + "%"
		repository.UpdateData(data)
		currentPage++

		options.Page = resp.NextPage
	}

	totalFollowers = len(allFollowers)

	return
}

func GetFollowings(client *github.Client, data models.GWAResult) (allFollowings []string, totalFollowings int, err error) {
	options := &github.ListOptions{
		PerPage: 10,
	}

	var totalPage int
	currentPage := 1
	percentageOffset := 70
	targetPercentage := 80

	for {
		var followings []*github.User
		var resp *github.Response
		followings, resp, err = client.Users.ListFollowing(context.Background(), "", options)
		if err != nil {
			err = errors.New("error fetching followings: " + err.Error())
			return
		}
		totalPage = resp.LastPage

		for _, following := range followings {
			allFollowings = append(allFollowings, *following.Login)
		}

		if resp.NextPage == 0 {
			break
		}

		data.Progress = strconv.Itoa(utils.CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage)) + "%"
		repository.UpdateData(data)
		currentPage++

		options.Page = resp.NextPage
	}

	totalFollowings = len(allFollowings)

	return
}

func CalculateUnfollowers(followings, followers []string, data models.GWAResult) (unfollowers []string) {
	totalPage := len(followings)
	currentPage := 1
	percentageOffset := 80
	targetPercentage := 90

	for _, following := range followings {
		var found bool
		for _, follower := range followers {
			if following == follower {
				found = true
				break
			}
		}
		if !found {
			unfollowers = append(unfollowers, following)
		}

		data.Progress = strconv.Itoa(utils.CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage)) + "%"
		repository.UpdateData(data)
		currentPage++
	}

	return
}

func CalculateUnfollowings(followers, followings []string, data models.GWAResult) (unfollowings []string) {
	totalPage := len(followers)
	currentPage := 1
	percentageOffset := 90
	targetPercentage := 99

	for _, follower := range followers {
		var found bool
		for _, following := range followings {
			if follower == following {
				found = true
				break
			}
		}
		if !found {
			unfollowings = append(unfollowings, follower)
		}

		data.Progress = strconv.Itoa(utils.CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage)) + "%"
		repository.UpdateData(data)
		currentPage++
	}

	return
}
