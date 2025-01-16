package dto

import validation "github.com/go-ozzo/ozzo-validation"

type Request struct {
	PersonalAccessToken string `json:"personal_access_token"`
	StartDate           string `json:"start_date"`
	EndDate             string `json:"end_date"`
}

func (request Request) Validate() error {
	return validation.ValidateStruct(
		&request,
		validation.Field(&request.PersonalAccessToken, validation.Required),
	)
}
