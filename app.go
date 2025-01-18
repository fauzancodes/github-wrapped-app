package main

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/fauzancodes/github-wrapped-app/app/dto"
	"github.com/fauzancodes/github-wrapped-app/app/models"
	"github.com/fauzancodes/github-wrapped-app/app/repository"
	"github.com/fauzancodes/github-wrapped-app/app/service"
	"github.com/google/uuid"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GenerateData(request dto.Request) (result models.GWAResult, err error) {
	if err = request.Validate(); err != nil {
		err = errors.New("failed to validate request: " + err.Error())
		return
	}

	result, err = service.GetData(request.PersonalAccessToken, request.StartDate, request.EndDate)
	if err != nil {
		err = errors.New("failed to generate data: " + err.Error())
		return
	}

	return
}

func (a *App) GetData(id string) (result models.GWAResult, err error) {
	parsedUUID, err := uuid.Parse(id)
	if err != nil {
		err = errors.New("failed to parse uuid: " + err.Error())
		return
	}

	result, err = repository.GetDataByID(parsedUUID)
	if err != nil {
		err = errors.New("failed to get data: " + err.Error())
		return
	}

	if result.Data != "" {
		err = json.Unmarshal([]byte(result.Data), &result.DataResponse)
		if err != nil {
			err = errors.New("failed to convert data to json: " + err.Error())
			return
		}
	}

	return
}
