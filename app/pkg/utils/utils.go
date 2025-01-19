package utils

import (
	"fmt"
	"time"
)

func CountDetermination(date time.Time, startDate, endDate string) (isCounted bool) {
	isCounted = true

	if startDate != "" {
		startDateTime, _ := time.Parse(time.DateOnly, startDate)
		if date.Before(startDateTime) {
			isCounted = false
		}
	}
	if endDate != "" {
		endDateTime, _ := time.Parse(time.DateOnly, endDate)
		if date.After(endDateTime) {
			isCounted = false
		}
	}

	return
}

func CalculateCurrentLoadingPercentage(targetPercentage, percentageOffset, currentPage, totalPage int) (currentPercentage int) {
	fmt.Println("targetPercentage:", targetPercentage)
	fmt.Println("percentageOffset:", percentageOffset)
	fmt.Println("currentPage:", currentPage)
	fmt.Println("totalPage:", totalPage)

	gradient := float64((targetPercentage - percentageOffset)) / 100
	fmt.Println("gradient:", gradient)

	currentX := (float64(currentPage) / float64(totalPage)) * 100
	fmt.Println("currentX:", currentX)

	currentPercentage = int((gradient * currentX) + float64(percentageOffset))

	fmt.Println("currentPercentage:", currentPercentage)

	return
}
