package utils

import "time"

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
