package service

import (
	"context"
	"errors"

	"github.com/google/go-github/v68/github"
)

func GetFollowers(client *github.Client) (allFollowers []string, totalFollowers int, err error) {
	options := &github.ListOptions{
		PerPage: 10,
	}

	for {
		var followers []*github.User
		var resp *github.Response
		followers, resp, err = client.Users.ListFollowers(context.Background(), "", options)
		if err != nil {
			err = errors.New("error fetching followers: " + err.Error())
			return
		}

		for _, follower := range followers {
			allFollowers = append(allFollowers, *follower.Login)
		}

		if resp.NextPage == 0 {
			break
		}

		options.Page = resp.NextPage
	}

	totalFollowers = len(allFollowers)

	return
}

func GetFollowings(client *github.Client) (allFollowings []string, totalFollowings int, err error) {
	options := &github.ListOptions{
		PerPage: 10,
	}

	for {
		var followings []*github.User
		var resp *github.Response
		followings, resp, err = client.Users.ListFollowing(context.Background(), "", options)
		if err != nil {
			err = errors.New("error fetching followings: " + err.Error())
			return
		}

		for _, following := range followings {
			allFollowings = append(allFollowings, *following.Login)
		}

		if resp.NextPage == 0 {
			break
		}

		options.Page = resp.NextPage
	}

	totalFollowings = len(allFollowings)

	return
}
